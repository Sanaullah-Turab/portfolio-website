"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  animate,
} from "framer-motion";
import { useRef, useCallback, useState, useEffect } from "react";
import { RevealText, Reveal } from "@/components/reveal";
import { SlotWord } from "@/components/slot-word";
import { Dot } from "@/components/dot";

function PortraitFrame({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="group relative">
        {/* Ambient glow behind the portrait — warm light bleeding from behind */}
        <div aria-hidden="true" className="absolute -inset-12 -z-10">
          {/* Broad soft wash */}
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl" />
          {/* Tighter core, offset to the upper right to echo the rim light */}
          <div className="absolute right-0 top-0 h-2/3 w-2/3 rounded-full bg-primary/15 blur-2xl" />
        </div>
        {/* Offset frame behind for depth */}
        <div
          aria-hidden="true"
          className="absolute inset-0 translate-x-3 translate-y-3 border border-primary/30"
        />
        {/* Corner ticks */}
        <span
          aria-hidden="true"
          className="absolute -left-2 -top-2 z-10 font-mono text-xs text-primary"
        >
          +
        </span>
        <span
          aria-hidden="true"
          className="absolute -right-2 -top-2 z-10 font-mono text-xs text-primary"
        >
          +
        </span>
        <span
          aria-hidden="true"
          className="absolute -bottom-2 -left-2 z-10 font-mono text-xs text-primary"
        >
          +
        </span>
        <span
          aria-hidden="true"
          className="absolute -bottom-2 -right-2 z-10 font-mono text-xs text-primary"
        >
          +
        </span>

        <div className="relative aspect-[4/5] overflow-hidden border border-border bg-card">
          <img
            src="/images/headshot.png"
            alt="Portrait of Sanaullah Turab"
            className="h-full w-full object-cover grayscale contrast-110 transition-all duration-700 ease-out group-hover:grayscale-0"
          />
          {/* Warm tint + bottom fade so it sits in the palette */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-primary/10 mix-blend-overlay"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/70 to-transparent"
          />
          {/* Caption bar inside the frame */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 px-2.5 py-2 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
              />
              Portrait
            </span>
            <span>01</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 120]);
  // Portrait moves slower than the text for a parallax depth effect
  const yPortrait = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 50]);
  
  // Dynamically calculate opacity on every scroll frame to avoid stale state
  const opacity = useTransform(scrollYProgress, (p) => {
    const mobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (mobile) {
      // Mobile: stays solid while in the middle (up to 0.25), then fades out as it hits the top of screen (~0.5)
      if (p <= 0.30) return 1;
      if (p >= 0.60) return 0;
      return 1 - (p - 0.30) / 0.30;
    } else {
      // Desktop: starts fading immediately, hits 0 opacity at 80% scroll
      if (p <= 0) return 1;
      if (p >= 0.8) return 0;
      return 1 - p / 0.8;
    }
  });

  // Animated x-offset for the Dot — tracks actual word pixel width
  const dotX = useMotionValue(0);
  const handleWidthDelta = useCallback(
    (delta: number, snap: boolean) => {
      if (snap) {
        dotX.set(delta);
      } else {
        animate(dotX, delta, { duration: 0.4, ease: [0.22, 1, 0.36, 1] });
      }
    },
    [dotX]
  );

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-5 pb-14 pt-20 md:px-10 lg:px-8"
    >
      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto w-full max-w-7xl"
      >
        {/* Desktop portrait — vertically centered with the text, right side */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden items-center lg:flex">
          <motion.div
            style={{ y: yPortrait }}
            className="pointer-events-auto w-44 xl:w-56 2xl:w-64"
          >
            <Reveal delay={1.2} y={20}>
              <PortraitFrame />
            </Reveal>
          </motion.div>
        </div>

        <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <Reveal delay={0.9} y={12}>
            <span>Sanaullah Turab</span>
          </Reveal>
          <Reveal delay={1.0} y={12}>
            <span className="text-primary">Fullstack → AI/ML Engineer</span>
          </Reveal>
          <Reveal delay={1.1} y={12}>
            <span>Est. 2023</span>
          </Reveal>
        </div>

        <h1 className="relative z-10 text-balance font-sans text-[13.5vw] font-medium leading-[0.95] tracking-tight sm:text-[11vw] lg:text-[8.5rem]">
          <RevealText text="I ship products" delay={0.1} />
          <br />
          <span className="text-muted-foreground">
            <RevealText text="that " delay={0.35} />
            <SlotWord
              words={["solve", "think", "scale", "train"]}
              delay={0.35}
              hold={2600}
              onWidthDelta={handleWidthDelta}
            />
          </span>
          <motion.span style={{ display: "inline-block", x: dotX }}>
            <Dot />
          </motion.span>
        </h1>

        {/* Mobile portrait — centered figure break between headline and stats */}
        <div className="mt-12 flex justify-center lg:hidden">
          <Reveal delay={1.2} y={16}>
            <PortraitFrame className="w-44 sm:w-52" />
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 border-t border-border pt-8 md:grid-cols-12">
          <Reveal delay={0.6} className="md:col-span-5">
            <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
              Started with full stack systems, APIs, databases, the stuff that ships. Now I'm deep in machine learning, training models and building pipelines that go from notebook to production. Same instinct either way: build things that actually work.
            </p>
          </Reveal>
          <Reveal delay={0.7} className="md:col-span-4">
            <dl className="grid grid-cols-2 gap-6 font-mono text-xs">
              <div>
                <dt className="mb-1 uppercase tracking-[0.2em] text-muted-foreground">
                  Currently
                </dt>
                <dd>ML Engineer @ Flyrank AI</dd>
              </div>
              <div>
                <dt className="mb-1 uppercase tracking-[0.2em] text-muted-foreground">
                  Focus
                </dt>
                <dd>LLMs / MLOps / Product</dd>
              </div>
              <div>
                <dt className="mb-1 uppercase tracking-[0.2em] text-muted-foreground">
                  Projects
                </dt>
                <dd className="text-primary">16 shipped</dd>
              </div>
              <div>
                <dt className="mb-1 uppercase tracking-[0.2em] text-muted-foreground">
                  Status
                </dt>
                <dd>Open to work</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal
            delay={0.8}
            className="flex items-end md:col-span-3 md:justify-end"
          >

            <a href="#work"
              className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary"
            >
              My Projects
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-y-1"
              >
                ↓
              </span>
            </a>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}
