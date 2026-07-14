# Content Content — Claude Code context

Last updated: 2026-07-14 — added the deployment note that the repo is served publicly and that `dafts/` and `.DS_Store` are gitignored.

This is the working site for Content Content, an independent content design practice run by Sam Brady. Based in Barcelona. Primarily targeting early-stage B2B SaaS startups that have product and development in place but no content design function, not exclusively.

**Design system:** All visual tokens, spacing, typography, and component patterns live in `DESIGN.md`, not here. Always check it before writing or editing any CSS. If a visual rule here ever conflicts with `DESIGN.md`, `DESIGN.md` wins for anything visual, this file wins for anything about copy, voice, or positioning.

---

## Repo structure

```
site/
  index.html                        # Homepage
  services/index.html               # Services + Packages (anchor-linked)
  services/[package]/index.html     # One sub-page per package, e.g. audit/, sprint/ (slugs TBC)
  field-notes/index.html            # Field Notes index
  field-notes/[article]/index.html  # Individual articles, folders only
  work/index.html                   # Work index
  work/[case-study]/index.html      # Case studies, folders only, no bare files
  about/index.html                  # About
  contact/index.html                # Contact, its own page
  DESIGN.md
  CLAUDE.md
  CC_favicon.svg
  README.md
```

Folders-only convention applies to Work and Field Notes so images, illustrations, or video can sit alongside content without retrofitting later.

---

## Writing rules

Non-negotiable, applies to all copy on the site:

- Never use em dashes. Anywhere. No exceptions.
- UK English throughout (colour, behaviour, organised, etc.)
- First person singular only. "How I work", not "how we work."
- Prefer "people" over "user". Use "user" when "people" would read oddly, or in genuinely technical contexts, not as a reflex to avoid the word. Clarity comes before the substitution, don't force "people" into a sentence it damages.
- No three-part list rhythms as default (intentional use is acceptable).
- No staccato drama, no importance-puffing openers, no AI-sounding constructions.
- Ampersand only in short functional/label contexts for established pairs (nav, tags, package names, section headers, e.g. "Voice & Tone"). Always spell out "and" in sentence-level body copy.
- Site page headers must never be phrased as questions (Field Notes articles are the only exception).
- No invented content. No placeholder stats, sample quotes, or fake case studies. Leave a block visibly empty rather than filling it.
- Copy is final once supplied. Never rewrite, rephrase, shorten, or add to it without being asked.

Copy review rule: when reviewing Sam's own drafts, only flag actual typos and grammatical errors. Do not alter stylistic choices, brackets, ellipses, deliberate fragments, and intentional rule-of-three constructions are his to own.

### First-draft discipline

Avoid these from the start, don't rely on a cleanup pass to catch them:

- No sycophantic or hollow openers ("Great question!", "In today's fast-paced world…")
- No fake-candid hooks used as standalone openers ("Honestly?", "Look,", "Here's the thing,")
- No persuasive-authority framing ("At its core,", "The real question is,", "Fundamentally,")
- "Quiet" as a descriptor (quiet confidence, quiet power) is an AI tic, justify it or cut it
- No copula avoidance, use "is" and "has", not "serves as", "stands as", "boasts"
- No importance-puffing ("marks a pivotal moment", "represents a significant shift")
- No aphorism formulas ("X is the Y of Z", "X becomes a trap")
- No fake example names or unsourced stats
- Vary sentence length and structure, uniform rhythm and repeated sentence openings both read as AI
- No chatbot bleed ("I hope this helps!", "Let me know if you'd like me to expand")

---

## Writing principles

- Calm. No hype, no urgency it doesn't need.
- Quietly confident. State the result, don't sell it.
- Dry wit. Understated, used sparingly, never forced.
- No performed authority. Explain, don't posture.
- Direct, not blunt. Say the point plainly, keep the edges civil.
- If it can be cut, cut it.
- Sound like a person would say it, not like copy.

### Vocabulary

| Use | Avoid |
|---|---|
| Content design, content systems | "Wordsmithing," "copy magic" |
| Practice | Agency, freelancer (when describing Content Content itself) |
| Client, founder, team, people | "Users" (except technical contexts, see writing rules) |
| Flow, journey, screen | "Touchpoint," "ecosystem," "synergy" |
| Findings, recommendations | "Insights" used as filler |
| Fixed, designed, built | "Optimised," "leveraged," "elevated" |

---

## Practice positioning

- Not a freelancer or contractor. An independent practice, structured like a small agency: a productized offering alongside custom-scoped work.
- Target client: primarily early-stage B2B SaaS startups that have product and development in place, but no content design function. Not exclusive, other company stages or types can be a fit if the same gap exists.
- The practice exists to bring the value of content design to businesses that don't yet know it's a gap for them. Many prospective clients aren't thinking about their content at all, some education is part of the job, not a detour from it. Position the work as a difference-maker that moves them closer to their actual goals (conversion, activation, retention), not as a nice-to-have discipline.
- "Content design" is the umbrella term for everything Content Content delivers: content strategy, discovery and research, UX writing, content systems, AI content systems, and anything else that falls under making a product's words work. Don't fragment these into separate unrelated services on the site, they're facets of one practice.
- The practice runs itself the same way content design work runs: start with what the audience needs to know, not what Sam wants to say. This applies to the site itself and to how client engagements are approached.
- Education about content design comes after the hook, not instead of it. Lead with a symptom the founder already recognises, then explain the underlying content design problem once they're engaged, not before.
- Internally, "CC" and "Con Con" are shorthand for Content Content. Internal use only, not for public-facing copy unless a deliberate decision is made to use them externally.
- Two equal entry routes, neither is the priority:
  1. **Packages** (Audit and/or Sprint, exact scope and pricing TBD). Structured, path-of-least-resistance offerings designed to get a client in the door and buying something.
  2. **Day-rate contract work.** Custom-scoped, flexible. Shape depends entirely on the client, could be a short fix, could extend into a longer embedded engagement working alongside their designers or developers. Scoped once the actual problem is understood, not templated upfront.
