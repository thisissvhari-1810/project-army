import { Link } from 'react-router-dom'

type LogoProps = {
  className?: string
  width?: number
  variant?: 'blue' | 'white' | 'premier'
}

const sources = {
  blue: { src: '/assets/logos/rhb-official.png', alt: 'RHB', to: '/' },
  white: { src: '/assets/logos/logo-white.svg', alt: 'RHB', to: '/' },
  premier: {
    src: '/assets/logos/logo-premier.png',
    alt: 'RHB Premier',
    to: '/premier',
  },
} as const

export function Logo({ className = '', width = 120, variant = 'blue' }: LogoProps) {
  const logo = sources[variant]

  return (
    <Link to={logo.to} className={`navigation-logo inline-flex items-center shrink-0 ${className}`} aria-label={logo.alt}>
      <img
        src={logo.src}
        alt={logo.alt}
        width={width}
        height={36}
        className="w-full h-auto max-h-full object-contain object-left"
      />
    </Link>
  )
}
