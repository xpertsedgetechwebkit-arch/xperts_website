import Link from 'next/link'
import { ArrowUpRight, BookOpen } from 'lucide-react'
import type { BlogPost } from '@/lib/wordpress'

const focusStyles =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background'

export default function WordPressArticleCards({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-primary/15 bg-card px-6 py-12 text-center">
        <BookOpen aria-hidden="true" className="mx-auto mb-4 text-primary" size={30} />
        <p className="text-lg font-semibold">Fresh articles are coming soon.</p>
        <p className="mt-2 text-sm text-foreground/60">Explore our practice notes while we prepare our next post.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <article key={post.id} className="h-full">
          <Link
            href={`/blog/${post.slug}/`}
            aria-label={`Read the article: ${post.title}`}
            className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-card transition-[border-color,box-shadow,transform] duration-300 hover:border-primary/35 hover:shadow-xl hover:shadow-primary/5 motion-safe:hover:-translate-y-1 motion-reduce:transition-none ${focusStyles}`}
          >
            <div className="relative min-h-44 overflow-hidden border-b border-primary/10 bg-gradient-to-br from-primary/10 via-background to-secondary/5">
              {post.featuredImage ? (
                // Images are served directly from the WordPress media CDN (static export has no image optimizer).
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  loading="lazy"
                  className="h-48 w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105 motion-reduce:transition-none"
                />
              ) : (
                <div className="flex h-48 flex-col justify-between p-6">
                  <BookOpen aria-hidden="true" size={28} className="text-primary" />
                  <p className="font-mono text-xs tracking-wide text-primary/80">XPERTSEDGE INSIGHTS</p>
                </div>
              )}
              <span className="absolute right-4 top-4 rounded-md bg-background/90 px-2 py-1 font-mono text-xs text-primary">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <span className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">{post.category}</span>
              <h3 className="text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary motion-reduce:transition-none">{post.title}</h3>
              <p className="mb-6 mt-3 text-sm leading-7 text-foreground/60">{post.excerpt}</p>
              <span className="mt-auto flex items-center justify-between border-t border-white/5 pt-4 text-xs font-semibold text-foreground/75">
                Read the article
                <ArrowUpRight aria-hidden="true" size={17} className="text-primary transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 motion-reduce:transition-none" />
              </span>
            </div>
          </Link>
        </article>
      ))}
    </div>
  )
}
