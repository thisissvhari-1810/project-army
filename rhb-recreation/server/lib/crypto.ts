import { createHash, randomBytes, randomUUID } from 'node:crypto'

export function createToken() {
  return randomBytes(32).toString('base64url')
}

export function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex')
}

export function createRequestId() {
  return randomUUID()
}

export function generateAccountNumber() {
  return `80${Math.floor(10000000 + Math.random() * 90000000)}`
}

export function generateJhbTransactionId() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const suffix = Math.floor(10000000 + Math.random() * 90000000).toString()
  return `JHB${date}${suffix}`
}
