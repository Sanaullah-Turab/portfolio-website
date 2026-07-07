"use client";

import { Reveal, RevealText } from "@/components/reveal";

const socials = [
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "X / Twitter", href: "#" },
  { label: "Hugging Face", href: "#" },
];

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="border-t border-border px-6 pb-10 pt-24 md:px-14 md:pt-36 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-primary">
          <Reveal y={12}>
            <span>05 — Contact</span>
          </Reveal>
        </div>

        <h2 className="text-balance text-[12vw] font-medium leading-[0.95] tracking-tight sm:text-[9vw] lg:text-[7.5rem]">
          <RevealText text="Let's build" />
          <br />
          <span className="text-muted-foreground">
            <RevealText text="something smart" delay={0.15} />
          </span>
          <span className="text-primary">
            <RevealText text="." delay={0.3} />
          </span>
        </h2>

        <Reveal delay={0.3}>
          <div className="mt-14 grid gap-10 border-t border-border pt-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
                Open to ML engineering roles, fullstack + AI consulting, and
                interesting problems. The inbox is always open.
              </p>
              <a
                href="mailto:hello@example.com"
                className="mt-6 inline-block text-xl font-medium tracking-tight underline decoration-primary underline-offset-8 transition-colors hover:text-primary md:text-2xl"
              >
                hello@example.com
              </a>
            </div>

            <nav aria-label="Social links" className="md:col-span-4">
              <ul className="space-y-3">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
                    >
                      <span className="link-underline">{social.label}</span>
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col justify-between gap-6 md:col-span-3 md:items-end">
              <a
                href="#"
                className="group inline-flex w-fit items-center gap-3 rounded-full border border-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_24px_-6px_var(--primary)]"
              >
                Download resume
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-20 flex flex-col justify-between gap-3 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:flex-row">
          <span>© 2026 Adrian Vale</span>
          <span>Designed & built by hand — no template</span>
          <a
            href="#top"
            className="group inline-flex items-center gap-1 transition-colors hover:text-primary"
          >
            <span className="link-underline">Back to top</span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:-translate-y-1"
            >
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
