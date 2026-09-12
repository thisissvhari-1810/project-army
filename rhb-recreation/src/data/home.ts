export type HeroSlide = {
  id: string
  image: string
  title: string
  subtitle: string
  href: string
}

export type CategoryItem = {
  id: string
  label: string
  href: string
  icon: string
}

export type PromotionItem = {
  id: string
  title: string
  description: string
  image: string
  href: string
}

export type StatItem = {
  id: string
  value: number
  suffix: string
  decimals?: number
  label: string
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'my1',
    image: '/assets/images/popup-property.jpg',
    title: 'RHB MY1 Full Flexi Overseas Property Home loan',
    subtitle: 'Expand your world — finance a residential property abroad for your legacy, your lifestyle, or your next investment.',
    href: '/premier',
  },
  {
    id: 'treasure',
    image: '/assets/banners/hero-treasure.jpg',
    title: 'Treasure Jar',
    subtitle: 'Save, spend and be rewarded with festive privileges designed around your family.',
    href: '/promotions',
  },
  {
    id: 'junior',
    image: '/assets/banners/hero-junior.jpg',
    title: 'Junior Savings',
    subtitle: 'Help your child start strong with preferential junior account returns.',
    href: '/promotions',
  },
  {
    id: 'smartjoy',
    image: '/assets/banners/hero-smartjoy.jpg',
    title: 'SmartJoy',
    subtitle: 'Credit your salary and unlock everyday banking privileges.',
    href: '/promotions',
  },
  {
    id: 'btcx',
    image: '/assets/banners/hero-cards.jpg',
    title: 'Apply and Spend',
    subtitle: 'Enjoy balance transfer and cash-out flexibility on selected cards.',
    href: '/promotions',
  },
  {
    id: 'trade',
    image: '/assets/banners/hero-invest.jpg',
    title: 'Trade & Win 2026',
    subtitle: 'Stay close to the markets with insights built for active investors.',
    href: '/promotions',
  },
  {
    id: 'auto',
    image: '/assets/banners/hero-auto.jpg',
    title: 'AutoMax',
    subtitle: 'Competitive, fast and flexible vehicle financing for your next drive.',
    href: '/promotions',
  },
]

export const categories: CategoryItem[] = [
  { id: 'account', label: 'Open Account', href: '/personal', icon: 'wallet' },
  { id: 'cards', label: 'Cards', href: '/products-services', icon: 'credit-card' },
  { id: 'loan', label: 'Get a Loan', href: '/personal', icon: 'landmark' },
  { id: 'insurance', label: 'Insurance', href: '/placeholder/insurance', icon: 'shield' },
  { id: 'premier', label: 'Premier Banking', href: '/premier', icon: 'gem' },
  { id: 'invest', label: 'Investing', href: '/personal', icon: 'trending-up' },
  { id: 'check', label: 'Check Application', href: '/instant-apply', icon: 'clipboard-check' },
]

export const promoTabs = [
  { id: 'Promotions', href: '#promotions' },
  { id: 'Announcements', href: '/placeholder/announcements' },
  { id: 'Fraud Alerts', href: '/placeholder/fraud-alerts' },
  { id: 'e-Invoicing', href: '/placeholder/e-invoicing' },
  { id: 'Digital Services', href: '/placeholder/digital-services' },
] as const

export const promotions: PromotionItem[] = [
  {
    id: 'home',
    title: 'RHB Home Financing/-i',
    description:
      'Realise your dream home with our Home Financing products that are competitive, flexible and convenient',
    image: '/assets/products/promo-home.jpg',
    href: '/products-services',
  },
  {
    id: 'mcv',
    title: 'RHB Multi Currency Visa Debit Card/-i',
    description:
      'A Debit Card that allows you to transact up to 33 foreign currencies on top of Ringgit Malaysia with no currency conversion fee on your overseas retail spend.',
    image: '/assets/products/promo-card.jpg',
    href: '/premier',
  },
  {
    id: 'reflex',
    title: 'RHB Reflex Premium Plus',
    description:
      'The all-in-one financial management solution that is designed to automate your daily operations so you can focus on growing your business exponentially.',
    image: '/assets/products/promo-business.jpg',
    href: '/business',
  },
  {
    id: 'sme',
    title: 'RHB Financing (SME) Mobile App',
    description: 'Enhance your working capital and boost your cash flow with RHB Financing (SME) Mobile App',
    image: '/assets/products/promo-sme.jpg',
    href: '/business',
  },
  {
    id: 'goal',
    title: 'RHB Goal-based Calculator',
    description:
      'Kickstart your wealth management journey with the RHB Goal-Based Calculator and achieve your financial goals',
    image: '/assets/products/promo-calc.jpg',
    href: '/learn',
  },
]

export const statistics: StatItem[] = [
  { id: 'assets', value: 358, suffix: 'billion', label: 'Total Assets\n(MYR)' },
  { id: 'equity', value: 34, suffix: 'billion', label: "Shareholder's\nEquity (MYR)" },
  { id: 'income', value: 8.8, suffix: 'billion', decimals: 1, label: 'Total Income\n(MYR)' },
  { id: 'profit', value: 3.4, suffix: 'billion', decimals: 1, label: 'Net Profit\n(MYR)' },
  { id: 'cir', value: 47.3, suffix: '%', decimals: 1, label: 'Cost To\nIncome Ratio' },
  { id: 'brand', value: 3.7, suffix: 'billion', decimals: 1, label: 'Brand Value\n(MYR)' },
]
