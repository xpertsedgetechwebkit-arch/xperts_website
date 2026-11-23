'use client'

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowRight, ArrowUpRight, Award, BookOpen, BriefcaseBusiness, Check,
  CheckCircle2, ChevronDown, Code2, Database,
  GitBranch, Globe2, GraduationCap, Layers3, Laptop, Monitor,
  Rocket, Server, ShieldCheck, Sparkles,
  Users, Workflow,
} from 'lucide-react'
import { submitContactOrDemoLead } from '@/lib/leadSubmission'
import { filterEmail, filterName, filterPhone, formatPhoneWithCode } from '@/lib/formFilters'

const courses = [
  {
    title: 'Java Full Stack',
    short: 'JAVA',
    stack: 'Java + Spring Boot + React',
    description: 'Learn frontend and backend development with Java, Spring Boot, React, REST APIs, database integration and practical projects.',
    duration: '5–6 Months', price: '₹30,000–₹45,000',
    highlights: ['Live projects', 'Frontend + Backend', 'Interview preparation', 'Placement support'],
    suitable: 'Full-stack & enterprise development',
    slug: 'java-full-stack', pdf: '/curriculum/java-full-stack.pdf',
    icon: Server, tone: 'green', tag: 'POPULAR TRACK',
  },
  {
    title: 'MEAN Stack',
    short: 'MEAN',
    stack: 'MongoDB + Express + Angular + Node.js',
    description: 'Build full-stack web applications using Angular, Node.js, Express, MongoDB and REST APIs.',
    duration: '4–5 Months', price: '₹28,000–₹40,000',
    highlights: ['Angular UI', 'MongoDB practice', 'REST APIs', 'Mock interviews'],
    suitable: 'Angular development',
    slug: 'mean-stack', pdf: '/curriculum/mean-stack.pdf',
    icon: Layers3, tone: 'blue', tag: 'ANGULAR PATH',
  },
  {
    title: 'MERN Stack',
    short: 'MERN',
    stack: 'MongoDB + Express + React + Node.js',
    description: 'Learn React and the Node.js backend stack while creating real projects for your development portfolio.',
    duration: '4–5 Months', price: '₹28,000–₹42,000',
    highlights: ['React projects', 'Portfolio building', 'API integration', 'Resume guidance'],
    suitable: 'React development',
    slug: 'mern-stack', pdf: '/curriculum/mern-stack.pdf',
    icon: Code2, tone: 'green', tag: 'REACT PATH',
  },
  {
    title: 'Next.js Development',
    short: 'NEXT',
    stack: 'React + Next.js + TypeScript',
    description: 'Learn App Router, API Routes, SSR, SSG and deployment with React, Next.js and TypeScript.',
    duration: '3–4 Months', price: '₹26,000–₹38,000',
    highlights: ['App Router', 'API Routes', 'SSR & SSG', 'Vercel deployment'],
    suitable: 'Modern web applications',
    slug: 'nextjs', pdf: '/curriculum/nextjs.pdf',
    icon: Globe2, tone: 'cyan', tag: 'MODERN WEB',
  },
] as const

const pillars = [
  { title: 'Frontend Development', icon: Monitor, tone: 'green', subtitle: 'HTML, CSS, JavaScript, React, Angular & TypeScript',
    description: 'Create responsive user interfaces that work on desktop, tablet and mobile devices.',
    points: ['Responsive web design', 'User interface development', 'Frontend application logic'] },
  { title: 'Backend Development', icon: Server, tone: 'cyan', subtitle: 'Java, Spring Boot, Node.js & Express',
    description: 'Understand server-side logic, REST APIs, authentication and API integration.',
    points: ['Application logic & authentication', 'REST API development', 'Frontend / backend integration'] },
  { title: 'Database Management', icon: Database, tone: 'lime', subtitle: 'MongoDB, SQL & data modeling',
    description: 'Store, update and retrieve application data with real CRUD operations.',
    points: ['Database design', 'CRUD operations', 'Application data integration'] },
  { title: 'Git, GitHub & Deployment', icon: GitBranch, tone: 'green', subtitle: 'Version control, testing & cloud deployment',
    description: 'Use collaborative development tools and learn how applications reach production.',
    points: ['Git & GitHub workflows', 'API testing and version control', 'Deployment fundamentals & Vercel'] },
] as const

