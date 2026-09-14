import { createHandler } from '../../server/lib/handler.js'
import { listAllTransactions, listTransactionsForUser } from '../../server/services/transaction.service.js'

export default createHandler(
  async ({ req, res, requestId, session }) => {
    if (req.method !== 'GET') {
      res.status(405).json({ error: 'Method not allowed', requestId })
      return
    }

    if (!session) return

    const transactions =
      session.role === 'admin'
        ? await listAllTransactions()
        : await listTransactionsForUser(session.id)

    res.status(200).json({ transactions, requestId })
  },
  { requireAuth: true },
)
