import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact XpertsEdge Technologies, Anna Nagar Chennai — call +91 8870783300 or email info@xpertsedgetech.com.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Us | XpertsEdge Technologies',
    description: 'Contact XpertsEdge Technologies, Anna Nagar Chennai — call +91 8870783300 or email info@xpertsedgetech.com.',
    url: 'https://www.xpertsedgetech.com/contact',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
