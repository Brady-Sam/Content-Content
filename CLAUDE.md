# Content Content — Claude Code context

This is the working site for Content Content, an independent content design practice run by Sam Brady. Based in Barcelona. Targeting early-stage B2B SaaS companies that have product and development in place but no content design function.

---

## Repo structure

```
site/
  index.html            # Homepage
  404.html              # Site-wide not found
  services/index.html   # Services, incl. the Flow Review / Flow Rebuild steps
  case-studies/index.html          # Case studies index
  case-studies/benefits/           # Case study
  case-studies/knowledge-hub/      # Case study
  case-studies/shelter/            # Case study
  case-studies/training-ai/        # Case study
  field-notes/index.html
  about/index.html
  contact/index.html
  book/index.html       # Cal.com discovery-call embed
  brand/                # Favicons and logo PNGs
  README.md
  CLAUDE.md
  drafts/               # Internal, gitignored, never published
```

Every page and case study is a folder with an `index.html`, linked with a trailing slash (`/case-studies/shelter/`). Check existing pages before creating new ones and copy the nearest one's shell rather than rebuilding it.

Pages are self-contained: each carries its own `<style>` block, mosaic script and nav-toggle script. There is no shared stylesheet and no build step, so a change to a shared component has to be repeated in every page that uses it.

---

## Copy docs

`drafts/` is an Obsidian vault holding one markdown copy doc per page (`Contact.md`, `Homepage.md`, `Services.md`, `Book a call.md`, `Case studies/`). It is gitignored and never published.

**Any change to copy on a page must be made in that page's copy doc in the same pass.** The doc is the record of what the page says and why, so a page edited without it goes stale immediately and the reasoning behind a line is lost. This applies to headlines, ledes, body copy, button labels, form labels and microcopy. It does not apply to markup, styling or script changes that leave the words alone.

When copy is cut rather than changed, move it into a "Cut from the page" section in the doc with the reason, rather than deleting it. Cut copy gets reconsidered, and the reason it went is the useful part.

If a page has no copy doc yet, create one, following the structure of the nearest existing doc.

---

## Brand

**All visual tokens live in `DESIGN.md` at the repo parent, and that file is the only source of truth for them.** Do not duplicate colours, type scales, spacing or component markup into this file. If something here ever contradicts `DESIGN.md` on a visual question, `DESIGN.md` wins. On a copy or voice question, this file wins.

The short version, enough to spot when something is off brand:

- Anchors are Oxford Navy `#003262`, Air Force Blue `#46809B`, White Smoke `#F6F5F3`. Body text is Ink `#12222B`, links and CTAs are Coral `#B23A2E`.
- Type is Fugaz One (display only, one hero line per page), Work Sans (headings and body), Spectral (personal and long-form), IBM Plex Mono (labels, eyebrows, prices).
- Air Force Blue is never used for text under 24px, on any background. It fails AA. Use Muted slate `#46545C` for small labels.
- Max container 1080px, 24px gutters, single breakpoint at 768px.
- Borders over shadows, always.
- The mosaic strip appears exactly twice per page: the top edge of the first white section, and the top edge of the footer.

Section backgrounds follow a fixed rhythm, documented in `DESIGN.md` §8. The hero is always White Smoke and the section after it is always white with the mosaic strip.

---

## Writing rules

These are non-negotiable and apply to all copy on the site:

- **Never use em dashes.** Anywhere. No exceptions.
- **UK English** throughout (colour, behaviour, organised, etc.)
- **No "we" for the practice.** Content Content is one person. Anything Sam does is "I": "how I work", never "how we work". The practice never speaks as a team.
- **Collaborative "we" is allowed**, meaning Sam and the client together: "we'll work together to define the scope", "once we know what needs to change". This is the reading in use across the live site. If a "we" could be mistaken for a team, rewrite it as "I".
- **No "users"** except in genuinely technical contexts. Say "employees", "people", "founders".
- **No three-part list rhythms** — "not just X, but Y and Z" is the clearest AI tell.
- **No staccato drama** — avoid several short fragments in a row for effect.
- **No importance-puffing openers** — nothing that inflates the significance before making the point.
- **No AI-sounding constructions** — run a Slop Mop pass on all copy before publishing.
- **No colons used as rhythmic pauses** — a colon should introduce content, not create drama.

---

## Header punctuation

Three heading tiers, each with a fixed terminal-punctuation rule. Internal punctuation (commas, ampersands, colons) is always fine in any tier, this only governs the last character.

- **Hero headline** (Fugaz One, the page H1) — no terminal punctuation. Exception: the homepage headline, "Content, Designed."
- **Subheading** (Work Sans 600, Oxford Navy) — no terminal punctuation. Applies the same way whether it's acting as a hero line under the H1 or as a section label (e.g. "The symptoms", "The response"). Question marks are exempt where the heading is a genuine question, e.g. FAQ accordion summaries, the "?" is doing grammatical work, not decorating a fullstop.
- **Lead paragraph** (Work Sans 400, Ink) — ends in a full stop. Only appears when there's real sentence-like copy to add after the title and subheading, not every page needs one.

