import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Training Services',
  description: 'Job-oriented IT training in Chennai — Java Full Stack, MERN, MEAN, Next.js, Manual Testing, Selenium, Playwright, API Testing, AWS, Azure, DevOps and DSA with placement support.',
  alternates: { canonical: '/training-services' },
  openGraph: {
    title: 'Training Services | XpertsEdge Technologies',
    description: 'Job-oriented IT training in Chennai — Java Full Stack, MERN, MEAN, Next.js, Manual Testing, Selenium, Playwright, API Testing, AWS, Azure, DevOps and DSA with placement support.',
    url: 'https://www.xpertsedgetech.com/training-services',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
