# Content Content — Design System

Visual and technical reference only. Copy, voice, positioning, and content rules live in `CLAUDE.md`, not here, don't duplicate them into this file.

Status: fully locked. Do not regenerate or reinterpret anything below.

Last updated: 2026-07-15. Retired coral-fill callouts (they read as error states); the Principle callout and Standard note now use a white card with an Air Force Blue left edge.

---

## Resolved decisions (confirmed)

1. **Eyebrow / label colour.** Coral or Muted slate only for label text under 24px. Air Force Blue reserved for 24px+ text, fills, structure, and focus rings.
2. **Footer meta line colour.** Uses `#8FB0C1` (light-navy tint, already defined for the mosaic palette), 5.6:1 on Oxford Navy, clears AA. Keeps the cool-blue family feel without introducing a new token.
3. **Responsive scaling.** Hero headline: `clamp(2.5rem, 8vw, 6.5rem)`. Single breakpoint at 768px. Standard sections drop to ~48-56px vertical padding below it.
4. **Wordmark colour.** The nav wordmark is two-tone: "Content" in Oxford Navy `#003262`, "Content" in Air Force Blue `#46809B`, the two swapping on hover. This is the one sanctioned use of Air Force Blue for text under 24px — permitted because a wordmark is a logotype, which WCAG exempts from contrast requirements. It does not loosen decision 1 for any other label text.

---

## 1. Colour

### Anchors
| Token | Hex | Role |
|---|---|---|
| Oxford Navy | `#003262` | Headlines, wordmark, dark section backgrounds, structure |
| Air Force Blue | `#46809B` | Large text (24px+) and structural fills/focus rings only, never text under 24px |
| White Smoke | `#F6F5F3` | Page background, surface base |

### Derived
| Token | Hex | Role |
|---|---|---|
| Ink | `#12222B` | Body text |
| Coral | `#B23A2E` | Links, CTAs, hover accents, the single mosaic spark |
| Coral hover | `#8F2E24` | Hover/darken state for coral |
| Blue tint | `#E4ECF0` | Tags, neutral callouts |
| Coral tint | `#FBE6E0` | Accent fill (retired for callouts, see Callout family) |
| Coral tint border | `#F0CFC6` | Border for coral-tint blocks (retired for callouts, see Callout family) |
| Blue tint border | `#C9E4DF` | Reserved border for teal/tint blocks |
| Border grey | `#D3D9DD` | Dividers, hairlines, card borders (decorative) |
| Muted slate | `#46545C` | Secondary text, metadata, mono labels, 7.2:1 on White Smoke, safe for small text |
| Footer rule | `#2A527A` | Hairline on navy backgrounds |
| Grout grey | `#AFB0A9` | Gap colour behind mosaic tiles |
| Card white | `#FFFFFF` | Raised surfaces over White Smoke |
| Canvas grey | `#EEEDEA` | Working/canvas background, not for live pages |
| Light-navy tint | `#8FB0C1` | Mosaic palette only, plus footer meta line text (5.6:1 on Oxford Navy) |

### Contrast (WCAG, independently verified)
- Ink on White Smoke: 14.9:1
- Coral text on White Smoke: 5.4:1 · Coral fill with white text: 5.9:1
- Muted slate on White Smoke: 7.2:1
- Ink on Blue tint: 13.6:1 · Ink on Coral tint: 13.6:1
- Air Force Blue on White Smoke: 4.0:1, fails AA for text under 24px. Fine for large text, fills, structure, and focus rings (non-text only needs 3:1).
- Air Force Blue on Oxford Navy: 2.95:1, fails AA at any text size. Do not use for text on navy.
- White Smoke on Oxford Navy: 11.8:1

Rule of thumb: small text and unsure, use Ink, Oxford Navy, Coral, or Muted slate. Never Air Force Blue for text under 24px, on any background.

---

## 2. Typography

