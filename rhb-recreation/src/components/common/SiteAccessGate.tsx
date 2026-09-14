import { useEffect, useState, type ReactNode } from 'react'
import { LockKeyhole } from 'lucide-react'
import { fetchSiteAccessStatus, verifySiteAccess } from '../../lib/api/banking'
import { ApiError } from '../../lib/api/client'

type SiteAccessGateProps = {
  children: ReactNode
}

export function SiteAccessGate({ children }: SiteAccessGateProps) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null)
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    void fetchSiteAccessStatus()
      .then((result) => setUnlocked(result.unlocked))
      .catch(() => setUnlocked(false))
  }, [])

  if (unlocked === null) {
    return (
      <div className="gpay-gate">
        <div className="gpay-gate__backdrop" aria-hidden />
        <div className="gpay-gate__card">
          <p className="gpay-gate__subtitle">Checking secure access…</p>
        </div>
      </div>
    )
  }

  if (unlocked) return children

  return (
    <div className="gpay-gate">
      <div className="gpay-gate__backdrop" aria-hidden />
      <div className="gpay-gate__card">
        <div className="gpay-gate__brand">
          <img
            src="/assets/logos/rhb-premier-login.png"
            alt="RHB Premier"
            className="gpay-gate__logo"
          />
          <span className="gpay-gate__badge">Private Access</span>
        </div>
        <div className="gpay-gate__icon">
          <LockKeyhole size={22} strokeWidth={2.25} />
        </div>
        <h1 className="gpay-gate__title">Welcome to RHB Premier</h1>
        <p className="gpay-gate__subtitle">Enter your access PIN to continue securely</p>

        <form
          className="gpay-gate__form"
          onSubmit={(event) => {
            event.preventDefault()
            setSubmitting(true)
            setError('')

            void verifySiteAccess(pin)
              .then(() => {
                setUnlocked(true)
                setPin('')
              })
              .catch((err) => {
                setError(err instanceof ApiError ? err.message : 'Incorrect PIN. Please try again.')
                setPin('')
              })
              .finally(() => setSubmitting(false))
          }}
        >
          <input
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            value={pin}
            onChange={(event) => setPin(event.target.value.replace(/\D/g, '').slice(0, 4))}
            className="gpay-gate__input"
            placeholder="Enter 4-digit PIN"
            autoComplete="off"
            autoFocus
          />
          {error ? <p className="gpay-gate__error">{error}</p> : null}
          <button type="submit" className="gpay-gate__submit" disabled={pin.length < 4 || submitting}>
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}
