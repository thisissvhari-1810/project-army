const media = 'https://www.rhbgroup.com/-/media/Microsites/overview_premier/images'

export type FeatureTile = {
  id: string
  title: string
  description: string
  href: string
  icon: string
}

export type WealthProduct = {
  id: string
  title: string
  description: string
  note?: string
  href: string
}

export type InsightCard = {
  id: string
  title: string
  titleLine2?: string
  image: string
  href: string
}

export type PrivilegePoint = {
  title: string
  description: string
  icon: string
}

export const premierImages = {
  wealthBanner: `${media}/bg-wealth-management.jpg`,
  yourWorld: `${media}/copy_your-world.png`,
  wealthRange: `${media}/bg_wealth_range.jpg`,
  family: `${media}/bg_premier-family-extension.jpg`,
  privilegesBanner: `${media}/bg-privileges.jpg`,
  withoutBorders: `${media}/copy_without-borders.png`,
  mcvCard: `${media}/card_rhb-premier-myDebit-visa.png`,
  visaCard: `${media}/card_rhb-premier-visa-infinite.png`,
  overseas: `${media}/portrait-young-asian-woman.png`,
  regional: `${media}/bg_regional-banking-services.jpg`,
  birthday: `${media}/bg_birthday-privileges.jpg`,
  educationLogo: `${media}/logo%20aus.png`,
  educationHero: `${media}/GettyImages-818087868%20copy%202.png`,
  sustainabilityBanner: `${media}/bg-sustainability.jpg`,
  greenerWorld: `${media}/copy_greener-world.png`,
  vehicle: `${media}/bg_vehicle-financing.jpg`,
  greenFinancing: `${media}/bg_green-financing.jpg`,
  dayBanner: `${media}/bg-daytoday-banking.jpg`,
  withinReach: `${media}/copy_within-reach.png`,
  mobileApp: `${media}/daytoday-mobile.png`,
  desktopApp: `${media}/daytoday-desktop.png`,
  eligibilityAum: `${media}/icon-investment.png`,
  eligibilityHybrid: `${media}/icon-facility.png`,
  eligibilityJoy: `${media}/icon-joyatwork.png`,
  floatLogo: `${media}/logo-premier_default.png`,
}

export const premierHeroSlides = [
  {
    id: 'borders',
    title: 'RHB Premier Banking Services',
    desktop: `${media}/premier-without-borders-d.jpg`,
    mobile: `${media}/premier-without-borders-m.jpg`,
  },
  {
    id: 'mgm',
    title: 'RHB Protect Their Future',
    desktop: `${media}/MGM%202026_PWS-Banner_Desktop.jpg`,
    mobile: `${media}/MGM%202026_PWS-Banner_Mobile.jpg`,
    href: '/placeholder/mgm',
  },
  {
    id: 'home',
    title: 'Premier Home',
    desktop: `${media}/RHB1040_Premier_Home_d.jpg`,
    mobile: `${media}/RHB1040_Premier_Home_m.jpg`,
    href: '/placeholder/bcfd',
  },
  {
    id: 'green',
    title: 'RHB Premier Green Financing',
    desktop: `${media}/green-d.jpg`,
    mobile: `${media}/green-m.jpg`,
    href: '#sustainability',
  },
  {
    id: 'mca',
    title: 'Multi Currency Account',
    desktop: `${media}/banner-main_12a.jpg`,
    mobile: `${media}/banner-main-mobile_12a.jpg`,
    href: '#privileges',
  },
  {
    id: 'plp',
    title: 'Premier Lifestyle Privileges',
    desktop: `${media}/banner-main_9.jpg`,
    mobile: `${media}/banner-main-mobile_9.jpg`,
    href: '#privileges',
  },
  {
    id: 'merge',
    title: 'MERGE by RHB',
    desktop: `${media}/banner-main_8.jpg`,
    mobile: `${media}/banner-main-mobile_8.jpg`,
    href: '#insights',
  },
]

export const premierFeatures: FeatureTile[] = [
  {
    id: 'wealth',
    title: 'Wealth Management',
    description:
      'Gain access to a wider range of wealth management products and services designed for accumulation, protection and distribution.',
    href: '#wealthmanagement',
    icon: `${media}/icon_wealth-management.png`,
  },
  {
    id: 'privileges',
    title: 'Privileges',
    description:
      'Enjoy exclusive privileges, including converting and storing up to 33 foreign currencies with RHB Premier Multi Currency Visa Debit Card/-i.',
    href: '#privileges',
    icon: `${media}/icon_privileges.png`,
  },
  {
    id: 'sustainability',
    title: 'Sustainability',
    description:
      'Discover special green financing rates on electric vehicle, solar panel systems, and more, to realise your green aspirations.',
    href: '#sustainability',
    icon: `${media}/icon_sustainability.png`,
  },
  {
    id: 'daily',
    title: 'Day-to-day Banking',
    description:
      'Transact, invest, spend, or even pay with your mobile device effortlessly with RHB Digital Banking, no matter where you are in the world.',
    href: '#day2day',
    icon: `${media}/icon_banking.png`,
  },
]

