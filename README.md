# Sanaullah Turab — Portfolio

Personal portfolio website for **Sanaullah Turab**, a Fullstack → AI/ML Engineer. Built from scratch with a focus on performance, clean architecture, and premium micro-animations throughout.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Smooth Scroll | [Lenis](https://lenis.darkroom.engineering/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Analytics | [Vercel Analytics](https://vercel.com/analytics) |
| Fonts | Space Grotesk + JetBrains Mono (Google Fonts) |

## Features

- **Scroll-driven animations** — Reveal on scroll using Framer Motion `whileInView`, timeline progress line with `useScroll` + `useSpring`
- **Slot-word hero** — Custom character-by-character reel animation that cycles through words with a scramble effect
- **Cursor-tracking project preview** — Desktop project images follow the cursor with spring physics
- **Smooth scrolling** — Lenis for buttery smooth native scroll, with anchor-link integration
- **Live clock** — Real-time ISB time in the header
- **Reduced motion support** — All animations respect `prefers-reduced-motion`
- **Server Components** — Static sections (About, Certifications, Footer) are Server Components; only interactive sections carry `"use client"`
- **Grain overlay** — Subtle SVG noise texture for depth

## Project Structure

```
├── app/
│   ├── globals.css       # Design tokens, keyframes, utilities
│   ├── layout.tsx        # Root layout — fonts, Lenis, Analytics
│   └── page.tsx          # Page composition
├── components/
│   ├── hero.tsx          # Slot-word hero with parallax fade
│   ├── projects.tsx      # Cursor-tracking project list
│   ├── experience.tsx    # Scroll-driven timeline
│   ├── about.tsx         # Portrait + stats section (Server Component)
│   ├── certifications.tsx# Credential grid (Server Component)
│   ├── site-header.tsx   # Fixed header with scroll progress bar
│   ├── site-footer.tsx   # Contact + socials (Server Component)
│   ├── reveal.tsx        # Reusable scroll-reveal primitives
│   ├── section-line.tsx  # Animated amber divider line
│   ├── slot-word.tsx     # Reel/scramble word animation
│   ├── dot.tsx           # Glowing animated period
│   ├── glow.tsx          # Radial glow background element
│   ├── tech-marquee.tsx  # Infinite tech stack ticker
│   ├── mobile-menu.tsx   # Full-screen mobile navigation
│   └── lenis-provider.tsx# Lenis smooth scroll context
└── lib/
    ├── data.ts           # Central static data store (projects, roles, certs…)
    └── nav-links.ts      # Navigation link definitions
```

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Performance Notes

- Static sections are Next.js **Server Components** — their HTML is rendered on the server with zero client JS overhead
- Interactive sections (`hero`, `projects`, `experience`, `site-header`) use `"use client"` only where hooks and event listeners are strictly required
- All static data arrays live in `lib/data.ts` to keep component files lightweight
- No `next/dynamic` lazy imports — all sections are SSR'd to preserve `whileInView` scroll animation timing

## License

MIT © 2026 [Sanaullah Turab](https://github.com/Sanaullah-Turab)
