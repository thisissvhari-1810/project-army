import { createHandler } from '../../../server/lib/handler.js'
import { readJsonBody, getClientIp, getUserAgent } from '../../../server/lib/request.js'
import { parseBody, createUserSchema } from '../../../server/lib/validation.js'
import { listCustomerAccounts } from '../../../server/services/account.service.js'
import { createCustomerUser } from '../../../server/services/user.service.js'
import { writeAuditLog } from '../../../server/lib/audit.js'

export default createHandler(
  async ({ req, res, requestId, session }) => {
    if (!session) return

    if (req.method === 'GET') {
      const users = await listCustomerAccounts()
      res.status(200).json({ users, requestId })
      return
    }

    if (req.method === 'POST') {
      const parsed = parseBody(createUserSchema, await readJsonBody(req))
      if (!parsed.ok) {
        res.status(400).json({ error: parsed.error, requestId })
        return
      }

      const user = await createCustomerUser({
        ...parsed.data,
        performedByUserId: session.id,
      })

      await writeAuditLog({
        eventType: 'USER_CREATED',
        actorUserId: session.id,
        targetUserId: user.id,
        result: 'success',
        ipAddress: getClientIp(req),
        userAgent: getUserAgent(req),
        requestId,
        metadata: { username: user.username },
      })

      res.status(201).json({ user, requestId })
      return
    }

    res.status(405).json({ error: 'Method not allowed', requestId })
  },
  { requireAuth: true, requireAdmin: true, requireCsrf: true },
)
