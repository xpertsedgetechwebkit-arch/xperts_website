import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays, Tag } from 'lucide-react'
import { getPublishedPost, getPublishedPosts } from '@/lib/wordpress'
import './article.css'

const SITE_URL = 'https://www.xpertsedgetech.com'
type Props = { params: Promise<{ slug: string }> }

// Required for the project's output: 'export': only published slugs become HTML files.
export const dynamicParams = false

export async function generateStaticParams() {
  const posts = await getPublishedPosts()
  // With static export, Next.js 16 can misreport an empty result as a missing
  // generateStaticParams function. Generate one unlinked 404 route only when
  // the CMS has no published articles. Actual articles are never fabricated.
  if (posts.length === 0) return [{ slug: '__cms-empty__' }]
  return posts.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPublishedPost(slug)
  if (!post) return { title: 'Article not found', robots: { index: false } }
  const url = `${SITE_URL}/blog/${post.slug}/`
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.modifiedAt,
      images: post.featuredImage ? [{ url: post.featuredImage, alt: post.title }] : [],
      siteName: 'XpertsEdge Technologies',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPublishedPost(slug)
  if (!post) notFound()
  const canonical = `${SITE_URL}/blog/${post.slug}/`
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.modifiedAt,
    mainEntityOfPage: canonical,
    ...(post.featuredImage ? { image: post.featuredImage } : {}),
    publisher: { '@type': 'Organization', name: 'XpertsEdge Technologies', url: SITE_URL },
  }

  return (
    <main className="min-h-screen bg-background px-4 pb-20 pt-32 text-foreground sm:px-6 sm:pt-36 lg:px-8 lg:pt-44">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <article className="mx-auto max-w-3xl">
        <Link href="/blog/" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary">
          <ArrowLeft aria-hidden="true" size={17} /> Back to Blog
        </Link>
        <div className="mb-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{post.category}</span>
          {post.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-card px-3 py-1 text-xs text-foreground/65"><Tag aria-hidden="true" size={11} />{tag}</span>
          ))}
        </div>
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl">{post.title}</h1>
        <p className="mt-5 text-lg leading-8 text-foreground/65">{post.excerpt}</p>
        <p className="mt-5 inline-flex items-center gap-2 text-xs text-foreground/50"><CalendarDays aria-hidden="true" size={15} />Published {new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' })}</p>
        {post.featuredImage && (
          <div className="mt-9 overflow-hidden rounded-3xl border border-primary/15 bg-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.featuredImage} alt={post.title} className="w-full object-contain" />
          </div>
        )}
        {/* WordPress Editor/Administrator content is rendered as HTML. Keep CMS accounts trusted. */}
        <div className="wp-article-content mt-10" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        <div className="mt-12 border-t border-primary/15 pt-8">
          <Link href="/blog/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary"><ArrowLeft aria-hidden="true" size={17} /> More articles</Link>
        </div>
      </article>
    </main>
  )
}
