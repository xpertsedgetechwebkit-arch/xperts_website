'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  FlaskConical, Cpu, Globe, Code2, Smartphone, GitBranch,
  Users, Briefcase, Award, Lightbulb, X, Clock, IndianRupee,
  TrendingUp, CheckCircle2, BookOpen, Cloud, ArrowRight, ArrowLeft,
} from 'lucide-react'

// ─── Course data ──────────────────────────────────────────────────────────────
const courses = [
  {
    category: 'Web Development',
    icon: <Code2 size={20} />,
    title: 'Java Full Stack',
    subtitle: 'Java + Spring Boot + React',
    duration: '5–6 Months',
    investment: '₹30,000 – ₹45,000',
    outcome: 'Full Stack Developer @ 4.5 LPA+',
    whoCanLearn: ['Fresh Graduates', 'Career Gap', 'Non IT Switch'],
    highlights: ['Live Projects', 'Frontend + Backend', 'Interview Prep', 'Placement Support'],
    desc: 'A complete Java full stack roadmap covering frontend, backend, REST APIs, database integration, and deployment basics.',
    tag: 'Popular',
    curriculumSlug: 'java-full-stack',
  },
  {
    category: 'Web Development',
    icon: <Globe size={20} />,
    title: 'MEAN Stack',
    subtitle: 'MongoDB + Express + Angular + Node',
    duration: '4–5 Months',
    investment: '₹28,000 – ₹40,000',
    outcome: 'MEAN Developer @ 4 LPA+',
    whoCanLearn: ['Beginners Friendly', 'Career Return', 'Degree Students'],
    highlights: ['Angular UI', 'REST APIs', 'MongoDB Practice', 'Mock Interviews'],
    desc: 'Build scalable full stack applications using Angular and Node.js with modern API workflows and deployment basics.',
    tag: 'Core',
    curriculumSlug: 'mean-stack',
  },
  {
    category: 'Web Development',
    icon: <Smartphone size={20} />,
    title: 'MERN Stack',
    subtitle: 'MongoDB + Express + React + Node',
    duration: '4–5 Months',
    investment: '₹28,000 – ₹42,000',
    outcome: 'MERN Developer @ 4.5 LPA+',
    whoCanLearn: ['Freshers', 'Career Shift', 'Freelance Aspirants'],
    highlights: ['React Projects', 'API Integration', 'Portfolio Build', 'Resume Guidance'],
    desc: 'Learn a modern JavaScript full stack workflow with React, Node.js, API integration, authentication, and capstone builds.',
    tag: 'Popular',
    curriculumSlug: 'mern-stack',
  },
  {
    category: 'Web Development',
    icon: <Code2 size={20} />,
    title: 'Next.js Development',
    subtitle: 'React + Next.js + TypeScript',
    duration: '3–4 Months',
    investment: '₹26,000 – ₹38,000',
    outcome: 'Frontend / Full Stack Dev @ 5 LPA+',
    whoCanLearn: ['React Developers', 'Freshers', 'Career Upskill'],
    highlights: ['App Router', 'SSR & SSG', 'API Routes', 'Vercel Deployment'],
    desc: 'Build production-grade full stack apps with Next.js — App Router, server components, rendering strategies, API routes, and deployment.',
    tag: 'Advanced',
    curriculumSlug: 'nextjs',
  },
  {
    category: 'Testing',
    icon: <FlaskConical size={20} />,
    title: 'Manual Testing',
    subtitle: 'Software Testing Fundamentals',
    duration: '2–3 Months',
    investment: '₹15,000 – ₹22,000',
    outcome: 'QA Analyst @ 3.5 LPA+',
    whoCanLearn: ['Freshers', 'Career Gap', 'Non Coding'],
    highlights: ['STLC Basics', 'Test Cases', 'Bug Reporting', 'Agile Exposure'],
    desc: 'Master manual testing essentials, defect lifecycle, requirement analysis, and real-time testing document preparation.',
    tag: 'Core',
    curriculumSlug: 'manual-testing',
  },
  {
    category: 'Testing',
    icon: <Cpu size={20} />,
    title: 'Java Selenium Automation',
    subtitle: 'Java + Selenium + Cucumber',
    duration: '4 Months',
    investment: '₹22,000 – ₹32,000',
    outcome: 'Automation Tester @ 4.5 LPA+',
    whoCanLearn: ['Manual Testers', 'Freshers', 'Career Break'],
    highlights: ['Framework Design', 'Cucumber BDD', 'POM Pattern', 'Jenkins Basics'],
    desc: 'A practical automation course focused on Java, Selenium WebDriver, reusable framework design, and reporting.',
    tag: 'Popular',
    curriculumSlug: 'java-selenium-automation',
  },
  {
    category: 'Testing',
    icon: <Cpu size={20} />,
    title: 'Playwright Automation',
    subtitle: 'Playwright + TypeScript',
    duration: '3–4 Months',
    investment: '₹25,000 – ₹35,000',
    outcome: 'Playwright QA Engineer @ 5 LPA+',
    whoCanLearn: ['Automation Starters', 'QA Engineers', 'Career Upskill'],
    highlights: ['Locator Practice', 'API + UI', 'Cross Browser', 'Real Projects'],
    desc: 'Train on modern browser automation using Playwright, TypeScript, assertions, fixtures, and CI-ready patterns.',
    tag: 'Advanced',
    curriculumSlug: 'playwright-automation',
  },
  {
    category: 'Testing',
    icon: <Globe size={20} />,
    title: 'API Testing',
    subtitle: 'Postman + Rest Assured',
    duration: '2–3 Months',
    investment: '₹18,000 – ₹28,000',
    outcome: 'API Test Engineer @ 4 LPA+',
    whoCanLearn: ['Test Engineers', 'Freshers', 'Backend Learners'],
    highlights: ['REST Concepts', 'Collections', 'Automation Basics', 'Validation Practice'],
    desc: 'Strengthen API validation skills with Postman, status checks, request chaining, and Java-based automation basics.',
    tag: 'Core',
    curriculumSlug: 'api-testing',
  },
  {
    category: 'Cloud & DevOps',
    icon: <Briefcase size={20} />,
    title: 'AWS Track',
    subtitle: 'Amazon Web Services',
    duration: '3–4 Months',
    investment: '₹25,000 – ₹35,000',
    outcome: 'Cloud Engineer @ 8.5 LPA',
    whoCanLearn: ['Freshers', 'Career Switch', 'System Admin'],
    highlights: ['Live Training', 'Real AWS Projects', 'Mentorship', 'Placement Support'],
    desc: 'A cloud-oriented track covering core AWS services, architecture basics, deployment concepts, and practical labs.',
    tag: 'Advanced',
    curriculumSlug: 'aws',
  },
  {
    category: 'Cloud & DevOps',
    icon: <Briefcase size={20} />,
    title: 'Microsoft Azure',
    subtitle: 'Azure Administrator Track',
    duration: '3–4 Months',
    investment: '₹24,000 – ₹34,000',
    outcome: 'Azure Engineer @ 7 LPA+',
    whoCanLearn: ['Beginners', 'IT Support', 'Career Upgrade'],
    highlights: ['Azure Labs', 'Admin Modules', 'Cloud Projects', 'Certification Path'],
    desc: 'Gain hands-on cloud fundamentals with Azure services, identity, networking, storage, and virtual infrastructure.',
    tag: 'Advanced',
    curriculumSlug: 'microsoft-azure',
  },
  {
    category: 'Cloud & DevOps',
    icon: <GitBranch size={20} />,
    title: 'DevOps',
    subtitle: 'CI/CD + Docker + Cloud Basics',
    duration: '3–4 Months',
    investment: '₹26,000 – ₹38,000',
    outcome: 'DevOps Engineer @ 6 LPA+',
    whoCanLearn: ['Developers', 'Ops Teams', 'Career Switch'],
    highlights: ['Git Workflow', 'Docker Practice', 'CI/CD Pipelines', 'Linux Basics'],
    desc: 'Learn deployment automation, source control workflow, containers, and CI/CD concepts for practical DevOps readiness.',
    tag: 'Advanced',
    curriculumSlug: 'devops',
  },
  {
    category: 'Other',
    icon: <BookOpen size={20} />,
    title: 'DSA',
    subtitle: 'Data Structures & Algorithms',
    duration: '2–3 Months',
    investment: '₹12,000 – ₹20,000',
    outcome: 'Interview Ready Candidate',
    whoCanLearn: ['Students', 'Freshers', 'Job Seekers'],
    highlights: ['Problem Solving', 'Coding Logic', 'Patterns Practice', 'Interview Prep'],
    desc: 'Sharpen coding logic, problem-solving patterns, and interview confidence with essential DSA coverage and practice rounds.',
    tag: 'Core',
    curriculumSlug: 'dsa',
  },
]

