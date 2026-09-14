import type { VercelRequest, VercelResponse } from '@vercel/node'

function allowedOrigins() {
  const raw = process.env.ALLOWED_ORIGINS ?? 'http://localhost:5173,http://localhost:3000'
  return raw.split(',').map((origin) => origin.trim()).filter(Boolean)
}

export function applyCors(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin
  const allowed = allowedOrigins()

  if (origin && allowed.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Vary', 'Origin')
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-CSRF-Token, X-Request-Id')
}

export function isAllowedOrigin(req: VercelRequest) {
  const origin = req.headers.origin
  if (!origin) return true
  return allowedOrigins().includes(origin)
}
