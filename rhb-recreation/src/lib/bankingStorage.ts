import { defaultBankingData } from '../data/bankingDefaults'
import { appStorage } from './storage'
import type {
  Activity,
  AddAmountInput,
  AuthSession,
  BankingData,
  BankUser,
  NewUserInput,
  Transaction,
} from '../types/banking'

export const BANKING_STORAGE_KEY = 'rhb-premier-banking-v2'
const STORAGE_KEY = BANKING_STORAGE_KEY
const LEGACY_STORAGE_KEY = 'rhb-premier-banking'
const SESSION_KEY = 'rhb-premier-session'
export const BANKING_UPDATE_EVENT = 'rhb-banking-updated'
const BANKING_BROADCAST_CHANNEL = 'rhb-banking-sync'

let cachedSnapshot: BankingData | null = null
let cachedRaw: string | null = null
let broadcastChannel: BroadcastChannel | null = null
const storeListeners = new Set<() => void>()

function stampBankingData(data: BankingData): BankingData {
  return { ...data, updatedAt: new Date().toISOString() }
}

function getBroadcastChannel() {
  if (typeof window === 'undefined' || !('BroadcastChannel' in window)) return null
  if (!broadcastChannel) {
    broadcastChannel = new BroadcastChannel(BANKING_BROADCAST_CHANNEL)
  }
  return broadcastChannel
}

export function invalidateBankingSnapshot() {
  cachedRaw = null
  cachedSnapshot = null
}

export function getBankingSnapshot(): BankingData {
  const raw = appStorage.getItem(STORAGE_KEY) ?? ''
  if (cachedSnapshot && cachedRaw === raw) return cachedSnapshot
  cachedRaw = raw
  cachedSnapshot = loadBankingData()
  return cachedSnapshot
}

function notifyBankingUpdated() {
  if (typeof window === 'undefined') return
  invalidateBankingSnapshot()
  window.dispatchEvent(new CustomEvent(BANKING_UPDATE_EVENT))
  getBroadcastChannel()?.postMessage({ type: 'updated', at: Date.now() })
  for (const listener of storeListeners) listener()
}

export function notifyBankingStoreChanged() {
  notifyBankingUpdated()
}

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function generateAccountNumber() {
  return `80${Math.floor(10000000 + Math.random() * 90000000)}`
}

export function generateJhbTransactionId() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const suffix = Math.floor(10000000 + Math.random() * 90000000).toString()
  return `JHB${date}${suffix}`
}

function ensureTransactionIds(data: BankingData): BankingData {
  let changed = false

  for (const txn of data.transactions) {
    if (!txn.jhbTransactionId) {
      txn.jhbTransactionId = generateJhbTransactionId()
      changed = true
    }
  }

  if (changed) saveBankingData(data, { skipRemote: true })
  return data
}

function migrateBankingData(data: BankingData): BankingData {
  const customer = data.users.find((user) => user.id === 'usr-user')
  const needsGovindCredentials =
    customer &&
    (customer.username === 'user' ||
      (customer.username === 'govind' && customer.password === 'user123'))

  if (!needsGovindCredentials) return data

  customer.username = 'govind'
  customer.password = 'govind123'
  customer.displayName = 'Govind'

  for (const txn of data.transactions) {
    if (txn.userId === 'usr-user') txn.username = 'govind'
  }
  for (const activity of data.activities) {
    if (activity.userId === 'usr-user') activity.username = 'govind'
  }

  saveBankingData(data)
  return data
}

export function loadBankingData(): BankingData {
  appStorage.removeItem(LEGACY_STORAGE_KEY)
  const raw = appStorage.getItem(STORAGE_KEY)
  if (!raw) {
    appStorage.setItem(STORAGE_KEY, JSON.stringify(defaultBankingData))
    return structuredClone(defaultBankingData)
  }
  try {
    return ensureTransactionIds(migrateBankingData(JSON.parse(raw) as BankingData))
  } catch {
    appStorage.setItem(STORAGE_KEY, JSON.stringify(defaultBankingData))
    return structuredClone(defaultBankingData)
  }
}

export function saveBankingData(data: BankingData, options?: { skipRemote?: boolean }) {
  const payload = stampBankingData(data)
  appStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  notifyBankingUpdated()
  if (!options?.skipRemote) {
    void import('./bankingSync').then(({ pushBankingRemote }) => pushBankingRemote(payload))
  }
}

export function mergeRemoteBankingData(remote: BankingData): boolean {
  const local = loadBankingData()
  const remoteTime = remote.updatedAt ? new Date(remote.updatedAt).getTime() : 0
  const localTime = local.updatedAt ? new Date(local.updatedAt).getTime() : 0

  if (remoteTime > localTime) {
    saveBankingData(remote, { skipRemote: true })
    return true
  }

  if (remoteTime === localTime && JSON.stringify(remote) !== JSON.stringify(local)) {
    saveBankingData(remote, { skipRemote: true })
    return true
  }

  return false
}

export function subscribeBankingStore(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => undefined
  }

  storeListeners.add(onStoreChange)

  const onChange = () => {
    invalidateBankingSnapshot()
    onStoreChange()
  }

  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) onChange()
  }

  const channel = getBroadcastChannel()
  const onBroadcast = () => onChange()

  window.addEventListener(BANKING_UPDATE_EVENT, onChange)
  window.addEventListener('storage', onStorage)
  channel?.addEventListener('message', onBroadcast)

  return () => {
    storeListeners.delete(onStoreChange)
    window.removeEventListener(BANKING_UPDATE_EVENT, onChange)
    window.removeEventListener('storage', onStorage)
    channel?.removeEventListener('message', onBroadcast)
  }
}

