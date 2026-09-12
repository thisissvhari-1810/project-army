export type NavLink = {
  id: string
  text: string
  href: string
}

export const audienceLinks: NavLink[] = [
  { id: 'personal', text: 'Personal', href: '/personal' },
  { id: 'business', text: 'Business', href: '/business' },
  { id: 'premier', text: 'Premier', href: '/premier' },
  { id: 'corporate', text: 'Corporate', href: '/corporate' },
  { id: 'islamic', text: 'Islamic', href: '/islamic' },
  { id: 'ir', text: 'Investor Relations', href: '/investor-relations' },
]

export const utilityLinks: NavLink[] = [
  { id: 'contact', text: 'Contact', href: '/contact' },
  { id: 'locate', text: 'Locate', href: '/locate' },
  { id: 'faq', text: 'FAQ', href: '/faq' },
]

export const countryLinks: NavLink[] = [
  { id: 'brunei', text: 'Brunei', href: '/placeholder/brunei' },
  { id: 'singapore', text: 'Singapore', href: '/placeholder/singapore' },
  { id: 'cambodia', text: 'Cambodia', href: '/placeholder/cambodia' },
  { id: 'indonesia', text: 'Indonesia', href: '/placeholder/indonesia' },
  { id: 'laos', text: 'Laos', href: '/placeholder/laos' },
  { id: 'thailand', text: 'Thailand', href: '/placeholder/thailand' },
]

export const aboutLinks: NavLink[] = [
  { id: 'who', text: 'Who We Are', href: '/about/who-we-are' },
  { id: 'awards', text: 'Awards and Accolades', href: '/about/awards' },
  { id: 'brand', text: 'Brand Promise', href: '/about/brand-promise' },
  { id: 'progress', text: 'PROGRESS27', href: '/about/progress27' },
  { id: 'board', text: 'Board of Directors', href: '/about/board' },
  { id: 'gsm', text: 'Group Senior Management', href: '/about/management' },
  { id: 'regional', text: 'Regional Presence', href: '/about/regional' },
  { id: 'gov', text: 'Corporate Governance', href: '/about/governance' },
  { id: 'sustain', text: 'Sustainability', href: '/about/sustainability' },
  { id: 'community', text: 'Community Engagement', href: '/about/community' },
]

export const loginLinks: NavLink[] = [
  { id: 'online', text: 'RHB Online Banking', href: '/login' },
  { id: 'reflex', text: 'RHB Reflex', href: '/login' },
  { id: 'tradesmart', text: 'RHB TradeSmart', href: '/login' },
  { id: 'share', text: 'RHB Share Trading', href: '/login' },
  { id: 'myinvest', text: 'RHBAM MyInvest', href: '/login' },
  { id: 'joy', text: 'RHB Joy@Work (Salary)', href: '/login' },
  { id: 'family', text: 'RHB Family Banking', href: '/login' },
]

export const popularSearches: NavLink[] = [
  { id: 'pl', text: 'Personal Loan', href: '/products-services' },
  { id: 'cc', text: 'Credit Card', href: '/products-services' },
  { id: 'shell', text: 'RHB Shell Visa', href: '/promotions' },
  { id: 'premier', text: 'RHB Premier', href: '/premier' },
  { id: 'digital', text: 'Digital Services', href: '/placeholder/digital-services' },
]

export const mainNavLinks: NavLink[] = [
  { id: 'products', text: 'Products & Services', href: '/products-services' },
  { id: 'promotions', text: 'Promotions', href: '/promotions' },
  { id: 'learn', text: 'Learn@RHB', href: '/learn' },
]

export const premierNavLinks: NavLink[] = [
  { id: 'day2day', text: 'Day To Day Banking', href: '/premier#day2day' },
  { id: 'wealth', text: 'Wealth Management', href: '/premier#wealthmanagement' },
  { id: 'privileges', text: 'Privileges', href: '/premier#privileges' },
  { id: 'sustainability', text: 'Sustainability', href: '/premier#sustainability' },
  { id: 'promotion', text: 'Latest Promotion', href: '/promotions' },
]

export const premierUtilityLinks: NavLink[] = [
  { id: 'contact', text: 'Contact', href: '/contact' },
  { id: 'locate', text: 'Locate', href: '/locate' },
]
