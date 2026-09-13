import type { ClientContext, GeoLocation } from '../types/audit'

const NETWORK_CACHE_KEY = 'rhb-audit-network-v4'
const CLIENT_CONTEXT_KEY = 'rhb-audit-client-context'

function isIPv4(ip: string) {
  const parts = ip.split('.')
  if (parts.length !== 4) return false
  return parts.every((part) => {
    const value = Number(part)
    return Number.isInteger(value) && value >= 0 && value <= 255
  })
}

async function fetchWithTimeout(url: string, timeoutMs = 5000): Promise<Response> {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { signal: controller.signal })
  } finally {
    window.clearTimeout(timeout)
  }
}

async function fetchPublicIPv4(): Promise<string | null> {
  const providers = [
    async () => {
      const response = await fetchWithTimeout('https://api.ipify.org?format=json')
      if (!response.ok) return null
      const data = (await response.json()) as { ip?: string }
      return data.ip && isIPv4(data.ip) ? data.ip : null
    },
    async () => {
      const response = await fetchWithTimeout('https://checkipv4.digitalocean.com')
      if (!response.ok) return null
      const ip = (await response.text()).trim()
      return isIPv4(ip) ? ip : null
    },
    async () => {
      const response = await fetchWithTimeout('https://ipv4.icanhazip.com')
      if (!response.ok) return null
      const ip = (await response.text()).trim()
      return isIPv4(ip) ? ip : null
    },
  ]

  for (const provider of providers) {
    try {
      const ip = await provider()
      if (ip) return ip
    } catch {
      // Try next provider.
    }
  }

  return null
}

async function fetchLocationForIp(ip: string): Promise<GeoLocation | null> {
  try {
    const response = await fetchWithTimeout(`https://ipapi.co/${encodeURIComponent(ip)}/json/`)
    if (!response.ok) return null

    const data = (await response.json()) as {
      country_name?: string
      region?: string
      city?: string
      postal?: string
    }

    return {
      country: data.country_name ?? 'Unknown',
      state: data.region,
      city: data.city ?? 'Unknown',
      pincode: data.postal,
      source: 'ip',
    }
  } catch {
    return null
  }
}

function parseUserAgent(ua: string) {
  let os = 'Unknown OS'
  let browser = 'Unknown Browser'
  let device = 'Desktop'

  if (/iPhone|iPad|iPod/i.test(ua)) {
    device = 'Mobile'
    os = /iPad/i.test(ua) ? 'iPadOS' : 'iOS'
  } else if (/Android/i.test(ua)) {
    device = 'Mobile'
    os = 'Android'
  } else if (/Windows NT 10/i.test(ua)) os = 'Windows 10/11'
  else if (/Windows/i.test(ua)) os = 'Windows'
  else if (/Mac OS X/i.test(ua)) os = 'macOS'
  else if (/Linux/i.test(ua)) os = 'Linux'

  if (/Edg\//i.test(ua)) browser = 'Microsoft Edge'
  else if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua)) browser = 'Google Chrome'
  else if (/Firefox\//i.test(ua)) browser = 'Mozilla Firefox'
  else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) browser = 'Safari'

  return { os, browser, device }
}

function fallbackLocation(): GeoLocation {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
  if (tz.includes('Kolkata') || tz.includes('Calcutta') || tz.includes('Chennai')) {
    return { country: 'India', state: 'Tamil Nadu', city: 'Chennai', source: 'ip' }
  }
  if (tz.includes('Kuala_Lumpur') || tz.includes('Singapore')) {
    return { country: 'Malaysia', state: 'Selangor', city: 'Kuala Lumpur', source: 'ip' }
  }
  return { country: 'Unknown', city: 'Unknown', source: 'ip' }
}

async function reverseGeocode(lat: number, lon: number): Promise<GeoLocation | null> {
  try {
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 6000)
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'en',
      },
    })
    window.clearTimeout(timeout)
    if (!response.ok) return null

    const data = (await response.json()) as {
      address?: {
        city?: string
        town?: string
        village?: string
        county?: string
        state?: string
        country?: string
        postcode?: string
      }
    }

    const addr = data.address
    if (!addr) return null

    return {
      city: addr.city ?? addr.town ?? addr.village ?? addr.county ?? 'Unknown',
      state: addr.state,
      country: addr.country ?? 'Unknown',
      pincode: addr.postcode,
      source: 'device',
    }
  } catch {
    return null
  }
}

