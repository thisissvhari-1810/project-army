import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import type { UserRole } from '../../types/banking'
import type { ReactNode } from 'react'

type ProtectedRouteProps = {
  children: ReactNode
  role?: UserRole
}

export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky">
        <p className="text-muted">Loading secure session…</p>
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login?premier=true" replace />
  }

  if (role && session.role !== role) {
    return <Navigate to={session.role === 'admin' ? '/admin' : '/dashboard'} replace />
  }

  return children
}
