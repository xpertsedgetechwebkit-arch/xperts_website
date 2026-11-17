'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ChevronRight, Film, Play, ShieldCheck, Sparkles, X } from 'lucide-react'
import { studentStories, type StudentStory, type ReviewCategory } from '@/lib/studentStories'

const categories: Array<'All Stories' | ReviewCategory> = [
  'All Stories',
  'Student Experience',
]

/**
 * Compact postcard styling with a rope, a hanging thread and a green clip.
 * Only approved videos are playable. Empty slots have no sample portraits.
 * Keeping this component separate from the original Google Reviews avoids UI regressions.
 */
const cardTilts = ['-rotate-[2deg]', 'rotate-[1.5deg]', '-rotate-[1.5deg]', 'rotate-[2deg]']

function ReviewCard({
  story,
  index,
  onPlay,
  isReady,
}: {
  story: StudentStory
  index: number
  onPlay: (story: StudentStory) => void
  isReady: boolean
}) {
  return (
    <article className={`group relative w-[218px] shrink-0 rounded-[18px] border border-[#dce6d9] bg-[#f4f7f1] p-2.5 pb-3.5 text-[#142719] shadow-[0_16px_40px_rgba(0,0,0,0.34)] transition-transform duration-300 hover:z-20 hover:-translate-y-2 hover:rotate-0 motion-reduce:transition-none motion-reduce:hover:transform-none sm:w-[238px] lg:w-[252px] ${cardTilts[index % cardTilts.length]}`}>
      <span aria-hidden="true" className="pointer-events-none absolute -top-[38px] left-1/2 h-[38px] w-px -translate-x-1/2 bg-gradient-to-b from-[#9cbe92] to-[#7bdc76]" />
      <span aria-hidden="true" className="pointer-events-none absolute -top-[17px] left-1/2 z-10 flex h-8 w-[21px] -translate-x-1/2 items-start justify-center rounded-[5px] border border-emerald-300/70 bg-gradient-to-b from-[#83ec58] to-[#19ab56] pt-[5px] shadow-[0_3px_10px_rgba(0,0,0,0.35)]">
        <span className="h-[5px] w-[5px] rounded-full bg-[#e8ffe3]" />
      </span>

      {isReady ? (
        <button
          type="button"
          onClick={() => onPlay(story)}
          aria-label={`Play ${story.displayName}`}
          className="relative block w-full overflow-hidden rounded-[11px] bg-[#152a1b] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]"
        >
          <span className="relative block aspect-[4/3] overflow-hidden">
            <video
              src={`${story.videoUrl}#t=0.15`}
              preload="metadata"
              muted
              playsInline
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.045]"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" aria-hidden="true" />
            <span className="absolute left-2 top-2 rounded-full border border-white/25 bg-black/65 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
              Student Video
            </span>
            <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#183321] shadow-lg transition-transform duration-300 motion-safe:group-hover:scale-110" aria-hidden="true">
              <Play size={19} fill="currentColor" className="ml-0.5" />
            </span>
          </span>
        </button>
      ) : (
        <div className="relative flex aspect-[4/3] flex-col items-center justify-center gap-3 overflow-hidden rounded-[11px] border border-[#347849]/20 bg-gradient-to-br from-[#1f402b] via-[#122d1e] to-[#0d2117] px-3 text-center">
          <span aria-hidden="true" className="absolute h-40 w-40 rounded-full border border-[#9ce8ad]/15" />
          <span aria-hidden="true" className="absolute h-24 w-24 rounded-full border border-[#9ce8ad]/10" />
          <Film size={30} strokeWidth={1.5} className="relative text-[#a4e5b7]" aria-hidden="true" />
          <span className="relative text-[11px] font-bold uppercase tracking-[0.14em] text-[#e4f8e6]">
            Upcoming Video
          </span>
          <span className="relative text-[10px] text-[#a9c8b2]">Student story coming soon</span>
        </div>
      )}

      <div className="px-1.5 pt-3">
        <h3 className="truncate text-[14px] font-bold leading-5 text-[#162519]">
          {isReady ? story.displayName : 'Upcoming Video'}
        </h3>
        <p className="mt-0.5 truncate text-xs font-medium text-[#637569]">
          {isReady ? story.course : 'New student experiences soon'}
        </p>
      </div>
    </article>
  )
}

