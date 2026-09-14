import type { VercelResponse } from '@vercel/node'

export function applySecurityHeaders(res: VercelResponse) {
  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('Permissions-Policy', 'camera=(self), microphone=(), geolocation=(self)')
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https://www.rhbgroup.com; connect-src 'self' https://api.ipify.org https://checkipv4.digitalocean.com https://ipv4.icanhazip.com https://ipapi.co https://nominatim.openstreetmap.org; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
  )
  res.setHeader('Cache-Control', 'no-store')
}
