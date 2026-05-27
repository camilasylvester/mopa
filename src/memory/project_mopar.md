---
name: project-mopar-2026
description: Internal campaign landing page for Promo Mundialista Mopar 2026 — React + Tailwind, dark premium automotive style
metadata:
  type: project
---

Promo Mundialista MOPAR 2026 — internal campaign landing page.

**Why:** Internal activation hub for Mopar dealerships across Argentina for the 2026 FIFA World Cup campaign.

**Stack:** Vite + React 18 + Tailwind CSS 3 + Lucide React. No backend connected yet.

**How to apply:** All data is mocked in `src/data/index.js`. Real API endpoints, download URLs, and auth/session context (dealership selector) should be wired in there. Logo SVGs should replace the Ω text marks in Header and Footer.

**Critical design rules:**
- The Ω symbol can be Mopar blue (#0057A8)
- The word "MOPAR" must ALWAYS be white/black/gray — NEVER blue
- No neon glow, no cyberpunk, no gaming aesthetics

**Key files:**
- `src/data/index.js` — all mock data + getMockContent()
- `src/components/HeroVisual.jsx` — SVG soccer goal + Mopar ball
- `src/components/ModuleCards.jsx` — 5-card accordion with brand selector
- `src/App.jsx` — lifted state for openModule + selectedBrands
