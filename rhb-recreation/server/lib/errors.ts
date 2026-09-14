export class AppError extends Error {
  status: number
  code: string

  constructor(status: number, code: string, message: string) {
    super(message)
    this.status = status
    this.code = code
  }
}

export function unauthorized(message = 'Authentication required.') {
  return new AppError(401, 'UNAUTHORIZED', message)
}

export function forbidden(message = 'Access denied.') {
  return new AppError(403, 'FORBIDDEN', message)
}

export function badRequest(message = 'Invalid request.') {
  return new AppError(400, 'BAD_REQUEST', message)
}

export function tooManyRequests(message = 'Too many requests.') {
  return new AppError(429, 'RATE_LIMITED', message)
}

export function notFound(message = 'Resource not found.') {
  return new AppError(404, 'NOT_FOUND', message)
}

export function internalError() {
  return new AppError(500, 'INTERNAL_ERROR', 'Internal server error.')
}
