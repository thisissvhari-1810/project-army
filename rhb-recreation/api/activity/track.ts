import { createHandler } from '../../server/lib/handler.js'
import { readJsonBody } from '../../server/lib/request.js'
import { parseBody, pageVisitSchema, presenceSchema } from '../../server/lib/validation.js'
import { trackPageVisit, updatePresence } from '../../server/services/audit-query.service.js'

export default createHandler(
  async ({ req, res, requestId, session }) => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed', requestId })
      return
    }
    if (!session) return

    const body = await readJsonBody<{ type?: string }>(req)

    if (body.type === 'presence') {
      const parsed = parseBody(presenceSchema, body)
      if (!parsed.ok) {
        res.status(400).json({ error: parsed.error, requestId })
        return
      }
      await updatePresence(session.sessionId, parsed.data.status)
      res.status(200).json({ ok: true, requestId })
      return
    }

    const parsed = parseBody(pageVisitSchema, body)
    if (!parsed.ok) {
      res.status(400).json({ error: parsed.error, requestId })
      return
    }

    await trackPageVisit({
      authSessionId: session.sessionId,
      userId: session.id,
      page: parsed.data.page,
      durationMs: parsed.data.durationMs,
    })

    res.status(200).json({ ok: true, requestId })
  },
  { requireAuth: true, requireCsrf: true },
)
