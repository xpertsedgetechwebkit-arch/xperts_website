'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Images } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Events &amp; Gallery
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance mb-4">
              Our <span className="brand-gradient-text">Events &amp; Moments</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto text-pretty">
              Workshops, batch completions, seminars, and memorable milestones from the XpertsEdge community.
            </p>
          </motion.div>

          {/* Coming soon / placeholder gallery */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.15 }}
            className="surface-card rounded-2xl p-16 flex flex-col items-center justify-center text-center border border-primary/15 gap-5"
          >
            <div className="w-16 h-16 rounded-2xl brand-gradient flex items-center justify-center glow-green">
              <Images size={30} className="text-background" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Gallery Coming Soon</h2>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              Event photos and gallery images will be added here by the team. Check back soon for
              batch completion ceremonies, workshops, and company events.
            </p>
            <motion.a
              href="mailto:info@xpertsedgetech.com"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="mt-2 px-6 py-3 rounded-full font-semibold border border-primary/40 text-primary hover:bg-primary/10 transition-all text-sm"
            >
              Submit Event Photos
            </motion.a>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
