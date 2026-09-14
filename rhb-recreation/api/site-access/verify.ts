import { createHandler } from '../../server/lib/handler.js'
import { readJsonBody, getClientIp } from '../../server/lib/request.js'
import { parseBody, pinSchema } from '../../server/lib/validation.js'
import { consumeRateLimit } from '../../server/lib/rate-limit.js'
import { createSiteAccessSession } from '../../server/services/session.service.js'
import { setSiteAccessCookie } from '../../server/lib/cookies.js'
import { createToken } from '../../server/lib/crypto.js'
import { tooManyRequests, unauthorized } from '../../server/lib/errors.js'
import { writeAuditLog } from '../../server/lib/audit.js'

export default createHandler(
  async ({ req, res, requestId }) => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed', requestId })
      return
    }

    const ip = getClientIp(req)
    const limit = await consumeRateLimit({
      key: `site-access:${ip}`,
      limit: 8,
      windowMs: 15 * 60 * 1000,
      blockMs: 30 * 60 * 1000,
    })
    if (!limit.allowed) throw tooManyRequests('Too many attempts. Try again later.')

    const parsed = parseBody(pinSchema, await readJsonBody(req))
    if (!parsed.ok) {
      res.status(400).json({ error: parsed.error, requestId })
      return
    }

    const expectedPin = process.env.SITE_ACCESS_PIN
    if (!expectedPin) {
      res.status(503).json({ error: 'Site access is not configured.', requestId })
      return
    }

    if (parsed.data.pin !== expectedPin) {
      await writeAuditLog({
        eventType: 'SITE_ACCESS_FAILURE',
        result: 'failure',
        ipAddress: ip,
        requestId,
      })
      throw unauthorized('Incorrect access PIN.')
    }

    const token = createToken()
    await createSiteAccessSession(token, ip)
    setSiteAccessCookie(res, token)

    await writeAuditLog({
      eventType: 'SITE_ACCESS_SUCCESS',
      result: 'success',
      ipAddress: ip,
      requestId,
    })

    res.status(200).json({ ok: true, requestId })
  },
  { requireCsrf: true },
)
