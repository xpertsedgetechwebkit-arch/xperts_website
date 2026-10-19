'use client'

import { useSearchParams } from 'next/navigation'
import Services from '@/components/Services'

/**
 * Reads ?category= from the live URL (reactive) so navigating between footer
 * program links updates the view. The key remounts Services when the category
 * changes so its internal state resets to the new category.
 */
export default function CoursesView() {
  const category = useSearchParams().get('category') ?? undefined
  return <Services key={category ?? 'all'} initialCategory={category} />
}
