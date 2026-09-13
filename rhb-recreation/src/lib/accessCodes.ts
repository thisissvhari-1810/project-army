export const SITE_ACCESS_PIN = '1810'
export const BALANCE_VIEW_PIN = '1810'

export const SITE_ACCESS_KEY = 'rhb-site-access-unlocked'
export const BALANCE_VISIBLE_UNTIL_KEY = 'rhb-balance-visible-until'

export function isBalanceVisibleNow() {
  const until = sessionStorage.getItem(BALANCE_VISIBLE_UNTIL_KEY)
  if (!until) return false
  return Date.now() < Number(until)
}

export function setBalanceVisibleFor(ms: number) {
  sessionStorage.setItem(BALANCE_VISIBLE_UNTIL_KEY, String(Date.now() + ms))
}

export function clearBalanceVisibility() {
  sessionStorage.removeItem(BALANCE_VISIBLE_UNTIL_KEY)
}
