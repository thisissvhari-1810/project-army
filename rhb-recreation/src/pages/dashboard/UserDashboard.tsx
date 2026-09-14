import { useMemo } from 'react'
import { ArrowDownLeft, ArrowUpRight, Wallet } from 'lucide-react'
import { AccountSummaryCard } from '../../components/Dashboard/AccountSummaryCard'
import { TransactionTable } from '../../components/Dashboard/TransactionTable'
import { useAuth } from '../../context/AuthContext'
import { useBalanceVisibility, maskCurrency } from '../../hooks/useBalanceVisibility'
import { useBankingData } from '../../hooks/useBankingData'
import { formatCurrency } from '../../lib/format'

export function UserDashboardOverview() {
  const { session } = useAuth()
  const bankingData = useBankingData()
  const { visible: balanceVisible } = useBalanceVisibility()

  const user = useMemo(
    () => (session ? bankingData.users.find((entry) => entry.id === session.userId) : undefined),
    [bankingData.users, session],
  )

  const transactions = useMemo(
    () =>
      session
        ? bankingData.transactions
            .filter((txn) => txn.userId === session.userId)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5)
        : [],
    [bankingData.transactions, session],
  )

  const recentCredits = transactions
    .filter((txn) => txn.type === 'credit')
    .reduce((sum, txn) => sum + txn.amount, 0)
  const recentDebits = transactions
    .filter((txn) => txn.type === 'debit')
    .reduce((sum, txn) => sum + txn.amount, 0)

  if (!user) {
    return (
      <div className="dashboard-card">
        <p className="text-muted">Unable to load account details.</p>
      </div>
    )
  }

  return (
    <div className="dashboard-premier-overview space-y-6">
      <div className="dashboard-premier-overview__intro">
        <p className="dashboard-premier-overview__kicker">RHB Premier Online Banking</p>
        <h1 className="dashboard-page-title">Welcome back, {user.displayName}</h1>
        <p className="dashboard-page-subtitle">
          Your Premier account overview with secure access to balances and transaction history.
        </p>
      </div>

      <AccountSummaryCard user={user} />

      <div className="dashboard-premier-stats">
        <article className="dashboard-premier-stat">
          <div className="dashboard-premier-stat__icon is-primary">
            <Wallet size={20} />
          </div>
          <div>
            <p className="dashboard-premier-stat__label">Current balance</p>
            <p className="dashboard-premier-stat__value">
              {maskCurrency(formatCurrency(user.balance ?? 0), balanceVisible)}
            </p>
          </div>
        </article>
        <article className="dashboard-premier-stat">
          <div className="dashboard-premier-stat__icon is-credit">
            <ArrowDownLeft size={20} />
          </div>
          <div>
            <p className="dashboard-premier-stat__label">Recent credits</p>
            <p className="dashboard-premier-stat__value">
              {maskCurrency(formatCurrency(recentCredits), balanceVisible)}
            </p>
          </div>
        </article>
        <article className="dashboard-premier-stat">
          <div className="dashboard-premier-stat__icon is-debit">
            <ArrowUpRight size={20} />
          </div>
          <div>
            <p className="dashboard-premier-stat__label">Recent debits</p>
            <p className="dashboard-premier-stat__value">
              {maskCurrency(formatCurrency(recentDebits), balanceVisible)}
            </p>
          </div>
        </article>
      </div>

      <section className="dashboard-premier-panel space-y-3">
        <div className="dashboard-premier-panel__head">
          <h2 className="dashboard-section-title">Recent transactions</h2>
          <p className="dashboard-section-desc">Latest credits and debits on your Premier account.</p>
        </div>
        <TransactionTable transactions={transactions} />
      </section>
    </div>
  )
}

export function UserTransactionsPage() {
  const { session } = useAuth()
  const bankingData = useBankingData()

  const transactions = useMemo(
    () =>
      session
        ? bankingData.transactions
            .filter((txn) => txn.userId === session.userId)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        : [],
    [bankingData.transactions, session],
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="dashboard-page-title">Transaction history</h1>
        <p className="dashboard-page-subtitle">All credits and debits on your Premier account.</p>
      </div>
      <TransactionTable transactions={transactions} />
    </div>
  )
}
