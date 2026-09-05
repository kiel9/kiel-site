# Spec: Home page (`/`)

## Goal
A visitor understands in 10 seconds who Kiel is, sees one proof of work, knows what he's building next, and can reach him. Nothing else.

## Non-goals
- No blog, no project grid, no testimonials, no skills bar charts, no animations.
- No hero image, no stock photography, no illustration.

## Sections (in order, exactly four)

### 1. Positioning (above the fold)
- h1: the positioning line from `content/positioning.md`
- One short paragraph (≤40 words) under it, also from `content/positioning.md`
- Two links inline: LinkedIn, email. Plain text links, not buttons.

### 2. Selected work
- Small label: "Selected work"
- One case study card from `content/case-study-claims-api.md`
  - h2 = case study title
  - Three labeled blocks: Problem / What I did / Outcome
  - ≤150 words total
- Max width 65ch. Left-aligned text.

### 3. Now building
- Small label: "Now"
- 2–3 sentences from `content/now.md`
- Link text "Follow along on LinkedIn" → LinkedIn URL

### 4. Footer
- Name, "Jakarta", year, LinkedIn, email. One line on desktop, stacked on mobile.

## Layout & style
- Single column, max-width 680px, generous vertical spacing (≥64px between sections).
- Typography: system font stack. Base 18px, line-height 1.6. h1 ≤ 2.5rem.
- Palette: near-black text on off-white; one accent color for links only. Provide light and dark via `prefers-color-scheme`.
- Nav: just "Kiel" (home) and "About". No hamburger — two links fit on any screen.

## Acceptance criteria
- [ ] Renders correctly at 375px and 1440px with no horizontal scroll
- [ ] Zero client-side JS shipped
- [ ] All copy comes verbatim from `content/` files
- [ ] `npm run build` passes with zero warnings
- [ ] One h1, semantic landmarks (header/main/footer)
- [ ] Lighthouse ≥95 Performance, Accessibility, Best Practices, SEO
- [ ] `<title>` and `<meta name="description">` set from `content/positioning.md`
