import { getSql } from '../db/client.js'
import { hashToken } from '../lib/crypto.js'

export type SessionUser = {
  id: string
  username: string
  displayName: string
  role: 'admin' | 'user'
  accountNumber: string
}

export type AuthSessionRecord = SessionUser & {
  sessionId: string
  balanceVerifiedUntil: string | null
}

const SESSION_HOURS = 12

export async function createAuthSession(userId: string, rawToken: string, ipAddress: string, userAgent: string) {
  const sql = getSql()
  const expiresAt = new Date(Date.now() + SESSION_HOURS * 60 * 60 * 1000)

  await sql`
    DELETE FROM auth_sessions WHERE user_id = ${userId} AND expires_at < NOW()
  `

  const rows = await sql`
    INSERT INTO auth_sessions (user_id, token_hash, expires_at, ip_address, user_agent)
    VALUES (${userId}, ${hashToken(rawToken)}, ${expiresAt.toISOString()}, ${ipAddress}, ${userAgent})
    RETURNING id, expires_at, balance_verified_until
  `

  return rows[0] as { id: string; expires_at: string; balance_verified_until: string | null }
}

export async function getAuthSession(rawToken: string): Promise<AuthSessionRecord | null> {
  const sql = getSql()
  const rows = await sql`
    SELECT
      s.id AS session_id,
      s.balance_verified_until,
      u.id,
      u.username,
      u.display_name,
      u.role,
      u.account_number
    FROM auth_sessions s
    JOIN users u ON u.id = s.user_id
    WHERE s.token_hash = ${hashToken(rawToken)}
      AND s.expires_at > NOW()
      AND u.is_active = TRUE
    LIMIT 1
  `

  const row = rows[0] as
    | {
        session_id: string
        balance_verified_until: string | null
        id: string
        username: string
        display_name: string
        role: 'admin' | 'user'
        account_number: string
      }
    | undefined

  if (!row) return null

  await sql`
    UPDATE auth_sessions SET last_seen_at = NOW() WHERE id = ${row.session_id}
  `

  return {
    sessionId: row.session_id,
    id: row.id,
    username: row.username,
    displayName: row.display_name,
    role: row.role,
    accountNumber: row.account_number,
    balanceVerifiedUntil: row.balance_verified_until,
  }
}

export async function revokeAuthSession(rawToken: string) {
  const sql = getSql()
  await sql`DELETE FROM auth_sessions WHERE token_hash = ${hashToken(rawToken)}`
}

export async function revokeAllUserSessions(userId: string) {
  const sql = getSql()
  await sql`DELETE FROM auth_sessions WHERE user_id = ${userId}`
}

export async function setBalanceVerified(sessionId: string, minutes = 1) {
  const sql = getSql()
  const until = new Date(Date.now() + minutes * 60 * 1000)
  await sql`
    UPDATE auth_sessions
    SET balance_verified_until = ${until.toISOString()}
    WHERE id = ${sessionId}
  `
  return until.toISOString()
}

export async function createSiteAccessSession(rawToken: string, ipAddress: string) {
  const sql = getSql()
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)
  await sql`
    INSERT INTO site_access_sessions (token_hash, expires_at, ip_address)
    VALUES (${hashToken(rawToken)}, ${expiresAt.toISOString()}, ${ipAddress})
  `
}

export async function hasSiteAccess(rawToken: string | null) {
  if (!rawToken) return false
  const sql = getSql()
  const rows = await sql`
    SELECT id FROM site_access_sessions
    WHERE token_hash = ${hashToken(rawToken)} AND expires_at > NOW()
    LIMIT 1
  `
  return rows.length > 0
}
