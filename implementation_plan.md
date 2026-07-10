# Codebase Optimization Plan

This plan outlines a comprehensive, project-wide refactoring to optimize performance and loading times, without changing any design, functionality, or animation logic. 

## User Review Required

> [!IMPORTANT]  
> Please review the changes below. The core strategy is **shifting heavy HTML and static data to the server** and lazily loading heavy interactive components. This will significantly cut down your initial JavaScript bundle size (faster TTI & LCP).

## Proposed Changes

### Configuration & Dependencies
#### [MODIFY] [package.json](file:///home/sanaullah/Office-Work/portfolio-website/package.json)
- Remove unused dependencies originally installed by Shadcn (`@base-ui/react`, `class-variance-authority`, `clsx`, `shadcn`, `tailwind-merge`).

### Utilities & Dead Code
#### [DELETE] [button.tsx](file:///home/sanaullah/Office-Work/portfolio-website/components/ui/button.tsx)
- The entire `components/ui` folder is dead code and will be removed.
#### [DELETE] [utils.ts](file:///home/sanaullah/Office-Work/portfolio-website/lib/utils.ts)
- `cn` utility is unused across the codebase.

### Data Management (Industry Best Practice)
#### [NEW] [data.ts](file:///home/sanaullah/Office-Work/portfolio-website/lib/data.ts)
- Extract all large static arrays (`roles`, `projects`, `certifications`, `stack`, `socials`) out of the React components into a central configuration file. This prevents massive data arrays from clogging up component render files.

### Server Component Migrations (Performance)
Currently, almost every component has `"use client"` just because they contain a single `<Reveal>` wrapper. We will remove `"use client"` from these files, which keeps their dense HTML on the server. The `<Reveal>` wrapper will remain a client component, but its children (the heavy HTML) will be pure Server Components.
#### [MODIFY] [about.tsx](file:///home/sanaullah/Office-Work/portfolio-website/components/about.tsx)
- Remove `"use client"`.
#### [MODIFY] [certifications.tsx](file:///home/sanaullah/Office-Work/portfolio-website/components/certifications.tsx)
- Remove `"use client"`. Import data from `data.ts`.
#### [MODIFY] [site-footer.tsx](file:///home/sanaullah/Office-Work/portfolio-website/components/site-footer.tsx)
- Remove `"use client"`. Import data from `data.ts`.

### Component Cleanups
#### [MODIFY] [experience.tsx](file:///home/sanaullah/Office-Work/portfolio-website/components/experience.tsx)
- Keep `"use client"` (requires scroll tracking) but import data from `data.ts`.
#### [MODIFY] [projects.tsx](file:///home/sanaullah/Office-Work/portfolio-website/components/projects.tsx)
- Keep `"use client"` (requires cursor tracking) but import data from `data.ts`.
#### [MODIFY] [tech-marquee.tsx](file:///home/sanaullah/Office-Work/portfolio-website/components/tech-marquee.tsx)
- Import data from `data.ts`.

### Dynamic Imports (Bundle Splitting)
#### [MODIFY] [page.tsx](file:///home/sanaullah/Office-Work/portfolio-website/app/page.tsx)
- Use `next/dynamic` to lazily load the heavy interactive sections (`Projects`, `Experience`, `About`) that sit far below the fold. This forces Next.js to split these into separate JavaScript chunks, massively accelerating the initial load of the Hero section.

## Verification Plan

### Automated Tests
- `npm run build` will be executed to ensure there are no missing exports or hydration errors after the refactor, and to verify the chunk sizes.

### Manual Verification
- Verify the local dev server renders without layout shifts.
- Confirm that scroll animations on all sections trigger precisely as before.
