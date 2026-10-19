'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────
type Cert = {
  name: string
  courseTitle: string
  subTitle: string
  level: string
  expectedOutcome: string
  whoCanLearn: string[]
  keyHighlights: string[]
  shortDescription: string
}

type Category = {
  id: string
  title: string
  explore: string
  icon: string
  logo: string
  gradient: string
  description: string
  certifications: Cert[]
}

const courseData: Category[] = [
  {
    id: 'istqb',
    title: 'ISTQB Certification',
    explore: 'Explore ISTQB',
    icon: '🧪',
    logo: 'ISTQB',
    gradient: 'from-blue-500 via-indigo-500 to-violet-500',
    description: 'Important software testing certifications for manual, automation, performance and security testing.',
    certifications: [
      {
        name: 'Certified Tester Foundation Level (CTFL) v4.0',
        courseTitle: 'Certified Tester Foundation Level (CTFL) v4.0',
        subTitle: 'Software Testing Fundamentals',
        level: 'Foundation',
        expectedOutcome: 'Strong base in manual testing, test process, test design, defect lifecycle, and QA interview preparation.',
        whoCanLearn: ['Fresh Graduates', 'Manual Testing Beginners', 'Non-IT to IT Career Switchers', 'Junior Testers'],
        keyHighlights: ['Software testing basics', 'SDLC and STLC concepts', 'Test case design techniques', 'Defect reporting process', 'Interview-oriented preparation'],
        shortDescription: 'The CTFL certification helps learners understand the fundamentals of software testing, testing principles, test process, test design techniques, defect management, and QA best practices.',
      },
      {
        name: 'Certified Tester Foundation Level Agile Tester (CTFL-AT)',
        courseTitle: 'Certified Tester Foundation Level Agile Tester (CTFL-AT)',
        subTitle: 'Agile Testing Foundation',
        level: 'Foundation',
        expectedOutcome: 'Ability to understand Agile testing concepts and contribute effectively as a tester in Agile teams.',
        whoCanLearn: ['Manual Testers', 'Agile Beginners', 'Scrum Team Members', 'Junior QA Engineers', 'Automation Testing Beginners'],
        keyHighlights: ['Agile testing mindset', 'Scrum testing workflow', 'User story validation', 'Acceptance criteria testing', 'Continuous feedback and quality'],
        shortDescription: 'The CTFL-AT certification helps testers understand how testing is performed in Agile projects with Scrum practices, collaboration, user stories and continuous testing.',
      },
      {
        name: 'Certified Tester Advanced Level Test Automation Engineering (CTAL-TAE)',
        courseTitle: 'Certified Tester Advanced Level Test Automation Engineering (CTAL-TAE)',
        subTitle: 'Automation Strategy, Frameworks and Engineering',
        level: 'Advanced',
        expectedOutcome: 'Ability to design, implement, maintain, and improve automation frameworks for real-time testing projects.',
        whoCanLearn: ['Automation Testers', 'Selenium Testers', 'Playwright Testers', 'API Automation Testers', 'QA Engineers moving into automation architecture'],
        keyHighlights: ['Automation framework design', 'Test automation architecture', 'CI/CD automation integration', 'Automation maintainability', 'Tool selection approach'],
        shortDescription: 'The CTAL-TAE certification focuses on automation strategy, framework design, reusable automation, maintainability, reporting and CI/CD integration.',
      },
      {
        name: 'Certified Tester Advanced Level Test Analyst (CTAL-TA)',
        courseTitle: 'Certified Tester Advanced Level Test Analyst (CTAL-TA)',
        subTitle: 'Advanced Test Analysis and Test Design',
        level: 'Advanced',
        expectedOutcome: 'Ability to perform structured test analysis, design strong test cases, and improve functional test coverage.',
        whoCanLearn: ['Manual Testers', 'Test Analysts', 'QA Engineers', 'Functional Testers', 'Test Leads'],
        keyHighlights: ['Advanced test design techniques', 'Requirement-based testing', 'Functional test coverage', 'Risk-based testing', 'Defect analysis and reporting'],
        shortDescription: 'The CTAL-TA certification improves skills in test analysis, test case design, requirement validation, functional testing and defect communication.',
      },
      {
        name: 'Certified Tester Performance Testing (CT-PT)',
        courseTitle: 'Certified Tester Performance Testing (CT-PT)',
        subTitle: 'Load, Stress, Scalability and Reliability Testing',
        level: 'Specialist',
        expectedOutcome: 'Ability to understand performance testing concepts, workload models, performance risks, and result analysis.',
        whoCanLearn: ['Performance Testing Beginners', 'Manual Testers moving to Performance', 'Automation Testers', 'QA Engineers', 'Test Leads'],
        keyHighlights: ['Load testing basics', 'Stress and scalability testing', 'Workload modeling', 'Result interpretation', 'Performance defect reporting'],
        shortDescription: 'The CT-PT certification helps testers understand response time, throughput, scalability, reliability and system behavior under load.',
      },
      {
        name: 'Certified Tester Security Tester (CT-SEC)',
        courseTitle: 'Certified Tester Security Tester (CT-SEC)',
        subTitle: 'Security Testing Concepts and Risk-Based Validation',
        level: 'Specialist',
        expectedOutcome: 'Ability to understand security testing scope, risk areas, vulnerabilities, and security validation techniques.',
        whoCanLearn: ['QA Engineers', 'Security Testing Beginners', 'Manual Testers', 'Automation Testers', 'Test Leads working with secure applications'],
        keyHighlights: ['Security testing fundamentals', 'Vulnerability awareness', 'Risk-based security testing', 'Security requirements validation', 'Security defect reporting'],
        shortDescription: 'The CT-SEC certification focuses on security risks, vulnerabilities, security requirements, testing tools and practical security validation.',
      },
    ],
  },
  {
    id: 'aws',
    title: 'AWS Certification',
    explore: 'Explore AWS',
    icon: '☁️',
    logo: 'AWS',
    gradient: 'from-amber-500 via-orange-500 to-yellow-500',
    description: 'Important AWS certifications for cloud, architecture, development, operations, DevOps, security and AI.',
    certifications: [
      {
        name: 'AWS Certified Cloud Practitioner',
        courseTitle: 'AWS Certified Cloud Practitioner',
        subTitle: 'AWS Cloud Basics and Cloud Fundamentals',
        level: 'Foundation',
        expectedOutcome: 'Strong understanding of AWS cloud concepts, services, security basics, pricing, and cloud career foundation.',
        whoCanLearn: ['Cloud Beginners', 'Fresh Graduates', 'Non-IT to IT Career Switchers', 'Testing Professionals', 'Support Engineers'],
        keyHighlights: ['Cloud computing basics', 'AWS global infrastructure', 'EC2, S3 and IAM basics', 'Security and billing awareness', 'Certification-oriented preparation'],
        shortDescription: 'AWS Certified Cloud Practitioner is an entry-level certification for learners who want to understand AWS cloud concepts, core services, billing, pricing and security basics.',
      },
      {
        name: 'AWS Certified Solutions Architect - Associate',
        courseTitle: 'AWS Certified Solutions Architect - Associate',
        subTitle: 'Design Scalable and Secure AWS Architectures',
        level: 'Associate',
        expectedOutcome: 'Ability to design secure, scalable, reliable, and cost-optimized cloud architectures using AWS services.',
        whoCanLearn: ['AWS Beginners with Basic Knowledge', 'Cloud Engineers', 'DevOps Beginners', 'System Administrators', 'IT Professionals'],
        keyHighlights: ['EC2 and load balancing', 'S3 and storage services', 'VPC networking', 'IAM security', 'High availability architecture'],
        shortDescription: 'This certification is useful for cloud professionals who want to design AWS solutions with compute, storage, database, networking, security and cost optimization.',
      },
      {
        name: 'AWS Certified Developer - Associate',
        courseTitle: 'AWS Certified Developer - Associate',
        subTitle: 'Build and Deploy Applications on AWS',
        level: 'Associate',
        expectedOutcome: 'Ability to develop, deploy, monitor, and secure applications using AWS developer services.',
        whoCanLearn: ['Java Developers', 'Full Stack Developers', 'Backend Developers', 'Cloud Developers', 'DevOps Learners'],
        keyHighlights: ['AWS SDK basics', 'Lambda functions', 'API Gateway', 'DynamoDB', 'SQS and SNS integration'],
        shortDescription: 'AWS Developer Associate helps developers learn cloud application development, serverless services, API integration, messaging, databases and deployment workflows.',
      },
      {
        name: 'AWS Certified CloudOps Engineer - Associate',
        courseTitle: 'AWS Certified CloudOps Engineer - Associate',
        subTitle: 'AWS Operations, Monitoring and Administration',
        level: 'Associate',
        expectedOutcome: 'Ability to manage AWS resources, monitor cloud systems, automate operations, and maintain cloud reliability.',
        whoCanLearn: ['System Administrators', 'Cloud Support Engineers', 'AWS Learners', 'DevOps Beginners', 'IT Support Professionals'],
        keyHighlights: ['EC2 administration', 'CloudWatch monitoring', 'IAM access control', 'Backup and recovery', 'Operational troubleshooting'],
        shortDescription: 'AWS CloudOps certification focuses on operating AWS workloads, monitoring systems, managing access, automating tasks and troubleshooting cloud environments.',
      },
      {
        name: 'AWS Certified DevOps Engineer - Professional',
        courseTitle: 'AWS Certified DevOps Engineer - Professional',
        subTitle: 'AWS CI/CD, Automation and Cloud Operations',
        level: 'Professional',
        expectedOutcome: 'Ability to implement DevOps practices, CI/CD pipelines, automation, monitoring, and reliable delivery on AWS.',
        whoCanLearn: ['DevOps Engineers', 'Cloud Engineers', 'AWS Administrators', 'System Engineers', 'Senior IT Professionals'],
        keyHighlights: ['CodePipeline and CodeBuild', 'Infrastructure automation', 'Monitoring and logging', 'Deployment strategies', 'Reliability and recovery'],
        shortDescription: 'AWS DevOps Engineer Professional focuses on automation, CI/CD pipelines, monitoring, deployment strategies, reliability engineering and cloud operations.',
      },
      {
        name: 'AWS Certified Security - Specialty',
        courseTitle: 'AWS Certified Security - Specialty',
        subTitle: 'Cloud Security, IAM, Encryption and Compliance',
        level: 'Specialty',
        expectedOutcome: 'Ability to understand AWS security controls, identity management, encryption, monitoring, and compliance-focused cloud security.',
        whoCanLearn: ['Cloud Engineers', 'Security Beginners', 'DevOps Engineers', 'System Administrators', 'AWS Professionals'],
        keyHighlights: ['IAM security', 'KMS encryption', 'CloudTrail auditing', 'GuardDuty basics', 'Network security'],
        shortDescription: 'AWS Security Specialty certification focuses on identity access management, encryption, auditing, threat detection, secure networking and compliance awareness.',
      },
      {
        name: 'AWS Certified AI Practitioner',
        courseTitle: 'AWS Certified AI Practitioner',
        subTitle: 'AI, Machine Learning and Generative AI Fundamentals',
        level: 'Foundation',
        expectedOutcome: 'Ability to understand AI, machine learning, generative AI concepts, and responsible AI usage on AWS.',
        whoCanLearn: ['AI Beginners', 'Cloud Learners', 'Testing Professionals', 'Developers', 'Students'],
        keyHighlights: ['AI fundamentals', 'Machine learning concepts', 'Generative AI basics', 'Responsible AI awareness', 'AWS AI services overview'],
        shortDescription: 'AWS AI Practitioner certification introduces AI and machine learning concepts, generative AI basics and responsible usage of AI services in AWS.',
      },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & Kubernetes',
    explore: 'Explore DevOps',
    icon: '⚙️',
    logo: 'K8s',
    gradient: 'from-cyan-500 via-sky-500 to-blue-500',
    description: 'Important DevOps and Kubernetes certifications for cloud native engineering and automation careers.',
    certifications: [
      {
        name: 'Kubernetes and Cloud Native Associate (KCNA)',
        courseTitle: 'Kubernetes and Cloud Native Associate (KCNA)',
        subTitle: 'Kubernetes and Cloud Native Fundamentals',
        level: 'Foundation',
        expectedOutcome: 'Strong understanding of Kubernetes basics, containers, cloud native concepts, and DevOps foundation.',
        whoCanLearn: ['DevOps Beginners', 'Cloud Learners', 'Docker Beginners', 'Fresh Graduates', 'System Admin Beginners'],
        keyHighlights: ['Container basics', 'Kubernetes fundamentals', 'Cloud native concepts', 'Microservices awareness', 'DevOps foundation'],
        shortDescription: 'KCNA is a beginner-friendly certification that validates knowledge of Kubernetes, containers, cloud native ecosystem and modern DevOps concepts.',
      },
      {
        name: 'Certified Kubernetes Administrator (CKA)',
        courseTitle: 'Certified Kubernetes Administrator (CKA)',
        subTitle: 'Kubernetes Cluster Administration',
        level: 'Professional',
        expectedOutcome: 'Ability to administer Kubernetes clusters, manage workloads, configure networking, storage, and troubleshoot cluster issues.',
        whoCanLearn: ['DevOps Engineers', 'Cloud Engineers', 'System Administrators', 'Kubernetes Learners', 'Docker Learners'],
        keyHighlights: ['Cluster administration', 'Pods and deployments', 'Networking and services', 'Storage management', 'Troubleshooting'],
        shortDescription: 'CKA certification is important for DevOps engineers who manage Kubernetes clusters, deployments, networking, storage, monitoring and troubleshooting.',
      },
      {
        name: 'Certified Kubernetes Application Developer (CKAD)',
        courseTitle: 'Certified Kubernetes Application Developer (CKAD)',
        subTitle: 'Kubernetes Application Deployment',
        level: 'Professional',
        expectedOutcome: 'Ability to design, build, configure, and expose cloud native applications using Kubernetes.',
        whoCanLearn: ['Developers', 'DevOps Engineers', 'Cloud Engineers', 'Application Deployment Learners', 'Kubernetes Learners'],
        keyHighlights: ['Application deployment', 'Pods and services', 'ConfigMaps and secrets', 'Resource configuration', 'Application troubleshooting'],
        shortDescription: 'CKAD certification focuses on deploying and managing applications in Kubernetes using pods, deployments, services, configuration and secrets.',
      },
      {
        name: 'Certified Kubernetes Security Specialist (CKS)',
        courseTitle: 'Certified Kubernetes Security Specialist (CKS)',
        subTitle: 'Kubernetes Security and Cluster Protection',
        level: 'Specialist',
        expectedOutcome: 'Ability to secure Kubernetes clusters, workloads, network policies, and cloud native applications.',
        whoCanLearn: ['Kubernetes Administrators', 'DevOps Security Engineers', 'Cloud Security Learners', 'Senior DevOps Engineers', 'Security Testing Beginners'],
        keyHighlights: ['Cluster security', 'Workload security', 'Network policies', 'Runtime security', 'Security best practices'],
        shortDescription: 'CKS is an advanced certification for professionals who want to secure Kubernetes clusters, workloads, networking and container-based applications.',
      },
    ],
  },
  {
    id: 'data',
    title: 'Data Certifications',
    explore: 'Explore Data',
    icon: '📊',
    logo: 'DATA',
    gradient: 'from-emerald-500 via-green-500 to-teal-500',
    description: 'Important data certifications for analytics, Power BI, Azure Data, Google Data and AWS Data Engineering.',
    certifications: [
      {
        name: 'Microsoft Certified: Power BI Data Analyst Associate',
        courseTitle: 'Microsoft Certified: Power BI Data Analyst Associate',
        subTitle: 'Dashboard and Business Intelligence Reporting',
        level: 'Associate',
        expectedOutcome: 'Ability to prepare, model, visualize, analyze data, and create business reports using Power BI.',
        whoCanLearn: ['Data Analytics Beginners', 'Excel Users', 'Business Analysts', 'Reporting Professionals', 'Students'],
        keyHighlights: ['Power BI dashboards', 'Data modeling', 'DAX basics', 'Report creation', 'Business insights'],
        shortDescription: 'Power BI Data Analyst Associate certification is important for professionals who create dashboards, reports, data models and business intelligence solutions.',
      },
      {
        name: 'Microsoft Certified: Azure Data Fundamentals',
        courseTitle: 'Microsoft Certified: Azure Data Fundamentals',
        subTitle: 'Data Concepts and Azure Data Services',
        level: 'Fundamentals',
        expectedOutcome: 'Strong understanding of core data concepts, relational data, non-relational data, analytics, and Azure data services.',
        whoCanLearn: ['Data Beginners', 'Fresh Graduates', 'Cloud Beginners', 'Database Learners', 'Data Career Beginners'],
        keyHighlights: ['Data fundamentals', 'Relational data', 'Non-relational data', 'Analytics basics', 'Azure data services'],
        shortDescription: 'Azure Data Fundamentals certification helps learners understand core data concepts and data services used for databases, analytics and cloud data solutions.',
      },
      {
        name: 'Microsoft Certified: Azure Data Engineer Associate',
        courseTitle: 'Microsoft Certified: Azure Data Engineer Associate',
        subTitle: 'Azure Data Engineering and Pipelines',
        level: 'Associate',
        expectedOutcome: 'Ability to design and implement data storage, data pipelines, data processing, and analytics solutions using Azure.',
        whoCanLearn: ['Data Engineers', 'Azure Learners', 'Data Analysts', 'Cloud Data Professionals', 'Analytics Engineers'],
        keyHighlights: ['Data pipelines', 'Data storage', 'Data transformation', 'Azure Synapse basics', 'Data integration'],
        shortDescription: 'Azure Data Engineer Associate certification focuses on data engineering, data pipelines, storage, transformation and analytics solutions on Microsoft Azure.',
      },
      {
        name: 'Google Professional Data Engineer',
        courseTitle: 'Google Professional Data Engineer',
        subTitle: 'Google Cloud Data Engineering',
        level: 'Professional',
        expectedOutcome: 'Ability to design, build, secure, and manage data processing systems on Google Cloud.',
        whoCanLearn: ['Data Engineers', 'Google Cloud Learners', 'Cloud Data Professionals', 'Analytics Engineers', 'Data Pipeline Developers'],
        keyHighlights: ['Data processing systems', 'Data pipelines', 'Analytics solutions', 'Data security', 'Machine learning-ready data'],
        shortDescription: 'Google Professional Data Engineer certification is useful for professionals designing data systems, analytics pipelines and data processing solutions on Google Cloud.',
      },
      {
        name: 'AWS Certified Data Engineer - Associate',
        courseTitle: 'AWS Certified Data Engineer - Associate',
        subTitle: 'AWS Data Pipelines and Analytics Workloads',
        level: 'Associate',
        expectedOutcome: 'Ability to build data pipelines, manage data storage, transform data, and support analytics workloads on AWS.',
        whoCanLearn: ['AWS Learners', 'Data Engineers', 'Cloud Data Beginners', 'Analytics Professionals', 'Data Pipeline Learners'],
        keyHighlights: ['Data pipelines', 'Data lake concepts', 'Data transformation', 'AWS analytics services', 'Data storage and processing'],
        shortDescription: 'AWS Data Engineer Associate certification focuses on building and maintaining data pipelines, storage, transformation and analytics workloads using AWS services.',
      },
    ],
  },
  {
    id: 'agile',
    title: 'Agile & Project Management',
    explore: 'Explore Agile',
    icon: '📋',
    logo: 'AGILE',
    gradient: 'from-fuchsia-500 via-pink-500 to-rose-500',
    description: 'Important Agile, Scrum and Project Management certifications for team leadership and delivery.',
    certifications: [
      {
        name: 'Professional Scrum Master I (PSM I)',
        courseTitle: 'Professional Scrum Master I (PSM I)',
        subTitle: 'Scrum Master and Agile Delivery Foundation',
        level: 'Scrum',
        expectedOutcome: 'Ability to understand Scrum framework, Scrum roles, events, artifacts, and Agile team facilitation.',
        whoCanLearn: ['Scrum Beginners', 'QA Leads', 'Project Coordinators', 'Agile Team Members', 'Team Leads'],
        keyHighlights: ['Scrum framework', 'Scrum roles', 'Scrum events', 'Agile mindset', 'Team facilitation'],
        shortDescription: 'PSM I certification validates understanding of Scrum framework, Scrum Master responsibilities, Agile delivery and team collaboration.',
      },
      {
        name: 'Professional Scrum Product Owner I (PSPO I)',
        courseTitle: 'Professional Scrum Product Owner I (PSPO I)',
        subTitle: 'Product Ownership and Value Delivery',
        level: 'Scrum',
        expectedOutcome: 'Ability to understand product ownership, backlog management, stakeholder collaboration, and value-based delivery.',
        whoCanLearn: ['Product Owner Beginners', 'Business Analysts', 'Scrum Team Members', 'Project Professionals', 'Product Managers'],
        keyHighlights: ['Product backlog', 'Value delivery', 'Stakeholder collaboration', 'Product goal', 'Agile product management'],
        shortDescription: 'PSPO I certification is useful for professionals who want to understand product ownership, backlog management, customer value and Scrum-based product delivery.',
      },
      {
        name: 'PMI Agile Certified Practitioner (PMI-ACP)',
        courseTitle: 'PMI Agile Certified Practitioner (PMI-ACP)',
        subTitle: 'Agile Project Delivery and Practices',
        level: 'Agile',
        expectedOutcome: 'Ability to understand Agile principles, Scrum, Kanban, Lean, XP, team collaboration, and Agile project delivery.',
        whoCanLearn: ['Agile Practitioners', 'Project Managers', 'Scrum Team Members', 'Delivery Leads', 'Agile Coaches'],
        keyHighlights: ['Agile principles', 'Scrum and Kanban', 'Lean and XP basics', 'Team collaboration', 'Agile delivery'],
        shortDescription: 'PMI-ACP certification covers Agile principles, practices and techniques used across Scrum, Kanban, Lean, XP and Agile project environments.',
      },
      {
        name: 'Project Management Professional (PMP)',
        courseTitle: 'Project Management Professional (PMP)',
        subTitle: 'Project Planning, Execution and Leadership',
        level: 'Project Management',
        expectedOutcome: 'Ability to understand project planning, execution, monitoring, leadership, risk management, and project delivery.',
        whoCanLearn: ['Project Managers', 'Team Leads', 'Delivery Managers', 'Senior Professionals', 'Program Coordinators'],
        keyHighlights: ['Project planning', 'Execution and monitoring', 'Risk management', 'Stakeholder management', 'Leadership and delivery'],
        shortDescription: 'PMP is a globally recognized certification for project management professionals covering planning, execution, monitoring, stakeholder management and leadership.',
      },
    ],
  },
]

function certLogo(name: string) {
  const n = name.toUpperCase()
  if (n.includes('CTFL') || n.includes('CTAL') || n.includes('CT-PT') || n.includes('CT-SEC')) return 'ISTQB'
  if (n.includes('AWS')) return 'AWS'
  if (n.includes('KUBERNETES') || n.includes('CKA') || n.includes('CKAD') || n.includes('CKS') || n.includes('KCNA')) return 'K8s'
  if (n.includes('MICROSOFT') || n.includes('POWER BI') || n.includes('AZURE')) return 'MS'
  if (n.includes('GOOGLE')) return 'GCP'
  if (n.includes('SCRUM')) return 'SCRUM'
  if (n.includes('PMI') || n.includes('PMP')) return 'PMI'
  return 'CERT'
}

// ─── Flip card ────────────────────────────────────────────────────────────────
function FlipCard({ cert, index, gradient }: { cert: Cert; index: number; gradient: string }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <div
      className={`flip-card h-[520px] ${flipped ? 'is-flipped' : ''}`}
      onClick={() => setFlipped((v) => !v)}
    >
      <div className="flip-card-inner">
        {/* Front */}
        <div className="flip-face surface-card rounded-2xl p-6 border border-primary/15 flex flex-col overflow-hidden">
          <div className="flex items-start justify-between gap-3 mb-1">
            <p className="text-xs font-bold text-primary leading-snug">{index + 1}. {cert.name}</p>
            <span className={`flex-shrink-0 text-[11px] font-extrabold text-white px-2.5 py-1.5 rounded-lg bg-gradient-to-br ${gradient}`}>
              {certLogo(cert.name)}
            </span>
          </div>
          <div className="h-px bg-border my-4" />

          <div className="grid grid-cols-[110px_1fr] gap-2 text-sm mb-3">
            <span className="text-muted-foreground font-bold">Course Title</span>
            <span className="text-foreground font-medium">: {cert.courseTitle}</span>
          </div>
          <div className="grid grid-cols-[110px_1fr] gap-2 text-sm mb-3">
            <span className="text-muted-foreground font-bold">Sub Title</span>
            <span className="text-foreground font-medium">: {cert.subTitle}</span>
          </div>
          <div className="grid grid-cols-[110px_1fr] gap-2 text-sm mb-3">
            <span className="text-muted-foreground font-bold">Level</span>
            <span className="text-foreground font-medium">: {cert.level}</span>
          </div>

          <div className="mt-3 p-4 rounded-xl bg-primary/10 text-sm text-foreground leading-relaxed">
            <strong className="text-primary">Expected Outcome:</strong>
            <br />
            {cert.expectedOutcome}
          </div>

          <div className="mt-auto pt-4 text-center">
            <span className="inline-block w-full py-2.5 rounded-xl bg-muted text-muted-foreground text-xs font-semibold">
              Hover / tap to view full details
            </span>
          </div>
        </div>

        {/* Back */}
        <div
          className="flip-face flip-face-back rounded-2xl p-6 overflow-y-auto text-white"
          style={{ background: 'linear-gradient(135deg, #0f172a 0%, #052e16 100%)' }}
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <span className="text-[11px] font-extrabold px-3 py-1.5 rounded-full bg-white/10 text-primary border border-white/10">
              {cert.name}
            </span>
            <span className={`flex-shrink-0 text-[11px] font-extrabold text-white px-2.5 py-1.5 rounded-lg bg-gradient-to-br ${gradient}`}>
              {certLogo(cert.name)}
            </span>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-semibold text-primary mb-2">Who Can Learn:</h4>
            <ul className="list-disc pl-5 flex flex-col gap-1.5">
              {cert.whoCanLearn.map((w) => (
                <li key={w} className="text-sm text-white/85 leading-snug">{w}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-semibold text-primary mb-2">Key Highlights:</h4>
            <ul className="list-disc pl-5 flex flex-col gap-1.5">
              {cert.keyHighlights.map((h) => (
                <li key={h} className="text-sm text-white/85 leading-snug">{h}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-semibold text-primary mb-2">Short Description:</h4>
            <p className="text-sm text-white/85 leading-relaxed">{cert.shortDescription}</p>
          </div>

          <div className="mt-2 p-3 rounded-xl bg-white/10 text-center text-xs font-semibold text-primary">
            <span className="text-foreground">Xperts</span>
            <span className="text-primary">Edge</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CertificationsPage() {
  const [selected, setSelected] = useState<Category | null>(null)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Important IT Certification Training
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance mb-4">
              Industry-Recognized{' '}
              <span className="brand-gradient-text">Certifications</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
              Click a category to view certification cards. Hover or tap a card to flip and see who
              can learn, key highlights and a short description.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {selected === null ? (
              /* ─── Level 1: Category cards ─── */
              <motion.div
                key="categories"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {courseData.map((cat, i) => (
                  <motion.button
                    key={cat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    whileHover={{ y: -6 }}
                    onClick={() => setSelected(cat)}
                    className="group relative surface-card rounded-2xl p-7 text-left overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-150"
                  >
                    <span className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${cat.gradient}`} aria-hidden="true" />

                    <div className="flex items-center justify-between mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl">
                        {cat.icon}
                      </div>
                      <span className={`text-xs font-extrabold text-white px-3 py-1.5 rounded-xl bg-gradient-to-br ${cat.gradient}`}>
                        {cat.logo}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{cat.description}</p>

                    <div className="flex items-center justify-end">
                      <span className="flex items-center gap-1 text-sm font-bold text-primary">
                        {cat.explore} <ArrowRight size={15} />
                      </span>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            ) : (
              /* ─── Level 2: Flip cards ─── */
              <motion.div
                key="certs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Section header */}
                <div className="surface-card rounded-2xl p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-primary/15">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                      <span>{selected.icon}</span> <span className="brand-gradient-text">{selected.title}</span>
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Front shows title, sub title, level and expected outcome. Hover or tap each card to view full details.
                    </p>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold brand-gradient text-background glow-green w-fit flex-shrink-0"
                  >
                    <ArrowLeft size={16} /> Back to All Courses
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selected.certifications.map((cert, i) => (
                    <FlipCard key={cert.name} cert={cert} index={i} gradient={selected.gradient} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}
