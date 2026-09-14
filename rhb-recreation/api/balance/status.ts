import { createHandler } from '../../server/lib/handler.js'

export default createHandler(
  async ({ req, res, requestId, session }) => {
    if (req.method !== 'GET') {
      res.status(405).json({ error: 'Method not allowed', requestId })
      return
    }

    if (!session) {
      res.status(200).json({ visible: false, requestId })
      return
    }

    const until = session.balanceVerifiedUntil
    const visible = until ? new Date(until).getTime() > Date.now() : false
    res.status(200).json({ visible, balanceVerifiedUntil: until, requestId })
  },
  { requireAuth: true },
)
