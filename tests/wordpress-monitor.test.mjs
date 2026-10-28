import test from 'node:test'
import assert from 'node:assert/strict'
import { fingerprint, fetchPublishedPosts } from '../scripts/wordpress-monitor.mjs'

const post = (id, title = 'Example') => ({
  ID: id, slug: `example-${id}`, status: 'publish', title, content: '<p>body</p>',
  excerpt: '<p>excerpt</p>', date: '2026-10-27T10:00:00Z', modified: '2026-10-27T10:00:00Z',
  featured_image: '', categories: { 'Software Testing': { slug: 'software-testing' } }, tags: { Playwright: { slug: 'playwright' } },
})

test('same content in another order gives same fingerprint', () => {
  assert.equal(fingerprint([post(2), post(1)]).sha256, fingerprint([post(1), post(2)]).sha256)
})
test('editing content changes fingerprint', () => {
  assert.notEqual(fingerprint([post(1)]).sha256, fingerprint([post(1, 'Updated')]).sha256)
})
test('unpublishing by removal changes fingerprint', () => {
  assert.notEqual(fingerprint([post(1)]).sha256, fingerprint([]).sha256)
})
test('rejects nonpublished and malformed data', () => {
  assert.throws(() => fingerprint([{...post(1), status: 'draft'}]), /invalid WordPress post/)
  assert.throws(() => fingerprint([{...post(1), content: undefined}]), /Invalid content/)
})
test('fetch paginates and validates the listing', async () => {
  const response = (body) => ({ ok: true, json: async () => body })
  const fetcher = async () => response({ found: 2, posts: [post(1), post(2)] })
  assert.equal((await fetchPublishedPosts(fetcher)).length, 2)
})
test('fetch failure is fatal, never interpreted as zero posts', async () => {
  await assert.rejects(() => fetchPublishedPosts(async () => ({ ok: false, status: 503 })), /503/)
})
