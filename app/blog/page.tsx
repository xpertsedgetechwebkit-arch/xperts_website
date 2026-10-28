import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Cloud,
  Code2,
  Compass,
  FlaskConical,
  GitBranch,
  Layers3,
  Terminal,
} from 'lucide-react'

const blogUrl = 'https://www.xpertsedgetech.com/blog/'
const description =
  'Practical guides to software testing, Playwright, Selenium, full stack development, AWS and DevOps, with career guidance from XpertsEdge Technologies.'

export const metadata: Metadata = {
  title: 'Blog — Practical Tech Guides & Career Insights',
  description,
  alternates: { canonical: blogUrl },
  openGraph: {
    title: 'XpertsEdge Blog — Learn. Build. Move Forward.',
    description,
    url: blogUrl,
    type: 'website',
    siteName: 'XpertsEdge Technologies',
    locale: 'en_IN',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'XpertsEdge Technologies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XpertsEdge Blog — Learn. Build. Move Forward.',
    description,
    images: ['/logo.png'],
  },
}

const guides = [
  {
    id: 'software-testing',
    category: 'Software Testing',
    icon: FlaskConical,
    visual: 'Think beyond the happy path.',
    code: 'observe → question → verify',
    title: 'Better testing starts with better questions',
    summary:
      'Turn a familiar login flow into a useful testing exercise. Start with risk, explore the boundaries, and make your findings clear.',
    takeaway: 'Start with risk. Finish with evidence.',
    steps: [
      {
        title: 'Map the journey',
        text: 'Write down who is signing in, what they expect, and what happens when access is refused. Include recovery and sign-out.',
      },
      {
        title: 'Choose meaningful cases',
        text: 'Cover a valid login, invalid inputs, empty fields, and session expiry. Prioritize failures with the greatest user impact.',
      },
      {
        title: 'Make findings reproducible',
        text: 'Record the environment, steps, expected result, and actual result. Add evidence that helps someone reproduce the issue.',
      },
    ],
    exercise: 'Create a risk-based test checklist for a sample login page.',
  },
  {
    id: 'playwright',
    category: 'Playwright',
    icon: Terminal,
    visual: 'Confidence in every interaction.',
    code: 'arrange → act → assert',
    title: 'Write browser tests you can trust',
    summary:
      'Build a small, focused browser test with clear locators, observable outcomes, and failures you can actually investigate.',
    takeaway: 'Test what the user can observe.',
    steps: [
      {
        title: 'Describe the behavior',
        text: 'Choose one user journey and a clear outcome. Keep setup explicit so the test does not depend on another test running first.',
      },
      {
        title: 'Use meaningful locators',
        text: 'Prefer roles and accessible names where appropriate. Assert visible application state rather than adding arbitrary pauses.',
      },
      {
        title: 'Investigate before retrying',
        text: 'Use traces, screenshots, and error messages to understand failures. A retry should not hide a broken assumption.',
      },
    ],
    exercise: 'Automate one form journey and verify its success and error states.',
  },
  {
    id: 'selenium',
    category: 'Selenium',
    icon: Code2,
    visual: 'Less repetition. More clarity.',
    code: 'locate → interact → verify',
    title: 'Build an automation suite that stays readable',
    summary:
      'Give each test a clear purpose. Keep page interactions organized and test data independent as your automation suite grows.',
    takeaway: 'Make the next failure easier to understand.',
    steps: [
      {
        title: 'Separate responsibilities',
        text: 'Keep reusable page interactions together and business assertions in the tests. Avoid a single helper that does everything.',
      },
      {
        title: 'Wait for a condition',
        text: 'Wait for the state an interaction requires, such as visibility or clickability, instead of relying on fixed delays.',
      },
      {
        title: 'Keep runs independent',
        text: 'Create predictable test data and clean up after the exercise. Name tests so a failure explains the behavior being checked.',
      },
    ],
    exercise: 'Refactor two related tests to share a small page interaction layer.',
  },
  {
    id: 'full-stack',
    category: 'Full Stack Development',
    icon: Layers3,
    visual: 'See the whole feature.',
    code: 'interface → API → database',
    title: 'Follow one feature through the full stack',
    summary:
      'Connect the interface, API, and database through one small feature. Learn how each layer handles validation and failure.',
    takeaway: 'Understand the boundaries between layers.',
    steps: [
      {
        title: 'Define the contract',
        text: 'Sketch the request, response, and required fields before building. Decide what the interface should show for each outcome.',
      },
      {
        title: 'Validate at the boundary',
        text: 'Use client validation for feedback and server validation for incoming data. Keep database credentials on the server.',
      },
      {
        title: 'Design the failure path',
        text: 'Handle loading, rejected input, and unavailable services. Check that retries do not accidentally create duplicate records.',
      },
    ],
    exercise: 'Build a small task tracker and document one request end to end.',
  },
  {
    id: 'aws',
    category: 'AWS',
    icon: Cloud,
    visual: 'Start small. Understand the cloud.',
    code: 'design → provision → observe',
    title: 'Give your first cloud lab clear boundaries',
    summary:
      'Approach a small cloud project with a simple architecture, limited permissions, and a plan to monitor and remove resources.',
    takeaway: 'Know what you create and why it exists.',
    steps: [
      {
        title: 'Draw before deploying',
        text: 'Identify the application, storage, and network boundaries. Use a dedicated practice environment and avoid real customer data.',
      },
      {
        title: 'Limit access and watch usage',
        text: 'Grant only the permissions the exercise needs. Review current service pricing and set budget alerts before provisioning.',
      },
      {
        title: 'Observe and clean up',
        text: 'Inspect logs and resource usage. Remove resources after practice and confirm which storage or network resources remain.',
      },
    ],
    exercise: 'Write a cloud lab plan with an architecture sketch and cleanup checklist.',
  },
  {
    id: 'devops',
    category: 'DevOps',
    icon: GitBranch,
    visual: 'Make good delivery repeatable.',
    code: 'check → build → release',
    title: 'Think of your pipeline as a repeatable process',
    summary:
      'Connect code checks, a versioned build, and a verified release. Treat recovery as part of the delivery process.',
    takeaway: 'A release needs a way forward and a way back.',
    steps: [
      {
        title: 'Check changes early',
        text: 'Run the project’s meaningful checks in CI. Keep secrets out of source control and make failures easy to locate.',
      },
      {
        title: 'Build a traceable artifact',
        text: 'Associate each build with its source revision. Promote the verified artifact instead of rebuilding it differently for each environment.',
      },
      {
        title: 'Verify and prepare recovery',
        text: 'Check a release in staging, define a health check, and document how to restore the previous working version.',
      },
    ],
    exercise: 'Diagram a small CI pipeline, including a failed-check and rollback path.',
  },
] as const

