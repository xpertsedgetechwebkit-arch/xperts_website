import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Certifications',
  description: 'Industry-recognised certification tracks and preparation guidance from XpertsEdge Technologies, Chennai.',
  alternates: { canonical: '/certifications' },
  openGraph: {
    title: 'Certifications | XpertsEdge Technologies',
    description: 'Industry-recognised certification tracks and preparation guidance from XpertsEdge Technologies, Chennai.',
    url: 'https://www.xpertsedgetech.com/certifications',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
