export type AuditActionCategory =
  | 'auth'
  | 'navigation'
  | 'transaction'
  | 'account'
  | 'security'
  | 'export'
  | 'admin'

export type UserPresence = 'active' | 'idle' | 'offline'

export type GeoLocation = {
  country: string
  state?: string
  city: string
  pincode?: string
  source?: 'device' | 'ip'
}

export type ClientContext = {
  ipAddress: string
  location: GeoLocation
  device: string
  os: string
  browser: string
  userAgent: string
  loginPhoto?: string
}

export type AuditEvent = {
  id: string
  userId: string
  username: string
  sessionId: string
  category: AuditActionCategory
  action: string
  details: string
  page?: string
  durationMs?: number
  ipAddress: string
  location: GeoLocation
  device: string
  os: string
  browser: string
  userAgent: string
  loginPhoto?: string
  severity: 'info' | 'warning' | 'critical'
  createdAt: string
}

export type AuditSession = {
  id: string
  userId: string
  username: string
  loginAt: string
  logoutAt?: string
  durationMs?: number
  ipAddress: string
  location: GeoLocation
  device: string
  os: string
  browser: string
  userAgent: string
  loginPhoto?: string
  pagesVisited: string[]
  pageDurations: Record<string, number>
  status: UserPresence
  lastActivityAt: string
}

export type FailedLoginAttempt = {
  id: string
  username: string
  ipAddress: string
  location: GeoLocation
  device: string
  os: string
  browser: string
  userAgent: string
  loginPhoto?: string
  reason: string
  createdAt: string
}

export type SecurityAlert = {
  id: string
  userId?: string
  username?: string
  type: string
  message: string
  severity: 'warning' | 'critical'
  createdAt: string
  resolved: boolean
}

export type AuditData = {
  events: AuditEvent[]
  sessions: AuditSession[]
  failedLogins: FailedLoginAttempt[]
  alerts: SecurityAlert[]
}
