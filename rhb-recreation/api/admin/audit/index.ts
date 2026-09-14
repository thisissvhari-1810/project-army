import { createHandler } from '../../../server/lib/handler.js'
import { getAuditDashboard } from '../../../server/services/audit-query.service.js'
import { writeAuditLog } from '../../../server/lib/audit.js'
import { getClientIp, getUserAgent } from '../../../server/lib/request.js'

export default createHandler(
  async ({ req, res, requestId, session }) => {
    if (req.method !== 'GET') {
      res.status(405).json({ error: 'Method not allowed', requestId })
      return
    }
    if (!session) return

    const userId = typeof req.query.userId === 'string' ? req.query.userId : undefined
    const audit = await getAuditDashboard(userId)

    await writeAuditLog({
      eventType: 'ADMIN_ACCESS',
      actorUserId: session.id,
      targetUserId: userId,
      result: 'success',
      ipAddress: getClientIp(req),
      userAgent: getUserAgent(req),
      requestId,
      metadata: { resource: 'audit_logs' },
    })

    res.status(200).json({ ...audit, requestId })
  },
  { requireAuth: true, requireAdmin: true },
)
