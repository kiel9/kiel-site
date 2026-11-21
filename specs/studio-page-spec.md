# Spec: Studio page (`/studio`)

Approved design: `docs/designs/portfolio-agent-studio.md` (approved 2026-11-21).

## Goal
A company profile for Marlon's studio. A small B2B founder can say, after 30 seconds, what the studio does and how to start a conversation. Static, no live tools.

## Content: `content/studio.md`
Written by Marlon. Read with the shared helpers in `src/lib/text.ts`, in the plain-paragraph format of the work spec ("Section text format").
- `# ` line: the page h1. Required.
- `## Meta description`: at most 155 characters. Required.
- `## Tile`: one sentence for the home Studio tile. Required.
- `## What we do`: one sentence of outcome, for whom.
- `## Who it's for`
- `## How an engagement works`: first call to go-live and handover, one step per paragraph.
- `## Agents`: optional intro paragraph.

A missing optional section is omitted, never shown as placeholder text. A missing required part, or a meta description over 155 characters, fails the build. These checks run only when the file exists.

## Page
- `<title>` is `${h1} — ${shortName}`, matching every other page.
- Bento layout as on home (`2fr 1fr` from 52em): hero tile with the h1 and "What we do"; "Who it's for"; "How an engagement works" with each step numbered by CSS; "Agents"; the contact block last.
- **Agents list:** generated from `kind: agent` work items, in `/work` order. Each entry is the item `title` linked to its page, with its `summary` below. With zero agent items, the whole Agents section is omitted.
- **Contact block:** accent tile labelled "Start a conversation", with LinkedIn and email read from `## Links` in `content/positioning.md`.
- The Studio nav item carries `aria-current="page"` on `/studio`.

## Launch gating
- `src/lib/studio.ts` reads `content/studio.md` with `import.meta.glob(..., { query: "?raw", eager: true })`, which returns nothing when the file is absent.
- The route is `src/pages/[studio].astro`. Its `getStaticPaths` returns the `studio` path only when the helper found the file.
- `Base.astro` (nav item) and the home Studio tile use the same helper and render nothing without the file.
- Marlon keeps his draft in `drafts/studio.md`, which is gitignored.
- All Work and Studio code is built on `feat/work-and-studio`. The branch merges when home renders unchanged, `/work` works, and at least one agent item has passed the sanitisation gate. Studio then goes live by adding `content/studio.md` on main.
- **Live date: 2026-12-07,** using whatever the founder conversations have produced by then. If the studio name and price are still open, it ships as "Agent Studio" with no price.

## Sanitisation gate
`content/studio.md` goes through the same manual checklist as work items (see work spec) before it is added to `content/`.

## Style
Same layout, tokens and typography as home. Mockup: https://claude.ai/artifact/RZsQC3WcTDCx6HZ98zmYLp

## Acceptance criteria
- [ ] Without `content/studio.md`: no `/studio` page, no Studio nav item, no home Studio tile, build still passes
- [ ] With it: all of the above render, copy verbatim from the file
- [ ] One h1, semantic landmarks, visible focus states, contrast ≥4.5:1
- [ ] Reads well at 375px and 1440px with no horizontal scroll
- [ ] Zero client-side JS; `npm run build` passes with zero warnings; Lighthouse ≥95 on all four
