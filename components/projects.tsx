"use client";

import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Reveal, SectionHeading } from "@/components/reveal";

type Project = {
  title: string;
  category: "AI/ML" | "Fullstack" | "Data/Analytics";
  description: string;
  tags: string[];
  image: string;
  year: string;
  href: string;
};

const projects: Project[] = [
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
    image: "/images/zahoor.png",
    year: "2025",
    href: "https://zahoorperfumes.netlify.app/",
  },
];

export function Projects() {
  const [active, setActive] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);

  // Cursor-following preview — fixed to viewport so it stays on screen while scrolling
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const previewX = useSpring(mouseX, {
    stiffness: 150,
    damping: 20,
    mass: 0.4,
  });
  const previewY = useSpring(mouseY, {
    stiffness: 150,
    damping: 20,
    mass: 0.4,
  });

  const positionFromEvent = useCallback(
    (e: { clientX: number; clientY: number }) => {
      // Offset so the preview floats to the right of the cursor, clamped to viewport
      const w = 380;
      const h = 260;
      const pad = 24;
      const x = Math.min(e.clientX + 32, window.innerWidth - w - pad);
      const y = Math.min(
        Math.max(e.clientY - h / 2, pad + 64),
        window.innerHeight - h - pad,
      );
      return { x, y };
    },
    [],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const { x, y } = positionFromEvent(e);
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY, positionFromEvent],
  );

  // On first entry, jump the preview to the cursor instead of animating from 0,0
  const handleEnter = useCallback(
    (i: number) => (e: React.MouseEvent) => {
      const { x, y } = positionFromEvent(e);
      if (active === null) {
        mouseX.jump(x);
        mouseY.jump(y);
        previewX.jump(x);
        previewY.jump(y);
      } else {
        mouseX.set(x);
        mouseY.set(y);
      }
      setActive(i);
    },
    [active, mouseX, mouseY, previewX, previewY, positionFromEvent],
  );

  return (
    <section
      id="work"
      className="relative px-5 py-24 md:px-10 md:py-36 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading number="01" title="Projects" />

        <div
          className="relative mt-4"
          ref={listRef}
          onMouseMove={handleMouseMove}
        >
          {/* Cursor-following preview (desktop only) — fixed so it never scrolls away */}
          <AnimatePresence>
            {active !== null && !reduced && (
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ x: previewX, y: previewY }}
                className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[380px] lg:block"
                aria-hidden="true"
              >
                <Image
                  src={projects[active].image || "/placeholder.svg"}
                  alt=""
                  width={760}
                  height={520}
                  className="rounded-md border border-border object-cover shadow-2xl"
                />

              </motion.div>
            )}
          </AnimatePresence>

          <ul>
            {projects.map((project, i) => (
              <Reveal key={project.title} delay={i * 0.05}>
                <li
                  className="group relative border-b border-border lg:border-b-0"
                  onMouseEnter={handleEnter(i)}
                  onMouseLeave={() => setActive(null)}
                >
                  {/* Amber divider that slides in over the static border on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 motion-reduce:transition-none"
                  />
                  <a
                    href={project.href ?? "#"}
                    target={project.href ? "_blank" : undefined}
                    rel={project.href ? "noopener noreferrer" : undefined}
                    className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 py-8 transition-colors md:grid-cols-[3rem_1fr_auto] md:gap-x-8 md:py-10"
                    aria-label={`${project.title} — ${project.category} project`}
                  >
                    <span className="font-mono text-xs text-muted-foreground transition-colors group-hover:text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <h3 className="text-3xl font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:text-5xl">
                          {project.title}
                        </h3>
                        <span
                          className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary"
                        >
                          {project.category}
                        </span>
                      </div>
                      <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground lg:max-w-md">
                        {project.description}
                      </p>
                      <ul
                        className="mt-4 flex flex-wrap gap-2"
                        aria-label="Technologies used"
                      >
                        {project.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors duration-300 hover:border-primary/60 hover:text-foreground"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                      {/* Inline image on mobile/tablet */}
                      <div className="mt-5 overflow-hidden rounded-md border border-border lg:hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={`Screenshot of ${project.title}`}
                          width={760}
                          height={520}
                          className="w-full object-cover"
                        />
                      </div>
                    </div>
                    <span
                      className="hidden items-baseline gap-1.5 font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground md:flex"
                      aria-hidden="true"
                    >
                      {project.year}
                      <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary">
                        ↗
                      </span>
                    </span>
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            + 10 more on{" "}
            <a
              href="https://github.com/sanaullah-turab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 transition-colors hover:text-primary"
            >
              GitHub
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
