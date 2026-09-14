import { createHandler } from '../../../../server/lib/handler.js'
import { readJsonBody, getClientIp, getUserAgent } from '../../../../server/lib/request.js'
import { z, parseBody } from '../../../../server/lib/validation.js'
import { postTransaction } from '../../../../server/services/transaction.service.js'
import { writeAuditLog } from '../../../../server/lib/audit.js'
import { AppError } from '../../../../server/lib/errors.js'

const debitSchema = z.object({
  amount: z.number().positive().max(1_000_000_000),
  description: z.string().trim().min(1).max(500),
  idempotencyKey: z.string().trim().min(8).max(64).optional(),
})

export default createHandler(
  async ({ req, res, requestId, session }) => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed', requestId })
      return
    }
    if (!session) return

    const userId = req.query.id as string
    if (!userId) {
      res.status(400).json({ error: 'User id is required.', requestId })
      return
    }

    const parsed = parseBody(debitSchema, await readJsonBody(req))
    if (!parsed.ok) {
      res.status(400).json({ error: parsed.error, requestId })
      return
    }

    try {
      const transaction = await postTransaction({
        userId,
        amount: parsed.data.amount,
        type: 'debit',
        description: parsed.data.description,
        performedByUserId: session.id,
        idempotencyKey: parsed.data.idempotencyKey,
      })

      await writeAuditLog({
        eventType: 'BALANCE_DEBIT',
        actorUserId: session.id,
        targetUserId: userId,
        resourceType: 'transaction',
        resourceId: transaction.id,
        result: 'success',
        ipAddress: getClientIp(req),
        userAgent: getUserAgent(req),
        requestId,
      })

      res.status(201).json({ transaction, requestId })
    } catch (error) {
      if (error instanceof AppError) throw error
      throw error
    }
  },
  { requireAuth: true, requireAdmin: true, requireCsrf: true },
)
