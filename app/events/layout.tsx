import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Events & Gallery',
  description: 'Workshops, seminars, placement drives and campus events hosted by XpertsEdge Technologies.',
  alternates: { canonical: '/events' },
  openGraph: {
    title: 'Events & Gallery | XpertsEdge Technologies',
    description: 'Workshops, seminars, placement drives and campus events hosted by XpertsEdge Technologies.',
    url: 'https://www.xpertsedgetech.com/events',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
