import type { VercelRequest, VercelResponse } from '@vercel/node'
import { runMigrations, seedInitialUsers } from '../../server/db/migrate.js'
import { applySecurityHeaders } from '../../server/lib/security-headers.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  applySecurityHeaders(res)

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const secret = req.headers['x-migration-secret']
  if (!secret || secret !== process.env.MIGRATION_SECRET) {
    res.status(403).json({ error: 'Forbidden' })
    return
  }

  try {
    await runMigrations()
    const seed = await seedInitialUsers()
    res.status(200).json({ ok: true, seeded: seed.seeded })
  } catch (error) {
    console.error('[migrate-error]', error)
    res.status(500).json({ error: 'Migration failed' })
  }
}
