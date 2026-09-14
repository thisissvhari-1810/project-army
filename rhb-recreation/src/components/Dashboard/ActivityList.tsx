import { formatDateTime } from '../../lib/format'
import type { Activity } from '../../types/banking'

type ActivityListProps = {
  activities: Activity[]
  showUser?: boolean
}

export function ActivityList({ activities, showUser = false }: ActivityListProps) {
  if (activities.length === 0) {
    return (
      <div className="dashboard-card">
        <p className="text-muted text-sm">No activity recorded yet.</p>
      </div>
    )
  }

  return (
    <div className="dashboard-card p-0 overflow-hidden">
      <ul className="divide-y divide-gray-4/60">
        {activities.map((activity) => (
          <li key={activity.id} className="px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <p className="text-navy font-bold">{activity.action}</p>
              <p className="text-sm text-muted mt-1">{activity.details}</p>
              {showUser ? <p className="text-xs text-primary mt-1">@{activity.username}</p> : null}
            </div>
            <p className="text-xs text-muted whitespace-nowrap">{formatDateTime(activity.createdAt)}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
