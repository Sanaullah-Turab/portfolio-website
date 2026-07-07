"use client";

import Image from "next/image";
import { Reveal, RevealText, SectionHeading } from "@/components/reveal";

export function About() {
  return (
    <section id="about" className="px-6 py-24 md:px-14 md:py-36 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading number="02" title="About" />

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h3 className="text-balance text-3xl font-medium leading-tight tracking-tight md:text-5xl">
              <RevealText text="Fullstack roots." />
              <br />
              <span className="text-primary">
                <RevealText text="Machine learning trajectory." delay={0.15} />
              </span>
            </h3>
            <Reveal delay={0.25}>
              <div className="mt-8 max-w-xl space-y-5 leading-relaxed text-muted-foreground">
                <p>
                  I spent six years as a fullstack engineer — designing APIs,
                  scaling databases, and shipping interfaces used by millions.
                  Then the models got interesting. I retrained, earned the
                  credentials, and moved into AI/ML engineering full time.
                </p>
                <p>
                  That fullstack foundation isn&apos;t baggage — it&apos;s the
                  edge. I don&apos;t just train models; I ship them. Data
                  pipelines, evaluation harnesses, inference infrastructure, and
                  the product UI on top. End to end, the way it should be.
                </p>
                <p>
                  Today I work on LLM applications, retrieval systems, and
                  production MLOps — with a bias toward things users actually
                  touch.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
                {[
                  ["8+", "Years engineering"],
                  ["24", "Projects shipped"],
                  ["9", "Certifications"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <dd className="text-4xl font-medium tracking-tight text-primary md:text-5xl">
                      {value}
                    </dd>
                    <dt className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {label}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="lg:col-span-5">
            <figure className="relative">
              <Image
                src="/images/portrait.png"
                alt="Portrait of Adrian Vale"
                width={800}
                height={800}
                className="w-full rounded-md border border-border object-cover grayscale transition-all duration-700 hover:grayscale-0"
              />
              <figcaption className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <span>fig. 01 — the engineer</span>
                <span className="text-primary">San Francisco</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
