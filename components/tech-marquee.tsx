const stack = [
  'PyTorch',
  'TypeScript',
  'Next.js',
  'LangChain',
  'PostgreSQL',
  'Python',
  'TensorFlow',
  'Kubernetes',
  'Hugging Face',
  'React',
  'AWS SageMaker',
  'Docker',
  'FastAPI',
  'Vector DBs',
]

export function TechMarquee() {
  const row = [...stack, ...stack]
  return (
    <section
      aria-label="Technology stack"
      className="overflow-hidden border-y border-border py-5"
    >
      <div className="flex w-max animate-marquee gap-10">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-10 font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground"
            aria-hidden={i >= stack.length}
          >
            {item}
            <span className="text-primary" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </section>
  )
}
