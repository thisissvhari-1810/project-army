import type { VercelRequest } from '@vercel/node'
import { getCsrfToken } from './cookies.js'
import { isAllowedOrigin } from './cors.js'
import { forbidden } from './errors.js'

export function getClientIp(req: VercelRequest) {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0]?.trim() ?? 'unknown'
  }
  return req.socket.remoteAddress ?? 'unknown'
}

export function getUserAgent(req: VercelRequest) {
  return req.headers['user-agent'] ?? 'unknown'
}

export function assertSafeMutation(req: VercelRequest) {
  if (!isAllowedOrigin(req)) {
    throw forbidden('Cross-origin request denied.')
  }

  const csrfHeader = req.headers['x-csrf-token']
  const csrfCookie = getCsrfToken(req)
  if (!csrfHeader || !csrfCookie || csrfHeader !== csrfCookie) {
    throw forbidden('CSRF validation failed.')
  }
}

export async function readJsonBody<T = unknown>(req: VercelRequest): Promise<T> {
  if (typeof req.body === 'string') {
    return JSON.parse(req.body) as T
  }
  return (req.body ?? {}) as T
}
