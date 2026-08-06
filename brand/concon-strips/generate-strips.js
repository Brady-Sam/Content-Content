#!/usr/bin/env node
/**
 * Content Content — Mosaic Strip Generator
 *
 * Generates SVG trencadís-inspired mosaic strips for use in Figma, Canva,
 * Claude Design, and social media (Instagram etc.).
 *
 * Usage:
 *   node generate-strips.js
 *
 * Output: mosaic-strip-{name}.svg + index.json in this directory.
 * Safe to re-run: files are overwritten idempotently.
 *
 * Strip spec (from DESIGN.md §5):
 *   - 8px tall, 20px tile columns, 1.5px grout gap
 *   - 60 tiles per strip
 *   - One coral accent tile at seeded position 5–8
 *   - Each tile gets a randomised clip-path polygon for jagged edges
 *   - viewBox "0 0 1200 8" — scales to any width at fixed 8px height
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Colour palette
// ---------------------------------------------------------------------------
const PALETTE = {
  oxfordNavy:    '#003262',
  airForceBlue:  '#46809B',
  whiteSmoke:    '#F6F5F3',
  ink:           '#12222B',
  coral:         '#B23A2E',
  blueTint:      '#E4ECF0',
  lightNavyTint: '#8FB0C1',
  groutGrey:     '#AFB0A9',
};

// Tile colour pool — same weighting as the site implementation
const BASE_COLOURS = [
  PALETTE.oxfordNavy,    // ×3 — dominant dark navy
  PALETTE.oxfordNavy,
  PALETTE.oxfordNavy,
  PALETTE.airForceBlue,  // ×2 — mid blue
  PALETTE.airForceBlue,
  PALETTE.blueTint,      // ×1 — light blue
  PALETTE.whiteSmoke,    // ×1 — near-white
  PALETTE.ink,           // ×1 — near-black
  PALETTE.lightNavyTint, // ×1 — soft navy
];

// ---------------------------------------------------------------------------
// Seeded RNG — LCG, identical to the site's buildStrip() in DESIGN.md §5
// ---------------------------------------------------------------------------
function makeRng(seed) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

// ---------------------------------------------------------------------------
// Strip builder — matches site logic exactly
// ---------------------------------------------------------------------------
function buildStrip(seed) {
  const rnd = makeRng(seed);

  const clamp = (v) => Math.min(100, Math.max(0, Math.round(v)));
  const jx    = (b, a) => clamp(b + (rnd() * 2 - 1) * a);

  const clip = () => {
    let pts = [
      [jx(2, 15), jx(4, 15)],
      [jx(98, 15), jx(3, 13)],
      [jx(97, 13), jx(98, 15)],
      [jx(3, 15), jx(97, 15)],
    ];
    // ~55 % chance of a mid-point bump on one edge (creates the jagged tile look)
    if (rnd() > 0.45) {
      const idx = Math.floor(rnd() * 4);
      const a   = pts[idx];
      const b   = pts[(idx + 1) % 4];
      const mid = [
        clamp((a[0] + b[0]) / 2 + (rnd() * 2 - 1) * 13),
        clamp((a[1] + b[1]) / 2 + (rnd() * 2 - 1) * 13),
      ];
      pts.splice(idx + 1, 0, mid);
    }
    return 'polygon(' + pts.map((p) => p[0] + '% ' + p[1] + '%').join(',') + ')';
  };

  const tiles = [];
  for (let i = 0; i < 60; i++) {
    tiles.push({ bg: BASE_COLOURS[Math.floor(rnd() * BASE_COLOURS.length)], clip: clip() });
  }

  // Single coral accent tile — position randomised in the 5–8 window
  const coralIdx = 5 + Math.floor(rnd() * 4);
  tiles[coralIdx] = { bg: PALETTE.coral, clip: clip() };

  return tiles;
}

// ---------------------------------------------------------------------------
// SVG renderer
// ---------------------------------------------------------------------------
const TILE_WIDTH  = 20;   // px
const GROUT_GAP   = 1.5;  // px
const STRIP_HEIGHT = 8;   // px
const TILE_COUNT  = 60;

// Total logical width used for the viewBox
const TOTAL_WIDTH = TILE_COUNT * TILE_WIDTH + (TILE_COUNT - 1) * GROUT_GAP;

function renderSvg(tiles, { label, seed }) {
  const tileEls = tiles.map((t, i) => {
    const x = i * (TILE_WIDTH + GROUT_GAP);
    // clip-path percentages are relative to the element bounding box in SVG,
    // so we apply the clip-path directly on the rect element.
    return `  <rect x="${x}" y="0" width="${TILE_WIDTH}" height="${STRIP_HEIGHT}" fill="${t.bg}" clip-path="url(#cp${i})" />`;
  });

  // Build <clipPath> defs — convert percentage polygon to absolute coords
  const defs = tiles.map((t, i) => {
    const x = i * (TILE_WIDTH + GROUT_GAP);
    // Parse "polygon(p0x% p0y%, ...)" → absolute SVG coords
    const inner = t.clip.slice('polygon('.length, -1);
    const absPoints = inner.split(',').map((pair) => {
      const [px, py] = pair.trim().split(' ');
      const ax = (parseFloat(px) / 100) * TILE_WIDTH + x;
      const ay = (parseFloat(py) / 100) * STRIP_HEIGHT;
      return `${ax.toFixed(2)},${ay.toFixed(2)}`;
    });
    return `  <clipPath id="cp${i}"><polygon points="${absPoints.join(' ')}" /></clipPath>`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${TOTAL_WIDTH.toFixed(2)} ${STRIP_HEIGHT}" width="1200" height="${STRIP_HEIGHT}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <!-- Content Content mosaic strip — ${label} (seed ${seed}) -->
  <!-- Trencadís-inspired divider. Scale width freely; height is fixed at 8px. -->
  <rect width="${TOTAL_WIDTH.toFixed(2)}" height="${STRIP_HEIGHT}" fill="${PALETTE.groutGrey}" />
  <defs>
${defs.join('\n')}
  </defs>
${tileEls.join('\n')}
</svg>`;
}

// ---------------------------------------------------------------------------
// Strip definitions
// ---------------------------------------------------------------------------
const STRIPS = [
  {
    name:  'primary',
    seed:  20260713,
    label: 'Primary (site white-section top edge)',
    usage: 'Top edge of white/light sections on the site. Matches the live site exactly.',
  },
  {
    name:  'footer',
    seed:  91827364,
    label: 'Footer (site footer top edge)',
    usage: 'Top edge of the site footer. Matches the live site exactly.',
  },
  {
    name:  'variant-a',
    seed:  11223344,
    label: 'Variant A',
    usage: 'Design option for off-site use — presentations, social, print.',
  },
  {
    name:  'variant-b',
    seed:  55667788,
    label: 'Variant B',
    usage: 'Design option for off-site use — presentations, social, print.',
  },
  {
    name:  'variant-c',
    seed:  99001122,
    label: 'Variant C',
    usage: 'Design option for off-site use — presentations, social, print.',
  },
  {
    name:  'variant-d',
    seed:  13579246,
    label: 'Variant D',
    usage: 'Design option for off-site use — presentations, social, print.',
  },
];

// ---------------------------------------------------------------------------
// Main — generate all strips and write index
// ---------------------------------------------------------------------------
const OUT_DIR = __dirname;

const index = {
  generated: new Date().toISOString(),
  spec: {
    tileCount:   TILE_COUNT,
    tileWidth:   `${TILE_WIDTH}px`,
    groutGap:    `${GROUT_GAP}px`,
    stripHeight: `${STRIP_HEIGHT}px`,
    viewBox:     `0 0 ${TOTAL_WIDTH.toFixed(2)} ${STRIP_HEIGHT}`,
    algorithm:   'LCG seeded RNG — s = (s * 1103515245 + 12345) & 0x7fffffff',
  },
  palette: PALETTE,
  strips: [],
};

for (const strip of STRIPS) {
  const tiles    = buildStrip(strip.seed);
  const svg      = renderSvg(tiles, strip);
  const filename = `mosaic-strip-${strip.name}.svg`;
  const filepath = path.join(OUT_DIR, filename);

  fs.writeFileSync(filepath, svg, 'utf8');
  console.log(`✓ ${filename}`);

  index.strips.push({
    name:     strip.name,
    seed:     strip.seed,
    label:    strip.label,
    usage:    strip.usage,
    filename,
  });
}

fs.writeFileSync(path.join(OUT_DIR, 'index.json'), JSON.stringify(index, null, 2), 'utf8');
console.log('✓ index.json');
console.log(`\nDone — ${STRIPS.length} strips written to ${OUT_DIR}`);
