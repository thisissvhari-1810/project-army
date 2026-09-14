import { useCallback, useEffect, useState } from 'react'
import { apiRequest } from '../lib/api/client'
import { fetchBalanceVisibility } from '../lib/api/banking'

export function useBalanceVisibility() {
  const [visible, setVisible] = useState(false)

  const refresh = useCallback(() => {
    void fetchBalanceVisibility()
      .then((result) => setVisible(result.visible))
      .catch(() => setVisible(false))
  }, [])

  useEffect(() => {
    refresh()
    const interval = window.setInterval(refresh, 5000)
    return () => window.clearInterval(interval)
  }, [refresh])

  const reveal = useCallback(() => {
    refresh()
  }, [refresh])

  const hide = useCallback(() => {
    void apiRequest('/api/balance/hide', { method: 'POST' }).finally(refresh)
  }, [refresh])

  return { visible, refresh, reveal, hide }
}

export function maskCurrency(value: string, visible: boolean) {
  return visible ? value : '••••••'
}
