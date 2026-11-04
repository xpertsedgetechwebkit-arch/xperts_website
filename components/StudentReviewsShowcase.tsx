'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, ChevronRight, FileBadge2, Film, Play, ShieldCheck, Sparkles, X } from 'lucide-react'
import { studentStories, type StudentStory, type ReviewCategory } from '@/lib/studentStories'

const categories: Array<'All Stories' | ReviewCategory> = [
  'All Stories', 'Software Testing', 'Full Stack', 'Cloud & DevOps', 'Career Growth',
]

/**
 * Compact postcard styling with a rope, a hanging thread and a green clip.
 * Photo assets are illustrations for local demos, NOT actual student photos.
 * Keeping this component separate from the original Google Reviews avoids UI regressions.
 */
const cardTilts = ['-rotate-[2deg]', 'rotate-[1.5deg]', '-rotate-[1.5deg]', 'rotate-[2deg]']

function ReviewCard({ story, index, onPlay }: { story: StudentStory; index: number; onPlay: (story: StudentStory) => void }) {
  return (
    <article className={`group relative w-[218px] shrink-0 rounded-[18px] border border-[#dce6d9] bg-[#f4f7f1] p-2.5 pb-3.5 text-[#142719] shadow-[0_16px_40px_rgba(0,0,0,0.34)] transition-transform duration-300 hover:z-20 hover:-translate-y-2 hover:rotate-0 sm:w-[238px] lg:w-[252px] ${cardTilts[index % cardTilts.length]}`}>
      {/* The clip overlaps the card, while the thread connects to the rope above. */}
      <span aria-hidden="true" className="pointer-events-none absolute -top-[38px] left-1/2 h-[38px] w-px -translate-x-1/2 bg-gradient-to-b from-[#9cbe92] to-[#7bdc76]" />
      <span aria-hidden="true" className="pointer-events-none absolute -top-[17px] left-1/2 z-10 flex h-8 w-[21px] -translate-x-1/2 items-start justify-center rounded-[5px] border border-emerald-300/70 bg-gradient-to-b from-[#83ec58] to-[#19ab56] pt-[5px] shadow-[0_3px_10px_rgba(0,0,0,0.35)]">
        <span className="h-[5px] w-[5px] rounded-full bg-[#e8ffe3]" />
      </span>
      <button
        type="button"
        onClick={() => onPlay(story)}
        aria-label={`Play ${story.displayName} ${story.isDemo ? 'demo' : 'review'} video`}
        className="relative block w-full overflow-hidden rounded-[11px] bg-[#152a1b] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]"
      >
        <span className="relative block aspect-[4/3] overflow-hidden">
          <Image
            src={story.thumbnail}
            alt={story.isDemo ? `Sample visual for ${story.course}; not an actual student` : `${story.displayName} review thumbnail`}
            fill
            sizes="(max-width: 640px) 218px, (max-width: 1024px) 238px, 252px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.045]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
          <span className="absolute left-2 top-2 rounded-full border border-white/25 bg-black/65 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
            {story.isDemo ? 'Sample video' : 'Student video'}
          </span>
          <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#183321] shadow-lg transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
            <Play size={19} fill="currentColor" className="ml-0.5" />
          </span>
        </span>
      </button>
      <div className="px-1.5 pt-3">
        <h3 className="truncate text-[14px] font-bold leading-5 text-[#162519]">{story.displayName}</h3>
        <p className="mt-0.5 truncate text-xs font-medium text-[#637569]">{story.course}</p>
      </div>
    </article>
  )
}

