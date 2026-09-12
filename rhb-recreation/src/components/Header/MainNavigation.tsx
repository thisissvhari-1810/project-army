import { Link, NavLink } from 'react-router-dom'
import { aboutLinks, mainNavLinks, premierNavLinks } from '../../data/navigation'
import { ActionButton } from '../common/ActionButton'
import { Logo } from '../common/Logo'
import { LoginButton } from './LoginButton'
import { RegionSelector } from './RegionSelector'

type MainNavigationProps = {
  compact: boolean
  openMenu: string
  onToggleMenu: (id: string) => void
  onSearch: () => void
  premier?: boolean
}

export function MainNavigation({
  compact,
  openMenu,
  onToggleMenu,
  onSearch,
  premier = false,
}: MainNavigationProps) {
  const navClass = premier
    ? 'premier-nav-link'
    : 'header-nav-item inline-block body-3 mb-0 py-6 px-4 lg:px-3.5 lg:py-7'
  const aboutClass = premier
    ? `premier-nav-link ${openMenu === 'about' ? 'is-open' : ''}`
    : `header-nav-item block cursor-pointer mb-0 py-6 px-4 lg:px-3.5 lg:py-7 body-3 ${openMenu === 'about' ? 'is-active font-bold' : 'font-normal'}`
  const links = premier ? premierNavLinks : mainNavLinks

  return (
    <div className="flex items-center justify-between h-full">
      <div className={`flex items-center ${premier ? 'flex-1 min-w-0' : 'gap-0'}`}>
        <Logo
          variant={premier ? 'premier' : 'blue'}
          className={`transition-all duration-300 ${
            compact ? (premier ? 'w-[140px] max-h-[30px]' : 'w-[96px]') : premier ? 'w-[168px] max-h-[36px]' : 'w-[118px]'
          }`}
        />
        <ul className={`flex items-center ${premier ? 'flex-1 justify-evenly min-w-0 ml-2' : compact ? '-ml-6' : 'ml-0'}`}>
          <RegionSelector
            open={openMenu === 'country'}
            onToggle={() => onToggleMenu('country')}
            premier={premier}
          />
          <li className="relative">
            <button
              type="button"
              className={aboutClass}
              aria-expanded={openMenu === 'about'}
              onClick={() => onToggleMenu('about')}
            >
              About RHB
            </button>
            {openMenu === 'about' ? (
              <div className="p-6 fixed left-0 right-0 text-left w-full shadow-xl bg-white z-40">
                <div className="container-tw flex flex-col">
                  {aboutLinks.map((item) => (
                    <Link key={item.id} to={item.href} className="py-3 text-black hover:font-bold">
                      {item.text}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </li>
          {links.map((item) => (
            <li key={item.id}>
              {premier ? (
                <Link to={item.href} className={navClass}>
                  {item.text}
                </Link>
              ) : (
                <NavLink
                  to={item.href}
                  className={({ isActive }) => `${navClass} ${isActive ? 'is-active' : ''}`}
                >
                  {item.text}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className={`relative flex items-center ${premier ? 'ml-3 shrink-0' : ''}`}>
        {!premier ? (
          <>
            <button type="button" onClick={onSearch} aria-label="Open search" className="header-search mr-4">
              <i className="fa fa-search" aria-hidden="true" />
            </button>
            <ActionButton popup="home" className="instant-apply mr-4">
              Instant Apply
            </ActionButton>
          </>
        ) : null}
        <LoginButton open={openMenu === 'login'} onToggle={() => onToggleMenu('login')} premier={premier} />
      </div>
    </div>
  )
}
