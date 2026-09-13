import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { validateCredentials } from '../lib/bankingStorage'
import { clearClientContextCache, getLoginClientContext } from '../lib/deviceInfo'
import { captureLoginPhoto, startLoginCamera, stopLoginCamera } from '../lib/loginPhoto'

type LoginStep = 'credentials' | 'photo'

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<LoginStep>('credentials')
  const [cameraReady, setCameraReady] = useState(false)
  const [cameraError, setCameraError] = useState('')
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { login } = useAuth()
  const isPremier = searchParams.get('premier') === 'true'

  useEffect(() => {
    document.title = isPremier ? 'RHB Premier Online Banking | Login' : 'RHB Online Banking | Login'
    clearClientContextCache()
  }, [isPremier])

  useEffect(() => {
    if (!isPremier || step !== 'photo') return

    let active = true
    const video = videoRef.current
    setCameraReady(false)
    setCameraError('')

    void (async () => {
      if (!video) return
      const stream = await startLoginCamera(video)
      if (!active) {
        stopLoginCamera(stream)
        return
      }

      streamRef.current = stream
      if (stream) {
        setCameraReady(true)
      } else {
        setCameraError('Camera unavailable. Allow camera access to complete sign-in.')
      }
    })()

    return () => {
      active = false
      stopLoginCamera(streamRef.current)
      streamRef.current = null
    }
  }, [isPremier, step])

  const completeLogin = async (loginPhoto?: string) => {
    const trimmedUsername = username.trim()
    const trimmedPassword = password.trim()
    const context = await getLoginClientContext()
    const result = login(trimmedUsername, trimmedPassword, { ...context, loginPhoto })

    if (!result.ok) {
      setError(result.error)
      setStep('credentials')
      return
    }

    navigate(result.session.role === 'admin' ? '/admin' : '/dashboard', { replace: true })
  }

  if (!isPremier) {
    return <Navigate to="/login?premier=true" replace />
  }

  return (
    <main className="premier-login-bg login-page flex items-start sm:items-center justify-center px-3 sm:px-4 py-4 sm:py-16">
      <div className="login-card w-full max-w-[420px] bg-white rounded-md shadow-xl p-5 sm:p-8">
        <img
          src="/assets/logos/rhb-premier-login.png"
          alt="RHB Premier"
          className="h-14 sm:h-16 w-auto max-w-[320px] mb-6 object-contain object-left"
        />
        <h1 className="text-navy text-lg sm:text-2xl font-bold mb-1">RHB Premier Online Banking</h1>
        <p className="text-sm text-muted mb-3 sm:mb-4">
          {step === 'credentials'
            ? 'Welcome back. Sign in securely with your Premier banking credentials.'
            : 'Take a verification photo to complete your sign-in.'}
        </p>

        {step === 'credentials' ? (
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault()
              setError('')
              setLoading(true)

              void (async () => {
                const trimmedUsername = username.trim()
                const trimmedPassword = password.trim()
                const validated = validateCredentials(trimmedUsername, trimmedPassword)

                if (!validated) {
                  const context = await getLoginClientContext()
                  login(trimmedUsername, trimmedPassword, context)
                  setError('Invalid username or password.')
                  setLoading(false)
                  return
                }

                if (validated.role === 'admin') {
                  await completeLogin()
                  setLoading(false)
                  return
                }

                setStep('photo')
                setLoading(false)
              })()
            }}
          >
            <label className="block">
              <span className="block text-sm font-bold text-navy mb-1">Username</span>
              <input
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="login-input w-full border border-gray-4 rounded px-3 py-3"
                autoComplete="username"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="next"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-bold text-navy mb-1">Password</span>
              <input
                required
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="login-input w-full border border-gray-4 rounded px-3 py-3"
                autoComplete="current-password"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="go"
              />
            </label>

            <p className="text-xs text-muted">
              Customer accounts require a verification photo after sign-in. Admin sign-in does not require a photo.
            </p>

            {error ? <p className="text-accent text-sm font-bold">{error}</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary text-white font-bold py-3 rounded min-h-[48px] disabled:opacity-70"
            >
              {loading ? 'Verifying…' : 'Sign in'}
            </button>
          </form>
        ) : (
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault()
              setError('')
              setLoading(true)

              void (async () => {
                const video = videoRef.current
                const loginPhoto = video && cameraReady ? captureLoginPhoto(video) : undefined

                if (!loginPhoto) {
                  setError('Allow camera access and keep your face in frame to continue.')
                  setLoading(false)
                  return
                }

                await completeLogin(loginPhoto)
                setLoading(false)
              })()
            }}
          >
            <p className="text-sm text-navy font-bold">
              Signing in as <span className="text-primary">{username.trim()}</span>
            </p>

            <div className="login-camera-wrap">
              <p className="text-xs font-bold text-navy mb-2">Login verification photo</p>
              <div className="login-camera-frame">
                <video ref={videoRef} className="login-camera-video" playsInline muted autoPlay />
                {!cameraReady && !cameraError ? (
                  <span className="login-camera-placeholder">Starting camera…</span>
                ) : null}
              </div>
              <p className="text-xs text-muted mt-2">
                Allow camera and location when prompted. A photo is captured each time you sign in.
              </p>
              {cameraError ? <p className="text-xs text-accent mt-1">{cameraError}</p> : null}
            </div>

            {error ? <p className="text-accent text-sm font-bold">{error}</p> : null}

            <button
              type="submit"
              disabled={loading || !cameraReady}
              className="w-full btn-primary text-white font-bold py-3 rounded min-h-[48px] disabled:opacity-70"
            >
              {loading ? 'Completing sign-in…' : 'Complete sign-in'}
            </button>

            <button
              type="button"
              className="w-full text-sm font-bold text-primary py-2"
              onClick={() => {
                stopLoginCamera(streamRef.current)
                streamRef.current = null
                setStep('credentials')
                setError('')
                setCameraReady(false)
                setCameraError('')
              }}
            >
              Back to username & password
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
