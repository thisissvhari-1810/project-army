import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ActionButton } from '../components/common/ActionButton'

export function Login() {
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    document.title = 'RHB Online Banking | Login'
  }, [])

  return (
    <main className="min-h-[70vh] bg-[linear-gradient(135deg,#002e69,#0067b1)] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[420px] bg-white rounded-md shadow-xl p-8">
        <img src="/assets/logos/logo-blue.svg" alt="RHB" className="h-10 w-auto mb-6" />
        <h1 className="text-navy text-2xl font-bold mb-1">RHB Online Banking</h1>
        <p className="text-sm text-muted mb-6">This is a frontend demo login. No credentials are sent or stored.</p>
        {submitted ? (
          <div className="text-center">
            <p className="text-navy font-bold mb-4">Demo session started.</p>
            <Link to="/" className="btn-primary text-white font-bold px-6 py-3 rounded inline-block">
              Back to Home
            </Link>
          </div>
        ) : (
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault()
              setSubmitted(true)
            }}
          >
            <label className="block">
              <span className="block text-sm font-bold text-navy mb-1">Username</span>
              <input required className="w-full border border-gray-4 rounded px-3 py-3" autoComplete="username" />
            </label>
            <label className="block">
              <span className="block text-sm font-bold text-navy mb-1">Password</span>
              <input required type="password" className="w-full border border-gray-4 rounded px-3 py-3" autoComplete="current-password" />
            </label>
            <button type="submit" className="w-full btn-primary text-white font-bold py-3 rounded">
              Login
            </button>
            <div className="flex justify-between text-sm">
              <ActionButton className="text-primary font-bold" title="Forgot username or password?" description="Reset requests are disabled in this frontend recreation. Please use official RHB channels for live banking.">
                Forgot username / password
              </ActionButton>
              <ActionButton className="text-primary font-bold" title="Register" description="Account registration is not processed in this demo. Visit a branch or the official RHB site to apply.">
                Register
              </ActionButton>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}
