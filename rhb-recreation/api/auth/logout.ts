import { createHandler } from '../../server/lib/handler.js'
import { getAuthToken, clearAuthCookie } from '../../server/lib/cookies.js'
import { revokeAuthSession } from '../../server/services/session.service.js'
import { endLoginSession } from '../../server/services/audit-query.service.js'
import { writeAuditLog } from '../../server/lib/audit.js'
import { getAuthSession } from '../../server/services/session.service.js'
import { getClientIp, getUserAgent } from '../../server/lib/request.js'

export default createHandler(
  async ({ req, res, requestId, session }) => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed', requestId })
      return
    }

    const token = getAuthToken(req)
    if (session && token) {
      await endLoginSession(session.sessionId)
      await revokeAuthSession(token)
      await writeAuditLog({
        eventType: 'LOGOUT',
        actorUserId: session.id,
        result: 'success',
        ipAddress: getClientIp(req),
        userAgent: getUserAgent(req),
        requestId,
      })
    }

    clearAuthCookie(res)
    res.status(200).json({ ok: true, requestId })
  },
  { requireCsrf: true },
)
