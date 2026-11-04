"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import { ArrowUpRight, UserRound } from "lucide-react";

type Trainer = {
  id: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  skills: string[];
  image: string | null;
  imagePosition: string;
  // Positive pixels move the picture DOWN. Negative pixels move it UP.
  imageMoveY?: number;
  // Smaller width = less zoom; larger width = larger portrait.
  portraitWidth?: number;
  isComingSoon?: boolean;
};

// Edit trainer details here.
// For future trainers, update the name, role, bio, skills,
// image path and set isComingSoon to false.

const trainers: Trainer[] = [
  {
    id: "hari",
    name: "Haridoss",
    role: "DevOps Trainer",
    specialty: "CLOUD & DEVOPS ENGINEERING",
    bio: "Makes cloud infrastructure, CI/CD pipelines, automation, and deployment practices practical through hands-on exercises.",
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Git", "Linux"],
    image: "/trainers/hari.png",
    imagePosition: "50% 6%",
    imageMoveY: 0, // +20 moves the portrait down; -20 moves it up.
    portraitWidth: 196, // Decrease to 160 for a less zoomed portrait.
  },
  {
    id: "arun",
    name: "Arun Kumar",
    role: "Playwright Automation Trainer",
    specialty: "TEST AUTOMATION ENGINEERING",
    bio: "Specializes in Playwright automation, TypeScript scripting, API testing, and end-to-end testing through real-world projects and hands-on practice.",
    skills: [
      "Playwright",
      "TypeScript",
      "JavaScript",
      "API Testing",
      "Automation Frameworks",
      "CI/CD",
    ],
    image: "/trainers/arun.jpeg",
    imagePosition: "50% 10%",
    imageMoveY: 0,
    portraitWidth: 232,
  },
  {
    id: "syed-irfan",
    name: "Syed Irfan",
    role: "Full Stack Development Trainer",
    specialty: "FULL STACK ENGINEERING",
    bio: "Specializes in frontend, backend, and database development through practical, project-based learning.",
    skills: ["Java", "Spring Boot", "React", "REST APIs", "MySQL"],
    image: "/trainers/syed-irfan.jpeg",
    imagePosition: "50% 6%",
    imageMoveY: 0,
    portraitWidth: 206,
  },

  // Confirmed trainer profile 4
  {
    id: "udhaya",
    name: "Udhaya",
    role: "Full Stack Development Trainer",
    specialty: "FULL STACK ENGINEERING",
    bio: "Full Stack Developer with 10+ years of experience in delivering practical, project-based training.",
    skills: ["React", "Node.js", "MongoDB", "JavaScript"],
    image: "/trainers/udhaya.jpeg",
    imagePosition: "50% 65%",
    imageMoveY: 0,
    portraitWidth: 208,
  },
  
];

// Brief display copy keeps the cards compact; the full bios remain above.
const trainerIntros: Record<string, string> = {
  hari: "Hands-on cloud infrastructure, CI/CD, automation, and deployment.",
  arun: "Practical Playwright, TypeScript, API, and end-to-end testing.",
  "syed-irfan":
    "Frontend, backend, and databases through project-based learning.",
};

const cardClasses = [
  "group relative flex h-full min-w-0 flex-col",
  "overflow-hidden rounded-[20px]",
  "border border-white/[0.09]",
  "bg-[#101712]",
  "shadow-[0_8px_24px_rgba(0,0,0,0.12)]",
  "transition-[transform,border-color,box-shadow]",
  "duration-300",
  "hover:border-[#9ce8ad]/35",
  "hover:shadow-[0_16px_36px_rgba(0,0,0,0.24)]",
  "focus-within:border-[#9ce8ad]/50",
  "motion-safe:hover:-translate-y-[3px]",
  "motion-reduce:transition-none",
].join(" ");

