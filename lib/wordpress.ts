/**
 * Public, read-only WordPress.com API adapter for static-export builds.
 * No credentials are needed. CMS content is fetched ONLY during a Next.js build.
 * A failed API request intentionally fails the build to protect the previous release.
 */

export type BlogPost = {
  id: number
  slug: string
  title: string
  excerpt: string
  contentHtml: string
  featuredImage: string | null
  category: string
  tags: string[]
  publishedAt: string
  modifiedAt: string
}

type RawPost = {
  ID?: unknown
  title?: unknown
  content?: unknown
  excerpt?: unknown
  slug?: unknown
  status?: unknown
  date?: unknown
  modified?: unknown
  featured_image?: unknown
  categories?: unknown
  tags?: unknown
}

const API_URL =
  'https://public-api.wordpress.com/rest/v1.1/sites/xpertsedgecms.wordpress.com/posts/'
const MAX_PAGES = 10 // 1000 articles; increase intentionally if needed
const PAGE_SIZE = 100

/** Decode the common entities needed to show WordPress HTML as safe plain text. */
function decodeEntities(input: string): string {
  const entities: Record<string, string> = {
    amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
    rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', ndash: '–', mdash: '—', hellip: '…',
  }
  return input.replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z]+);/gi, (match, value: string) => {
    if (value.startsWith('#')) {
      const hex = value[1]?.toLowerCase() === 'x'
      const code = Number.parseInt(value.slice(hex ? 2 : 1), hex ? 16 : 10)
      return Number.isFinite(code) && code > 0 && code <= 0x10ffff
        && !(code >= 0xd800 && code <= 0xdfff)
        ? String.fromCodePoint(code) : match
    }
    return entities[value.toLowerCase()] ?? match
  })
}

export function plainText(html: string): string {
  return decodeEntities(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim()
}

function validatePost(input: RawPost): BlogPost {
  if (input.status !== 'publish') throw new Error('Non-published post in public response')
  if (typeof input.ID !== 'number' || !Number.isSafeInteger(input.ID)) {
    throw new Error('Published WordPress article missing valid ID')
  }
  if (typeof input.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug)) {
    throw new Error(`WordPress post ${input.ID} requires an ASCII, SEO-friendly slug`)
  }
  if (typeof input.title !== 'string' || !plainText(input.title)) {
    throw new Error(`WordPress post ${input.ID} missing title`)
  }
  if (typeof input.content !== 'string' || typeof input.excerpt !== 'string') {
    throw new Error(`WordPress post ${input.ID} missing content or excerpt`)
  }
  if (typeof input.date !== 'string' || Number.isNaN(Date.parse(input.date))) {
    throw new Error(`WordPress post ${input.ID} missing valid publication date`)
  }
  if (typeof input.modified !== 'string' || Number.isNaN(Date.parse(input.modified))) {
    throw new Error(`WordPress post ${input.ID} missing valid modified date`)
  }
  const categories = input.categories && typeof input.categories === 'object'
    ? Object.keys(input.categories) : []
  const tags = input.tags && typeof input.tags === 'object' ? Object.keys(input.tags) : []
  const image = typeof input.featured_image === 'string' && /^https:\/\//.test(input.featured_image)
    ? input.featured_image : null
  return {
    id: input.ID,
    slug: input.slug,
    title: plainText(input.title),
    excerpt: plainText(input.excerpt),
    contentHtml: input.content,
    featuredImage: image,
    category: categories[0] ?? 'Technology',
    tags,
    publishedAt: input.date,
    modifiedAt: input.modified,
  }
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = []
  const seen = new Set<string>()
  for (let page = 0; page < MAX_PAGES; page++) {
    const url = `${API_URL}?number=${PAGE_SIZE}&offset=${page * PAGE_SIZE}`
    const response = await fetch(url, {
      cache: 'force-cache',
      signal: AbortSignal.timeout(20000),
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) throw new Error(`WordPress API returned HTTP ${response.status}`)
    const body: unknown = await response.json()
    if (!body || typeof body !== 'object' || !('posts' in body)
      || !Array.isArray(body.posts) || !('found' in body)
      || typeof body.found !== 'number') {
      throw new Error('Unexpected WordPress API response; deployment stopped')
    }
    for (const raw of body.posts) {
      if (!raw || typeof raw !== 'object') throw new Error('Malformed WordPress API item')
      // The public API should contain published content only; reject unexpected states.
      const post = validatePost(raw as RawPost)
      if (seen.has(post.slug)) throw new Error(`Duplicate WordPress slug: ${post.slug}`)
      seen.add(post.slug)
      posts.push(post)
    }
    if (posts.length >= body.found) break
    if (body.posts.length === 0) throw new Error('WordPress API pagination ended unexpectedly')
    if (page === MAX_PAGES - 1) throw new Error('WordPress API exceeded article limit')
  }
  return posts.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
}

export async function getPublishedPost(slug: string): Promise<BlogPost | undefined> {
  return (await getPublishedPosts()).find((post) => post.slug === slug)
}
