export type ProductPopupData = {
  id: string
  script?: string
  title: string
  description: string
  image: string
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
