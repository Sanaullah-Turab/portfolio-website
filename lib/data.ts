// ---------------------------------------------------------------------------
// Central data store — all static content arrays live here.
// Importing from a single file keeps component files focused on UI logic only.
// ---------------------------------------------------------------------------

// ─── Tech Marquee ───────────────────────────────────────────────────────────

export const stack = [
  "PyTorch",
  "TypeScript",
  "Next.js",
  "LangChain",
  "PostgreSQL",
  "Python",
  "TensorFlow",
  "Kubernetes",
  "Hugging Face",
  "React",
  "AWS SageMaker",
  "Docker",
  "FastAPI",
  "Vector DBs",
];

// ─── Projects ───────────────────────────────────────────────────────────────

export type Project = {
  title: string;
  category: "AI/ML" | "Fullstack" | "Data/Analytics";
  description: string;
  tags: string[];
  image: string;
  year: string;
  href: string;
};

export const projects: Project[] = [
  {
    title: "Bijli Bachao AI",
    category: "AI/ML",
    description:
      "AI powered electricity bill analyzer using Gemini Vision API, built for the Google AISeekho Program and deployed on Cloud Run.",
    tags: ["Gemini Vision API", "FastAPI", "Next.js"],
    image: "/images/bijli.png",
    year: "2026",
    href: "https://bijli-bachao-ai-843802796503.us-west1.run.app",
  },
  {
    title: "RaceBox",
    category: "Data/Analytics",
    description:
      "F1 analytics platform running Monte Carlo simulations to model race outcomes and strategy, with a FastAPI backend serving real-time predictions.",
    tags: ["FastAPI", "Python", "Monte Carlo Simulation", "React"],
    image: "/images/racebox.png",
    year: "2026",
    href: "https://github.com/Sanaullah-Turab/F1-Simulator",
  },
  {
    title: "Connect-4",
    category: "AI/ML",
    description:
      "Connect 4 game with an unbeatable AI opponent using Minimax and Alpha-Beta Pruning, built with Python and Pygame.",
    tags: ["Python", "Pygame", "Minimax", "Alpha-Beta Pruning"],
    image: "/images/connect.jpeg",
    year: "2026",
    href: "https://github.com/Sanaullah-Turab/connect4-ai",
  },
  {
    title: "CodeConvo",
    category: "Fullstack",
    description:
      "Full stack discussion forum platform with user authentication, custom forum creation, threaded replies, and category based filtering and search.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    image: "/images/codeconvo.jpeg",
    year: "2025",
    href: "https://github.com/Sanaullah-Turab/Web-Based-Discussion-Forum",
  },
  {
    title: "AirCor",
    category: "Data/Analytics",
    description:
      "Data science analysis of 890K+ lung cancer records against global air pollution data across 133 countries, uncovering correlations between PM2.5 exposure and health outcomes.",
    tags: ["Python", "Pandas", "Scikit-learn", "SciPy"],
    image: "/images/aircor.png",
    year: "2025",
    href: "https://github.com/Sanaullah-Turab/global-lung-cancer-analysis",
  },
  {
    title: "Zahoor Perfumes",
    category: "Fullstack",
    description:
      "Shopify storefront for a fragrance retail brand, integrating the Shopify Storefront API with a custom React frontend and GSAP and Framer Motion animations for product browsing and checkout.",
    tags: ["React", "Shopify Storefront API", "GSAP", "Framer Motion"],
    image: "/images/zahoor.jpeg",
    year: "2025",
    href: "https://zahoorperfumes.netlify.app/",
  },
];

// ─── Experience ──────────────────────────────────────────────────────────────

export const roles = [
  {
    period: "[Jul 2026 →]",
    title: "ML Engineering Intern",
    company: "FlyRank AI",
    description:
      "Engineered preprocessing pipelines across multiple internal datasets, cutting model iteration time by 15%. Benchmarked candidate models against production criteria and partnered with a cross functional engineering team to integrate ML components into core systems.",
    stack: ["Python", "Scikit-learn", "Pandas", "NumPy"],
  },
  {
    period: "[Aug 2025 – Sep 2025]",
    title: "Machine Learning Engineer",
    company: "Arch Technologies",
    description:
      "Optimized machine learning models across three data challenges, improving prediction accuracy by 8%. Overhauled the data preprocessing and evaluation workflow, cutting experimentation turnaround time by roughly 20%.",
    stack: ["Python", "Scikit-learn", "Pandas"],
  },
  {
    period: "[May 2025 – Jul 2025]",
    title: "Frontend Developer Intern",
    company: "DevelopersHub Corporation & YoungDev",
    description:
      "Converted UI/UX designs into production-ready React components across two concurrent internships, integrating third-party APIs and improving page-load performance while ensuring cross-browser compatibility.",
    stack: ["React.js", "JavaScript", "Tailwind CSS"],
  },
  {
    period: "[Dec 2024 – Mar 2025]",
    title: "Web Developer Intern",
    company: "Securely Innovations",
    description:
      "Led a three-person team to build CodeConvo, a full stack discussion forum, owning architecture through deployment. Directed JWT-based authentication and persistent storage for users and threaded discussions.",
    stack: ["React", "Node.js", "SQLite", "JWT"],
  },
  {
    period: "[Feb 2024 – May 2024]",
    title: "Web Developer Intern",
    company: "Charisma Software",
    description:
      "Built UI components alongside senior developers in a live commercial codebase, applying production-grade code review and performance optimization practices.",
    stack: ["React", "JavaScript", "CSS"],
  },
  {
    period: "[2020 →]",
    title: "Full Stack Developer, Freelance",
    company: "Fiverr",
    description:
      "Delivered end-to-end web applications for e-commerce, portfolio, and small business clients, building React frontends paired with Node.js backends and Shopify API storefronts, deployed to production on Vercel.",
    stack: ["React", "Node.js", "Shopify API", "Vercel"],
  },
];

// ─── Certifications ──────────────────────────────────────────────────────────

export const certifications = [
  {
    name: "Machine Learning Specialization",
    issuer: "Stanford / DeepLearning.AI",
    year: "2024",
    id: "ML-2024-8842",
  },
  {
    name: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    year: "2024",
    id: "DL-2024-3391",
  },
  {
    name: "AWS Certified Machine Learning — Specialty",
    issuer: "Amazon Web Services",
    year: "2025",
    id: "AWS-MLS-7205",
  },
  {
    name: "TensorFlow Developer Certificate",
    issuer: "Google",
    year: "2024",
    id: "TF-2024-1187",
  },
  {
    name: "Professional ML Engineer",
    issuer: "Google Cloud",
    year: "2025",
    id: "GCP-PMLE-4410",
  },
  {
    name: "NLP Specialization",
    issuer: "DeepLearning.AI",
    year: "2025",
    id: "NLP-2025-0923",
  },
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    year: "2022",
    id: "AWS-SAA-5561",
  },
  {
    name: "MLOps Specialization",
    issuer: "Duke University",
    year: "2025",
    id: "MLO-2025-2748",
  },
  {
    name: "Kubernetes Application Developer",
    issuer: "CNCF",
    year: "2023",
    id: "CKAD-2023-6634",
  },
];

// ─── Footer Socials ──────────────────────────────────────────────────────────

export const socials = [
  { label: "GitHub", href: "https://github.com/Sanaullah-Turab" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sanaullah-turab/" },
  { label: "WhatsApp", href: "https://wa.me/923052871119" },
];
