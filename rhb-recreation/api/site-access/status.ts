import { createHandler } from '../../server/lib/handler.js'

export default createHandler(async ({ req, res, requestId, siteAccessGranted }) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed', requestId })
    return
  }

  res.status(200).json({ unlocked: siteAccessGranted, requestId })
})
