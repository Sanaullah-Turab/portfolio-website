"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { MobileMenu } from "@/components/mobile-menu";
import { navLinks } from "@/lib/nav-links";

export const links = navLinks;

export function SiteHeader() {
  const [time, setTime] = useState("");
  const [activeSection, setActiveSection] = useState("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:py-5 md:px-10 lg:px-16">
        <a href="#top" className="font-mono text-sm md:text-base tracking-tight">
          AV<span className="text-primary">.</span>
        </a>
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center md:gap-10">
            {links.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`link-underline font-mono text-xs md:text-[13px] uppercase tracking-[0.2em] md:tracking-[0.15em] transition-colors hover:text-primary ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="hidden items-center gap-2 font-mono text-xs text-muted-foreground sm:flex">
          <span className="relative inline-flex size-1.5" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
          </span>
          <span>SF, CA</span>
          <span className="tabular-nums" suppressHydrationWarning>
            {time || "00:00:00"}
          </span>
        </div>
        <MobileMenu links={links} />
      </div>
      {/* Scroll progress line */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 -bottom-px h-px origin-left bg-primary"
      />
    </motion.header>
  );
}
