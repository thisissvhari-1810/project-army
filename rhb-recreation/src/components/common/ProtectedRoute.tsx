import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { loadSession } from '../../lib/bankingStorage'
import type { UserRole } from '../../types/banking'
import type { ReactNode } from 'react'

type ProtectedRouteProps = {
  children: ReactNode
  role?: UserRole
}

export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { session } = useAuth()
  const activeSession = session ?? loadSession()

  if (!activeSession) {
    return <Navigate to="/login?premier=true" replace />
  }

  if (role && activeSession.role !== role) {
    return <Navigate to={activeSession.role === 'admin' ? '/admin' : '/dashboard'} replace />
  }

  return children
}
