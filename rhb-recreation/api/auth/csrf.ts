import { createHandler } from '../../server/lib/handler.js'
import { createToken } from '../../server/lib/crypto.js'
import { setCsrfCookie } from '../../server/lib/cookies.js'

export default createHandler(async ({ req, res, requestId }) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed', requestId })
    return
  }

  const token = createToken()
  setCsrfCookie(res, token)
  res.status(200).json({ csrfToken: token, requestId })
})
