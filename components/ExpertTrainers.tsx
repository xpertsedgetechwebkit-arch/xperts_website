'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, MotionConfig } from 'framer-motion'
import { ArrowUpRight, MoveUpRight, Sparkles } from 'lucide-react'

/**
 * XpertsEdge expert trainers.
 * Photos come from public/trainers/ and are displayed without image retouching.
 * Per-trainer positioning keeps faces visible across responsive card sizes.
 */
const trainers = [
  {
    id: 'hari',
    name: 'Hari',
    role: 'Software Testing Trainer',
    specialty: 'QUALITY ENGINEERING',
    bio: 'Makes test design, defect reporting, and QA fundamentals practical with hands-on exercises.',
    skills: ['Manual Testing', 'Jira', 'SQL'],
    image: '/trainers/hari.png',
    imagePosition: '50% 16%',
  },
  {
    id: 'arun',
    name: 'Arun',
    role: 'Full Stack Development Trainer',
    specialty: 'FULL STACK ENGINEERING',
    bio: 'Connects frontend, backend, and databases through clear explanations and project-based learning.',
    skills: ['React', 'Node.js', 'MongoDB'],
    image: '/trainers/arun.png',
    imagePosition: '50% 0%',
  },
  {
    id: 'syed-irfan',
    name: 'Syed Irfan',
    role: 'Python / Backend Trainer',
    specialty: 'BACKEND DEVELOPMENT',
    bio: 'Breaks down Python, APIs, and backend architecture into approachable real-world projects.',
    skills: ['Python', 'Django', 'REST APIs'],
    image: '/trainers/syed-irfan.png',
    imagePosition: '50% 12%',
  },
] as const