### Families (Google Fonts)
```
Fugaz One      — display only
Work Sans      — UI + most headings + body (400, 500, 600, italic)
Spectral       — long-form / personal serif body (400, 500, 600, italic)
IBM Plex Mono  — labels, metadata, eyebrows, tags (400, 500)
```
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fugaz+One&family=Work+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Spectral:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Roles and sizes
| Use | Family | Size / weight / line-height | Colour |
|---|---|---|---|
| Hero headline | Fugaz One 400 | `clamp(2.5rem, 8vw, 6.5rem)` (104px desktop) / 0.95 | Oxford Navy |
| Wordmark (nav) | Fugaz One 400 | 22px / 1 | Two-tone Oxford Navy + Air Force Blue, swap on hover (see decision 4) |
| Big footer line | Fugaz One 400 | 44px / 1.05 | White Smoke |
| Big stat numbers | Fugaz One 400 | 52px / 1 | Navy or Coral |
| Section heading | Work Sans 600 | 38px / 1.1 | Oxford Navy |
| Sub-heading | Work Sans 600 | 24px / 1.2 | Oxford Navy |
| Lead paragraph | Work Sans 400 | 20-22px / 1.45-1.55 | Ink |
| Body (locked default) | Work Sans 400 | 16px / 1.6 | Ink |
| Secondary/muted body | Work Sans 400 | 16px / 1.65 | Muted slate |
| Personal note body | Spectral 400 | 19px / 1.6 | Ink |
| Eyebrow / label | IBM Plex Mono 400-500 | 11-13px / letter-spacing 0.08-0.12em / UPPERCASE | Coral or Muted slate only, see Open decisions |
| Nav link | Work Sans 500 | 15px | Ink |

Fugaz One discipline: wordmark, one hero line per page, big stat numbers only. Never section headings, never body.

---

## 3. Spacing scale

Base unit 4px. Values in active use:
```
2, 4, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 32, 36, 40, 44, 56, 72, 80, 88, 96, 104
```
- Page gutter: `padding: … 24px` with `max-width: 1080px; margin: 0 auto`
- Section vertical padding: 72-104px desktop (hero 96-104, standard 80-96, compact 72), reduce below 768px, see Open decisions
- Card / block inner padding: 28-40px
- Grid gap, label/body columns: 56px
- Gap between stacked elements: 16-32px
- Border radius: 6px (buttons), 8-12px (cards/blocks), 20px (pills), 50% (avatar)

---

## 4. Global CSS

```css
*{box-sizing:border-box;}
body{margin:0;}
::selection{background:#B23A2E;color:#F6F5F3;}
a{color:#B23A2E;text-decoration:underline;text-underline-offset:2px;}
a:hover{color:#8F2E24;}
```
Page shell:
```css
background:#F6F5F3;
color:#12222B;
font-family:'Work Sans',system-ui,sans-serif;
font-size:16px;
line-height:1.6;
-webkit-font-smoothing:antialiased;
```
(Shell default set to 16px directly, matching the locked body size, rather than 17px with per-block overrides.)

---

## 5. The mosaic strip (locked component)

Trencadís-inspired, generated from a fixed seed. The strip runs the full width of the edge it sits on: the count is derived from the viewport, filling past the edge (with `overflow:hidden` clipping the remainder) and topping up on resize, so it never runs short. Distinct placements may use distinct seeds so they read as different tile segments — the homepage uses one seed for the services-section strip and another for the footer. Every generated strip still obeys the rules below (one coral, muted cool palette).

Rules:
- Fixed 8px tall, runs along a single edge only, never fills a background area
- 20px tile columns, 1.5px grout gap in Grout grey `#AFB0A9`
- Muted cool palette, exactly one coral tile per strip (per placement/seed)
- Tiles never resize, width clips to whatever edge it runs along
- No room for the strip at a given placement: skip the motif, don't shrink it to fit

Markup:
```html
<div style="display:grid;grid-auto-flow:column;grid-auto-columns:20px;gap:1.5px;background:#AFB0A9;height:8px;overflow:hidden;">
  <sc-for list="{{ strip }}" as="t" hint-placeholder-count="30"><div style="background:{{ t.bg }};clip-path:{{ t.clip }};"></div></sc-for>
</div>
```

Generator (build once per session, cache, reuse):
```js
buildStrip() {
  if (this._strip) return this._strip;
  let s = 20260713;
  const rnd = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
  const clamp = (v) => Math.min(100, Math.max(0, Math.round(v)));
  const jx = (b, a) => clamp(b + (rnd() * 2 - 1) * a);
  const clip = () => {
    let pts = [
      [jx(2, 15), jx(4, 15)], [jx(98, 15), jx(3, 13)],
      [jx(97, 13), jx(98, 15)], [jx(3, 15), jx(97, 15)]
    ];
    if (rnd() > 0.45) {
      const idx = Math.floor(rnd() * 4);
      const a = pts[idx], b = pts[(idx + 1) % 4];
      const mid = [clamp((a[0]+b[0])/2 + (rnd()*2-1)*13), clamp((a[1]+b[1])/2 + (rnd()*2-1)*13)];
      pts.splice(idx + 1, 0, mid);
    }
    return 'polygon(' + pts.map(p => p[0]+'% '+p[1]+'%').join(',') + ')';
  };
  const base = ['#003262','#003262','#003262','#46809B','#46809B','#E4ECF0','#F6F5F3','#12222B','#8FB0C1'];
  const tiles = [];
  for (let i = 0; i < 60; i++) tiles.push({ bg: base[Math.floor(rnd()*base.length)], clip: clip() });
  const coralIdx = 5 + Math.floor(rnd() * 4);
  tiles[coralIdx] = { bg: '#B23A2E', clip: clip() };
  this._strip = tiles;
  return this._strip;
}
```
The reference generator loops a fixed `60` tiles; the production build instead derives the tile count from the viewport width (fill the edge, top up on resize) and keeps the single coral placed within the strip. Same algorithm, count is the only difference.

