'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { rememberCampaignFromUrl } from '@/lib/utmAttribution'

/** No UI; captures attribution on initial load and subsequent route changes. */
export default function UTMTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    rememberCampaignFromUrl()
  }, [pathname, searchParams])

  return null
}
