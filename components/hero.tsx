"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  animate,
} from "framer-motion";
import { useRef, useCallback } from "react";
import { RevealText, Reveal } from "@/components/reveal";
import { SlotWord } from "@/components/slot-word";
import { Dot } from "@/components/dot";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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
      <motion.div style={{ y, opacity }} className="mx-auto w-full max-w-7xl">
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

        <h1 className="text-balance font-sans text-[13.5vw] font-medium leading-[0.95] tracking-tight sm:text-[11vw] lg:text-[8.5rem]">
          <RevealText text="I ship products" delay={0.1} />
          <br />
          <span className="whitespace-nowrap">
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
          </span>
        </h1>

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