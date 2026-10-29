---
name: portfolio-design
description: Visual identity, motion and component rules for Eduardo Greb's portfolio (acid-lime engineering look). Use before adding or restyling any section, component, animation or color on the site.
---

# Portfolio design system

Stack: TanStack Start + React 19 + Tailwind v4 (tokens in `src/styles.css`), `motion` for animation,
self-hosted fonts via `@fontsource-variable/*`. Deployed on Vercel.

## Tokens (never hardcode hexes in components; use the Tailwind names)

| Token                    | Value   | Tailwind                                 |
| ------------------------ | ------- | ---------------------------------------- |
| ground                   | #0E0F0C | `bg-background`                          |
| text                     | #F2F1EA | `text-foreground`                        |
| muted text               | #A9AA9F | `text-muted-foreground`                  |
| border                   | #2A2C26 | `border-border`                          |
| strong border            | #44463E | `border-border-strong`                   |
| raised surface           | #1A1B17 | `bg-surface`                             |
| accent (swap here)       | #D4FF3A | `bg-accent` / `text-accent` (`--accent`) |
| ink on light/accent      | #0E0F0C | `text-ink`                               |
| paper (inverted section) | #F2F1EA | `bg-paper`                               |

The accent appears only on CTAs, status dots, stack labels, the contact background and the nav logo square.
To swap it, change `--accent` in `:root`. Everything follows.

## Type

- Space Grotesk Variable: headings and body; 700 for display.
- JetBrains Mono Variable: labels, nav, dates, metadata (`font-mono`).
- Display: `.display-xl` (hero, clamp 44→96px), `.display-lg` (section h2), `.display-md` (contact). Tracking −0.03em.

## Rules

- Sharp corners (radius 0), 1px hairline borders. No gradients, glassmorphism, emoji, left-border cards or drop shadows.
- Section header pattern: mono `0X — Name` label + display h2.
- Two-column rows and grids stack below `md`. Container: `.container-site` (max 1160px, 24px gutters).
- Touch targets ≥44px (`min-h-11`), visible `:focus-visible` outline in accent (on accent backgrounds: ink).
- Contrast AA: muted text only on ground/surface; on paper use `text-ink/70` or darker.

## Motion

- Primitives in `src/components/site/motion.tsx`: `Reveal`, `Stagger`/`StaggerItem`, `SplitWords`, `CountUp`,
  `Typewriter`, `Marquee`. Hero canvas: `agent-graph.tsx`.
- Everything must respect `prefers-reduced-motion`: motion's `MotionConfig reducedMotion="user"` is set in
  `__root.tsx`; canvas and CSS loops check the media query themselves.
- Animate only transform/opacity; canvas pauses off-screen and in hidden tabs. Keep Lighthouse ≥95.

## Media

Project visuals are 16:10 panels (`ProjectVisual`). NDA work uses the code-editor panel. For a real screenshot or GIF,
put an optimized `.webp`/`.avif` (GIF → animated webp or muted looping mp4) in `src/assets/work/`, add a `media`
field to that project in `src/data/career.ts`, and render it in `ProjectVisual` inside the same `Panel` with explicit
width/height, `loading="lazy"` and meaningful `alt`. Panels currently marked "illustrative" (S44, Backyard) are the ones
to replace when Eduardo provides real captures.
