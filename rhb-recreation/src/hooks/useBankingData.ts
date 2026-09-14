import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { fetchAccount, fetchAdminUsers, fetchTransactions } from '../lib/api/banking'
import type { PublicUser, Transaction } from '../types/banking'

type BankingData = {
  users: PublicUser[]
  transactions: Transaction[]
  loading: boolean
  error: string | null
}

export function useBankingData(): BankingData {
  const { session, refreshKey } = useAuth()
  const [users, setUsers] = useState<PublicUser[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!session) {
      setUsers([])
      setTransactions([])
      setLoading(false)
      return
    }

    let active = true
    setLoading(true)
    setError(null)

    void (async () => {
      try {
        const [txnResult, usersResult, accountResult] = await Promise.all([
          fetchTransactions(),
          session.role === 'admin' ? fetchAdminUsers() : Promise.resolve(null),
          session.role === 'user' ? fetchAccount() : Promise.resolve(null),
        ])

        if (!active) return

        setTransactions(txnResult.transactions)
        if (usersResult) {
          setUsers(usersResult.users)
        } else if (accountResult?.account) {
          setUsers([accountResult.account])
        } else {
          setUsers([])
        }
      } catch (err) {
        if (!active) return
        setError(err instanceof Error ? err.message : 'Unable to load banking data.')
      } finally {
        if (active) setLoading(false)
      }
    })()

    return () => {
      active = false
    }
  }, [session, refreshKey])

  return { users, transactions, loading, error }
}
