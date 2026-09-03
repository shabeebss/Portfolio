export const PORTFOLIO_CONFIG = {
  name: "Shabeeb Ahammed KT",
  role: "Full Stack Python & Next.js Engineer",
  title: "Python Django Backend & Full Stack Developer",
  email: "shabeebahammedkt@gmail.com",
  phone: "+91 97463 91640",
  rawPhone: "919746391640",
  location: "Pattambi / Malappuram, Kerala, India",
  github: "https://github.com/shabeebss",
  githubUser: "shabeebss",
  linkedin: "https://www.linkedin.com/in/shabeebahammed/",
  linkedinUser: "shabeebahammed",
  resumePath: "/assets/Shabeeb_Resume.pdf",
  profileImage: "/assets/images/804a-d4d8f90e-bd41-482c-91e0-47223a6438f4.jpg",
  whatsappMessage: "Hi Shabeeb, I saw your portfolio and would like to connect!",
  status: {
    available: true,
    text: "Available for Work"
  },
  get whatsappUrl() {
    return `https://wa.me/${this.rawPhone}?text=${encodeURIComponent(this.whatsappMessage)}`;
  },
  get telUrl() {
    return `tel:+${this.rawPhone}`;
  },
  get mailtoUrl() {
    return `mailto:${this.email}?subject=${encodeURIComponent("Project Inquiry from Portfolio")}&body=${encodeURIComponent("Hi Shabeeb,\n\nI came across your portfolio and would like to discuss...")}`;
  }
};

export const TYPING_TITLES = [
  "Python Django Backend Developer",
  "Full Stack Next.js Engineer",
  "Enterprise ERP Systems Architect",
  "Computer Vision & AI Specialist",
  "REST API & PostgreSQL Optimizer"
];

export const STATS = [
  { value: 2, suffix: "+", label: "Years of Professional Dev" },
  { value: 10, suffix: "+", label: "Enterprise Modules Built" },
  { value: 100, suffix: "%", label: "Agile & CI/CD Delivery" }
];

export const SKILL_CATEGORIES = [
  {
    id: "backend",
    title: "Backend & REST APIs",
    icon: "Server",
    description: "Scalable Django architectures, high-performance REST APIs, relational modeling, and strict role-based access control (RBAC).",
    tags: ["Python", "Django", "Django REST", "PostgreSQL", "JWT Auth", "RBAC"]
  },
  {
    id: "frontend",
    title: "Frontend & UI/UX",
    icon: "Layout",
    description: "High-performance data-driven user interfaces, complex data tables, state management, and real-time analytical dashboards.",
    tags: ["React.js", "Next.js", "TypeScript", "PrimeReact", "Tailwind CSS", "HTML5 / CSS3"]
  },
  {
    id: "ai",
    title: "AI & Computer Vision",
    icon: "Cpu",
    description: "Deploying deep learning vision pipelines for real-time threat detection, weapon classification, and surveillance anomaly triggers.",
    tags: ["YOLO (v8)", "CNN", "OpenCV", "Deep Learning", "TensorRT"]
  },
  {
    id: "enterprise",
    title: "Enterprise ERP Systems",
    icon: "Database",
    description: "Complex multi-warehouse batch stock tracking, FIFO valuation, general ledger accounting calculations, and audit reporting.",
    tags: ["Inventory ERP", "FIFO Valuation", "Ledger Balances", "SQL Optimization"]
  },
  {
    id: "integrations",
    title: "Integrations & Payments",
    icon: "CreditCard",
    description: "Enterprise payment processing, geocoding route calculations, dynamic QR code generation, and third-party webhook verification.",
    tags: ["Razorpay Webhooks", "Google Maps API", "QR Code Billing", "REST Webhooks"]
  },
  {
    id: "workflow",
    title: "Workflow & Tooling",
    icon: "GitBranch",
    description: "Iterative Agile sprint execution, Git collaborative branching, CI/CD pipeline automation, and clean modular code architecture.",
    tags: ["Git / GitHub", "Agile / Scrum", "CI/CD", "Postman", "Linux / Bash"]
  }
];

