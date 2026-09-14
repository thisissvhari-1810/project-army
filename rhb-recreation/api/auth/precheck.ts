import { createHandler } from '../../server/lib/handler.js'
import { readJsonBody, getClientIp } from '../../server/lib/request.js'
import { parseBody, loginSchema } from '../../server/lib/validation.js'
import { consumeRateLimit } from '../../server/lib/rate-limit.js'
import { getSql } from '../../server/db/client.js'
import { verifyPassword } from '../../server/lib/password.js'
import { tooManyRequests, unauthorized } from '../../server/lib/errors.js'

export default createHandler(
  async ({ req, res, requestId }) => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed', requestId })
      return
    }

    const ip = getClientIp(req)
    const limit = await consumeRateLimit({
      key: `precheck:${ip}`,
      limit: 15,
      windowMs: 15 * 60 * 1000,
      blockMs: 15 * 60 * 1000,
    })
    if (!limit.allowed) throw tooManyRequests()

    const parsed = parseBody(loginSchema.pick({ username: true, password: true }), await readJsonBody(req))
    if (!parsed.ok) {
      res.status(400).json({ error: parsed.error, requestId })
      return
    }

    const sql = getSql()
    const rows = await sql`
      SELECT role, password_hash FROM users
      WHERE LOWER(username) = LOWER(${parsed.data.username}) AND is_active = TRUE
      LIMIT 1
    `
    const user = rows[0] as { role: 'admin' | 'user'; password_hash: string } | undefined
    if (!user || !(await verifyPassword(parsed.data.password, user.password_hash))) {
      throw unauthorized('Invalid username or password.')
    }

    res.status(200).json({ ok: true, role: user.role, requestId })
  },
  { requireCsrf: true },
)
