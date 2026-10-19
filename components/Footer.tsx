'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'

// Brand marks (lucide-react v1 no longer ships brand icons)
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.966 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
  </svg>
)

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
  </svg>
)

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
  </svg>
)

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/xpertsedgetech/?hl=en', Icon: InstagramIcon },
  { label: 'X', href: 'https://x.com/xpertsedgetech', Icon: XIcon },
  { label: 'Facebook', href: 'https://www.facebook.com/xpertsedgetechnologies', Icon: FacebookIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/xpertsedge-technologies/', Icon: LinkedinIcon },
]

const footerLinks = [
  {
    heading: 'Quick Links',
    links: [
      { label: 'Home', href: '#home', isAnchor: true },
      { label: 'About Us', href: '#about', isAnchor: true },
      { label: 'Services', href: '#services', isAnchor: true },
      { label: 'Why Choose Us', href: '#why-us', isAnchor: true },
      { label: 'Events & Gallery', href: '/events', isAnchor: false },
      { label: 'Careers', href: '/careers', isAnchor: false },
      { label: 'Contact', href: '/contact', isAnchor: false },
    ],
  },
  {
    heading: 'Programs',
    links: [
      { label: 'Java Full Stack', href: '/curriculum/java-full-stack', isAnchor: false },
      { label: 'MERN Stack', href: '/curriculum/mern-stack', isAnchor: false },
      { label: 'Manual Testing', href: '/curriculum/manual-testing', isAnchor: false },
      { label: 'Selenium Automation', href: '/curriculum/java-selenium-automation', isAnchor: false },
      { label: 'Playwright Testing', href: '/curriculum/playwright-automation', isAnchor: false },
      { label: 'AWS', href: '/curriculum/aws', isAnchor: false },
    ],
  },
]

export default function Footer() {
  const pathname = usePathname()
  const router = useRouter()

  // Section anchors live on the home page — scroll if we're there, else navigate.
  const goToAnchor = (href: string) => {
    if (pathname === '/') {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push(href === '#home' ? '/' : `/${href}`)
    }
  }

  return (
    <footer className="bg-card border-t border-border">
      {/* CTA Banner */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground text-balance">
                Ready to{' '}
                <span className="brand-gradient-text">Build Success</span>{' '}
                Beyond Boundaries?
              </h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Join hundreds of professionals who&apos;ve transformed their careers with XpertsEdge.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <button onClick={() => goToAnchor('#home')} className="flex items-center gap-3 mb-4 group" aria-label="Go to top">
              <Image src="/logo.png" alt="XpertsEdge Technologies" width={52} height={52} className="w-12 h-12 object-contain group-hover:scale-110 transition-transform" />
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-lg">
                  <span className="text-foreground">Xperts</span>
                  <span className="text-primary">Edge</span>
                </span>
                <span className="text-[11px] text-muted-foreground tracking-wide">Technologies</span>
              </div>
            </button>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Building Success Beyond Boundaries — empowering professionals through quality technology
              training and consulting.
            </p>
            <div className="flex flex-col gap-2">
              <a href="tel:+918870783300" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
                <Phone size={13} /> +91 8870783300
              </a>
              <a href="mailto:info@xpertsedgetech.com" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
                <Mail size={13} /> info@xpertsedgetech.com
              </a>
              <a
                href="https://maps.app.goo.gl/Gkky8cGk5wVXTFpp9?g_st=aw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <MapPin size={13} className="mt-0.5 shrink-0" />
                No. 2110A, 13th Main Road,<br />Anna Nagar, Chennai - 600 040
              </a>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map(({ label, href, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-4">{col.heading}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.isAnchor ? (
                      <button
                        onClick={() => goToAnchor(link.href)}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} XpertsEdge Technologies Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Anna Nagar, Chennai, Tamil Nadu, India
          </p>
        </div>
      </div>
    </footer>
  )
}