export const wealthProducts: WealthProduct[] = [
  {
    id: 'ca',
    title: 'RHB Premier\nCurrent Account/-i',
    description: 'Enjoy higher returns with a preferential rate of up to 1.70% p.a.',
    href: '/placeholder/premierca',
  },
  {
    id: 'junior',
    title: 'Junior Savings Account/\nRHB Children Account-i',
    description: 'Enjoy attractive returns of 1.75% p.a. with no placement limit.',
    href: '/placeholder/premierjr',
  },
  {
    id: 'mca',
    title: 'RHB Multi\nCurrency Account/-i',
    description:
      'Store up to 33 foreign currencies with attractive conversion rates in this interest* bearing account. Enjoy preferential currency conversion rates.',
    note: 'Note: interest is only applicable to RHB Multi Currency Account',
    href: '/placeholder/mca',
  },
  {
    id: 'invest',
    title: 'Investment',
    description:
      'Our range of Unit Trusts, Structured Investments, Bonds/Sukuk help you build and manage your investment portfolio effectively.',
    href: '/placeholder/unit-trust',
  },
  {
    id: 'insurance',
    title: 'Insurance/Takaful*',
    description:
      'Comprehensive insurance/takaful solutions such as RHB Treasure 100 Premier, RHB Essential Protect Premier, and RHB Essential PrimeLink Plus Premier.',
    note: 'Note: Takaful product is currently offered under Syarikat Takaful Malaysia Berhad.',
    href: '/placeholder/insurance',
  },
  {
    id: 'trustee',
    title: 'RHB Trustee',
    description: 'Enjoy 15% off on Will/Wasiat Writing and Trustee services for RHB Premier Customers.',
    href: '/placeholder/trustee',
  },
  {
    id: 'outlook',
    title: 'Periodic\nMarket Outlook',
    description: 'Get the latest news on market insights and performances.',
    href: '/learn',
  },
]

export const familyBenefits = [
  'Access to RHB Premier products, services and rewards.',
  'Lifestyle Privileges: Special discounts from our merchant partners.',
  'Junior Savings Account/RHB Children Account-i with Preferential rate.',
]

export const insights: InsightCard[] = [
  { id: 'fi', title: 'FINANCIAL INSIGHTS', image: `${media}/merge2.jpg`, href: '/learn' },
  { id: 'po', title: 'PODCAST:', titleLine2: 'MARKET OUTLOOK', image: `${media}/merge1.jpg`, href: '/learn' },
  { id: 'fx', title: 'PODCAST:', titleLine2: 'FX TRENDS', image: `${media}/merge6.jpg`, href: '/learn' },
  { id: 'webinar', title: 'FINANCIAL WEBINAR', image: `${media}/merge5.jpg`, href: '/learn' },
  { id: 'discover', title: 'PRODUCT DISCOVERY', image: `${media}/merge3.jpg`, href: '/learn' },
]

export const multiCurrencyPoints: PrivilegePoint[] = [
  { title: 'All 34 Currencies In 1 Card', description: 'Convert Malaysian Ringgit to 33 different foreign currencies with ease.', icon: `${media}/icon_all-in-one.png` },
  { title: 'Access Your Cash Overseas', description: 'Withdraw up to 33 currencies directly for your foreign currency balances at any overseas ATMs that display the Visa Plus logo.', icon: `${media}/icon_access.png` },
  { title: 'Attractive Conversion Rates', description: 'Enjoy competitive live conversion rates.', icon: `${media}/icon_convesion-rates.png` },
  { title: 'Tap and Go', description: 'Perform cashless transactions around the world easily with the contactless feature.', icon: `${media}/icon_tap-and-go.png` },
  { title: 'Zero Conversion Fees', description: 'Save on every spend you make overseas as no conversion fees will be charged.', icon: `${media}/icon_zero-conversion.png` },
  { title: 'No Limit in Usage', description: 'Spend up to your available foreign currency and it will be deducted directly from your Multi Currency Account/-i balances.', icon: `${media}/icon_no-limit.png` },
  { title: 'Grow Your Money', description: 'Earn attractive returns on your account balances*.', icon: `${media}/icon_grow-your-money.png` },
]

export const visaInfinitePoints: PrivilegePoint[] = [
  { title: 'Unlimited Premium Lounge Access', description: 'Enjoy unlimited access to selected Plaza Premium Lounges/Aerotel in Malaysia and other locations around the globe.', icon: `${media}/icon_premium-lounge.png` },
  { title: 'Air Miles Travel Benefits', description: 'Get rewards faster by redeeming 1,000 Enrich Points for only 8,000 LoyaltyPlus Points.', icon: `${media}/icon_air-miles.png` },
  { title: 'LoyaltyPlus points for travel related transactions', description: 'Earn up to 10x LoyaltyPlus points on Overseas spend, 3x on Airlines, Hotel and Travel related retail spend via Online, and 1x for local retail spend.', icon: `${media}/icon_loyalty-points.png` },
  { title: 'Travel Insurance Coverage', description: 'Get protected for up to RM2,000,000 Travel Insurance Coverage. Only valid for RHB Premier Visa Infinite Credit Card.', icon: `${media}/icon_insurance-coverage.png` },
  { title: 'Golf Privileges', description: "Enjoy complimentary green fees and more golf privileges at Malaysia's most exclusive golf courses.", icon: `${media}/icon_golf-privileges.png` },
  { title: 'Lifetime Annual Fee Waiver', description: 'Enjoy a lifetime of zero annual fees.', icon: `${media}/icon_lifetime-annual-waver.png` },
]

