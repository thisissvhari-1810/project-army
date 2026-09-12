import { NavLink } from 'react-router-dom'
import { audienceLinks, premierUtilityLinks, utilityLinks } from '../../data/navigation'

const utilityIcons: Record<string, string> = {
  contact: 'fa fa-phone',
  locate: 'fa fa-map-marker',
  faq: 'fa fa-question',
}

const utilityClass = 'header-utility body-3 mt-1 inline-flex items-center'

type TopNavigationProps = {
  premier?: boolean
}

export function TopNavigation({ premier = false }: TopNavigationProps) {
  return (
    <div className="flex items-center justify-between h-full">
      {premier ? (
        <ul className="flex gap-8">
          {premierUtilityLinks.map((item) => (
            <li key={item.id}>
              <NavLink to={item.href} className={`${utilityClass} tracking-normal`}>
                <i className={`${utilityIcons[item.id]} mr-[8px]`} aria-hidden="true" />
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="flex gap-6">
          {audienceLinks.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.href}
                className="body-3 text-black hover:text-primary transition-colors"
              >
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
      {premier ? (
        <div />
      ) : (
        <ul className="flex gap-6 items-center">
          {utilityLinks.map((item) => (
            <li key={item.id}>
              <NavLink to={item.href} className={utilityClass}>
                <i className={`${utilityIcons[item.id]} mr-[8px]`} aria-hidden="true" />
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
