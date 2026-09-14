import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Pool } from '@neondatabase/serverless'
import { getDatabaseUrl, getSql } from './client.js'
import { generateAccountNumber } from '../lib/crypto.js'
import { hashPassword } from '../lib/password.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

export async function runMigrations() {
  const pool = new Pool({ connectionString: getDatabaseUrl() })
  const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf8')
  await pool.query(schema)
  await pool.end()
}

export async function seedInitialUsers() {
  const sql = getSql()
  const existing = await sql`SELECT COUNT(*)::int AS count FROM users`
  if ((existing[0] as { count: number }).count > 0) return { seeded: false }

  const adminUsername = process.env.SEED_ADMIN_USERNAME ?? 'admin'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD
  const userUsername = process.env.SEED_USER_USERNAME ?? 'govind'
  const userPassword = process.env.SEED_USER_PASSWORD

  if (!adminPassword || !userPassword) {
    throw new Error('SEED_ADMIN_PASSWORD and SEED_USER_PASSWORD must be set for initial seeding.')
  }

  const adminHash = await hashPassword(adminPassword)
  const userHash = await hashPassword(userPassword)

  const adminRows = await sql`
    INSERT INTO users (username, password_hash, display_name, role, account_number)
    VALUES (${adminUsername}, ${adminHash}, 'Premier Administrator', 'admin', ${generateAccountNumber()})
    RETURNING id
  `
  await sql`INSERT INTO accounts (user_id, balance) VALUES (${(adminRows[0] as { id: string }).id}, 0)`

  const userRows = await sql`
    INSERT INTO users (username, password_hash, display_name, role, account_number)
    VALUES (${userUsername}, ${userHash}, 'Govind', 'user', ${generateAccountNumber()})
    RETURNING id
  `
  await sql`INSERT INTO accounts (user_id, balance) VALUES (${(userRows[0] as { id: string }).id}, 0)`

  return { seeded: true }
}
