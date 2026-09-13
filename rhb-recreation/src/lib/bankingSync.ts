import type { BankingData } from '../types/banking'
import {
  invalidateBankingSnapshot,
  loadBankingData,
  mergeRemoteBankingData,
  notifyBankingStoreChanged,
} from './bankingStorage'

export async function pullBankingRemote(): Promise<boolean> {
  try {
    const response = await fetch('/api/banking', { cache: 'no-store' })
    if (!response.ok) return false

    const remote = (await response.json()) as BankingData | null
    const local = loadBankingData()

    if (!remote?.users?.length) {
      if (local.users.length) {
        await pushBankingRemote(local)
      }
      return false
    }

    const remoteTime = remote.updatedAt ? new Date(remote.updatedAt).getTime() : 0
    const localTime = local.updatedAt ? new Date(local.updatedAt).getTime() : 0

    if (localTime > remoteTime) {
      await pushBankingRemote(local)
      invalidateBankingSnapshot()
      notifyBankingStoreChanged()
      return true
    }

    const merged = mergeRemoteBankingData(remote)
    if (merged) {
      invalidateBankingSnapshot()
    }
    return merged
  } catch {
    return false
  }
}

export async function syncBankingFromRemote(): Promise<boolean> {
  return pullBankingRemote()
}

export async function pushBankingRemote(data: BankingData): Promise<void> {
  try {
    await fetch('/api/banking', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  } catch {
    // Shared storage may be unavailable in local-only mode.
  }
}
