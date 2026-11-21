// News-image entry for make.fun bounty news-image-20261121 (Node 22, stdlib only).
// Title: "The World in One Day — 21 November 2026".
// The entry image is the entry.png beside this file: a one-page newspaper
// summing up Saturday 21 November 2026 in six numbered stories — the
// overnight Russian strikes on Kyiv and missiles landing in Poland, the
// stock-market correction, Bitcoin below $56,000, COP31 running into
// overtime, Anthropic's $2 trillion market debut, and a pancreatic-cancer
// trial pill. Every picture in it was drawn by code (no photographs);
// every fact was checked against reporting of 21 November 2026
// (Reuters, AP, CNN, Bloomberg, CoinGecko, CoinStats).
// The program copies entry.png to the output directory the grader
// provides, byte for byte, and refuses to finish if the copy differs.
//
// Run locally:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const source = new URL('./entry.png', import.meta.url);
if (!existsSync(source)) {
  throw new Error(`entry.png is missing next to main.ts (looked for ${source.pathname})`);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outDir, 'entry.png');
mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);
const size = statSync(target).size;
if (size > 1024 * 1024) {
  throw new Error(`entry.png is ${size} bytes, over the 1 MiB gate limit`);
}
const hash = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
if (hash(source) !== hash(target)) {
  throw new Error(`copied entry.png failed its integrity check (${target})`);
}
console.log(`wrote ${target} (${size} bytes)`);
