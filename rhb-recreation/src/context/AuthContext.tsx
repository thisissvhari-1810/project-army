import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  createUserRequest,
  fetchSession,
  loginRequest,
  logoutRequest,
  postAdminTransaction,
} from '../lib/api/banking'
import { resetCsrfToken } from '../lib/api/client'
import type { AddAmountInput, AuthSession, NewUserInput, PublicUser } from '../types/banking'

type AuthContextValue = {
  session: AuthSession | null
  loading: boolean
  login: (
    username: string,
    password: string,
    context?: Record<string, unknown>,
  ) => Promise<{ ok: true; session: AuthSession } | { ok: false; error: string }>
  logout: () => Promise<void>
  refreshKey: number
  refresh: () => void
  createUser: (
    input: NewUserInput,
  ) => Promise<{ ok: true; user: PublicUser } | { ok: false; error: string }>
  adjustAmount: (
    input: AddAmountInput,
  ) => Promise<{ ok: true } | { ok: false; error: string }>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  const refresh = useCallback(() => setRefreshKey((value) => value + 1), [])

  useEffect(() => {
    let active = true
    void fetchSession()
      .then((result) => {
        if (active) setSession(result.session)
      })
      .catch(() => {
        if (active) setSession(null)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [refreshKey])

  const login = useCallback(async (username: string, password: string, context?: Record<string, unknown>) => {
    try {
      const result = await loginRequest({
        username,
        password,
        loginPhoto: context?.loginPhoto as string | undefined,
        clientContext: context,
      })
      setSession(result.session)
      refresh()
      return { ok: true as const, session: result.session }
    } catch (error) {
      return {
        ok: false as const,
        error: error instanceof Error ? error.message : 'Login failed.',
      }
    }
  }, [refresh])

  const logout = useCallback(async () => {
    try {
      await logoutRequest()
    } finally {
      resetCsrfToken()
      setSession(null)
    }
  }, [])

  const createUser = useCallback(async (input: NewUserInput) => {
    try {
      const result = await createUserRequest(input)
      refresh()
      return { ok: true as const, user: result.user }
    } catch (error) {
      return {
        ok: false as const,
        error: error instanceof Error ? error.message : 'Unable to create user.',
      }
    }
  }, [refresh])

  const adjustAmount = useCallback(async (input: AddAmountInput) => {
    try {
      await postAdminTransaction(input)
      refresh()
      return { ok: true as const }
    } catch (error) {
      return {
        ok: false as const,
        error: error instanceof Error ? error.message : 'Unable to post transaction.',
      }
    }
  }, [refresh])

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      loading,
      login,
      logout,
      refreshKey,
      refresh,
      createUser,
      adjustAmount,
    }),
    [session, loading, login, logout, refreshKey, refresh, createUser, adjustAmount],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