---

## Case study conventions

- Structure: Situation, Task, Action (with h3 sub-sections), Result
- Metrics panel at the top: 2 or 3 stats max, Fugaz One number + IBM Plex Mono label
- Callout blocks for key insights: use the callout family in `DESIGN.md` §6, pick the one whose job matches. Do not invent a fifth treatment.
- Before/after images go in the case study folder, named: `before-[descriptor].png` / `after-[descriptor].png`
- Footnotes for data caveats: IBM Plex Mono, small, honest
- Only use metrics that would hold up under interview scrutiny. Drop weak figures rather than spin them.
- **No approximation tildes on stats.** Write "55%", never "~55%". A figure either holds up stated plainly or it should not be published, and the tilde just advertises the doubt. Removed site-wide on 5 August 2026.
- Attribute in-house work accurately. Collaborative decisions are "working with the designer, I..." not solo claims.

---

## Practice positioning

- **Not** a freelancer or contractor. An independent practice.
- Target client: early-stage B2B SaaS with product and development in place, no content design function.
- Lead with symptoms founders recognise (conversion drop-off, onboarding confusion), not the content design label. "Content design" should not appear above the fold on any page.
- Site should read as an active practice, not an archived portfolio.

### The offer

Four things, sold as a sequence rather than a menu. Published prices are always "from", never a range.

| | Price | On the site |
|---|---|---|
| **Flow Review** | From €2,500, ten working days | `/services/` step 1, own page to come |
| **Flow Rebuild** | From €4,500, two to three weeks | `/services/` step 2, own page to come |
| **Embedded content design** | Day rate | Never published. Quoted when asked. |
| **Content System** | From €7,500, four weeks | Own page, not yet built |

Rules that shape the copy:

- **Never call these "packages".** They are a sequence, not a tiered menu, and "packages" reads as marketplace pricing. The services page calls the section "The steps".
- **Never publish the day rate**, and never state a day count for a fixed-price piece of work. Sell the deadline and the outcome, not the input. A published day rate caps every fixed price, because the client just divides.
- **Never state a count of anything.** No screens, fixes, words or pages. Scope by boundary, which is what stops the work being priced by units.
- Never build a three-column pricing layout. There is no middle option because there is no choice.
- The Content System is not referenced anywhere until its page exists.

---

## Nav

In order, on every page:

- Services (`/services/`)
- Field notes (`/field-notes/`)
- Case studies (`/case-studies/`)
- About (`/about/`)
- Contact (`/contact/`), styled as a coral outline button, not a plain link

The current page's link carries `aria-current="page"`. The 404 sets it on nothing.

---

## Deployment

- Auto-deploys from GitHub repo: `Brady-Sam/Content-Content`. Push to main triggers deploy. No build step.
- `_redirects` at the repo root 301s `/work/*` to `/case-studies/*`. The section was renamed on 5 August 2026 and the old URLs had been live and shared. Do not delete this file, and add to it rather than replacing it if another path moves.
- **HTML is cached at the Cloudflare edge and is not purged on deploy.** For several minutes after every push, requests return either the old or the new page depending on which edge node answers. Verify a deploy across a wide sample of requests, not one or two, or it will look live when it is not. A Cache Rule bypassing cache for `text/html` would fix this properly and has not been set up.
- The contact form posts to `/api/contact`, handled by a separate Worker that lives outside this repo (`../contact-worker`) so its source is never served publicly. The same Worker handles `/api/booking`, which receives the Cal.com webhook and emails a briefing on whoever booked.
- `/book/` embeds a Cal.com discovery call. The Cal.com account is registered as `hello@contentcontent.design` so the practice, not the personal Gmail, is what bookers see. The `calLink` is set once at the bottom of `book/index.html`.
- **Known limitation:** the Google Calendar invite shows the personal Gmail address in its organiser field. A free consumer Google account cannot present an alias, and Cal.com's setting to hide it is a paid feature. Only Google Workspace fixes this properly.
- `/book/` is deliberately not in the nav. The nav is fixed at five items; the service-page CTAs carry the booking link.
- Cloudflare Web Analytics planned but not yet set up.
- **Open issue:** `404.html` is deployed and reachable at `/404`, but missing routes return an empty-bodied 404 rather than serving it, so browsers show their own error page. Cause not yet identified, needs the Cloudflare dashboard. Check whether the site is served by Pages (check the build output directory) or by a Worker with static assets (needs `not_found_handling = "404-page"`).

---

## Things to never do

- Never modify image files that are part of live case studies without Sam confirming
- Never introduce a third accent colour without discussion
- Never use `we` in copy
- Never use em dashes
- Never phrase a header as a question
- Never call the offer "packages"
- Never publish the day rate, a day count, or a count of screens, fixes or pages
- Never duplicate visual tokens from `DESIGN.md` into this file
- Never change copy on a page without updating that page's copy doc in `drafts/` in the same pass
