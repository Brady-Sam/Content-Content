#!/usr/bin/env node
/**
 * Content Content — Portrait Ring Generator
 *
 * Wraps any photo in a circular mosaic ring for use on Instagram
 * and other social media. Produces a self-contained SVG at 1080×1080px
 * (Instagram square) or any size you specify.
 *
 * The ring uses the same seeded RNG and tile palette as DESIGN.md §5 —
 * same tiles, same order, wrapped around the circle like a piece of string.
 *
 * Usage:
 *   node generate-portrait.js <photo> [options]
 *
 * Options:
 *   --out <file>     Output path (default: portrait-ring.svg)
 *   --seed <n>       Seed (default: 20260713, the primary strip seed)
 *   --size <n>       Output px square (default: 1080 for Instagram)
 *   --crop <0-100>   Vertical crop: 0 = top of photo, 50 = centre (default), 100 = bottom
 *
 * Examples:
 *   node generate-portrait.js photo.jpg
 *   node generate-portrait.js photo.jpg --crop 80 --out sam-insta.svg
 *   node generate-portrait.js photo.jpg --seed 91827364 --size 1080
 *
 * Exporting to PNG:
 *   Open the .svg in Chrome → right-click the image → "Save image as…" (PNG)
 *   Or if you have Inkscape installed:
 *     inkscape portrait-ring.svg --export-png=portrait-ring.png --export-width=1080
 *
 * No npm install needed — uses only Node.js built-ins.
 */

const fs   = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Parse args
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
if (!args.length || args[0] === '--help') {
  console.log('Usage: node generate-portrait.js <photo> [--out file] [--seed n] [--size n] [--crop 0-100]');
  process.exit(0);
}

const imgArg = args[0];
const get = (flag, fallback) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : fallback;
};

const outArg   = get('--out',  'portrait-ring.svg');
const SEED_ARG = parseInt(get('--seed', '20260713'), 10);
const SIZE     = parseInt(get('--size', '1080'), 10);
const CROP_Y   = Math.max(0, Math.min(100, parseInt(get('--crop', '50'), 10))) / 100;

// ---------------------------------------------------------------------------
// Embed the image as a base64 data URI
// ---------------------------------------------------------------------------
const imgPath = path.resolve(imgArg);
if (!fs.existsSync(imgPath)) {
  console.error(`File not found: ${imgPath}`);
  process.exit(1);
}
const imgBytes  = fs.readFileSync(imgPath);
const imgBase64 = imgBytes.toString('base64');
const ext       = path.extname(imgArg).toLowerCase().slice(1);
const mime      = (ext === 'jpg' || ext === 'jpeg') ? 'image/jpeg'
                : ext === 'png' ? 'image/png'
                : ext === 'webp' ? 'image/webp'
                : 'image/jpeg';
const dataUri = `data:${mime};base64,${imgBase64}`;

// ---------------------------------------------------------------------------
// Ring geometry (viewBox coordinates — scales to any SIZE)
// ---------------------------------------------------------------------------
const VB = 216;             // viewBox size
const cx = VB / 2, cy = VB / 2;
const Ro = 107, Ri = 100;  // outer/inner ring radii; ring is 7px wide in viewBox units
const Rm = (Ro + Ri) / 2;

// ---------------------------------------------------------------------------
// Seeded LCG — identical to DESIGN.md §5
// ---------------------------------------------------------------------------
let s = SEED_ARG;
const rnd = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };

// ---------------------------------------------------------------------------
// Tile layout — same proportions as the horizontal strip
// ---------------------------------------------------------------------------
const TILE_W = 20, GAP = 1.5, SLOT = TILE_W + GAP;
const C    = 2 * Math.PI * Rm;
const N    = Math.floor(C / SLOT);
const slotRad = (2 * Math.PI) / N;
const tileRad = slotRad * TILE_W / SLOT;

