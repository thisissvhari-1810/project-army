import { getSql } from '../db/client.js'
import { generateJhbTransactionId } from '../lib/crypto.js'
import { badRequest } from '../lib/errors.js'

export type PublicTransaction = {
  id: string
  jhbTransactionId: string
  userId: string
  username: string
  type: 'credit' | 'debit'
  amount: number
  description: string
  balanceAfter: number
  performedBy: string
  createdAt: string
}

function mapTransaction(row: Record<string, unknown>): PublicTransaction {
  return {
    id: String(row.id),
    jhbTransactionId: String(row.jhb_transaction_id),
    userId: String(row.user_id),
    username: String(row.username),
    type: row.type as 'credit' | 'debit',
    amount: Number(row.amount),
    description: String(row.description),
    balanceAfter: Number(row.balance_after),
    performedBy: String(row.performed_by_username ?? 'system'),
    createdAt: new Date(String(row.created_at)).toISOString(),
  }
}

export async function listTransactionsForUser(userId: string) {
  const sql = getSql()
  const rows = await sql`
    SELECT t.*, u.username, p.username AS performed_by_username
    FROM transactions t
    JOIN users u ON u.id = t.user_id
    LEFT JOIN users p ON p.id = t.performed_by
    WHERE t.user_id = ${userId}
    ORDER BY t.created_at DESC
  `
  return rows.map((row) => mapTransaction(row as Record<string, unknown>))
}

export async function listAllTransactions() {
  const sql = getSql()
  const rows = await sql`
    SELECT t.*, u.username, p.username AS performed_by_username
    FROM transactions t
    JOIN users u ON u.id = t.user_id
    LEFT JOIN users p ON p.id = t.performed_by
    ORDER BY t.created_at DESC
  `
  return rows.map((row) => mapTransaction(row as Record<string, unknown>))
}

export async function postTransaction(input: {
  userId: string
  amount: number
  type: 'credit' | 'debit'
  description: string
  performedByUserId: string
  idempotencyKey?: string
}) {
  const sql = getSql()

  if (input.idempotencyKey) {
    const existing = await sql`
      SELECT t.*, u.username, p.username AS performed_by_username
      FROM transactions t
      JOIN users u ON u.id = t.user_id
      LEFT JOIN users p ON p.id = t.performed_by
      WHERE t.idempotency_key = ${input.idempotencyKey}
      LIMIT 1
    `
    if (existing[0]) {
      return mapTransaction(existing[0] as Record<string, unknown>)
    }
  }

  const accountRows = await sql`
    SELECT a.id, a.balance, u.username
    FROM accounts a
    JOIN users u ON u.id = a.user_id
    WHERE a.user_id = ${input.userId} AND u.is_active = TRUE
    LIMIT 1
  `
  const account = accountRows[0] as { id: string; balance: string; username: string } | undefined
  if (!account) throw badRequest('Account not found.')

  const currentBalance = Number(account.balance)
  const nextBalance =
    input.type === 'credit' ? currentBalance + input.amount : currentBalance - input.amount

  if (nextBalance < 0) {
    throw badRequest('Insufficient balance for debit.')
  }

  const jhbId = generateJhbTransactionId()

  const txnRows = await sql`
    WITH updated AS (
      UPDATE accounts
      SET balance = ${nextBalance}, updated_at = NOW()
      WHERE id = ${account.id} AND balance = ${currentBalance}
      RETURNING id, balance
    )
    INSERT INTO transactions (
      jhb_transaction_id, account_id, user_id, type, amount, description, balance_after, performed_by, idempotency_key
    )
    SELECT
      ${jhbId},
      ${account.id},
      ${input.userId},
      ${input.type},
      ${input.amount},
      ${input.description},
      updated.balance,
      ${input.performedByUserId},
      ${input.idempotencyKey ?? null}
    FROM updated
    RETURNING *
  `

  if (!txnRows[0]) {
    throw badRequest('Concurrent update detected. Please retry.')
  }

  const txn = txnRows[0] as Record<string, unknown>

  await sql`
    INSERT INTO ledger_entries (
      transaction_id, account_id, entry_type, amount, balance_before, balance_after
    ) VALUES (
      ${String(txn.id)},
      ${account.id},
      ${input.type},
      ${input.amount},
      ${currentBalance},
      ${nextBalance}
    )
  `

  const performerRows = await sql`
    SELECT username FROM users WHERE id = ${input.performedByUserId} LIMIT 1
  `
  const performerUsername = (performerRows[0] as { username: string } | undefined)?.username ?? 'system'

  return mapTransaction({
    ...txn,
    username: account.username,
    performed_by_username: performerUsername,
  })
}
