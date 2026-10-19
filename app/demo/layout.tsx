import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register for a Free Demo',
  description: 'Book a free demo class with XpertsEdge Technologies and explore our software testing and full stack training programs.',
  alternates: { canonical: '/demo' },
  openGraph: {
    title: 'Register for a Free Demo | XpertsEdge Technologies',
    description: 'Book a free demo class with XpertsEdge Technologies and explore our software testing and full stack training programs.',
    url: 'https://www.xpertsedgetech.com/demo',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