export const PROJECTS = [
  {
    id: "pyerp",
    title: "PyERP (Enterprise ERP & E-Commerce)",
    shortTitle: "PyERP Platform",
    category: "enterprise",
    categoryLabel: "Enterprise",
    image: "/assets/images/project-dashboard.jpg",
    description: "Enterprise ERP & e-commerce platform supporting multi-location inventory, purchasing workflows, sales tracking, and double-entry financial ledger accounting. Built with Django REST APIs, Next.js, PrimeReact, batch tracking, KPI reporting, and Razorpay gateway integration.",
    tech: ["Python", "Django REST", "Next.js", "TypeScript", "PrimeReact", "PostgreSQL", "Razorpay"],
    github: "https://github.com/shabeebss",
    caseStudy: {
      headline: "Enterprise Multi-Tenant ERP & E-Commerce Suite",
      summary: "PyERP is an enterprise-grade resource planning system engineered to streamline supply chain logistics, inventory batch lifecycles, and double-entry general ledger bookkeeping for high-volume commercial enterprises.",
      client: "Exouzia Solutions / Commercial Clients",
      timeline: "Sep 2025 — Present",
      role: "Backend & Full Stack Engineer",
      metrics: [
        { label: "Query Optimization", value: "< 45ms P95 Latency" },
        { label: "Data Integrity", value: "100% FIFO Consistency" },
        { label: "Payment Success", value: "99.98% Webhook Reliability" },
        { label: "Data Scalability", value: "50,000+ SKU Batches" }
      ],
      highlights: [
        "Multi-Warehouse Inventory: Real-time stock movement with automated FIFO (First-In, First-Out) valuation, low-stock threshold triggers, and batch expiry alerts.",
        "Double-Entry Financial Ledger: Automated journal entries generated upon sales and purchase invoice settlement with balanced debit/credit validation.",
        "High-Performance Frontend: Built with Next.js and PrimeReact data-tables supporting server-side pagination, multi-column filtering, and live Excel/PDF exports.",
        "Secure Payments: Razorpay payment gateway integration with HMAC SHA-256 webhook signature validation and transactional rollback protection."
      ],
      architecture: [
        "Backend: Django REST Framework with modular micro-app structure (Inventory, Billing, Accounts, Authentication).",
        "Database: PostgreSQL 16 with indexed relational schemas, foreign keys, and foreign-data wrapper support.",
        "Frontend: Next.js App Router with TypeScript, PrimeReact components, and custom CSS design system.",
        "Security: JWT access/refresh token rotation, Role-Based Access Control (RBAC) with permission matrix."
      ]
    }
  },
  {
    id: "home360",
    title: "Home360 (AI Security Surveillance)",
    shortTitle: "Home360 AI System",
    category: "ai",
    categoryLabel: "AI / Vision",
    image: "/assets/images/project-home360.jpg",
    description: "Deep learning–powered intelligent surveillance system capable of detecting unauthorized persons, weapons, animals, and fire in real-time video streams using CNN, YOLO, and suspicious activity anomaly detection algorithms.",
    tech: ["Python", "Django", "YOLO", "CNN", "OpenCV", "Deep Learning"],
    github: "https://github.com/shabeebss",
    caseStudy: {
      headline: "Real-Time AI Vision Surveillance & Anomaly Detection",
      summary: "Home360 is a proactive security surveillance engine that continuously monitors IP camera video feeds, detecting security threats and sending automated real-time alerts within milliseconds.",
      client: "Regional Technologies / Academic R&D",
      timeline: "Aug 2024 — May 2025",
      role: "AI & Computer Vision Engineer",
      metrics: [
        { label: "Inference Speed", value: "30+ FPS Real-time" },
        { label: "Object Detection", value: "94.2% mAP Score" },
        { label: "Alert Dispatch", value: "< 250ms Trigger" },
        { label: "Supported Threats", value: "Weapons, Fire, Intruders" }
      ],
      highlights: [
        "Real-Time Object Detection: Custom-trained YOLOv8 models optimized for low-latency edge and server inference on CCTV feeds.",
        "Multi-Class Threat Classification: Detects knives, firearms, unauthorized human intrusion during curfew hours, and fire/smoke anomalies.",
        "Automated Push Alerts: Real-time trigger dispatch to security personnel dashboard via WebSockets and SMS/Email notification bridges.",
        "Video Stream Optimization: Multi-threaded OpenCV frame grabbers with dynamic frame skipping to conserve network bandwidth."
      ],
      architecture: [
        "Vision Pipeline: OpenCV capture -> YOLOv8 inference engine -> Kalman filter tracking -> Threat evaluator.",
        "Backend Server: Python Django REST orchestrator with event logging and audit trails.",
        "Alert Dispatcher: Asynchronous message queue with instant snapshot capture and cloud storage dispatch.",
        "Dashboard: Live video stream canvas with bounding boxes, confidence score overlays, and incident playback."
      ]
    }
  },
  {
    id: "taxifare",
    title: "TaxiFare Calculator",
    shortTitle: "TaxiFare Ride Engine",
    category: "web",
    categoryLabel: "Web App",
    image: "/assets/images/project-taxifare.jpg",
    description: "Full-stack taxi fare calculator and ride booking platform with vehicle selection, distance-based dynamic pricing algorithm, Google Maps route integration, dynamic QR code billing, and Razorpay gateway integration.",
    tech: ["Django", "React.js", "Google Maps API", "Razorpay", "QR Billing"],
    github: "https://github.com/shabeebss",
    caseStudy: {
      headline: "Dynamic Route Pricing & Instant Ride Booking Engine",
      summary: "TaxiFare Calculator provides automated fare estimation, route optimization, driver matching, and seamless digital checkout for on-demand transportation operators.",
      client: "Regional Technologies",
      timeline: "2024",
      role: "Full Stack Developer",
      metrics: [
        { label: "Route Estimation", value: "Sub-second Polyline" },
        { label: "Pricing Precision", value: "Dynamic Tier Algorithm" },
        { label: "Checkout Ease", value: "One-Click Razorpay & QR" },
        { label: "Mobile Responsive", value: "100% PWA Ready" }
      ],
      highlights: [
        "Google Maps Routing: Real-time distance matrix computation, turn-by-turn polyline visualization, and traffic-aware ETA prediction.",
        "Dynamic Fare Engine: Multi-factor pricing based on vehicle category (Sedan, SUV, Hatchback), base fare, per-kilometer rate, and night surcharges.",
        "Instant Dynamic QR Billing: Automated QR code generation allowing riders to scan and pay immediately via UPI or digital wallets.",
        "Razorpay Payment Gateway: Complete payment lifecycle from tokenization to automated receipt generation and refund reconciliation."
      ],
      architecture: [
        "Backend: Django REST API for fare calculations, driver dispatch logic, and booking state machines.",
        "Frontend: Interactive React.js interface with Google Maps JavaScript SDK and Places Autocomplete.",
        "Payment & Billing: Razorpay SDK and dynamic UPI QR code generator backend endpoints."
      ]
    }
  }
];

