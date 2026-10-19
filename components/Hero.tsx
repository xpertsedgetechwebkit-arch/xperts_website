'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import HeroLines from '@/components/HeroLines'

const stats = [
  { end: 500, suffix: '+', label: 'Students Trained' },
  { end: 10, suffix: '+', label: 'Programs Offered' },
  { end: 95, suffix: '%', label: 'Placement Rate' },
  { end: 5, suffix: '+', label: 'Years Experience' },
]

function useCountUp(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(1)
  useEffect(() => {
    if (!start) return
    const startTime = performance.now()
    const frame = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCount(Math.floor(1 + (end - 1) * ease))
      if (progress < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [end, duration, start])
  return count
}

const words = ['Excellence', 'Innovation', 'Growth', 'Success']

function StatItem({ end, suffix, label, start }: { end: number; suffix: string; label: string; start: boolean }) {
  const count = useCountUp(end, 2000, start)
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-3xl md:text-4xl font-bold brand-gradient-text">
        {count}{suffix}
      </span>
      <span className="text-xs text-muted-foreground text-center">{label}</span>
    </div>
  )
}

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [typing, setTyping] = useState(true)
  const [statsStarted, setStatsStarted] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Start counter animation after page loads
    const t = setTimeout(() => setStatsStarted(true), 1200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const word = words[wordIndex]
    if (typing) {
      if (displayText.length < word.length) {
        timeout.current = setTimeout(() => setDisplayText(word.slice(0, displayText.length + 1)), 80)
      } else {
        timeout.current = setTimeout(() => setTyping(false), 1600)
      }
    } else {
      if (displayText.length > 0) {
        timeout.current = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 45)
      } else {
        setWordIndex((i) => (i + 1) % words.length)
        setTyping(true)
      }
    }
    return () => { if (timeout.current) clearTimeout(timeout.current) }
  }, [displayText, typing, wordIndex])

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated background lines */}
      <HeroLines />
      <div className="absolute inset-x-0 bottom-0 h-40 z-0 bg-gradient-to-b from-transparent to-background pointer-events-none" aria-hidden="true" />

      {/* Animated glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-accent/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center pt-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
          Education &amp; Technology Training Institute
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight"
        >
          <span>
            Building{' '}
            {/* Fixed-width slot sized to the longest word so the line never reflows */}
            <span className="relative inline-flex align-baseline">
              <span className="invisible" aria-hidden="true">Excellence</span>
              <span className="absolute inset-0 flex items-baseline justify-start brand-gradient-text">
                {displayText}
                <span
                  className="inline-block w-0.5 h-8 sm:h-10 md:h-14 bg-primary self-center ml-1 animate-pulse"
                  aria-hidden="true"
                />
              </span>
            </span>
          </span>
          <br />
          <span className="text-foreground">Beyond Boundaries</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty"
        >
          XpertsEdge Technologies empowers businesses and professionals through quality engineering,
          software testing excellence, automation solutions, and practical technology training.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            href="#services"
            onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold brand-gradient text-background glow-green text-sm md:text-base"
          >
            Explore Programs <ArrowRight size={16} />
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 w-full max-w-3xl"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
            >
              <StatItem end={stat.end} suffix={stat.suffix} label={stat.label} start={statsStarted} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.5 }, y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } }}
        onClick={scrollToAbout}
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-muted-foreground hover:text-primary transition-colors"
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  )
}
