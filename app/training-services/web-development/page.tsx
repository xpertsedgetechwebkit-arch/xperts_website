import type { Metadata } from 'next'
import WebDevelopmentLanding from './WebDevelopmentLanding'
import './web-development.css'

export const metadata: Metadata = {
  title: 'Web Development Courses in Chennai — Java, MEAN, MERN & Next.js',
  description:
    'Explore Java Full Stack, MEAN Stack, MERN Stack and Next.js training at XpertsEdge Technologies, Anna Nagar, Chennai. Practical projects, interview preparation and career guidance.',
  alternates: { canonical: '/training-services/web-development' },
  openGraph: {
    title: 'Web Development Courses in Chennai | XpertsEdge Technologies',
    description: 'Practical web development training in Java Full Stack, MEAN, MERN and Next.js at XpertsEdge Technologies.',
    url: 'https://www.xpertsedgetech.com/training-services/web-development',
    type: 'website',
  },
}

export default function WebDevelopmentPage() {
  return <WebDevelopmentLanding />
}
