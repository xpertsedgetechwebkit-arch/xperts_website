'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle, GraduationCap } from 'lucide-react'
import { submitLead } from '@/lib/web3forms'
import { filterName, filterPhone, filterEmail, filterOtherCourse, phoneAttrs, formatPhoneWithCode } from '@/lib/formFilters'

const courses = [
  'Java Full Stack',
  'MEAN Stack',
  'MERN Stack',
  'Next.js',
  'Manual Testing',
  'Selenium Automation',
  'Playwright Automation',
  'API Testing',
  'AWS Track',
  'Microsoft Azure',
  'DevOps',
  'DSA',
  'Other',
]

export default function RegistrationPopup() {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', course: '', otherCourse: '' })

  // Show once per browser session, shortly after the page loads.
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('reg_popup_seen')) return
    const t = setTimeout(() => setOpen(true), 11500)
    return () => clearTimeout(t)
  }, [])

  // Allow any element to open the form on demand (e.g. curriculum "Download PDF").
  useEffect(() => {
    const openNow = () => {
      setSubmitted(false)
      setError(null)
      setOpen(true)
    }
    window.addEventListener('open-registration', openNow)
    return () => window.removeEventListener('open-registration', openNow)
  }, [])

  const close = () => {
    setOpen(false)
    if (typeof window !== 'undefined') sessionStorage.setItem('reg_popup_seen', '1')
  }

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let { value } = e.target
    if (e.target.name === 'name') value = filterName(value)
    if (e.target.name === 'phone') value = filterPhone(value)
    if (e.target.name === 'email') value = filterEmail(value)
    if (e.target.name === 'otherCourse') value = filterOtherCourse(value)
    setForm((prev) => ({ ...prev, [e.target.name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const course = form.course === 'Other' ? form.otherCourse.trim() : form.course

    try {
      await submitLead({
        name: form.name,
        email: form.email,
        phone: formatPhoneWithCode(form.phone),
        course,
        message: `Free demo registration${course ? ` for ${course}` : ''}.`,
        subject: `Demo registration${course ? ` — ${course}` : ''}`,
      })
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Register for a free demo"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="surface-card rounded-2xl w-full max-w-md border border-primary/25 relative overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Accent header */}
            <div className="brand-gradient px-6 py-5 text-background">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider opacity-90">
                <GraduationCap size={15} /> Limited Seats
              </div>
              <h2 className="text-xl font-bold mt-1">Register for a Free Demo</h2>
              <p className="text-xs opacity-90 mt-1">Kickstart your tech career with XpertsEdge.</p>
            </div>

            <div className="p-6">
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center gap-3 py-8 text-center"
                >
                  <CheckCircle size={48} className="text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">You&apos;re Registered!</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Thanks! Our team will reach out within 24 hours to schedule your free demo.
                  </p>
                  <button
                    onClick={close}
                    className="mt-2 px-6 py-2.5 rounded-full font-semibold brand-gradient text-background text-sm glow-green"
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    name="name" type="text" required
                    pattern="[A-Za-z\s.]+" title="Name can contain letters and spaces only"
                    value={form.name} onChange={handleChange}
                    placeholder="Full name"
                    className="bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                  <input
                    name="email" type="email" required
                    value={form.email} onChange={handleChange}
                    placeholder="Email address"
                    className="bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                  <div className="relative flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-border bg-primary/10 text-primary text-sm font-semibold select-none flex-shrink-0">
                      +91
                    </span>
                    <input
                      name="phone" type="tel" required {...phoneAttrs}
                      value={form.phone} onChange={handleChange}
                      placeholder="10-digit mobile number"
                      className="flex-1 bg-background border border-border rounded-r-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                  </div>
                  <select
                    name="course" required
                    value={form.course} onChange={handleChange}
                    className="bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all appearance-none"
                  >
                    <option value="" disabled>Select a course</option>
                    {courses.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>

                  {form.course === 'Other' && (
                        <input
                      name="otherCourse"
                      type="text"
                      required
                      inputMode="text"
                      pattern="[^0-9]+"
                      title="Please enter text only — numbers are not allowed"
                      value={form.otherCourse} onChange={handleChange}
                      placeholder="Which course are you interested in?"
                      className="bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                  )}

                  {error && (
                    <p className="text-sm text-destructive" role="alert">{error}</p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold brand-gradient text-background glow-green transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                        Registering...
                      </span>
                    ) : (
                      <>Register Now <Send size={15} /></>
                    )}
                  </motion.button>

                  <button
                    type="button"
                    onClick={close}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Maybe later
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
