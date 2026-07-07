'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Reveal({
  children,
  delay = 0,
  className,
  y = 32,
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function RevealText({
  text,
  className,
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  const reduced = useReducedMotion()
  const words = text.split(' ')
  return (
    <motion.span
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          aria-hidden="true"
          variants={{
            hidden: {
              opacity: 0,
              y: reduced ? 0 : '0.5em',
              filter: reduced ? 'none' : 'blur(6px)',
            },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: {
                duration: 0.8,
                delay: delay + i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        >
          {word}
          {i < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.span>
  )
}

export function SectionHeading({
  number,
  title,
}: {
  number: string
  title: string
}) {
  return (
    <Reveal>
      <div className="flex items-baseline gap-4 border-b border-border pb-5">
        <span className="font-mono text-xs text-primary">{number}</span>
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {title}
        </h2>
      </div>
    </Reveal>
  )
}
