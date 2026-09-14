import { createHandler } from '../../server/lib/handler.js'

export default createHandler(
  async ({ req, res, requestId, session }) => {
    if (req.method !== 'GET') {
      res.status(405).json({ error: 'Method not allowed', requestId })
      return
    }

    if (!session) {
      res.status(200).json({ session: null, requestId })
      return
    }

    res.status(200).json({
      session: {
        sessionId: session.sessionId,
        userId: session.id,
        username: session.username,
        displayName: session.displayName,
        role: session.role,
        accountNumber: session.accountNumber,
      },
      balanceVerifiedUntil: session.balanceVerifiedUntil,
      requestId,
    })
  },
)
