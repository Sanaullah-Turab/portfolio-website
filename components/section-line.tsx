'use client'

import { useEffect, useRef, useState } from 'react'

export function SectionLine() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px', threshold: 0 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        height: '1px',
        width: '100%',
        background: 'oklch(0.78 0.155 70)',
        transformOrigin: 'left',
        transform: visible ? 'scaleX(1)' : 'scaleX(0)',
        transition: 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s',
        boxShadow:
          '0 0 4px 1px oklch(0.78 0.155 70 / 0.7), 0 0 10px 2px oklch(0.78 0.155 70 / 0.35)',
      }}
    />
  )
}