export const propertyPoints = [
  'Attractive interest rates.',
  'MYR-denominated loan safeguards repayments from currency risk.',
  'Margin of financing up to 80% + 5% MRTA/CLTA* (UK) and 70% + 5% MRTA/CLTA* (AUS).',
  'Loan tenure up to 30 years or age 70.',
  'Early release option to lock in foreign exchange rates.',
  'Flexible prepayment & redraw option*.',
]

export const mobileBankingPoints = [
  { title: 'Fast and Secure', description: 'Authenticate your identity and access your mobile banking with just one look using Face ID, or a quick login via fingerprint using biometrics.' },
  { title: 'Proactive Alerts', description: 'Our actionable notifications ensure that you never miss a monthly payment.' },
  { title: 'One-Touch convenience', description: 'With a one-at-a-time registration for all your devices, you get to enjoy secure one touch payment with total peace of mind.' },
  { title: 'Convenient Payments', description: 'Make cashless payments to over 200,000 merchants with a tap of a button using DuitNow QR.' },
  { title: 'CashXcess', description: 'Convert your unused credit card balance to cash in a few simple clicks.' },
]

export const onlineBankingPoints = [
  { title: 'User-friendly interface', description: 'Access to all your banking services and needs at one glance' },
  { title: 'Enhanced transaction protection', description: 'Enjoy greater security with Secure Plus for any transaction worth RM10,000 or more.' },
  { title: 'Effortlessly pay bills', description: 'View and search by keywords from more than 8,000 available billers nationwide.' },
  { title: 'Seamless desktop to mobile experience', description: 'Transition effortlessly and securely between your mobile and browser.' },
]

export const greenProducts = [
  { title: 'RHB Vehicle Financing-i', description: 'Steer towards a cleaner, greener future by getting an eco-friendly car with our Green Financing Package.' },
  { title: 'SME Sustainable Loan/Financing', description: 'Assisting your business to go green with financing for Renewable Equipment for business operating premises.' },
  { title: 'Charitable Causes', description: 'Contribute and give back to the community through Islamic social finance instruments, partnered with more than 40 charity organisations.' },
  { title: 'RHB Foundation', description: 'Be the catalyst for a greater good by providing aid and assistance to underprivileged children and youths.' },
  { title: 'ESG Fund', description: 'Make a positive impact to the world by investing in our ESG funds. Speak to your Relationship Manager today.' },
]

export const eligibilityOptions = [
  {
    id: 'aum',
    amount: 'RM200,000',
    description: 'In deposit, investment or Bancaassurance/Bancatakaful.',
    icon: `${media}/icon-investment.png`,
  },
  {
    id: 'hybrid',
    amount: 'RM100,000',
    description: 'In deposit, investment or Bancassurance/Bancatakaful for 12 months upon enrolment. And RM20,000 monthly gross salary for RHB customers with Mortgage Facility or Auto-Finance or RHB Credit Card customers.',
    icon: `${media}/icon-facility.png`,
  },
  {
    id: 'joy',
    amount: 'RM20,000',
    description: 'Monthly gross salary maintained with RHB Premier Joy@Work with waiver of Asset Under Management requirement for 12 months upon enrolment.',
    icon: `${media}/icon-joyatwork.png`,
  },
]

export const premierProducts = [
  'Premier Deposit Products',
  'Premier Investment Products',
  'Premier Life Insurance Product',
  'Credit Card',
  'Personal Loans',
  'Mortgage Loans',
  'Auto Financing',
]

export const premierStates = [
  'Selangor',
  'Kuala Lumpur',
  'Perak',
  'Pulau Pinang',
  'Johor',
  'Kedah',
  'Kelantan',
  'Melaka',
  'Terengganu',
  'Negeri Sembilan',
  'Pahang',
  'Perlis',
  'Sabah',
  'Sarawak',
]

export const premierTerms = [
  'RHB Premier Terms & Conditions',
  'General Credit Card Terms & Conditions',
  'RHB Premier Visa Infinite Credit Card Terms & conditions',
  'RHB Islamic Premier Visa Infinite Credit Card-i Terms & Conditions',
  'RHB Premier Debit Card Terms & Conditions',
  'RHB Premier Debit Card-i Terms & Conditions',
  'Personal Banking Terms & Conditions (English)',
  'RHB Overseas Property Loan Terms & Conditions',
]

export const premierDisclosures = [
  'RHB Premier Visa Infinite Credit Card Product Disclosure Sheet',
  'RHB Islamic Premier Visa Infinite Credit Card-i Product Disclosure Sheet',
  'RHB Premier Debit Card Product Disclosure Sheet',
  'RHB Premier Debit Card-i Product Disclosure Sheet',
]
