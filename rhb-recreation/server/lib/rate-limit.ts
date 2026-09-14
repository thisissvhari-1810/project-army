import { getSql } from '../db/client.js'

type RateLimitOptions = {
  key: string
  limit: number
  windowMs: number
  blockMs?: number
}

export async function consumeRateLimit(options: RateLimitOptions) {
  const sql = getSql()
  const now = new Date()
  const windowStart = new Date(now.getTime() - options.windowMs)
  const blockUntil = options.blockMs ? new Date(now.getTime() + options.blockMs) : null

  const rows = await sql`
    INSERT INTO rate_limit_buckets (bucket_key, attempt_count, window_started_at, blocked_until)
    VALUES (${options.key}, 1, ${now.toISOString()}, ${blockUntil?.toISOString() ?? null})
    ON CONFLICT (bucket_key) DO UPDATE SET
      attempt_count = CASE
        WHEN rate_limit_buckets.blocked_until IS NOT NULL AND rate_limit_buckets.blocked_until > ${now.toISOString()} THEN rate_limit_buckets.attempt_count
        WHEN rate_limit_buckets.window_started_at < ${windowStart.toISOString()} THEN 1
        ELSE rate_limit_buckets.attempt_count + 1
      END,
      window_started_at = CASE
        WHEN rate_limit_buckets.blocked_until IS NOT NULL AND rate_limit_buckets.blocked_until > ${now.toISOString()} THEN rate_limit_buckets.window_started_at
        WHEN rate_limit_buckets.window_started_at < ${windowStart.toISOString()} THEN ${now.toISOString()}
        ELSE rate_limit_buckets.window_started_at
      END,
      blocked_until = CASE
        WHEN rate_limit_buckets.blocked_until IS NOT NULL AND rate_limit_buckets.blocked_until > ${now.toISOString()} THEN rate_limit_buckets.blocked_until
        WHEN (
          CASE
            WHEN rate_limit_buckets.window_started_at < ${windowStart.toISOString()} THEN 1
            ELSE rate_limit_buckets.attempt_count + 1
          END
        ) >= ${options.limit} THEN ${blockUntil?.toISOString() ?? null}
        ELSE NULL
      END
    RETURNING attempt_count, blocked_until, window_started_at
  `

  const row = rows[0] as { attempt_count: number; blocked_until: string | null }
  if (row.blocked_until && new Date(row.blocked_until) > now) {
    return { allowed: false, retryAfterMs: new Date(row.blocked_until).getTime() - now.getTime() }
  }

  if (row.attempt_count > options.limit) {
    return { allowed: false, retryAfterMs: options.blockMs ?? options.windowMs }
  }

  return { allowed: true, retryAfterMs: 0 }
}
