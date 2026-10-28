/**
 * Client-side, tab-scoped campaign attribution for XpertsEdge lead forms.
 * A UTM-bearing URL starts/replaces the stored campaign; ordinary internal
 * navigation keeps it. Never persist arbitrary query parameters or tokens.
 */
export type LeadAttribution = {
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
  landing_page: string
  referrer_url: string
}

const STORAGE_KEY = 'xpertsedge:campaign-attribution:v1'
const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const

function sanitizedReferrer(): string {
  try {
    if (!document.referrer) return ''
    const referrer = new URL(document.referrer)
    return referrer.protocol === 'https:' || referrer.protocol === 'http:'
      ? `${referrer.origin}${referrer.pathname}`.slice(0, 400)
      : ''
  } catch {
    return ''
  }
}

function currentAttribution(url: URL): LeadAttribution {
  const utm = (key: (typeof UTM_KEYS)[number]) =>
    (url.searchParams.get(key) || '').slice(0, 150)
  return {
    utm_source: utm('utm_source'),
    utm_medium: utm('utm_medium'),
    utm_campaign: utm('utm_campaign'),
    utm_content: utm('utm_content'),
    utm_term: utm('utm_term'),
    landing_page: `${url.origin}${url.pathname}`.slice(0, 400),
    referrer_url: sanitizedReferrer(),
  }
}

function hasCampaignParameters(url: URL): boolean {
  return UTM_KEYS.some((key) => url.searchParams.has(key))
}

function getStoredAttribution(): LeadAttribution | null {
  try {
    const saved = window.sessionStorage.getItem(STORAGE_KEY)
    if (!saved) return null
    const parsed: unknown = JSON.parse(saved)
    if (!parsed || typeof parsed !== 'object') return null
    const value = parsed as Record<string, unknown>
    const keys = [...UTM_KEYS, 'landing_page', 'referrer_url']
    if (!keys.every((key) => typeof value[key] === 'string')) return null
    return {
      utm_source: (value.utm_source as string).slice(0, 150),
      utm_medium: (value.utm_medium as string).slice(0, 150),
      utm_campaign: (value.utm_campaign as string).slice(0, 150),
      utm_content: (value.utm_content as string).slice(0, 150),
      utm_term: (value.utm_term as string).slice(0, 150),
      landing_page: (value.landing_page as string).slice(0, 400),
      referrer_url: (value.referrer_url as string).slice(0, 400),
    }
  } catch {
    // Browser privacy/storage restrictions must never break form submission.
    return null
  }
}

/** Capture a campaign when a UTM-bearing page is visited (including Home). */
export function rememberCampaignFromUrl(): void {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  if (!hasCampaignParameters(url)) return
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(currentAttribution(url)))
  } catch {
    // Continue without persistence if sessionStorage is unavailable.
  }
}

/** Return the active campaign when forms submit, even after client navigation. */
export function getLeadAttribution(): LeadAttribution {
  const currentUrl = new URL(window.location.href)
  const current = currentAttribution(currentUrl)
  if (hasCampaignParameters(currentUrl)) {
    // A new campaign replaces ALL old fields, including missing UTM keys.
    rememberCampaignFromUrl()
    return current
  }
  return getStoredAttribution() || current
}