type Course = typeof courses[number] & { curriculumSlug?: string }

// ─── Category metadata (Level 1 cards) ───────────────────────────────────────
const categoryMeta = [
  {
    key: 'Web Development',
    icon: <Code2 size={22} />,
    gradient: 'from-emerald-500 via-green-500 to-teal-500',
    desc: 'Frontend to full stack tracks with job-ready projects and strong placement direction.',
  },
  {
    key: 'Testing',
    icon: <FlaskConical size={22} />,
    gradient: 'from-blue-500 via-indigo-500 to-violet-500',
    desc: 'Manual and automation testing paths for freshers and experienced career switchers.',
  },
  {
    key: 'Cloud & DevOps',
    icon: <Cloud size={22} />,
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    desc: 'Cloud platforms, CI/CD, and DevOps pipelines for modern infrastructure roles.',
  },
  {
    key: 'Other',
    icon: <BookOpen size={22} />,
    gradient: 'from-fuchsia-500 via-pink-500 to-orange-500',
    desc: 'Foundational programs like DSA to sharpen problem-solving and interview readiness.',
  },
]

const gradientFor = (category: string) =>
  categoryMeta.find((c) => c.key === category)?.gradient ?? 'from-primary to-accent'

// ─── IT services (overview only, no card modal) ──────────────────────────────
const itServices = [
  { icon: <Users size={22} />, title: 'Corporate Training Programs', desc: 'Customized training solutions designed for teams, organizations, and professional upskilling needs.', tag: 'Enterprise' },
  { icon: <Lightbulb size={22} />, title: 'Technology Consulting', desc: 'Guidance and structured learning programs to help individuals and businesses stay future-ready.', tag: 'Enterprise' },
  { icon: <Award size={22} />, title: 'Placement Readiness', desc: 'Support for resume preparation, technical mentoring, and building interview confidence.', tag: 'Support' },
  { icon: <Briefcase size={22} />, title: 'Real-Time Project Training', desc: 'Project-based learning with mock interviews, practical exercises, and career guidance.', tag: 'Core' },
]