`#8FB0C1` is a light-navy tint. Used inside the mosaic palette and as the footer meta line colour, not for general use elsewhere.

---

## 6. Components

Interactive components carry their base and `:hover`/`:focus` styles in CSS classes, never inline `style` attributes — an inline style overrides a class-level `:hover` and silently disables the hover/focus state.

### CTA button (primary)
```html
<a href="#" style="display:inline-block;background:#B23A2E;color:#F6F5F3;font-family:'Work Sans',sans-serif;font-weight:600;font-size:16px;text-decoration:none;padding:13px 26px;border-radius:6px;" style-hover="background:#8F2E24;">Label</a>
```
Hero size: `font-size:17px; padding:15px 32px`. Focus ring: `outline:3px solid #46809B; outline-offset:2px`.

### Secondary / outline button
```html
<a href="#" style="border:1.5px solid #003262;color:#003262;font-family:'Work Sans',sans-serif;font-weight:600;font-size:15px;padding:11px 20px;border-radius:6px;text-decoration:none;">Label</a>
```
Nav Contact variant: coral border + `style-hover="background:#B23A2E;color:#F6F5F3;"`.

### Inline link
Coral, underlined, `text-underline-offset:2px`, hover `#8F2E24`. Set globally in the CSS above.

### Section pattern (label + body two-column)
```html
<section style="max-width:1080px;margin:0 auto;padding:88px 24px 96px;">
  <div style="display:grid;grid-template-columns:0.85fr 1.15fr;gap:56px;align-items:start;">
    <div>
      <div style="font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#B23A2E;margin-bottom:16px;">01 · Label</div>
      <h2 style="font-family:'Work Sans',sans-serif;font-weight:600;font-size:38px;line-height:1.1;margin:0;color:#003262;">Heading</h2>
    </div>
    <div>
      <p style="margin:0 0 32px;font-size:20px;line-height:1.55;color:#12222B;max-width:560px;">Lead paragraph.</p>
      <!-- CTA -->
    </div>
  </div>
</section>
```
White section variant: `background:#FFFFFF;border-top:1px solid #D3D9DD;border-bottom:1px solid #D3D9DD;` with the mosaic strip as the top edge.

### Callout family

Four distinct treatments, each doing a different job. Don't substitute one for another, the visual difference is what signals the job to the reader.

| Type | Job | Where it's used |
|---|---|---|
| Personal callout | First-person text in Sam's own voice | About page, homepage about strip, note-from-AI section |
| Principle callout | A single, punchy standalone insight | Case study pull-outs, a claim worth pausing on |
| Standard note | General tip or aside, not persuasive, not personal | FAQ asides, in-page tips |
| Neutral note | Informational, explicitly not trying to persuade | Caveats, disclaimers, process notes |

Callout fills never use coral: a coral/red fill reads as an error or alert state at a glance. Coral stays for links, CTAs, the mosaic spark, and the personal callout's thin rule, but never as a callout background. The Principle callout and Standard note use a white card with an Air Force Blue left edge; the Neutral note uses the blue tint.

**Personal callout**
For first-person text written by Sam, not the practice voice. Lower visual priority than primary sections. Spectral serif and the coral rule are the signature, this is what makes it read as a person speaking rather than the practice.
```html
<div style="max-width:680px;">
  <div style="width:32px;height:2px;background:#B23A2E;margin-bottom:22px;"></div>
  <!-- optional heading -->
  <h2 style="font-family:'Work Sans',sans-serif;font-weight:600;font-size:24px;line-height:1.2;margin:0 0 20px;color:#003262;">Heading</h2>
  <p style="margin:0;font-family:'Spectral',serif;font-size:19px;line-height:1.6;color:#12222B;">Body.</p>
  <!-- optional byline -->
  <div style="font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#46545C;margin-top:24px;">Sam · Founder</div>
</div>
```
Props: `heading` (optional), `body`, `byline` (optional). Multiple paragraphs allowed for longer notes.

