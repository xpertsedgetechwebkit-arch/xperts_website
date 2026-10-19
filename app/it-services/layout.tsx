import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IT Services',
  description: 'Corporate training programs, technology consulting, real-time project training and placement readiness services from XpertsEdge Technologies.',
  alternates: { canonical: '/it-services' },
  openGraph: {
    title: 'IT Services | XpertsEdge Technologies',
    description: 'Corporate training programs, technology consulting, real-time project training and placement readiness services from XpertsEdge Technologies.',
    url: 'https://www.xpertsedgetech.com/it-services',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
