import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const siteUrl = 'https://www.xpertsedgetech.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
