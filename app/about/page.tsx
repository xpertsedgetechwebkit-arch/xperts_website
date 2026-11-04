import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  CheckCircle2,
  Code2,
  Compass,
  GraduationCap,
  Layers3,
  Lightbulb,
  Target,
  Workflow,
} from 'lucide-react'

const aboutUrl = 'https://www.xpertsedgetech.com/about/'
const description =
  'Get to know XpertsEdge Technologies: our approach to practical technology education, our mission, and how we help learners build industry-focused skills.'

export const metadata: Metadata = {
  title: 'About Us — Our Mission, Vision & Approach',
  description,
  alternates: { canonical: aboutUrl },
  openGraph: {
    title: 'About XpertsEdge Technologies — Learn. Build. Grow.',
    description,
    url: aboutUrl,
    type: 'website',
    siteName: 'XpertsEdge Technologies',
    locale: 'en_IN',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'XpertsEdge Technologies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About XpertsEdge Technologies',
    description,
    images: ['/logo.png'],
  },
}

const strengths = [
  {
    icon: BookOpenCheck,
    title: 'Learn with clarity',
    description:
      'Understand fundamentals before moving into tools, techniques and real-world applications.',
    index: '01',
  },
  {
    icon: Code2,
    title: 'Build through practice',
    description:
      'Turn concepts into working skills through hands-on exercises and project-based learning.',
    index: '02',
  },
  {
    icon: Compass,
    title: 'Grow with direction',
    description:
      'Connect technical knowledge with career goals, industry expectations and continuous improvement.',
    index: '03',
  },
]

const areas = [
  'Software Testing',
  'Test Automation',
  'API Testing',
  'Programming',
  'Cloud Technologies',
  'Full Stack Development',
]

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Dedicated About page hero; no homepage section duplication or breadcrumb. */}
      <section className="relative isolate overflow-hidden border-b border-primary/10 pt-20 pb-20 sm:pt-24 lg:pt-28 lg:pb-28">
        <div
          className="pointer-events-none absolute -top-52 right-[-10%] h-[560px] w-[560px] rounded-full bg-primary/[0.09] blur-[120px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-72 left-[-14%] h-[580px] w-[580px] rounded-full bg-secondary/[0.05] blur-[120px]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
            <div>
              <div className="mb-7 flex items-center gap-3">
                <span className="h-px w-8 bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                  Get to know XpertsEdge
                </span>
              </div>

              <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[3.7rem]">
                Where learning becomes{' '}
                <span className="brand-gradient-text">real capability.</span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                We believe strong careers are built by understanding the fundamentals,
                practicing consistently and learning how technology works in real
                environments.
              </p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                At XpertsEdge Technologies, we connect industry-focused training,
                practical project exposure and expert guidance to help learners
                move forward with purpose.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="#approach"
                  className="inline-flex items-center gap-2 rounded-full brand-gradient px-6 py-3 text-sm font-semibold text-background shadow-lg shadow-primary/10 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Discover our approach <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="/training-services"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/60 hover:text-primary"
                >
                  Explore training <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* CSS-only visual: no new image assets, scripts or dependencies. */}
            <div className="relative">
              <div className="absolute -inset-2 rounded-[2rem] bg-primary/[0.06] blur-2xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-primary/25 bg-[#101610] p-6 shadow-2xl shadow-black/30 sm:p-8">
                <div
                  className="pointer-events-none absolute -right-14 -top-20 h-64 w-64 rounded-full border border-primary/20"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute -right-28 -top-32 h-80 w-80 rounded-full border border-primary/10"
                  aria-hidden="true"
                />

                <div className="relative flex items-center justify-between border-b border-primary/15 pb-6">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
                    Our perspective
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                    <Lightbulb size={20} aria-hidden="true" />
                  </span>
                </div>

                <p className="relative mt-7 max-w-sm text-2xl font-semibold leading-snug text-foreground sm:text-3xl">
                  More than lessons.
                  <br />
                  <span className="brand-gradient-text">Skills that move you forward.</span>
                </p>

                <div className="relative mt-9 space-y-3">
                  {[
                    { icon: Target, title: 'Clear foundations', label: 'Understand the why' },
                    { icon: Workflow, title: 'Hands-on experience', label: 'Practice the how' },
                    { icon: GraduationCap, title: 'Continuous growth', label: 'Keep moving forward' },
                  ].map((item, index) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={item.title}
                        className="flex items-center gap-4 rounded-xl border border-primary/10 bg-white/[0.035] px-4 py-3.5"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon size={21} aria-hidden="true" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-foreground">{item.title}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{item.label}</p>
                        </div>
                        <span className="font-mono text-xs text-primary/70">0{index + 1}</span>
                      </div>
                    )
                  })}
                </div>

                <div className="relative mt-7 flex items-center gap-2 border-t border-primary/15 pt-5 text-xs text-muted-foreground">
                  <CheckCircle2 size={15} className="shrink-0 text-primary" aria-hidden="true" />
                  Practical learning. Purposeful progress.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated About page content only; the homepage About slider stays on the homepage. */}
      <section id="approach" className="relative border-t border-primary/10 bg-[#0e0f0e] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-11 max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                How we help you grow
              </span>
            </div>
            <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              A learning journey built around <span className="brand-gradient-text">doing.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Our approach connects understanding, real practice and progress you can build on.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {strengths.map((item) => {
              const Icon = item.icon
              return (
                <article
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border border-primary/15 bg-card p-6 transition-colors duration-200 hover:border-primary/40 sm:p-7"
                >
                  <div className="mb-8 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                      <Icon size={23} aria-hidden="true" />
                    </div>
                    <span className="font-mono text-sm text-primary/60">{item.index}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="mt-7 h-px w-12 bg-primary/50 transition-all duration-200 group-hover:w-20" aria-hidden="true" />
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Areas of learning
              </span>
            </div>
            <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              Technology skills for <span className="brand-gradient-text">real work.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              From software quality and programming to cloud technologies,
              our training areas focus on practical understanding and real-world relevance.
            </p>
            <Link
              href="/training-services"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-secondary"
            >
              View our training services <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {areas.map((area, index) => (
              <div
                key={area}
                className="flex items-center gap-3 rounded-xl border border-primary/15 bg-card px-4 py-4 sm:px-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {index % 2 === 0 ? <Layers3 size={17} aria-hidden="true" /> : <Code2 size={17} aria-hidden="true" />}
                </span>
                <span className="text-sm font-medium text-foreground">{area}</span>
                <CheckCircle2 className="ml-auto shrink-0 text-primary/60" size={16} aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-4 sm:px-6 lg:px-8 lg:pb-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-primary/25 bg-[#101910] px-6 py-12 text-center sm:px-10 lg:py-16">
          <div className="pointer-events-none absolute -left-20 -top-32 h-80 w-80 rounded-full bg-primary/[0.12] blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-secondary/[0.08] blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Start your next chapter
            </span>
            <h2 className="mt-5 text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              Ready to turn learning into progress?
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Explore a training path or speak with our team to find the right next step.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-full brand-gradient px-6 py-3 text-sm font-semibold text-background transition-transform duration-200 hover:-translate-y-0.5"
              >
                Book a free demo <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/40 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Contact us <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
