import { getSql } from '../db/client.js'
import { generateAccountNumber } from '../lib/crypto.js'
import { badRequest } from '../lib/errors.js'
import { hashPassword, validatePasswordStrength } from '../lib/password.js'
import { postTransaction } from './transaction.service.js'

export async function createCustomerUser(input: {
  username: string
  password: string
  displayName: string
  initialBalance: number
  performedByUserId: string
}) {
  const passwordError = validatePasswordStrength(input.password)
  if (passwordError) throw badRequest(passwordError)

  const sql = getSql()
  const existing = await sql`
    SELECT id FROM users WHERE LOWER(username) = LOWER(${input.username}) LIMIT 1
  `
  if (existing.length > 0) throw badRequest('Username already exists.')

  const passwordHash = await hashPassword(input.password)
  const accountNumber = generateAccountNumber()

  const userRows = await sql`
    INSERT INTO users (username, password_hash, display_name, role, account_number)
    VALUES (${input.username}, ${passwordHash}, ${input.displayName}, 'user', ${accountNumber})
    RETURNING id, username, display_name, role, account_number, created_at
  `
  const user = userRows[0] as {
    id: string
    username: string
    display_name: string
    role: 'user'
    account_number: string
    created_at: string
  }

  await sql`
    INSERT INTO accounts (user_id, balance) VALUES (${user.id}, 0)
  `

  if (input.initialBalance > 0) {
    await postTransaction({
      userId: user.id,
      amount: input.initialBalance,
      type: 'credit',
      description: 'Opening balance',
      performedByUserId: input.performedByUserId,
    })
  }

  const account = await sql`
    SELECT balance FROM accounts WHERE user_id = ${user.id} LIMIT 1
  `

  return {
    id: user.id,
    username: user.username,
    displayName: user.display_name,
    role: user.role,
    accountNumber: user.account_number,
    balance: Number((account[0] as { balance: string }).balance),
    createdAt: new Date(user.created_at).toISOString(),
  }
}
