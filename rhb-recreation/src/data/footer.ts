export type FooterColumn = {
  title: string
  href: string
  links: { text: string; href: string }[]
}

export const footerColumns: FooterColumn[] = [
  {
    title: 'Personal',
    href: '/personal',
    links: [
      { text: 'Deposits', href: '/personal' },
      { text: 'Cards', href: '/products-services' },
      { text: 'Financing', href: '/personal' },
      { text: 'Remittance', href: '/placeholder/remittance' },
      { text: 'Investments', href: '/personal' },
      { text: 'Life Insurance', href: '/placeholder/insurance' },
      { text: 'General Insurance', href: '/placeholder/insurance' },
      { text: 'Banking Methods', href: '/placeholder/banking-methods' },
      { text: 'Safe Deposit Box', href: '/placeholder/safe-deposit' },
      { text: 'Digital Services', href: '/placeholder/digital-services' },
      { text: 'Learn@RHB', href: '/learn' },
    ],
  },
  {
    title: 'Islamic',
    href: '/islamic',
    links: [
      { text: 'Islamic Wealth Management', href: '/islamic' },
      { text: 'Deposits', href: '/islamic' },
      { text: 'Cards', href: '/products-services' },
      { text: 'Financing', href: '/islamic' },
      { text: 'Imports/Exports', href: '/islamic' },
      { text: 'Investment', href: '/islamic' },
      { text: 'Treasury', href: '/islamic' },
      { text: 'Asset Management', href: '/placeholder/asset-management' },
      { text: 'Trustees', href: '/placeholder/trustee' },
      { text: 'Islamic Social Finance', href: '/islamic' },
    ],
  },
  {
    title: 'Business',
    href: '/business',
    links: [
      { text: 'Start-up / Entrepreneur', href: '/business' },
      { text: 'Retailer / F&B', href: '/business' },
      { text: 'Service Provider', href: '/business' },
      { text: 'Online Business', href: '/business' },
      { text: 'Retail Trader / Wholesaler', href: '/business' },
      { text: 'Construction / Transportation', href: '/business' },
      { text: 'Manufacturing', href: '/business' },
      { text: 'Technology', href: '/business' },
      { text: 'Medical', href: '/business' },
      { text: 'Associations', href: '/business' },
      { text: 'Investment Holding Company', href: '/business' },
      { text: 'Education Provider', href: '/business' },
    ],
  },
  {
    title: 'RHB Group',
    href: '/personal',
    links: [
      { text: 'About RHB', href: '/about/who-we-are' },
      { text: 'Career', href: '/placeholder/career' },
      { text: 'Highlights', href: '/placeholder/announcements' },
      { text: 'Interest / Profit Rates', href: '/placeholder/rates' },
      { text: 'Service Charges', href: '/placeholder/charges' },
      { text: "PIDM's DIS Brochure", href: '/placeholder/pidm' },
      { text: 'List of Insured Deposits', href: '/placeholder/deposits' },
      { text: 'Treasury Rates', href: '/placeholder/treasury' },
      { text: 'Group Procurement', href: '/placeholder/procurement' },
      { text: 'Investor Relations', href: '/investor-relations' },
      { text: 'News Room', href: '/placeholder/news' },
      { text: 'Sustainability', href: '/about/sustainability' },
      { text: 'RHB Foundation', href: '/placeholder/foundation' },
      { text: 'Corporate Governance', href: '/about/governance' },
      { text: 'Whistleblowing Policy', href: '/placeholder/whistleblowing' },
    ],
  },
  {
    title: 'Premier',
    href: '/premier',
    links: [{ text: 'MM2H', href: '/placeholder/mm2h' }],
  },
  {
    title: 'Insurance',
    href: '/placeholder/insurance',
    links: [
      { text: 'Personal', href: '/placeholder/insurance' },
      { text: 'Business', href: '/business' },
      { text: 'General Information', href: '/placeholder/insurance' },
    ],
  },
  {
    title: 'Asset Management',
    href: '/placeholder/asset-management',
    links: [
      { text: 'MyInvest', href: '/placeholder/myinvest' },
      { text: 'MySuccess', href: '/placeholder/mysuccess' },
    ],
  },
  {
    title: 'Corporate',
    href: '/corporate',
    links: [
      { text: 'Investment Banking', href: '/corporate' },
      { text: 'Trustees', href: '/placeholder/trustee' },
    ],
  },
]

export const footerStandalone = [
  { text: 'RHB Online Banking', href: '/login' },
  { text: 'RHB Reflex', href: '/login' },
  { text: 'RHB TradeSmart', href: '/login' },
  { text: 'RHB Invest', href: '/login' },
  { text: 'Contact Us', href: '/contact' },
  { text: 'Locate Us', href: '/locate' },
  { text: 'RHB Customer Surveys', href: '/placeholder/surveys' },
]

export const legalLinks = [
  { text: 'Customer Service Charter', href: '/placeholder/csc' },
  { text: 'e-Banking Charter', href: '/placeholder/ebanking-charter' },
  { text: 'Privacy Policy', href: '/placeholder/privacy' },
  { text: 'Personal Data Protection Act', href: '/placeholder/pdpa' },
  { text: 'Terms & Conditions', href: '/placeholder/terms' },
  { text: 'Product Disclosure Sheet', href: '/placeholder/pds' },
  { text: 'Disclaimers', href: '/placeholder/disclaimers' },
  { text: 'Fraud Awareness', href: '/placeholder/fraud-alerts' },
  { text: 'FATCA', href: '/placeholder/fatca' },
  { text: 'CRS', href: '/placeholder/crs' },
  { text: 'FEP', href: '/placeholder/fep' },
]

export const partners = [
  { name: 'BNM', src: '/assets/partners/bnm.png' },
  { name: 'SMEinfo', src: '/assets/partners/smeinfo.png' },
  { name: 'MyBayar', src: '/assets/partners/mybayar.png' },
  { name: 'FMOS', src: '/assets/partners/fmos.png' },
  { name: 'AKPK', src: '/assets/partners/akpk.png' },
]
