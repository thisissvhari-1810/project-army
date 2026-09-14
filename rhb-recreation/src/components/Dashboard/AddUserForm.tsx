import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export function AddUserForm() {
  const { createUser } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [initialBalance, setInitialBalance] = useState('0')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  return (
    <form
      className="dashboard-card space-y-4"
      onSubmit={(event) => {
        event.preventDefault()
        setMessage('')
        setError('')
        setSubmitting(true)

        void createUser({
          username,
          password,
          displayName,
          initialBalance: Number(initialBalance) || 0,
        }).then((result) => {
          if (!result.ok) {
            setError(result.error)
            return
          }
          setMessage(`Premier account created for ${result.user.displayName}.`)
          setUsername('')
          setPassword('')
          setDisplayName('')
          setInitialBalance('0')
        }).finally(() => setSubmitting(false))
      }}
    >
      <div>
        <h2 className="dashboard-section-title">Add Premier Customer</h2>
        <p className="dashboard-section-desc">Create a new user account with an optional opening balance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="dashboard-field">
          <span>Username</span>
          <input required value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <label className="dashboard-field">
          <span>Password</span>
          <input
            required
            type="password"
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <label className="dashboard-field md:col-span-2">
          <span>Full name</span>
          <input required value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
        </label>
        <label className="dashboard-field">
          <span>Initial balance (USD)</span>
          <input
            required
            type="number"
            min="0"
            step="0.01"
            value={initialBalance}
            onChange={(event) => setInitialBalance(event.target.value)}
          />
        </label>
      </div>

      {error ? <p className="text-accent text-sm font-bold">{error}</p> : null}
      {message ? <p className="text-primary text-sm font-bold">{message}</p> : null}

      <button type="submit" disabled={submitting} className="btn-primary text-white font-bold px-6 py-3 rounded">
        {submitting ? 'Creating…' : 'Create account'}
      </button>
    </form>
  )
}
