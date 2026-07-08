"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/reveal";

const roles = [
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

export function Experience() {
  const timelineRef = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();

  // Scroll-driven progress for the vertical timeline line
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.75", "end 0.6"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="px-5 py-24 md:px-10 md:py-36 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading number="03" title="Experience" />

        <ol ref={timelineRef} className="relative mt-12 md:mt-16">
          {/* Track line */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[5px] top-2 w-px bg-border md:left-[7px]"
          />
          {/* Scroll-driven progress line */}
          <motion.div
            aria-hidden="true"
            className="absolute left-[5px] top-2 w-px origin-top bg-primary md:left-[7px]"
            style={{
              scaleY: reduced ? 1 : progress,
              height: "calc(100% - 0.5rem)",
              boxShadow: "0 0 12px 0 var(--primary)",
            }}
          />

          {roles.map((role, i) => (
            <li
              key={role.company}
              className="group relative pb-16 pl-10 last:pb-0 md:pl-16"
            >
              {/* Node marker */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-2 flex size-[11px] items-center justify-center md:size-[15px]"
              >
                <span className="size-full rounded-full border-2 border-primary bg-background transition-all duration-300 group-hover:bg-primary group-hover:shadow-[0_0_10px_0_var(--primary)]" />
              </span>

              <Reveal delay={i * 0.05}>
                <div className="grid gap-4 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-8">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                      {role.period}
                    </span>
                    <h3 className="mt-2 text-xl font-medium tracking-tight md:text-2xl">
                      {role.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {role.company}
                    </p>
                    <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
                      {role.description}
                    </p>
                    <ul
                      className="mt-5 flex flex-wrap gap-2"
                      aria-label="Technologies"
                    >
                      {role.stack.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-sm border border-border bg-card px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors duration-300 hover:border-primary/60 hover:text-foreground group-hover:border-primary/30"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
