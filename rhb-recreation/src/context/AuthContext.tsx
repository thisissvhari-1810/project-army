import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import {
  endAuditSession,
  getActiveSessionId,
  logFailedLogin,
  logUserAction,
  startAuditSession,
} from '../lib/auditStorage'
import { clearClientContextCache, getClientContext, getLoginClientContext } from '../lib/deviceInfo'
import { syncBankingFromRemote } from '../lib/bankingSync'
import {
  addAmount as addAmountStorage,
  addUser as addUserStorage,
  authenticate,
  getActivitiesForUser,
  getAllActivities,
  getAllTransactions,
  getTransactionsForUser,
  getUserById,
  getUsers,
  loadSession,
  logoutSession,
  subscribeBankingUpdates,
} from '../lib/bankingStorage'
import type { AddAmountInput, AuthSession, BankUser, NewUserInput } from '../types/banking'

type AuthContextValue = {
  session: AuthSession | null
  login: (
    username: string,
    password: string,
    context?: Awaited<ReturnType<typeof getClientContext>>,
  ) => { ok: true; session: AuthSession } | { ok: false; error: string }
  logout: () => void
  refreshKey: number
  refresh: () => void
  getCurrentUser: () => BankUser | undefined
  getCustomerUsers: () => BankUser[]
  getUserTransactions: (userId: string) => ReturnType<typeof getTransactionsForUser>
  getAllTransactionsList: () => ReturnType<typeof getAllTransactions>
  getUserActivities: (userId: string) => ReturnType<typeof getActivitiesForUser>
  getAllActivitiesList: () => ReturnType<typeof getAllActivities>
  createUser: (input: NewUserInput) => ReturnType<typeof addUserStorage>
  adjustAmount: (input: AddAmountInput) => ReturnType<typeof addAmountStorage>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function readActiveSession(): AuthSession | null {
  const path = window.location.pathname
  const onBankingRoute = path.startsWith('/dashboard') || path.startsWith('/admin')
  if (!onBankingRoute) {
    logoutSession()
    return null
  }
  return loadSession()
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const [session, setSession] = useState<AuthSession | null>(() => readActiveSession())
  const [refreshKey, setRefreshKey] = useState(0)

  const refresh = useCallback(() => setRefreshKey((value) => value + 1), [])

  useEffect(() => {
    const onBankingRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/admin')
    if (!onBankingRoute) return
    const stored = loadSession()
    if (stored) setSession(stored)
  }, [pathname])

  useEffect(() => {
    return subscribeBankingUpdates(refresh)
  }, [refresh])

  useEffect(() => {
    const onBankingRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/admin')
    if (!onBankingRoute) return

    const syncBanking = () => {
      void syncBankingFromRemote().then((changed) => {
        if (changed) refresh()
      })
    }

    syncBanking()

    const onVisible = () => {
      if (document.visibilityState === 'visible') syncBanking()
    }

    const onPageShow = () => syncBanking()

    window.addEventListener('focus', syncBanking)
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('pageshow', onPageShow)
    const interval = window.setInterval(syncBanking, 3000)

    return () => {
      window.removeEventListener('focus', syncBanking)
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('pageshow', onPageShow)
      window.clearInterval(interval)
    }
  }, [pathname, refresh])

  const login = useCallback((username: string, password: string, context?: Awaited<ReturnType<typeof getClientContext>>) => {
    const nextSession = authenticate(username.trim(), password)
    if (!nextSession) {
      void (context ? Promise.resolve(context) : getLoginClientContext()).then((resolved) =>
        logFailedLogin(username.trim(), 'Invalid username or password.', resolved),
      )
      return { ok: false as const, error: 'Invalid username or password.' }
    }

    void (context ? Promise.resolve(context) : getLoginClientContext()).then((resolved) => {
      const previousSessionId = getActiveSessionId()
      if (previousSessionId && previousSessionId !== nextSession.sessionId) {
        endAuditSession(previousSessionId, resolved)
      }
      startAuditSession(nextSession, resolved)
    })
    setSession(nextSession)
    refresh()
    return { ok: true as const, session: nextSession }
  }, [refresh])

  const logout = useCallback(() => {
    const current = session ?? loadSession()
    if (current?.sessionId) {
      void getClientContext().then((context) => endAuditSession(current.sessionId, context))
    }
    logoutSession()
    clearClientContextCache()
    setSession(null)
  }, [session])

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      login,
      logout,
      refreshKey,
      refresh,
      getCurrentUser: () => (session ? getUserById(session.userId) : undefined),
      getCustomerUsers: () => getUsers(),
      getUserTransactions: (userId) => getTransactionsForUser(userId),
      getAllTransactionsList: () => getAllTransactions(),
      getUserActivities: (userId) => getActivitiesForUser(userId),
      getAllActivitiesList: () => getAllActivities(),
      createUser: (input) => {
        const result = addUserStorage(input, session?.username ?? 'admin')
        if (result.ok && session) {
          void getClientContext().then((context) =>
            logUserAction(
              session,
              'admin',
              'Create',
              `Created Premier account for ${result.user.displayName}`,
              context,
            ),
          )
          refresh()
        }
        return result
      },
      adjustAmount: (input) => {
        const result = addAmountStorage(input, session?.username ?? 'admin')
        if (result.ok && session) {
          void getClientContext().then((context) =>
            logUserAction(
              session,
              'transaction',
              input.type === 'credit' ? 'Credit' : 'Debit',
              `${input.type === 'credit' ? 'Credited' : 'Debited'} account ${input.userId}`,
              context,
            ),
          )
          refresh()
        }
        return result
      },
    }),
    [session, login, logout, refreshKey, refresh],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