// Soft upward entrance; transform + opacity animate efficiently on scroll.
const reveal = {
  hidden: { opacity: 0, y: 38, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

export default function ExpertTrainers() {
  return (
    <MotionConfig reducedMotion="user">
    <section
      id="expert-trainers"
      aria-labelledby="expert-trainers-title"
      className="relative isolate bg-[#0c110e] py-20 text-foreground sm:py-24 lg:py-28"
    >
      {/* Visual texture is contained in its own layer, not the section.
          This lets the cards lift on hover without clipping their edges. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.24]"
          style={{
            backgroundImage: 'radial-gradient(rgba(163,230,53,0.16) 0.7px, transparent 0.7px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute -right-40 -top-56 h-[480px] w-[480px] rounded-full bg-[#22c55e]/[0.065] blur-[110px]" />
        <div className="absolute -bottom-52 -left-44 h-[460px] w-[460px] rounded-full bg-[#a3e635]/[0.045] blur-[110px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-11 flex flex-col justify-between gap-7 lg:mb-13 lg:flex-row lg:items-end"
        >
          <div className="max-w-[730px]">
            <div className="mb-5 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9ce8ad]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635] shadow-[0_0_12px_rgba(163,230,53,0.8)]" />
              OUR MENTORS <span className="text-white/25">/</span> MEET THE PEOPLE
            </div>
            <h2
              id="expert-trainers-title"
              className="max-w-[720px] text-balance text-4xl font-bold leading-[1.09] tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.7rem]"
            >
              Meet Our <span className="brand-gradient-text">Expert Trainers</span>
              <span className="text-[#a3e635]">.</span>
            </h2>
          </div>
          <div className="max-w-[360px] lg:pb-1">
            <p className="text-sm leading-7 text-[#a5b7ab] sm:text-[15px]">
              Real skills grow with the right guidance. Get to know the trainers behind our hands-on learning programs.
            </p>
            <Link
              href="/demo"
              className="group/link mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#a3e635] transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a3e635]"
            >
              Register for a free demo
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12, margin: '0px 0px -60px 0px' }}
          variants={{ visible: { transition: { staggerChildren: 0.16, delayChildren: 0.08 } } }}
          className="mx-auto grid max-w-[1140px] grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7"
        >
          {trainers.map((trainer, index) => (
            <motion.div
              key={trainer.id}
              variants={reveal}
              transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
              className="group relative min-w-0 w-full py-2 sm:last:col-span-2 sm:last:mx-auto sm:last:max-w-[480px] lg:last:col-span-1 lg:last:max-w-none"
            >
              <article className="relative flex h-full transform-gpu flex-col rounded-[1.6rem] border border-white/[0.095] bg-[#131a16] shadow-[0_18px_45px_-30px_rgba(0,0,0,0.9)] transition-[transform,border-color,box-shadow] duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 group-hover:scale-[1.012] group-hover:border-[#86d9a1]/45 group-hover:shadow-[0_32px_65px_-33px_rgba(34,197,94,0.35)] group-focus-within:-translate-y-2 motion-reduce:transform-none motion-reduce:transition-none">
                {/* Only the photo itself clips; the full card is free to lift. */}
                <div className="relative mx-3 mt-3 h-[300px] overflow-hidden rounded-[1.1rem] sm:h-[285px] lg:h-[315px] xl:h-[330px]">
                  <Image
                    src={trainer.image}
                    alt={`XpertsEdge trainer: ${trainer.name}`}
                    fill
                    sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 30vw"
                    style={{ objectPosition: trainer.imagePosition }}
                    className={`object-cover transform-gpu transition-transform duration-[950ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:transition-none ${
                      trainer.id === 'arun'
                        ? 'scale-[1.22] group-hover:scale-[1.27]'
                        : 'scale-100 group-hover:scale-[1.05]'
                    }`}
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#07150d]/55 via-transparent to-[#05150b]/25" />
                  <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-[#0c1b14]/65 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white/85 backdrop-blur-md">
                    <Sparkles size={11} aria-hidden="true" className="text-[#a3e635]" />
                    Mentor {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="max-w-full truncate rounded-full border border-white/15 bg-[#0c1b14]/75 px-2.5 py-1.5 text-[9px] font-semibold tracking-[0.1em] text-[#dcfce7] backdrop-blur-md">
                      {trainer.specialty}
                    </span>
                    <span className="shrink-0 rounded-full border border-white/15 bg-[#0c1b14]/65 p-2 text-white/85 backdrop-blur-md" aria-hidden="true">
                      <MoveUpRight size={13} />
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-5">
                  <h3 className="text-[23px] font-bold tracking-[-0.035em] text-white">{trainer.name}</h3>
                  <p className="mt-1 text-[13px] font-medium text-[#94e7aa]">{trainer.role}</p>
                  <p className="mt-3 min-h-[63px] text-[13px] leading-[1.65] text-[#9aaea0]">{trainer.bio}</p>
                  <div className="mt-4 flex min-h-[58px] flex-wrap content-start gap-1.5" aria-label={`${trainer.name}'s topics`}>
                    {trainer.skills.map((skill) => (
                      <span key={skill} className="rounded-full border border-[#91dba3]/15 bg-[#91dba3]/[0.065] px-2.5 py-1 text-[11px] text-[#c8ded0] transition-colors duration-300 group-hover:border-[#91dba3]/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/demo"
                    aria-label={`Register for a free demo with a focus on ${trainer.role.toLowerCase()}`}
                    className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-[13px] font-semibold text-white transition-colors duration-300 hover:text-[#a3e635] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a3e635]"
                  >
                    Explore training
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#91dba3]/25 bg-[#20412a]/40 text-[#a3e635] transition-[background-color,transform] duration-300 group-hover:bg-[#22c55e]/20 group-hover:translate-x-0.5" aria-hidden="true">
                      <ArrowUpRight size={17} />
                    </span>
                  </Link>
                </div>
              </article>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-2 text-center text-xs text-[#859b8b] sm:text-sm"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#a3e635]" />
          Learn by doing, with guidance at every step.
          <span className="hidden text-[#4e6555] sm:inline" aria-hidden="true">·</span>
          <span className="text-[#b3d6bd]">XpertsEdge Technologies</span>
        </motion.div>
      </div>
    </section>
    </MotionConfig>
  )
}
