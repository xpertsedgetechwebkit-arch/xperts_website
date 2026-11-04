import type { Metadata } from 'next'
import { StudentReviewsPageContent } from '@/components/StudentReviewsShowcase'

export const metadata: Metadata = {
  title: 'Student Reviews & Career Milestones | XpertsEdge Technologies',
  description: 'Explore XpertsEdge student video reviews and career milestones. Demo previews will be replaced by approved student stories and offer letters.',
  alternates: { canonical: 'https://www.xpertsedgetech.com/student-reviews/' },
  robots: { index: false, follow: true }, // Enable indexing after genuine videos and offer letters are published.
}

export default function StudentReviewsPage() {
  return <StudentReviewsPageContent />
}
