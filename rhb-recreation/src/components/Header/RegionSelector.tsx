import { Link } from 'react-router-dom'
import { countryLinks } from '../../data/navigation'

type RegionSelectorProps = {
  open: boolean
  onToggle: () => void
  premier?: boolean
}

export function RegionSelector({ open, onToggle, premier = false }: RegionSelectorProps) {
  return (
    <li className="relative">
      <button
        type="button"
        className={
          premier
            ? `premier-nav-link inline-flex items-center ${open ? 'is-open' : ''}`
            : `inline-flex items-center cursor-pointer mb-0 py-6 px-4 lg:pl-12 lg:pr-3.5 lg:py-7 body-3 header-nav-item ${open ? 'is-active font-bold' : 'font-normal'}`
        }
        aria-expanded={open}
        aria-haspopup="true"
        onClick={onToggle}
      >
        Malaysia
        {premier ? (
          <em className="fa fa-caret-down ml-1 text-[11px]" aria-hidden="true" />
        ) : (
          <span className={`malaysia-caret ${open ? 'is-open' : ''}`} aria-hidden="true" />
        )}
      </button>
      {open ? (
        <div className="p-6 fixed left-0 right-0 text-left w-full mb-0 shadow-xl bg-white country-list z-40">
          <div className="container-tw flex flex-col">
            {countryLinks.map((item) => (
              <Link key={item.id} to={item.href} className="py-3 text-black hover:font-bold">
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </li>
  )
}
