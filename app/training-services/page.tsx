'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight, Code2, FlaskConical, BookOpen, Award, PlayCircle,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

// ─── Training service categories ─────────────────────────────────────────────
const trainingCards = [
  {
    title: 'Web Development',
    icon: <Code2 size={24} />,
    gradient: 'from-emerald-500 via-green-500 to-teal-500',
    desc: 'Frontend to full stack tracks — Java Full Stack, MEAN, MERN, and Next.js with job-ready projects.',
    items: ['Java Full Stack', 'MEAN Stack', 'MERN Stack', 'Next.js'],
    href: '/courses?category=Web+Development',
    cta: 'Explore Courses',
  },
  {
    title: 'Testing',
    icon: <FlaskConical size={24} />,
    gradient: 'from-blue-500 via-indigo-500 to-violet-500',
    desc: 'Manual and automation testing paths for freshers and experienced career switchers.',
    items: ['Manual Testing', 'Selenium', 'Playwright', 'API Testing'],
    href: '/courses?category=Testing',
    cta: 'Explore Courses',
  },
  {
    title: 'Other Courses',
    icon: <BookOpen size={24} />,
    gradient: 'from-fuchsia-500 via-pink-500 to-orange-500',
    desc: 'Cloud, DevOps, and foundational programs like DSA for modern top IT skill requirements.',
    items: ['AWS Track', 'Microsoft Azure', 'DevOps', 'DSA'],
    href: '/courses',
    cta: 'Explore Courses',
  },
  {
    title: 'Certification',
    icon: <Award size={24} />,
    gradient: 'from-amber-500 via-yellow-500 to-lime-500',
    desc: 'Industry-recognized certification tracks and exam preparation guidance across technologies.',
    items: ['AWS Certified', 'Azure Admin', 'ISTQB', 'Scrum / Agile'],
    href: '/certifications',
    cta: 'Explore Courses',
  },
]

export default function TrainingServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Training Services
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance mb-4">
              Explore Our{' '}
              <span className="brand-gradient-text">Training Tracks</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
              Industry-aligned programs with hands-on projects, expert mentorship, and dedicated
              placement support. Choose a track to get started.
            </p>
          </motion.div>

          {/* Four cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {trainingCards.map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative surface-card rounded-2xl p-6 pt-7 flex flex-col gap-4 overflow-hidden border border-primary/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-150"
              >
                <span className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${card.gradient}`} aria-hidden="true" />

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white shadow-lg`}>
                  {card.icon}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1.5">{card.desc}</p>
                </div>

                <ul className="flex flex-col gap-2 mt-1">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href={card.href}
                  className="mt-auto inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-sm font-semibold brand-gradient text-background glow-green transition-all duration-200 hover:scale-[1.02]"
                >
                  {card.cta} <ArrowRight size={15} />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Referral video */}
        
        </div>
      </div>
    </main>
  )
}
