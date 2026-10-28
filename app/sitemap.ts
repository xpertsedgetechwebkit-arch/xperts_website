import type { MetadataRoute } from 'next'
import { curriculumSlugs } from '@/lib/curriculum'
import { getPublishedPosts } from '@/lib/wordpress'

//hari changes
export const dynamic = 'force-static'

const siteUrl = 'https://www.xpertsedgetech.com'

const routes: Array<{ path: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' }> = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/training-services', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/courses', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/blog', priority: 0.8, changeFrequency: 'daily' },
  { path: '/it-services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/certifications', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/demo', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/careers', priority: 0.7, changeFrequency: 'weekly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const posts = await getPublishedPosts()
  const blogRoutes = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}/`,
    lastModified: new Date(post.modifiedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...curriculumRoutes, ...blogRoutes]
}
