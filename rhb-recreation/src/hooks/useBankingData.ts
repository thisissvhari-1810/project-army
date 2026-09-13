import { useEffect } from 'react'
import { useSyncExternalStore } from 'react'
import {
  BANKING_STORAGE_KEY,
  getBankingSnapshot,
  invalidateBankingSnapshot,
  notifyBankingStoreChanged,
  subscribeBankingStore,
} from '../lib/bankingStorage'
import { appStorage } from '../lib/storage'

export function useBankingData() {
  useEffect(() => {
    let lastRaw = appStorage.getItem(BANKING_STORAGE_KEY) ?? ''

    const poll = () => {
      const raw = appStorage.getItem(BANKING_STORAGE_KEY) ?? ''
      if (raw !== lastRaw) {
        lastRaw = raw
        invalidateBankingSnapshot()
        notifyBankingStoreChanged()
      }
    }

    poll()
    const interval = window.setInterval(poll, 1000)
    window.addEventListener('focus', poll)

    return () => {
      window.clearInterval(interval)
      window.removeEventListener('focus', poll)
    }
  }, [])

  return useSyncExternalStore(subscribeBankingStore, getBankingSnapshot, getBankingSnapshot)
}