const reveal = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function ExpertTrainers() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="expert-trainers"
        aria-labelledby="expert-trainers-title"
        className="relative isolate overflow-hidden bg-[#0c110e] py-16 text-foreground sm:py-20 lg:py-24"
      >
        {/* Section background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div
            className="absolute inset-0 opacity-[0.20]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(163,230,53,0.14) 0.7px, transparent 0.7px)",
              backgroundSize: "26px 26px",
            }}
          />

          <div className="absolute -right-40 -top-48 h-[460px] w-[460px] rounded-full bg-[#22c55e]/[0.055] blur-[110px]" />

          <div className="absolute -bottom-48 -left-40 h-[440px] w-[440px] rounded-full bg-[#a3e635]/[0.04] blur-[110px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Existing section heading */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.55 }}
            className="mb-10 flex flex-col justify-between gap-7 lg:mb-12 lg:flex-row lg:items-end"
          >
            <div className="max-w-[730px]">
              <div className="mb-5 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9ce8ad]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635] shadow-[0_0_12px_rgba(163,230,53,0.8)]" />
                OUR MENTORS
                <span className="text-white/25">/</span>
                MEET THE PEOPLE
              </div>

              <h2
                id="expert-trainers-title"
                className="max-w-[720px] text-balance text-4xl font-bold leading-[1.09] tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.7rem]"
              >
                Meet Our{" "}
                <span className="brand-gradient-text">Expert Trainers</span>
                <span className="text-[#a3e635]">.</span>
              </h2>
            </div>

            <div className="max-w-[360px] lg:pb-1">
              <p className="text-sm leading-7 text-[#a5b7ab] sm:text-[15px]">
                Real skills grow with the right guidance. Get to know the
                trainers behind our hands-on learning programs.
              </p>

              <Link
                href="/demo"
                className="group/link mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#a3e635] transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a3e635]"
              >
                Register for a free demo
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 motion-safe:group-hover/link:-translate-y-0.5 motion-safe:group-hover/link:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </motion.div>

          {/* Trainers grid */}
          <div className="mx-auto grid max-w-[1020px] auto-rows-fr grid-cols-1 items-stretch gap-5 sm:grid-cols-4 lg:grid-cols-6 lg:gap-6">
            {trainers.map((trainer, index) => {
              const isComingSoon =
                trainer.isComingSoon === true ||
                trainer.specialty === "PROFILE COMING SOON";
              const portraitWidth = trainer.portraitWidth ?? 184;

              const positionClass =
                index === 3
                  ? "lg:col-start-2"
                  : index === 4
                    ? "sm:col-start-2 lg:col-start-4"
                    : "";

              return (
                <motion.div
                  key={trainer.id}
                  initial={"hidden"}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.18 }}
                  variants={reveal}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.45,
                    delay: prefersReducedMotion ? 0 : (index % 3) * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`min-w-0 sm:col-span-2 lg:col-span-2 ${positionClass}`}
                >
                  <article
                    className={cardClasses}
                    aria-labelledby={`${trainer.id}-name`}
                  >
                    {/* A quiet portrait stage, with no labels covering the photograph. */}
                    <div className="relative mx-3 mt-3 h-[200px] shrink-0 overflow-hidden rounded-[14px] border border-white/[0.06] bg-gradient-to-b from-[#18251c] to-[#0b130e]">
                      {trainer.image ? (
                        <div
                          className="relative mx-auto h-full max-w-full overflow-hidden"
                          style={{ width: portraitWidth }}
                        >
                          <Image
                            src={trainer.image}
                            alt={`${trainer.name} — ${trainer.role}`}
                            fill
                            sizes={`${portraitWidth}px`}
                            style={{
                              objectPosition: trainer.imagePosition,
                              // Move the *actual image*, rather than the card or stage.
                              // No competing Framer Motion transform is applied here.
                              transform: `translate3d(0, ${trainer.imageMoveY ?? 0}px, 0)`,
                            }}
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-[#91dba3]/20 bg-[#91dba3]/[0.06] text-[#a3cbb0]">
                            <UserRound
                              size={30}
                              strokeWidth={1.4}
                              aria-hidden="true"
                            />
                          </div>

                          <span className="relative text-[10px] font-medium uppercase tracking-[0.17em] text-[#a9c5af]">
                            Photo Coming Soon
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Trainer information */}
                    <div className="flex flex-1 flex-col px-4 pb-4 pt-3 sm:px-5">
                      <p className="mb-1 text-[9px] font-semibold uppercase leading-3 tracking-[0.12em] text-[#a3c4ae]">
                        {isComingSoon
                          ? trainer.isComingSoon
                            ? "Sample profile · Coming soon"
                            : "Profile coming soon"
                          : trainer.specialty}
                      </p>

                      <div className="flex min-w-0 items-center justify-between gap-3">
                        <h3
                          id={`${trainer.id}-name`}
                          className="text-[19px] font-semibold leading-6 tracking-tight text-white"
                        >
                          {trainer.name}
                        </h3>

                        {/* CTA for confirmed trainers */}
                        {!isComingSoon && (
                          <Link
                            href="/demo"
                            aria-label={`Explore training with ${trainer.name}`}
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#94e7aa]/20 text-[#a3e635] transition-colors duration-200 hover:border-[#a3e635]/60 hover:bg-[#a3e635]/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a3e635] motion-reduce:transition-none"
                          >
                            <ArrowUpRight size={17} aria-hidden="true" />
                          </Link>
                        )}
                      </div>

                      <p className="mt-1 text-[12px] font-medium leading-5 text-[#94e7aa]">
                        {trainer.role}
                      </p>

                      {/* Short description */}
                      <p className="mt-2 text-[12px] leading-5 text-[#a5b7ab]">
                        {trainerIntros[trainer.id] ?? trainer.bio}
                      </p>

                      {/* Compact skills */}
                      {!isComingSoon ? (
                        <div
                          className="mt-auto flex flex-wrap gap-1.5 pt-3"
                          aria-label={`${trainer.name}'s skills`}
                        >
                          {trainer.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-md border border-[#91dba3]/15 bg-[#91dba3]/[0.04] px-2 py-0.5 text-[10px] leading-4 text-[#c8ded0]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="mt-auto pt-4">
                          <span className="inline-flex items-center gap-2 text-[11px] text-[#a3c4ae]">
                            <span
                              aria-hidden="true"
                              className="h-1.5 w-1.5 rounded-full bg-[#a3e635]/70"
                            />
                            Profile details pending
                          </span>
                        </div>
                      )}
                    </div>
                  </article>
                </motion.div>
              );
            })}
          </div>

          {/* Existing footer line */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.5,
              delay: prefersReducedMotion ? 0 : 0.1,
            }}
            className="mt-10 flex flex-wrap items-center justify-center gap-2 text-center text-xs text-[#859b8b] sm:text-sm"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#a3e635]" />
            Learn by doing, with guidance at every step.
            <span
              className="hidden text-[#4e6555] sm:inline"
              aria-hidden="true"
            >
              ·
            </span>
            <span className="text-[#b3d6bd]">XpertsEdge Technologies</span>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
