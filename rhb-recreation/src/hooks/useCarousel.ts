import { useCallback, useEffect, useState } from 'react'

export function useCarousel(length: number, interval = 5000) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setIndex((current) => (current + 1) % length)
  }, [length])

  const prev = useCallback(() => {
    setIndex((current) => (current - 1 + length) % length)
  }, [length])

  const goTo = useCallback((value: number) => {
    setIndex(value)
  }, [])

  useEffect(() => {
    if (paused || length <= 1) return
    const timer = window.setInterval(next, interval)
    return () => window.clearInterval(timer)
  }, [interval, length, next, paused])

  return { index, next, prev, goTo, paused, setPaused }
}
