export type ProductPopupData = {
  id: string
  script?: string
  title: string
  description: string
  image: string
  imagePosition?: string
  compact?: boolean
  ctaLabel?: string
  href?: string
  terms?: string
}

export const campaignPopup: ProductPopupData = {
  id: 'overseas-property',
  script: 'Secure',
  title: 'your dream home, even from afar.',
  description:
    'Get a home in the UK or Australia with the RHB MY1 Full Flexi Overseas Property Home loan. Lock in a favourable exchange rate through early release — whether it is for your child\'s education or your overseas investment.',
  image: '/assets/images/popup-property.jpg',
  ctaLabel: 'Find Out More',
  href: '/premier#privileges',
  terms: 'Terms & Conditions apply.',
}

export const premierLoginNotice: ProductPopupData = {
  id: 'premier-login-required',
  script: 'Premier',
  title: 'login is available to Premier customers.',
  description:
    'Online login access is reserved for RHB Premier customers. Visit the Premier page to learn about its banking and wealth-management privileges.',
  image: '/assets/images/visa-lounge.jpg',
  ctaLabel: 'Explore RHB Premier',
  href: '/premier',
  terms: 'Terms & Conditions apply.',
}

export const premierAccessOnlyNotice: ProductPopupData = {
  id: 'premier-access-only',
  script: 'Welcome',
  title: 'Premier User, you have only access for the Premier page.',
  description:
    'Welcome Premier User. Only the Premier section is available for your account. Please use the Premier page to continue.',
  image: '/assets/images/privileges-travel.jpg',
  ctaLabel: 'Go to Premier',
  href: '/premier',
  terms: 'Terms & Conditions apply.',
}

export const utilitySecurityPopups: Record<string, ProductPopupData> = {
  contact: {
    id: 'premier-security-contact',
    title: 'Premier customers do not have access to Contact.',
    description:
      'Due to your security level, Premier customers do not have access to Contact. Please use the Premier page for available services.',
    image: '/assets/products/promo-card.jpg',
    imagePosition: 'center center',
    compact: true,
    ctaLabel: 'Close',
    terms: 'Terms & Conditions apply.',
  },
  locate: {
    id: 'premier-security-locate',
    title: 'Premier customers do not have access to Locate.',
    description:
      'Due to your security level, Premier customers do not have access to Locate. Please use the Premier page for available services.',
    image: '/assets/banners/hero-invest.jpg',
    imagePosition: 'center center',
    compact: true,
    ctaLabel: 'Close',
    terms: 'Terms & Conditions apply.',
  },
  faq: {
    id: 'premier-security-faq',
    title: 'Premier customers do not have access to FAQ.',
    description:
      'Due to your security level, Premier customers do not have access to FAQ. Please use the Premier page for available services.',
    image: '/assets/products/promo-calc.jpg',
    imagePosition: 'center top',
    compact: true,
    ctaLabel: 'Close',
    terms: 'Terms & Conditions apply.',
  },
}

export function getUtilitySecurityPopup(id: string): ProductPopupData {
  return utilitySecurityPopups[id] ?? utilitySecurityPopups.contact
}

export const productPopups: Record<string, ProductPopupData> = {
  home: {
    id: 'home',
    script: 'Home',
    title: 'financing that fits your life.',
    description:
      'Realise your dream home with RHB Home Financing/-i. Competitive, flexible and convenient — built around how Malaysians actually buy and live.',
    image: '/assets/products/promo-home.jpg',
    ctaLabel: 'Find Out More',
    href: '/personal#financing',
    terms: 'Terms & Conditions apply.',
  },
  mcv: {
    id: 'mcv',
    script: 'Travel',
    title: 'with 33 currencies in one card.',
    description:
      'The RHB Multi Currency Visa Debit Card/-i lets you transact in 33 foreign currencies on top of Ringgit Malaysia, with no currency conversion fee on overseas retail spend.',
    image: '/assets/products/promo-card.jpg',
    ctaLabel: 'Find Out More',
    href: '/premier#privileges',
    terms: 'Terms & Conditions apply.',
  },
  reflex: {
    id: 'reflex',
    script: 'Grow',
    title: 'your business without the admin drag.',
    description:
      'RHB Reflex Premium Plus is the all-in-one financial management solution designed to automate daily operations so you can focus on growing your business.',
    image: '/assets/products/promo-business.jpg',
    ctaLabel: 'Find Out More',
    href: '/business',
    terms: 'Terms & Conditions apply.',
  },
  sme: {
    id: 'sme',
    script: 'Fund',
    title: 'working capital in a few taps.',
    description:
      'Enhance your working capital and boost your cash flow with the RHB Financing (SME) Mobile App.',
    image: '/assets/products/promo-sme.jpg',
    ctaLabel: 'Find Out More',
    href: '/business',
    terms: 'Terms & Conditions apply.',
  },
  goal: {
    id: 'goal',
    script: 'Plan',
    title: 'your next financial milestone.',
    description:
      'Kickstart your wealth management journey with the RHB Goal-Based Calculator and map a path to your goals.',
    image: '/assets/products/promo-calc.jpg',
    ctaLabel: 'Find Out More',
    href: '/learn',
    terms: 'Terms & Conditions apply.',
  },
  premier: {
    id: 'premier',
    script: 'Join',
    title: 'RHB Premier today.',
    description:
      'RHB Premier is exclusively designed to provide you and your family the best financial solutions, complete with innovative banking services and exclusive privileges.',
    image: '/assets/banners/premier-hero.jpg',
    ctaLabel: 'Find Out More',
    href: '/premier',
    terms: 'Terms & Conditions apply.',
  },
  green: {
    id: 'green',
    script: 'Go',
    title: 'greener with Premier financing.',
    description:
      'Discover special green financing rates on electric vehicles, solar panel systems and more, to realise your green aspirations.',
    image: '/assets/images/green-ev.jpg',
    ctaLabel: 'Find Out More',
    href: '/premier#sustainability',
    terms: 'Terms & Conditions apply.',
  },
  joy: {
    id: 'joy',
    script: 'Enjoy',
    title: 'exclusive benefits with RHB Joy@Work.',
    description:
      'Discover the different ways you can enjoy amazing privileges when you credit your monthly earnings into an RHB salary crediting account.',
    image: '/assets/images/floatbar-model-happy-smile.webp',
    ctaLabel: 'Find Out More',
    href: '/personal',
    terms: 'Terms & Conditions apply.',
  },
  visa: {
    id: 'visa',
    script: 'Unlock',
    title: 'lounge access and travel rewards.',
    description:
      'Experience luxury and endless travel benefits with the RHB Premier Visa Infinite Credit Card/-i, including lounge access, LoyaltyPlus points and lifetime annual fee waiver.',
    image: '/assets/images/visa-lounge.jpg',
    ctaLabel: 'Find Out More',
    href: '/premier#privileges',
    terms: 'Terms & Conditions apply.',
  },
}

export function popupFromText(title: string, description: string, image?: string): ProductPopupData {
  return {
    id: title.toLowerCase().replace(/\s+/g, '-'),
    title,
    description,
    image: image ?? '/assets/banners/hero-treasure.jpg',
    ctaLabel: 'Find Out More',
    href: '/personal',
    terms: 'Terms & Conditions apply.',
  }
}
