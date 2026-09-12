const media = 'https://www.rhbgroup.com/-/media/Assets/Corporate-Website/Images/Overview'

export const personalTabs = [
  { id: 'deposits', label: 'Deposits' },
  { id: 'cards', label: 'Cards', href: '/products-services' },
  { id: 'financing', label: 'Financing' },
  { id: 'remittance', label: 'Remittance', href: '/placeholder/remittance' },
  { id: 'investments', label: 'Investments' },
  { id: 'life-insurance', label: 'Life Insurance' },
  { id: 'general-insurance', label: 'General Insurance' },
  { id: 'banking-methods', label: 'Banking Methods', href: '/placeholder/banking-methods' },
  { id: 'safe-deposit-box', label: 'Safe Deposit Box', href: '/placeholder/safe-deposit' },
] as const

export type PersonalTabId = (typeof personalTabs)[number]['id']

export const personalHero = [
  {
    id: 'personal-1',
    title: 'personal 1',
    desktop: `${media}/overview-personal-banking/personal-1.jpg`,
    mobile: `${media}/overview-personal-banking/personal_mobile-1.jpg`,
  },
  {
    id: 'asnb',
    title: 'Pandu Impianmu',
    href: 'https://www.asnb.com.my/campaign/pandu-impianmu-2',
    desktop: `${media}/overview-personal-banking/PWS-Home-Banner-24-8-1920x675.jpg`,
    mobile: `${media}/overview-personal-banking/PWS-Home-Banner-24-8-768x1050.jpg`,
  },
  {
    id: 'apple-pay',
    title: 'Apple Pay',
    href: '/products-services',
    desktop: `${media}/overview-personal-banking/ApplePay-Product-Page-Banners_Dekstop.jpg`,
    mobile: `${media}/overview-personal-banking/ApplePay-Product-Page-Banner_Mobile.jpg`,
  },
  {
    id: 'home-loan',
    title: 'home loan',
    href: '/personal#financing',
    desktop: `${media}/overview-personal-banking/home-loan-desktop.jpg`,
    mobile: `${media}/overview-personal-banking/home-loan-mobile.jpg`,
  },
  {
    id: 'personal-6',
    title: 'personal 6',
    href: '/placeholder/digital-services',
    desktop: `${media}/overview-personal-banking/personal-6.jpg`,
    mobile: `${media}/overview-personal-banking/personal_mobile-6.jpg`,
  },
  {
    id: 'estatement',
    title: 'e-statement',
    href: '/placeholder/digital-services',
    desktop: `${media}/overview-islamic-banking/islamic-7.jpg`,
    mobile: `${media}/overview-islamic-banking/islamic-mobile-7.jpg`,
  },
]

export type PersonalItem = {
  title: string
  description: string
}