const focusStyles =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background'

export default function BlogPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <section aria-labelledby="blog-heading" className="relative isolate overflow-hidden border-b border-primary/10 px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8 lg:pb-24 lg:pt-44">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_15%,rgba(34,197,94,0.12),transparent_55%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-primary/25 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_12px_rgba(163,230,53,0.6)]" />
              The XpertsEdge Blog
            </div>
            <h1 id="blog-heading" className="max-w-2xl text-5xl font-bold leading-[1.07] tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Stay curious.
              <br />
              <span className="brand-gradient-text">Build what’s next.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-foreground/65 sm:text-lg">
              Fresh perspectives. Practical skills. Explore testing, development,
              and cloud engineering — one useful idea at a time.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5 sm:gap-7">
              <a href="#articles" className={`brand-gradient inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-background shadow-lg shadow-primary/10 transition-shadow hover:shadow-primary/25 motion-reduce:transition-none ${focusStyles}`}>
                Explore the guides <ArrowRight aria-hidden="true" size={17} />
              </a>
              <a href="#career-guidance" className={`inline-flex items-center gap-2 rounded-sm py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary motion-reduce:transition-none ${focusStyles}`}>
                Find your next step <ArrowUpRight aria-hidden="true" size={17} />
              </a>
            </div>
            <div className="mt-10 flex items-center gap-3 text-xs text-foreground/50 sm:text-sm">
              <BookOpen aria-hidden="true" size={16} className="shrink-0 text-primary" />
              <span>Learn the concept. Try the exercise. Make it yours.</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div aria-hidden="true" className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 blur-xl" />
            <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-card shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between border-b border-white/5 px-5 py-4 sm:px-7">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50 sm:text-xs">A mindset for what’s next</span>
                <div aria-hidden="true" className="flex gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary/60" />
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
                </div>
              </div>
              <div className="relative px-6 py-8 sm:px-8 sm:py-10">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(34,197,94,0.12)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
                <p className="relative mb-7 font-mono text-xs text-primary">// small steps. stronger foundations.</p>
                <div className="relative space-y-6">
                  {[
                    { number: '01', title: 'Understand the why.', text: 'Look beyond the tool. Learn the idea.', icon: Compass },
                    { number: '02', title: 'Put it into practice.', text: 'Build something small. Test your thinking.', icon: Code2 },
                    { number: '03', title: 'Keep moving forward.', text: 'Reflect, refine, and take the next step.', icon: GitBranch },
                  ].map((step) => (
                    <div key={step.number} className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-background text-primary">
                        <step.icon aria-hidden="true" size={20} strokeWidth={1.5} />
                      </div>
                      <div className="pt-0.5">
                        <p className="text-base font-semibold tracking-tight sm:text-lg">{step.title}</p>
                        <p className="mt-1 text-xs leading-6 text-foreground/55 sm:text-sm">{step.text}</p>
                      </div>
                      <span aria-hidden="true" className="ml-auto pt-1 font-mono text-xs text-primary/40">{step.number}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 border-t border-white/5 bg-background/50 px-6 py-4 sm:px-8">
                {['TEST WITH INTENT', 'BUILD WITH CARE', 'KEEP LEARNING'].map((label) => (
                  <span key={label} className="rounded-md bg-primary/5 px-2 py-1 font-mono text-[9px] tracking-wider text-primary/80">{label}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <nav aria-label="Blog topics" className="mb-14">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/50">Follow your curiosity</p>
          <div className="flex flex-wrap gap-2.5">
            <a href="#articles" className={`rounded-full border border-primary/30 bg-primary/10 px-4 py-2.5 text-xs font-semibold text-primary ${focusStyles}`}>All guides</a>
            {guides.map((guide) => (
              <a key={guide.id} href={`#${guide.id}`} className={`rounded-full border border-white/10 bg-card px-4 py-2.5 text-xs font-medium text-foreground/65 transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary motion-reduce:transition-none ${focusStyles}`}>
                {guide.category}
              </a>
            ))}
            <a href="#career-guidance" className={`rounded-full border border-white/10 bg-card px-4 py-2.5 text-xs font-medium text-foreground/65 transition-colors hover:border-primary/40 hover:text-primary motion-reduce:transition-none ${focusStyles}`}>Career Growth</a>
          </div>
        </nav>

        <section aria-labelledby="featured-heading" className="mb-20">
          <div className="mb-5 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-7 bg-primary" />
            <h2 id="featured-heading" className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">In the spotlight</h2>
          </div>
          <div className="grid overflow-hidden rounded-3xl border border-primary/20 bg-card md:grid-cols-2">
            <div className="relative flex min-h-64 flex-col justify-between overflow-hidden border-b border-primary/10 bg-gradient-to-br from-primary/15 via-background to-secondary/5 p-7 sm:p-10 md:border-r md:border-b-0">
              <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full border border-primary/15" />
              <div aria-hidden="true" className="pointer-events-none absolute -right-4 -top-4 h-40 w-40 rounded-full border border-primary/10" />
              <div className="relative flex items-center gap-2 font-mono text-xs text-primary/80">
                <FlaskConical aria-hidden="true" size={17} /> THE TESTER’S MINDSET
              </div>
              <div className="relative my-8 space-y-3">
                {['What should happen?', 'What could go wrong?', 'How will we know?'].map((question, index) => (
                  <div key={question} className="flex items-center gap-3 rounded-xl border border-primary/15 bg-background/70 px-4 py-3 text-sm sm:text-base">
                    <span aria-hidden="true" className="font-mono text-xs text-primary/50">0{index + 1}</span>
                    <span className={index === 2 ? 'font-medium text-secondary' : 'text-foreground/80'}>{question}</span>
                    {index === 2 && <CheckCircle2 aria-hidden="true" size={17} className="ml-auto shrink-0 text-secondary" />}
                  </div>
                ))}
              </div>
              <span className="relative font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60">Good questions lead to useful tests.</span>
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <span className="mb-4 w-fit rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">Featured guide · Software Testing</span>
              <h3 className="text-2xl font-bold leading-tight tracking-tight text-balance sm:text-3xl">Before your first test case, ask a better question.</h3>
              <p className="mt-4 text-sm leading-7 text-foreground/60">A useful test starts with understanding the person using the product. Learn to connect user journeys, risk, and clear evidence through a simple login exercise.</p>
              <a href="#software-testing" className={`mt-7 inline-flex w-fit items-center gap-2 rounded-sm text-sm font-semibold text-primary transition-colors hover:text-secondary motion-reduce:transition-none ${focusStyles}`}>
                Read the testing guide <ArrowUpRight aria-hidden="true" size={18} />
              </a>
            </div>
          </div>
        </section>

        <section id="articles" aria-labelledby="articles-heading" className="scroll-mt-28">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">Ideas worth putting to work</p>
              <h2 id="articles-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">Your next <span className="brand-gradient-text">learning moment.</span></h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-foreground/55">Six practical starting points.<br />Choose a topic. Try something new.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide, index) => (
              <article key={guide.id} className="h-full">
                <a href={`#${guide.id}`} aria-label={`Read the guide: ${guide.title}`} className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-card transition-[border-color,box-shadow,transform] duration-300 hover:border-primary/35 hover:shadow-xl hover:shadow-primary/5 motion-safe:hover:-translate-y-1 motion-reduce:transition-none ${focusStyles}`}>
                  <div className="relative flex min-h-44 flex-col justify-between overflow-hidden border-b border-primary/10 bg-gradient-to-br from-primary/10 via-background to-secondary/5 p-6">
                    <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-8 h-40 w-40 rounded-full border border-primary/10 transition-transform duration-500 motion-safe:group-hover:scale-125 motion-reduce:transition-none" />
                    <div className="relative flex items-center justify-between">
                      <guide.icon aria-hidden="true" size={27} strokeWidth={1.5} className="text-primary" />
                      <span aria-hidden="true" className="font-mono text-xs text-primary/45">0{index + 1}</span>
                    </div>
                    <div className="relative mt-6">
                      <p className="text-base font-medium tracking-tight text-foreground/85">{guide.visual}</p>
                      <p className="mt-2 font-mono text-[10px] tracking-wide text-primary/80">{guide.code}</p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">{guide.category}</span>
                    <h3 className="text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary motion-reduce:transition-none">{guide.title}</h3>
                    <p className="mb-6 mt-3 text-sm leading-7 text-foreground/60">{guide.summary}</p>
                    <span className="mt-auto flex items-center justify-between border-t border-white/5 pt-4 text-xs font-semibold text-foreground/75">
                      Read the guide
                      <ArrowUpRight aria-hidden="true" size={17} className="text-primary transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 motion-reduce:transition-none" />
                    </span>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="practice-heading" className="mt-20 border-t border-primary/10 pt-16 sm:mt-24">
          <div className="mb-9 max-w-2xl">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">From reading to doing</p>
            <h2 id="practice-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">The practice notes.</h2>
            <p className="mt-4 text-sm leading-7 text-foreground/60">Short guides with a clear next step. Use a sample project or practice environment, and build your understanding one exercise at a time.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {guides.map((guide) => (
              <article key={guide.id} id={guide.id} aria-labelledby={`${guide.id}-heading`} className="scroll-mt-28 rounded-2xl border border-primary/10 bg-card p-6 target:border-primary/50 target:shadow-lg target:shadow-primary/5 sm:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <guide.icon aria-hidden="true" size={20} className="shrink-0 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">{guide.category}</span>
                </div>
                <h3 id={`${guide.id}-heading`} className="text-xl font-semibold leading-snug tracking-tight">{guide.title}</h3>
                <p className="mt-2 text-sm leading-6 text-secondary/85">{guide.takeaway}</p>
                <ol className="mt-6 space-y-5">
                  {guide.steps.map((step, index) => (
                    <li key={step.title} className="flex gap-3">
                      <span aria-hidden="true" className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-[10px] text-primary">{index + 1}</span>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground/90">{step.title}</h4>
                        <p className="mt-1 text-sm leading-7 text-foreground/60">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-6 rounded-xl border border-primary/10 bg-primary/5 p-4">
                  <p className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-primary">Try it yourself</p>
                  <p className="text-sm leading-6 text-foreground/75">{guide.exercise}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="career-guidance" aria-labelledby="career-heading" className="mt-20 scroll-mt-28 rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/5 via-card to-card p-7 sm:mt-24 sm:p-10 lg:p-12">
          <div className="grid gap-9 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <div>
              <span className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-primary"><Compass aria-hidden="true" size={17} /> Career notes</span>
              <h2 id="career-heading" className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Make your work<br /><span className="brand-gradient-text">easy to explain.</span></h2>
              <p className="mt-5 text-sm leading-7 text-foreground/60">You do not need a sprawling portfolio to tell a useful story. Start with one thoughtful project and show how you approach a problem, make decisions, and learn from the result.</p>
              <a href="#articles" className={`mt-6 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-primary hover:text-secondary ${focusStyles}`}>Pick a starting point <ArrowRight aria-hidden="true" size={16} /></a>
            </div>
            <div className="space-y-5">
              {[
                { title: 'Build something focused', text: 'Choose a small problem, define what success looks like, and complete a working version before adding more features.' },
                { title: 'Show your decisions', text: 'Write a clear README with setup steps, key tradeoffs, test evidence, and the limitations you would address next.' },
                { title: 'Practice the walkthrough', text: 'Explain a difficult bug, a failure case, and why you chose your approach. Let your reasoning support the demo.' },
              ].map((note) => (
                <div key={note.title} className="flex gap-3">
                  <CheckCircle2 aria-hidden="true" size={19} className="mt-0.5 shrink-0 text-primary" />
                  <div>
                    <h3 className="text-base font-semibold">{note.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-foreground/60">{note.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="demo-heading" className="relative mt-16 overflow-hidden rounded-3xl border border-primary/25 bg-background px-6 py-12 text-center sm:mt-20 sm:px-12 sm:py-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(34,197,94,0.14),transparent_70%)]" />
          <div className="relative mx-auto max-w-2xl">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">Turn curiosity into a learning plan</p>
            <h2 id="demo-heading" className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Ready to take the <span className="brand-gradient-text">next step?</span></h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-foreground/60">Explore a training path that fits your interests. Book a free demo with XpertsEdge Technologies and discuss where you want to begin.</p>
            <Link href="/demo" className={`brand-gradient mt-7 inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-background shadow-lg shadow-primary/10 transition-shadow hover:shadow-primary/25 motion-reduce:transition-none ${focusStyles}`}>
              Book a Free Demo <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
