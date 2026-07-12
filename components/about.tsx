import { Reveal, RevealText, SectionHeading } from "@/components/reveal";
import { ParallaxImage } from "@/components/parallax-image";

export function About() {
  return (
    <section id="about" className="px-5 py-24 md:px-10 md:py-36 lg:px-8">
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
                  I started fullstack out of necessity, freelance work needed
                  shipped products, not theory. APIs, databases, interfaces
                  that actually worked. Then my degree pulled me toward AI/ML,
                  and something clicked. Since 2023 I have been building
                  across both, and the AI/ML side is where I want to be.
                </p>
                <p>
                  The fullstack background did not get left behind, it became
                  the edge. I do not just want to train a model and hand it
                  off. I want to build the pipeline that feeds it, the API
                  that serves it, and the interface someone actually uses.
                  End to end, because that is the only way I know how to
                  build.
                </p>
                <p>
                  Right now that means deep learning, ML engineering, and
                  projects that go from raw data to something deployed and
                  working, not stuck in a notebook.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
                {[
                  ["3+", "Years engineering"],
                  ["16", "Projects shipped"],
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
              <ParallaxImage
                src="/images/portrait.jpeg"
                alt="Portrait of Sanaullah Turab"
                width={800}
                height={800}
                range={["-10%", "10%"]}
              />
              <figcaption className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <span>fig. 01 — the engineer</span>
                <span className="text-primary">Islamabad</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}