const tagColor: Record<string, string> = {
  Core: 'text-primary bg-primary/10 border-primary/20',
  Popular: 'text-accent bg-accent/10 border-accent/20',
  Advanced: 'text-secondary bg-secondary/10 border-secondary/20',
  Enterprise: 'text-muted-foreground bg-muted border-border',
  Support: 'text-primary bg-primary/10 border-primary/20',
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

// ─── Course Detail Modal ──────────────────────────────────────────────────────
function CourseModal({ course, onClose }: { course: Course; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${course.title} details`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="surface-card rounded-2xl p-6 md:p-8 max-w-lg w-full border border-primary/25 relative max-h-[85vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl brand-gradient flex items-center justify-center text-background flex-shrink-0">
            {course.icon}
          </div>
          <div>
            <h3 className="font-bold text-foreground text-lg">{course.title}</h3>
            <p className="text-xs text-muted-foreground">{course.subtitle}</p>
          </div>
          <span className={`ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full border ${tagColor[course.tag]}`}>
            {course.tag}
          </span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-5">{course.desc}</p>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="surface-card rounded-xl p-3 flex gap-2 items-start">
            <Clock size={14} className="text-primary mt-0.5" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Duration</p>
              <p className="text-sm font-semibold text-foreground">{course.duration}</p>
            </div>
          </div>
          <div className="surface-card rounded-xl p-3 flex gap-2 items-start">
            <IndianRupee size={14} className="text-primary mt-0.5" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Investment</p>
              <p className="text-sm font-semibold text-foreground">{course.investment}</p>
            </div>
          </div>
        </div>

        <div className="surface-card rounded-xl p-3 flex gap-2 items-start mb-5">
          <TrendingUp size={14} className="text-accent mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Expected Outcome</p>
            <p className="text-sm font-semibold text-foreground">{course.outcome}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Who Can Learn</p>
            <ul className="flex flex-col gap-1">
              {course.whoCanLearn.map((w) => (
                <li key={w} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 size={13} className="text-primary flex-shrink-0" /> {w}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Key Highlights</p>
            <ul className="flex flex-col gap-1">
              {course.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 size={13} className="text-accent flex-shrink-0" /> {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-3">
          <motion.a
            href="/demo"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 py-3 rounded-xl font-semibold brand-gradient text-background text-sm text-center glow-green"
          >
            Register for Demo
          </motion.a>
          {course.curriculumSlug && (
            <Link
              href={`/curriculum/${course.curriculumSlug}`}
              className="flex-1 py-3 rounded-xl font-semibold border border-primary/40 text-primary text-sm text-center hover:bg-primary/10 transition-all"
            >
              View Curriculum
            </Link>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Category card (Level 1) ─────────────────────────────────────────────────
function CategoryCard({
  meta,
  count,
  previews,
  onExplore,
  index,
  inView,
}: {
  meta: typeof categoryMeta[0]
  count: number
  previews: string[]
  onExplore: () => void
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      layout
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.5, delay: 0.05 + index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative surface-card rounded-2xl p-6 pt-7 flex flex-col gap-4 overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-150"
    >
      {/* Colored top bar */}
      <span className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${meta.gradient}`} aria-hidden="true" />

      <div className="flex items-start justify-between">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center text-white shadow-lg`}>
          {meta.icon}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {meta.key}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mt-1.5">{meta.desc}</p>
      </div>

      <ul className="flex flex-col gap-2 mt-1">
        {previews.map((title) => (
          <li key={title} className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
            {title}
          </li>
        ))}
      </ul>

      <button
        onClick={onExplore}
        className="mt-auto inline-flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-semibold brand-gradient text-background glow-green transition-all duration-200 hover:scale-[1.02]"
      >
        Explore Courses <ArrowRight size={15} />
      </button>
    </motion.div>
  )
}

// ─── Course card (Level 2) ───────────────────────────────────────────────────
function CourseCard({
  course,
  index,
  onOpen,
}: {
  course: Course
  index: number
  onOpen: () => void
}) {
  const grad = gradientFor(course.category)
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -5 }}
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen() } }}
      className="group relative surface-card rounded-2xl p-6 pt-7 flex flex-col gap-4 overflow-hidden cursor-pointer hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-150"
    >
      <span className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${grad}`} aria-hidden="true" />

      {/* Header */}
      <div className="flex items-start gap-3">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center text-white flex-shrink-0 shadow-lg`}>
          {course.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-foreground text-base leading-snug group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">{course.subtitle}</p>
        </div>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${tagColor[course.tag]}`}>
          {course.tag}
        </span>
      </div>

      {/* Duration + Investment */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-background/40 border border-border rounded-xl p-3 flex gap-2 items-start">
          <Clock size={14} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Duration</p>
            <p className="text-xs font-semibold text-foreground">{course.duration}</p>
          </div>
        </div>
        <div className="bg-background/40 border border-border rounded-xl p-3 flex gap-2 items-start">
          <IndianRupee size={14} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Investment</p>
            <p className="text-xs font-semibold text-foreground">{course.investment}</p>
          </div>
        </div>
      </div>

      {/* Outcome */}
      <div className="bg-background/40 border border-border rounded-xl p-3 flex gap-2 items-start">
        <TrendingUp size={14} className="text-accent mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Expected Outcome</p>
          <p className="text-xs font-semibold text-foreground">{course.outcome}</p>
        </div>
      </div>

      {/* Highlights */}
      <div>
        <p className="text-[11px] font-semibold text-foreground uppercase tracking-wide mb-2">Key Highlights</p>
        <div className="grid grid-cols-2 gap-1.5">
          {course.highlights.map((h) => (
            <span key={h} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle2 size={12} className="text-primary flex-shrink-0" /> {h}
            </span>
          ))}
        </div>
      </div>

      <span className="mt-auto inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-sm font-semibold border border-primary/40 text-primary group-hover:bg-primary/10 transition-all duration-200">
        View Curriculum <ArrowRight size={14} />
      </span>
    </motion.div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function Services({ initialCategory }: { initialCategory?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const validInitial =
    initialCategory && categoryMeta.some((c) => c.key === initialCategory)
      ? initialCategory
      : null
  const [activeCategory, setActiveCategory] = useState<string | null>(validInitial)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  // Reset back to the category cards when Home / logo is clicked.
  useEffect(() => {
    const reset = () => {
      setActiveCategory(null)
      setSelectedCourse(null)
    }
    window.addEventListener('reset-courses', reset)
    return () => window.removeEventListener('reset-courses', reset)
  }, [])

  const activeCourses = activeCategory
    ? courses.filter((c) => c.category === activeCategory)
    : []

  return (
    <>
      {/* Training Courses Section */}
      <section id="courses" ref={ref} className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, #84cc16 0%, transparent 65%)' }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 mb-4"
            >
              <span className="h-px w-8 bg-primary" />
              <span className="text-primary text-xs font-semibold tracking-widest uppercase">Training Programs</span>
              <span className="h-px w-8 bg-primary" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance"
            >
              Our <span className="brand-gradient-text">Courses</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty"
            >
              {activeCategory
                ? 'Pick a program to view the full curriculum, outcomes, and placement support.'
                : 'Choose a category to explore industry-aligned programs with placement support.'}
            </motion.p>
          </div>

          <AnimatePresence mode="wait">
            {activeCategory === null ? (
              /* ─── Level 1: Category cards ─── */
              <motion.div
                key="categories"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {categoryMeta.map((meta, i) => {
                  const inCat = courses.filter((c) => c.category === meta.key)
                  return (
                    <CategoryCard
                      key={meta.key}
                      meta={meta}
                      count={inCat.length}
                      previews={inCat.map((c) => c.title)}
                      onExplore={() => setActiveCategory(meta.key)}
                      index={i}
                      inView={inView}
                    />
                  )
                })}
              </motion.div>
            ) : (
              /* ─── Level 2: Courses in the selected category ─── */
              <motion.div
                key="courses"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Back bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors w-fit"
                  >
                    <ArrowLeft size={16} /> All Categories
                  </button>
                  <h3 className="text-lg font-semibold text-foreground">
                    <span className="brand-gradient-text">{activeCategory}</span>
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <AnimatePresence mode="popLayout">
                    {activeCourses.map((course, i) => (
                      <CourseCard
                        key={course.title}
                        course={course}
                        index={i}
                        onOpen={() => setSelectedCourse(course)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* IT Services Section */}
      <section id="services" className="py-16 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-primary" />
              <span className="text-primary text-xs font-semibold tracking-widest uppercase">IT Services</span>
              <span className="h-px w-8 bg-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-balance">
              Enterprise & <span className="brand-gradient-text">Corporate Solutions</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {itServices.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group surface-card rounded-2xl p-5 flex flex-col gap-3 hover:border-primary/30 transition-all duration-150"
              >
                <div className="w-10 h-10 rounded-xl brand-gradient flex items-center justify-center text-background">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">{service.desc}</p>
                <Link
                  href="/contact"
                  className="text-primary text-xs font-medium hover:underline"
                >
                  Enquire →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
