import { formatCurrency, formatDateTime } from '../../lib/format'
import type { PublicUser } from '../../types/banking'

type UserListTableProps = {
  users: PublicUser[]
}

export function UserListTable({ users }: UserListTableProps) {
  if (users.length === 0) {
    return (
      <div className="dashboard-card">
        <p className="text-muted text-sm">No customer accounts yet.</p>
      </div>
    )
  }

  return (
    <div className="dashboard-card overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="dashboard-table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Account no.</th>
              <th className="text-right">Balance</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="font-bold text-navy">{user.displayName}</td>
                <td>{user.username}</td>
                <td>{user.accountNumber}</td>
                <td className="text-right font-bold text-primary">{formatCurrency(user.balance ?? 0)}</td>
                <td className="whitespace-nowrap">{formatDateTime(user.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
