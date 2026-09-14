import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useBankingData } from '../../hooks/useBankingData'
import { formatCurrency } from '../../lib/format'

export function AddAmountForm() {
  const { adjustAmount } = useAuth()
  const bankingData = useBankingData()
  const users = bankingData.users.filter((user) => user.role === 'user')
  const [userId, setUserId] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<'credit' | 'debit'>('credit')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const selectedUser = users.find((user) => user.id === userId)
  const activeUserId = userId || users[0]?.id || ''

  if (users.length === 0) {
    return (
      <div className="dashboard-card">
        <h2 className="dashboard-section-title">Add / Deduct Amount</h2>
        <p className="dashboard-section-desc mt-2">Create a customer account first before posting transactions.</p>
      </div>
    )
  }

  return (
    <form
      className="dashboard-card space-y-4"
      onSubmit={(event) => {
        event.preventDefault()
        setMessage('')
        setError('')
        setSubmitting(true)

        void adjustAmount({
          userId: activeUserId,
          amount: Number(amount),
          type,
          description,
        }).then((result) => {
          if (!result.ok) {
            setError(result.error)
            return
          }
          setMessage('Transaction posted successfully.')
          setAmount('')
          setDescription('')
        }).finally(() => setSubmitting(false))
      }}
    >
      <div>
        <h2 className="dashboard-section-title">Add / Deduct Amount</h2>
        <p className="dashboard-section-desc">Post a credit or debit to a Premier customer account.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="dashboard-field md:col-span-2">
          <span>Customer account</span>
          <select required value={activeUserId} onChange={(event) => setUserId(event.target.value)}>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.displayName} ({user.username}) — {formatCurrency(user.balance ?? 0)}
              </option>
            ))}
          </select>
        </label>
        <label className="dashboard-field">
          <span>Transaction type</span>
          <select value={type} onChange={(event) => setType(event.target.value as 'credit' | 'debit')}>
            <option value="credit">Credit (add funds)</option>
            <option value="debit">Debit (deduct funds)</option>
          </select>
        </label>
        <label className="dashboard-field">
          <span>Amount (USD)</span>
          <input
            required
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </label>
        <label className="dashboard-field md:col-span-2">
          <span>Description</span>
          <input
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="e.g. Salary credit, bill payment"
          />
        </label>
      </div>

      {selectedUser ? (
        <p className="text-sm text-muted">
          Current balance:{' '}
          <span className="text-navy font-bold">{formatCurrency(selectedUser.balance ?? 0)}</span>
        </p>
      ) : null}

      {error ? <p className="text-accent text-sm font-bold">{error}</p> : null}
      {message ? <p className="text-primary text-sm font-bold">{message}</p> : null}

      <button type="submit" disabled={submitting} className="btn-primary text-white font-bold px-6 py-3 rounded">
        {submitting ? 'Posting…' : 'Post transaction'}
      </button>
    </form>
  )
}
