/** Read-only scheduled snapshot monitor. Never triggers deployment. */
import { appendFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { pathToFileURL } from 'node:url'
import { fingerprint, fetchPublishedPosts } from './wordpress-monitor.mjs'

export function assertState(state) {
  if (!state || state.version !== 1 ||
      !Number.isSafeInteger(state.postCount) || state.postCount < 0 ||
      typeof state.sha256 !== 'string' || !/^[a-f0-9]{64}$/.test(state.sha256)) {
    throw new Error('Invalid monitor snapshot')
  }
  return state
}

/** A first-time check needs a successful build before a baseline can be trusted. */
export function requiresBuild(previous, current) {
  return compareStates(previous, current) !== 'NO CONTENT CHANGE'
}

export function compareStates(previous, current) {
  assertState(current)
  if (previous == null) return 'BASELINE INITIALIZED'
  assertState(previous)
  return previous.sha256 === current.sha256 ? 'NO CONTENT CHANGE' : 'CONTENT CHANGED'
}

async function readPreviousOrNull(file) {
  try {
    return JSON.parse(await readFile(file, 'utf8'))
  } catch (error) {
    if (error.code === 'ENOENT') return null
    throw error
  }
}

async function main() {
  const args = process.argv.slice(2)
  if (args.length !== 4 || args[0] !== '--previous' || args[2] !== '--output' || !args[1] || !args[3]) {
    throw new Error('Usage: node scripts/wordpress-monitor-state.mjs --previous OLD.json --output NEW.json')
  }
  const previous = await readPreviousOrNull(args[1])
  const current = fingerprint(await fetchPublishedPosts())
  const result = compareStates(previous, current)
  const buildRequired = requiresBuild(previous, current)
  console.log(`Published posts: ${current.postCount}`)
  console.log(`Content SHA256: ${current.sha256}`)
  console.log(result)
  await mkdir(dirname(args[3]), { recursive: true })
  await writeFile(args[3], JSON.stringify(current, null, 2) + '\n', { flag: 'w' })
  if (process.env.GITHUB_OUTPUT) {
    const changed = result === 'CONTENT CHANGED'
    await appendFile(process.env.GITHUB_OUTPUT, `content_changed=${changed}\nbuild_required=${buildRequired}\nstatus=${result.replaceAll(' ', '_').toLowerCase()}\n`)
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => { console.error(`MONITOR STATE ERROR: ${error.message}`); process.exitCode = 1 })
}
