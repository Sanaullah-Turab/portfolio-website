'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { RevealText, Reveal } from '@/components/reveal'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 120])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-5 pb-14 pt-20 md:px-10"
    >
      <motion.div style={{ y, opacity }} className="mx-auto w-full max-w-7xl">
        <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <Reveal delay={0.9} y={12}>
            <span>Adrian Vale</span>
          </Reveal>
          <Reveal delay={1.0} y={12}>
            <span className="text-primary">Fullstack → AI/ML Engineer</span>
          </Reveal>
          <Reveal delay={1.1} y={12}>
            <span>Est. 2017</span>
          </Reveal>
        </div>

        <h1 className="text-balance font-sans text-[13.5vw] font-medium leading-[0.95] tracking-tight sm:text-[11vw] lg:text-[8.5rem]">
          <RevealText text="I ship products" delay={0.1} />
          <br />
          <span className="text-muted-foreground">
            <RevealText text="that learn" delay={0.35} />
          </span>
          <span className="text-primary">
            <RevealText text="." delay={0.5} />
          </span>
        </h1>

        <div className="mt-12 grid gap-8 border-t border-border pt-8 md:grid-cols-12">
          <Reveal delay={0.6} className="md:col-span-5">
            <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
              Six years building fullstack systems end to end — now designing,
              training, and deploying machine learning that runs in
              production. From REST APIs to RAG pipelines, the craft is the
              same: things that work.
            </p>
          </Reveal>
          <Reveal delay={0.7} className="md:col-span-4">
            <dl className="grid grid-cols-2 gap-6 font-mono text-xs">
              <div>
                <dt className="mb-1 uppercase tracking-[0.2em] text-muted-foreground">
                  Currently
                </dt>
                <dd>ML Engineer @ Signal Labs</dd>
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
                <dd className="text-primary">24 shipped</dd>
              </div>
              <div>
                <dt className="mb-1 uppercase tracking-[0.2em] text-muted-foreground">
                  Status
                </dt>
                <dd>Open to work</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={0.8} className="flex items-end md:col-span-3 md:justify-end">
            <a
              href="#work"
              className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary"
            >
              Selected work
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
  )
}