const projects = [
  { title: 'E-commerce Website', group: 'FRONTEND + BACKEND', desc: 'Catalog, shopping cart, checkout workflow and an administrative interface.', icon: Laptop, tone: 'green' },
  { title: 'Business Application', group: 'FULL-STACK DEVELOPMENT', desc: 'Internal workflow, user roles and structured data management.', icon: BriefcaseBusiness, tone: 'cyan' },
  { title: 'Learning Platform', group: 'LEARNING SYSTEMS', desc: 'Course library, student profiles and progress dashboard.', icon: BookOpen, tone: 'lime' },
  { title: 'Job Portal', group: 'DATABASE + APIs', desc: 'Job listings, search filters, candidate profiles and applications.', icon: Users, tone: 'cyan' },
  { title: 'Healthcare Application', group: 'PRACTICAL DEVELOPMENT', desc: 'Appointment management, profiles and service workflows.', icon: ShieldCheck, tone: 'green' },
  { title: 'Admin Dashboard', group: 'UI + DATA', desc: 'Charts, metrics, reporting and role-based views.', icon: Monitor, tone: 'lime' },
] as const

const method = [
  { n: '01', title: 'Learn', description: 'Start with programming and web fundamentals.', icon: BookOpen },
  { n: '02', title: 'Practice', description: 'Solve coding exercises and hands-on tasks.', icon: Code2 },
  { n: '03', title: 'Build', description: 'Create projects in your chosen technology stack.', icon: Laptop },
  { n: '04', title: 'Connect', description: 'Combine frontend, backend, databases and APIs.', icon: Workflow },
  { n: '05', title: 'Deploy', description: 'Learn application deployment fundamentals.', icon: Rocket },
  { n: '06', title: 'Prepare', description: 'Strengthen your portfolio, resume and interviews.', icon: GraduationCap },
] as const

const faqs = [
  ['What is web development?', 'Web development is the process of creating and maintaining websites and web applications. It includes frontend, backend, databases, APIs and deployment.'],
  ['Which web development course is best for beginners?', 'The right course depends on your goals. Beginners can start with a structured course that covers programming basics, frontend and backend development, and databases.'],
  ['Is MERN Stack good for web development?', 'Yes. MERN combines MongoDB, Express, React and Node.js to build modern web applications.'],
  ['Which is better: MERN or MEAN Stack?', 'MERN uses React while MEAN uses Angular. Choose based on the frontend framework you want to learn.'],
  ['Is Java Full Stack good for a career?', 'Java Full Stack is a useful path for students interested in Java, Spring Boot, React and enterprise applications.'],
  ['Is Next.js useful for web development?', 'Yes. Next.js is a React framework with routing, server-side rendering, static generation and API routes.'],
  ['How long does web development training take?', 'The course duration ranges from 3–4 months for Next.js to 5–6 months for Java Full Stack. Learning speed depends on your background and practice.'],
  ['Do I need previous coding experience?', 'No. Beginners can start with programming fundamentals and progress step by step.'],
  ['What jobs can I explore after training?', 'Depending on your skills and portfolio, possible roles include Web Developer, Frontend Developer, Backend Developer, Full Stack Developer, Java Developer, React Developer and Node.js Developer.'],
] as const

function openRegistration() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('open-registration'))
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="wd-eyebrow"><span className="wd-pulse-dot" />{children}</span>
}

function SectionHeading({ label, title, description }: { label: string; title: string; description: string }) {
  return <div className="wd-section-heading"><Eyebrow>{label}</Eyebrow><h2>{title}</h2><p>{description}</p></div>
}

function LeadForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [course, setCourse] = useState('')
  const [mode, setMode] = useState('Classroom')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const leadId = useRef<string | null>(null)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting) return
    setError('')
    setSubmitting(true)
    try {
      leadId.current ||= crypto.randomUUID()
      const delivery = await submitContactOrDemoLead({
        name: name.trim(), email: email.trim(), phone: formatPhoneWithCode(phone),
        course,
        message: `Web Development counselling enquiry. Preferred learning mode: ${mode}. Course: ${course}.`,
        subject: `Web Development course enquiry — ${course}`,
      }, 'registration', leadId.current)
      try {
        sessionStorage.setItem('xpertsedge_thank_you_v1', JSON.stringify({ source: 'registration', notice: delivery.notice, createdAt: Date.now() }))
        sessionStorage.setItem('reg_popup_seen', '1')
      } catch {
        // The database request already succeeded; show a success message instead of submitting twice.
        setError('Your enquiry was submitted successfully. Our team will contact you soon.')
        return
      }
      router.replace('/thank-you')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit the form. Please try again.')
    } finally { setSubmitting(false) }
  }

  return <form className="wd-lead-form" onSubmit={submit}>
    <h3>Request Your Free Course Counselling</h3>
    <p>Share your details and our course advisor will reach out.</p>
    <label htmlFor="wd-name">Full name</label>
    <input id="wd-name" name="name" autoComplete="name" type="text" required minLength={2} maxLength={150}
      value={name} onChange={e => setName(filterName(e.target.value))} placeholder="Enter your full name" />
    <label htmlFor="wd-email">Email address</label>
    <input id="wd-email" name="email" autoComplete="email" type="email" required maxLength={254}
      value={email} onChange={e => setEmail(filterEmail(e.target.value))} placeholder="you@example.com" />
    <label htmlFor="wd-phone">Mobile number</label>
    <div className="wd-phone-field"><span>+91</span><input id="wd-phone" name="phone" type="tel" autoComplete="tel-national"
      required inputMode="numeric" pattern="[6-9][0-9]{9}" title="Enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9" maxLength={10}
      value={phone} onChange={e => setPhone(filterPhone(e.target.value))} placeholder="9876543210" /></div>
    <label htmlFor="wd-course">Preferred course</label>
    <select id="wd-course" required value={course} onChange={e => setCourse(e.target.value)}>
      <option value="">Select a course</option>
      {courses.map(c => <option key={c.slug} value={c.title}>{c.title}</option>)}
    </select>
    <fieldset className="wd-mode"><legend>Preferred learning mode</legend>
      <label><input type="radio" name="wd-mode" checked={mode === 'Classroom'} onChange={() => setMode('Classroom')} /> Classroom</label>
      <label><input type="radio" name="wd-mode" checked={mode === 'Online'} onChange={() => setMode('Online')} /> Online</label>
    </fieldset>
    {error && <p className="wd-form-message" role="status" aria-live="polite">{error}</p>}
    <button className="wd-primary wd-form-button" type="submit" disabled={submitting}>
      {submitting ? 'Submitting securely…' : 'Request Free Counselling'} <ArrowRight size={17} />
    </button>
    <small>By submitting, you agree to be contacted about XpertsEdge training programs. Mobile OTP verification will appear if enabled.</small>
  </form>
}

