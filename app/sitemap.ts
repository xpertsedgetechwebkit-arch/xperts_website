import type { MetadataRoute } from 'next'
import { curriculumSlugs } from '@/lib/curriculum'

const siteUrl = 'https://www.xpertsedgetech.com'

const routes: Array<{ path: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' }> = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/training-services', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/courses', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/it-services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/certifications', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/demo', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/careers', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/events', priority: 0.6, changeFrequency: 'weekly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticRoutes = routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const curriculumRoutes = curriculumSlugs.map((slug) => ({
    url: `${siteUrl}/curriculum/${slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [...staticRoutes, ...curriculumRoutes]
}
