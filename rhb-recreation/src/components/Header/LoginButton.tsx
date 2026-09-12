import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { loginLinks } from '../../data/navigation'

type LoginButtonProps = {
  open: boolean
  onToggle: () => void
  premier?: boolean
}

export function LoginButton({ open, onToggle, premier = false }: LoginButtonProps) {
  return (
    <div className="relative flex justify-end">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-haspopup="true"
        className={`header-login ${premier ? 'is-premier' : ''}`}
      >
        Login
      </button>
      {open ? (
        <div className="bg-white rounded shadow-lg grid absolute top-full mt-2 right-0 min-w-[220px] z-50">
          {loginLinks.map((item, index) => (
            <Link
              key={item.id}
              to={item.href}
              className={`px-3 py-3 block text-primary body-3 text-right whitespace-nowrap font-bold leading-tight hover:bg-sky ${index > 0 ? 'border-t border-gray-5' : ''}`}
            >
              <span className="mr-2">{item.text}</span>
              <ChevronRight size={14} className="inline" />
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  )
}
