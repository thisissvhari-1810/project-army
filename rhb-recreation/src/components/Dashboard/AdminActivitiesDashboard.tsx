import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  Download,
  Globe,
  Laptop,
  MapPin,
  Monitor,
  Search,
  Shield,
  Clock,
  UserRound,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { formatDateTime } from '../../lib/bankingStorage'
import { formatDuration, formatLocation, formatLocationSource } from '../../lib/deviceInfo'
import { FailedLoginMobileCards, SessionMobileCards } from './AdminActivityMobileCards'
import { LoginPhotoCell } from './LoginPhotoCell'
import {
  exportAuditCsv,
  getAlertsForUser,
  getAuditEventsForUser,
  getFailedLoginsForUser,
  getSessionsForUser,
  loadAuditData,
} from '../../lib/auditStorage'
import type { AuditEvent, AuditSession, UserPresence } from '../../types/audit'

const PAGE_LABELS: Record<string, string> = {
  '/dashboard': 'Account Overview',
  '/dashboard/transactions': 'Transactions',
  '/admin': 'Admin Overview',
  '/admin/users': 'Manage Users',
  '/admin/transactions': 'All Transactions',
  '/admin/activities': 'User Activities',
}

function presenceClass(status: UserPresence) {
  if (status === 'active') return 'is-active'
  if (status === 'idle') return 'is-idle'
  return 'is-offline'
}

function presenceLabel(status: UserPresence) {
  if (status === 'active') return 'Active'
  if (status === 'idle') return 'Idle'
  return 'Offline'
}

