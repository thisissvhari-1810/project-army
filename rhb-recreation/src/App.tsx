import { useEffect, useRef } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { CookieBanner } from './components/common/CookieBanner'
import { SiteAccessGate } from './components/common/SiteAccessGate'
import { FloatingCta } from './components/common/FloatingCta'
import { PopupHost } from './components/common/PopupHost'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { ProtectedRoute } from './components/common/ProtectedRoute'
import { AuthProvider, useAuth } from './context/AuthContext'
import { PopupProvider } from './context/PopupContext'
import { DashboardLayout } from './layouts/DashboardLayout'
import {
  AdminActivitiesPage,
  AdminDashboardOverview,
  AdminTransactionsPage,
  AdminUsersPage,
} from './pages/dashboard/AdminDashboard'
import {
  UserDashboardOverview,
  UserTransactionsPage,
} from './pages/dashboard/UserDashboard'
import { About } from './pages/About'
import { Business } from './pages/Business'
import { Home } from './pages/Home'
import { Faq } from './pages/Faq'
import { FaqCategory } from './pages/FaqCategory'
import { Login } from './pages/Login'
import { Personal } from './pages/Personal'
import { Placeholder } from './pages/Placeholder'
import { Premier } from './pages/Premier'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 80)
      return
    }
    window.scrollTo(0, 0)
  }, [hash, pathname])

  return null
}

function isBankingRoute(pathname: string) {
  return pathname.startsWith('/dashboard') || pathname.startsWith('/admin')
}

function BankingSessionManager() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { session, logout } = useAuth()
  const prevPathRef = useRef(pathname)

  useEffect(() => {
    const prevPath = prevPathRef.current
    prevPathRef.current = pathname

    if (isBankingRoute(prevPath) && pathname === '/login' && session) {
      logout()
      navigate('/premier', { replace: true })
      return
    }

    if (session && !isBankingRoute(pathname) && pathname !== '/login') {
      logout()
    }
  }, [pathname, session, logout, navigate])

  return null
}

function Shell() {
  const { pathname } = useLocation()
  const isMinimalShell =
    pathname === '/login' || pathname.startsWith('/dashboard') || pathname.startsWith('/admin')

  const content = (
    <>
      {isMinimalShell ? null : <Header />}
      {isMinimalShell ? null : <FloatingCta />}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/personal" replace />} />
          <Route path="/index.html" element={<Navigate to="/personal" replace />} />
          <Route path="/premier" element={<Premier />} />
          <Route path="/overview/premier" element={<Premier />} />
          <Route path="/overview/premier/index.html" element={<Premier />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/overview/personal" element={<Personal />} />
          <Route path="/overview/personal/index.html" element={<Personal />} />
          <Route path="/business" element={<Business />} />
          <Route path="/overview/business" element={<Business />} />
          <Route path="/overview/business/index.html" element={<Business />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <DashboardLayout role="admin" />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboardOverview />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="transactions" element={<AdminTransactionsPage />} />
            <Route path="activities" element={<AdminActivitiesPage />} />
          </Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="user">
                <DashboardLayout role="user" />
              </ProtectedRoute>
            }
          >
            <Route index element={<UserDashboardOverview />} />
            <Route path="transactions" element={<UserTransactionsPage />} />
          </Route>
          <Route path="/about/:slug" element={<About />} />
          <Route path="/others/about-us/:slug" element={<About />} />
          <Route path="/corporate" element={<Placeholder />} />
          <Route path="/islamic" element={<Home />} />
          <Route path="/overview/islamic" element={<Home />} />
          <Route path="/overview/islamic/index.html" element={<Home />} />
          <Route path="/investor-relations" element={<Placeholder />} />
          <Route path="/contact" element={<Placeholder />} />
          <Route path="/locate" element={<Placeholder />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/faq/:category" element={<FaqCategory />} />
          <Route path="/others/faq" element={<Faq />} />
          <Route path="/others/faq/index.html" element={<Faq />} />
          <Route path="/products-services" element={<Placeholder />} />
          <Route path="/promotions" element={<Placeholder />} />
          <Route path="/learn" element={<Placeholder />} />
          <Route path="/instant-apply" element={<Placeholder />} />
          <Route path="/placeholder/:slug" element={<Placeholder />} />
          <Route path="*" element={<Navigate to="/personal" replace />} />
        </Routes>
      </div>
      {isMinimalShell ? null : <Footer />}
      <PopupHost />
      {isMinimalShell ? null : <CookieBanner />}
    </>
  )

  if (isMinimalShell) {
    return <div className="min-h-screen flex flex-col">{content}</div>
  }

  return (
    <SiteAccessGate>
      <div className="min-h-screen flex flex-col">{content}</div>
    </SiteAccessGate>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PopupProvider>
          <ScrollManager />
          <BankingSessionManager />
          <Shell />
        </PopupProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
