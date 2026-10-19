'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Scrolls an in-page anchor (e.g. arriving at "/#courses" from another route)
 * into view — and keeps it aligned while the page finishes loading.
 *
 * The first click "did nothing" because Next.js scrolls to the hash before
 * below-the-fold images (About/Services) have loaded; once they load they push
 * the target down, leaving the viewport above it. We re-align for a short
 * window as the layout settles, and stop the moment the user scrolls manually.
 */
export default function HashScroll() {
  const pathname = usePathname()

  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return

    const target = () => document.querySelector(hash) as HTMLElement | null

    let cancelled = false
    let userScrolled = false

    // Only treat *user-initiated* input as a reason to stop re-aligning.
    const onUserScroll = () => {
      userScrolled = true
    }
    window.addEventListener('wheel', onUserScroll, { passive: true })
    window.addEventListener('touchmove', onUserScroll, { passive: true })
    window.addEventListener('keydown', onUserScroll)

    const align = (smooth: boolean) => {
      if (cancelled || userScrolled) return
      const el = target()
      if (el) el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
    }

    // Re-align a handful of times over ~1.6s to absorb image/video reflow.
    const timers = [80, 250, 500, 900, 1300, 1600].map((t, i) =>
      setTimeout(() => align(i === 0), t)
    )

    // Also re-align when late assets finish loading.
    const onLoad = () => align(false)
    window.addEventListener('load', onLoad)

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
      window.removeEventListener('wheel', onUserScroll)
      window.removeEventListener('touchmove', onUserScroll)
      window.removeEventListener('keydown', onUserScroll)
      window.removeEventListener('load', onLoad)
    }
  }, [pathname])

  return null
}
