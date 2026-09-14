import cookie from 'cookie'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export const AUTH_COOKIE = 'rhb_session'
export const SITE_COOKIE = 'rhb_site_access'
export const CSRF_COOKIE = 'rhb_csrf'

const ONE_DAY = 60 * 60 * 24
const SITE_ACCESS_TTL = ONE_DAY
const SESSION_TTL = ONE_DAY * 2

function isProduction() {
  return process.env.NODE_ENV === 'production' || process.env.VERCEL === '1'
}

function baseCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: isProduction(),
    sameSite: 'lax' as const,
    path: '/',
    maxAge,
  }
}

export function parseCookies(req: VercelRequest) {
  return cookie.parse(req.headers.cookie ?? '')
}

export function setAuthCookie(res: VercelResponse, token: string) {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(AUTH_COOKIE, token, baseCookieOptions(SESSION_TTL)),
  )
}

export function clearAuthCookie(res: VercelResponse) {
  res.setHeader('Set-Cookie', cookie.serialize(AUTH_COOKIE, '', { ...baseCookieOptions(0), maxAge: 0 }))
}

export function setSiteAccessCookie(res: VercelResponse, token: string) {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(SITE_COOKIE, token, baseCookieOptions(SITE_ACCESS_TTL)),
  )
}

export function clearSiteAccessCookie(res: VercelResponse) {
  res.setHeader('Set-Cookie', cookie.serialize(SITE_COOKIE, '', { ...baseCookieOptions(0), maxAge: 0 }))
}

export function setCsrfCookie(res: VercelResponse, token: string) {
  const existing = res.getHeader('Set-Cookie')
  const serialized = cookie.serialize(CSRF_COOKIE, token, {
    ...baseCookieOptions(SESSION_TTL),
    httpOnly: false,
  })

  if (Array.isArray(existing)) {
    res.setHeader('Set-Cookie', [...existing, serialized])
  } else if (existing) {
    res.setHeader('Set-Cookie', [String(existing), serialized])
  } else {
    res.setHeader('Set-Cookie', serialized)
  }
}

export function getAuthToken(req: VercelRequest) {
  return parseCookies(req)[AUTH_COOKIE] ?? null
}

export function getSiteAccessToken(req: VercelRequest) {
  return parseCookies(req)[SITE_COOKIE] ?? null
}

export function getCsrfToken(req: VercelRequest) {
  return parseCookies(req)[CSRF_COOKIE] ?? null
}
