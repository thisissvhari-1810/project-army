import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getClientContext } from '../lib/deviceInfo'
import { logPageVisit, updateSessionPresence } from '../lib/auditStorage'

const IDLE_MS = 5 * 60 * 1000

export function useActivityTracker() {
  const { pathname } = useLocation()
  const { session } = useAuth()
  const pageEnteredAt = useRef(Date.now())
  const lastPath = useRef(pathname)
  const lastActiveAt = useRef(Date.now())

  useEffect(() => {
    if (!session) return

    const onActivity = () => {
      lastActiveAt.current = Date.now()
      updateSessionPresence(session.sessionId, 'active')
    }

    window.addEventListener('mousemove', onActivity)
    window.addEventListener('keydown', onActivity)
    window.addEventListener('click', onActivity)
    window.addEventListener('scroll', onActivity)

    const idleTimer = window.setInterval(() => {
      const idleFor = Date.now() - lastActiveAt.current
      updateSessionPresence(session.sessionId, idleFor >= IDLE_MS ? 'idle' : 'active')
    }, 30000)

    return () => {
      window.removeEventListener('mousemove', onActivity)
      window.removeEventListener('keydown', onActivity)
      window.removeEventListener('click', onActivity)
      window.removeEventListener('scroll', onActivity)
      window.clearInterval(idleTimer)
    }
  }, [session])

  useEffect(() => {
    if (!session) return

    const trackPreviousPage = async () => {
      if (lastPath.current === pathname) return
      const durationMs = Date.now() - pageEnteredAt.current
      if (durationMs > 500 && (lastPath.current.startsWith('/dashboard') || lastPath.current.startsWith('/admin'))) {
        const context = await getClientContext()
        logPageVisit(session, lastPath.current, durationMs, context)
      }
      lastPath.current = pathname
      pageEnteredAt.current = Date.now()
    }

    void trackPreviousPage()
  }, [pathname, session])

  useEffect(() => {
    if (!session) return

    return () => {
      const durationMs = Date.now() - pageEnteredAt.current
      if (durationMs > 500 && (pathname.startsWith('/dashboard') || pathname.startsWith('/admin'))) {
        void getClientContext().then((context) => logPageVisit(session, pathname, durationMs, context))
      }
    }
  }, [pathname, session])
}
