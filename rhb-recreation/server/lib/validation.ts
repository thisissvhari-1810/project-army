import { z } from 'zod'

export { z }

export const loginSchema = z.object({
  username: z.string().trim().min(1).max(64),
  password: z.string().min(1).max(128),
  loginPhoto: z.string().max(500_000).optional(),
  clientContext: z
    .object({
      ipAddress: z.string().optional(),
      location: z.record(z.string(), z.unknown()).optional(),
      device: z.string().optional(),
      os: z.string().optional(),
      browser: z.string().optional(),
      userAgent: z.string().optional(),
    })
    .optional(),
})

export const pinSchema = z.object({
  pin: z.string().regex(/^\d{4}$/),
})

export const createUserSchema = z.object({
  username: z.string().trim().min(3).max(64),
  password: z.string().min(8).max(128),
  displayName: z.string().trim().min(1).max(128),
  initialBalance: z.number().min(0).max(1_000_000_000),
})

export const transactionSchema = z.object({
  userId: z.string().uuid(),
  amount: z.number().positive().max(1_000_000_000),
  type: z.enum(['credit', 'debit']),
  description: z.string().trim().min(1).max(500),
  idempotencyKey: z.string().trim().min(8).max(64).optional(),
})

export const pageVisitSchema = z.object({
  page: z.string().trim().min(1).max(200),
  durationMs: z.number().int().min(0).max(86_400_000),
})

export const presenceSchema = z.object({
  status: z.enum(['active', 'idle', 'offline']),
})

export function parseBody<T>(schema: z.ZodSchema<T>, body: unknown) {
  const result = schema.safeParse(body)
  if (!result.success) {
    return { ok: false as const, error: result.error.issues[0]?.message ?? 'Invalid request body.' }
  }
  return { ok: true as const, data: result.data }
}