const BASE = ['#003262','#003262','#003262','#46809B','#46809B','#E4ECF0','#F6F5F3','#12222B','#8FB0C1'];
const tiles = Array.from({ length: N }, () => BASE[Math.floor(rnd() * BASE.length)]);
tiles[Math.min(5 + Math.floor(rnd() * 4), N - 1)] = '#B23A2E';

// ---------------------------------------------------------------------------
// Build tile paths (same 6-point polygon approach as the web ring)
// ---------------------------------------------------------------------------
const pt = (r, a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
const f  = v => v.toFixed(3);
const startA = -Math.PI / 2;

const paths = tiles.map((fill, i) => {
  const a0 = startA + i * slotRad;
  const a1 = a0 + tileRad;
  const am = (a0 + a1) / 2;
  const jr = () => (rnd() * 2 - 1) * 1.5;
  const pts = [
    pt(Ro + jr(), a0), pt(Ro + jr(), am), pt(Ro + jr(), a1),
    pt(Ri + jr(), a1), pt(Ri + jr(), am), pt(Ri + jr(), a0),
  ];
  return `<path d="M ${pts.map(p => `${f(p[0])} ${f(p[1])}`).join(' L ')} Z" fill="${fill}"/>`;
});

// ---------------------------------------------------------------------------
// Photo crop
// The image fills the 200×200 inner square; CROP_Y shifts which vertical
// portion is visible (0 = top, 50 = centre, 100 = bottom of the photo).
// We implement this by placing a taller image element and shifting it.
// Since we don't know the actual image dimensions, we use a tall virtual
// height and clip it — the preserveAspectRatio controls horizontal centering.
// ---------------------------------------------------------------------------
const innerSize = VB - 16;         // 200px in viewBox units
const photoX = 8, photoY = 8;

// Use a fixed 3:4 portrait assumption. If the image is landscape or square,
// xMidYMid slice still works fine; the crop parameter adjusts the view for tall images.
// We embed the image at natural proportions via a wrapper <svg> + viewport.
const photoEl = `<image href="${dataUri}"
    x="${photoX}" y="${photoY}"
    width="${innerSize}" height="${innerSize}"
    clip-path="url(#photo-clip)"
    preserveAspectRatio="${CROP_Y < 0.25 ? 'xMidYMin' : CROP_Y > 0.75 ? 'xMidYMax' : 'xMidYMid'} slice"/>`;

// ---------------------------------------------------------------------------
// Assemble SVG
// ---------------------------------------------------------------------------
const svg = `<svg xmlns="http://www.w3.org/2000/svg"
  width="${SIZE}" height="${SIZE}"
  viewBox="0 0 ${VB} ${VB}">
  <!--
    Content Content portrait ring
    Seed: ${SEED_ARG} | Crop: ${Math.round(CROP_Y * 100)}% | ${new Date().toISOString().slice(0, 10)}
  -->
  <defs>
    <clipPath id="photo-clip">
      <circle cx="${cx}" cy="${cy}" r="${Ri}"/>
    </clipPath>
  </defs>

  <!-- Grout background ring -->
  <circle cx="${cx}" cy="${cy}" r="${Ro}" fill="#AFB0A9"/>

  <!-- Photo -->
  ${photoEl}

  <!-- Mosaic tile ring -->
  ${paths.join('\n  ')}
</svg>`;

// ---------------------------------------------------------------------------
// Write output
// ---------------------------------------------------------------------------
const outPath = path.resolve(outArg);
fs.writeFileSync(outPath, svg, 'utf8');

console.log(`✓ ${outPath}`);
console.log(`  ${SIZE}×${SIZE}px SVG · seed ${SEED_ARG} · ${N} tiles`);
console.log();
console.log(`To export as PNG:`);
console.log(`  Open in Chrome → right-click → Save image as PNG`);
console.log(`  or: inkscape ${outArg} --export-png=${outArg.replace('.svg', '.png')} --export-width=${SIZE}`);
