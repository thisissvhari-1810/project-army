import { Link, useLocation, useParams } from 'react-router-dom'
import { ActionButton } from '../components/common/ActionButton'
import { campaignPopup, productPopups } from '../data/popups'

const titles: Record<string, string> = {
  personal: 'Personal Banking',
  business: 'Business Banking',
  corporate: 'Corporate Banking',
  islamic: 'Islamic Banking',
  'investor-relations': 'Investor Relations',
  contact: 'Contact Us',
  locate: 'Locate Us',
  faq: 'FAQ',
  'products-services': 'Products & Services',
  promotions: 'Promotions',
  learn: 'Learn@RHB',
  'instant-apply': 'Instant Apply',
}

export function Placeholder() {
  const { slug } = useParams()
  const location = useLocation()
  const key = slug ?? location.pathname.replace(/^\//, '')
  const title = titles[key] ?? key.replace(/-/g, ' ')

  return (
    <main className="bg-sky min-h-[50vh]">
      <div className="container-tw py-16">
        <p className="body-3 text-muted mb-3">
          <Link to="/personal" className="text-primary">
            Home
          </Link>{' '}
          / {title}
        </p>
        <h1 className="text-navy text-4xl font-light mb-4 capitalize">{title}</h1>
        <p className="max-w-2xl text-muted leading-relaxed mb-8">
          Explore {title} the same way the live RHB site does — every action here opens the official-style product
          popup, application overlay, or supporting detail panel.
        </p>
        <div className="flex flex-wrap gap-3">
          <ActionButton className="btn-primary text-white font-bold px-6 py-3 rounded" popup={campaignPopup}>
            Find Out More
          </ActionButton>
          <ActionButton className="border border-primary text-primary font-bold px-6 py-3 rounded" popup="premier">
            Join Premier
          </ActionButton>
          <ActionButton className="border border-navy text-navy font-bold px-6 py-3 rounded" popup={productPopups.home}>
            Instant Apply
          </ActionButton>
        </div>
      </div>
    </main>
  )
}