export const EXPERIENCES = [
  {
    id: "exouzia",
    role: "Python Django Backend Developer",
    company: "Exouzia",
    location: "Pattambi, Kerala",
    period: "Sep 2025 — Present",
    badge: "Full-Time • Present",
    highlights: [
      "Contributed to the development of enterprise ERP and e-commerce applications using Python, Django, Django REST Framework, and PostgreSQL within an Agile engineering sprint cycle.",
      "Architected and maintained backend services for user management, inventory workflows, order processing, and role-based access control (RBAC).",
      "Contributed to large-scale ERP frontend interfaces using React.js, Next.js, TypeScript, and PrimeReact, building complex inventory, sales, and financial reporting views.",
      "Engineered interactive reporting with KPI summaries, advanced filtering, pagination, sorting, date-range selection, stock valuation calculations, and ledger balances.",
      "Integrated Razorpay payment processing and diagnosed cross-stack API and UI data flow challenges to ensure production-grade stability."
    ],
    tech: ["Python", "Django REST", "React.js", "Next.js", "TypeScript", "PrimeReact", "PostgreSQL", "Razorpay"]
  },
  {
    id: "regional-tech",
    role: "Software Developer Intern",
    company: "Regional Technologies",
    location: "Kozhikode, Kerala",
    period: "Aug 2024 — May 2025",
    badge: "Internship",
    highlights: [
      "Developed and delivered scalable web applications following Agile engineering practices using Python and Django.",
      "Designed and deployed deep learning vision models including CNN, YOLO, and suspicious activity detection algorithms for real-time security surveillance.",
      "Implemented key application features including interactive Google Maps routing, dynamic QR code generation/scanning, and Razorpay payment gateway integration."
    ],
    tech: ["Python", "Django", "CNN", "YOLO", "Deep Learning", "Maps API", "Razorpay"]
  }
];

