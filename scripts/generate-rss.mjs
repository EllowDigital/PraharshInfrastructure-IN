#!/usr/bin/env node
/**
 * Regenerate public/rss.xml from src/data/insights.ts
 *
 * Usage: node scripts/generate-rss.mjs
 *
 * The script parses insights.ts as text (no TS compile step) to keep the
 * generator dependency-free. Whenever you add or update an insight, re-run
 * this script and commit public/rss.xml.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const BASE = "https://www.praharshinfrastructure.com";
const src = readFileSync(resolve(root, "src/data/insights.ts"), "utf8");

// Naive parse — matches object literals in the exported INSIGHTS array.
const items = [];
const re =
  /slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?excerpt:\s*[\s\S]*?"([^"]+(?:"[^"]*)*)"[\s\S]*?category:\s*"([^"]+)"[\s\S]*?date:\s*"([^"]+)"[\s\S]*?keywords:\s*[\s\S]*?"([^"]+(?:"[^"]*)*)"/g;
let m;
while ((m = re.exec(src)) !== null) {
  items.push({
    slug: m[1],
    title: m[2],
    excerpt: m[3],
    category: m[4],
    date: m[5],
    keywords: m[6],
  });
}

items.sort((a, b) => (a.date < b.date ? 1 : -1));

const esc = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const lastBuild = new Date().toUTCString();
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Praharsh Infrastructure — Insights &amp; News</title>
    <link>${BASE}/insights</link>
    <atom:link href="${BASE}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Field notes on solar, public lighting, road safety and government procurement from Praharsh Infrastructure.</description>
    <language>en-in</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items
  .map(
    (i) => `    <item>
      <title>${esc(i.title)}</title>
      <link>${BASE}/insights/${i.slug}</link>
      <guid isPermaLink="true">${BASE}/insights/${i.slug}</guid>
      <pubDate>${new Date(i.date).toUTCString()}</pubDate>
      <category>${esc(i.category)}</category>
      <dc:creator>Praharsh Infrastructure</dc:creator>
      <description>${esc(i.excerpt)}</description>
    </item>`,
  )
  .join("\n")}
  </channel>
</rss>
`;

writeFileSync(resolve(root, "public/rss.xml"), rss);
console.log(`Wrote public/rss.xml with ${items.length} items.`);
