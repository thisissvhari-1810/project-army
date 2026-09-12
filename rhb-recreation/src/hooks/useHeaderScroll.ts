import { useEffect, useState } from 'react'

export function useHeaderScroll() {
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setCompact(window.scrollY > 50)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { compact, hidden: false }
}
