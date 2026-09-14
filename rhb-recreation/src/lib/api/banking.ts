import { apiRequest } from './client'
import type { AddAmountInput, AuthSession, NewUserInput, PublicUser, Transaction } from '../../types/banking'
import type { AuditData } from '../../types/audit'

export async function fetchSession() {
  return apiRequest<{ session: AuthSession | null; balanceVerifiedUntil?: string | null }>(
    '/api/auth/me',
  )
}

export async function loginRequest(input: {
  username: string
  password: string
  loginPhoto?: string
  clientContext?: Record<string, unknown>
}) {
  return apiRequest<{ session: AuthSession }>('/api/auth/login', {
    method: 'POST',
    json: input,
  })
}

export async function precheckLogin(username: string, password: string) {
  return apiRequest<{ ok: true; role: 'admin' | 'user' }>('/api/auth/precheck', {
    method: 'POST',
    json: { username, password },
  })
}

export async function logoutRequest() {
  return apiRequest<{ ok: true }>('/api/auth/logout', { method: 'POST' })
}

export async function verifySiteAccess(pin: string) {
  return apiRequest<{ ok: true }>('/api/site-access/verify', {
    method: 'POST',
    json: { pin },
  })
}

export async function fetchSiteAccessStatus() {
  return apiRequest<{ unlocked: boolean }>('/api/site-access/status')
}

export async function verifyBalancePin(pin: string) {
  return apiRequest<{ ok: true; balanceVerifiedUntil: string }>('/api/balance/verify', {
    method: 'POST',
    json: { pin },
  })
}

export async function fetchBalanceVisibility() {
  return apiRequest<{ visible: boolean; balanceVerifiedUntil?: string | null }>(
    '/api/balance/status',
  )
}

export async function fetchAccount() {
  return apiRequest<{ account: PublicUser; balanceVisible: boolean }>('/api/account')
}

export async function fetchTransactions() {
  return apiRequest<{ transactions: Transaction[] }>('/api/transactions')
}

export async function fetchAdminUsers() {
  return apiRequest<{ users: PublicUser[] }>('/api/admin/users')
}

export async function createUserRequest(input: NewUserInput) {
  return apiRequest<{ user: PublicUser }>('/api/admin/users', {
    method: 'POST',
    json: input,
  })
}

export async function postAdminTransaction(input: AddAmountInput) {
  const path =
    input.type === 'credit'
      ? `/api/admin/accounts/${input.userId}/credit`
      : `/api/admin/accounts/${input.userId}/debit`

  return apiRequest<{ transaction: Transaction }>(path, {
    method: 'POST',
    json: {
      amount: input.amount,
      description: input.description,
      idempotencyKey: crypto.randomUUID(),
    },
  })
}

export async function fetchAuditLogs(userId?: string) {
  const query = userId ? `?userId=${encodeURIComponent(userId)}` : ''
  return apiRequest<AuditData & { requestId: string }>(`/api/admin/audit${query}`)
}

export async function trackActivity(payload: Record<string, unknown>) {
  return apiRequest<{ ok: true }>('/api/activity/track', {
    method: 'POST',
    json: payload,
  })
}
