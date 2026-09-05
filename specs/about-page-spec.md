# Spec: About page (`/about`)

## Goal
The engineer → PM story in Kiel's own words, for someone who liked the home page and wants more.

## Content
- h1: "About"
- Body from `content/about.md`, rendered as plain paragraphs. No headings inside the body unless present in the file.
- Closing line with LinkedIn + email links.

## Style
Same layout and typography as home. Same nav and footer via `Base.astro`.

## Acceptance criteria
- [ ] Shares layout with home, zero duplicated nav/footer markup
- [ ] Reads well at 375px
- [ ] Copy verbatim from `content/about.md`
