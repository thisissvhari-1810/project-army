import { neon } from '@neondatabase/serverless'

let sqlClient: ReturnType<typeof neon> | null = null

export function getDatabaseUrl() {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error('DATABASE_URL is not configured')
  }
  return url
}

export function getSql() {
  if (!sqlClient) {
    sqlClient = neon(getDatabaseUrl())
  }
  return sqlClient
}

export type SqlClient = ReturnType<typeof getSql>
