'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, Send, User, Mail, Phone, Building2, BookOpen } from 'lucide-react'
import { submitLead } from '@/lib/web3forms'
import { filterName, filterPhone, filterEmail, formatPhoneWithCode } from '@/lib/formFilters'
import CountryCodeSelect from '@/components/CountryCodeSelect'
import { DEFAULT_DEMO_COUNTRY, type CountryDialCode } from '@/lib/countryDialCodes'

const courses = [
  'Java Full Stack',
  'MEAN Stack',
  'MERN Stack',
  'Manual Testing',
  'Java Selenium Automation Testing',
  'Playwright Automation Testing',
  'API Testing',
  'AWS Track',
  'Microsoft Azure',
  'DevOps',
  'DSA',
  'IT Consulting / Services',
  'Others',
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

// Require a real-looking email structure, including a domain and 2+ letter TLD.
// Format validation alone cannot confirm that the mailbox exists.
const EMAIL_PATTERN = String.raw`[A-Za-z0-9_%+\-]+(?:\.[A-Za-z0-9_%+\-]+)*@[A-Za-z0-9](?:[A-Za-z0-9\-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9\-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}`
const EMAIL_REGEX = new RegExp(`^(?:${EMAIL_PATTERN})$`, 'i')

export default function DemoPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    course: '',
    otherCourse: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [country, setCountry] = useState<CountryDialCode>(DEFAULT_DEMO_COUNTRY)
  const indiaSelected = country.iso === 'IN'
  const maxPhoneDigits = indiaSelected ? 10 : 15 - country.dial.length

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    let { value } = e.target
    if (e.target.name === 'name') value = filterName(value)
    if (e.target.name === 'phone') {
      value = indiaSelected ? filterPhone(value) : value.replace(/\D/g, '').slice(0, maxPhoneDigits)
    }
    if (e.target.name === 'email') value = filterEmail(value)
    setForm((prev) => ({ ...prev, [e.target.name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Guard the API submission even if browser validation is bypassed.
    if (!EMAIL_REGEX.test(form.email.trim())) {
      setError('Enter a valid email address (example: name@example.com).')
      return
    }
    const phoneDigits = form.phone.replace(/\D/g, '')
    if (indiaSelected ? !/^[0-9]{10}$/.test(phoneDigits) : phoneDigits.length < 4 || phoneDigits.length > maxPhoneDigits) {
      setError('Enter a valid mobile number for the selected country.')
      return
    }
    setSubmitting(true)

    const course = form.course === 'Others' ? form.otherCourse.trim() : form.course
    const message =
      form.message.trim() ||
      `Free demo registration${course ? ` for ${course}` : ''}.`

    try {
      await submitLead({
        name: form.name,
        email: form.email,
        phone: formatPhoneWithCode(form.phone, `+${country.dial}`),
        company: form.company,
        course,
        message,
        subject: `Free demo registration${course ? ` — ${course}` : ''}`,
      })
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Free Demo Session
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance mb-4">
              Register for a{' '}
              <span className="brand-gradient-text">Free Demo</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto text-pretty">
              Experience our training quality first-hand. Fill in your details and our team will
              schedule a personalized demo session for you.
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid sm:grid-cols-3 gap-4 mb-10"
          >
            {[
              { icon: <BookOpen size={18} />, title: 'Live Session', desc: 'Interactive demo by expert trainers' },
              { icon: <User size={18} />, title: 'Personalized', desc: 'Tailored to your background & goals' },
              { icon: <CheckCircle size={18} />, title: 'No Commitment', desc: 'Explore before you enroll' },
            ].map((b) => (
              <div key={b.title} className="surface-card rounded-2xl p-4 flex gap-3 items-start border border-primary/10">
                <div className="w-8 h-8 rounded-lg brand-gradient flex items-center justify-center text-background flex-shrink-0">
                  {b.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{b.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{b.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Registration Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.2 }}
            className="surface-card rounded-2xl p-6 md:p-10 border border-primary/15"
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center gap-5 py-16 text-center"
              >
                <div className="w-16 h-16 rounded-full brand-gradient flex items-center justify-center glow-green">
                  <CheckCircle size={32} className="text-background" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">You&apos;re Registered!</h2>
                <p className="text-muted-foreground max-w-sm leading-relaxed">
                  Thank you for registering. Our team will reach out to you within 24 hours to
                  schedule your free demo session.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                  <Link
                    href="/#courses"
                    className="px-6 py-3 rounded-full font-semibold brand-gradient text-background text-sm glow-green text-center"
                  >
                    Back to Courses
                  </Link>
                  <Link
                    href="/"
                    className="px-6 py-3 rounded-full font-semibold border border-primary/40 text-primary text-sm text-center hover:bg-primary/10 transition-all"
                  >
                    Back to Home
                  </Link>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h2 className="text-xl font-bold text-foreground mb-1">Your Details</h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="name" name="name" type="text" required
                        pattern="[A-Za-z\s.]+"
                        title="Name can contain letters and spaces only"
                        value={form.name} onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      Phone <span className="text-primary">*</span>
                    </label>
                    <div className="relative flex min-w-0">
                      <CountryCodeSelect
                        value={country}
                        disabled={submitting}
                        onChange={(nextCountry) => {
                          setCountry(nextCountry)
                          // Prevent mixing an existing national number with a new country code.
                          setForm((previous) => ({ ...previous, phone: '' }))
                        }}
                      />
                      <input
                        id="phone" name="phone" type="tel" required
                        inputMode="numeric"
                        autoComplete="tel-national"
                        pattern={indiaSelected ? '[0-9]{10}' : `[0-9]{4,${maxPhoneDigits}}`}
                        minLength={indiaSelected ? 10 : 4}
                        maxLength={maxPhoneDigits}
                        title={indiaSelected ? 'Enter a 10-digit Indian mobile number' : `Enter 4 to ${maxPhoneDigits} digits for ${country.name} (without the country code)`}
                        value={form.phone} onChange={handleChange}
                        placeholder={indiaSelected ? '10-digit mobile number' : 'Mobile number'}
                        className="min-w-0 flex-1 bg-background border border-border rounded-r-xl px-3 sm:px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      Email <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="email" name="email" type="email" required
                        autoComplete="email"
                        pattern={EMAIL_PATTERN}
                        maxLength={254}
                        title="Enter a valid email address, for example name@example.com"
                        value={form.email} onChange={handleChange}
                        placeholder="you@email.com"
                        className="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="company" className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      Company / College
                    </label>
                    <div className="relative">
                      <Building2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="company" name="company" type="text"
                        value={form.company} onChange={handleChange}
                        placeholder="Your company or college"
                        className="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="course" className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Course Interested In <span className="text-primary">*</span>
                  </label>
                  <select
                    id="course" name="course" required
                    value={form.course} onChange={handleChange}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all appearance-none"
                  >
                    <option value="" disabled>Select a course</option>
                    {courses.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Shown only when "Others" is selected */}
                {form.course === 'Others' && (
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="otherCourse" className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      Please Specify <span className="text-primary">*</span>
                    </label>
                    <input
                      id="otherCourse" name="otherCourse" type="text" required
                      value={form.otherCourse} onChange={handleChange}
                      placeholder="Which course / service are you looking for?"
                      autoFocus
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Additional Message
                  </label>
                  <textarea
                    id="message" name="message" rows={3}
                    value={form.message} onChange={handleChange}
                    placeholder="Any specific topics or questions you'd like covered..."
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                  />
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
                      Registering...
                    </span>
                  ) : (
                    <>
                      Register for Free Demo <Send size={16} />
                    </>
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