export const personalSections: {
  id: PersonalTabId
  items: PersonalItem[]
}[] = [
  {
    id: 'deposits',
    items: [
      {
        title: 'Account Finder',
        description: 'Try our account finder feature to find what suits your needs best.',
      },
      {
        title: 'Current Account',
        description:
          'Looking for a current account that fulfills your needs? Basic or Premier, high interest rates or with overdraft facility, we have it all.',
      },
      {
        title: 'Fixed Deposits',
        description: 'Looking for something secure? We have the right solution for you.',
      },
      {
        title: 'Multi Currency Account',
        description: 'Interest bearing account that supports 33 foreign currencies and 2 precious metals. All in one.',
      },
      {
        title: 'Savings Account',
        description: 'Watch your money grow. Even if you are just saving for a rainy day.',
      },
      {
        title: 'RHB Joy@Work',
        description:
          'Discover the different ways in which you can enjoy amazing privileges when you choose to credit your monthly earnings into our salary crediting account.',
      },
      {
        title: 'RHB Family Banking',
        description: "Manage your family's finances in one place and enjoy greater rewards by saving together.",
      },
    ],
  },
  {
    id: 'financing',
    items: [
      {
        title: 'Home Financing',
        description:
          'Commercial Property Financing Build your dream home or expand your business horizons with us. Whatever you need, we’ve got it.',
      },
      {
        title: 'Personal Financing',
        description:
          'We make it happen – a wedding, a new addition to the family, a renovation. Or something you need, your solution starts here.',
      },
      {
        title: 'Auto Financing',
        description: 'Best deal for your wheels. Competitive, fast and flexible. Your dream car is within reach.',
      },
      {
        title: 'ASNB Financing',
        description:
          'Your future is safe with RHB’s ASNB Financing. Enjoy high margin of financing, attractive rates and flexible tenures.',
      },
      {
        title: 'Investment Financing',
        description: 'Expand your trading potential with our tailor-made financing solutions.',
      },
      {
        title: 'RHB PayLater',
        description: 'Shop now, pay later. Enjoy the flexibility of splitting your purchases into easy installments with zero hassle.',
      },
      {
        title: 'Wealth Leverage',
        description: 'Smart financing to maximise your investment growth',
      },
    ],
  },
  {
    id: 'investments',
    items: [
      { title: 'Unit Trust', description: 'Access to wide range of unit trust funds' },
      {
        title: 'Structured Product Investment',
        description: 'Customised financial solutions that meet your risk appetite.',
      },
      {
        title: 'Precious Metals Investment',
        description: '33 Foreign Currencies and Precious Metals in one account',
      },
      {
        title: 'Retail Bond',
        description: 'Fixed income investment that provides a predictable income stream for a diversified portfolio.',
      },
      {
        title: 'Trading',
        description: 'Access to a wide range of investment and trading products in local and global markets.',
      },
      {
        title: 'Wealth Insights',
        description:
          'Merge by RHB - Convenient access to financial insights and periodic market outlook updates to make informed financial decisions',
      },
      {
        title: 'Goal Based Calculator',
        description: 'A financial planning tool to help you achieve your financial goals.',
      },
    ],
  },
  {
    id: 'life-insurance',
    items: [
      {
        title: 'For Life-Starters',
        description:
          'Getting your first Protection Plan when you are young and healthy is much more affordable. By locking in a low premium when you are young, you could end up paying less for cover in the long run.',
      },
      {
        title: 'For Young Parents',
        description:
          'Every parent seeks a secure future for their children, so plan early. Secure your child’s higher education plans because big dreams are achieved this way.',
      },
      {
        title: 'For Women',
        description:
          'Many women are busy carrying different roles in life, be it daughter, mother, grandmother with no time to think about themselves. It’s time to plan ahead to protect your future.',
      },
      {
        title: 'For Your Legacy Plan',
        description:
          'Ensure your legacy of love lives on for your loved ones. Protect the interests of those closest to you with estate planning and asset transfers.',
      },
      {
        title: 'For Business Owners',
        description:
          'Take charge of planning and saving for your own retirement. Business owners like you need to secure and protect all you have worked for in your life.',
      },
      {
        title: 'For Your Retirement',
        description:
          'Retirement should be something you look forward to, a time to indulge in your favourite activities and explore new interests. Secure your retirement life today.',
      },
      {
        title: 'Goal Based Calculator',
        description: 'A financial planning tool to help you achieve your financial goals.',
      },
    ],
  },
  {
    id: 'general-insurance',
    items: [
      { title: 'Personal Accident', description: 'Protection from the unexpected.' },
      { title: 'Medical', description: 'We leave you to focus on getting the best healthcare available.' },
      { title: 'Property', description: 'Keeping your dream home and valuables safe.' },
      { title: 'Motor', description: 'Comprehensive protection on the road.' },
      { title: 'Motor Add-On', description: 'Comprehensive protection with add-on coverage while on the road.' },
      { title: 'Travel', description: 'Worry-free travel is here.' },
      { title: 'Miscellaneous', description: 'Keeping you covered from financial losses in more ways than one.' },
    ],
  },
]
