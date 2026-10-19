'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin, Clock, Briefcase, GraduationCap, ArrowRight,
  Send, CheckCircle, User, Mail, Phone, Award, Link2,
} from 'lucide-react'
import { submitLead } from '@/lib/web3forms'
import { filterName, filterPhone, filterEmail, phoneAttrs, hasLetterAttrs, isResumeLinkValid } from '@/lib/formFilters'

const openings = [
  {
    title: 'Software Testing Trainer',
    type: 'Full-time',
    location: 'Chennai, India',
    experience: '2–5 Years',
    skills: ['Manual Testing', 'Selenium', 'JIRA', 'Agile'],
    desc: 'Deliver engaging hands-on training sessions on software testing fundamentals and automation frameworks.',
  },
  {
    title: 'Full Stack Development Trainer',
    type: 'Full-time',
    location: 'Chennai, India',
    experience: '3+ Years',
    skills: ['React', 'Node.js', 'Java', 'Spring Boot'],
    desc: 'Train students on modern full-stack technologies with project-based learning and interview preparation.',
  },
  {
    title: 'Cloud & DevOps Trainer',
    type: 'Full-time',
    location: 'Chennai / Remote',
    experience: '3–6 Years',
    skills: ['AWS', 'Azure', 'Docker', 'Jenkins'],
    desc: 'Mentor learners on cloud architecture, DevOps pipelines, and industry-standard deployment practices.',
  },
  {
    title: 'Business Development Executive',
    type: 'Full-time',
    location: 'Chennai, India',
    experience: '1–3 Years',
    skills: ['Sales', 'EdTech', 'Communication', 'CRM'],
    desc: 'Drive student enrollment through outreach, counselling, and relationship management.',
  },
  {
    title: 'Content & Social Media Executive',
    type: 'Part-time / Full-time',
    location: 'Chennai / Remote',
    experience: '1–2 Years',
    skills: ['Content Writing', 'Canva', 'LinkedIn', 'Instagram'],
    desc: 'Create compelling content across platforms to grow the XpertsEdge brand and community.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const positions = [...openings.map((o) => o.title), 'General Application']

export default function CareersPage() {
  const applyRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    location: '',
    position: '',
    resumeLink: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let { value } = e.target
    if (e.target.name === 'name') value = filterName(value)
    if (e.target.name === 'phone') value = filterPhone(value)
    if (e.target.name === 'email') value = filterEmail(value)
    setForm((prev) => ({ ...prev, [e.target.name]: value }))
  }

  const applyFor = (title: string) => {
    setForm((prev) => ({ ...prev, position: title }))
    applyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!isResumeLinkValid(form.resumeLink)) {
      setError('Please enter a valid Google Drive or LinkedIn link (starting with https://).')
      return
    }

    setSubmitting(true)

    const position = form.position || 'General Application'
    const message = [
      `Position: ${position}`,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Qualification: ${form.qualification}`,
      `Current Location: ${form.location}`,
      `Resume Link: ${form.resumeLink.trim()}`,
    ].join('\n')

    try {
      await submitLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        course: position,
        message,
        subject: `Job Application — ${position} — ${form.name}`,
      })
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all'

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
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
              Join Our Team
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance mb-4">
              Build Your Career at{' '}
              <span className="brand-gradient-text">XpertsEdge</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
              We&apos;re a passionate team building the next generation of tech talent. If you love
              education, technology, and making a real impact — we&apos;d love to have you on board.
            </p>
          </motion.div>

          {/* Values */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid sm:grid-cols-3 gap-4 mb-14"
          >
            {[
              { icon: <GraduationCap size={18} />, title: 'Grow with Us', desc: 'Continuous learning and professional development' },
              { icon: <Briefcase size={18} />, title: 'Meaningful Work', desc: 'Directly impact hundreds of careers' },
              { icon: <MapPin size={18} />, title: 'Flexible Options', desc: 'On-site, hybrid, and remote opportunities' },
            ].map((v) => (
              <div key={v.title} className="surface-card rounded-2xl p-5 flex gap-3 items-start border border-primary/10">
                <div className="w-9 h-9 rounded-xl brand-gradient flex items-center justify-center text-background flex-shrink-0">{v.icon}</div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{v.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{v.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Openings */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Current <span className="brand-gradient-text">Openings</span>
            </h2>

            <div className="flex flex-col gap-4">
              {openings.map((job, i) => (
                <motion.div
                  key={job.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  whileHover={{ y: -2 }}
                  className="surface-card rounded-2xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors">{job.title}</h3>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border text-primary bg-primary/10 border-primary/20">{job.type}</span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {job.experience}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{job.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {job.skills.map((s) => (
                          <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground">{s}</span>
                        ))}
                      </div>
                    </div>
                    <motion.a
                      href={`mailto:admin@xpertsedgetech.com?subject=Job Application — ${encodeURIComponent(job.title)}&body=Hi,%0A%0AI am interested in the ${encodeURIComponent(job.title)} position.%0APlease find my updated resume attached.%0A%0ARegards`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold brand-gradient text-background glow-green"
                    >
                      Apply Now <ArrowRight size={14} />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Application form */}
          <motion.div
            ref={applyRef}
            id="apply"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 scroll-mt-24 surface-card rounded-2xl p-6 md:p-9 border border-primary/15"
          >
            <div className="text-center mb-7">
              <h2 className="text-2xl font-bold text-foreground">
                Apply <span className="brand-gradient-text">Now</span>
              </h2>
              <p className="text-muted-foreground text-sm mt-2 max-w-lg mx-auto">
                Fill in your details and attach your resume. Don&apos;t see a matching role? Choose
                &ldquo;General Application&rdquo; and we&apos;ll reach out when the right opportunity opens.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center gap-4 py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full brand-gradient flex items-center justify-center glow-green">
                  <CheckCircle size={32} className="text-background" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Application Received!</h3>
                <p className="text-muted-foreground max-w-sm leading-relaxed">
                  Thank you for applying. Our HR team will review your profile and get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="name" name="name" type="text" required
                        pattern="[A-Za-z\s.]+" title="Name can contain letters and spaces only"
                        value={form.name} onChange={handleChange}
                        placeholder="Your full name"
                        className={`${inputClass} pl-9`}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      Phone <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="phone" name="phone" type="tel" required {...phoneAttrs}
                        value={form.phone} onChange={handleChange}
                        placeholder="10-digit mobile number"
                        className={`${inputClass} pl-9`}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Email <span className="text-primary">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="email" name="email" type="email" required
                      value={form.email} onChange={handleChange}
                      placeholder="you@email.com"
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="qualification" className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      Qualification <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <Award size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="qualification" name="qualification" type="text" required {...hasLetterAttrs}
                        value={form.qualification} onChange={handleChange}
                        placeholder="e.g. B.E. CSE, MCA"
                        className={`${inputClass} pl-9`}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="location" className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      Current Location <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="location" name="location" type="text" required {...hasLetterAttrs}
                        value={form.location} onChange={handleChange}
                        placeholder="City, State"
                        className={`${inputClass} pl-9`}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="position" className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Position <span className="text-primary">*</span>
                  </label>
                  <select
                    id="position" name="position" required
                    value={form.position} onChange={handleChange}
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="" disabled>Select a position</option>
                    {positions.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="resumeLink" className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Resume Link <span className="text-muted-foreground/70 normal-case">(Drive / LinkedIn)</span> <span className="text-primary">*</span>
                  </label>
                  <div className="relative">
                    <Link2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="resumeLink" name="resumeLink" type="url" required
                      value={form.resumeLink} onChange={handleChange}
                      placeholder="https://drive.google.com/..."
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground/80 mt-0.5">
                    Note: Please make sure your Google Drive link is set to
                    &ldquo;Anyone with the link can view&rdquo; so our team can open it.
                  </p>
                </div>

                {error && (
                  <p className="text-sm text-destructive" role="alert">{error}</p>
                )}

                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold brand-gradient text-background glow-green transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <>Submit Application <Send size={16} /></>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  )
}
