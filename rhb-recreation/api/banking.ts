import type { VercelRequest, VercelResponse } from '@vercel/node'
import { applySecurityHeaders } from '../server/lib/security-headers.js'

export default function handler(_req: VercelRequest, res: VercelResponse) {
  applySecurityHeaders(res)
  res.status(410).json({
    error: 'This endpoint has been removed for security reasons. Use authenticated banking APIs.',
    code: 'ENDPOINT_DEPRECATED',
  })
}
