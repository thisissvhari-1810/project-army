import type { AuditEvent } from '../types/audit'
import { formatDateTime } from './format'

export function exportAuditCsv(events: AuditEvent[]) {
  const header = ['Time', 'Username', 'Category', 'Action', 'Details', 'IP', 'Page']
  const rows = events.map((event) => [
    formatDateTime(event.createdAt),
    event.username,
    event.category,
    event.action,
    event.details,
    event.ipAddress,
    event.page ?? '',
  ])

  const csv = [header, ...rows]
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