function RopeCarousel({ stories, onPlay, label }: { stories: StudentStory[]; onPlay: (story: StudentStory) => void; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollCards = (direction: -1 | 1) => {
    const track = trackRef.current
    if (!track) return
    // Each click moves a small group of medium-size cards; touch swiping also works.
    track.scrollBy({ left: direction * Math.min(track.clientWidth * 0.8, 560), behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div className="mb-1 flex items-center justify-end gap-2 px-1">
        <span className="mr-auto text-xs text-muted-foreground">Swipe or use arrows to explore</span>
        <button type="button" onClick={() => scrollCards(-1)} aria-label="Scroll reviews left" className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-background focus-visible:outline-2 focus-visible:outline-primary"><ArrowLeft size={16} /></button>
        <button type="button" onClick={() => scrollCards(1)} aria-label="Scroll reviews right" className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-background focus-visible:outline-2 focus-visible:outline-primary"><ArrowRight size={16} /></button>
      </div>
      <div
        ref={trackRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="overflow-x-auto overscroll-x-contain scroll-smooth pb-2 [scrollbar-width:thin] [scrollbar-color:#346d3a_transparent] focus-visible:outline-2 focus-visible:outline-primary"
      >
        <div className="relative flex w-max min-w-full items-start gap-5 px-5 pb-9 pt-[72px] sm:gap-7 sm:px-7 lg:gap-8">
          {/* Copper rope stretches across the entire horizontally scrolling gallery. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[34px] h-[4px] rotate-[-0.25deg] rounded-full opacity-80 shadow-[0_2px_8px_rgba(191,132,77,0.23)]" style={{ background: 'repeating-linear-gradient(105deg, #856042 0px, #d3a878 6px, #795237 12px)' }} />
          {stories.map((story, index) => <ReviewCard key={story.id} story={story} index={index} onPlay={onPlay} />)}
        </div>
      </div>
    </div>
  )
}

function VideoDialog({ story, onClose }: { story: StudentStory; onClose: () => void }) {
  const closeButton = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    const prevFocus = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
      prevFocus?.focus()
    }
  }, [onClose])
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/90 p-4 backdrop-blur-xl sm:p-8"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.98 }}
        role="dialog" aria-modal="true" aria-label={`${story.displayName} video player`}
        className="w-full max-w-4xl overflow-hidden rounded-2xl border border-primary/30 bg-[#101510] shadow-2xl shadow-black/60"
      >
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-foreground">{story.displayName}</h3>
            <p className="text-xs text-muted-foreground">{story.isDemo ? 'Sample animation — replace with approved student video' : story.course}</p>
          </div>
          <button ref={closeButton} onClick={onClose} aria-label="Close video" className="rounded-full border border-white/15 p-2 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-primary"><X size={19}/></button>
        </div>
        <video key={story.id} src={story.videoUrl} poster={story.thumbnail} controls autoPlay playsInline preload="metadata" className="aspect-video w-full bg-black" aria-label={`${story.displayName} video`}>
          Your browser does not support HTML video playback.
        </video>
        {story.isDemo && <p className="px-5 py-3 text-xs text-amber-200/80">This is a temporary motion-graphic sample, not an actual student testimonial.</p>}
      </motion.div>
    </motion.div>
  )
}

function useVideoDialog() {
  const [selected, setSelected] = useState<StudentStory | null>(null)
  return { selected, setSelected, dialog: <AnimatePresence>{selected && <VideoDialog story={selected} onClose={() => setSelected(null)} />}</AnimatePresence> }
}

export function StudentReviewsHome() {
  const { setSelected, dialog } = useVideoDialog()
  return (
    <section id="student-video-reviews" className="relative overflow-hidden bg-background py-16 sm:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_50%_0%,rgba(34,197,94,0.065),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-7 max-w-3xl text-center">
          <p className="mb-3 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary"><span className="h-px w-7 bg-primary"/>Video Stories<span className="h-px w-7 bg-primary"/></p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Moments worth <span className="brand-gradient-text">sharing.</span></h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">A new space for student video experiences. The clips and visuals shown here are temporary demos.</p>
        </div>
        <RopeCarousel stories={studentStories.slice(0, 4)} onPlay={setSelected} label="Four sample student video cards" />
        <div className="mt-1 flex justify-center">
          <Link href="/student-reviews" className="group inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-background focus-visible:outline-2 focus-visible:outline-primary">
            See More Student Reviews <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
      {dialog}
    </section>
  )
}

const offerCards = [
  { number: '01', heading: 'Offer Letter Preview', note: 'Approved student offer letters can be displayed here.', tint: 'from-emerald-500/20' },
  { number: '02', heading: 'Placement Milestone', note: 'Show the verified offer and placement journey.', tint: 'from-lime-500/20' },
  { number: '03', heading: 'Career Achievement', note: 'Add a student-approved achievement document.', tint: 'from-teal-500/20' },
]

export function StudentReviewsPageContent() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('All Stories')
  const { setSelected, dialog } = useVideoDialog()
  const visibleStories = activeCategory === 'All Stories' ? studentStories : studentStories.filter((s) => s.course === activeCategory)
  return (
    <main className="min-h-screen overflow-x-hidden bg-background pt-20 text-foreground">
      <section className="relative overflow-hidden border-b border-primary/10 pb-16 pt-20 sm:pb-24 sm:pt-28">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-40 h-[540px] w-[540px] rounded-full bg-primary/[0.07] blur-[110px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary"><Sparkles size={14}/> Student Stories & Achievements</div>
          <div className="grid gap-9 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">Every learner.<br/><span className="brand-gradient-text">A story worth sharing.</span></h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">An evolving collection of video reviews, learning experiences and student career milestones from the XpertsEdge community.</p>
            </div>
            <div className="rounded-2xl border border-primary/20 bg-[#101a13] p-6 sm:p-7">
              <div className="flex items-start gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary"><Film size={23}/></div><div><p className="font-semibold text-foreground">Student-first storytelling</p><p className="mt-2 text-sm leading-6 text-muted-foreground">This preview uses sample videos and sample offer cards. Replace them with verified student media before production launch.</p></div></div>
              <div className="mt-5 flex flex-wrap gap-2"><span className="rounded-full border border-primary/20 px-3 py-1 text-xs text-primary">Video reviews</span><span className="rounded-full border border-primary/20 px-3 py-1 text-xs text-primary">Career milestones</span><span className="rounded-full border border-primary/20 px-3 py-1 text-xs text-primary">Student consent</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="video-stories" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-10 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div><span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">The Review Wall</span><h2 className="mt-3 text-3xl font-bold sm:text-4xl">Student <span className="brand-gradient-text">Video Stories</span></h2><p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">Choose a learning track, then explore the hanging video cards. All current entries are demo previews.</p></div>
          <p className="text-sm text-muted-foreground">Showing <span className="font-semibold text-foreground">{visibleStories.length}</span> {visibleStories.length === 1 ? 'story' : 'stories'}</p>
        </div>
        <div className="mb-9 flex flex-wrap gap-2" aria-label="Filter reviews by category">
          {categories.map((category) => <button key={category} type="button" onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category} className={`rounded-full border px-4 py-2.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-primary sm:text-sm ${activeCategory === category ? 'border-primary bg-primary text-background' : 'border-primary/20 bg-[#121512] text-muted-foreground hover:border-primary/50 hover:text-foreground'}`}>{category}</button>)}
        </div>
        <RopeCarousel stories={visibleStories} onPlay={setSelected} label="Student video gallery" />
      </section>

      <section id="student-offers" className="relative overflow-hidden border-y border-primary/10 bg-[#0c100d] py-20 sm:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -left-36 top-0 h-96 w-96 rounded-full bg-lime-400/[0.04] blur-[90px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Beyond the Classroom</span><h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">Student Offers <span className="brand-gradient-text">& Milestones</span></h2><p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">A dedicated space for verified offer letters and student-approved career achievements.</p></div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/5 px-4 py-2 text-xs font-medium text-amber-200"><ShieldCheck size={15}/> Sample layouts only</span>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {offerCards.map((offer) => <article key={offer.number} className="group overflow-hidden rounded-2xl border border-primary/15 bg-[#131914] p-5 transition-colors hover:border-primary/40 sm:p-6">
              <div className={`relative flex aspect-[5/4] flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${offer.tint} via-[#132219] to-[#0c1110] p-6`}>
                <span className="absolute right-[-41px] top-7 rotate-45 border-y border-white/15 bg-amber-400/10 px-12 py-1 text-[11px] font-bold tracking-[0.2em] text-amber-200">SAMPLE</span>
                <div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary"><FileBadge2 size={24}/></div><div><p className="text-xs font-bold tracking-[0.14em] text-white/90">XPERTSEDGE</p><p className="text-[10px] text-white/50">STUDENT MILESTONES</p></div></div>
                <div className="space-y-3"><p className="text-2xl font-bold text-white/90">Achievement<br/>Preview</p><div className="h-px w-4/5 bg-white/20"/><div className="h-1.5 w-3/5 rounded-full bg-white/15"/><div className="h-1.5 w-2/5 rounded-full bg-white/15"/></div>
                <div className="flex items-center gap-2 text-xs text-primary"><Check size={14}/> Verified document placeholder</div>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{offer.heading}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{offer.note}</p>
            </article>)}
          </div>
          <p className="mt-7 text-center text-xs leading-relaxed text-muted-foreground">Only publish offer letters after receiving student permission. Blur personal addresses, phone numbers, salaries and other private information.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-[#172b1e] via-[#111b13] to-[#0b110d] px-7 py-11 sm:px-12 sm:py-14">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl"/>
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div><span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Your next chapter</span><h2 className="mt-3 max-w-2xl text-2xl font-bold text-foreground sm:text-3xl">Ready to create your own story?</h2><p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">Explore hands-on courses, build career-ready skills and speak with our training team.</p></div>
            <Link href="/demo" className="inline-flex shrink-0 items-center gap-2 rounded-full brand-gradient px-7 py-3.5 text-sm font-bold text-background transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-primary">Book a Free Demo <ChevronRight size={19}/></Link>
          </div>
        </div>
      </section>
      {dialog}
    </main>
  )
}
