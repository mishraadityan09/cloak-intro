# cloak-intro

Marketing landing page for **Cloak** — a private remote for your coding agent. Drive Claude Code from your phone over a direct, end-to-end-encrypted tunnel. No account, no cloud, self-hosted.

Built with **Next.js 16** (App Router) + **React 19** + **Tailwind v4**, with an Apple-style scroll experience powered by **GSAP** (ScrollSmoother, ScrollTrigger, SplitText): smooth inertia scrolling, a pinned "watch it work" product scrub, a horizontal-scroll feature gallery, masked text reveals, and tasteful parallax — all with `prefers-reduced-motion` and no-JS fallbacks.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint

## Structure

- `src/app/page.tsx` — the landing page markup (Server Component)
- `src/app/SmoothScroll.tsx` — GSAP/ScrollSmoother provider (client)
- `src/app/scenes.ts` — all scroll scenes
- `src/app/PhoneMock.tsx` — the shared phone mockup
- `src/app/globals.css` — design system + layout
- `public/demo.mp4` — the product walkthrough video
