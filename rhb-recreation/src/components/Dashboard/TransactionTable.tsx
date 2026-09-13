import { formatCurrency, formatDateTime } from '../../lib/bankingStorage'
import type { Transaction } from '../../types/banking'

type TransactionTableProps = {
  transactions: Transaction[]
  showUser?: boolean
}

export function TransactionTable({ transactions, showUser = false }: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="dashboard-card">
        <p className="text-muted text-sm">No transactions recorded yet.</p>
      </div>
    )
  }

  return (
    <div className="dashboard-card overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="dashboard-table w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>JHB Transaction ID</th>
              {showUser ? <th>Customer</th> : null}
              <th>Description</th>
              <th>Type</th>
              <th className="text-right">Amount</th>
              <th className="text-right">Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id}>
                <td className="whitespace-nowrap">{formatDateTime(txn.createdAt)}</td>
                <td className="whitespace-nowrap font-mono text-xs text-navy">{txn.jhbTransactionId}</td>
                {showUser ? <td>{txn.username}</td> : null}
                <td>{txn.description}</td>
                <td>
                  <span className={`dashboard-pill ${txn.type === 'credit' ? 'is-credit' : 'is-debit'}`}>
                    {txn.type === 'credit' ? 'Credit' : 'Debit'}
                  </span>
                </td>
                <td className={`text-right font-bold ${txn.type === 'credit' ? 'text-primary' : 'text-accent'}`}>
                  {txn.type === 'credit' ? '+' : '-'}
                  {formatCurrency(txn.amount)}
                </td>
                <td className="text-right">{formatCurrency(txn.balanceAfter)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
