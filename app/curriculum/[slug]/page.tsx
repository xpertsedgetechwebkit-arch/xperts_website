import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  Clock, MonitorSmartphone, Download, CheckCircle2, GraduationCap,
  ArrowRight, ArrowLeft, BookOpen, Layers, Target,
} from 'lucide-react'
import RegisterTrigger from '@/components/RegisterTrigger'
import { curricula, curriculumSlugs } from '@/lib/curriculum'

const siteUrl = 'https://www.xpertsedgetech.com'

export function generateStaticParams() {
  return curriculumSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const c = curricula[slug]
  if (!c) return {}
  const title = `${c.title} Curriculum`
  const description =
    c.overview ||
    `Explore the full ${c.title} course curriculum, modules and topics at XpertsEdge Technologies.`
  return {
    title,
    description,
    alternates: { canonical: `/curriculum/${slug}` },
    openGraph: {
      title: `${title} | XpertsEdge Technologies`,
      description,
      url: `${siteUrl}/curriculum/${slug}`,
      type: 'article',
    },
  }
}

export default async function CurriculumPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const c = curricula[slug]
  if (!c) notFound()

  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${c.title} Course`,
    description: c.overview,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'XpertsEdge Technologies',
      sameAs: siteUrl,
    },
    url: `${siteUrl}/curriculum/${slug}`,
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border pt-28 pb-16">
        <div className="absolute inset-0 -z-10 opacity-40 bg-[radial-gradient(60%_60%_at_50%_0%,var(--primary)/15,transparent)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/training-services"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft size={14} /> All Courses
          </Link>

          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            <GraduationCap size={14} /> Course Curriculum
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            <span className="brand-gradient-text">{c.title}</span>
          </h1>
          {c.tagline && (
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-3xl text-pretty">
              {c.tagline}
            </p>
          )}

          {/* Meta chips */}
          <div className="flex flex-wrap gap-3 mt-6">
            {c.duration && (
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm">
                <Clock size={15} className="text-primary" /> {c.duration}
              </span>
            )}
            {c.mode && (
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm">
                <MonitorSmartphone size={15} className="text-primary" /> {c.mode}
              </span>
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold brand-gradient text-background glow-green text-sm"
            >
              Register for Demo <ArrowRight size={15} />
            </Link>
            <RegisterTrigger
              ariaLabel="Get the curriculum PDF"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold border border-primary/40 text-primary text-sm hover:bg-primary/10 transition-all"
            >
              <Download size={15} /> Download PDF
            </RegisterTrigger>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col gap-16">
        {/* Overview */}
        {c.overview && (
          <section>
            <SectionHeading icon={<BookOpen size={18} />} title="Course Overview" />
            <p className="text-muted-foreground leading-relaxed max-w-3xl">{c.overview}</p>
          </section>
        )}

        {/* What you'll learn + Audience */}
        {(c.learn.length > 0 || c.audience.length > 0) && (
          <section className="grid md:grid-cols-2 gap-10">
            {c.learn.length > 0 && (
              <div>
                <SectionHeading icon={<CheckCircle2 size={18} />} title="What You Will Learn" />
                <ul className="flex flex-col gap-2.5">
                  {c.learn.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 size={15} className="text-primary mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {c.audience.length > 0 && (
              <div>
                <SectionHeading icon={<Target size={18} />} title="Who Is This For" />
                <ul className="flex flex-col gap-2.5">
                  {c.audience.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <ArrowRight size={15} className="text-accent mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* Topics */}
        {c.topics.length > 0 && (
          <section>
            <SectionHeading icon={<Layers size={18} />} title="Topics Covered" />
            <div className="grid sm:grid-cols-2 gap-5">
              {c.topics.map((group, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors"
                >
                  <h3 className="font-semibold text-foreground mb-3">{group.group}</h3>
                  <ul className="flex flex-col gap-2">
                    {group.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 size={13} className="text-primary mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Modules */}
        {c.modules.length > 0 && (
          <section>
            <SectionHeading icon={<GraduationCap size={18} />} title="Course Modules" />
            <div className="grid sm:grid-cols-2 gap-5">
              {c.modules.map((m, i) => (
                <div key={i} className="relative rounded-2xl border border-border bg-card p-5">
                  <span className="absolute -top-3 left-5 text-[11px] font-bold uppercase tracking-widest brand-gradient text-background px-2.5 py-0.5 rounded-full">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-semibold text-foreground mb-1.5 mt-1">{m.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Outcomes */}
        {c.outcomes.length > 0 && (
          <section>
            <SectionHeading icon={<Target size={18} />} title="Career Outcomes" />
            <ul className="flex flex-col gap-2.5">
              {c.outcomes.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 size={15} className="text-primary mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="rounded-3xl border border-border bg-card p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-balance">
            Ready to start <span className="brand-gradient-text">{c.title}</span>?
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Book a free demo class and talk to our mentors about batches, fees, and placement support.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-7">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold brand-gradient text-background glow-green text-sm"
            >
              Register for Demo <ArrowRight size={15} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold border border-primary/40 text-primary text-sm hover:bg-primary/10 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}

function SectionHeading({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <h2 className="flex items-center gap-2.5 text-xl sm:text-2xl font-bold mb-6">
      <span className="flex items-center justify-center w-9 h-9 rounded-xl brand-gradient text-background">
        {icon}
      </span>
      {title}
    </h2>
  )
}
