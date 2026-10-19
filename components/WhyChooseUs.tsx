'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  BookOpen,
  Wrench,
  UserCheck,
  Compass,
  SlidersHorizontal,
  Monitor,
  Star,
  HeartHandshake,
  DollarSign,
} from 'lucide-react'

const reasons = [
  {
    icon: <BookOpen size={20} />,
    title: 'Industry-Oriented Training',
    desc: 'Programs designed based on current industry standards and real-world requirements.',
  },
  {
    icon: <Wrench size={20} />,
    title: 'Practical Hands-on Learning',
    desc: 'Focus on implementation, live demos, assignments, and project-based learning.',
  },
  {
    icon: <UserCheck size={20} />,
    title: 'Expert Trainers',
    desc: 'Learn from experienced professionals with real-time industry exposure and practical knowledge.',
  },
  {
    icon: <Compass size={20} />,
    title: 'Career-Focused Approach',
    desc: 'Training structured to build confidence, technical skills, and job readiness.',
  },
  {
    icon: <SlidersHorizontal size={20} />,
    title: 'Customized Learning Paths',
    desc: 'Flexible learning approaches based on individual and organizational needs.',
  },
  {
    icon: <Monitor size={20} />,
    title: 'Technology-Driven Learning',
    desc: 'Continuously adopting modern tools, technologies, and best practices.',
  },
  {
    icon: <Star size={20} />,
    title: 'Quality & Excellence',
    desc: 'Committed to delivering high-quality learning experiences and measurable outcomes.',
  },
  {
    icon: <HeartHandshake size={20} />,
    title: 'Continuous Support',
    desc: 'Support extends beyond training through mentoring and professional guidance.',
  },
  {
    icon: <DollarSign size={20} />,
    title: 'Affordable & Value-Driven',
    desc: 'High-quality training designed to create maximum value and long-term growth.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function WhyChooseUs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="why-us" ref={ref} className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute bottom-0 left-0 w-1/2 h-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 0% 100%, #22c55e 0%, transparent 70%)' }}
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
            <span className="text-primary text-xs font-semibold tracking-widest uppercase">Why XpertsEdge</span>
            <span className="h-px w-8 bg-primary" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance"
          >
            Why{' '}
            <span className="brand-gradient-text">Choose Us</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            We go beyond teaching — we build careers. Here&apos;s what sets XpertsEdge apart.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.07 }}
              whileHover={{ y: -4 }}
              className="group relative surface-card rounded-2xl p-6 flex gap-4 hover:border-primary/30 transition-all duration-150"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at top left, rgba(34,197,94,0.06) 0%, transparent 70%)' }}
                aria-hidden="true"
              />

              <div className="flex-shrink-0 w-10 h-10 rounded-xl brand-gradient flex items-center justify-center text-background mt-0.5">
                {reason.icon}
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-200">
                  {reason.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
