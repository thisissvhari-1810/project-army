import { ActivityList } from '../../components/Dashboard/ActivityList'
import { AdminActivitiesDashboard } from '../../components/Dashboard/AdminActivitiesDashboard'
import { AddAmountForm } from '../../components/Dashboard/AddAmountForm'
import { AddUserForm } from '../../components/Dashboard/AddUserForm'
import { TransactionTable } from '../../components/Dashboard/TransactionTable'
import { UserListTable } from '../../components/Dashboard/UserListTable'
import { useAuth } from '../../context/AuthContext'
import { formatCurrency } from '../../lib/bankingStorage'

export function AdminDashboardOverview() {
  const { getCustomerUsers, getAllTransactionsList, getAllActivitiesList } = useAuth()
  const users = getCustomerUsers()
  const totalBalance = users.reduce((sum, user) => sum + user.balance, 0)
  const transactions = getAllTransactionsList().slice(0, 5)
  const activities = getAllActivitiesList().slice(0, 5)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="dashboard-page-title">Premier Admin Console</h1>
        <p className="dashboard-page-subtitle">Manage customer accounts, post transactions, and monitor activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <article className="dashboard-stat-card">
          <p className="dashboard-stat-label">Customers</p>
          <p className="dashboard-stat-value">{users.length}</p>
        </article>
        <article className="dashboard-stat-card">
          <p className="dashboard-stat-label">Total deposits</p>
          <p className="dashboard-stat-value text-[28px] md:text-[32px]">{formatCurrency(totalBalance)}</p>
        </article>
        <article className="dashboard-stat-card">
          <p className="dashboard-stat-label">Transactions</p>
          <p className="dashboard-stat-value">{getAllTransactionsList().length}</p>
        </article>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AddUserForm />
        <AddAmountForm />
      </div>

      <section className="space-y-3">
        <h2 className="dashboard-section-title">Recent transactions</h2>
        <TransactionTable transactions={transactions} showUser />
      </section>

      <section className="space-y-3">
        <h2 className="dashboard-section-title">Recent activity</h2>
        <ActivityList activities={activities} showUser />
      </section>
    </div>
  )
}

export function AdminUsersPage() {
  const { getCustomerUsers } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="dashboard-page-title">Manage users</h1>
        <p className="dashboard-page-subtitle">Create Premier customer accounts and review existing profiles.</p>
      </div>
      <AddUserForm />
      <section className="space-y-3">
        <h2 className="dashboard-section-title">Customer accounts</h2>
        <UserListTable users={getCustomerUsers()} />
      </section>
    </div>
  )
}

export function AdminTransactionsPage() {
  const { getAllTransactionsList } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="dashboard-page-title">All transactions</h1>
        <p className="dashboard-page-subtitle">Full ledger of credits and debits across Premier accounts.</p>
      </div>
      <AddAmountForm />
      <TransactionTable transactions={getAllTransactionsList()} showUser />
    </div>
  )
}

export function AdminActivitiesPage() {
  return <AdminActivitiesDashboard />
}
