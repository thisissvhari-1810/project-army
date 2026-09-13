import { Redis } from '@upstash/redis'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const BANKING_KEY = 'rhb-premier-banking-v2'

type GlobalStore = typeof globalThis & {
  __rhbBankingStore?: Record<string, unknown> | null
}

const globalStore = globalThis as GlobalStore

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN

  if (!url || !token) return null

  return new Redis({ url, token })
}

async function readBanking(redis: Redis | null) {
  if (redis) {
    const data = await redis.get(BANKING_KEY)
    if (data) return data as Record<string, unknown>
  }

  return globalStore.__rhbBankingStore ?? null
}

async function writeBanking(redis: Redis | null, data: Record<string, unknown>) {
  globalStore.__rhbBankingStore = data
  if (redis) {
    await redis.set(BANKING_KEY, data)
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store')

  const redis = getRedis()

  try {
    if (req.method === 'GET') {
      const data = await readBanking(redis)
      return res.status(200).json(data)
    }

    if (req.method === 'PUT') {
      const data = {
        ...(req.body as Record<string, unknown>),
        updatedAt: new Date().toISOString(),
      }
      await writeBanking(redis, data)
      return res.status(200).json({ ok: true, updatedAt: data.updatedAt, persisted: Boolean(redis) })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch {
    return res.status(503).json({ error: 'Shared banking storage is unavailable.' })
  }
}
