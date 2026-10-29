---
name: portfolio-verify
description: Checklist to verify Eduardo Greb's portfolio after a change — lint, typecheck, production build, browser check at desktop and phone width, reduced motion, a11y and Lighthouse. Use after editing the site and before saying a change is done or committing.
---

# Verify the portfolio

1. **Static checks** (from repo root):
   - `npx tsc --noEmit`
   - `npm run lint`
   - `npm run build`: must finish; it targets Vercel's Build Output (`.vercel/output`).
2. **Run it**: start the `dev` config in `.claude/launch.json` (`npm run dev -- --port 8081`; 8080 is often taken by the Unity MCP server) with the browser
   pane's `preview_start`. Check the console for errors.
3. **Look at it**:
   - Desktop width: every section renders in order (nav, hero, 01 How I build, 02 Selected work,
     03 Experience & stack, contact, footer).
   - Phone width (375px): no horizontal scroll (`document.documentElement.scrollWidth <= innerWidth`),
     two-column rows stacked, nav wraps.
   - The résumé modal opens and the PDF renders; downloads are linked.
   - All external links: LinkedIn, GitHub, CitrineOS, Backyard Adventures designer, mailto.
4. **Motion & a11y**:
   - Emulate `prefers-reduced-motion: reduce`: content must be visible with no movement.
   - Tab through the page: every interactive element shows a focus ring, and targets are ≥44px.
   - Text contrast ≥4.5:1 (muted #A9AA9F on #0E0F0C passes; check anything new).
5. **Facts**: diff the copy against the `portfolio-facts` skill. Any number or claim not listed there is a bug.
6. **Performance**: Lighthouse (mobile) on `npm run build && npm run preview` should be ≥95 across categories.
   Big regressions usually come from the hero canvas, unoptimized images or eagerly loaded pdf.js.
