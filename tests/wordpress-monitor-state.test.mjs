import test from 'node:test'
import assert from 'node:assert/strict'
import { assertState, compareStates, requiresBuild } from '../scripts/wordpress-monitor-state.mjs'
const state = (hash, count = 0) => ({ version: 1, postCount: count, sha256: hash })
const A = state('a'.repeat(64))
const B = state('b'.repeat(64), 1)
test('first run initializes a baseline, not a content change', () => {
  assert.equal(compareStates(null, A), 'BASELINE INITIALIZED')
})
test('unchanged SHA256 is no change', () => {
  assert.equal(compareStates(A, A), 'NO CONTENT CHANGE')
})
test('published/edit/unpublish differences are identified by hash', () => {
  assert.equal(compareStates(A, B), 'CONTENT CHANGED')
  assert.equal(compareStates(B, A), 'CONTENT CHANGED')
})
test('invalid and corrupt state aborts comparison', () => {
  assert.throws(() => compareStates({ ...A, sha256: 'x' }, B), /Invalid/)
  assert.throws(() => compareStates(A, { ...B, version: 3 }), /Invalid/)
  assert.throws(() => assertState({}), /Invalid/)
})

test('build decision: first run, changed, unchanged', () => {
  assert.equal(requiresBuild(null, A), true) // bootstrap first successful build
  assert.equal(requiresBuild(A, B), true)
  assert.equal(requiresBuild(B, A), true)
  assert.equal(requiresBuild(A, A), false)
})
