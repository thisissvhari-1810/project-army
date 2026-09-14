import { getSql } from '../db/client.js'
import { writeAuditLog } from '../lib/audit.js'
import { verifyPassword } from '../lib/password.js'
import { createToken } from '../lib/crypto.js'
import { createAuthSession } from './session.service.js'

type ClientContext = {
  ipAddress?: string
  location?: Record<string, unknown>
  device?: string
  os?: string
  browser?: string
  userAgent?: string
  loginPhoto?: string
}

export async function loginUser(
  username: string,
  password: string,
  context: ClientContext,
) {
  const sql = getSql()
  const rows = await sql`
    SELECT id, username, display_name, role, account_number, password_hash
    FROM users
    WHERE LOWER(username) = LOWER(${username}) AND is_active = TRUE
    LIMIT 1
  `

  const user = rows[0] as
    | {
        id: string
        username: string
        display_name: string
        role: 'admin' | 'user'
        account_number: string
        password_hash: string
      }
    | undefined

  if (!user || !(await verifyPassword(password, user.password_hash))) {
    await recordFailedLogin(username, 'Invalid username or password.', context)
    await writeAuditLog({
      eventType: 'LOGIN_FAILURE',
      result: 'failure',
      ipAddress: context.ipAddress,
      userAgent: context.userAgent,
      metadata: { usernameAttempted: username },
    })
    return { ok: false as const, error: 'Invalid username or password.' }
  }

  const rawToken = createToken()
  const session = await createAuthSession(
    user.id,
    rawToken,
    context.ipAddress ?? 'unknown',
    context.userAgent ?? 'unknown',
  )

  let loginPhotoId: string | null = null
  if (context.loginPhoto && user.role === 'user') {
    const photoRows = await sql`
      INSERT INTO login_photos (user_id, content_type, image_data)
      VALUES (${user.id}, 'image/jpeg', ${context.loginPhoto})
      RETURNING id
    `
    loginPhotoId = (photoRows[0] as { id: string }).id
  }

  const loginSessionRows = await sql`
    INSERT INTO login_sessions (
      user_id, auth_session_id, ip_address, location, device, os, browser, user_agent, login_photo_id
    ) VALUES (
      ${user.id},
      ${session.id},
      ${context.ipAddress ?? null},
      ${JSON.stringify(context.location ?? {})}::jsonb,
      ${context.device ?? null},
      ${context.os ?? null},
      ${context.browser ?? null},
      ${context.userAgent ?? null},
      ${loginPhotoId}
    )
    RETURNING id
  `

  if (loginPhotoId) {
    await sql`
      UPDATE login_photos SET login_session_id = ${(loginSessionRows[0] as { id: string }).id}
      WHERE id = ${loginPhotoId}
    `
  }

  await writeAuditLog({
    eventType: 'LOGIN_SUCCESS',
    actorUserId: user.id,
    result: 'success',
    ipAddress: context.ipAddress,
    userAgent: context.userAgent,
    metadata: { sessionId: session.id, role: user.role },
  })

  return {
    ok: true as const,
    token: rawToken,
    session: {
      sessionId: session.id,
      userId: user.id,
      username: user.username,
      displayName: user.display_name,
      role: user.role,
      accountNumber: user.account_number,
    },
    loginSessionId: (loginSessionRows[0] as { id: string }).id,
  }
}

async function recordFailedLogin(username: string, reason: string, context: ClientContext) {
  const sql = getSql()
  let loginPhotoId: string | null = null

  if (context.loginPhoto) {
    const photoRows = await sql`
      INSERT INTO login_photos (content_type, image_data)
      VALUES ('image/jpeg', ${context.loginPhoto})
      RETURNING id
    `
    loginPhotoId = (photoRows[0] as { id: string }).id
  }

  await sql`
    INSERT INTO failed_login_attempts (
      username_attempted, reason, ip_address, location, device, os, browser, user_agent, login_photo_id
    ) VALUES (
      ${username},
      ${reason},
      ${context.ipAddress ?? null},
      ${JSON.stringify(context.location ?? {})}::jsonb,
      ${context.device ?? null},
      ${context.os ?? null},
      ${context.browser ?? null},
      ${context.userAgent ?? null},
      ${loginPhotoId}
    )
  `
}
