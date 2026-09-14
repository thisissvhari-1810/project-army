let csrfToken: string | null = null

async function ensureCsrfToken() {
  if (csrfToken) return csrfToken
  const response = await fetch('/api/auth/csrf', { credentials: 'include' })
  if (!response.ok) throw new Error('Unable to initialize secure session.')
  const data = (await response.json()) as { csrfToken: string }
  csrfToken = data.csrfToken
  return csrfToken
}

export class ApiError extends Error {
  status: number
  code?: string
  requestId?: string

  constructor(status: number, message: string, code?: string, requestId?: string) {
    super(message)
    this.status = status
    this.code = code
    this.requestId = requestId
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit & { json?: unknown } = {},
): Promise<T> {
  const method = (options.method ?? 'GET').toUpperCase()
  const headers = new Headers(options.headers)

  if (options.json !== undefined) {
    headers.set('Content-Type', 'application/json')
  }

  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    headers.set('X-CSRF-Token', await ensureCsrfToken())
  }

  const response = await fetch(path, {
    ...options,
    method,
    headers,
    credentials: 'include',
    body: options.json !== undefined ? JSON.stringify(options.json) : options.body,
  })

  const data = (await response.json().catch(() => ({}))) as {
    error?: string
    code?: string
    requestId?: string
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data.error ?? 'Request failed.',
      data.code,
      data.requestId,
    )
  }

  return data as T
}

export function resetCsrfToken() {
  csrfToken = null
}
