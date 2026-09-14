import bcrypt from 'bcryptjs'

const ROUNDS = 12

export async function hashPassword(password: string) {
  return bcrypt.hash(password, ROUNDS)
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash)
}

export function validatePasswordStrength(password: string) {
  if (password.length < 8) {
    return 'Password must be at least 8 characters.'
  }
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return 'Password must include letters and numbers.'
  }
  return null
}