**Principle callout**
White card with an Air Force Blue left edge, larger Work Sans (19px), used sparingly for one standalone insight, not general commentary.
```html
<div style="background:#FFFFFF;border:1px solid #D3D9DD;border-left:4px solid #46809B;border-radius:10px;padding:28px;">
  <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#46545C;margin-bottom:14px;">Principle</div>
  <p style="font-family:'Work Sans',sans-serif;font-size:19px;line-height:1.45;color:#12222B;margin:0;">Text.</p>
</div>
```

**Standard note**
White card with an Air Force Blue left edge, body-size Work Sans (16px), mono kicker. The default for a general aside that isn't personal and isn't a headline insight.
```html
<div style="background:#FFFFFF;border:1px solid #D3D9DD;border-left:4px solid #46809B;border-radius:10px;padding:24px 26px;">
  <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#46545C;margin-bottom:14px;">Kicker label</div>
  <p style="margin:0;font-family:'Work Sans',sans-serif;font-size:16px;line-height:1.65;color:#12222B;">Body.</p>
</div>
```

**Neutral note**
Blue tint, smaller Work Sans (15px), Muted slate kicker (not Air Force Blue, same accessibility fix as the eyebrow rule above). For information that isn't trying to persuade.
```html
<div style="background:#E4ECF0;border:1px solid #D3D9DD;border-radius:10px;padding:22px 24px;">
  <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#46545C;margin-bottom:10px;">Neutral note</div>
  <p style="font-size:15px;line-height:1.5;color:#12222B;margin:0;">Text.</p>
</div>
```

### Tags / pills
```html
<span style="font-family:'Work Sans',sans-serif;font-weight:500;font-size:14px;color:#12222B;background:#E4ECF0;padding:6px 14px;border-radius:20px;">Neutral tag</span>
<span style="font-family:'Work Sans',sans-serif;font-weight:600;font-size:14px;color:#B23A2E;background:#FBE6E0;padding:6px 14px;border-radius:20px;">Accent tag</span>
<span style="font-family:'IBM Plex Mono',monospace;font-size:12px;color:#F6F5F3;background:#003262;padding:6px 14px;border-radius:20px;">STATUS · LIVE</span>
<span style="font-family:'Work Sans',sans-serif;font-weight:500;font-size:14px;color:#003262;background:transparent;padding:6px 14px;border-radius:20px;border:1px solid #D3D9DD;">Outline</span>
```

### Content card
White surface, 1px `#D3D9DD` border, 10px radius, mosaic strip on the top edge, 24px inner padding. Mono eyebrow (Coral or Muted slate), Work Sans 600 title (21px), Muted slate description, coral "Read more" link at the bottom.

### Nav
Sticky, White Smoke background, bottom border `#D3D9DD`, 20px/24px padding, `max-width:1080px`. Fugaz One wordmark left, Work Sans 500 links right (15px), Contact as coral outline button.

Below 768px the links collapse behind a hamburger toggle: a 44×44px `<button>` with a 1.5px `#D3D9DD` border and Oxford Navy bars that morph to an X when open. It carries `aria-expanded`/`aria-controls` and an aria-label that flips between "Open menu" and "Close menu". Opening reveals a full-width White Smoke dropdown below the bar with the links stacked; it closes on link tap, on Escape (returning focus to the button), and when the viewport widens past 768px.

### Footer
Mosaic strip top edge, then Oxford Navy panel. Fugaz One tagline (44px, White Smoke), hairline `#2A527A`, contact + nav links in White Smoke, mono meta line in `#8FB0C1`.

---

## 7. Layout defaults
- Content width: `max-width:1080px; margin:0 auto`, 24px gutters
- Two-column label/body split: `grid-template-columns:0.85fr 1.15fr; gap:56px; align-items:start`
- Body measure cap: `max-width:560px` (sans) / `680px` (AsideNote)
- Use flex/grid with `gap` for sibling groups (nav, tags, buttons), never margin-spaced inline runs
- Breakpoint: 768px, see Open decisions for scaling rules below it

---

## Cross-reference

Voice, house style, copy rules, IA, and package definitions live in `CLAUDE.md` and the brand foundation doc. This file is tokens and components only, if a rule here ever seems to contradict copy guidance elsewhere, `CLAUDE.md` wins.
