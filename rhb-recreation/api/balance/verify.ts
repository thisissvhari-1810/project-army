import { createHandler } from '../../server/lib/handler.js'
import { readJsonBody } from '../../server/lib/request.js'
import { parseBody, pinSchema } from '../../server/lib/validation.js'
import { consumeRateLimit } from '../../server/lib/rate-limit.js'
import { setBalanceVerified } from '../../server/services/session.service.js'
import { tooManyRequests, unauthorized } from '../../server/lib/errors.js'
import { writeAuditLog } from '../../server/lib/audit.js'
import { getClientIp, getUserAgent } from '../../server/lib/request.js'

export default createHandler(
  async ({ req, res, requestId, session }) => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed', requestId })
      return
    }

    if (!session) throw unauthorized()

    const ip = getClientIp(req)
    const limit = await consumeRateLimit({
      key: `balance-pin:${session.id}:${ip}`,
      limit: 8,
      windowMs: 15 * 60 * 1000,
      blockMs: 30 * 60 * 1000,
    })
    if (!limit.allowed) throw tooManyRequests('Too many PIN attempts. Try again later.')

    const parsed = parseBody(pinSchema, await readJsonBody(req))
    if (!parsed.ok) {
      res.status(400).json({ error: parsed.error, requestId })
      return
    }

    const expectedPin = process.env.BALANCE_VIEW_PIN
    if (!expectedPin) {
      res.status(503).json({ error: 'Balance verification is not configured.', requestId })
      return
    }

    if (parsed.data.pin !== expectedPin) {
      await writeAuditLog({
        eventType: 'SENSITIVE_DATA_ACCESS',
        actorUserId: session.id,
        result: 'failure',
        ipAddress: ip,
        userAgent: getUserAgent(req),
        requestId,
        metadata: { action: 'balance_pin_failed' },
      })
      throw unauthorized('Incorrect PIN.')
    }

    const until = await setBalanceVerified(session.sessionId, 1)
    await writeAuditLog({
      eventType: 'SENSITIVE_DATA_ACCESS',
      actorUserId: session.id,
      result: 'success',
      ipAddress: ip,
      userAgent: getUserAgent(req),
      requestId,
      metadata: { action: 'balance_pin_verified' },
    })

    res.status(200).json({ ok: true, balanceVerifiedUntil: until, requestId })
  },
  { requireAuth: true, requireCsrf: true },
)