export default function WebDevelopmentLanding() {
  // The dedicated page already includes an inline enquiry form. Keep the global
  // registration popup available for manual CTAs, but prevent its automatic
  // 11.5s appearance over someone using this form.
  useEffect(() => {
    try { sessionStorage.setItem('reg_popup_seen', '1') } catch { /* private-mode storage may be restricted */ }
  }, [])

  return <main className="wd-page">
    <section className="wd-hero wd-grid-pattern">
      <div className="wd-orb wd-orb-one" aria-hidden="true" /><div className="wd-orb wd-orb-two" aria-hidden="true" />
      <div className="wd-container wd-hero-grid">
        <div className="wd-hero-content">
          <Eyebrow>INDUSTRY-FOCUSED TRAINING · CHENNAI</Eyebrow>
          <div className="wd-breadcrumb"><Link href="/training-services">Training Services</Link><span>/</span><span>Web Development</span></div>
          <h1>Web Development<br /><span>Courses in Chennai</span></h1>
          <p className="wd-hero-lead">Build practical web development skills with Java Full Stack, MERN, MEAN or Next.js training at XpertsEdge Technologies.</p>
          <p className="wd-hero-copy">Learn by doing. Create real projects, strengthen your portfolio and prepare for software development opportunities with structured, career-focused training.</p>
          <div className="wd-hero-actions">
            <a href="#learning-tracks" className="wd-primary">Explore Courses <ArrowRight size={18}/></a>
            <button type="button" className="wd-secondary" onClick={openRegistration}>Talk to Our Course Advisor <ArrowUpRight size={17}/></button>
          </div>
          <div className="wd-hero-metrics"><span><CheckCircle2 size={16}/> Practical Coding</span><span><Code2 size={16}/> Real Projects</span><span><GraduationCap size={16}/> Interview Preparation</span></div>
        </div>
        <div className="wd-hero-visual" aria-label="Web development technology illustration">
          <div className="wd-terminal-top"><span><i/><i/><i/></span><b>fullstack-project / developer-workspace</b><span>● LIVE</span></div>
          <div className="wd-terminal-tabs" aria-hidden="true"><span><Code2 size={14}/> app.tsx</span><small>src / learning / fullstack</small></div>
          <div className="wd-terminal-body">
            <div className="wd-code-line"><span>01</span><code><em>import</em> React <em>from</em> <strong>&apos;react&apos;</strong>;</code></div>
            <div className="wd-code-line"><span>02</span><code><em>import</em> &#123; api &#125; <em>from</em> <strong>&apos;./services&apos;</strong>;</code></div>
            <div className="wd-code-line"><span>03</span><code>&nbsp;</code></div>
            <div className="wd-code-line"><span>04</span><code><em>async function</em> <b>buildFuture</b>() &#123;</code></div>
            <div className="wd-code-line"><span>05</span><code>&nbsp; <em>const</em> skills = [</code></div>
            <div className="wd-code-line"><span>06</span><code>&nbsp;&nbsp; <strong>&apos;React&apos;</strong>, <strong>&apos;Node.js&apos;</strong>, <strong>&apos;Java&apos;</strong>,</code></div>
            <div className="wd-code-line"><span>07</span><code>&nbsp;&nbsp; <strong>&apos;MongoDB&apos;</strong>, <strong>&apos;Next.js&apos;</strong></code></div>
            <div className="wd-code-line"><span>08</span><code>&nbsp; ];</code></div>
            <div className="wd-code-line"><span>09</span><code>&nbsp; <em>return</em> <b>await</b> api.<b>deploy</b>(skills);</code></div>
            <div className="wd-code-line"><span>10</span><code>&#125;</code></div>
            <div className="wd-code-line"><span>11</span><code><span className="wd-terminal-cursor">▋</span></code></div>
          </div>
          <div className="wd-terminal-bottom"><span><span className="wd-live-dot"/> PROJECT-BASED TRAINING</span><span>React · TypeScript · APIs</span></div>
          <div className="wd-terminal-floating"><Rocket size={22}/><span><strong>Learn. Build. Deploy.</strong><small>From fundamentals to real projects</small></span></div>
        </div>
      </div>
    </section>

    <section className="wd-strip"><div className="wd-container">
      <div className="wd-strip-head"><Eyebrow>THE PRACTICAL APPROACH</Eyebrow><h2>Learn Web Development with Practical Training</h2><p>Understand how websites and web applications are built—from what users see to the systems working behind the scenes.</p></div>
      <div className="wd-strip-grid">
        {[
          { title: 'Frontend', icon: Monitor, detail: 'HTML · CSS · JavaScript · React' },
          { title: 'Backend', icon: Server, detail: 'Java · Spring Boot · Node.js' },
          { title: 'Databases', icon: Database, detail: 'MongoDB · SQL · CRUD' },
          { title: 'Dev Tools', icon: GitBranch, detail: 'Git · GitHub · Deployment' },
        ].map(x => { const Icon = x.icon; return <div className="wd-strip-card" key={x.title}><Icon size={21}/><strong>{x.title}</strong><small>{x.detail}</small></div> })}
      </div>
      <p className="wd-strip-foot">Suitable for beginners, students, graduates and working professionals.</p>
    </div></section>

    <section className="wd-section" id="learning-tracks"><div className="wd-container">
      <SectionHeading label="CHOOSE YOUR LEARNING PATH" title="Choose the Right Web Development Course" description="Four focused learning paths. Choose based on your interests, technical background and career goals." />
      <div className="wd-course-grid">
        {courses.map((c, i) => { const Icon = c.icon; return <article className={`wd-course-card wd-tone-${c.tone} ${i === 2 ? 'wd-featured' : ''}`} key={c.slug}>
          {i === 2 && <span className="wd-popular-ribbon"><Sparkles size={12}/> POPULAR</span>}
          <div className="wd-course-head"><div className="wd-course-icon"><Icon size={22}/></div><span>{c.tag}</span></div>
          <h3>{c.title}</h3><div className="wd-stack">{c.stack}</div><p>{c.description}</p>
          <div className="wd-course-meta"><div><small>COURSE DURATION</small><strong>{c.duration}</strong></div><div><small>COURSE INVESTMENT</small><strong>{c.price}</strong></div></div>
          <ul>{c.highlights.map(h => <li key={h}><Check size={14}/>{h}</li>)}</ul>
          <div className="wd-course-actions"><Link href={`/curriculum/${c.slug}?from=web-development`} className="wd-primary" aria-label={`View Curriculum for ${c.title}`}>View Curriculum <ArrowRight size={16}/></Link></div>
        </article> })}
      </div>
    </div></section>

    <section className="wd-section wd-section-dark" id="curriculum-pillars"><div className="wd-container">
      <SectionHeading label="SKILLS YOU WILL BUILD" title="What Will You Learn in Web Development?" description="Build the frontend, backend, database and developer-tool skills needed to create modern web applications." />
      <div className="wd-pillar-grid">{pillars.map(p => { const Icon = p.icon; return <article className={`wd-pillar-card wd-tone-${p.tone}`} key={p.title}>
        <div className="wd-pillar-top"><div className="wd-course-icon"><Icon size={21}/></div><span>CORE SKILLS</span></div>
        <h3>{p.title}</h3><strong>{p.subtitle}</strong><p>{p.description}</p>
        <ul>{p.points.map(a => <li key={a}><CheckCircle2 size={14}/>{a}</li>)}</ul>
        <div className="wd-progress"><span/></div>
      </article> })}</div>
    </div></section>

    <section className="wd-section" id="projects"><div className="wd-container">
      <SectionHeading label="BUILD YOUR PORTFOLIO" title="Build Real-World Web Development Projects" description="Go beyond theory. Apply your skills to practical applications and demonstrate your work with a project portfolio." />
      <div className="wd-project-grid">{projects.map(p => { const Icon=p.icon; return <article className={`wd-project-card wd-tone-${p.tone}`} key={p.title}>
        <div className="wd-project-top"><Icon size={19}/><small>{p.group}</small></div><h3>{p.title}</h3><p>{p.desc}</p><span><CheckCircle2 size={14}/> Portfolio-ready practice</span>
      </article>})}</div>
    </div></section>

    <section className="wd-section wd-section-dark" id="compare"><div className="wd-container">
      <SectionHeading label="QUICK COMPARISON" title="Compare Our Web Development Courses" description="Not sure where to start? Compare the technologies, course duration and learning focus." />
      <div className="wd-table-wrap" role="region" aria-label="Web development course comparison" tabIndex={0}><table><thead><tr><th>COURSE</th><th>TECHNOLOGIES</th><th>DURATION</th><th>SUITABLE FOR</th><th>CURRICULUM</th></tr></thead><tbody>
        {courses.map(c => <tr key={c.slug}><td><strong>{c.title}</strong></td><td>{c.stack}</td><td>{c.duration}</td><td>{c.suitable}</td><td><Link href={`/curriculum/${c.slug}?from=web-development`} aria-label={`View course: ${c.title}`}>View course <ArrowUpRight size={14}/></Link></td></tr>)}
      </tbody></table></div>
      <p className="wd-compare-note">Prefer Java? Choose Java Full Stack. Prefer React? Consider MERN. Prefer Angular? Consider MEAN. Already know React? Explore Next.js.</p>
    </div></section>

    <section className="wd-section" id="pedagogy"><div className="wd-container">
      <SectionHeading label="OUR LEARNING PROCESS" title="Our Web Development Training Approach" description="A structured journey from programming foundations to practical application and career preparation." />
      <div className="wd-steps-grid">{method.map(m => { const Icon=m.icon; return <article className="wd-step-card" key={m.n}><span>{m.n} / 06</span><Icon size={23}/><h3>{m.title}</h3><p>{m.description}</p></article> })}</div>
    </div></section>

    <section className="wd-section wd-section-dark" id="career"><div className="wd-container wd-dual-grid">
      <div className="wd-career-box"><Eyebrow>CAREER OPPORTUNITIES</Eyebrow><h2>Roles You Can Explore After Training</h2><p>Based on your chosen stack, skills, projects and interview performance, you can explore opportunities across frontend, backend and full-stack development.</p>
        <div className="wd-role-tags">{['Web Developer','Full Stack Developer','Frontend Developer','Backend Developer','Java Developer','React Developer','Node.js Developer','MERN / MEAN Developer','Next.js Developer'].map(r=><span key={r}><Check size={13}/>{r}</span>)}</div>
        <small>Career outcomes vary with your skills, practical experience and job-market conditions.</small>
      </div>
      <div className="wd-career-box"><Eyebrow>WHO CAN JOIN</Eyebrow><h2>Who Can Join Our Courses?</h2><p>Our web development training paths are built for different starting points.</p>
        {[
          ['Students', 'Build a foundation before starting your career.'],
          ['Fresh Graduates', 'Create practical skills and a portfolio.'],
          ['Beginners', 'Learn programming step by step.'],
          ['Working Professionals', 'Update your existing development skills.'],
          ['Career Switchers', 'Prepare for a new technical path.'],
        ].map(([a,b])=><div className="wd-audience-row" key={a}><CheckCircle2 size={17}/><span><strong>{a}</strong><small>{b}</small></span></div>)}
        <button type="button" className="wd-secondary wd-full" onClick={openRegistration}>Talk to a Course Advisor <ArrowRight size={16}/></button>
      </div>
    </div></section>

    <section className="wd-section" id="why-us"><div className="wd-container">
      <SectionHeading label="WHY XPERTSEDGE" title="Why Choose XpertsEdge Technologies?" description="Practical, industry-focused web development learning backed by projects, guidance and preparation for interviews." />
      <div className="wd-benefits-grid">{[
        { t:'Industry-Focused Curriculum',d:'Relevant technologies and structured learning paths.',i:BookOpen },
        { t:'Hands-On Coding',d:'Practice sessions and real-world project work.',i:Code2 },
        { t:'Full-Stack Coverage',d:'Learn how UIs, APIs, servers and data work together.',i:Layers3 },
        { t:'Portfolio Development',d:'Create projects you can discuss in interviews.',i:Laptop },
        { t:'Resume & Interview Support',d:'Guidance, mock interviews and job readiness.',i:GraduationCap },
        { t:'Technical Guidance',d:'Learn with practical feedback and support.',i:Award },
      ].map(b=>{const Icon=b.i;return <article className="wd-benefit" key={b.t}><Icon size={22}/><h3>{b.t}</h3><p>{b.d}</p></article>})}</div>
    </div></section>

    <section className="wd-section wd-section-dark" id="faq"><div className="wd-container">
      <SectionHeading label="QUESTIONS ANSWERED" title="Frequently Asked Questions" description="Answers to common questions about courses, technology stacks and learning paths." />
      <div className="wd-faq-grid">{faqs.map(([q,a])=><details key={q} className="wd-faq"><summary>{q}<ChevronDown size={17}/></summary><p>{a}</p></details>)}</div>
    </div></section>

    <section className="wd-section wd-end-section" id="lead-capture"><div className="wd-container"><div className="wd-end-card">
      <div className="wd-end-copy"><Eyebrow>YOUR NEXT STEP STARTS HERE</Eyebrow><h2>Start Your Web Development Journey in Chennai Today</h2><p>Find the learning path that fits your goals. Learn current technologies, build practical projects and prepare for development opportunities at XpertsEdge Technologies.</p>
        <div className="wd-end-bullets"><span><CheckCircle2 size={18}/> Choose from four development tracks</span><span><CheckCircle2 size={18}/> Practice with real projects</span><span><CheckCircle2 size={18}/> Build a portfolio and prepare for interviews</span></div>
        <span className="wd-location"><Globe2 size={16}/> Anna Nagar, Chennai · Online and classroom enquiries</span>
      </div><LeadForm />
    </div></div></section>
  </main>
}
