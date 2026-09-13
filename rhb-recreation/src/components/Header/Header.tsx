import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useHeaderScroll } from '../../hooks/useHeaderScroll'
import { SearchModal } from '../common/SearchModal'
import { MainNavigation } from './MainNavigation'
import { MobileMenu } from './MobileMenu'
import { TopNavigation } from './TopNavigation'

export function Header() {
  const { compact } = useHeaderScroll()
  const [openMenu, setOpenMenu] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()
  const isPremier = location.pathname.startsWith('/premier') || location.pathname.startsWith('/overview/premier')

  useEffect(() => {
    setOpenMenu('')
    setMobileOpen(false)
    setLoginOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen || loginOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [loginOpen, mobileOpen])

  const toggleMenu = (id: string) => {
    setOpenMenu((current) => (current === id ? '' : id))
  }

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('#header')) setOpenMenu('')
    }
    window.addEventListener('mousedown', onPointer)
    return () => window.removeEventListener('mousedown', onPointer)
  }, [])

  return (
    <>
      <div
        id="header"
        className={`relative z-[1000] h-[60px] ${compact ? 'lg:h-[88px]' : 'lg:h-[120px]'} transition-[height] duration-300`}
      >
        <header className="flex flex-col">
          <div className="menu-desktop hidden lg:block fixed w-full z-50">
            <div
              id="desktop-header-graybar"
              className={`w-full transition-all duration-300 ease-in-out ${isPremier ? 'bg-white' : 'bg-gray-5'}`}
              style={{ height: compact ? 28 : 40 }}
            >
              <div className={`${isPremier ? 'header-premier-wrap' : 'container-tw'} h-full`}>
                <TopNavigation premier={isPremier} />
              </div>
            </div>
            <div
              id="desktop-header-bluebar"
              className={`w-full z-20 transition-all duration-300 ease-in-out ${isPremier ? 'bg-premier' : 'bg-primary-light'}`}
              style={{ height: compact ? 60 : 80 }}
            >
              <div className={`${isPremier ? 'header-premier-wrap' : 'container-tw'} h-full`}>
                <MainNavigation
                  compact={compact}
                  openMenu={openMenu}
                  onToggleMenu={toggleMenu}
                  onSearch={() => setSearchOpen(true)}
                  premier={isPremier}
                />
              </div>
            </div>
          </div>
          <MobileMenu
            open={mobileOpen}
            loginOpen={loginOpen}
            premier={isPremier}
            onToggleMenu={() => {
              setLoginOpen(false)
              setMobileOpen((value) => !value)
            }}
            onToggleLogin={() => {
              setMobileOpen(false)
              setLoginOpen((value) => !value)
            }}
            onSearch={() => setSearchOpen(true)}
          />
        </header>
      </div>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
