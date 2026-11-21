# Spec: Work pages (`/work` and `/work/[slug]`)

Approved design: `docs/designs/portfolio-agent-studio.md` (approved 2026-11-21).

## Goal
Show Marlon's work to a small B2B founder: the sanitised case study and the agents he has built. Adding a new item takes one markdown file and no code change.

## Content

### Work items: `content/work/*.md`
- One file per item, loaded as the `work` content collection (`src/content.config.ts`, `glob` loader on `content/work`).
- The slug is the filename: `content/work/claims-api-integration.md` → `/work/claims-api-integration`.
- Frontmatter, validated per entry:
  - `title`: string, required. The only title source; the body has no `# ` line.
  - `kind`: `case-study` or `agent`, required.
  - `problem`: short buyer-problem label, required.
  - `summary`: one sentence, required. Shown on the index tile and used as the item page's meta description.
  - `featured`: boolean, default `false`.
  - `order`: number, required.
- Body sections are `## ` headings with these exact names:
  - case study: `Problem`, `What I did`, `Outcome`
  - agent: `What it does`, `Input`, `Output`, `Before and after`
- HTML comments in the body are allowed and stripped.

### Work index copy: `content/work-index.md`
- `# ` line: the h1. Required.
- `## Meta description`: at most 155 characters. Required.
- `## Intro`: optional, one or two sentences above the list.

### Section text format
Section bodies in `content/work/`, `content/work-index.md` and `content/studio.md` are plain paragraphs separated by blank lines. No lists, links or emphasis inside sections; steps are written one per paragraph.

## Build checks
All checks throw during `npm run build`, so a bad file fails the build instead of rendering a broken page.
- `src/lib/text.ts` holds the shared markdown helpers and `validateSections()`. It is used by `src/lib/work.ts`, the work-index reader and `src/lib/studio.ts`, and fails on:
  - a section line starting with `- `, `* `, or a number followed by `. `;
  - a section containing `](`;
  - a missing required section;
  - a `## Meta description` longer than 155 characters.
- `src/lib/work.ts` reads the collection through `getCollection("work")` and fails when:
  - no item, or more than one, has `featured: true`;
  - the featured item is not `kind: case-study` (the home tile renders the case-study sections only);
  - a body contains a `# ` line;
  - a required body section for the item's kind is missing or misnamed.
- Every page reads work items through `src/lib/work.ts`, never `getCollection` directly.

## Pages

### `/work`
- h1 from `content/work-index.md`; `<title>` is `${h1} — ${shortName}`; meta description from `## Meta description`.
- Optional intro under the h1, in the same hero tile.
- A flat list of tiles, ordered by ascending `order`, ties broken by `title`. Each tile shows the `kind` tag, the `problem` label, the `title` linked to its page, and the `summary`.
- One column on mobile, two columns from 52em.
- Grouping by `problem` is deferred until there are at least five items.

### `/work/[slug]`
- One prose tile (`.tile.tile-prose`, as on About).
- A back link "All work" to `/work`, then the h1 from `title`, then the `kind` tag and `problem` label.
- Each body section renders as an h2 with its paragraphs below.
- `<title>` is `${title} — ${shortName}`; meta description is `summary`.

### Navigation
- The Work nav item is added together with `/work` (build step 3), after the step-2 check that home is unchanged.
- It carries `aria-current="page"` on `/work` and on every `/work/*` page.

## Sanitisation gate
A manual review by Marlon before any `content/work/` file or `content/work-index.md` merges. No tool automates it; the review-copy command only confirms rendered copy matches `content/`.
- [ ] No employer name, partner names, internal system or tool names
- [ ] No numbers that cannot be defended outside the employer
- [ ] No screenshots, data samples or field names from employer systems
- [ ] The item makes sense to a reader who has never seen the employer's tools

## Style
Same layout, tokens and typography as home (see home spec, "Design direction"). Same nav and footer via `Base.astro`. Mockup: https://claude.ai/artifact/RZsQC3WcTDCx6HZ98zmYLp

## Acceptance criteria
- [ ] Adding a work item needs one markdown file and no code change
- [ ] Every rule under "Build checks" fails the build when broken
- [ ] One h1 per page, semantic landmarks, visible focus states, contrast ≥4.5:1
- [ ] Reads well at 375px and 1440px with no horizontal scroll
- [ ] Zero client-side JS
- [ ] `npm run build` passes with zero warnings
- [ ] Lighthouse ≥95 on all four
- [ ] All copy comes verbatim from `content/` (labels and link text excepted)
