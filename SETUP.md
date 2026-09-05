# Saturday setup — read this first

You do NOT create these files inside Claude Code. This folder IS your project. Claude Code scaffolds Astro *into* it and reads `CLAUDE.md`, `specs/`, `content/`.

## 0. One-time installs (do Friday night or 07:45)
- Node 20+: https://nodejs.org (check: `node -v`)
- Git: `git -v` — if missing, https://git-scm.com
- GitHub account, Vercel account (sign up with GitHub — makes step 5 one click)
- Claude Code: `npm install -g @anthropic-ai/claude-code` then `claude` once to log in

## 1. Put the folder in place
Unzip so you have a folder named `kiel-site`. Move it somewhere sane, e.g. `~/projects/kiel-site`.

## 2. Edit the content files (08:00–08:45)
- `content/positioning.md` — real LinkedIn URL and email
- `content/case-study-claims-api.md` — fill the Outcome line with something true
- `content/about.md` — rewrite in your voice
Everything else is ready.

## 3. Git — make it a repo (5 min)
```
cd ~/projects/kiel-site
git init
git add .
git commit -m "chore: project skeleton, specs and content"
```
Then on GitHub: New repository → name `kiel-site` → Public → **do not** tick README/.gitignore → Create.
Copy the two lines GitHub shows under "push an existing repository":
```
git remote add origin https://github.com/YOUR-USER/kiel-site.git
git branch -M main
git push -u origin main
```
First push may open a browser to authenticate. That's normal.

## 4. Claude Code — scaffold and build (08:45–10:45)
```
cd ~/projects/kiel-site
claude
```
Then, in order:

**Prompt 1**
> Read CLAUDE.md, specs/, and content/. Then scaffold an Astro project into this directory using `npm create astro@latest . -- --template minimal --no-install --no-git --typescript strict`, keep my existing files, and run `npm install`. Don't build any pages yet.

(Claude Code will ask permission for the shell commands — approve them. Watch what it does; this is your Claude Code lesson.)

**Prompt 2**
> Create src/layouts/Base.astro and src/styles/global.css according to specs/home-page-spec.md layout and style sections. Summarize your plan in 3 lines first.

**Prompt 3**
> Build src/pages/index.astro to specs/home-page-spec.md. Pull all copy verbatim from content/. Check every acceptance criterion and tell me which ones you verified.

**Prompt 4**
> Build src/pages/about.astro to specs/about-page-spec.md.

**Prompt 5** — your custom command
> /review-copy

**Prompt 6**
> Run npm run dev and tell me the URL.
Open localhost:4321 on your laptop AND your phone (same wifi: use your laptop's local IP:4321). Fix what's ugly with short, specific prompts.

**Prompt 7** — your other custom command
> /ship
Approve the commit message. It builds, commits, pushes.

Deliberately reject one proposed edit during the morning so you see how correction works. Note where your spec was ambiguous — that's the real lesson.

## 5. Vercel — deploy (10:45–11:15)
1. vercel.com → Add New → Project → Import `kiel-site` from GitHub.
2. Vercel auto-detects Astro. Change nothing. Deploy.
3. ~60 seconds later you get `kiel-site-xxx.vercel.app`. Open it on your phone.
4. From now on every `git push` to `main` redeploys automatically. That's the whole workflow.
5. Custom domain: later. Not today.

## 6. Make it count (11:15–12:00)
- LinkedIn headline = your positioning line. Add the site URL to Contact info.
- One post: what you learned specifying work for Claude Code vs. for an engineer. 3 honest observations. Link the site.
- Write down 3 things Claude Code did that surprised you → next Saturday's list.

## If something breaks
- `npm run build` fails → paste the error into Claude Code, say "fix this, explain what was wrong".
- Push rejected → `git pull --rebase origin main` then push again.
- Vercel build fails → Vercel shows the log; paste it into Claude Code.
- Claude Code wanders off-spec → "Stop. Re-read specs/home-page-spec.md and tell me where you deviated."
