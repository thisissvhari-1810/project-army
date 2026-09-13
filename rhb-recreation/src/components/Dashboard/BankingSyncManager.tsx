import { useEffect } from 'react'
import { syncBankingFromRemote } from '../../lib/bankingSync'
import {
  BANKING_STORAGE_KEY,
  invalidateBankingSnapshot,
  notifyBankingStoreChanged,
} from '../../lib/bankingStorage'
import { appStorage } from '../../lib/storage'

type BankingSyncManagerProps = {
  active?: boolean
}

export function BankingSyncManager({ active = true }: BankingSyncManagerProps) {
  useEffect(() => {
    if (!active) return

    let lastRaw = appStorage.getItem(BANKING_STORAGE_KEY) ?? ''

    const syncLocal = () => {
      const raw = appStorage.getItem(BANKING_STORAGE_KEY) ?? ''
      if (raw !== lastRaw) {
        lastRaw = raw
        invalidateBankingSnapshot()
        notifyBankingStoreChanged()
      }
    }

    const syncRemote = () => {
      void syncBankingFromRemote().then((changed) => {
        if (changed) {
          lastRaw = appStorage.getItem(BANKING_STORAGE_KEY) ?? ''
        }
      })
    }

    syncLocal()
    syncRemote()

    const localInterval = window.setInterval(syncLocal, 1000)
    const remoteInterval = window.setInterval(syncRemote, 2000)
    window.addEventListener('focus', syncRemote)
    window.addEventListener('focus', syncLocal)

    return () => {
      window.clearInterval(localInterval)
      window.clearInterval(remoteInterval)
      window.removeEventListener('focus', syncRemote)
      window.removeEventListener('focus', syncLocal)
    }
  }, [active])

  return null
}