export const EXPERIENCE_ROADMAP = [
  {
    step: 1,
    phase: "Phase 1: 2022 — 2023",
    title: "Full Stack Foundations & Relational Engineering",
    organization: "G-Tech & Tech Community",
    location: "Pattambi, Kerala",
    status: "Completed",
    statusType: "completed",
    badge: "Foundation Milestone",
    icon: "Code2",
    description: "Built strong foundations in Python OOP, Django MVC architecture, MySQL relational modeling, and JavaScript UI workflows with top academic standing (Grade A+). Served as CEO of college IEDC and founded StackHub student tech community.",
    milestones: [
      "Graduated with Grade A+ in Python Django Full Stack Development",
      "Architected relational database schemas, migrations, and CRUD pipelines",
      "Organized community workshops on Arduino and open-source coding"
    ],
    tech: ["Python", "Django", "MySQL", "JavaScript", "HTML5/CSS3", "Bootstrap"]
  },
  {
    step: 2,
    phase: "Phase 2: 2023 — 2025",
    title: "MCA Graduate Studies & AI Vision Specialization",
    organization: "APJ Abdul Kalam Tech University & IIT Kanpur",
    location: "Malappuram, Kerala",
    status: "Completed",
    statusType: "completed",
    badge: "Master's Degree & Cloud",
    icon: "GraduationCap",
    description: "Completed Master of Computer Applications (GPA 7.67/10.00). Specialized in Data Structures & Algorithms, Operating Systems, Database Management Systems, and Cloud Computing from IIT Kanpur.",
    milestones: [
      "Master of Computer Applications (MCA) Degree with 7.67 GPA",
      "Earned Cloud Computing Certification from IIT Kanpur",
      "In-depth research and project implementations in CNN, YOLO & Computer Vision"
    ],
    tech: ["DSA", "DBMS", "Cloud Computing", "AI & ML", "Operating Systems", "SQL"]
  },
  {
    step: 3,
    phase: "Phase 3: Aug 2024 — May 2025",
    title: "AI Computer Vision & Web Systems Engineer",
    organization: "Regional Technologies",
    location: "Kozhikode, Kerala",
    status: "Completed",
    statusType: "completed",
    badge: "Production AI & APIs",
    icon: "Cpu",
    description: "Engineered scalable Python/Django web applications and deployed production deep learning vision models for real-time security surveillance and dynamic route calculation.",
    milestones: [
      "Developed Home360 real-time YOLOv8 surveillance system (30+ FPS, weapon & intrusion detection)",
      "Implemented Google Maps distance matrix routing & dynamic taxi fare prediction algorithm",
      "Integrated Razorpay payment gateways with dynamic UPI QR code generation"
    ],
    tech: ["Python", "Django", "YOLOv8", "CNN", "OpenCV", "Google Maps API", "Razorpay"]
  },
  {
    step: 4,
    phase: "Phase 4: Sep 2025 — Present",
    title: "Python Django Backend & Enterprise Systems Engineer",
    organization: "Exouzia",
    location: "Pattambi, Kerala",
    status: "Active Present Stage",
    statusType: "active",
    badge: "Full-Time • Enterprise ERP",
    icon: "Server",
    description: "Architecting enterprise multi-tenant ERP and commercial e-commerce platforms using Python, Django REST Framework, PostgreSQL, Next.js, and PrimeReact in Agile sprint cycles.",
    milestones: [
      "Architected multi-warehouse inventory batch tracking with 100% automated FIFO valuation",
      "Engineered double-entry financial general ledger balances and balanced debit/credit audits",
      "Built large-scale Next.js & PrimeReact interfaces with server-side pagination, sorting, and live export",
      "Optimized PostgreSQL relational schemas achieving sub-45ms P95 query response times"
    ],
    tech: ["Python", "Django REST", "PostgreSQL 16", "Next.js", "TypeScript", "PrimeReact", "RBAC"]
  },
  {
    step: 5,
    phase: "Phase 5: Future Horizon",
    title: "Cloud-Native Distributed Systems & AI Agentic Workflows",
    organization: "Continuous Engineering Innovation",
    location: "Global",
    status: "In Progress / Target",
    statusType: "future",
    badge: "Next Engineering Horizon",
    icon: "Sparkles",
    description: "Scaling distributed microservices, message streaming architectures (Kafka/RabbitMQ), Docker/Kubernetes container orchestration, and multi-agent AI tool-calling workflows.",
    milestones: [
      "High-throughput distributed event-driven microservices",
      "Autonomous AI Agent workflows and LLM tool integrations",
      "Kubernetes container orchestration & infrastructure-as-code"
    ],
    tech: ["Docker", "Kubernetes", "Microservices", "Kafka", "AI Agents", "FastAPI"]
  }
];

