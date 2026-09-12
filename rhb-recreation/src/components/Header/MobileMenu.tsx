import { ChevronDown, ChevronRight, User } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  aboutLinks,
  audienceLinks,
  countryLinks,
  loginLinks,
  mainNavLinks,
  premierNavLinks,
  premierUtilityLinks,
  utilityLinks,
} from '../../data/navigation'
import { Logo } from '../common/Logo'

type MobileMenuProps = {
  open: boolean
  loginOpen: boolean
  premier?: boolean
  onToggleMenu: () => void
  onToggleLogin: () => void
  onSearch: () => void
}

export function MobileMenu({
  open,
  loginOpen,
  premier = false,
  onToggleMenu,
  onToggleLogin,
  onSearch,
}: MobileMenuProps) {
  const [panel, setPanel] = useState<'root' | 'about' | 'country'>('root')
  const iconClass = premier ? 'text-white' : 'text-navy'
  const pageLinks = premier ? premierNavLinks : mainNavLinks
  const utilities = premier ? premierUtilityLinks : utilityLinks

  return (
    <div className="lg:hidden">
      <div
        className={`${premier ? 'bg-[#002353]' : 'bg-header'} w-full h-[60px] flex justify-between items-center fixed top-0 z-50 px-4`}
      >
        <button
          type="button"
          className={`header-hamburger ${premier ? 'is-premier' : ''} ${open ? 'is-active' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => {
            setPanel('root')
            onToggleMenu()
          }}
        >
          <span />
          <span />
          <span />
        </button>
        <Logo variant={premier ? 'premier' : 'blue'} className={premier ? 'w-[120px] max-h-[28px]' : 'w-[88px]'} />
        <div className="flex items-center gap-3">
          {!premier ? (
            <button type="button" onClick={onSearch} aria-label="Open search" className="header-search">
              <i className="fa fa-search" aria-hidden="true" />
            </button>
          ) : null}
          <button type="button" onClick={onToggleLogin} className={`flex items-center ${iconClass}`} aria-label="Login">
            <User size={20} />
            <ChevronDown size={14} className={`ml-1 transition-transform ${loginOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {loginOpen ? (
        <div className="fixed inset-x-0 top-[60px] z-40 bg-white shadow-lg">
          {loginLinks.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className="px-4 py-4 block text-primary body-3 text-right font-bold border-b border-gray-5"
            >
              {item.text} <ChevronRight size={14} className="inline" />
            </Link>
          ))}
        </div>
      ) : null}

      <div
        className={`fixed inset-0 top-[60px] z-40 bg-white overflow-y-auto transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {panel === 'root' ? (
          <nav className="flex flex-col">
            {!premier
              ? audienceLinks.map((item) => (
                  <Link key={item.id} to={item.href} className="px-5 py-4 border-b border-gray-5 body-2 text-navy font-bold">
                    {item.text}
                  </Link>
                ))
              : null}
            <button
              type="button"
              className="px-5 py-4 border-b border-gray-5 body-2 text-navy font-bold flex justify-between"
              onClick={() => setPanel('country')}
            >
              Malaysia <ChevronRight size={18} />
            </button>
            <button
              type="button"
              className="px-5 py-4 border-b border-gray-5 body-2 text-navy font-bold flex justify-between"
              onClick={() => setPanel('about')}
            >
              About RHB <ChevronRight size={18} />
            </button>
            {pageLinks.map((item) => (
              <Link key={item.id} to={item.href} className="px-5 py-4 border-b border-gray-5 body-2 text-navy font-bold">
                {item.text}
              </Link>
            ))}
            {!premier ? (
              <Link to="/instant-apply" className="px-5 py-4 border-b border-gray-5 body-2 text-primary font-bold">
                Instant Apply
              </Link>
            ) : null}
            {utilities.map((item) => (
              <Link key={item.id} to={item.href} className="px-5 py-4 border-b border-gray-5 body-2 text-primary">
                {item.text}
              </Link>
            ))}
          </nav>
        ) : (
          <div>
            <button
              type="button"
              className="px-5 py-4 border-b border-gray-5 body-2 text-primary font-bold"
              onClick={() => setPanel('root')}
            >
              Back
            </button>
            {(panel === 'about' ? aboutLinks : countryLinks).map((item) => (
              <Link key={item.id} to={item.href} className="px-5 py-4 border-b border-gray-5 body-2 text-navy block">
                {item.text}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
