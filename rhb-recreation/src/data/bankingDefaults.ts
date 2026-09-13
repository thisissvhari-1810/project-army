import type { BankingData } from '../types/banking'

const now = new Date()
const daysAgo = (days: number) => new Date(now.getTime() - days * 86400000).toISOString()

export const defaultBankingData: BankingData = {
  users: [
    {
      id: 'usr-admin',
      username: 'admin',
      password: 'admin123',
      displayName: 'Premier Administrator',
      role: 'admin',
      balance: 0,
      accountNumber: '8010000001',
      createdAt: daysAgo(90),
    },
    {
      id: 'usr-user',
      username: 'govind',
      password: 'govind123',
      displayName: 'Govind',
      role: 'user',
      balance: 0,
      accountNumber: '8012345678',
      createdAt: daysAgo(120),
    },
  ],
  transactions: [],
  activities: [],
}
