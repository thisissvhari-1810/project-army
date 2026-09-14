import { createHandler } from '../../server/lib/handler.js'
import { getAccountByUserId } from '../../server/services/account.service.js'
import { forbidden } from '../../server/lib/errors.js'

export default createHandler(
  async ({ req, res, requestId, session }) => {
    if (req.method !== 'GET') {
      res.status(405).json({ error: 'Method not allowed', requestId })
      return
    }

    if (!session) return

    const account = await getAccountByUserId(session.id)
    if (!account) {
      res.status(404).json({ error: 'Account not found.', requestId })
      return
    }

    const balanceVisible =
      session.role === 'admin' ||
      (session.balanceVerifiedUntil ? new Date(session.balanceVerifiedUntil).getTime() > Date.now() : false)

    res.status(200).json({
      account: {
        ...account,
        balance: balanceVisible ? account.balance : null,
      },
      balanceVisible,
      requestId,
    })
  },
  { requireAuth: true },
)
