import { getSql } from '../db/client.js'
import { createRequestId } from './crypto.js'

type AuditInput = {
  eventType: string
  actorUserId?: string | null
  targetUserId?: string | null
  resourceType?: string
  resourceId?: string
  result: 'success' | 'failure' | 'denied'
  ipAddress?: string | null
  userAgent?: string | null
  requestId?: string
  metadata?: Record<string, unknown>
}

export async function writeAuditLog(input: AuditInput) {
  const sql = getSql()
  const requestId = input.requestId ?? createRequestId()

  await sql`
    INSERT INTO audit_logs (
      event_type, actor_user_id, target_user_id, resource_type, resource_id,
      result, ip_address, user_agent, request_id, metadata
    ) VALUES (
      ${input.eventType},
      ${input.actorUserId ?? null},
      ${input.targetUserId ?? null},
      ${input.resourceType ?? null},
      ${input.resourceId ?? null},
      ${input.result},
      ${input.ipAddress ?? null},
      ${input.userAgent ?? null},
      ${requestId},
      ${JSON.stringify(input.metadata ?? {})}::jsonb
    )
  `

  return requestId
}
