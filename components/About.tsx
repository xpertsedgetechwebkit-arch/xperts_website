'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Target, Eye, Zap } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const pillars = [
  {
    icon: <Target size={20} />,
    title: 'Our Mission',
    text: 'To develop future-ready talent and enable continuous growth through technology and education.',
  },
  {
    icon: <Eye size={20} />,
    title: 'Our Vision',
    text: 'To become a trusted learning and technology partner that transforms careers and creates opportunities beyond boundaries.',
  },
  {
    icon: <Zap size={20} />,
    title: 'Our Approach',
    text: 'Practical, hands-on learning with real-time project exposure, expert guidance, and outcome-driven methodologies.',
  },
]

// To replace a sample image later, add your image to /public and update its src here.
const aboutSlides = [
  { src: '/about-img.png', alt: 'XpertsEdge Technologies training environment' },
  { src: '/about-slide-2.svg', alt: 'Sample illustration of a practical coding classroom' },
  { src: '/about-slide-3.svg', alt: 'Sample illustration of instructor-led technology training' },
  { src: '/about-slide-4.svg', alt: 'Sample illustration of collaborative project learning' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [activeSlide, setActiveSlide] = useState(0)

  // Autoplay must not depend on scroll visibility or mouse position.
  // This also keeps images rotating when the cursor is resting over the image.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % aboutSlides.length)
    }, 4000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <section id="about" ref={ref} className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Subtle background accent */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 50%, #22c55e 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="h-px w-8 bg-primary" />
          <span className="text-primary text-xs font-semibold tracking-widest uppercase">Inside XpertsEdge</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <div>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance leading-tight mb-6"
            >
              Who We{' '}
              <span className="brand-gradient-text">Are</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-muted-foreground leading-relaxed mb-4 text-pretty"
            >
              XpertsEdge Technologies is a technology and professional training company dedicated to
              empowering individuals and organizations through industry-focused learning and skill
              development.
            </motion.p>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-muted-foreground leading-relaxed mb-8 text-pretty"
            >
              We provide high-quality training programs designed to bridge the gap between academic
              knowledge and real-world industry expectations — covering Software Testing, Test Automation,
              API Testing, Programming, Cloud Technologies, and more.
            </motion.p>

            {/* Pillars */}
            <div className="flex flex-col gap-4">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.12 }}
                  className="flex gap-4 p-4 rounded-xl surface-card hover:border-primary/30 transition-colors duration-200 group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg brand-gradient flex items-center justify-center text-background group-hover:glow-green transition-all">
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden brand-border">
              {/* Preserve the original image dimensions exactly, without showing it under active slides. */}
              <Image
                src={aboutSlides[0].src}
                alt=""
                width={600}
                height={480}
                className="w-full h-auto object-cover invisible"
                aria-hidden="true"
              />
              {/* Cross-fade the actual active image; only one slide source is displayed at a time. */}
              <AnimatePresence initial={false}>
                <motion.div
                  key={activeSlide}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                >
                  <Image
                    src={aboutSlides[activeSlide].src}
                    alt={aboutSlides[activeSlide].alt}
                    fill
                    sizes="(max-width: 1023px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              {/* Overlay badge (unchanged position and styling) */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 brand-border">
                  <p className="text-sm font-medium text-foreground italic leading-relaxed">
                    &ldquo;We are committed to maintaining excellence, integrity, and continuous
                    improvement in everything we do.&rdquo;
                  </p>
                  <p className="text-xs text-primary mt-2 font-semibold">— Founder, XpertsEdge Technologies</p>
                </div>
              </div>
            </div>

            {/* Floating accent */}
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl brand-gradient opacity-20 blur-xl"
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