- Lead with symptoms founders recognise (conversion drop-off, onboarding confusion, unclear product copy), not the content design label. Let results make the argument.
- Site should read as an active practice, not an archived portfolio. No CV downloads, no "open to full-time roles" language, no job-seeking signals anywhere.
- Early-stage is positioned as the best time for content design, not a limitation. This is a core argument the practice makes, not just an article topic.

---

## Case study conventions

- Location: `work/[case-study]/index.html`, folders only (see repo structure).
- Structure: Title, bridge sentence, Impact at a glance (stats), problem paragraph, action paragraph, impact chain paragraph, closer, CTA. Full detail and reasoning per section in `../templates/case-study-template.md`.
- Audience is a founder deciding whether to hire, not a hiring manager evaluating process. No Situation/Task/Action/Result headers, no sub-headed process steps, no callout boxes, no charts.
- Title states the outcome, not the process. Pattern: "Turning [starting state] into [improved state]."
- Bridge sentence orients the reader before the stats, one line, no cleverness, doesn't restate the title.
- Impact at a glance: 2-3 real, verifiable metrics. Drop a weak metric rather than dressing it up.
- Problem paragraph should echo the kind of problem language used elsewhere on the site (recognisable founder-level symptoms), not internal project jargon.
- Impact chain paragraph is mandatory, never optional. Connects the fix to a business-level outcome (time saved, trust built, escalations avoided), not just the content-level stat. This is usually the section most worth rewriting if a case study feels flat.
- Closer gestures at relevance to the reader's own situation without stating it outright, and must not double as a CTA. Never generalises into a tidy universal lesson.
- CTA is standard across every case study: "Get in touch to talk about your product." Not tailored per page, deliberately, to avoid a salesy feel.
- Images and other visuals remain valid where the case study calls for them, not mandatory, not prohibited. Judged per case study. Assets live in the case study's own folder alongside index.html.
- Attribute collaborative work honestly: "working with the designer, I..." not a solo claim.
- Anonymise the client/company unless there's a clear reason not to.
- Work landing page cards show: tags, title, bridge sentence (reused from the case study), and one stat only.

---

## Accessibility

- Semantic HTML first: correct heading hierarchy (one h1 per page, no skipped levels), landmark elements (nav, main, footer), not div soup with ARIA bolted on.
- Every image needs real alt text describing content and function, not filenames or "image of...". Decorative images get empty alt="".
- Skip-to-content link on every page.
- Colour and contrast rules live in DESIGN.md, not duplicated here. Never rely on colour alone to convey meaning (status, state, required fields).
- All interactive elements keyboard-navigable with visible focus states (focus ring spec in DESIGN.md).
- Link text describes the destination on its own ("Read the Benefits case study", not "Click here" or bare "Read more →" without surrounding context that makes it findable when skimmed out of context).
- Form fields (contact, future gated content) always have visible, associated labels, not placeholder-only.

---

## SEO

- Unique, specific `<title>` and meta description per page, description written for a human, not keyword-stuffed.
- One clear heading hierarchy per page, headings describe content, not phrased as generic labels.
- Internal linking between related pages (case study to services, Field Notes article to relevant package) rather than orphaned pages.
- Descriptive URL slugs, no query strings or ID-based paths for content pages.
- Field Notes articles: rank-and-be-found approach, non-clickbait titles preferred. Primary hosting on contentcontent.design, Medium as syndication only.
- Alt text doubles as an SEO signal, another reason it needs to be real and specific, not decorative filler.

---

## Deployment

- Hosted on Cloudflare Pages.
- Auto-deploys from GitHub repo: `Brady-Sam/Content-Content`.
- Push to main branch triggers deploy. No build step needed.
- The whole repo is served publicly by Cloudflare Pages, so anything committed is reachable by URL (e.g. `/DESIGN.md`, `/dafts/…`). Keep internal drafts and working docs out of commits. `dafts/` (internal drafts) and `.DS_Store` are gitignored for this reason.
- Cloudflare Web Analytics is set up and running (basic tracking). UTM conventions and event tracking are still to come, hold off implementing anything more advanced until the rebuilt site structure has stabilised (per existing principle: analytics infrastructure should match the thing it's measuring).
- Local workflow: Claude Code handles file operations directly against the local repo, then a normal git push to the GitHub remote triggers the Cloudflare deploy. This file (`CLAUDE.md`) and `DESIGN.md` are the source of truth, changes made in Claude.ai chat aren't live until manually synced into the repo.

---

## Things to never do

- Never use "we". First person singular only.
- Never use em dashes.
- Never introduce a third accent colour without discussion.
- Never modify image files that are part of live case studies without Sam confirming.
- Never regenerate or reinterpret the mosaic motif, palette, or type pairing, they're locked in DESIGN.md.
- Never invent placeholder content, stats, quotes, or case studies. Leave a block visibly empty instead.
- Never lead a page with the content design label before a recognisable founder symptom.
- Never treat Claude-drafted copy as final. Sam reviews and approves before anything publishes.
- Never assume a change made in Claude.ai chat is live. `CLAUDE.md` and `DESIGN.md` in the repo are the only source of truth, sync deliberately, don't let chat and repo drift.
