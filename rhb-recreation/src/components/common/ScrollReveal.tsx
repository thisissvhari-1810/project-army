import type { ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  delay?: 1 | 2 | 3 | 4
}

export function ScrollReveal({ children, className = '', delay }: ScrollRevealProps) {
  const { ref, visible } = useInView<HTMLDivElement>(0.18)

  return (
    <div
      ref={ref}
      className={`${visible ? `reveal ${delay ? `reveal-delay-${delay}` : ''}` : 'opacity-0'} ${className}`}
    >
      {children}
    </div>
  )
}