export const EDUCATION = [
  {
    id: "mca",
    degree: "Master of Computer Application (MCA)",
    institution: "APJ Abdul Kalam Technological University",
    location: "Malappuram, Kerala",
    period: "Aug 2023 — May 2025",
    grade: "GPA: 7.67 / 10.00",
    coursework: [
      "Data Structures & Algorithms",
      "DBMS & SQL",
      "OOP Design",
      "Artificial Intelligence",
      "Machine Learning",
      "Operating Systems"
    ]
  },
  {
    id: "gtech",
    degree: "Python Django Full Stack Development",
    institution: "G-Tech Computer Education",
    location: "Pattambi, Kerala",
    period: "Aug 2022 — Mar 2023",
    grade: "Grade: A+",
    coursework: [
      "Python & Django",
      "HTML5 & CSS3",
      "JavaScript",
      "Bootstrap",
      "MySQL"
    ]
  },
  {
    id: "bcom",
    degree: "Bachelor of Commerce (B.Com)",
    institution: "University of Calicut",
    location: "Malappuram, Kerala",
    period: "Jul 2019 — May 2022",
    grade: "GPA: 5.90 / 10.00",
    leadership: "Served as CEO of the Innovation & Entrepreneurship Development Cell (IEDC) at college, leading hands-on workshops on Arduino Uno. Founded and led student tech community StackHub, and actively contributed to TinkerHub tech meetups."
  }
];

export const CERTIFICATIONS = [
  {
    id: "cloud-iitk",
    title: "Cloud Computing",
    issuer: "IIT Kanpur",
    year: "2023",
    badge: "Verified Credential",
    icon: "Cloud"
  },
  {
    id: "python-gtech",
    title: "Python Django Full Stack Development",
    issuer: "G-Tech Computer Education",
    year: "2023",
    badge: "Verified Credential",
    icon: "Code2"
  }
];

export const THEMES = [
  { id: "midnight", name: "Midnight Emerald", category: "Dark", accent: "#10b981", bg: "#080c14" },
  { id: "clean-light", name: "Clean Pearl", category: "Light", accent: "#059669", bg: "#f8fafc" },
  { id: "nordic", name: "Nordic Frost", category: "Dark", accent: "#38bdf8", bg: "#0b1118" },
  { id: "warm-paper", name: "Warm Editorial", category: "Light", accent: "#d97706", bg: "#faf7f2" },
  { id: "cyber-neon", name: "Cyber Neon", category: "Dark", accent: "#c084fc", bg: "#0a0614" }
];
