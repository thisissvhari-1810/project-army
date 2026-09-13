import { useCallback, useEffect, useState } from 'react'
import {
  clearBalanceVisibility,
  isBalanceVisibleNow,
  setBalanceVisibleFor,
} from '../lib/accessCodes'

const AUTO_HIDE_MS = 60000

export function useBalanceVisibility() {
  const [visible, setVisible] = useState(() => isBalanceVisibleNow())

  useEffect(() => {
    const tick = () => {
      setVisible(isBalanceVisibleNow())
    }

    tick()
    const interval = window.setInterval(tick, 1000)
    return () => window.clearInterval(interval)
  }, [])

  const reveal = useCallback(() => {
    setBalanceVisibleFor(AUTO_HIDE_MS)
    setVisible(true)
  }, [])

  const hide = useCallback(() => {
    clearBalanceVisibility()
    setVisible(false)
  }, [])

  return { visible, reveal, hide }
}

export function maskCurrency(value: string, visible: boolean) {
  return visible ? value : '••••••'
}