export function getDeviceLocation(): Promise<GeoLocation | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        void reverseGeocode(position.coords.latitude, position.coords.longitude).then(resolve)
      },
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    )
  })
}

async function getIpNetworkInfo(): Promise<{ ipAddress: string; location: GeoLocation }> {
  const ipv4 = await fetchPublicIPv4()
  if (ipv4) {
    const location = (await fetchLocationForIp(ipv4)) ?? fallbackLocation()
    return { ipAddress: ipv4, location }
  }

  return { ipAddress: 'Unavailable', location: fallbackLocation() }
}

export async function getClientNetworkInfo(): Promise<{ ipAddress: string; location: GeoLocation }> {
  const cached = sessionStorage.getItem(NETWORK_CACHE_KEY)
  if (cached) {
    try {
      return JSON.parse(cached) as { ipAddress: string; location: GeoLocation }
    } catch {
      sessionStorage.removeItem(NETWORK_CACHE_KEY)
    }
  }

  const info = await getIpNetworkInfo()
  sessionStorage.setItem(NETWORK_CACHE_KEY, JSON.stringify(info))
  return info
}

type ClientContextOptions = {
  requestDeviceLocation?: boolean
  forceRefresh?: boolean
}

export async function getClientContext(options: ClientContextOptions = {}): Promise<ClientContext> {
  const shouldRefresh = options.forceRefresh || options.requestDeviceLocation

  if (shouldRefresh) {
    clearClientContextCache()
  } else {
    const stored = sessionStorage.getItem(CLIENT_CONTEXT_KEY)
    if (stored) {
      try {
        return JSON.parse(stored) as ClientContext
      } catch {
        sessionStorage.removeItem(CLIENT_CONTEXT_KEY)
      }
    }
  }

  const ua = navigator.userAgent
  const { os, browser, device } = parseUserAgent(ua)
  const ipInfo = await getIpNetworkInfo()

  let location = ipInfo.location
  if (options.requestDeviceLocation) {
    const deviceLocation = await getDeviceLocation()
    if (deviceLocation) {
      location = deviceLocation
    }
  }

  const context: ClientContext = {
    ipAddress: ipInfo.ipAddress,
    location,
    device,
    os,
    browser,
    userAgent: ua,
  }

  const { loginPhoto: _loginPhoto, ...cacheableContext } = context
  sessionStorage.setItem(CLIENT_CONTEXT_KEY, JSON.stringify(cacheableContext))
  sessionStorage.setItem(NETWORK_CACHE_KEY, JSON.stringify({ ipAddress: ipInfo.ipAddress, location }))
  return context
}

export function clearClientContextCache() {
  sessionStorage.removeItem(CLIENT_CONTEXT_KEY)
  sessionStorage.removeItem(NETWORK_CACHE_KEY)
}

export function getLoginClientContext(): Promise<ClientContext> {
  return getClientContext({ requestDeviceLocation: true, forceRefresh: true })
}

export function formatLocation(location: GeoLocation) {
  const parts = [location.city, location.state, location.country].filter(Boolean)
  const base = parts.join(', ')
  const pin = location.pincode ? ` — PIN ${location.pincode}` : ''
  return `${base}${pin}`
}

export function formatLocationSource(location: GeoLocation) {
  if (location.source === 'device') return 'Device GPS'
  if (location.source === 'ip') return 'IP approximate'
  return 'Unknown'
}

export function formatDuration(ms: number) {
  if (ms < 1000) return `${ms}ms`
  const seconds = Math.floor(ms / 1000)
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.floor(seconds / 60)
  const remSeconds = seconds % 60
  if (minutes < 60) return remSeconds ? `${minutes}m ${remSeconds}s` : `${minutes}m`
  const hours = Math.floor(minutes / 60)
  const remMinutes = minutes % 60
  return remMinutes ? `${hours}h ${remMinutes}m` : `${hours}h`
}
