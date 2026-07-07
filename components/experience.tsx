'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
} from 'framer-motion'
import { Reveal, SectionHeading } from '@/components/reveal'

const roles = [
  {
    period: '[now]',
    title: 'ML Engineer',
    company: 'Signal Labs',
    description:
      'Own the LLM application layer — RAG pipelines, evaluation frameworks, and inference optimization serving 2M requests/day.',
    stack: ['PyTorch', 'LangChain', 'Kubernetes', 'vLLM'],
  },
  {
    period: '[2023 →]',
    title: 'Senior Fullstack Engineer → ML',
    company: 'Northwind Systems',
    description:
      'Led the internal transition of the recommendations stack from heuristics to learned models. Built the training pipeline and the product surface it powers.',
    stack: ['Python', 'TensorFlow', 'Next.js', 'GCP'],
  },
  {
    period: '[2020]',
    title: 'Fullstack Engineer',
    company: 'Fathom & Co',
    description:
      'Scaled a B2B SaaS from 10k to 400k users. Owned API design, database architecture, and the design system.',
    stack: ['TypeScript', 'React', 'PostgreSQL', 'AWS'],
  },
  {
    period: '[2017]',
    title: 'Software Engineer',
    company: 'Brightside Digital',
    description:
      'Agency work across 20+ client projects — e-commerce, marketing sites, and internal tools. Learned to ship fast without breaking things.',
    stack: ['JavaScript', 'Node.js', 'Vue', 'MySQL'],
  },
]

export function Experience() {
  const timelineRef = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()

  // Scroll-driven progress for the vertical timeline line
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.75', 'end 0.6'],
  })
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  })

  return (
    <section id="experience" className="px-6 py-24 md:px-14 md:py-36 lg:px-20">
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
              height: 'calc(100% - 0.5rem)',
              boxShadow: '0 0 12px 0 var(--primary)',
            }}
          />

          {roles.map((role, i) => (
            <li key={role.company} className="group relative pb-16 pl-10 last:pb-0 md:pl-16">
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
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
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
  )
}
