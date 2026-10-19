'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Company logos via thesvg.org (light variant for dark background)
// Please review each brand's trademark usage policy before commercial use.
const clients = [
  { name: 'NTT DATA Group', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/ntt-data/light.svg', fallback: null },
  { name: 'Barclays', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/barclays/light.svg', fallback: null },
  { name: 'DXC Technology', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/dxc-technology/light.svg', fallback: null },
  { name: 'Mphasis', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/mphasis/light.svg', fallback: null },
  { name: 'LTIMindtree', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/ltimindtree/light.svg', fallback: null },
  { name: 'Tech Mahindra', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/tech-mahindra/light.svg', fallback: null },
  { name: 'HCL Technologies', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/hcl-technologies/light.svg', fallback: null },
  { name: 'Tata Consultancy Services', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/tata-consultancy-services/light.svg', fallback: null },
  { name: 'KPMG', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/kpmg/light.svg', fallback: null },
  { name: 'Wipro', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/wipro/light.svg', fallback: null },
  { name: 'Deloitte', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/deloitte/light.svg', fallback: null },
  { name: 'Capgemini', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/capgemini/light.svg', fallback: null },
  { name: 'Cognizant', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/cognizant/light.svg', fallback: null },
  { name: 'Atos', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/atos/light.svg', fallback: null },
  { name: 'Accenture', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/accenture/light.svg', fallback: null },
]

// Duplicate for seamless infinite scroll
const doubled = [...clients, ...clients]

export default function ClientsTicker() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-14 bg-muted/20 overflow-hidden relative border-y border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-3 mb-2"
        >
          <span className="h-px w-8 bg-primary" />
          <span className="text-primary text-xs font-semibold tracking-widest uppercase">Our Alumni Work At</span>
          <span className="h-px w-8 bg-primary" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted-foreground text-sm"
        >
          XpertsEdge graduates are building careers at top global companies
        </motion.p>
      </div>

      {/* Ticker track */}
      <div className="relative">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0a0a0a, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0a0a0a, transparent)' }} />

        <motion.div
          initial={{ x: 0 }}
          animate={{ x: '-50%' }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          }}
          className="flex gap-10 items-center w-max"
        >
          {doubled.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex flex-col items-center gap-2 flex-shrink-0 group"
            >
              <div className="h-10 w-28 flex items-center justify-center opacity-50 group-hover:opacity-90 transition-opacity duration-300 filter brightness-0 invert">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-8 w-auto max-w-[110px] object-contain"
                  onError={(e) => {
                    const target = e.currentTarget
                    target.style.display = 'none'
                    const fallback = target.nextElementSibling as HTMLElement | null
                    if (fallback) fallback.style.display = 'block'
                  }}
                />
                <span
                  className="text-xs font-semibold text-muted-foreground text-center leading-tight hidden"
                  style={{ display: 'none' }}
                >
                  {client.name}
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground/50 group-hover:text-muted-foreground/80 transition-colors text-center max-w-[110px] leading-tight">
                {client.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
