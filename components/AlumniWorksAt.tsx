'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const alumni = [
  {
    name: 'Deloitte',
    logo:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1n8kwbqvjBuT9pPcypY7gNEWVSJPZ2.png',
  },
  {
    name: 'Capgemini',
    logo:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QMq0w6mONgI22cU3I7su5PTuRyVhz9.png',
  },
  {
    name: 'Cognizant',
    logo:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ybnAeXiHGyE1NyI2lWdRBq4RKbugjl.png',
  },
  {
    name: 'Atos',
    logo:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-uFtywkoMAwdSSNaCuHqFytrW9XJ4s2.png',
  },
  {
    name: 'Accenture',
    logo:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kzeP3Pm7qIUtB62sQLeucLymdc6gw8.png',
  },
  {
    name: 'NTT Data',
    logo:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VQVpgral8r2QVFNsw1X7Y4N5H6y90s.png',
  },
  {
    name: 'Barclays',
    logo:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4zp6YtP3zk0C6XR9PbgFh1xTui6ReG.png',
  },
  {
    name: 'DXC',
    logo:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-touqGEYrvtg2Zk9Nj31TewIBPQQnCE.png',
  },
  {
    name: 'Mphasis',
    logo:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ahIGlt2WqvtEZCjXRwPNLUiJG57YoV.png',
  },
  {
    name: 'LTIMindtree',
    logo:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MPk8hD7I2oYoqxBWeIdD8H15R0uENi.png',
  },
  {
    name: 'Tech Mahindra',
    logo:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-h0GmwIHc00K2WNaqOXW6ncjTVpR9en.png',
  },
  {
    name: 'KPMG',
    logo:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZwHzF8rdYIS1oSeriqPXOkdzy6DKrw.png',
  },
  {
    name: 'Wipro',
    logo:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wMpqW6WDtkWqH4a7ceFdVKeM1K67o8.png',
  },
  {
    name: 'TCS',
    logo:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sGUHnhUBZP4a2dPRKBuOBW29kBmGOZ.png',
  },
  {
    name: 'HCL',
    logo:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jSYawoqgAbETbihHINo3fNYh9sYAF1.png',
  },
]

const extendedAlumni = [...alumni, ...alumni]

const stats = [
  { end: 500, suffix: '+', label: 'Alumni Placed' },
  { end: 15, suffix: '+', label: 'Top Companies' },
  { end: 95, suffix: '%', label: 'Placement Rate' },
  { end: 20, suffix: 'L+', label: 'Avg Package (₹)' },
]

function useCountUp(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(1)
  useEffect(() => {
    if (!start) return
    const startTime = performance.now()
    const frame = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCount(Math.floor(1 + (end - 1) * ease))
      if (progress < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [end, duration, start])
  return count
}

function StatCard({ end, suffix, label, start }: { end: number; suffix: string; label: string; start: boolean }) {
  const count = useCountUp(end, 2000, start)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 text-center"
    >
      <h3 className="text-3xl md:text-4xl font-bold brand-gradient-text mb-2">
        {count}{suffix}
      </h3>
      <p className="text-slate-400 text-sm">{label}</p>
    </motion.div>
  )
}

export default function AlumniWorksAt() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [statsStarted, setStatsStarted] = useState(false)

  useEffect(() => {
    if (isInView && !statsStarted) {
      setStatsStarted(true)
    }
  }, [isInView, statsStarted])

  return (
    <section ref={ref} className="relative overflow-hidden py-24 bg-gradient-to-b from-background via-slate-950/30 to-background">
      {/* Background glow */}
      <div className="absolute top-0 left-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Our Alumni Work{' '}
            <span className="brand-gradient-text">
              At
            </span>
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            XpertsEdge graduates are building careers at top global companies
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              end={stat.end}
              suffix={stat.suffix}
              label={stat.label}
              start={statsStarted}
            />
          ))}
        </div>

        {/* Logo Slider */}
        <div className="relative overflow-hidden">
          {/* softer side fade */}
          <div className="absolute left-0 top-0 z-20 h-full w-12 md:w-24 bg-gradient-to-r from-background via-background/70 to-transparent pointer-events-none" />

          <div className="absolute right-0 top-0 z-20 h-full w-12 md:w-24 bg-gradient-to-l from-background via-background/70 to-transparent pointer-events-none" />

          <motion.div
            className="flex gap-8 w-max"
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              duration: 40, // slower, calmer movement
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            {extendedAlumni.map((company, index) => (
              <motion.div
                key={`${company.name}-${index}`}
                whileHover={{
                  scale: 1.08,
                  y: -6,
                }}
                className="group flex-shrink-0"
              >
                <div className="w-44">
                  {/* Card */}
                  <div className="relative h-40 rounded-[28px] bg-white shadow-2xl border border-slate-200 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-primary/20">

                    {/* hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={180}
                      height={100}
                      className="w-[78%] h-[78%] object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* company name */}
                  <p className="text-center mt-3 text-sm text-slate-400 group-hover:text-white transition-colors">
                    {company.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