export function subscribeBankingUpdates(callback: () => void) {
  return subscribeBankingStore(callback)
}

export function loadSession(): AuthSession | null {
  const raw = appStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    const session = JSON.parse(raw) as AuthSession
    let changed = false
    if (session.userId === 'usr-user' && session.username === 'user') {
      session.username = 'govind'
      session.displayName = 'Govind'
      changed = true
    }
    if (!session.sessionId) {
      session.sessionId = createId('sess')
      changed = true
    }
    if (changed) saveSession(session)
    return session
  } catch {
    return null
  }
}

export function saveSession(session: AuthSession | null) {
  if (!session) {
    appStorage.removeItem(SESSION_KEY)
    return
  }
  appStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function validateCredentials(username: string, password: string) {
  const user = loadBankingData().users.find(
    (entry) => entry.username.toLowerCase() === username.toLowerCase() && entry.password === password,
  )
  if (!user) return null

  return {
    userId: user.id,
    username: user.username,
    displayName: user.displayName,
    role: user.role,
  }
}

export function authenticate(username: string, password: string): AuthSession | null {
  const validated = validateCredentials(username, password)
  if (!validated) return null

  const data = loadBankingData()
  const user = data.users.find((entry) => entry.id === validated.userId)
  if (!user) return null

  const session: AuthSession = {
    userId: user.id,
    username: user.username,
    displayName: user.displayName,
    role: user.role,
    sessionId: createId('sess'),
  }

  const activity: Activity = {
    id: createId('act'),
    userId: user.id,
    username: user.username,
    action: 'Login',
    details: 'Signed in to RHB Premier Online Banking',
    createdAt: new Date().toISOString(),
  }

  data.activities.unshift(activity)
  saveBankingData(data)
  saveSession(session)
  return session
}

export function logoutSession() {
  saveSession(null)
}

export function getUserById(userId: string): BankUser | undefined {
  return loadBankingData().users.find((user) => user.id === userId)
}

export function getUsers(): BankUser[] {
  return loadBankingData().users.filter((user) => user.role === 'user')
}

export function getTransactionsForUser(userId: string): Transaction[] {
  return loadBankingData()
    .transactions.filter((txn) => txn.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getAllTransactions(): Transaction[] {
  return loadBankingData()
    .transactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getActivitiesForUser(userId: string): Activity[] {
  return loadBankingData()
    .activities.filter((activity) => activity.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getAllActivities(): Activity[] {
  return loadBankingData()
    .activities.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function addUser(input: NewUserInput, performedBy: string): { ok: true; user: BankUser } | { ok: false; error: string } {
  const data = loadBankingData()
  const exists = data.users.some((user) => user.username.toLowerCase() === input.username.toLowerCase())
  if (exists) return { ok: false, error: 'Username already exists.' }

  const user: BankUser = {
    id: createId('usr'),
    username: input.username.trim(),
    password: input.password,
    displayName: input.displayName.trim(),
    role: 'user',
    balance: input.initialBalance,
    accountNumber: generateAccountNumber(),
    createdAt: new Date().toISOString(),
  }

  data.users.push(user)

  if (input.initialBalance > 0) {
    const txn: Transaction = {
      id: createId('txn'),
      jhbTransactionId: generateJhbTransactionId(),
      userId: user.id,
      username: user.username,
      type: 'credit',
      amount: input.initialBalance,
      description: 'Initial account opening balance',
      balanceAfter: input.initialBalance,
      performedBy,
      createdAt: new Date().toISOString(),
    }
    data.transactions.unshift(txn)
  }

  data.activities.unshift({
    id: createId('act'),
    userId: user.id,
    username: user.username,
    action: 'Account',
    details: `Premier account created by ${performedBy}`,
    createdAt: new Date().toISOString(),
  })

  saveBankingData(data)
  return { ok: true, user }
}

export function addAmount(input: AddAmountInput, performedBy: string): { ok: true } | { ok: false; error: string } {
  const data = loadBankingData()
  const userIndex = data.users.findIndex((user) => user.id === input.userId)
  if (userIndex === -1) return { ok: false, error: 'User not found.' }

  const user = data.users[userIndex]
  if (user.role !== 'user') return { ok: false, error: 'Amount can only be added to customer accounts.' }

  if (input.type === 'debit' && user.balance < input.amount) {
    return { ok: false, error: 'Insufficient balance for debit.' }
  }

  const nextBalance =
    input.type === 'credit' ? user.balance + input.amount : user.balance - input.amount

  data.users[userIndex] = { ...user, balance: nextBalance }

  const txn: Transaction = {
    id: createId('txn'),
    jhbTransactionId: generateJhbTransactionId(),
    userId: user.id,
    username: user.username,
    type: input.type,
    amount: input.amount,
    description: input.description.trim() || (input.type === 'credit' ? 'Credit adjustment' : 'Debit adjustment'),
    balanceAfter: nextBalance,
    performedBy,
    createdAt: new Date().toISOString(),
  }

  data.transactions.unshift(txn)
  data.activities.unshift({
    id: createId('act'),
    userId: user.id,
    username: user.username,
    action: 'Transaction',
    details: `${input.type === 'credit' ? 'Credit' : 'Debit'} of ${formatCurrency(input.amount)} — ${txn.description} (Ref: ${txn.jhbTransactionId})`,
    createdAt: new Date().toISOString(),
  })

  saveBankingData(data)
  return { ok: true }
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
