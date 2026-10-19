import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join XpertsEdge Technologies — explore current openings for trainers, engineers and support roles in Chennai.',
  alternates: { canonical: '/careers' },
  openGraph: {
    title: 'Careers | XpertsEdge Technologies',
    description: 'Join XpertsEdge Technologies — explore current openings for trainers, engineers and support roles in Chennai.',
    url: 'https://www.xpertsedgetech.com/careers',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
