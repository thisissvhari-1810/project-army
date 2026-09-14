import { createHandler } from '../../server/lib/handler.js'
import { readJsonBody, getClientIp, getUserAgent } from '../../server/lib/request.js'
import { parseBody, loginSchema } from '../../server/lib/validation.js'
import { consumeRateLimit } from '../../server/lib/rate-limit.js'
import { loginUser } from '../../server/services/auth.service.js'
import { setAuthCookie } from '../../server/lib/cookies.js'
import { tooManyRequests } from '../../server/lib/errors.js'

export default createHandler(
  async ({ req, res, requestId }) => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed', requestId })
      return
    }

    const ip = getClientIp(req)
    const limit = await consumeRateLimit({
      key: `login:${ip}`,
      limit: 10,
      windowMs: 15 * 60 * 1000,
      blockMs: 15 * 60 * 1000,
    })
    if (!limit.allowed) throw tooManyRequests('Too many login attempts. Try again later.')

    const parsed = parseBody(loginSchema, await readJsonBody(req))
    if (!parsed.ok) {
      res.status(400).json({ error: parsed.error, requestId })
      return
    }

    const result = await loginUser(parsed.data.username, parsed.data.password, {
      ipAddress: parsed.data.clientContext?.ipAddress ?? ip,
      location: parsed.data.clientContext?.location,
      device: parsed.data.clientContext?.device,
      os: parsed.data.clientContext?.os,
      browser: parsed.data.clientContext?.browser,
      userAgent: parsed.data.clientContext?.userAgent ?? getUserAgent(req),
      loginPhoto: parsed.data.loginPhoto,
    })

    if (!result.ok) {
      res.status(401).json({ error: result.error, requestId })
      return
    }

    setAuthCookie(res, result.token)
    res.status(200).json({
      session: {
        sessionId: result.session.sessionId,
        userId: result.session.userId,
        username: result.session.username,
        displayName: result.session.displayName,
        role: result.session.role,
        accountNumber: result.session.accountNumber,
      },
      requestId,
    })
  },
  { requireCsrf: true },
)
