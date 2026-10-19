'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Linkedin, Phone } from 'lucide-react'

const team = [
  {
    name: 'Prakash V',
    role: 'Lead Technology Consultant',
    phone: '8925175332',
    initial: 'P',
    color: 'from-[#22c55e] to-[#15803d]',
  },
  {
    name: 'Syed Irfan Ali',
    role: 'Senior Technical Trainer',
    phone: '9500128917',
    initial: 'S',
    color: 'from-[#84cc16] to-[#22c55e]',
  },
  {
    name: 'ArunKumar',
    role: 'Technical Trainer',
    phone: '9500128918',
    initial: 'A',
    color: 'from-[#a3e635] to-[#84cc16]',
  },
  {
    name: 'Haridoss',
    role: 'Technical Trainer',
    phone: '8870783300',
    initial: 'H',
    color: 'from-[#22c55e] to-[#1d4ed8]',
  },
]

const values = [
  'Excellence', 'Innovation', 'Integrity',
  'Continuous Learning', 'Student Success', 'Practical Experience',
  'Collaboration', 'Commitment',
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function Team() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="team" ref={ref} className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-1/2 h-1/2 opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, #a3e635 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="h-px w-8 bg-primary" />
            <span className="text-primary text-xs font-semibold tracking-widest uppercase">Our Experts</span>
            <span className="h-px w-8 bg-primary" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance"
          >
            Meet the{' '}
            <span className="brand-gradient-text">Team</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            Industry professionals with real-world experience, dedicated to your growth.
          </motion.p>
        </div>

        {/* Team cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group surface-card rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:border-primary/30 transition-all duration-300"
            >
              {/* Avatar */}
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-3xl font-bold text-white shadow-lg group-hover:glow-green transition-all duration-300`}>
                {member.initial}
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-base">{member.name}</h3>
                <p className="text-xs text-primary mt-1">{member.role}</p>
              </div>
              <a
                href={`tel:${member.phone}`}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                aria-label={`Call ${member.name}`}
              >
                <Phone size={12} />
                {member.phone}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Values section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center"
        >
          <h3 className="text-lg font-semibold text-foreground mb-6">Our Core Values</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {values.map((value, i) => (
              <motion.span
                key={value}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.05 }}
                whileHover={{ scale: 1.08 }}
                className="px-4 py-2 rounded-full text-sm font-medium brand-border text-primary bg-primary/5 hover:bg-primary/10 transition-colors cursor-default"
              >
                {value}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
