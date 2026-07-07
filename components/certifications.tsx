'use client'

import { Reveal, SectionHeading } from '@/components/reveal'

const certifications = [
  {
    name: 'Machine Learning Specialization',
    issuer: 'Stanford / DeepLearning.AI',
    year: '2024',
    id: 'ML-2024-8842',
  },
  {
    name: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI',
    year: '2024',
    id: 'DL-2024-3391',
  },
  {
    name: 'AWS Certified Machine Learning — Specialty',
    issuer: 'Amazon Web Services',
    year: '2025',
    id: 'AWS-MLS-7205',
  },
  {
    name: 'TensorFlow Developer Certificate',
    issuer: 'Google',
    year: '2024',
    id: 'TF-2024-1187',
  },
  {
    name: 'Professional ML Engineer',
    issuer: 'Google Cloud',
    year: '2025',
    id: 'GCP-PMLE-4410',
  },
  {
    name: 'NLP Specialization',
    issuer: 'DeepLearning.AI',
    year: '2025',
    id: 'NLP-2025-0923',
  },
  {
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    year: '2022',
    id: 'AWS-SAA-5561',
  },
  {
    name: 'MLOps Specialization',
    issuer: 'Duke University',
    year: '2025',
    id: 'MLO-2025-2748',
  },
  {
    name: 'Kubernetes Application Developer',
    issuer: 'CNCF',
    year: '2023',
    id: 'CKAD-2023-6634',
  },
]

export function Certifications() {
  return (
    <section id="certifications" className="px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading number="04" title="Certifications" />

        <ul className="mt-4 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <Reveal key={cert.id} delay={(i % 3) * 0.06} className="h-full">
              <li className="group relative flex h-full flex-col justify-between gap-8 overflow-hidden bg-background p-6 transition-colors duration-300 hover:bg-card">
                {/* Amber accent line that slides in on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                />
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                      {cert.id}
                    </span>
                    <span className="font-mono text-[10px] text-primary">
                      {cert.year}
                    </span>
                  </div>
                  <h3 className="text-pretty text-lg font-medium leading-snug tracking-tight">
                    {cert.name}
                  </h3>
                  <p className="mt-2 font-mono text-xs text-muted-foreground">
                    {cert.issuer}
                  </p>
                </div>
                <a
                  href="#"
                  className="inline-flex w-fit items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-primary"
                  aria-label={`Verify ${cert.name} credential`}
                >
                  <span className="link-underline">Verify credential</span>
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
