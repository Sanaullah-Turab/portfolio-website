'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

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
  const lineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(lineRef, { once: true, margin: '-60px' })

  return (
    <div className="mb-2">
      <Reveal>
        <div className="flex items-baseline gap-4 pb-4">
          {/* Glowing index number */}
          <span
            className="font-mono text-xs text-primary"
            style={{
              textShadow:
                '0 0 0.6em oklch(0.78 0.155 70 / 0.9), 0 0 1.8em oklch(0.78 0.155 70 / 0.5)',
            }}
          >
            {number}
          </span>
          {/* Glowing section title */}
          <h2
            className="font-mono text-base uppercase tracking-[0.25em] text-foreground"
            style={{
              textShadow:
                '0 0 0.8em oklch(0.78 0.155 70 / 0.45), 0 0 2.4em oklch(0.78 0.155 70 / 0.2)',
            }}
          >
            {title}
          </h2>
        </div>
      </Reveal>

      {/* Glowing line — CSS transition driven by useInView */}
      <div
        ref={lineRef}
        style={{
          height: '1px',
          width: '100%',
          background: 'oklch(0.78 0.155 70)',
          transformOrigin: 'left',
          transform: isInView ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.2s',
          boxShadow:
            '0 0 4px 1px oklch(0.78 0.155 70 / 0.7), 0 0 10px 2px oklch(0.78 0.155 70 / 0.35)',
        }}
      />
    </div>
  )
}


