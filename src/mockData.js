// Realistic, high-signal data for modern tech jobs, curated companies, and salary benchmarks

export const companies = [
  {
    id: "stripe",
    name: "Stripe",
    slug: "stripe",
    tagline: "Financial infrastructure for the internet",
    category: "Fintech",
    stage: "Public / Enterprise",
    headquarters: "San Francisco, CA & Dublin, Ireland",
    remotePolicy: "Remote & Hybrid",
    employees: "7,000+",
    website: "https://stripe.com",
    about: "Stripe builds economic infrastructure for the internet. Businesses of every size—from new startups to public companies—use our software to accept payments and manage their businesses online.",
    techStack: ["Ruby", "Go", "React", "TypeScript", "Kafka", "PostgreSQL", "Sorbet"],
    benefits: [
      "Competitive equity & base compensation",
      "Comprehensive global healthcare",
      "$2,000 annual learning stipend",
      "$1,500 home office setup allowance",
      "Flexible PTO policy"
    ],
    verified: true,
    logoBg: "#635BFF",
  },
  {
    id: "linear",
    name: "Linear",
    slug: "linear",
    tagline: "The issue tracker built for high-performance software teams",
    category: "Developer Tools",
    stage: "Series B ($50M+)",
    headquarters: "San Francisco, CA",
    remotePolicy: "Remote First (Global)",
    employees: "75+",
    website: "https://linear.app",
    about: "Linear is purpose-built for software product development. We streamline issues, sprints, and product roadmaps with an obsession for speed, craftsmanship, and keyboard-first design.",
    techStack: ["TypeScript", "React", "Node.js", "GraphQL", "SQLite", "Electron", "Sync Engine"],
    benefits: [
      "Top 1% market compensation & equity",
      "100% remote anywhere in UTC-8 to UTC+3",
      "$4,000 initial hardware & ergonomics budget",
      "Twice-yearly global company retreats",
      "Paid parental leave (16 weeks)"
    ],
    verified: true,
    logoBg: "#5E6AD2",
  },
  {
    id: "vercel",
    name: "Vercel",
    slug: "vercel",
    tagline: "The platform for frontend developers",
    category: "Cloud & Infra",
    stage: "Series D ($300M+)",
    headquarters: "San Francisco, CA",
    remotePolicy: "Remote First",
    employees: "600+",
    website: "https://vercel.com",
    about: "Vercel provides the developer experience and infrastructure to build, scale, and secure a faster, more personalized web. Creators of Next.js and pioneers in edge computing.",
    techStack: ["Rust", "TypeScript", "Next.js", "Go", "AWS", "Kubernetes", "Turborepo"],
    benefits: [
      "High equity grants with extended exercise windows",
      "Unlimited PTO with recommended 4 weeks minimum",
      "Annual wellness & fitness stipend",
      "Top-tier hardware refresh every 2 years",
      "401(k) retirement matching"
    ],
    verified: true,
    logoBg: "#000000",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    slug: "anthropic",
    tagline: "AI research and safety company behind Claude",
    category: "AI & Research",
    stage: "Growth ($7B+ raised)",
    headquarters: "San Francisco, CA",
    remotePolicy: "Hybrid (SF)",
    employees: "500+",
    website: "https://anthropic.com",
    about: "Anthropic is an AI safety and research company that builds reliable, interpretable, and steerable AI systems. We are the creators of Claude, a state-of-the-art AI assistant.",
    techStack: ["Python", "PyTorch", "Rust", "JAX", "Kubernetes", "Ray", "TypeScript"],
    benefits: [
      "Exceptional compensation package with liquid equity",
      "Full coverage health, dental, vision for family",
      "Daily catered lunches & dinners in SF",
      "Commuter and relocation assistance",
      "Dedicated compute cluster access"
    ],
    verified: true,
    logoBg: "#D97706",
  },
  {
    id: "supabase",
    name: "Supabase",
    slug: "supabase",
    tagline: "The open source Firebase alternative",
    category: "Developer Tools",
    stage: "Series B ($116M)",
    headquarters: "Singapore & Remote",
    remotePolicy: "100% Remote Global",
    employees: "120+",
    website: "https://supabase.com",
    about: "Supabase is an open source Firebase alternative providing Postgres databases, authentication, instant APIs, edge functions, and real-time subscriptions.",
    techStack: ["PostgreSQL", "Elixir", "Go", "TypeScript", "Rust", "Docker", "Next.js"],
    benefits: [
      "Work from anywhere in the world",
      "Transparent salary formula with zero location discounts",
      "$3,000 co-working space stipend",
      "Open source contributions during work hours",
      "Quarterly team offsites in international destinations"
    ],
    verified: true,
    logoBg: "#3ECF8E",
  },
  {
    id: "figma",
    name: "Figma",
    slug: "figma",
    tagline: "Where teams design, prototype, and build together",
    category: "Design & Creative",
    stage: "Public Candidate",
    headquarters: "San Francisco, CA",
    remotePolicy: "Hybrid & Remote",
    employees: "1,500+",
    website: "https://figma.com",
    about: "Figma is a collaborative web application for interface design, with additional offline features enabled by desktop applications for macOS and Windows.",
    techStack: ["C++", "WebAssembly", "TypeScript", "React", "Rust", "Go", "AWS"],
    benefits: [
      "Comprehensive medical, vision, and dental",
      "Generous fertility & family-forming benefits",
      "$2,500 annual education & conference fund",
      "401(k) with 50% match up to statutory limits",
      "Dedicated 20% hack time for internal tooling"
    ],
    verified: true,
    logoBg: "#F24E1E",
  },
  {
    id: "notion",
    name: "Notion",
    slug: "notion",
    tagline: "The connected workspace for your wiki, docs, and projects",
    category: "Productivity",
    stage: "Series C ($10B+ val)",
    headquarters: "San Francisco, CA & New York, NY",
    remotePolicy: "Hybrid (SF / NYC)",
    employees: "800+",
    website: "https://notion.so",
    about: "Notion combines notes, docs, project management, and wikis into one collaborative platform, enhanced by powerful AI workflows and block-based architecture.",
    techStack: ["TypeScript", "React", "Kotlin", "Go", "PostgreSQL", "Kafka", "Elasticsearch"],
    benefits: [
      "Comprehensive medical, dental, vision coverage",
      "Free meals, snacks, and barista on-site",
      "Annual wellness stipend of $1,800",
      "Generous parental leave with gradual return",
      "Mental health and executive coaching subscriptions"
    ],
    verified: true,
    logoBg: "#000000",
  },
  {
    id: "retool",
    name: "Retool",
    slug: "retool",
    tagline: "Build internal software remarkably fast",
    category: "Developer Tools",
    stage: "Series C ($3.2B val)",
    headquarters: "San Francisco, CA",
    remotePolicy: "Hybrid (SF / NYC)",
    employees: "400+",
    website: "https://retool.com",
    about: "Retool makes it easy for developers to build internal tools. Connect to databases, write SQL, and drag and drop React components to build production apps in minutes.",
    techStack: ["TypeScript", "React", "Node.js", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
    benefits: [
      "Top-tier compensation and equity packages",
      "High agency and zero unnecessary bureaucracy",
      "Unlimited books & learning allowance",
      "Full coverage health, life, and disability",
      "Commuter transit subsidy"
    ],
    verified: true,
    logoBg: "#3B82F6",
  }
];

export const jobs = [
  {
    id: "job-1",
    title: "Senior Frontend Engineer — Design Systems",
    company: "Linear",
    companySlug: "linear",
    department: "Product Engineering",
    location: "Remote (UTC-8 to UTC+3)",
    workMode: "Remote",
    type: "Full-time",
    seniority: "Senior",
    salaryMin: 175000,
    salaryMax: 215000,
    salary: "$175k – $215k",
    equity: "0.15% – 0.35%",
    tags: ["React", "TypeScript", "CSS Architecture", "Design Systems", "Web Performance"],
    category: "Frontend & UI",
    postedAt: "2 hours ago",
    featured: true,
    verified: true,
    summary: "Help build and evolve the world-class interaction system and desktop-grade web application used by the best engineering teams on Earth.",
    description: `Linear is seeking a Senior Frontend Engineer dedicated to raising the craft of our design system and UI foundation. You will work on the core interfaces that thousands of product teams rely on every second, with a relentless focus on 60fps interaction speed, keyboard ergonomics, and visual elegance.

In this role, you will collaborate directly with our design and engineering leads. You'll build reusable primitives, optimize our sync engine rendering loops, and set the architectural standards for our React and TypeScript frontend.`,
    responsibilities: [
      "Architect and maintain high-performance, accessible UI primitives in our React + TypeScript library.",
      "Partner with product designers to implement nuanced micro-interactions, canvas rendering, and dark-mode color tokens.",
      "Profile and optimize rendering performance to guarantee sub-16ms frame times across all viewports.",
      "Build developer tooling, documentation, and lint rules to empower feature engineers across the company."
    ],
    requirements: [
      "5+ years building complex, state-heavy web applications in React and modern TypeScript.",
      "Deep obsession with craft: pixel precision, typography, CSS layout models, and sub-pixel alignment.",
      "Demonstrated experience building or maintaining a multi-package design system or component library.",
      "Strong understanding of browser rendering pipelines, DOM layout shifts, and memory leak diagnosis."
    ],
    interviewProcess: [
      { step: "1", title: "Recruiter Intro", duration: "25 min", desc: "Mutual alignment on background, aspirations, and compensation." },
      { step: "2", title: "Technical Architecture", duration: "60 min", desc: "Deep dive into component architecture and state sync." },
      { step: "3", title: "Paid Take-Home / Pairing", duration: "3-4 hours", desc: "Build a real-world keyboard-driven UI component." },
      { step: "4", title: "Founder & Team Chat", duration: "45 min", desc: "Product philosophy, team culture, and offer finalization." }
    ]
  },
  {
    id: "job-2",
    title: "Staff Distributed Systems Engineer — Core Storage",
    company: "Supabase",
    companySlug: "supabase",
    department: "Platform Engineering",
    location: "Remote (Worldwide)",
    workMode: "Remote",
    type: "Full-time",
    seniority: "Staff",
    salaryMin: 195000,
    salaryMax: 245000,
    salary: "$195k – $245k",
    equity: "0.20% – 0.50%",
    tags: ["Rust", "PostgreSQL", "Go", "Distributed Systems", "Linux Internals"],
    category: "Backend & Systems",
    postedAt: "5 hours ago",
    featured: true,
    verified: true,
    summary: "Design and scale the multi-tenant Postgres infrastructure powering over 1,000,000 developer databases worldwide.",
    description: `Supabase is looking for a Staff Distributed Systems Engineer to lead the architecture of our core storage and database orchestration layer. We are scaling our fleet of PostgreSQL instances to handle millions of transactions per second while maintaining rock-solid fault tolerance and millisecond cold starts.

You will own the foundational infrastructure that provisions, snapshots, migrates, and replicates Postgres databases across global cloud regions.`,
    responsibilities: [
      "Design and implement high-availability replication and automated failover systems for cloud Postgres instances.",
      "Write high-throughput, low-latency control plane services in Rust and Go.",
      "Investigate and resolve complex Linux kernel, storage I/O, and networking bottlenecks under heavy load.",
      "Drive architecture reviews and mentor senior engineers across the platform team."
    ],
    requirements: [
      "7+ years working on large-scale distributed systems, database engines, or cloud platform infrastructure.",
      "Expertise in Rust or Go, with deep familiarity with systems programming and concurrency.",
      "Proficiency with PostgreSQL internals (WAL, replication slots, connection pooling, indexing).",
      "Familiarity with eBPF, Linux cgroups, or container runtime orchestration is a strong plus."
    ],
    interviewProcess: [
      { step: "1", title: "Engineering Chat", duration: "30 min", desc: "Discuss background and distributed systems challenges." },
      { step: "2", title: "System Design Interview", duration: "75 min", desc: "Design a fault-tolerant distributed storage service." },
      { step: "3", title: "Coding & Concurrency", duration: "60 min", desc: "Hands-on concurrent systems programming session." },
      { step: "4", title: "Leadership & Team Fit", duration: "45 min", desc: "Cross-team collaboration, technical strategy, and offer." }
    ]
  },
  {
    id: "job-3",
    title: "AI Research Engineer — Model Alignment",
    company: "Anthropic",
    companySlug: "anthropic",
    department: "Constitutional AI",
    location: "San Francisco, CA",
    workMode: "Hybrid",
    type: "Full-time",
    seniority: "Senior",
    salaryMin: 220000,
    salaryMax: 310000,
    salary: "$220k – $310k",
    equity: "Generous equity grant",
    tags: ["Python", "PyTorch", "RLHF", "LLMs", "Distributed Training"],
    category: "AI & Machine Learning",
    postedAt: "1 day ago",
    featured: true,
    verified: true,
    summary: "Train next-generation foundation models with rigorous safety guarantees using Constitutional AI and RLHF methods.",
    description: `Join Anthropic's Alignment Team to work on the frontier of AI steerability, honesty, and safety. You will develop novel algorithms for reinforcement learning from human and AI feedback (RLHF / RLAIF) and integrate them into our flagship Claude models.

You'll collaborate with world-leading machine learning researchers and software engineers with direct access to massive compute infrastructure.`,
    responsibilities: [
      "Develop and scale RL algorithms to improve model truthfulness, reasoning quality, and alignment.",
      "Run large-scale training runs across thousands of GPUs/TPUs, optimizing throughput and memory efficiency.",
      "Design rigorous evaluation benchmarks to detect sycophancy, bias, and deception in frontier models.",
      "Publish high-impact technical reports and contribute to foundational AI safety methodology."
    ],
    requirements: [
      "Proven track record training large language models or deep reinforcement learning systems at scale.",
      "Expert-level PyTorch or JAX skills, including distributed training libraries (Megatron, DeepSpeed, FSDP).",
      "Strong mathematical background in optimization, probability, and linear algebra.",
      "Passion for existential AI safety, transparency, and empirical scientific rigor."
    ],
    interviewProcess: [
      { step: "1", title: "Initial Screening", duration: "30 min", desc: "Overview of research experience and alignment interests." },
      { step: "2", title: "ML Coding & Debugging", duration: "60 min", desc: "Hands-on PyTorch debugging and tensor operations." },
      { step: "3", title: "Research & Design", duration: "90 min", desc: "Walkthrough of past research and alignment problem solving." },
      { step: "4", title: "Values & Offer", duration: "45 min", desc: "Safety philosophy alignment and offer package." }
    ]
  },
  {
    id: "job-4",
    title: "Senior Product Designer — Developer Experience",
    company: "Vercel",
    companySlug: "vercel",
    department: "Product Design",
    location: "Remote (US & Europe)",
    workMode: "Remote",
    type: "Full-time",
    seniority: "Senior",
    salaryMin: 165000,
    salaryMax: 205000,
    salary: "$165k – $205k",
    equity: "0.10% – 0.25%",
    tags: ["Figma", "Design Systems", "Developer Tools", "Prototyping", "Information Architecture"],
    category: "Product & Design",
    postedAt: "1 day ago",
    featured: false,
    verified: true,
    summary: "Design seamless workflows for frontend developers deploying web applications, previewing branches, and monitoring observability.",
    description: `Vercel is looking for a Senior Product Designer to craft the user experience of our deployment workflow and observability dashboards. Millions of developers rely on Vercel to inspect build logs, monitor serverless functions, and collaborate on pull request previews.

We look for designers who understand developers intimately, write code to test their prototypes, and have an immaculate standard of craft.`,
    responsibilities: [
      "Own product design end-to-end for core platform features from discovery to launch.",
      "Create high-fidelity interactive prototypes in Figma or React to validate complex interaction models.",
      "Work hand-in-hand with frontend engineers to ensure design integrity down to the final pixel.",
      "Contribute to the Vercel Geist design system with new components and interaction guidelines."
    ],
    requirements: [
      "4+ years designing technical SaaS products, developer tooling, or cloud platforms.",
      "Demonstrated mastery of Figma, layout grids, visual hierarchy, and interaction design.",
      "Ability to write HTML/CSS or prototype in React is highly valued.",
      "Exceptional storytelling, user research synthesis, and cross-functional communication."
    ],
    interviewProcess: [
      { step: "1", title: "Intro Call", duration: "30 min", desc: "Portfolio walk and mutual introduction." },
      { step: "2", title: "Portfolio Presentation", duration: "60 min", desc: "Deep dive into 2 representative projects with the team." },
      { step: "3", title: "Live Design Jam", duration: "60 min", desc: "Collaborative whiteboard exercise on a developer tool problem." },
      { step: "4", title: "Final Chat", duration: "45 min", desc: "Design leadership chat and offer." }
    ]
  },
  {
    id: "job-5",
    title: "Lead Infrastructure & Cloud Architect",
    company: "Stripe",
    companySlug: "stripe",
    department: "Core Cloud Platform",
    location: "San Francisco, CA or Remote",
    workMode: "Hybrid",
    type: "Full-time",
    seniority: "Lead",
    salaryMin: 210000,
    salaryMax: 270000,
    salary: "$210k – $270k",
    equity: "Competitive RSU package",
    tags: ["Kubernetes", "AWS", "Terraform", "Zero Trust", "Service Mesh"],
    category: "Infra & DevOps",
    postedAt: "2 days ago",
    featured: false,
    verified: true,
    summary: "Lead the cloud infrastructure foundations processing hundreds of billions in financial transactions with five-nines uptime.",
    description: `Stripe's Infrastructure team is seeking a Lead Cloud Architect to guide our multi-region AWS and Kubernetes platform. Our systems power millions of transactions per minute across 130+ currencies with near-zero tolerance for disruption.

In this leadership role, you will define architecture roadmaps, establish zero-trust security postures, and guide high-stakes disaster recovery engineering.`,
    responsibilities: [
      "Architect multi-region, active-active cloud infrastructure with automated cross-region failover.",
      "Direct technical strategy for Kubernetes cluster fleet management, Envoy service meshes, and observability pipelines.",
      "Partner with InfoSec to maintain SOC2, PCI-DSS Level 1, and global regulatory compliance.",
      "Serve as senior technical authority during high-severity production postmortems."
    ],
    requirements: [
      "8+ years architecting mission-critical cloud infrastructure at large-scale technology companies.",
      "Exemplary knowledge of AWS networking (Transit Gateways, VPC peering), Kubernetes, and Terraform.",
      "Demonstrated experience designing disaster recovery architectures with strict RPO and RTO bounds.",
      "Track record of mentoring staff engineers and influencing executive technology strategy."
    ],
    interviewProcess: [
      { step: "1", title: "Recruiter Screen", duration: "30 min", desc: "Background and role alignment." },
      { step: "2", title: "System Architecture", duration: "75 min", desc: "Design an active-active financial processing cluster." },
      { step: "3", title: "Operational Excellence", duration: "60 min", desc: "Incident response, telemetry, and resilience pairing." },
      { step: "4", title: "VP of Engineering Chat", duration: "45 min", desc: "Executive alignment and package presentation." }
    ]
  },
  {
    id: "job-6",
    title: "Senior Full-Stack Engineer — Canvas Engine",
    company: "Figma",
    companySlug: "figma",
    department: "Editor Core",
    location: "New York, NY",
    workMode: "Hybrid",
    type: "Full-time",
    seniority: "Senior",
    salaryMin: 185000,
    salaryMax: 235000,
    salary: "$185k – $235k",
    equity: "Competitive Equity",
    tags: ["WebAssembly", "C++", "TypeScript", "WebGL", "Real-Time Sync"],
    category: "Frontend & UI",
    postedAt: "3 days ago",
    featured: false,
    verified: true,
    summary: "Push the boundaries of browser rendering, WebGL performance, and multi-player collaboration in Figma's multiplayer editor.",
    description: `Figma is hiring a Senior Full-Stack Engineer for our Editor Core team in NYC. The Figma canvas is one of the most sophisticated web applications ever created—rendering complex vector graphics at 60fps via C++ compiled to WebAssembly and WebGL.

You will invent new editing primitives, optimize memory consumption for massive design files, and ensure effortless real-time collaboration.`,
    responsibilities: [
      "Implement rendering and layout algorithms in C++ and TypeScript that compile to WebAssembly.",
      "Optimize real-time document synchronization across multiple active collaborators via WebSockets.",
      "Improve loading times and memory footprints for enterprise files containing 50,000+ objects.",
      "Collaborate with product designers to invent novel interactive canvas manipulation tools."
    ],
    requirements: [
      "5+ years of software engineering experience with strong proficiency in C++, Rust, or modern TypeScript.",
      "Experience with computer graphics fundamentals (WebGL, OpenGL, GPU shaders, or 2D rendering math).",
      "Familiarity with operational transformation (OT) or CRDT algorithms for multi-player real-time sync.",
      "High standard for software correctness, automated regression testing, and code review."
    ],
    interviewProcess: [
      { step: "1", title: "Initial Screen", duration: "30 min", desc: "Background and graphics experience." },
      { step: "2", title: "Algorithms & Data Structures", duration: "60 min", desc: "Technical coding and memory optimization." },
      { step: "3", title: "Graphics & System Design", duration: "75 min", desc: "Architecting a multi-user vector canvas engine." },
      { step: "4", title: "Team & Director Chat", duration: "45 min", desc: "Team match and final offer details." }
    ]
  },
  {
    id: "job-7",
    title: "Backend Engineer — Search & Knowledge Graph",
    company: "Notion",
    companySlug: "notion",
    department: "Search & Intelligence",
    location: "San Francisco, CA",
    workMode: "Hybrid",
    type: "Full-time",
    seniority: "Senior",
    salaryMin: 170000,
    salaryMax: 220000,
    salary: "$170k – $220k",
    equity: "0.12% – 0.28%",
    tags: ["Go", "Elasticsearch", "PostgreSQL", "Kafka", "Vector Search"],
    category: "Backend & Systems",
    postedAt: "4 days ago",
    featured: false,
    verified: true,
    summary: "Build low-latency search, hybrid semantic retrieval, and connected knowledge indexing for millions of workspaces.",
    description: `Notion is seeking a Backend Engineer to evolve our search and knowledge graph engine. When someone searches Notion, they are searching their personal brain or their company's entire operating system.

You will scale our hybrid indexing pipeline (Elasticsearch + vector embeddings via pgvector / Qdrant) to return instant, context-aware results across billions of blocks.`,
    responsibilities: [
      "Design and maintain distributed search pipelines in Go and Elasticsearch with sub-100ms response targets.",
      "Implement hybrid lexical and dense vector search capabilities with automatic rank tuning.",
      "Scale Kafka ingestion streams to handle millions of block edits per minute with near-instant index freshness.",
      "Partner with Notion AI teams to power contextual question answering directly from workspace docs."
    ],
    requirements: [
      "4+ years building high-throughput backend services in Go, Java, or Rust.",
      "Hands-on production experience with Elasticsearch, OpenSearch, Lucene, or vector databases.",
      "Solid foundation in relational database optimization, schema partitioning, and transaction isolation.",
      "Knowledge of information retrieval metrics (NDCG, MRR) or semantic embeddings is a plus."
    ],
    interviewProcess: [
      { step: "1", title: "Recruiter Intro", duration: "25 min", desc: "Overview and timeline alignment." },
      { step: "2", title: "Backend Coding", duration: "60 min", desc: "Hands-on Go / concurrent service implementation." },
      { step: "3", title: "Search Architecture", duration: "75 min", desc: "Design a real-time indexing pipeline for millions of docs." },
      { step: "4", title: "Final Leadership Chat", duration: "45 min", desc: "Culture alignment and offer." }
    ]
  },
  {
    id: "job-8",
    title: "Senior Fullstack Engineer — Enterprise Workflows",
    company: "Retool",
    companySlug: "retool",
    department: "Core Product",
    location: "San Francisco, CA or New York, NY",
    workMode: "Hybrid",
    type: "Full-time",
    seniority: "Senior",
    salaryMin: 180000,
    salaryMax: 225000,
    salary: "$180k – $225k",
    equity: "0.15% – 0.30%",
    tags: ["TypeScript", "React", "Node.js", "PostgreSQL", "Redis"],
    category: "Frontend & UI",
    postedAt: "5 days ago",
    featured: false,
    verified: true,
    summary: "Empower developers to build enterprise internal software at 10x speed with drag-and-drop components and custom code.",
    description: `Retool is the fastest way to build custom internal software. We're hiring a Senior Fullstack Engineer to help develop our next-generation visual workflow builder and database integrations.

You will bridge the gap between intuitive visual development and rigorous enterprise code execution environments.`,
    responsibilities: [
      "Build complex visual programming interfaces in React with keyboard shortcuts and undo/redo state.",
      "Develop secure sandboxed JavaScript/Python execution runtimes on the backend in Node.js and Docker.",
      "Optimize query execution pipelines connecting to hundreds of customer database formats.",
      "Work directly with customer engineering leaders to prioritize foundational capabilities."
    ],
    requirements: [
      "5+ years of fullstack web development with deep proficiency in TypeScript, React, and Node.js.",
      "Experience designing high-reliability web apps that execute customer-supplied logic safely.",
      "Strong aesthetic sensibility and appreciation for developer tooling quality.",
      "Pragmatic approach to trade-offs, architecture simplicity, and product velocity."
    ],
    interviewProcess: [
      { step: "1", title: "Screening Call", duration: "30 min", desc: "Past projects and engineering passions." },
      { step: "2", title: "Fullstack Pairing", duration: "60 min", desc: "Collaborative coding session on a fullstack problem." },
      { step: "3", title: "System Architecture", duration: "60 min", desc: "Designing an extensible developer runtime." },
      { step: "4", title: "Executive Chat", duration: "45 min", desc: "Company mission and offer conversation." }
    ]
  }
];

export const salaryBands = [
  {
    role: "Frontend & UI Engineer",
    category: "Frontend & UI",
    levels: [
      { level: "L3 / Junior", experience: "0–2 yrs", p25: 110000, median: 130000, p75: 145000, p90: 160000, equity: "$15k – $30k/yr" },
      { level: "L4 / Mid-Level", experience: "2–5 yrs", p25: 140000, median: 165000, p75: 185000, p90: 205000, equity: "$35k – $65k/yr" },
      { level: "L5 / Senior", experience: "5–8 yrs", p25: 175000, median: 205000, p75: 235000, p90: 265000, equity: "$70k – $120k/yr" },
      { level: "L6 / Staff", experience: "8–12 yrs", p25: 220000, median: 260000, p75: 305000, p90: 350000, equity: "$140k – $250k/yr" },
      { level: "L7 / Principal", experience: "12+ yrs", p25: 275000, median: 330000, p75: 390000, p90: 450000, equity: "$250k – $500k/yr" }
    ]
  },
  {
    role: "Backend & Systems Engineer",
    category: "Backend & Systems",
    levels: [
      { level: "L3 / Junior", experience: "0–2 yrs", p25: 115000, median: 135000, p75: 155000, p90: 170000, equity: "$18k – $35k/yr" },
      { level: "L4 / Mid-Level", experience: "2–5 yrs", p25: 145000, median: 175000, p75: 195000, p90: 215000, equity: "$40k – $75k/yr" },
      { level: "L5 / Senior", experience: "5–8 yrs", p25: 185000, median: 215000, p75: 250000, p90: 285000, equity: "$80k – $140k/yr" },
      { level: "L6 / Staff", experience: "8–12 yrs", p25: 235000, median: 275000, p75: 325000, p90: 380000, equity: "$160k – $300k/yr" },
      { level: "L7 / Principal", experience: "12+ yrs", p25: 290000, median: 350000, p75: 420000, p90: 490000, equity: "$300k – $600k/yr" }
    ]
  },
  {
    role: "AI & Machine Learning Engineer",
    category: "AI & Machine Learning",
    levels: [
      { level: "L3 / Junior", experience: "0–2 yrs", p25: 130000, median: 155000, p75: 175000, p90: 195000, equity: "$30k – $55k/yr" },
      { level: "L4 / Mid-Level", experience: "2–5 yrs", p25: 165000, median: 195000, p75: 230000, p90: 260000, equity: "$65k – $110k/yr" },
      { level: "L5 / Senior", experience: "5–8 yrs", p25: 210000, median: 255000, p75: 310000, p90: 360000, equity: "$120k – $220k/yr" },
      { level: "L6 / Staff", experience: "8–12 yrs", p25: 270000, median: 330000, p75: 400000, p90: 480000, equity: "$240k – $450k/yr" },
      { level: "L7 / Principal", experience: "12+ yrs", p25: 340000, median: 420000, p75: 520000, p90: 650000, equity: "$450k – $900k/yr" }
    ]
  },
  {
    role: "Product Designer",
    category: "Product & Design",
    levels: [
      { level: "L3 / Junior", experience: "0–2 yrs", p25: 100000, median: 120000, p75: 135000, p90: 150000, equity: "$15k – $28k/yr" },
      { level: "L4 / Mid-Level", experience: "2–5 yrs", p25: 130000, median: 155000, p75: 175000, p90: 195000, equity: "$30k – $60k/yr" },
      { level: "L5 / Senior", experience: "5–8 yrs", p25: 165000, median: 190000, p75: 220000, p90: 245000, equity: "$60k – $110k/yr" },
      { level: "L6 / Staff", experience: "8–12 yrs", p25: 205000, median: 240000, p75: 280000, p90: 325000, equity: "$120k – $220k/yr" },
      { level: "L7 / Principal", experience: "12+ yrs", p25: 250000, median: 300000, p75: 360000, p90: 420000, equity: "$200k – $400k/yr" }
    ]
  },
  {
    role: "DevOps & Cloud Infrastructure",
    category: "Infra & DevOps",
    levels: [
      { level: "L3 / Junior", experience: "0–2 yrs", p25: 110000, median: 130000, p75: 150000, p90: 165000, equity: "$15k – $32k/yr" },
      { level: "L4 / Mid-Level", experience: "2–5 yrs", p25: 140000, median: 170000, p75: 190000, p90: 210000, equity: "$35k – $70k/yr" },
      { level: "L5 / Senior", experience: "5–8 yrs", p25: 180000, median: 210000, p75: 245000, p90: 275000, equity: "$75k – $130k/yr" },
      { level: "L6 / Staff", experience: "8–12 yrs", p25: 225000, median: 265000, p75: 315000, p90: 365000, equity: "$150k – $280k/yr" },
      { level: "L7 / Principal", experience: "12+ yrs", p25: 280000, median: 340000, p75: 410000, p90: 475000, equity: "$280k – $550k/yr" }
    ]
  }
];

export const sampleApplications = [
  {
    _id: "app-101",
    job: jobs[0],
    applicantName: "Alex Rivera",
    email: "alex.rivera@example.com",
    role: "Senior Frontend Engineer — Design Systems",
    company: "Linear",
    status: "interviewing",
    appliedAt: "2026-10-18T14:30:00Z",
    notes: "Technical architecture round scheduled for Thursday 2 PM PST.",
    resumeURL: "https://example.com/resumes/alex-rivera-frontend.pdf"
  },
  {
    _id: "app-102",
    job: jobs[1],
    applicantName: "Alex Rivera",
    email: "alex.rivera@example.com",
    role: "Staff Distributed Systems Engineer — Core Storage",
    company: "Supabase",
    status: "screening",
    appliedAt: "2026-10-15T09:15:00Z",
    notes: "Application viewed by Hiring Lead. Awaiting recruiter screen.",
    resumeURL: "https://example.com/resumes/alex-rivera-systems.pdf"
  },
  {
    _id: "app-103",
    job: jobs[3],
    applicantName: "Alex Rivera",
    email: "alex.rivera@example.com",
    role: "Senior Product Designer — Developer Experience",
    company: "Vercel",
    status: "offer",
    appliedAt: "2026-10-05T11:00:00Z",
    notes: "Offer letter generated. Formal review in progress.",
    resumeURL: "https://example.com/resumes/alex-rivera-design.pdf"
  }
];
