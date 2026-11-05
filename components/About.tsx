'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Target, Eye, Zap, ChevronLeft, ChevronRight } from 'lucide-react'

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
  { src: '/about-slide-2.jpeg', alt: 'Sample illustration of a practical coding classroom' },
  { src: '/about-slide-3.jpeg', alt: 'Sample illustration of instructor-led technology training' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [activeSlide, setActiveSlide] = useState(0)

  // ABOUT_CAROUSEL_PREMIUM_V1: Auto-advance with a fresh interval after manual navigation.
  // The carousel keeps running while hovered; inactive browser tabs pause it.
  const [navigationCount, setNavigationCount] = useState(0)
  const [pageVisible, setPageVisible] = useState(true)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const onVisibilityChange = () => setPageVisible(!document.hidden)
    onVisibilityChange()
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  useEffect(() => {
    if (!pageVisible || aboutSlides.length < 2) return
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % aboutSlides.length)
    }, 5200)
    return () => window.clearInterval(timer)
  }, [navigationCount, pageVisible])

  const goToSlide = (index: number) => {
    setActiveSlide((index + aboutSlides.length) % aboutSlides.length)
    setNavigationCount((count) => count + 1)
  }

  const changeSlide = (step: number) => {
    setActiveSlide((current) => (current + step + aboutSlides.length) % aboutSlides.length)
    setNavigationCount((count) => count + 1)
  }

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

          {/* Premium campus photo carousel: balanced scale, manual controls and auto-play. */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 32 }}
            transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-[540px] lg:ml-auto lg:mr-0"
          >
            <div className="overflow-hidden rounded-[24px] border border-[#9ae6a9]/25 bg-[#0d1510] shadow-[0_28px_85px_rgba(0,0,0,0.48),0_0_42px_rgba(34,197,94,0.06)] ring-1 ring-white/[0.035] transition-[border-color,box-shadow] duration-500 hover:border-[#9ae6a9]/40 hover:shadow-[0_32px_92px_rgba(0,0,0,0.52),0_0_52px_rgba(34,197,94,0.10)] motion-reduce:transition-none">
              <div
                className="relative aspect-[4/3] w-full select-none overflow-hidden bg-[#111b14]"
                role="region"
                aria-roledescription="carousel"
                aria-label="XpertsEdge campus photos"
                onTouchStart={(event) => {
                  touchStartX.current = event.touches[0]?.clientX ?? null
                }}
                onTouchEnd={(event) => {
                  if (touchStartX.current === null) return
                  const distance = event.changedTouches[0].clientX - touchStartX.current
                  touchStartX.current = null
                  if (Math.abs(distance) > 55) changeSlide(distance < 0 ? 1 : -1)
                }}
                onTouchCancel={() => { touchStartX.current = null }}
              >
                {/* Wait for the exiting photo before revealing the next one: no ghosting. */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={aboutSlides[activeSlide].src}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.36, ease: 'easeInOut' }}
                  >
                    <Image
                      src={aboutSlides[activeSlide].src}
                      alt={aboutSlides[activeSlide].alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 540px"
                      className="object-cover object-center"
                      priority={activeSlide === 0}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Light edge treatment; keep photos free from captions or quote overlays. */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-black/5" />

                <button
                  type="button"
                  onClick={() => changeSlide(-1)}
                  aria-label="Previous campus photo"
                  className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#0b150f]/75 text-white shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-lg transition-[background-color,border-color,transform] duration-200 hover:border-[#a3e635]/75 hover:bg-[#163c24]/95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3e635] motion-reduce:transition-none sm:left-4"
                >
                  <ChevronLeft size={21} strokeWidth={2} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => changeSlide(1)}
                  aria-label="Next campus photo"
                  className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#0b150f]/75 text-white shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-lg transition-[background-color,border-color,transform] duration-200 hover:border-[#a3e635]/75 hover:bg-[#163c24]/95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3e635] motion-reduce:transition-none sm:right-4"
                >
                  <ChevronRight size={21} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>

              <div className="flex min-h-12 items-center justify-between gap-3 border-t border-[#9ae6a9]/15 bg-gradient-to-r from-[#0d1710] via-[#0d1510] to-[#101a13] px-4 py-3 sm:px-5">
                <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#b9d2bf]">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#a3e635]" />
                  Our campus
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-medium tabular-nums text-[#d5e6d8]">
                    {String(activeSlide + 1).padStart(2, '0')} / {String(aboutSlides.length).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-1.5" aria-label="Choose a campus photo">
                    {aboutSlides.map((slide, index) => (
                      <button
                        key={slide.src}
                        type="button"
                        onClick={() => goToSlide(index)}
                        aria-label={`Show campus photo ${index + 1}`}
                        aria-current={activeSlide === index ? 'true' : undefined}
                        className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3e635] motion-reduce:transition-none ${activeSlide === index ? 'w-5 bg-[#a3e635]' : 'w-1.5 bg-white/30 hover:bg-white/60'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
