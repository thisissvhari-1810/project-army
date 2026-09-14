import { getSql } from '../db/client.js'

export async function getAuditDashboard(userId?: string) {
  const sql = getSql()

  const events = userId
    ? await sql`
        SELECT * FROM audit_logs
        WHERE actor_user_id = ${userId} OR target_user_id = ${userId}
        ORDER BY created_at DESC LIMIT 500
      `
    : await sql`
        SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 500
      `

  const sessions = userId
    ? await sql`
        SELECT ls.*, u.username, lp.image_data AS login_photo
        FROM login_sessions ls
        JOIN users u ON u.id = ls.user_id
        LEFT JOIN login_photos lp ON lp.id = ls.login_photo_id
        WHERE ls.user_id = ${userId}
        ORDER BY ls.login_at DESC LIMIT 200
      `
    : await sql`
        SELECT ls.*, u.username, lp.image_data AS login_photo
        FROM login_sessions ls
        JOIN users u ON u.id = ls.user_id
        LEFT JOIN login_photos lp ON lp.id = ls.login_photo_id
        ORDER BY ls.login_at DESC LIMIT 200
      `

  const failedLogins = userId
    ? await sql`
        SELECT fl.*, lp.image_data AS login_photo, u.id AS matched_user_id
        FROM failed_login_attempts fl
        LEFT JOIN users u ON LOWER(u.username) = LOWER(fl.username_attempted)
        LEFT JOIN login_photos lp ON lp.id = fl.login_photo_id
        WHERE u.id = ${userId}
        ORDER BY fl.created_at DESC LIMIT 200
      `
    : await sql`
        SELECT fl.*, lp.image_data AS login_photo
        FROM failed_login_attempts fl
        LEFT JOIN login_photos lp ON lp.id = fl.login_photo_id
        ORDER BY fl.created_at DESC LIMIT 200
      `

  return {
    events: events.map(mapAuditEvent),
    sessions: sessions.map(mapLoginSession),
    failedLogins: failedLogins.map(mapFailedLogin),
    alerts: [],
  }
}

function mapLocation(value: unknown) {
  const location = (value as Record<string, unknown>) ?? {}
  return {
    city: String(location.city ?? 'Unknown'),
    state: location.state ? String(location.state) : undefined,
    country: String(location.country ?? 'Unknown'),
    pincode: location.pincode ? String(location.pincode) : undefined,
    source: location.source === 'device' || location.source === 'ip' ? location.source : undefined,
  }
}

function mapAuditEvent(row: Record<string, unknown>) {
  const metadata = (row.metadata as Record<string, unknown>) ?? {}
  return {
    id: String(row.id),
    userId: String(row.actor_user_id ?? ''),
    username: String(metadata.username ?? metadata.usernameAttempted ?? 'system'),
    sessionId: String(metadata.sessionId ?? ''),
    category: mapCategory(String(row.event_type)),
    action: String(row.event_type),
    details: String(metadata.details ?? row.event_type),
    page: metadata.page ? String(metadata.page) : undefined,
    ipAddress: String(row.ip_address ?? ''),
    location: mapLocation(metadata.location),
    device: String(metadata.device ?? ''),
    os: String(metadata.os ?? ''),
    browser: String(metadata.browser ?? ''),
    userAgent: String(row.user_agent ?? ''),
    severity: row.result === 'failure' ? 'warning' : 'info',
    createdAt: new Date(String(row.created_at)).toISOString(),
  }
}

function mapLoginSession(row: Record<string, unknown>) {
  return {
    id: String(row.id),
    userId: String(row.user_id),
    username: String((row as { username?: string }).username ?? ''),
    loginAt: new Date(String(row.login_at)).toISOString(),
    logoutAt: row.logout_at ? new Date(String(row.logout_at)).toISOString() : undefined,
    durationMs: row.logout_at
      ? new Date(String(row.logout_at)).getTime() - new Date(String(row.login_at)).getTime()
      : undefined,
    ipAddress: String(row.ip_address ?? ''),
    location: mapLocation(row.location),
    device: String(row.device ?? ''),
    os: String(row.os ?? ''),
    browser: String(row.browser ?? ''),
    userAgent: String(row.user_agent ?? ''),
    loginPhoto: row.login_photo ? String(row.login_photo) : undefined,
    pagesVisited: (row.pages_visited as string[]) ?? [],
    pageDurations: (row.page_durations as Record<string, number>) ?? {},
    status: String(row.status ?? 'offline') as 'active' | 'idle' | 'offline',
    lastActivityAt: new Date(String(row.last_activity_at)).toISOString(),
  }
}

function mapFailedLogin(row: Record<string, unknown>) {
  return {
    id: String(row.id),
    username: String(row.username_attempted),
    ipAddress: String(row.ip_address ?? ''),
    location: mapLocation(row.location),
    device: String(row.device ?? ''),
    os: String(row.os ?? ''),
    browser: String(row.browser ?? ''),
    userAgent: String(row.user_agent ?? ''),
    loginPhoto: row.login_photo ? String(row.login_photo) : undefined,
    reason: String(row.reason),
    createdAt: new Date(String(row.created_at)).toISOString(),
  }
}

function mapCategory(eventType: string) {
  if (eventType.includes('LOGIN')) return 'auth'
  if (eventType.includes('TRANSACTION') || eventType.includes('BALANCE')) return 'transaction'
  if (eventType.includes('ADMIN')) return 'admin'
  if (eventType.includes('EXPORT')) return 'export'
  return 'security'
}

export async function trackPageVisit(input: {
  authSessionId: string
  userId: string
  page: string
  durationMs: number
}) {
  const sql = getSql()
  await sql`
    UPDATE login_sessions
    SET
      pages_visited = array_append(pages_visited, ${input.page}),
      page_durations = page_durations || jsonb_build_object(${input.page}, ${input.durationMs}),
      last_activity_at = NOW()
    WHERE auth_session_id = ${input.authSessionId} AND logout_at IS NULL
  `
}

export async function updatePresence(authSessionId: string, status: 'active' | 'idle' | 'offline') {
  const sql = getSql()
  await sql`
    UPDATE login_sessions
    SET status = ${status}, last_activity_at = NOW()
    WHERE auth_session_id = ${authSessionId} AND logout_at IS NULL
  `
}

export async function endLoginSession(authSessionId: string) {
  const sql = getSql()
  await sql`
    UPDATE login_sessions
    SET logout_at = NOW(), status = 'offline'
    WHERE auth_session_id = ${authSessionId} AND logout_at IS NULL
  `
}
