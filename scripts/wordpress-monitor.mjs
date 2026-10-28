/**
 * XpertsEdge Phase 4: READ-ONLY WordPress change detection.
 * No WordPress tokens, GitHub credentials, GitHub Actions triggers, or deployments.
 * Usage:
 *   node scripts/wordpress-monitor.mjs
 *   node scripts/wordpress-monitor.mjs --save-baseline .wp-monitor-baseline.json
 *   node scripts/wordpress-monitor.mjs --compare .wp-monitor-baseline.json
 */
import { createHash } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'

export const WORDPRESS_API = 'https://public-api.wordpress.com/rest/v1.1/sites/xpertsedgecms.wordpress.com/posts/'
const PAGE_SIZE = 100
const MAX_PAGES = 10

function requireText(post, key) {
  if (typeof post[key] !== 'string') throw new Error(`Invalid ${key} in post ${post.ID}`)
  return post[key]
}

function sortedSlugs(value) {
  if (value == null) return []
  if (typeof value !== 'object' || Array.isArray(value)) throw new Error('Invalid category or tag response')
  return Object.values(value).map((item) => {
    if (!item || typeof item !== 'object' || typeof item.slug !== 'string') throw new Error('Invalid category or tag')
    return item.slug
  }).sort()
}

export function normalizePosts(rawPosts) {
  if (!Array.isArray(rawPosts)) throw new Error('WordPress posts response is not an array')
  const seen = new Set()
  const normalized = rawPosts.map((post) => {
    if (!post || typeof post !== 'object' || post.status !== 'publish' || !Number.isSafeInteger(post.ID)) {
      throw new Error('Unexpected non-published or invalid WordPress post')
    }
    if (seen.has(post.ID)) throw new Error(`Duplicate WordPress post ${post.ID}`)
    seen.add(post.ID)
    // Content-affecting fields, not volatile likes/views or API metadata.
    return {
      id: post.ID,
      slug: requireText(post, 'slug'),
      title: requireText(post, 'title'),
      content: requireText(post, 'content'),
      excerpt: requireText(post, 'excerpt'),
      date: requireText(post, 'date'),
      modified: requireText(post, 'modified'),
      featuredImage: typeof post.featured_image === 'string' ? post.featured_image : '',
      categories: sortedSlugs(post.categories),
      tags: sortedSlugs(post.tags),
    }
  })
  return normalized.sort((a, b) => a.id - b.id)
}

export function fingerprint(rawPosts) {
  const normalized = normalizePosts(rawPosts)
  return {
    version: 1,
    postCount: normalized.length,
    sha256: createHash('sha256').update(JSON.stringify(normalized)).digest('hex'),
  }
}

export async function fetchPublishedPosts(fetcher = fetch) {
  const posts = []
  let expectedTotal = null
  for (let page = 0; page < MAX_PAGES; page++) {
    const url = new URL(WORDPRESS_API)
    url.searchParams.set('number', String(PAGE_SIZE))
    url.searchParams.set('offset', String(page * PAGE_SIZE))
    url.searchParams.set('status', 'publish')
    const response = await fetcher(url.toString(), {
      headers: { Accept: 'application/json', 'Cache-Control': 'no-cache' },
      signal: AbortSignal.timeout(20000),
      cache: 'no-store',
    })
    if (!response.ok) throw new Error(`WordPress returned HTTP ${response.status}`)
    const data = await response.json()
    if (!data || !Number.isSafeInteger(data.found) || data.found < 0 || !Array.isArray(data.posts)) {
      throw new Error('WordPress returned an invalid post listing')
    }
    if (expectedTotal === null) expectedTotal = data.found
    if (expectedTotal !== data.found) throw new Error('WordPress post count changed mid-fetch; retry later')
    posts.push(...data.posts)
    if (posts.length >= expectedTotal) {
      if (posts.length !== expectedTotal) throw new Error('Inconsistent WordPress post count')
      return posts
    }
    if (data.posts.length === 0) throw new Error('WordPress returned incomplete pagination')
  }
  throw new Error('WordPress contains more posts than this monitor supports')
}

async function main() {
  const args = process.argv.slice(2)
  const allowed = new Set(['--save-baseline', '--compare'])
  if (args.length !== 0 && (args.length !== 2 || !allowed.has(args[0]))) {
    throw new Error('Usage: node scripts/wordpress-monitor.mjs [--save-baseline FILE | --compare FILE]')
  }
  const state = fingerprint(await fetchPublishedPosts())
  console.log(`Published posts: ${state.postCount}`)
  console.log(`Content SHA256: ${state.sha256}`)
  if (args[0] === '--save-baseline') {
    await writeFile(args[1], JSON.stringify(state, null, 2) + '\n', { flag: 'wx' })
    console.log(`Baseline saved: ${args[1]}`)
  } else if (args[0] === '--compare') {
    const before = JSON.parse(await readFile(args[1], 'utf8'))
    if (before.version !== 1 || !/^[0-9a-f]{64}$/.test(before.sha256)) {
      throw new Error('Invalid baseline file')
    }
    console.log(before.sha256 === state.sha256 ? 'NO CONTENT CHANGE' : 'CONTENT CHANGED')
  } else {
    console.log('Read-only check complete. Nothing was modified or deployed.')
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => { console.error(`MONITOR ERROR: ${error.message}`); process.exitCode = 1 })
}
