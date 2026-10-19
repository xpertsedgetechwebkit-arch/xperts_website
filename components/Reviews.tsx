'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

type Review = {
  name: string
  role: string
  rating: number
  text: string
  source: string
  color: string
}

const reviews: Review[] = [
  {
    name: 'Priya Ramesh',
    role: 'Software Test Engineer @ Cognizant',
    rating: 5,
    source: 'Google',
    color: 'from-[#22c55e] to-[#15803d]',
    text: 'XpertsEdge gave me the confidence and practical skills I needed to crack my first QA interview. The trainers are incredibly patient and knowledgeable. I went from zero testing knowledge to a 4.5 LPA offer in just 4 months!',
  },
  {
    name: 'Karthik Sundaram',
    role: 'MERN Developer @ Mphasis',
    rating: 5,
    source: 'Google',
    color: 'from-[#84cc16] to-[#22c55e]',
    text: 'The MERN Stack course was incredibly well-structured. Real projects, real code reviews, and placement support that actually works. The mock interviews were exactly like the real thing. Highly recommended.',
  },
  {
    name: 'Anjali Nair',
    role: 'Automation QA @ HCL Technologies',
    rating: 5,
    source: 'Google',
    color: 'from-[#a3e635] to-[#84cc16]',
    text: 'I had a 3-year career gap and was worried no one would hire me. XpertsEdge trained me on Playwright and helped me rebuild my confidence. Now I am at HCL and loving my role. Forever grateful to this team.',
  },
  {
    name: 'Mohamed Irfan',
    role: 'Cloud Engineer @ Wipro',
    rating: 5,
    source: 'Google',
    color: 'from-[#22c55e] to-[#0ea5e9]',
    text: 'The AWS training was absolutely top-notch. Hands-on labs every single session, no boring lectures. I cleared the AWS Solutions Architect exam and got placed within 2 months. Worth every rupee.',
  },
  {
    name: 'Deepika Rajan',
    role: 'API Test Engineer @ Tech Mahindra',
    rating: 4,
    source: 'Google',
    color: 'from-[#16a34a] to-[#65a30d]',
    text: 'Great trainers who actually care about your progress. The API Testing course covered everything from Postman basics to RestAssured automation, perfectly aligned with what companies ask in interviews.',
  },
  {
    name: 'Suresh Kumar',
    role: 'Java Full Stack Dev @ DXC Technology',
    rating: 5,
    source: 'Google',
    color: 'from-[#22c55e] to-[#15803d]',
    text: 'Coming from a non-IT background, I was skeptical at first. But the step-by-step approach, from HTML to Spring Boot to deployment, made everything click. The projects are now proudly on my portfolio.',
  },
  {
    name: 'Lavanya Krishnan',
    role: 'DevOps Engineer @ Accenture',
    rating: 4,
    source: 'Google',
    color: 'from-[#84cc16] to-[#22c55e]',
    text: 'The DevOps curriculum is very up-to-date. Docker, Jenkins, GitHub Actions, and cloud deployment basics — all with real hands-on practice. My trainer was always available for doubts even after class.',
  },
  {
    name: 'Vikram Anand',
    role: 'QA Lead @ Barclays',
    rating: 5,
    source: 'Google',
    color: 'from-[#a3e635] to-[#84cc16]',
    text: 'Good overall experience. The training content is solid and the instructors are experienced. I appreciated the flexibility in scheduling — the weekend batch option worked perfectly for me.',
  },
  {
    name: 'Jerlin Mary',
    role: 'Software Engineer @ Zoho',
    rating: 5,
    source: 'Google',
    color: 'from-[#22c55e] to-[#0ea5e9]',
    text: 'They prepared me end-to-end — resume, projects, and interview rounds. The motivation and mentorship I got here directly helped me reach my current position. Thank you, team!',
  },
  {
    name: 'Mohammed Akmal',
    role: 'Frontend Developer @ Freshworks',
    rating: 5,
    source: 'Google',
    color: 'from-[#16a34a] to-[#65a30d]',
    text: 'They are awesome because they actually teach in a practical, interactive way. The doubt-clearing sessions and real assignments made a huge difference in how fast I learned.',
  },
  {
    name: 'Velu Mani',
    role: 'Full Stack Developer @ Comcast',
    rating: 5,
    source: 'Google',
    color: 'from-[#22c55e] to-[#15803d]',
    text: 'The way of teaching is very good and the examples are clear and easy to understand. I now plan to learn Python to upgrade my skills. Git and GitHub sessions were excellent. Suggested it to many friends!',
  },
  {
    name: 'Mohana Priya',
    role: 'Test Analyst @ Infosys',
    rating: 5,
    source: 'Google',
    color: 'from-[#84cc16] to-[#22c55e]',
    text: 'Everyone here genuinely wants to help each other succeed. Beyond the coding, the encouragement and support from trainers and peers kept me going. Truly a great place to learn.',
  },
]

const speeds = [42, 55, 48] // seconds per loop, per column (varied for a natural feel)

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={13}
          className={s <= rating ? 'text-accent fill-accent' : 'text-muted-foreground/40'}
        />
      ))}
    </div>
  )
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <div className="surface-card rounded-2xl p-5 mb-5 border border-primary/10 relative">
      <Quote size={28} className="absolute top-4 right-4 text-primary/10" aria-hidden="true" />
      <StarRating rating={r.rating} />
      <p className="text-sm text-muted-foreground leading-relaxed mt-3 text-pretty">
        {r.text}
      </p>
      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border/40">
        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
          {r.name[0]}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-foreground text-sm leading-tight truncate">{r.name}</p>
          <p className="text-[11px] text-muted-foreground">Rated by @{r.source}</p>
        </div>
      </div>
    </div>
  )
}

function MarqueeColumn({ items, speed, className = '' }: { items: Review[]; speed: number; className?: string }) {
  const loop = [...items, ...items] // duplicate for a seamless loop
  return (
    <div className={`group relative h-full overflow-hidden ${className}`}>
      <div
        className="marquee-vertical flex flex-col group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        {loop.map((r, i) => (
          <ReviewCard key={`${r.name}-${i}`} r={r} />
        ))}
      </div>
    </div>
  )
}

export default function Reviews() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Distribute reviews into 3 vertical columns
  const columns = [0, 1, 2].map((col) => reviews.filter((_, i) => i % 3 === col))

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 50%, #84cc16 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="h-px w-8 bg-primary" />
            <span className="text-primary text-xs font-semibold tracking-widest uppercase">Student Reviews</span>
            <span className="h-px w-8 bg-primary" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance"
          >
            Hear From <span className="brand-gradient-text">Students Like You</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            Real stories from learners who transformed their careers with XpertsEdge.
          </motion.p>
        </div>

        {/* Auto-scrolling review wall */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 h-[560px] md:h-[660px]">
            <MarqueeColumn items={columns[0]} speed={speeds[0]} />
            <MarqueeColumn items={columns[1]} speed={speeds[1]} className="hidden sm:block" />
            <MarqueeColumn items={columns[2]} speed={speeds[2]} className="hidden lg:block" />
          </div>

          {/* Top & bottom fade masks */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 flex flex-wrap justify-center gap-8"
        >
          {[
            { value: '4.8', label: 'Average Rating', sub: 'Out of 5.0' },
            { value: '500+', label: 'Happy Students', sub: 'And growing' },
            { value: '95%', label: 'Recommend Us', sub: 'To their peers' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold brand-gradient-text">{s.value}</p>
              <p className="text-sm text-foreground font-medium mt-0.5">{s.label}</p>
              <p className="text-xs text-muted-foreground">{s.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
