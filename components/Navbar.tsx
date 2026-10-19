'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Wrench, GraduationCap } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Header is solid on every page except the home hero (transparent until scrolled).
  const solid = scrolled || !isHome

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    setServicesOpen(false)
    if (href.startsWith('#')) {
      if (isHome) {
        // Clicking Home / logo resets the courses section to its category cards.
        if (href === '#home') window.dispatchEvent(new Event('reset-courses'))
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      } else {
        // Anchor lives on the home page — navigate there with the hash.
        router.push(href === '#home' ? '/' : `/${href}`)
      }
    }
  }

  const onServicesEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setServicesOpen(true)
  }
  const onServicesLeave = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-150 ${
          solid
            ? 'bg-background/90 backdrop-blur-md border-b border-border shadow-lg shadow-black/40'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo + Brand Name */}
          <button
            onClick={() => handleNav('#home')}
            className="flex items-center gap-3 group"
            aria-label="XpertsEdge Technologies - Go to top"
          >
            <Image
              src="/logo.png"
              alt="XpertsEdge Technologies Logo"
              width={56}
              height={56}
              className="w-12 h-12 md:w-14 md:h-14 object-contain group-hover:scale-110 transition-transform duration-200"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-base md:text-lg">
                <span className="text-foreground">Xperts</span>
                <span className="text-primary">Edge</span>
              </span>
              <span className="text-[10px] md:text-xs text-muted-foreground tracking-wide">Technologies</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {/* Home */}
            <button
              onClick={() => handleNav('#home')}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-150 rounded-full" />
            </button>

            {/* About */}
            <button
              onClick={() => handleNav('#about')}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
            >
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-150 rounded-full" />
            </button>

            {/* Services dropdown — exactly two options */}
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={onServicesEnter}
              onMouseLeave={onServicesLeave}
            >
              <button
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Services
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-150 rounded-full" />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50"
                    onMouseEnter={onServicesEnter}
                    onMouseLeave={onServicesLeave}
                  >
                    <div className="surface-card rounded-2xl p-2 min-w-[240px] border border-primary/20 shadow-xl shadow-black/50 flex flex-col gap-1">
                      {/* IT Services — its own page */}
                      <Link
                        href="/it-services"
                        onClick={() => setServicesOpen(false)}
                        className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-xl hover:bg-primary/5 transition-colors group/item"
                      >
                        <span className="w-8 h-8 rounded-lg brand-gradient flex items-center justify-center text-background flex-shrink-0">
                          <Wrench size={15} />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-foreground group-hover/item:text-primary transition-colors">IT Services</span>
                          <span className="block text-[11px] text-muted-foreground">Consulting & corporate solutions</span>
                        </span>
                      </Link>

                      {/* Training Services — navigates to its own page */}
                      <Link
                        href="/training-services"
                        onClick={() => setServicesOpen(false)}
                        className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-xl hover:bg-primary/5 transition-colors group/item"
                      >
                        <span className="w-8 h-8 rounded-lg brand-gradient flex items-center justify-center text-background flex-shrink-0">
                          <GraduationCap size={15} />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-foreground group-hover/item:text-primary transition-colors">Training Services</span>
                          <span className="block text-[11px] text-muted-foreground">Courses, tracks & certifications</span>
                        </span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Why Us */}
            <button
              onClick={() => handleNav('#why-us')}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
            >
              Why Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-150 rounded-full" />
            </button>

            {/* Events & Galleries */}
            <Link
              href="/events"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
            >
              Events &amp; Gallery
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-150 rounded-full" />
            </Link>

            {/* Careers */}
            <Link
              href="/careers"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
            >
              Careers
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-150 rounded-full" />
            </Link>

            {/* Certifications */}
            <Link
              href="/certifications"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
            >
              Certifications
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-150 rounded-full" />
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-150 rounded-full" />
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/demo"
                className="inline-block px-5 py-2 rounded-full text-sm font-semibold brand-gradient text-background glow-green transition-all duration-200"
              >
                Need Demo
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden text-foreground p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-background/97 backdrop-blur-md flex flex-col pt-20 px-6 overflow-y-auto lg:hidden"
          >
            <nav className="flex flex-col gap-4 mt-6" aria-label="Mobile navigation">
              {[
                { label: 'Home', action: () => handleNav('#home') },
                { label: 'About Us', action: () => handleNav('#about') },
              ].map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={item.action}
                  className="text-xl font-semibold text-foreground hover:text-primary transition-colors text-left py-2 border-b border-border/40"
                >
                  {item.label}
                </motion.button>
              ))}

              {/* Services — two options */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 }}
                className="border-b border-border/40"
              >
                <Link
                  href="/it-services"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 text-xl font-semibold text-foreground hover:text-primary transition-colors py-2"
                >
                  <Wrench size={18} className="text-primary" /> IT Services
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18 }}
                className="border-b border-border/40"
              >
                <Link
                  href="/training-services"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 text-xl font-semibold text-foreground hover:text-primary transition-colors py-2"
                >
                  <GraduationCap size={18} className="text-primary" /> Training Services
                </Link>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.24 }}
                onClick={() => handleNav('#why-us')}
                className="text-xl font-semibold text-foreground hover:text-primary transition-colors text-left py-2 border-b border-border/40"
              >
                Why Us
              </motion.button>

              {/* Extra pages */}
              {[
                { label: 'Events & Gallery', href: '/events' },
                { label: 'Careers', href: '/careers' },
                { label: 'Certifications', href: '/certifications' },
                { label: 'Contact', href: '/contact' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.36 + i * 0.06 }}
                  className="border-b border-border/40"
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-xl font-semibold text-foreground hover:text-primary transition-colors py-2"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col gap-3 mt-4"
              >
                <Link
                  href="/demo"
                  onClick={() => setMenuOpen(false)}
                  className="px-6 py-3 rounded-full text-base font-semibold brand-gradient text-background text-center"
                >
                  Need Demo
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
