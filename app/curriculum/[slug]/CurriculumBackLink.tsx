'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

const webDevelopmentSlugs = ['java-full-stack', 'mean-stack', 'mern-stack', 'nextjs']

function BackLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
    >
      <ArrowLeft size={14} /> All Courses
    </Link>
  )
}

function WebDevelopmentReturnLink() {
  const searchParams = useSearchParams()
  const origins = searchParams.getAll('from')
  const fromWebDevelopment = origins.length === 1 && origins[0] === 'web-development'

  return <BackLink href={fromWebDevelopment ? '/training-services/web-development' : '/training-services'} />
}

export default function CurriculumBackLink({ slug }: { slug: string }) {
  const fallback = <BackLink href="/training-services" />

  if (!webDevelopmentSlugs.includes(slug)) return fallback

  // Resolve only this allowlisted origin in the browser, keeping static exports
  // and the default destination for all other course journeys unchanged.
  return (
    <Suspense fallback={fallback}>
      <WebDevelopmentReturnLink />
    </Suspense>
  )
}
