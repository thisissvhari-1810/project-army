import { defaultAuditData } from '../data/auditDefaults'
import { appStorage } from './storage'
import type {
  AuditData,
  AuditEvent,
  AuditSession,
  ClientContext,
  FailedLoginAttempt,
  UserPresence,
} from '../types/audit'
import type { AuthSession } from '../types/banking'

const AUDIT_KEY = 'rhb-premier-audit-v2'
const LEGACY_AUDIT_KEY = 'rhb-premier-audit'
const ACTIVE_SESSION_KEY = 'rhb-premier-active-session'

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function contextFields(context: ClientContext) {
  return {
    ipAddress: context.ipAddress,
    location: context.location,
    device: context.device,
    os: context.os,
    browser: context.browser,
    userAgent: context.userAgent,
    ...(context.loginPhoto ? { loginPhoto: context.loginPhoto } : {}),
  }
}

export function loadAuditData(): AuditData {
  appStorage.removeItem(LEGACY_AUDIT_KEY)
  const raw = appStorage.getItem(AUDIT_KEY)
  if (!raw) {
    appStorage.setItem(AUDIT_KEY, JSON.stringify(defaultAuditData))
    return structuredClone(defaultAuditData)
  }
  try {
    const data = JSON.parse(raw) as AuditData
    return {
      events: data.events ?? [],
      sessions: data.sessions ?? [],
      failedLogins: data.failedLogins ?? [],
      alerts: data.alerts ?? [],
    }
  } catch {
    appStorage.setItem(AUDIT_KEY, JSON.stringify(defaultAuditData))
    return structuredClone(defaultAuditData)
  }
}

export function saveAuditData(data: AuditData) {
  appStorage.setItem(AUDIT_KEY, JSON.stringify(data))
}

export function getActiveSessionId(): string | null {
  return sessionStorage.getItem(ACTIVE_SESSION_KEY)
}

export function setActiveSessionId(sessionId: string | null) {
  if (!sessionId) {
    sessionStorage.removeItem(ACTIVE_SESSION_KEY)
    return
  }
  sessionStorage.setItem(ACTIVE_SESSION_KEY, sessionId)
}

export function logAuditEvent(
  input: Omit<AuditEvent, 'id' | 'createdAt' | keyof ClientContext> & Partial<ClientContext>,
  context: ClientContext,
) {
  const data = loadAuditData()
  const event: AuditEvent = {
    id: createId('evt'),
    createdAt: new Date().toISOString(),
    ...contextFields(context),
    ...input,
  }
  data.events.unshift(event)
  saveAuditData(data)
  return event
}

export function startAuditSession(session: AuthSession, context: ClientContext): AuditSession {
  const data = loadAuditData()
  const createdAt = new Date().toISOString()
  const auditSession: AuditSession = {
    id: session.sessionId,
    userId: session.userId,
    username: session.username,
    loginAt: createdAt,
    ...contextFields(context),
    pagesVisited: [],
    pageDurations: {},
    status: 'active',
    lastActivityAt: createdAt,
  }

  data.sessions.unshift(auditSession)
  data.events.unshift({
    id: createId('evt'),
    userId: session.userId,
    username: session.username,
    sessionId: session.sessionId,
    category: 'auth',
    action: 'Login',
    details: 'Successful sign-in to RHB Premier Online Banking',
    severity: 'info',
    createdAt,
    ...contextFields(context),
  })

  setActiveSessionId(session.sessionId)
  saveAuditData(data)
  return auditSession
}

export function endAuditSession(sessionId: string, context: ClientContext) {
  const data = loadAuditData()
  const index = data.sessions.findIndex((entry) => entry.id === sessionId && !entry.logoutAt)
  if (index === -1) return

  const entry = data.sessions[index]
  const logoutAt = new Date().toISOString()
  const durationMs = new Date(logoutAt).getTime() - new Date(entry.loginAt).getTime()

  data.sessions[index] = {
    ...entry,
    logoutAt,
    durationMs,
    status: 'offline',
    lastActivityAt: logoutAt,
  }

  data.events.unshift({
    id: createId('evt'),
    userId: entry.userId,
    username: entry.username,
    sessionId,
    category: 'auth',
    action: 'Logout',
    details: `Session ended — duration ${Math.max(1, Math.round(durationMs / 60000))}m`,
    durationMs,
    severity: 'info',
    createdAt: logoutAt,
    ...contextFields(context),
  })

  setActiveSessionId(null)
  saveAuditData(data)
}

