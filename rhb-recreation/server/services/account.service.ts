import { getSql } from '../db/client.js'

export type PublicAccount = {
  id: string
  username: string
  displayName: string
  role: 'admin' | 'user'
  accountNumber: string
  balance: number
  createdAt: string
}

function mapUser(row: Record<string, unknown>): PublicAccount {
  return {
    id: String(row.id),
    username: String(row.username),
    displayName: String(row.display_name),
    role: row.role as 'admin' | 'user',
    accountNumber: String(row.account_number),
    balance: Number(row.balance),
    createdAt: new Date(String(row.created_at)).toISOString(),
  }
}

export async function getAccountByUserId(userId: string) {
  const sql = getSql()
  const rows = await sql`
    SELECT u.id, u.username, u.display_name, u.role, u.account_number, u.created_at, a.balance
    FROM users u
    JOIN accounts a ON a.user_id = u.id
    WHERE u.id = ${userId} AND u.is_active = TRUE
    LIMIT 1
  `
  const row = rows[0]
  return row ? mapUser(row as Record<string, unknown>) : null
}

export async function listCustomerAccounts() {
  const sql = getSql()
  const rows = await sql`
    SELECT u.id, u.username, u.display_name, u.role, u.account_number, u.created_at, a.balance
    FROM users u
    JOIN accounts a ON a.user_id = u.id
    WHERE u.role = 'user' AND u.is_active = TRUE
    ORDER BY u.created_at DESC
  `
  return rows.map((row) => mapUser(row as Record<string, unknown>))
}
