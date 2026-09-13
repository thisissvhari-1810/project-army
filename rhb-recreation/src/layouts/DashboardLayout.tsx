import { LogOut } from 'lucide-react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { ActivityTracker } from '../components/Dashboard/ActivityTracker'
import { BankingSyncManager } from '../components/Dashboard/BankingSyncManager'
import { useAuth } from '../context/AuthContext'
import type { UserRole } from '../types/banking'

type NavItem = {
  to: string
  label: string
  end?: boolean
}

const adminNav: NavItem[] = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/users', label: 'Manage Users' },
  { to: '/admin/transactions', label: 'Transactions' },
  { to: '/admin/activities', label: 'User Activities' },
]

const userNav: NavItem[] = [
  { to: '/dashboard', label: 'Overview', end: true },
  { to: '/dashboard/transactions', label: 'Transactions' },
]

type DashboardLayoutProps = {
  role: UserRole
}

export function DashboardLayout({ role }: DashboardLayoutProps) {
  const navigate = useNavigate()
  const { session, logout } = useAuth()
  const navItems = role === 'admin' ? adminNav : userNav
  const homePath = role === 'admin' ? '/admin' : '/dashboard'

  const handleLogout = () => {
    logout()
    navigate('/login?premier=true')
  }

  return (
    <div className="min-h-screen bg-sky flex flex-col">
      <ActivityTracker />
      <BankingSyncManager active />
      <header className="dashboard-topbar bg-premier text-white shadow-md">
        <div className="header-premier-wrap flex items-center justify-between gap-4">
          <div className="dashboard-topbar__brand flex items-center gap-5 min-w-0">
            <Link to={homePath} className="shrink-0">
              <img
                src="/assets/logos/rhb-premier-logo.png"
                alt="RHB Premier"
                className="dashboard-topbar__logo"
              />
            </Link>
            <div className="dashboard-topbar__divider hidden sm:block" />
            <p className="dashboard-topbar__title hidden sm:block truncate">
              Premier Online Banking
            </p>
          </div>
          <div className="dashboard-topbar__actions flex items-center gap-4 shrink-0">
            <div className="text-right hidden md:block">
              <p className="dashboard-topbar__username">{session?.displayName}</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="dashboard-logout-btn"
              aria-label="Logout"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 header-premier-wrap py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-[240px] shrink-0">
            <nav className="dashboard-sidebar">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `dashboard-nav-link${isActive ? ' is-active' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </aside>
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>

      <footer className="bg-premier-deep text-[#c1cdd8] text-xs py-4">
        <div className="header-premier-wrap">
          © {new Date().getFullYear()} RHB Premier. Secure banking session.
        </div>
      </footer>
    </div>
  )
}