export function logFailedLogin(username: string, reason: string, context: ClientContext) {
  const data = loadAuditData()
  const attempt: FailedLoginAttempt = {
    id: createId('fail'),
    username,
    reason,
    createdAt: new Date().toISOString(),
    ...contextFields(context),
  }

  data.failedLogins.unshift(attempt)

  if (attempt.location.country !== 'Malaysia' && attempt.location.country !== 'Unknown') {
    data.alerts.unshift({
      id: createId('alert'),
      username,
      type: 'Suspicious login',
      message: `Failed login attempt for "${username}" from ${attempt.location.city}, ${attempt.location.country}.`,
      severity: 'warning',
      createdAt: new Date().toISOString(),
      resolved: false,
    })
  }

  saveAuditData(data)
}

export function logPageVisit(
  session: AuthSession,
  page: string,
  durationMs: number,
  context: ClientContext,
) {
  const data = loadAuditData()
  const index = data.sessions.findIndex((entry) => entry.id === session.sessionId)
  if (index >= 0) {
    const entry = data.sessions[index]
    const pagesVisited = entry.pagesVisited.includes(page)
      ? entry.pagesVisited
      : [...entry.pagesVisited, page]
    data.sessions[index] = {
      ...entry,
      pagesVisited,
      pageDurations: {
        ...entry.pageDurations,
        [page]: (entry.pageDurations[page] ?? 0) + durationMs,
      },
      lastActivityAt: new Date().toISOString(),
      status: 'active',
    }
  }

  data.events.unshift({
    id: createId('evt'),
    userId: session.userId,
    username: session.username,
    sessionId: session.sessionId,
    category: 'navigation',
    action: 'Page View',
    details: `Visited ${page.replace('/dashboard', 'account area').replace('/admin', 'admin area')}`,
    page,
    durationMs,
    severity: 'info',
    createdAt: new Date().toISOString(),
    ...contextFields(context),
  })

  saveAuditData(data)
}

export function logUserAction(
  session: AuthSession,
  category: AuditEvent['category'],
  action: string,
  details: string,
  context: ClientContext,
  severity: AuditEvent['severity'] = 'info',
) {
  logAuditEvent(
    {
      userId: session.userId,
      username: session.username,
      sessionId: session.sessionId,
      category,
      action,
      details,
      severity,
    },
    context,
  )
}

export function updateSessionPresence(sessionId: string, status: UserPresence) {
  const data = loadAuditData()
  const index = data.sessions.findIndex((entry) => entry.id === sessionId && !entry.logoutAt)
  if (index === -1) return
  data.sessions[index] = { ...data.sessions[index], status, lastActivityAt: new Date().toISOString() }
  saveAuditData(data)
}

export function getAuditEventsForUser(userId: string) {
  return loadAuditData().events.filter((event) => event.userId === userId)
}

export function getSessionsForUser(userId: string) {
  return loadAuditData().sessions.filter((session) => session.userId === userId)
}

export function getFailedLoginsForUser(username: string) {
  return loadAuditData().failedLogins.filter(
    (attempt) => attempt.username.toLowerCase() === username.toLowerCase(),
  )
}

export function getAlertsForUser(userId: string) {
  return loadAuditData().alerts.filter((alert) => alert.userId === userId)
}

export function exportAuditCsv(events: AuditEvent[]) {
  const headers = [
    'Timestamp',
    'Username',
    'Session',
    'Category',
    'Action',
    'Details',
    'Page',
    'Duration (ms)',
    'IP Address',
    'Location',
    'PIN Code',
    'Location Source',
    'Device',
    'OS',
    'Browser',
    'Login Photo',
    'Severity',
  ]

  const rows = events.map((event) => [
    event.createdAt,
    event.username,
    event.sessionId,
    event.category,
    event.action,
    event.details,
    event.page ?? '',
    event.durationMs?.toString() ?? '',
    event.ipAddress,
    [event.location.city, event.location.state, event.location.country].filter(Boolean).join(', '),
    event.location.pincode ?? '',
    event.location.source ?? '',
    event.device,
    event.os,
    event.browser,
    event.loginPhoto ? 'Captured' : '',
    event.severity,
  ])

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `premier-activity-report-${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
  URL.revokeObjectURL(url)
}
