export type UserRole = 'admin' | 'user'

export type PublicUser = {
  id: string
  username: string
  displayName: string
  role: UserRole
  balance: number | null
  accountNumber: string
  createdAt: string
}

export type TransactionType = 'credit' | 'debit'

export type Transaction = {
  id: string
  jhbTransactionId: string
  userId: string
  username: string
  type: TransactionType
  amount: number
  description: string
  balanceAfter: number
  performedBy: string
  createdAt: string
}

export type AuthSession = {
  userId: string
  username: string
  displayName: string
  role: UserRole
  sessionId: string
  accountNumber?: string
}

export type NewUserInput = {
  username: string
  password: string
  displayName: string
  initialBalance: number
}

export type AddAmountInput = {
  userId: string
  amount: number
  type: TransactionType
  description: string
}

export type Activity = {
  id: string
  userId: string
  username: string
  action: string
  details: string
  createdAt: string
}
