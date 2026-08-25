#!/usr/bin/env node
/**
 * Content Content — Open Graph image generator
 *
 * Renders the 1200x630 card used for link previews on LinkedIn, WhatsApp,
 * Instagram, Slack and anywhere else that reads og:image.
 *
 * Follows the same house pattern as linkedin_banner.svg: White Smoke ground,
 * Fugaz One wordmark and headline, mosaic strip along one edge. The strip uses
 * the seeded RNG and palette from DESIGN.md §5, so the tiles are the real ones
 * in the real order rather than something invented for the export.
 *
 * Writes an HTML file, then rasterises it with headless Chrome so the Google
 * fonts render properly. SVG text would need the fonts converted to outlines.
 *
 * Usage:
 *   node generate-og-image.js
 *   node generate-og-image.js --out og-flow-rebuild.png --title "One journey,|rebuilt." \
 *        --sub "Fixed price. Delivered in your tools."
 *
 * Options:
 *   --out <file>    Output path (default: og-image.png)
 *   --title <text>  Fugaz One headline. Use | for a line break. Default the site's.
 *   --sub <text>    Work Sans line under it. Pass "" to omit.
 *   --wordmark <on|off>  Wordmark in the top left (default on).
 *   --scale <n>     Pixel density (default 2). The card is laid out at 1200x630 and
 *                   written out at that times the scale, so 2 gives 2400x1260.
 *   --seed <n>      Mosaic seed (default 20260713, the primary strip seed)
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const args = process.argv.slice(2);
const opt = (flag, fallback) => {
  const i = args.indexOf(flag);
  return i === -1 ? fallback : args[i + 1];
};

const OUT   = opt('--out', 'og-image.png');
const TITLE = opt('--title', 'Content,|designed.');
const SUB   = opt('--sub', 'An independent content design practice');
const MARK  = opt('--wordmark', 'on') !== 'off';
const SCALE = parseInt(opt('--scale', '2'), 10);
const SEED  = parseInt(opt('--seed', '20260713'), 10);
const escHtml = (t) => String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const W = 1200, H = 630;

/* DESIGN.md §5: the locked mosaic palette and the seeded generator. Same LCG,
   same tile order, so the strip here matches the one on the site. */
const BASE = ['#003262','#003262','#003262','#46809B','#46809B','#E4ECF0','#F6F5F3','#12222B','#8FB0C1'];
function makeRng(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
}

const TILE = 34, GAP = 2.5, STRIP_H = 26;       // scaled up hard from the site's 20/1.5/8
const rnd = makeRng(SEED);
const count = Math.ceil(W / (TILE + GAP));
const tiles = [];
for (let i = 0; i < count; i++) tiles.push(BASE[Math.floor(rnd() * BASE.length)]);
tiles[5 + Math.floor(rnd() * 4)] = '#B23A2E';   // exactly one coral tile

const strip = tiles
  .map((c, i) => `<div style="background:${c};width:${TILE}px;height:${STRIP_H}px;flex:0 0 auto;"></div>`)
  .join('');

const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fugaz+One&family=Work+Sans:wght@400;600&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box;}
  body{width:${W}px;height:${H}px;background:#F6F5F3;font-family:'Work Sans',sans-serif;
       display:flex;flex-direction:column;overflow:hidden;}
  .top{padding:52px 64px 0;}
  /* The headline block is optically centred in whatever is left between the
     wordmark and the strip, so the card never ends up bottom-heavy when a
     shorter title is passed in. */
  .mid{flex:1;padding:0 64px;display:flex;flex-direction:column;justify-content:center;}
  .wordmark{font-family:'Fugaz One',cursive;font-size:34px;line-height:1;letter-spacing:.005em;}
  .w1{color:#003262;} .w2{color:#46809B;}
  h1{font-family:'Fugaz One',cursive;font-weight:400;font-size:190px;line-height:.92;
     color:#003262;letter-spacing:.005em;}
  p{font-family:'Work Sans',sans-serif;font-weight:600;font-size:38px;line-height:1.25;
    color:#003262;margin-top:34px;max-width:1000px;}
  .strip{display:flex;gap:${GAP}px;background:#AFB0A9;height:${STRIP_H}px;width:${W}px;overflow:hidden;}
</style></head>
<body>
  <div class="top">${MARK ? '<div class="wordmark"><span class="w1">Content</span> <span class="w2">Content</span></div>' : ''}</div>
  <div class="mid">
    <h1>${escHtml(TITLE).split('|').join('<br>')}</h1>
    ${SUB ? `<p>${escHtml(SUB)}</p>` : ''}
  </div>
  <div class="strip">${strip}</div>
</body></html>`;

const tmp = path.join(require('os').tmpdir(), `cc-og-${Date.now()}.html`);
fs.writeFileSync(tmp, html);

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
/* Written out at 2x and left there, rather than downsampled back to 1200x630.
   A 1200px card is upscaled by any retina display showing it at full width, which
   is exactly where a link preview gets judged. Declare the real dimensions in
   og:image:width and og:image:height, do not declare 1200x630 for a 2400 file. */
execFileSync(CHROME, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars',
  `--force-device-scale-factor=${SCALE}`,
  `--window-size=${W},${H}`,
  `--screenshot=${path.resolve(OUT)}`,
  '--virtual-time-budget=6000',
  `file://${tmp}`
], { stdio: 'ignore' });

fs.unlinkSync(tmp);
console.log(`Wrote ${OUT} (${W * SCALE}x${H * SCALE}), seed ${SEED}`);
