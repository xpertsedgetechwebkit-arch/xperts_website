'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, ShieldCheck, BadgeCheck, Star } from 'lucide-react'

// NOTE: Dummy certifications — replace with real accreditations / partner badges.
const certifications = [
  { icon: <ShieldCheck size={22} />, title: 'ISO 9001:2015', sub: 'Quality Certified' },
  { icon: <BadgeCheck size={22} />, title: 'MSME Registered', sub: 'Govt. of India' },
  { icon: <Award size={22} />, title: 'AWS Training Partner', sub: 'Accredited' },
  { icon: <Star size={22} />, title: 'ISTQB Aligned', sub: 'Testing Curriculum' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function Certifications() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-14 bg-muted/20 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-3"
          >
            <span className="h-px w-8 bg-primary" />
            <span className="text-primary text-xs font-semibold tracking-widest uppercase">Certifications & Accreditations</span>
            <span className="h-px w-8 bg-primary" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl font-bold text-foreground text-balance"
          >
            Trusted & <span className="brand-gradient-text">Recognized</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              whileHover={{ y: -4 }}
              className="surface-card rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center text-background">
                {cert.icon}
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{cert.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{cert.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
