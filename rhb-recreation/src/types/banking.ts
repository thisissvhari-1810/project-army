export type UserRole = 'admin' | 'user'

export type BankUser = {
  id: string
  username: string
  password: string
  displayName: string
  role: UserRole
  balance: number
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

export type Activity = {
  id: string
  userId: string
  username: string
  action: string
  details: string
  createdAt: string
}

export type AuthSession = {
  userId: string
  username: string
  displayName: string
  role: UserRole
  sessionId: string
}

export type BankingData = {
  users: BankUser[]
  transactions: Transaction[]
  activities: Activity[]
  updatedAt?: string
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
