# kiel-site — CLAUDE.md

## What this is
Personal site for Marlon (Jehezhiel Marlon Djamari; "Marlon" in nav and body, full name in footer/About): engineer-turned-Product Manager (8 yrs engineering, 5 yrs PM, now Senior PM in Indonesian healthtech, bridging Ops and Commercial). Purpose: professional profile + public signal that he builds AI automation for Indonesian B2B.

Audience: hiring managers, founders, potential B2B automation clients in Indonesia. English only for now.

## Stack (fixed — do not propose alternatives)
- Astro (latest), static output, no framework islands unless explicitly asked
- Plain CSS in `src/styles/global.css`. No Tailwind, no UI libraries.
- Design: "Console Bento" (approved 2026-09-19, see `specs/home-page-spec.md` → Design direction). Dark-first, one web font (JetBrains Mono, display only), bento tiles on home, CSS-only motion limited to the h1 cursor blink and hover transitions, honouring `prefers-reduced-motion`.
- No client-side JS unless a feature is impossible without it. Ask first.
- Deploy target: Vercel (adapter not needed — static build)
- Package manager: npm

## Structure
- `src/pages/index.astro` — home (positioning, case study, "now building", contact)
- `src/pages/about.astro` — longer story, engineer → PM
- `src/layouts/Base.astro` — single shared layout, head, nav, footer
- `src/styles/global.css`
- `content/` — source copy written by Marlon. ALWAYS pull copy from here, never invent bio facts. Stat tiles read `## Stats` in `content/positioning.md`.
- `specs/` — page specs. Build to the spec; if the spec is ambiguous, ask ONE clarifying question, don't guess.

## Rules
- Mobile-first. Test mentally at 375px before desktop.
- Performance: exactly one web font (JetBrains Mono, self-hosted latin woff2 in `public/fonts/`, preloaded, `font-display: swap`), no images >100KB, Lighthouse ≥95 on all four.
- Copy: do not embellish, do not add adjectives, do not add sections not in the spec. Marlon edits tone himself.
- Never mention employer confidential details. Case study is sanitized — keep it that way.
- Accessibility: semantic HTML, one h1 per page, visible focus states, contrast ≥4.5:1.
- Before any edit touching more than 2 files, summarize the plan in 3 lines and wait.

## Commands
- `npm run dev` — local at localhost:4321
- `npm run build` — must pass with zero warnings before any commit
- `npm run preview` — check the built output

## Git
- Conventional commits: `feat:`, `fix:`, `content:`, `chore:`
- One logical change per commit. Run `npm run build` before committing.
- Never force-push. Never commit `node_modules/` or `.env`.

## Done means
- Builds clean, looks right on phone, deployed URL loads in under 1s, copy matches `content/`.
