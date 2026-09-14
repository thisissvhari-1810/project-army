import type { VercelRequest, VercelResponse } from '@vercel/node'
import { applyCors } from './cors.js'
import { AppError, internalError } from './errors.js'
import { applySecurityHeaders } from './security-headers.js'
import { createRequestId } from './crypto.js'
import { getAuthToken, getSiteAccessToken } from './cookies.js'
import { getAuthSession, hasSiteAccess, type AuthSessionRecord } from '../services/session.service.js'

export type ApiContext = {
  req: VercelRequest
  res: VercelResponse
  requestId: string
  session: AuthSessionRecord | null
  siteAccessGranted: boolean
}

type HandlerOptions = {
  requireAuth?: boolean
  requireAdmin?: boolean
  requireSiteAccess?: boolean
  requireCsrf?: boolean
}

export function createHandler(
  handler: (ctx: ApiContext) => Promise<void>,
  options: HandlerOptions = {},
) {
  return async (req: VercelRequest, res: VercelResponse) => {
    const requestId = createRequestId()
    applySecurityHeaders(res)
    applyCors(req, res)

    if (req.method === 'OPTIONS') {
      res.status(204).end()
      return
    }

    try {
      if (options.requireCsrf && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method ?? '')) {
        const { assertSafeMutation } = await import('./request.js')
        assertSafeMutation(req)
      }

      const rawToken = getAuthToken(req)
      const session = rawToken ? await getAuthSession(rawToken) : null
      const siteAccessGranted = await hasSiteAccess(getSiteAccessToken(req))

      if (options.requireSiteAccess && !siteAccessGranted) {
        throw new AppError(401, 'SITE_ACCESS_REQUIRED', 'Site access verification required.')
      }

      if (options.requireAuth && !session) {
        throw new AppError(401, 'UNAUTHORIZED', 'Authentication required.')
      }

      if (options.requireAdmin && session?.role !== 'admin') {
        throw new AppError(403, 'FORBIDDEN', 'Admin access required.')
      }

      await handler({ req, res, requestId, session, siteAccessGranted })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.status).json({ error: error.message, code: error.code, requestId })
        return
      }

      console.error('[api-error]', requestId, error)
      const err = internalError()
      res.status(err.status).json({ error: err.message, code: err.code, requestId })
    }
  }
}
