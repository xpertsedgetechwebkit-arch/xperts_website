'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * Animated flowing "background paths" for the hero.
 * Adapted from the kokonutd background-paths effect, re-themed to the
 * XpertsEdge brand green. The lines draw and flow along their own curved
 * Bézier paths (animated pathLength / pathOffset) — no container translation.
 *
 * Behind hero content, pointer-events-none, respects reduced motion.
 */

// Deterministic so server and client render identically (no hydration mismatch).
function rand(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

function FloatingPaths({ position }: { position: number }) {
  const reduce = useReducedMotion()

  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.3 + i * 0.015,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-white"
        viewBox="0 0 696 316"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.04 + path.id * 0.012}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={
              reduce
                ? { pathLength: 1, opacity: 0.4 }
                : { pathLength: 1, opacity: [0.3, 0.6, 0.3], pathOffset: [0, 1, 0] }
            }
            transition={
              reduce
                ? { duration: 0 }
                : {
                    duration: 20 + rand(path.id, position) * 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'linear',
                  }
            }
          />
        ))}
      </svg>
    </div>
  )
}

export default function HeroLines() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  )
}
