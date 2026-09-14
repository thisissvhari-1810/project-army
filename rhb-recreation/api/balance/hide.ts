import { createHandler } from '../../server/lib/handler.js'
import { getSql } from '../../server/db/client.js'

export default createHandler(
  async ({ req, res, requestId, session }) => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed', requestId })
      return
    }
    if (!session) return

    const sql = getSql()
    await sql`
      UPDATE auth_sessions
      SET balance_verified_until = NULL
      WHERE id = ${session.sessionId}
    `

    res.status(200).json({ ok: true, requestId })
  },
  { requireAuth: true, requireCsrf: true },
)
