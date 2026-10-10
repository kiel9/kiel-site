# Spec: About page (`/about`)

## Goal
The engineer → PM story in Marlon's own words, for someone who liked the home page and wants more.

## Content
- h1: "About"
- Body from `content/about.md`, rendered as plain paragraphs inside one prose tile (`.tile.tile-prose`, max-width 800px). No headings inside the body unless present in the file.
- Closing line with LinkedIn + email links (the last paragraph's "LinkedIn" and "email" words are linked in place).

## Style
Same layout, tokens and typography as home (see home spec, "Design direction"). Same nav and footer via `Base.astro`.

## Acceptance criteria
- [ ] Shares layout with home, zero duplicated nav/footer markup
- [ ] Reads well at 375px
- [ ] Copy verbatim from `content/about.md`
