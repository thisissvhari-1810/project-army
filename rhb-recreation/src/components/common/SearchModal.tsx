import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { popularSearches } from '../../data/navigation'
import { Logo } from './Logo'

type SearchModalProps = {
  open: boolean
  onClose: () => void
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    inputRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[80] bg-white" role="dialog" aria-modal="true" aria-label="Search">
      <div className="bg-header h-[60px] lg:h-[80px]">
        <div className="container-tw h-full flex items-center">
          <div className="flex-1" />
          <Logo width={120} className="w-[88px] lg:w-[118px]" />
          <div className="flex-1 flex justify-end">
            <button type="button" onClick={onClose} aria-label="Close search" className="text-navy p-2">
              <X size={24} />
            </button>
          </div>
        </div>
      </div>
      <div className="container-tw">
        <p className="text-4xl font-bold text-primary pt-16">Search</p>
        <div className="w-full mt-4 mb-8 border border-solid border-[#A0A0A0] py-3 px-6 rounded-lg text-base flex items-center">
          <input
            ref={inputRef}
            className="w-full outline-none text-gray-2 bg-transparent"
            type="search"
            placeholder="Start Typing Here..."
          />
          <i className="fa fa-search text-primary" aria-hidden="true" />
        </div>
        <p className="font-bold text-primary mb-4">You may be looking for the following</p>
        <ul>
          {popularSearches.map((item) => (
            <li key={item.id} className="mb-4">
              <Link to={item.href} onClick={onClose} className="body-2 font-bold text-gray-2 underline">
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