/**
 * Static-export friendly video discovery.
 * If the correctly numbered MP4 exists in /public, its card becomes playable.
 * Missing files are shown as "Upcoming Video" and are never opened.
 *
 * This runs only in the browser, so it does not depend on an API or server
 * directory listings. A newly copied video is detected on page refresh.
 */
function useAvailableVideoIds() {
  const [readyIds, setReadyIds] = useState<string[]>([])

  useEffect(() => {
    let mounted = true

    async function checkVideos() {
      const results = await Promise.all(
        studentStories.map(async (story) => {
          try {
            const response = await fetch(story.videoUrl, {
              method: 'HEAD',
              cache: 'no-store',
            })
            const contentType = (response.headers.get('content-type') ?? '').toLowerCase()
            const isVideo = contentType.startsWith('video/') || contentType.includes('octet-stream')
            return response.ok && isVideo ? story.id : null
          } catch {
            return null
          }
        }),
      )

      if (mounted) {
        setReadyIds(results.filter((id): id is string => id !== null))
      }
    }

    void checkVideos()
    return () => {
      mounted = false
    }
  }, [])

  return readyIds
}

function RopeCarousel({ stories, onPlay, label, readyIds }: { stories: StudentStory[]; onPlay: (story: StudentStory) => void; label: string; readyIds: string[] }) {
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
        <div className="relative flex w-max min-w-full items-start justify-center gap-5 px-5 pb-9 pt-[72px] sm:gap-9 sm:px-7 lg:gap-[72px]">
          {/* Copper rope stretches across the entire horizontally scrolling gallery. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[34px] h-[4px] rotate-[-0.25deg] rounded-full opacity-80 shadow-[0_2px_8px_rgba(191,132,77,0.23)]" style={{ background: 'repeating-linear-gradient(105deg, #856042 0px, #d3a878 6px, #795237 12px)' }} />
          {stories.map((story, index) => <ReviewCard key={story.id} story={story} index={index} onPlay={onPlay} isReady={readyIds.includes(story.id)} />)}
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
        <video key={story.id} src={story.videoUrl} poster={story.thumbnail || undefined} controls autoPlay playsInline preload="metadata" className="max-h-[75vh] w-full bg-black object-contain" aria-label={`${story.displayName} video`}>
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
  const readyIds = useAvailableVideoIds()
  return (
    <section id="student-video-reviews" className="relative overflow-hidden bg-background py-16 sm:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_50%_0%,rgba(34,197,94,0.065),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-7 max-w-3xl text-center">
          <p className="mb-3 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary"><span className="h-px w-7 bg-primary"/>Video Stories<span className="h-px w-7 bg-primary"/></p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Moments worth <span className="brand-gradient-text">sharing.</span></h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">Watch genuine student experiences and inspiring learner stories.</p>
        </div>
        <RopeCarousel stories={studentStories.filter((story) => readyIds.includes(story.id)).slice(0, 4)} onPlay={setSelected} readyIds={readyIds} label="Available student videos" />
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
  { number: '01', image: '/student-reviews/offers/offer-01.jpeg', heading: 'Playwright Automation Testing', note: 'Offer letter highlight' },
  { number: '02', image: '/student-reviews/offers/offer-02.jpeg', heading: 'Automation Testing', note: 'Offer letter highlight' },
  { number: '03', image: '/student-reviews/offers/offer-03.jpeg', heading: 'QA Engineer', note: 'Offer letter highlight' },
  { number: '04', image: '/student-reviews/offers/offer-04.jpeg', heading: 'Automation Testing', note: 'Offer letter highlight' },
  { number: '05', image: '/student-reviews/offers/offer-05.jpeg', heading: 'Software Engineer', note: 'Offer letter highlight' },
  { number: '06', image: '/student-reviews/offers/offer-06.jpeg', heading: 'AI Engineer', note: 'Offer letter highlight' },
  { number: '07', image: '/student-reviews/offers/offer-07.jpeg', heading: 'Playwright Automation Testing', note: 'Offer letter highlight' },
  { number: '08', image: '/student-reviews/offers/offer-08.jpeg', heading: 'Automation Testing', note: 'Offer letter highlight' },
]

function OfferLetterGallery() {
  const [selected, setSelected] = useState<(typeof offerCards)[number] | null>(null)
  useEffect(() => {
    if (!selected) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [selected])

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {offerCards.map((offer) => (
          <article key={offer.number} className="group overflow-hidden rounded-2xl border border-primary/15 bg-[#131914] p-3 transition-colors hover:border-primary/40 sm:p-4">
            <button type="button" onClick={() => setSelected(offer)} aria-label={`View ${offer.heading} offer image ${offer.number}`} className="block w-full rounded-xl text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-white">
                <Image src={offer.image} alt={`${offer.heading} offer letter image ${offer.number}; selected personal details obscured`} fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 23vw" className="object-contain transition-transform duration-300 group-hover:scale-[1.02]" />
              </div>
              <h3 className="mt-4 text-sm font-semibold leading-6 text-foreground">{offer.heading}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{offer.note} · View image</p>
            </button>
          </article>
        ))}
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null) }} role="presentation" className="fixed inset-0 z-[250] flex items-center justify-center bg-black/90 p-4 backdrop-blur-lg">
            <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }} role="dialog" aria-modal="true" aria-label={`${selected.heading} offer letter`} className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-primary/30 bg-[#101510]">
              <div className="flex items-center justify-between gap-3 px-4 py-3"><p className="truncate text-sm font-semibold text-foreground">{selected.heading}</p><button type="button" autoFocus onClick={() => setSelected(null)} aria-label="Close offer letter" className="rounded-full border border-white/20 p-2 text-white hover:bg-white/10"><X size={18}/></button></div>
              <div className="min-h-0 overflow-y-auto bg-[#0b0f0c] p-2 text-center"><Image src={selected.image} alt={`${selected.heading} offer letter image`} width={1080} height={1650} sizes="(max-width: 768px) 95vw, 720px" className="mx-auto h-auto max-w-full" /></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function StudentReviewsPageContent() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('All Stories')
  const { setSelected, dialog } = useVideoDialog()
  const readyIds = useAvailableVideoIds()
  const visibleStories = studentStories.filter((story) => readyIds.includes(story.id) && (activeCategory === 'All Stories' || story.course === activeCategory))
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
              <div className="flex items-start gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary"><Film size={23}/></div><div><p className="font-semibold text-foreground">Student-first storytelling</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Only available, approved student videos are displayed. Browse student-approved offer letter highlights below.</p></div></div>
              <div className="mt-5 flex flex-wrap gap-2"><span className="rounded-full border border-primary/20 px-3 py-1 text-xs text-primary">Video reviews</span><span className="rounded-full border border-primary/20 px-3 py-1 text-xs text-primary">Career milestones</span><span className="rounded-full border border-primary/20 px-3 py-1 text-xs text-primary">Student consent</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="video-stories" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-10 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div><span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">The Review Wall</span><h2 className="mt-3 text-3xl font-bold sm:text-4xl">Student <span className="brand-gradient-text">Video Stories</span></h2><p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">Explore approved student video stories and experiences.</p></div>
          <p className="text-sm text-muted-foreground">Available videos <span className="font-semibold text-foreground">{visibleStories.filter((story) => readyIds.includes(story.id)).length}</span> / {visibleStories.length}</p>
        </div>
        <div className="mb-9 flex flex-wrap gap-2" aria-label="Filter reviews by category">
          {categories.map((category) => <button key={category} type="button" onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category} className={`rounded-full border px-4 py-2.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-primary sm:text-sm ${activeCategory === category ? 'border-primary bg-primary text-background' : 'border-primary/20 bg-[#121512] text-muted-foreground hover:border-primary/50 hover:text-foreground'}`}>{category}</button>)}
        </div>
        <RopeCarousel stories={visibleStories} onPlay={setSelected} readyIds={readyIds} label="Available student video gallery" />
      </section>

      <section id="student-offers" className="relative overflow-hidden border-y border-primary/10 bg-[#0c100d] py-20 sm:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -left-36 top-0 h-96 w-96 rounded-full bg-lime-400/[0.04] blur-[90px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Beyond the Classroom</span><h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">Student Offers <span className="brand-gradient-text">& Milestones</span></h2><p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">Browse student offer letter highlights and career milestones.</p></div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/5 px-4 py-2 text-xs font-medium text-amber-200"><ShieldCheck size={15}/> Student offer highlights</span>
          </div>
          <OfferLetterGallery />
          <p className="mt-7 text-center text-xs leading-relaxed text-muted-foreground">Student details have been partially obscured in the supplied images. Publication requires the student’s permission; contact us if a document needs to be updated or removed.</p>
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
