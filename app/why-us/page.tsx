import type { Metadata } from 'next'
import WhyChooseUs from '@/components/WhyChooseUs'

export const metadata: Metadata = {
  title: 'Why Choose Us',
  description:
    'Discover why XpertsEdge Technologies stands out with industry-oriented training, practical learning, expert trainers, and career-focused support.',
  alternates: {
    canonical: '/why-us/',
  },
}

export default function WhyUsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden pt-20">
      <WhyChooseUs />
    </main>
  )
}