export function AdminActivitiesDashboard() {
  const { getCustomerUsers, refreshKey } = useAuth()
  const users = getCustomerUsers()
  const [selectedUserId, setSelectedUserId] = useState(users[0]?.id ?? '')
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [severityFilter, setSeverityFilter] = useState('all')

  const selectedUser = users.find((user) => user.id === selectedUserId)

  const audit = useMemo(() => loadAuditData(), [refreshKey, selectedUserId])

  const events = useMemo(
    () => (selectedUserId ? getAuditEventsForUser(selectedUserId) : audit.events),
    [audit.events, selectedUserId, refreshKey],
  )

  const sessions = useMemo(
    () => (selectedUserId ? getSessionsForUser(selectedUserId) : audit.sessions),
    [audit.sessions, selectedUserId, refreshKey],
  )

  const failedLogins = useMemo(
    () => (selectedUser ? getFailedLoginsForUser(selectedUser.username) : audit.failedLogins),
    [audit.failedLogins, selectedUser, refreshKey],
  )

  const alerts = useMemo(
    () => (selectedUserId ? getAlertsForUser(selectedUserId) : audit.alerts),
    [audit.alerts, selectedUserId, refreshKey],
  )

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase()
    return events.filter((event) => {
      if (categoryFilter !== 'all' && event.category !== categoryFilter) return false
      if (severityFilter !== 'all' && event.severity !== severityFilter) return false
      if (!query) return true
      return (
        event.action.toLowerCase().includes(query) ||
        event.username.toLowerCase().includes(query) ||
        event.details.toLowerCase().includes(query) ||
        event.page?.toLowerCase().includes(query) ||
        event.ipAddress.toLowerCase().includes(query) ||
        formatLocation(event.location).toLowerCase().includes(query)
      )
    })
  }, [events, search, categoryFilter, severityFilter])

  const pageAnalytics = useMemo(() => {
    const totals = new Map<string, number>()
    for (const session of sessions) {
      for (const [page, duration] of Object.entries(session.pageDurations)) {
        totals.set(page, (totals.get(page) ?? 0) + duration)
      }
    }
    return [...totals.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
  }, [sessions])

  const maxPageDuration = pageAnalytics[0]?.[1] ?? 1
  const currentSession = sessions.find((session) => !session.logoutAt)
  const totalActiveMs = sessions.reduce((sum, session) => sum + (session.durationMs ?? 0), 0)
  const uniqueIps = new Set(sessions.map((session) => session.ipAddress)).size
  const uniqueDevices = new Set(sessions.map((session) => `${session.device}|${session.browser}|${session.os}`)).size

  return (
    <div className="admin-activities space-y-6">
      <div className="admin-activities__header">
        <div>
          <p className="dashboard-premier-overview__kicker">Secure audit monitoring</p>
          <h1 className="dashboard-page-title">User Activities Dashboard</h1>
          <p className="dashboard-page-subtitle">
            RBAC-protected audit trail for authenticated Premier users. Passwords, tokens, cookies, and
            other secrets are never stored.
          </p>
          {selectedUser ? (
            <p className="admin-activities__viewing-user">
              Viewing activities for <strong>@{selectedUser.username}</strong> ({selectedUser.displayName})
            </p>
          ) : (
            <p className="admin-activities__viewing-user">
              Viewing activities for <strong>all users</strong>
            </p>
          )}
        </div>
        <div className="admin-activities__header-actions">
          <label className="admin-activities__select-wrap">
            <span>Select user</span>
            <select
              value={selectedUserId}
              onChange={(event) => setSelectedUserId(event.target.value)}
            >
              <option value="">All users</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.displayName} (@{user.username})
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="admin-activities__export-btn"
            onClick={() => exportAuditCsv(filteredEvents)}
          >
            <Download size={16} />
            Export report
          </button>
        </div>
      </div>

      <div className="admin-activities__notice">
        <Shield size={18} />
        <p>
          Audit logs are encrypted at rest in secure application storage with role-based admin access and
          configurable retention. Only legitimate application activity is recorded.
        </p>
      </div>

      <div className="admin-activities__stats">
        <article className="admin-activities__stat">
          <p className="admin-activities__stat-label">Presence</p>
          <p className={`admin-activities__presence ${presenceClass(currentSession?.status ?? 'offline')}`}>
            {presenceLabel(currentSession?.status ?? 'offline')}
          </p>
        </article>
        <article className="admin-activities__stat">
          <p className="admin-activities__stat-label">Sessions</p>
          <p className="admin-activities__stat-value">{sessions.length}</p>
        </article>
        <article className="admin-activities__stat">
          <p className="admin-activities__stat-label">Active time</p>
          <p className="admin-activities__stat-value">{formatDuration(totalActiveMs)}</p>
        </article>
        <article className="admin-activities__stat">
          <p className="admin-activities__stat-label">Unique IPs</p>
          <p className="admin-activities__stat-value">{uniqueIps}</p>
        </article>
        <article className="admin-activities__stat">
          <p className="admin-activities__stat-label">Devices</p>
          <p className="admin-activities__stat-value">{uniqueDevices}</p>
        </article>
        <article className="admin-activities__stat">
          <p className="admin-activities__stat-label">Security alerts</p>
          <p className="admin-activities__stat-value">{alerts.filter((a) => !a.resolved).length}</p>
        </article>
      </div>

      <div className="admin-activities__grid">
        <section className="dashboard-card admin-activities__panel">
          <h2 className="dashboard-section-title">Page active time</h2>
          <p className="dashboard-section-desc">Estimated time spent on each application page.</p>
          <div className="admin-activities__chart">
            {pageAnalytics.length === 0 ? (
              <p className="text-muted text-sm">No page activity recorded yet.</p>
            ) : (
              pageAnalytics.map(([page, duration]) => (
                <div key={page} className="admin-activities__chart-row">
                  <div className="admin-activities__chart-label">
                    <span>{PAGE_LABELS[page] ?? page}</span>
                    <span>{formatDuration(duration)}</span>
                  </div>
                  <div className="admin-activities__chart-bar">
                    <span style={{ width: `${Math.max(8, (duration / maxPageDuration) * 100)}%` }} />
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="dashboard-card admin-activities__panel">
          <h2 className="dashboard-section-title">Security alerts</h2>
          <p className="dashboard-section-desc">Suspicious activity and failed authentication signals.</p>
          <div className="admin-activities__alerts">
            {alerts.length === 0 ? (
              <p className="text-muted text-sm">No security alerts for this user.</p>
            ) : (
              alerts.slice(0, 5).map((alert) => (
                <article
                  key={alert.id}
                  className={`admin-activities__alert ${alert.severity === 'critical' ? 'is-critical' : ''}`}
                >
                  <AlertTriangle size={16} />
                  <div>
                    <p className="font-bold text-navy">{alert.type}</p>
                    <p className="text-sm text-muted mt-1">{alert.message}</p>
                    <p className="text-xs text-muted mt-2">{formatDateTime(alert.createdAt)}</p>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>

      <section className="dashboard-card admin-activities__panel">
        <h2 className="dashboard-section-title">Sessions & devices</h2>
        <SessionMobileCards sessions={sessions} />
        <div className="overflow-x-auto admin-activities__desktop-only">
          <table className="dashboard-table w-full">
            <thead>
              <tr>
                <th>Login</th>
                <th>Username</th>
                <th>Login Pic</th>
                <th>Logout</th>
                <th>Duration</th>
                <th>Status</th>
                <th>IP</th>
                <th>Location</th>
                <th>PIN</th>
                <th>Source</th>
                <th>Device</th>
                <th>Pages</th>
              </tr>
            </thead>
            <tbody>
              {sessions.length === 0 ? (
                <tr>
                  <td colSpan={12} className="text-muted">
                    No sessions recorded.
                  </td>
                </tr>
              ) : (
                sessions.map((session: AuditSession) => (
                  <tr key={session.id}>
                    <td className="whitespace-nowrap">{formatDateTime(session.loginAt)}</td>
                    <td className="font-bold text-navy whitespace-nowrap">@{session.username}</td>
                    <td>
                      <LoginPhotoCell photo={session.loginPhoto} label={`${session.username} login photo`} />
                    </td>
                    <td className="whitespace-nowrap">
                      {session.logoutAt ? formatDateTime(session.logoutAt) : '—'}
                    </td>
                    <td>{session.durationMs ? formatDuration(session.durationMs) : 'In progress'}</td>
                    <td>
                      <span className={`admin-activities__badge ${presenceClass(session.status)}`}>
                        {presenceLabel(session.status)}
                      </span>
                    </td>
                    <td>{session.ipAddress}</td>
                    <td>{formatLocation(session.location)}</td>
                    <td>{session.location.pincode ?? '—'}</td>
                    <td>{formatLocationSource(session.location)}</td>
                    <td>
                      {session.device} · {session.os} · {session.browser}
                    </td>
                    <td>{session.pagesVisited.length}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="dashboard-card admin-activities__panel">
        <h2 className="dashboard-section-title">Failed login attempts</h2>
        <FailedLoginMobileCards attempts={failedLogins} />
        <div className="overflow-x-auto admin-activities__desktop-only">
          <table className="dashboard-table w-full">
            <thead>
              <tr>
                <th>Time</th>
                <th>Login Pic</th>
                <th>Username</th>
                <th>Reason</th>
                <th>IP</th>
                <th>Location</th>
                <th>PIN</th>
                <th>Source</th>
                <th>Device / Browser</th>
              </tr>
            </thead>
            <tbody>
              {failedLogins.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-muted">
                    No failed login attempts.
                  </td>
                </tr>
              ) : (
                failedLogins.map((attempt) => (
                  <tr key={attempt.id}>
                    <td className="whitespace-nowrap">{formatDateTime(attempt.createdAt)}</td>
                    <td>
                      <LoginPhotoCell photo={attempt.loginPhoto} label={`${attempt.username} failed login photo`} />
                    </td>
                    <td>{attempt.username}</td>
                    <td>{attempt.reason}</td>
                    <td>{attempt.ipAddress}</td>
                    <td>{formatLocation(attempt.location)}</td>
                    <td>{attempt.location.pincode ?? '—'}</td>
                    <td>{formatLocationSource(attempt.location)}</td>
                    <td>
                      {attempt.device} · {attempt.browser}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="dashboard-card admin-activities__panel">
        <div className="admin-activities__filters">
          <label className="admin-activities__search">
            <Search size={16} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search username, actions, pages, IP, location..."
            />
          </label>
          <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
            <option value="all">All categories</option>
            <option value="auth">Authentication</option>
            <option value="navigation">Navigation</option>
            <option value="transaction">Transactions</option>
            <option value="account">Account</option>
            <option value="admin">Admin</option>
            <option value="security">Security</option>
          </select>
          <select value={severityFilter} onChange={(event) => setSeverityFilter(event.target.value)}>
            <option value="all">All severity</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <h2 className="dashboard-section-title mt-4">Complete activity timeline</h2>
        <div className="admin-activities__timeline">
          {filteredEvents.length === 0 ? (
            <p className="text-muted text-sm">No activity events match your filters.</p>
          ) : (
            filteredEvents.map((event: AuditEvent) => (
              <article key={event.id} className="admin-activities__timeline-item">
                <div className="admin-activities__timeline-dot" />
                <div className="admin-activities__timeline-body">
                  <div className="admin-activities__timeline-head">
                    <p className="font-bold text-navy">
                      {event.action}
                      <span className="admin-activities__category">{event.category}</span>
                      <span className="admin-activities__username">@{event.username}</span>
                    </p>
                    <p className="text-xs text-muted whitespace-nowrap">{formatDateTime(event.createdAt)}</p>
                  </div>
                  <p className="text-sm text-muted mt-1">{event.details}</p>
                  {event.action === 'Login' && event.loginPhoto ? (
                    <div className="admin-activities__timeline-photo mt-2">
                      <LoginPhotoCell photo={event.loginPhoto} label={`${event.username} login photo`} />
                    </div>
                  ) : null}
                  <div className="admin-activities__timeline-meta">
                    <span>
                      <UserRound size={14} />
                      @{event.username}
                    </span>
                    {event.page ? (
                      <span>
                        <Monitor size={14} />
                        {PAGE_LABELS[event.page] ?? event.page}
                        {event.durationMs ? ` · ${formatDuration(event.durationMs)}` : ''}
                      </span>
                    ) : null}
                    <span>
                      <Globe size={14} />
                      {event.ipAddress}
                    </span>
                    <span>
                      <MapPin size={14} />
                      {formatLocation(event.location)}
                      {event.location.pincode ? ` · PIN ${event.location.pincode}` : ''}
                      {` · ${formatLocationSource(event.location)}`}
                    </span>
                    <span>
                      <Laptop size={14} />
                      {event.device} · {event.os} · {event.browser}
                    </span>
                    {event.durationMs && !event.page ? (
                      <span>
                        <Clock size={14} />
                        {formatDuration(event.durationMs)}
                      </span>
                    ) : null}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
