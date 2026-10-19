// Auto-generated from course brochure PDFs (public/curriculum/*.pdf).
// Powers the /curriculum/[slug] pages.

export type CurriculumTopic = { group: string; items: string[] }
export type CurriculumModule = { name: string; desc: string }
export type Curriculum = {
  slug: string
  title: string
  tagline: string
  overview: string
  duration: string
  mode: string
  learn: string[]
  audience: string[]
  topics: CurriculumTopic[]
  modules: CurriculumModule[]
  outcomes: string[]
  pdf: string
}

export const curricula: Record<string, Curriculum> = {
  "java-full-stack": {
    "slug": "java-full-stack",
    "title": "Java Full Stack",
    "tagline": "Master Java Full Stack Development with Real-Time Projects",
    "overview": "A practical, project-based Java full stack program that takes you from HTML to Spring Boot to React JS. Designed by experienced software engineers, it covers the complete modern Java full stack -- frontend, advanced Java, databases, Spring, Spring Boot, REST APIs, and full stack integration -- with real-time industry projects and placement support.",
    "duration": "3-4 Months",
    "mode": "Offline / Hybrid (Anna Nagar, Chennai)",
    "learn": [
      "HTML5, CSS3, JavaScript, and Bootstrap/Tailwind CSS",
      "Core and Advanced Java with OOP concepts",
      "React JS with hooks, routing, and state management",
      "JDBC, MySQL database design and SQL",
      "Spring Core, Spring MVC, and Spring Data JPA",
      "Spring Boot and REST API development",
      "Spring Security with JWT authentication",
      "Full stack integration of React JS with Spring Boot and MySQL"
    ],
    "audience": [
      "Any graduate",
      "Freshers",
      "Working professionals"
    ],
    "topics": [
      {
        "group": "Month 1 - Foundations (Web Fundamentals & Core Java)",
        "items": [
          "HTML5: Semantic tags, forms, tables, media elements",
          "CSS3: Flexbox, Grid, animations, responsive design",
          "JavaScript: Variables, functions, DOM manipulation, events, ES6+ features",
          "Bootstrap / Tailwind CSS utility-first frameworks",
          "Java Basics: Data types, operators, control flow",
          "OOP Concepts: Classes, objects, inheritance, polymorphism, encapsulation, abstraction",
          "Exception Handling: Try-catch, custom exceptions",
          "Collections Framework: ArrayList, HashMap, LinkedList",
          "String Handling & File I/O"
        ]
      },
      {
        "group": "Frontend Mastery (Bootstrap, Tailwind, React JS)",
        "items": [
          "Bootstrap grid system, responsive breakpoints, pre-built components",
          "Tailwind CSS utility-first approach, custom design systems, dark mode, JIT compilation",
          "React JSX syntax and component-based architecture",
          "Props, State, and Lifecycle methods",
          "React Hooks: useState, useEffect, useContext",
          "React Router for SPA navigation",
          "Axios for API calls",
          "Building reusable UI components and state management fundamentals"
        ]
      },
      {
        "group": "Advanced Java & JDBC/MySQL",
        "items": [
          "Multithreading & Concurrency",
          "Generics and Lambda Expressions",
          "Functional Interfaces & Streams API",
          "Java 8+ Features: Optional, Method References",
          "Design Patterns: Singleton, Factory, Builder",
          "Inner Classes & Anonymous Classes",
          "Serialization & Deserialization",
          "JDBC Architecture & Drivers, connection pooling, PreparedStatement & CallableStatement, transaction management",
          "MySQL: database design & normalization, DDL/DML/DCL, Joins, Subqueries, Indexes, Stored Procedures & Triggers, MySQL Workbench"
        ]
      },
      {
        "group": "Spring Framework",
        "items": [
          "Inversion of Control (IoC) & Dependency Injection (DI)",
          "Bean lifecycle and scopes",
          "ApplicationContext & BeanFactory",
          "Annotations: @Component, @Autowired, @Bean, @Configuration",
          "Aspect-Oriented Programming (AOP) and SpEL",
          "Spring MVC: DispatcherServlet, Controllers/Views/Model, form handling and validation, @ControllerAdvice",
          "Spring Data JPA: ORM with Hibernate, entity mapping and relationships, JPQL and native queries, CrudRepository/JpaRepository"
        ]
      },
      {
        "group": "Spring Boot & REST API",
        "items": [
          "Auto-configuration and starter dependencies",
          "application.properties / YAML configuration",
          "Embedded Tomcat server",
          "Spring Boot DevTools for hot reload",
          "Actuator for monitoring, Profiles for dev/test/prod",
          "Exception handling with @RestControllerAdvice",
          "Logging with SLF4J & Logback",
          "REST principles and HTTP methods",
          "@RestController, @RequestMapping, @PathVariable, @RequestBody",
          "Request/Response DTOs and JSON serialization",
          "API versioning, pagination and sorting",
          "Spring Security: JWT Authentication & Authorization",
          "Swagger/OpenAPI documentation, Postman for API testing"
        ]
      },
      {
        "group": "Full Stack Integration",
        "items": [
          "React JS Frontend: UI, routing, state management, API calls via Axios",
          "REST API Layer: Spring Boot controllers, DTOs, service layer, security",
          "Business Logic: service classes, validation, error handling",
          "Data Layer: Spring Data JPA, Hibernate ORM, MySQL",
          "User authentication system (Login/Register with JWT)",
          "Role-based access control (Admin / User)",
          "Dynamic dashboard with real-time data, CRUD operations with React forms",
          "File upload and management, search/filter/pagination",
          "Deployment on cloud (AWS/Heroku basics)"
        ]
      },
      {
        "group": "Developer Toolkit",
        "items": [
          "IntelliJ IDEA, VS Code, Eclipse",
          "Git, GitHub, MySQL Workbench",
          "Postman, Maven, Gradle",
          "Apache Tomcat, React DevTools, npm / Node.js",
          "Swagger / OpenAPI, JUnit, Mockito"
        ]
      }
    ],
    "modules": [
      {
        "name": "Month 1: Foundations",
        "desc": "HTML, CSS, JavaScript, Bootstrap/Tailwind, Core Java."
      },
      {
        "name": "Month 2: Frontend",
        "desc": "React JS, component architecture, state management, API integration."
      },
      {
        "name": "Month 3: Backend",
        "desc": "Advanced Java, JDBC, MySQL, Spring Framework, Spring Boot, REST APIs."
      },
      {
        "name": "Month 4: Full Stack + Projects",
        "desc": "React + Spring Boot integration, real-time projects, portfolio, interview prep."
      }
    ],
    "outcomes": [
      "Java Full Stack Developer",
      "Backend Java Developer",
      "Frontend Developer (React)",
      "Database Developer / DBA",
      "API Developer",
      "Software Engineer (Fresher)"
    ],
    "pdf": "/curriculum/java-full-stack.pdf"
  },
  "mean-stack": {
    "slug": "mean-stack",
    "title": "MEAN Stack",
    "tagline": "Become a Job-Ready MEAN Stack Developer in just 3 months",
    "overview": "The MEAN Stack Development Course is designed for students, freshers, career switchers, and working professionals who want to build modern, scalable web applications. You learn frontend, backend, database management, REST API development, and real-time project execution using MongoDB, Express.js, Angular, and Node.js. Graduates leave with a GitHub portfolio, interview-ready skills, and hands-on experience with production-style projects.",
    "duration": "3 Months",
    "mode": "",
    "learn": [
      "Frontend with HTML5, CSS3, Bootstrap, JavaScript & TypeScript",
      "Angular Framework development",
      "Backend with Node.js and Express.js",
      "REST APIs, Middleware & Authentication",
      "MongoDB & Atlas, Mongoose ORM, CRUD operations",
      "Schema design and data validation",
      "Full stack integration with JWT auth",
      "Resume preparation, mock interviews, and GitHub portfolio guidance"
    ],
    "audience": [
      "Students",
      "Freshers",
      "Career Switchers",
      "Working Professionals",
      "Web Dev Enthusiasts",
      "BCA / B.Sc / B.Tech / MCA graduates"
    ],
    "topics": [
      {
        "group": "Frontend",
        "items": [
          "HTML5 & CSS3",
          "Bootstrap",
          "JavaScript & TypeScript",
          "Angular Framework"
        ]
      },
      {
        "group": "Backend",
        "items": [
          "Node.js",
          "Express.js",
          "REST APIs",
          "Middleware & Auth"
        ]
      },
      {
        "group": "Database",
        "items": [
          "MongoDB & Atlas",
          "Mongoose ORM",
          "CRUD Operations",
          "Schema & Validation"
        ]
      },
      {
        "group": "Dev Tools",
        "items": [
          "VS Code",
          "Postman",
          "Git & GitHub",
          "Chrome DevTools"
        ]
      }
    ],
    "modules": [
      {
        "name": "Module 1: Web Dev Basics",
        "desc": "HTML, CSS, Bootstrap, responsive layouts, forms, navbars, and cards."
      },
      {
        "name": "Module 2: JavaScript & TypeScript",
        "desc": "Variables, arrays, DOM, events, ES6 features, and TypeScript fundamentals."
      },
      {
        "name": "Module 3: Angular Development",
        "desc": "Components, data binding, directives, routing, services, and form validation."
      },
      {
        "name": "Module 4: Node.js & Express.js",
        "desc": "Server setup, routing, controllers, middleware, and REST API architecture."
      },
      {
        "name": "Module 5: MongoDB & Mongoose",
        "desc": "Collections, CRUD, schemas, models, database connections, and data validation."
      },
      {
        "name": "Module 6: Full Stack Integration",
        "desc": "Angular + Express integration, auth flow, Postman testing, GitHub, and deployment."
      }
    ],
    "outcomes": [
      "MEAN Stack Developer",
      "Angular Developer",
      "Node.js Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Junior Software Developer"
    ],
    "pdf": "/curriculum/mean-stack.pdf"
  },
  "mern-stack": {
    "slug": "mern-stack",
    "title": "MERN Stack",
    "tagline": "Become a Job-Ready MERN Stack Developer in 3 Months",
    "overview": "This course is designed for students, freshers, career switchers, and working professionals who want to build production-grade full stack web applications from scratch using MongoDB, Express.js, React.js, and Node.js. It covers frontend, backend, database design, and REST API integration through real-time projects, interview prep, and a GitHub-ready portfolio.",
    "duration": "3 Months",
    "mode": "",
    "learn": [
      "Frontend development with React.js and React Router",
      "Backend APIs with Node.js & Express.js",
      "MongoDB database design & operations",
      "REST API integration end-to-end",
      "JWT authentication basics and input validation",
      "Real-time project development",
      "GitHub portfolio preparation",
      "Interview readiness & mock sessions"
    ],
    "audience": [
      "Students",
      "Freshers",
      "Career Switchers",
      "Working Professionals",
      "Web Dev Enthusiasts",
      "BCA / B.Sc / B.Tech / MCA graduates"
    ],
    "topics": [
      {
        "group": "Frontend",
        "items": [
          "HTML5 & CSS3",
          "Bootstrap / Tailwind CSS",
          "JavaScript Fundamentals",
          "React.js & React Router",
          "Forms & API Integration"
        ]
      },
      {
        "group": "Backend",
        "items": [
          "Node.js & Express.js",
          "REST APIs & Middleware",
          "Controllers & Routing",
          "JWT Authentication Basics",
          "Input Validation"
        ]
      },
      {
        "group": "Database",
        "items": [
          "MongoDB & Atlas",
          "Mongoose ODM",
          "CRUD Operations",
          "Schema & Models",
          "Data Validation"
        ]
      },
      {
        "group": "Tools",
        "items": [
          "VS Code & Postman",
          "Git & GitHub",
          "npm & MongoDB Compass",
          "Chrome DevTools",
          "Deployment Basics"
        ]
      }
    ],
    "modules": [
      {
        "name": "Module 1: Web Development Basics",
        "desc": "HTML, CSS, responsive layouts, forms, tables, navbar, cards, and landing page design."
      },
      {
        "name": "Module 2: JavaScript Fundamentals",
        "desc": "Variables, functions, arrays, objects, DOM, events, ES6 basics, and async JavaScript."
      },
      {
        "name": "Module 3: React.js Frontend",
        "desc": "Components, props, state, hooks, React Router, forms, validation, and reusable UI components."
      },
      {
        "name": "Module 4: Node.js & Express.js Backend",
        "desc": "Server setup, routing, controllers, middleware, request/response handling, and REST APIs."
      },
      {
        "name": "Module 5: MongoDB & Mongoose",
        "desc": "Collections, documents, CRUD operations, schemas, models, database connection, and validation."
      },
      {
        "name": "Module 6: Full Stack Integration",
        "desc": "React + Express API integration, authentication flow, Postman testing, GitHub, and deployment basics."
      }
    ],
    "outcomes": [
      "MERN Stack Developer",
      "React Developer",
      "Node.js Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Junior Software Developer"
    ],
    "pdf": "/curriculum/mern-stack.pdf"
  },
  "nextjs": {
    "slug": "nextjs",
    "title": "Next.js Development",
    "tagline": "Become a Job-Ready MERN Stack Developer in 3 Months",
    "overview": "This course is built for students, freshers, career switchers, and working professionals who want to confidently build and deploy modern full-stack web applications from scratch using MongoDB, Express.js, React.js, and Node.js. A structured, project-driven curriculum covers every layer of the MERN stack -- from responsive UI to database architecture -- with real-time projects, a GitHub portfolio, and interview readiness.",
    "duration": "3 Months",
    "mode": "",
    "learn": [
      "Frontend development with React.js",
      "Backend APIs with Node.js & Express.js",
      "MongoDB database design & operations",
      "REST API integration end-to-end",
      "Real-time project development",
      "GitHub portfolio preparation",
      "Interview readiness & mock sessions"
    ],
    "audience": [
      "Students",
      "Freshers",
      "Career Switchers",
      "Working Professionals",
      "Web Dev Enthusiasts",
      "BCA / B.Sc / B.Tech / MCA graduates"
    ],
    "topics": [
      {
        "group": "Frontend",
        "items": [
          "HTML5 & CSS3",
          "Bootstrap / Tailwind CSS",
          "JavaScript Fundamentals",
          "React.js & React Router",
          "Forms & API Integration"
        ]
      },
      {
        "group": "Backend",
        "items": [
          "Node.js & Express.js",
          "REST APIs & Middleware",
          "Controllers & Routing",
          "JWT Authentication Basics",
          "Input Validation"
        ]
      },
      {
        "group": "Database",
        "items": [
          "MongoDB & Atlas",
          "Mongoose ODM",
          "CRUD Operations",
          "Schema & Models",
          "Data Validation"
        ]
      },
      {
        "group": "Tools",
        "items": [
          "VS Code & Postman",
          "Git & GitHub",
          "npm & MongoDB Compass",
          "Chrome DevTools",
          "Deployment Basics"
        ]
      }
    ],
    "modules": [
      {
        "name": "Module 1: Web Development Basics",
        "desc": "HTML, CSS, responsive layouts, forms, tables, navbar, cards, and landing page design."
      },
      {
        "name": "Module 2: JavaScript Fundamentals",
        "desc": "Variables, functions, arrays, objects, DOM, events, ES6 basics, and async JavaScript."
      },
      {
        "name": "Module 3: React.js Frontend",
        "desc": "Components, props, state, hooks, React Router, forms, validation, and reusable UI components."
      },
      {
        "name": "Module 4: Node.js & Express.js Backend",
        "desc": "Server setup, routing, controllers, middleware, request/response handling, and REST APIs."
      },
      {
        "name": "Module 5: MongoDB & Mongoose",
        "desc": "Collections, documents, CRUD operations, schemas, models, database connection, and validation."
      },
      {
        "name": "Module 6: Full Stack Integration",
        "desc": "React + Express API integration, authentication flow, Postman testing, GitHub, and deployment basics."
      }
    ],
    "outcomes": [
      "MERN Stack Developer",
      "React Developer",
      "Node.js Developer",
      "Full Stack Developer"
    ],
    "pdf": "/curriculum/nextjs.pdf"
  },
  "manual-testing": {
    "slug": "manual-testing",
    "title": "Manual Testing",
    "tagline": "Become a Job-Ready Manual Tester in 2 Months",
    "overview": "This Manual Testing Course is purpose-built for students, freshers, career switchers, and working professionals who want to break into software quality assurance. No prior coding experience is required. It covers SDLC, STLC, test cases, bug reporting, and real-time projects, with hands-on training, resume support, and mock interview preparation.",
    "duration": "2 Months",
    "mode": "Classroom & Online",
    "learn": [
      "Software Testing Fundamentals & QA Principles",
      "SDLC Models -- Waterfall, Agile, V-Model",
      "STLC Phases & Test Planning",
      "Test Case & Test Scenario Writing",
      "Defect Reporting & Bug Life Cycle",
      "Jira Basics & Agile Scrum Process",
      "Real-Time Project Testing",
      "Resume Preparation & Mock Interviews"
    ],
    "audience": [
      "Fresh graduates entering the tech industry",
      "Career switchers from non-IT backgrounds",
      "Working professionals seeking upskilling",
      "Anyone interested in QA as a career path"
    ],
    "topics": [
      {
        "group": "Testing Basics",
        "items": [
          "Software Testing & QA vs QC",
          "Verification & Validation",
          "Error, Bug, Defect & Failure",
          "Seven Principles of Testing"
        ]
      },
      {
        "group": "SDLC & STLC",
        "items": [
          "Waterfall, V-Model & Agile SDLC",
          "STLC Phases in Detail",
          "Test Planning & Entry/Exit Criteria",
          "Requirement Analysis"
        ]
      },
      {
        "group": "Testing Types",
        "items": [
          "Functional & Regression Testing",
          "Smoke & Sanity Testing",
          "Integration & System Testing",
          "UAT & Exploratory Testing"
        ]
      },
      {
        "group": "Tools & Process",
        "items": [
          "Jira for Bug Tracking",
          "Defect Life Cycle",
          "Test Case Template & Defect Report",
          "Agile Scrum & Test Summary Report"
        ]
      }
    ],
    "modules": [
      {
        "name": "Module 1: Testing Fundamentals",
        "desc": "Testing basics, QA process, bug concepts, verification, validation, and the seven testing principles."
      },
      {
        "name": "Module 2: SDLC & STLC",
        "desc": "SDLC models, Agile process, STLC phases, requirement analysis, and test planning essentials."
      },
      {
        "name": "Module 3: Test Case Writing",
        "desc": "Test scenario design, test case format, positive/negative testing, expected vs. actual results."
      },
      {
        "name": "Module 4: Testing Techniques",
        "desc": "Smoke, sanity, regression, UAT, boundary value analysis, and equivalence partitioning methods."
      },
      {
        "name": "Module 5: Defect Mgmt & Jira",
        "desc": "Bug reporting, severity and priority, defect life cycle, Jira ticket creation and defect tracking."
      },
      {
        "name": "Module 6: Project & Career Prep",
        "desc": "Real-time project testing, test execution, test summary report, resume guidance, and mock interviews."
      }
    ],
    "outcomes": [
      "Manual Tester",
      "QA Tester",
      "Test Engineer",
      "Test Analyst",
      "Junior QA Engineer"
    ],
    "pdf": "/curriculum/manual-testing.pdf"
  },
  "java-selenium-automation": {
    "slug": "java-selenium-automation",
    "title": "Java Selenium Automation",
    "tagline": "Master Software Testing with Java, Selenium & Real-Time Projects",
    "overview": "A career-focused software testing program covering manual testing, Java, and Selenium automation with real-time projects and career preparation. The roadmap moves from testing foundations through core Java and Selenium automation to framework development, testing frameworks (JUnit, TestNG, Cucumber), CI/CD tools, and an integrated practical training (IPT) program that graduates a confident, job-ready QA professional.",
    "duration": "",
    "mode": "Classroom (offline)",
    "learn": [
      "Manual testing concepts, SDLC, STLC, and test case writing",
      "Core Java (OOP concepts) for test automation",
      "Advanced Java: Collections, Exception Handling, Singleton Pattern, File Handling",
      "Selenium WebDriver, locators, and browser automation",
      "Core Selenium automation concepts (alerts, waits, Actions, frames, windows, web tables)",
      "Automation framework development (Page Object Model, Data-Driven, Maven)",
      "Testing frameworks: JUnit, TestNG, and Cucumber BDD",
      "Tools: Git, Jenkins CI/CD, SQL/database testing, API testing basics, Maven, Eclipse",
      "Advanced Selenium topics and real-time IPT project practice"
    ],
    "audience": [
      "Students & Freshers",
      "Career switchers from non-IT backgrounds",
      "Manual & Automation Testers",
      "Working professionals",
      "Any graduate aiming for a QA / testing career"
    ],
    "topics": [
      {
        "group": "Java Module - Week 1: Basics & OOPS",
        "items": [
          "Introduction, Installation & Project Setup in Eclipse",
          "Packages: Same and Different Package",
          "Data Types",
          "Wrapper Class",
          "Autoboxing and Unboxing",
          "Inheritance",
          "Abstraction",
          "Polymorphism"
        ]
      },
      {
        "group": "Advanced Java Concepts for Test Automation",
        "items": [
          "Collections: List, Set, Map",
          "Exception Handling",
          "Singleton Pattern (Base Class)",
          "File Handling",
          "Constructors & Chaining",
          "Screenshot Concept",
          "String Methods",
          "Scanner Class",
          "Encapsulation"
        ]
      },
      {
        "group": "Selenium Module - Week 1: Introduction & Locators",
        "items": [
          "Selenium Intro & Architecture (WebDriver browser communication)",
          "WebDriver Methods (navigate, url, click, type, get)",
          "ID & Name Locators",
          "XPath",
          "CSS Selector",
          "Link Text & TagName"
        ]
      },
      {
        "group": "Core Selenium Automation Concepts",
        "items": [
          "Alerts Handling",
          "Dropdown Techniques",
          "Implicit and Explicit Waits",
          "Actions Class",
          "Robot Class",
          "Frames Handling",
          "JavaScript Executor",
          "Screenshot Handling",
          "Dropdown Handling with Select Class",
          "Window Handling",
          "Web Table Handling"
        ]
      },
      {
        "group": "Automation Framework Development",
        "items": [
          "Maven Configuration (pom.xml, dependencies, build lifecycle)",
          "Page Object Model (POM)",
          "Data-Driven Framework (Apache POI / Excel test data)"
        ]
      },
      {
        "group": "Testing Frameworks: JUnit, TestNG & Cucumber",
        "items": [
          "JUnit: Annotations (@Test, @Before, @After), Basic Test Patterns, Assertions (assertEquals, assertTrue), Test Suite Configuration",
          "TestNG: Introduction & Installation, Priority & Skip, testng.xml Configuration, Invocation Count, Parameterization, Groups and Assertions, Parallel Execution, Rerun Failed Tests, dependsOnMethods()",
          "Cucumber BDD: Introduction & Setup, Cucumber Options, Scenario & Scenario Outline, Background, Data Tables, Tags and Hooks, Runner and Report"
        ]
      },
      {
        "group": "Tools & Technologies",
        "items": [
          "Git - Version Control (branch, commit, push, collaboration)",
          "Jenkins - CI/CD Pipeline (automate test execution, scheduling)",
          "SQL & Database Testing (queries, joins, JDBC integration)",
          "API Testing Basics (REST, HTTP methods, API validation)",
          "Maven - Build Tool (pom.xml, dependency management)",
          "Eclipse IDE (project structure, debugging)"
        ]
      },
      {
        "group": "Selenium Advanced Topics",
        "items": [
          "Selenium 3 vs Selenium 4 Updates (relative locators, Chrome DevTools Protocol)",
          "Advanced XPath & Coordinates",
          "Shadow DOM Handling",
          "Chrome Options & Browser Configuration",
          "BrowserStack Integration (cross-browser testing at scale)",
          "Extent Report Generation",
          "Naming and Visible CSS Selectors, Values in Broken Links Handling, Framework Development"
        ]
      },
      {
        "group": "IPT - Integrated Practical Training (Real-Time Program)",
        "items": [
          "Phase 1: Cucumber Options & Configuration, Scenario and Scenario Outline, Background, Data Table, Tags and Hooks, Runner and Report, Git version control practice, Jenkins CI/CD pipeline setup, SQL queries and database operations, JDBC integration basics, API testing concepts",
          "Phase 2: Java Real-Time Concepts, Java 7 and Java 8 Features, OOP real-time implementation, Collections real-time usage, Inheritance and Interfaces, Private and Public scope"
        ]
      }
    ],
    "modules": [
      {
        "name": "Java Module for Testing",
        "desc": "Core Java basics, OOP concepts, and advanced Java concepts (Collections, Exceptions, File Handling) for test automation."
      },
      {
        "name": "Selenium Module - Automation Testing",
        "desc": "Selenium WebDriver introduction, locators, and core automation concepts for web application testing."
      },
      {
        "name": "Automation Framework Development",
        "desc": "Building maintainable automation frameworks with Page Object Model, Data-Driven approach, and Maven."
      },
      {
        "name": "Testing Frameworks",
        "desc": "JUnit, TestNG, and Cucumber BDD for structured automation testing."
      },
      {
        "name": "Tools & Technologies",
        "desc": "Git, Jenkins CI/CD, SQL/database testing, API testing basics, Maven, and Eclipse IDE."
      },
      {
        "name": "Selenium Advanced Topics",
        "desc": "Selenium 4 updates, advanced XPath, Shadow DOM, BrowserStack, and Extent reporting."
      },
      {
        "name": "Manual Testing & Real-Time Industry Practice",
        "desc": "SDLC, STLC, test case writing, scenario-based testing, and live project-based practice."
      },
      {
        "name": "IPT - Integrated Practical Training",
        "desc": "Real-time training program giving hands-on project experience simulating a real QA company workflow."
      }
    ],
    "outcomes": [
      "Manual Tester",
      "Software Tester",
      "QA Engineer",
      "Automation Tester",
      "Selenium Tester",
      "Test Engineer",
      "Junior QA Analyst",
      "QA Automation Engineer"
    ],
    "pdf": "/curriculum/java-selenium-automation.pdf"
  },
  "playwright-automation": {
    "slug": "playwright-automation",
    "title": "Playwright Automation",
    "tagline": "Master Automation Testing with Real-Time Projects",
    "overview": "A comprehensive 3-month, hands-on training program for students, freshers, and job seekers who want to launch a career in Software Testing and Automation Engineering. It takes you from zero to job-ready -- starting with TypeScript fundamentals and progressing through Playwright framework setup, UI automation, API testing, CI/CD integration, and real-time project development.",
    "duration": "3 Months",
    "mode": "Classroom (offline)",
    "learn": [
      "TypeScript programming fundamentals and OOP concepts",
      "Playwright framework setup and core concepts",
      "UI automation: locators, interactions, and assertions",
      "Advanced automation: waits, alerts, network interception, frames, and multi-tab handling",
      "Framework design with Test Runner, Fixtures, and Page Object Model",
      "API testing with Playwright, test data, and environment configuration",
      "Professional reporting (Playwright HTML, Trace Viewer, Allure)",
      "CI/CD integration and real-time automation project simulation"
    ],
    "audience": [
      "Students",
      "Freshers",
      "Job seekers wanting a career in Software Testing and Automation Engineering"
    ],
    "topics": [
      {
        "group": "Month 1: Intro to Automation & Setup",
        "items": [
          "Introduction to Automation Testing",
          "Why Playwright for Modern Testing?",
          "Role of TypeScript in Test Automation"
        ]
      },
      {
        "group": "Month 1: TypeScript Basics",
        "items": [
          "TypeScript vs JavaScript",
          "Setting up tsconfig.json",
          "Variables, Data Types, Type Inference",
          "Functions and Arrow Functions"
        ]
      },
      {
        "group": "Month 1: Object-Oriented Concepts",
        "items": [
          "Interfaces, Classes & Objects",
          "Inheritance, Abstraction, Polymorphism",
          "Access Modifiers, Abstract & Static Members"
        ]
      },
      {
        "group": "Month 1: Advanced TypeScript",
        "items": [
          "Generics, Modules & Imports",
          "Promises and async/await",
          "Enums, Union & Intersection Types",
          "Utility Types: Partial, Pick, Readonly"
        ]
      },
      {
        "group": "Month 2: Playwright Fundamentals",
        "items": [
          "Architecture & Supported Browsers",
          "Installation & Configuration",
          "Test Runner Basics",
          "Launching Browsers & Contexts"
        ]
      },
      {
        "group": "Month 2: Locators & Selectors",
        "items": [
          "CSS, Text & XPath Locators",
          "Locator Chaining & Filtering",
          "nth, hasText, has Strategies",
          "Locator Best Practices"
        ]
      },
      {
        "group": "Month 2: Interactions & Validations",
        "items": [
          "Click, Fill, Select, Hover, Check",
          "File Uploads & Downloads",
          "expect() API & Assertions",
          "Visual Comparisons"
        ]
      },
      {
        "group": "Month 2: Waits, Events & Alerts",
        "items": [
          "Auto Waits & Manual Waits",
          "waitForSelector() & waitForLoadState()",
          "Event Listeners & Alert Handling",
          "File Chooser Events & Modal Windows"
        ]
      },
      {
        "group": "Month 2: Advanced Browser Handling",
        "items": [
          "Multiple Tabs & Pop-ups",
          "Frames & New Page Events"
        ]
      },
      {
        "group": "Month 2: Network Activities",
        "items": [
          "Intercepting API Calls",
          "Mocking & Modifying Responses",
          "Validating Request & Response",
          "Monitoring Network Events"
        ]
      },
      {
        "group": "Month 3: Framework Design",
        "items": [
          "Playwright Test Runner: Test Configuration Files, Parallel Execution Setup, Projects and Devices Matrix, Before/After Hooks",
          "Fixtures & Test Hooks: Creating Custom Fixtures, Setup and Teardown Logic, Shared Browser Contexts",
          "Page Object Model: What is POM and Why It Matters, Creating Reusable Page Classes, Centralizing Locators & Methods, Base Page & Singleton Pattern"
        ]
      },
      {
        "group": "Month 3: API Testing, Test Data & Reporting",
        "items": [
          "API Testing with Playwright: APIContext, GET/POST/PUT/DELETE Methods, Headers/Auth/Payloads, Schema Validation, Response Assertions",
          "Config & Data Management: Environment Variables (.env), JSON & YAML Config Files, Parameterization, Data-Driven Tests",
          "Reporting Tools: Playwright HTML Report, Trace Viewer, Allure Report, Video & Screenshot Capture"
        ]
      },
      {
        "group": "Month 3: CI/CD Integration & Real-Time Project",
        "items": [
          "GitHub Actions Pipeline Integration",
          "Running Tests in Docker Containers",
          "Scheduling Jobs using cron",
          "Framework Enhancements: Reusable Helper Utilities, Custom Logging, Error Handling, Retry Logic for Flaky Tests",
          "Build a Complete Automation Suite (UI + API + Reports)",
          "Parallel Cross-Browser Execution across Chromium, Firefox, and WebKit"
        ]
      }
    ],
    "modules": [
      {
        "name": "Month 1: Automation Basics + TypeScript Fundamentals",
        "desc": "Automation testing concepts, the Playwright ecosystem, and TypeScript language for clean, reusable, type-safe test code."
      },
      {
        "name": "Month 2 - Part 1: Playwright Core Concepts & UI Automation",
        "desc": "Set up the test environment, locate UI elements, interact with web apps, and validate behavior with Playwright's assertion engine."
      },
      {
        "name": "Month 2 - Part 2: Advanced Playwright: Waits, Alerts & Network",
        "desc": "Dynamic element waits, dialog handling, multi-tab scenarios, frames, and network-level API interception."
      },
      {
        "name": "Month 3 - Part 1: Framework Design: Test Runner, Fixtures & POM",
        "desc": "Design scalable, maintainable frameworks using the test runner, custom fixtures, and Page Object Model."
      },
      {
        "name": "Month 3 - Part 2: API Testing, Test Data & Professional Reporting",
        "desc": "Playwright API testing, test data management, environment configuration, and industry-standard reporting tools."
      },
      {
        "name": "Month 3 - Final: CI/CD Integration & Real-Time Project Simulation",
        "desc": "Integrate the automation suite into a CI/CD pipeline and build a complete real-time automation project."
      }
    ],
    "outcomes": [
      "Manual Tester",
      "QA Engineer",
      "Automation Tester",
      "Playwright Automation Engineer",
      "SDET"
    ],
    "pdf": "/curriculum/playwright-automation.pdf"
  },
  "api-testing": {
    "slug": "api-testing",
    "title": "API Testing",
    "tagline": "Become a Job-Ready API Tester in 2 Months",
    "overview": "The XpertsEdge Technologies API Testing Course is designed for students, freshers, manual testers, automation testers, career switchers, and working professionals who want to build industry-relevant API testing skills from the ground up. You gain hands-on expertise in REST API concepts, HTTP methods, status codes, request and response validation, JSON, XML, authentication testing, Postman, Swagger, test case writing, defect reporting, and real-time API project testing.",
    "duration": "2 Months",
    "mode": "",
    "learn": [
      "REST API concepts and client-server architecture",
      "HTTP methods, status codes, and headers",
      "Request and response validation",
      "JSON and XML data formats",
      "Authentication testing (Basic Auth, Bearer Token, API Key, JWT)",
      "Postman and Swagger documentation",
      "Test case writing and defect reporting with Jira",
      "Newman and Rest Assured basics for API automation",
      "Real-time API project testing"
    ],
    "audience": [
      "Students & Freshers",
      "Manual Testers",
      "Automation Testers",
      "Career Switchers",
      "Working Professionals",
      "Any Graduate (no prior API knowledge required)"
    ],
    "topics": [
      {
        "group": "API Basics",
        "items": [
          "What is an API?",
          "Client and Server architecture",
          "Frontend and Backend flow",
          "REST API request and response"
        ]
      },
      {
        "group": "HTTP Concepts",
        "items": [
          "GET, POST, PUT, PATCH, DELETE",
          "Status codes (2xx, 4xx, 5xx)",
          "Headers and authentication",
          "Query params and path params"
        ]
      },
      {
        "group": "Data Formats",
        "items": [
          "JSON and XML basics",
          "Request body and response body",
          "Payload validation",
          "Schema validation basics"
        ]
      },
      {
        "group": "Tools & Process",
        "items": [
          "Postman and Swagger",
          "Newman basics",
          "Jira for defect reporting",
          "API test case writing"
        ]
      }
    ],
    "modules": [
      {
        "name": "Module 1: API Testing Fundamentals",
        "desc": "API basics, REST API, client-server flow, endpoints, HTTP methods, requests and responses."
      },
      {
        "name": "Module 2: Postman Tool Training",
        "desc": "Collections, environments, variables, params, headers, body, authorization, scripts, and test execution."
      },
      {
        "name": "Module 3: Request & Response Validation",
        "desc": "Status code validation, response body, headers, JSON validation, and schema basics."
      },
      {
        "name": "Module 4: Authentication Testing",
        "desc": "Basic Auth, Bearer Token, API Key, JWT token basics, login API flow, and authorization validation."
      },
      {
        "name": "Module 5: Real-Time API Testing",
        "desc": "Test case writing, positive and negative testing, defect reporting, Jira basics, and test summaries."
      },
      {
        "name": "Module 6: API Automation Basics",
        "desc": "Newman, Rest Assured intro, Java basics for API automation, CI/CD concepts, and GitHub guidance."
      }
    ],
    "outcomes": [
      "API Tester",
      "Manual Tester with API Skills",
      "QA Tester",
      "Software Test Engineer",
      "Automation Tester",
      "Junior QA Engineer"
    ],
    "pdf": "/curriculum/api-testing.pdf"
  },
  "aws": {
    "slug": "aws",
    "title": "AWS Track",
    "tagline": "Become Cloud-Ready in 2 Months",
    "overview": "This AWS course is purpose-built for students, freshers, career switchers, developers, testers, and working professionals who want to launch a career in cloud computing. No prior cloud experience is required -- it starts from absolute basics and builds up to real-world project deployment, covering EC2, S3, IAM, VPC, RDS, and deployment.",
    "duration": "2 Months",
    "mode": "",
    "learn": [
      "Cloud concepts, global infrastructure, and console navigation",
      "Account setup and portal navigation",
      "EC2, S3, VPC, and RDS core services",
      "IAM users, groups, roles, policies, and security best practices",
      "Networking with VPC, subnets, and route tables",
      "CloudWatch monitoring and CloudTrail basics",
      "Real-time cloud project deployment",
      "Resume support and mock interview practice"
    ],
    "audience": [
      "Students & Freshers",
      "Career Switchers",
      "Developers & Testers",
      "Working Professionals",
      "Any Graduate"
    ],
    "topics": [
      {
        "group": "Cloud Basics",
        "items": [
          "Cloud Computing Concepts",
          "IaaS, PaaS, SaaS Models",
          "Public, Private, Hybrid Cloud",
          "AWS Global Infrastructure",
          "Regions & Availability Zones"
        ]
      },
      {
        "group": "Compute & Storage",
        "items": [
          "EC2 & AMI",
          "Instance Types",
          "Security Groups",
          "S3 Buckets & Object Storage",
          "Storage Classes"
        ]
      },
      {
        "group": "Networking & Security",
        "items": [
          "IAM Users, Groups, Roles",
          "Policies & Permissions",
          "VPC & Subnets",
          "Route Tables",
          "Internet Gateway"
        ]
      },
      {
        "group": "Database & Monitoring",
        "items": [
          "RDS & DynamoDB Basics",
          "CloudWatch Monitoring",
          "CloudTrail Basics",
          "Load Balancer Basics",
          "Auto Scaling Basics"
        ]
      }
    ],
    "modules": [
      {
        "name": "Module 1: Cloud & AWS Fundamentals",
        "desc": "Cloud concepts, AWS overview, global infrastructure, account setup, and console navigation."
      },
      {
        "name": "Module 2: IAM & Security Basics",
        "desc": "IAM users, groups, roles, policies, MFA, permission basics, and security best practices."
      },
      {
        "name": "Module 3: EC2 & Compute Services",
        "desc": "EC2 instance launch, AMI, key pair, security groups, SSH basics, and hosting a simple application."
      },
      {
        "name": "Module 4: S3 & Storage Services",
        "desc": "S3 bucket creation, object upload, permissions, static website hosting, and storage concepts."
      },
      {
        "name": "Module 5: VPC, RDS & Monitoring",
        "desc": "VPC basics, subnets, route tables, RDS database basics, and CloudWatch monitoring essentials."
      },
      {
        "name": "Module 6: Real-Time Cloud Project",
        "desc": "Deploy a simple application; configure storage, database, security, monitoring, GitHub, and interview prep."
      }
    ],
    "outcomes": [
      "AWS Cloud Fresher",
      "Cloud Support Associate",
      "Junior Cloud Engineer",
      "AWS Admin Trainee",
      "DevOps Fresher",
      "Cloud Ops Associate"
    ],
    "pdf": "/curriculum/aws.pdf"
  },
  "microsoft-azure": {
    "slug": "microsoft-azure",
    "title": "Microsoft Azure",
    "tagline": "Become Cloud-Ready in 2 Months",
    "overview": "The Microsoft Azure Administrator Track is a beginner-friendly program designed for students, freshers, career switchers, developers, testers, IT support engineers, and working professionals building a foundation in cloud administration. No prior cloud experience is required. It covers Azure basics, virtual machines, storage, networking, identity, and monitoring with hands-on portal labs and a real-time capstone project.",
    "duration": "2 Months",
    "mode": "Instructor-led, hands-on labs",
    "learn": [
      "Azure fundamentals and cloud concepts",
      "Resource groups, subscriptions, and portal navigation",
      "Virtual Machines, storage accounts, and virtual networks",
      "Identity, access management, and RBAC",
      "Monitoring, backup basics, and cost management",
      "Real-time cloud project practice",
      "Resume support and interview preparation"
    ],
    "audience": [
      "Students & Freshers",
      "Career Switchers",
      "Developers & Testers",
      "IT Support Engineers",
      "Working Professionals",
      "Any Graduate"
    ],
    "topics": [
      {
        "group": "Azure Basics",
        "items": [
          "Cloud Computing Concepts",
          "Azure Overview & Portal",
          "Subscriptions & Resource Groups",
          "Regions & Availability Zones"
        ]
      },
      {
        "group": "Compute & Storage",
        "items": [
          "Azure Virtual Machines",
          "VM Images & Disks",
          "Storage Accounts & Blob Storage",
          "File Share & Backup Basics"
        ]
      },
      {
        "group": "Networking & Security",
        "items": [
          "Virtual Network & Subnets",
          "Network Security Groups",
          "Public IP & Load Balancer",
          "Microsoft Entra ID & RBAC"
        ]
      },
      {
        "group": "Monitoring & Management",
        "items": [
          "Azure Monitor & Log Analytics",
          "Alerts & Cost Management",
          "Azure Policy Basics",
          "Resource Tags & Deployment"
        ]
      }
    ],
    "modules": [
      {
        "name": "Module 1: Azure & Cloud Fundamentals",
        "desc": "Cloud concepts, Azure overview, subscriptions, resource groups, regions, and portal navigation."
      },
      {
        "name": "Module 2: Identity & Access Management",
        "desc": "Microsoft Entra ID, users, groups, roles, RBAC basics, MFA, and access control policies."
      },
      {
        "name": "Module 3: Azure Virtual Machines",
        "desc": "VM creation, images, disks, networking, NSG configuration, RDP/SSH basics, and VM management."
      },
      {
        "name": "Module 4: Azure Storage Services",
        "desc": "Storage account, blob storage, file share, access keys, storage security, and backup basics."
      },
      {
        "name": "Module 5: Networking & Monitoring",
        "desc": "Virtual networks, subnets, public IP, load balancer basics, Azure Monitor, alerts, and logs."
      },
      {
        "name": "Module 6: Real-Time Azure Admin Project",
        "desc": "Create resources, configure VM, storage, networking, access, monitoring, and present the project end-to-end."
      }
    ],
    "outcomes": [
      "Azure Administrator",
      "Cloud Support Associate",
      "Junior Cloud Engineer",
      "Azure Support Engineer",
      "Cloud Operations Associate",
      "Sysadmin with Azure Skills"
    ],
    "pdf": "/curriculum/microsoft-azure.pdf"
  },
  "devops": {
    "slug": "devops",
    "title": "DevOps",
    "tagline": "Become DevOps-Ready in 2 Months",
    "overview": "This intensive 2-month program is designed for students, freshers, testers, developers, career switchers, and working professionals who want to confidently navigate modern software delivery. You move from zero DevOps knowledge to practical, job-ready skills, mastering Git, Jenkins, CI/CD, Docker, and cloud basics through hands-on labs and a real-time deployment project.",
    "duration": "2 Months",
    "mode": "",
    "learn": [
      "DevOps fundamentals and lifecycle",
      "Git and GitHub version control",
      "CI/CD pipeline design and execution",
      "Jenkins build automation",
      "Docker containers and Dockerfile",
      "Cloud deployment basics (AWS / Azure)",
      "Real-time project practice and GitHub portfolio setup",
      "Resume writing support and mock interview preparation"
    ],
    "audience": [
      "Students & Freshers",
      "Manual & Automation Testers",
      "Developers",
      "Career Switchers",
      "Working Professionals",
      "Any Graduate interested in Cloud"
    ],
    "topics": [
      {
        "group": "DevOps Basics",
        "items": [
          "DevOps introduction and philosophy",
          "SDLC to DevOps transition",
          "Agile + DevOps alignment",
          "Build, release, and DevOps lifecycle"
        ]
      },
      {
        "group": "Version Control",
        "items": [
          "Git basics and commands",
          "GitHub repository management",
          "Branching, commit, and push",
          "Pull request workflow"
        ]
      },
      {
        "group": "CI/CD & Jenkins",
        "items": [
          "CI/CD concepts and principles",
          "Jenkins setup and jobs",
          "Pipeline basics and triggers",
          "Maven / npm build automation"
        ]
      },
      {
        "group": "Docker & Cloud",
        "items": [
          "Docker images and containers",
          "Dockerfile and Docker Compose",
          "AWS / Azure cloud basics",
          "Deployment flow overview"
        ]
      }
    ],
    "modules": [
      {
        "name": "Module 1: DevOps Fundamentals",
        "desc": "DevOps introduction, lifecycle, SDLC vs DevOps, agile delivery, build and release process basics."
      },
      {
        "name": "Module 2: Git and GitHub",
        "desc": "Repository setup, clone, branch, commit, push, pull, merge, pull request, and full GitHub workflow."
      },
      {
        "name": "Module 3: CI/CD with Jenkins",
        "desc": "Jenkins setup, build jobs, build triggers, pipeline basics, automated builds, and artifact generation."
      },
      {
        "name": "Module 4: Build Tools & Deployment",
        "desc": "Maven/npm build basics, environment setup, deployment steps, and end-to-end release workflow."
      },
      {
        "name": "Module 5: Docker & Containers",
        "desc": "Docker basics, images, containers, Dockerfile authoring, Docker commands, and containerized application flow."
      },
      {
        "name": "Module 6: Cloud Basics & Real-Time Project",
        "desc": "AWS/Azure basics, cloud deployment flow, CI/CD project delivery, GitHub portfolio setup, and interview prep."
      }
    ],
    "outcomes": [
      "DevOps Fresher",
      "Junior DevOps Engineer",
      "Build & Release Engineer",
      "Trainee CI/CD Engineer",
      "Cloud Support Associate",
      "DevOps Support Associate"
    ],
    "pdf": "/curriculum/devops.pdf"
  },
  "dsa": {
    "slug": "dsa",
    "title": "DSA",
    "tagline": "Become Strong in Coding and Problem Solving in 2 Months",
    "overview": "This DSA course is designed for students, freshers, career switchers, and working professionals who want to sharpen their coding logic, master problem-solving techniques, and excel in technical interviews. Over 2 focused months you build a foundation in data structures and algorithms, learning core structures, essential algorithms, time and space complexity, coding patterns, and interview-style problems.",
    "duration": "2 Months",
    "mode": "",
    "learn": [
      "Programming logic and dry run technique",
      "Time and space complexity analysis",
      "Recursion and backtracking fundamentals",
      "Arrays, Strings, Linked List, Stack, and Queue",
      "Searching and sorting algorithms",
      "Trees, BST, Heap, and Graph basics (BFS & DFS)",
      "Hashing and pattern-based coding strategies",
      "Mock coding practice and interview preparation"
    ],
    "audience": [
      "Students & Freshers building coding fundamentals",
      "Java / Python / JS Learners applying DSA in their preferred language",
      "Career Switchers & Professionals strengthening technical skills"
    ],
    "topics": [
      {
        "group": "Basics",
        "items": [
          "Programming logic & dry run",
          "Time & space complexity",
          "Recursion fundamentals",
          "Problem-solving approach"
        ]
      },
      {
        "group": "Linear DS",
        "items": [
          "Arrays & Strings",
          "Linked List",
          "Stack",
          "Queue"
        ]
      },
      {
        "group": "Non-Linear DS",
        "items": [
          "Binary Tree & BST",
          "Heap basics",
          "Graph representation",
          "BFS & DFS basics"
        ]
      },
      {
        "group": "Algorithms",
        "items": [
          "Searching & Sorting",
          "Two Pointer & Sliding Window",
          "Hashing & Recursion",
          "Backtracking basics"
        ]
      }
    ],
    "modules": [
      {
        "name": "Module 1: DSA Fundamentals",
        "desc": "Logic building, dry run technique, complexity analysis, and problem-solving approach."
      },
      {
        "name": "Module 2: Arrays & Strings",
        "desc": "Array operations, string problems, two pointer, sliding window, and hashing patterns."
      },
      {
        "name": "Module 3: Linked List, Stack & Queue",
        "desc": "Singly linked list, stack operations, queue operations, and real-time problem solving."
      },
      {
        "name": "Module 4: Searching & Sorting",
        "desc": "Linear and binary search, bubble/selection/insertion/merge sort fundamentals."
      },
      {
        "name": "Module 5: Trees & Graph Basics",
        "desc": "Binary tree, BST, traversal techniques, graph representation, BFS and DFS."
      },
      {
        "name": "Module 6: Interview Preparation",
        "desc": "Coding patterns, common interview questions, mock coding practice, and resume project explanation."
      }
    ],
    "outcomes": [
      "Interview-ready problem solver able to tackle technical rounds",
      "Better coding logic and algorithmic thinking",
      "Career-ready skills for developer roles and software jobs"
    ],
    "pdf": "/curriculum/dsa.pdf"
  }
}

export const curriculumSlugs = Object.keys(curricula)
