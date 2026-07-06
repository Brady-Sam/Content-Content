# Content Content — Claude Code context

This is the working site for Content Content, an independent content design practice run by Sam Brady. Based in Barcelona. Targeting early-stage B2B SaaS companies that have product and development in place but no content design function.

---

## Repo structure

```
site/
  index.html          # Homepage
  about/index.html    # About page
  work/index.html     # Work index
  work/training-ai    # Case study (bare file, no folder)
  work/shelter/       # Case study (folder with index.html)
  work/knowledge-hub/ # Case study (folder with index.html)
  work/benefits/      # Case study (folder with index.html)
  CC_favicon.svg
  README.md
  CLAUDE.md
```

Case studies use two conventions: bare files (`/work/training-ai`) and folders with `index.html` (`/work/shelter/`). Never add trailing slashes to bare file links. Check existing pages before creating new ones.

---

## Brand

### Colours

| Variable         | Hex       | Use                          |
|------------------|-----------|------------------------------|
| --bg             | #F5F2EC   | Page background              |
| --ink            | #1A1814   | Primary text, footer         |
| --ink-muted      | #6B6660   | Secondary text, captions     |
| --accent         | #A8401A   | Links, emphasis, data        |
| --accent-warm    | #C9532A   | Hovers, highlights           |
| --accent-light   | #F0E8E4   | Tag backgrounds, callouts    |
| --rule           | #D9D4CC   | Borders, dividers            |
| --white          | #FDFCFA   | Card backgrounds             |

### Fonts

- **Playfair Display** — headlines and case study titles only
- **DM Sans** (weight 300/400) — all body copy
- **DM Mono** (weight 300/400) — nav, labels, tags, stats, buttons, captions. Always uppercase and letter-spaced when used as a label.

### Layout

- Max container width: 1080px
- Generous section padding: 4 to 7rem between major sections
- Borders over shadows. Cards use `--rule` border, never drop shadows.
- Metrics always: large Playfair number + small DM Mono label beneath.

---

## Writing rules

These are non-negotiable and apply to all copy on the site:

- **Never use em dashes.** Anywhere. No exceptions.
- **UK English** throughout (colour, behaviour, organised, etc.)
- **No "we"** — first person singular only. "How I work", not "how we work."
- **No "users"** except in genuinely technical contexts. Say "employees", "people", "founders".
- **No three-part list rhythms** — "not just X, but Y and Z" is the clearest AI tell.
- **No staccato drama** — avoid several short fragments in a row for effect.
- **No importance-puffing openers** — nothing that inflates the significance before making the point.
- **No AI-sounding constructions** — run a Slop Mop pass on all copy before publishing.
- **No colons used as rhythmic pauses** — a colon should introduce content, not create drama.

---

## Case study conventions

- Structure: Situation, Task, Action (with h3 sub-sections), Result
- Metrics panel at the top: 2 or 3 stats max, Playfair number + DM Mono label
- Callout blocks for key insights: terracotta left border, accent-light background
- Before/after images go in the case study folder, named: `before-[descriptor].png` / `after-[descriptor].png`
- Footnotes for data caveats: DM Mono, small, honest
- Only use metrics that would hold up under interview scrutiny. Drop weak figures rather than spin them.
- Attribute in-house work accurately. Collaborative decisions are "working with the designer, I..." not solo claims.

---

## Practice positioning

- **Not** a freelancer or contractor. An independent practice.
- Target client: early-stage B2B SaaS with product and development in place, no content design function.
- Lead with symptoms founders recognise (conversion drop-off, onboarding confusion), not the content design label.
- Services: The Audit (fixed-scope diagnostic), The Fix (one critical journey), The Build (full content system).
- Site should read as an active practice, not an archived portfolio.

---

## Services in the nav

- Work (`/work/`)
- About (`/about/`)
- Contact (`#contact` anchor on homepage)

---

## Deployment

- Hosted on Cloudflare Pages
- Auto-deploys from GitHub repo: `Brady-Sam/Content-Content`
- Push to main branch triggers deploy. No build step needed.
- Cloudflare Web Analytics planned but not yet set up.

---

## Things to never do

- Never modify image files that are part of live case studies without Sam confirming
- Never add trailing slashes to links pointing at bare HTML files (e.g. `/work/training-ai` not `/work/training-ai/`)
- Never introduce a third accent colour without discussion
- Never use `we` in copy
- Never use em dashes
