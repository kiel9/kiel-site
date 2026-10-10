# Spec: Home page (`/`)

## Goal
A visitor understands in 10 seconds who Marlon is, sees one proof of work, knows what he's building next, and can reach him. Nothing else.

## Design direction (approved 2026-09-19: "Console Bento")
Dark-first terminal aesthetic on a bento tile layout. Chosen after a design exploration
(`~/.gstack/projects/kiel9-kiel-site/designs/home-page-20260919/`, variant G).
- Dark ground with a faint dot grid; light scheme provided for `prefers-color-scheme: light`.
- One web font: JetBrains Mono for h1/h2/h3, labels, numerals, nav, footer. System sans for body text.
- One accent (mint green) used for links, labels' `//` prefix, numerals, bracket corners, contact tile.
- h1 rendered with a `> ` prompt and a blinking `_` cursor (CSS only, disabled under `prefers-reduced-motion`).
- Section labels are lowercase code comments: `// selected work`, `// now`, `// contact`.
- Tiles: 4px radius, 1px rule, accent bracket corners top-left and bottom-right, subtle glow on hover.
- Nav: `~/Marlon` (home) and `About`; a `● jakarta · utc+7` status line on the right (hidden ≤26em).

## Non-goals
- No blog, no project grid, no testimonials, no skills bar charts.
- No hero image, no stock photography, no illustration.
- No client-side JS. No motion beyond the cursor blink and hover transitions.

## Tiles (in order)

### 1. Hero tile (2 columns on desktop)
- h1: the positioning line from `content/positioning.md`
- One short paragraph (≤40 words) under it, also from `content/positioning.md`
- Two links inline: LinkedIn, email. Plain text links, not buttons.

### 2. Stat tiles (three, right column on desktop; a row of three on mobile)
- From the `## Stats` block in `content/positioning.md` (`- figure | caption`).
- Big mono numeral in accent, small uppercase mono caption.

### 3. Selected work tile (2 columns on desktop)
- Label: "Selected work"
- One case study from `content/case-study-claims-api.md`
  - h2 = case study title
  - Three labeled blocks: Problem / What I did / Outcome
  - ≤150 words total

### 4. Now tile (right column)
- Label: "Now"
- 2–3 sentences from `content/now.md`
- Link text "Follow along on LinkedIn" → LinkedIn URL

### 5. Contact tile (right column, accent background)
- Label: "Contact"
- Two links: LinkedIn, Email.

### 6. Footer
- Name, "Jakarta", year, LinkedIn, email. One line on desktop, stacked on mobile.

## Layout & style
- Container max-width 1040px, 20px side padding. Grid: single column on mobile; `2fr 1fr` from 52em.
- Typography: body 17px / 1.6 system sans. h1 ≤ 2.5rem mono. `text-wrap: balance` on h1.
- Contrast ≥4.5:1 in both schemes. Visible focus rings.

## Acceptance criteria
- [ ] Renders correctly at 375px and 1440px with no horizontal scroll
- [ ] Zero client-side JS shipped
- [ ] All copy comes verbatim from `content/` files (labels and link text excepted)
- [ ] `npm run build` passes with zero warnings
- [ ] One h1, semantic landmarks (header/main/footer)
- [ ] Lighthouse ≥95 Performance, Accessibility, Best Practices, SEO
- [ ] `<title>` and `<meta name="description">` set from `content/positioning.md`
- [ ] Exactly one web font family loaded, self-hosted from `public/fonts/`, preloaded, `font-display: swap`
- [ ] Cursor blink disabled under `prefers-reduced-motion`
