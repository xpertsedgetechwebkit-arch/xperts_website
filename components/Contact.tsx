'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import { submitLead } from '@/lib/web3forms'
import { filterName, filterPhone, filterEmail, phoneAttrs, formatPhoneWithCode } from '@/lib/formFilters'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const contactInfo = [
  {
    icon: <Phone size={18} />,
    label: 'Phone',
    value: '+91 8870783300',
    href: 'tel:+918870783300',
  },
  {
    icon: <Mail size={18} />,
    label: 'Email',
    value: 'info@xpertsedgetech.com',
    href: 'mailto:info@xpertsedgetech.com',
  },
  {
    icon: <MapPin size={18} />,
    label: 'Address',
    value: 'No. 2110A, 13th Main Road, Anna Nagar, Chennai - 600 040',
    href: 'https://www.google.com/maps?q=13.0838892,80.2003852&z=17&hl=en',
  },
  {
    icon: <Clock size={18} />,
    label: 'Working Hours',
    value: 'Mon – Sat: 9:30 AM – 7:30 PM\nSunday Timings: 10:00 AM – 4:00 PM',
    href: null,
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let { value } = e.target
    if (e.target.name === 'name') value = filterName(value)
    if (e.target.name === 'phone') value = filterPhone(value)
    if (e.target.name === 'email') value = filterEmail(value)
    setFormState((prev) => ({ ...prev, [e.target.name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await submitLead({
        name: formState.name,
        email: formState.email,
        phone: formatPhoneWithCode(formState.phone),
        message: formState.message,
      })
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={ref} className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 opacity-5 pointer-events-none rounded-full"
        style={{ background: 'radial-gradient(ellipse, #22c55e 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="h-px w-8 bg-primary" />
            <span className="text-primary text-xs font-semibold tracking-widest uppercase">Get In Touch</span>
            <span className="h-px w-8 bg-primary" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance"
          >
            Start Your{' '}
            <span className="brand-gradient-text">Journey Today</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            Ready to level up your skills? Reach out to us and we&apos;ll help you find the right program.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex gap-4 items-start group"
              >
                <div className="w-10 h-10 rounded-xl brand-gradient flex items-center justify-center text-background flex-shrink-0 group-hover:glow-green transition-all duration-300">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-foreground font-medium hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-foreground font-medium text-sm whitespace-pre-line">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-4 rounded-2xl overflow-hidden brand-border h-48"
            >
              <iframe
                title="XpertsEdge Technologies location"
                src="https://www.google.com/maps?q=13.0838892,80.2003852&z=17&hl=en&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(0.9) hue-rotate(140deg) brightness(0.7)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="surface-card rounded-2xl p-6 md:p-8"
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center gap-4 py-12 text-center"
              >
                <CheckCircle size={52} className="text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Message Sent!</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Thank you for reaching out. We&apos;ll get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="text-lg font-semibold text-foreground mb-1">Send us a message</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      Name <span className="text-primary">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      pattern="[A-Za-z\s.]+"
                      title="Name can contain letters and spaces only"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      Phone
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-border bg-primary/10 text-primary text-sm font-semibold select-none flex-shrink-0">
                        +91
                      </span>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        {...phoneAttrs}
                        value={formState.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        className="flex-1 bg-background border border-border rounded-r-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Email <span className="text-primary">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    className="bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-200"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Tell us what you're looking for..."
                    className="bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-200 resize-none"
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
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold brand-gradient text-background glow-green transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
