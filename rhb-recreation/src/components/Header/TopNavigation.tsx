import { Link } from 'react-router-dom'
import { usePopup } from '../../context/PopupContext'
import { getUtilitySecurityPopup, premierAccessOnlyNotice } from '../../data/popups'
import { audienceLinks, premierUtilityLinks, utilityLinks } from '../../data/navigation'

const utilityIcons: Record<string, string> = {
  contact: 'fa fa-phone',
  locate: 'fa fa-map-marker',
  faq: 'fa fa-question',
}

const utilityClass = 'header-utility body-3 mt-1 inline-flex items-center'

const navigableAudienceIds = new Set(['personal', 'premier'])

type TopNavigationProps = {
  premier?: boolean
}

export function TopNavigation({ premier = false }: TopNavigationProps) {
  const { openProduct } = usePopup()

  return (
    <div className="flex items-center justify-between h-full">
      {premier ? (
        <ul className="flex gap-8">
          {premierUtilityLinks.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`${utilityClass} header-utility-premier tracking-normal bg-transparent border-0 p-0 cursor-pointer`}
                onClick={() => openProduct(getUtilitySecurityPopup(item.id))}
              >
                <i className={`${utilityIcons[item.id]} mr-[8px]`} aria-hidden="true" />
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="flex gap-6">
          {audienceLinks.map((item) => (
            <li key={item.id}>
              {navigableAudienceIds.has(item.id) ? (
                <Link to={item.href} className="body-3 text-black hover:text-primary transition-colors">
                  {item.text}
                </Link>
              ) : (
                <button
                  type="button"
                  className="body-3 text-black hover:text-primary transition-colors bg-transparent border-0 p-0 cursor-pointer"
                  onClick={() => openProduct(premierAccessOnlyNotice)}
                >
                  {item.text}
                </button>
              )}
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
              <button
                type="button"
                className={`${utilityClass} bg-transparent border-0 p-0 cursor-pointer`}
                onClick={() => openProduct(getUtilitySecurityPopup(item.id))}
              >
                <i className={`${utilityIcons[item.id]} mr-[8px]`} aria-hidden="true" />
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
