"use client";

import { Reveal, RevealText, SectionHeading } from "@/components/reveal";


const socials = [
  { label: "GitHub", href: "https://github.com/Sanaullah-Turab" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sanaullah-turab/" },
  { label: "WhatsApp", href: "https://wa.me/923052871119" },
];

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="px-5 pb-10 pt-16 md:px-10 md:pt-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading number="05" title="Contact" />

        <h2 className="text-balance text-[12vw] font-medium leading-[0.95] tracking-tight sm:text-[9vw] lg:text-[7.5rem]">
          <RevealText text="Let's build" />
          <br />
          <span className="text-muted-foreground">
            <RevealText text="something smart" delay={0.15} />
          </span>
          <span
            aria-hidden="true"
            style={{ verticalAlign: "baseline" }}
            className="relative inline-block ml-[0.08em] h-[0.18em] w-[0.18em] shrink-0"
          >
            <span
              className="absolute left-1/2 top-1/2 block h-full w-full rounded-full bg-primary -translate-x-1/2 -translate-y-1/2"
              style={{
                boxShadow:
                  "0 0 0.3em 0.12em oklch(0.78 0.155 70 / 0.6), 0 0 0.7em 0.25em oklch(0.78 0.155 70 / 0.25)",
              }}
            />
          </span>
        </h2>

        <Reveal delay={0.3}>
          <div className="mt-14 grid gap-10 border-t border-border pt-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
                Open to ML engineering roles, fullstack + AI consulting, and
                interesting problems. The inbox is always open.
              </p>
              {/* Aesthetic email block */}
              <a
                href="mailto:sanaullahturab2003@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/5 px-5 py-3 transition-all duration-300 hover:border-primary/70 hover:bg-primary/10 hover:shadow-[0_0_28px_-8px_var(--primary)]"
              >
                {/* Pulsing dot */}
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="font-mono text-sm tracking-tight text-foreground transition-colors group-hover:text-primary">
                  sanaullahturab2003@gmail.com
                </span>
                <span
                  aria-hidden="true"
                  className="ml-1 inline-block font-mono text-xs text-primary opacity-60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                >
                  ↗
                </span>
              </a>
            </div>

            <nav aria-label="Social links" className="md:col-span-4">
              <ul className="space-y-3">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
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
                href="/resume.pdf"
                download="Sanaullah_Turab_Resume.pdf"
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
          <span>© 2026 Sanaullah Turab</span>
          <span>Designed & built by hand, no template</span>
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
