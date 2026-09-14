import type { ReactNode } from 'react'
import { formatDateTime } from '../../lib/format'
import { formatDuration, formatLocation, formatLocationSource } from '../../lib/deviceInfo'
import type { AuditSession, FailedLoginAttempt, UserPresence } from '../../types/audit'
import { LoginPhotoCell } from './LoginPhotoCell'

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

function MobileField({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="admin-activities__mobile-field">
      <span className="admin-activities__mobile-label">{label}</span>
      <span className="admin-activities__mobile-value">{value}</span>
    </div>
  )
}

export function SessionMobileCards({ sessions }: { sessions: AuditSession[] }) {
  if (sessions.length === 0) {
    return <p className="text-muted text-sm admin-activities__mobile-only">No sessions recorded.</p>
  }

  return (
    <div className="admin-activities__mobile-list admin-activities__mobile-only">
      {sessions.map((session) => (
        <article key={session.id} className="admin-activities__mobile-card">
          <div className="admin-activities__mobile-card-head">
            <LoginPhotoCell photo={session.loginPhoto} label={`${session.username} login photo`} />
            <div className="admin-activities__mobile-card-title">
              <p className="font-bold text-navy">@{session.username}</p>
              <p className="text-xs text-muted">{formatDateTime(session.loginAt)}</p>
              <span className={`admin-activities__badge ${presenceClass(session.status)}`}>
                {presenceLabel(session.status)}
              </span>
            </div>
          </div>
          <div className="admin-activities__mobile-grid">
            <MobileField label="Username" value={`@${session.username}`} />
            <MobileField
              label="Duration"
              value={session.durationMs ? formatDuration(session.durationMs) : 'In progress'}
            />
            <MobileField
              label="Logout"
              value={session.logoutAt ? formatDateTime(session.logoutAt) : '—'}
            />
            <MobileField label="IP" value={session.ipAddress} />
            <MobileField label="Location" value={formatLocation(session.location)} />
            <MobileField label="PIN" value={session.location.pincode ?? '—'} />
            <MobileField label="Source" value={formatLocationSource(session.location)} />
            <MobileField
              label="Device"
              value={`${session.device} · ${session.os} · ${session.browser}`}
            />
            <MobileField label="Pages" value={session.pagesVisited.length} />
          </div>
        </article>
      ))}
    </div>
  )
}

export function FailedLoginMobileCards({ attempts }: { attempts: FailedLoginAttempt[] }) {
  if (attempts.length === 0) {
    return (
      <p className="text-muted text-sm admin-activities__mobile-only">No failed login attempts.</p>
    )
  }

  return (
    <div className="admin-activities__mobile-list admin-activities__mobile-only">
      {attempts.map((attempt) => (
        <article key={attempt.id} className="admin-activities__mobile-card">
          <div className="admin-activities__mobile-card-head">
            <LoginPhotoCell photo={attempt.loginPhoto} label={`${attempt.username} failed login photo`} />
            <div className="admin-activities__mobile-card-title">
              <p className="font-bold text-navy">{attempt.username}</p>
              <p className="text-xs text-muted">{formatDateTime(attempt.createdAt)}</p>
            </div>
          </div>
          <div className="admin-activities__mobile-grid">
            <MobileField label="Reason" value={attempt.reason} />
            <MobileField label="IP" value={attempt.ipAddress} />
            <MobileField label="Location" value={formatLocation(attempt.location)} />
            <MobileField label="PIN" value={attempt.location.pincode ?? '—'} />
            <MobileField label="Source" value={formatLocationSource(attempt.location)} />
            <MobileField label="Device" value={`${attempt.device} · ${attempt.browser}`} />
          </div>
        </article>
      ))}
    </div>
  )
}
