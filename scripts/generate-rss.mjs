#!/usr/bin/env node
/**
 * Regenerate public/rss.xml from src/data/insights.ts
 *
 * Usage: node scripts/generate-rss.mjs
 *
 * Parses the insights.ts source as text (no TS compile step). Re-run this
 * script whenever an article is added or updated, then commit public/rss.xml.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const BASE = "https://www.praharshinfrastructure.com";
const src = readFileSync(resolve(root, "src/data/insights.ts"), "utf8");

// Split by `slug:` markers, then extract each field individually per block.
const blocks = src.split(/\n\s{2,}\{\n/).slice(1);
const field = (block, name) => {
  const re = new RegExp(`${name}:\\s*(?:\\n\\s+)?"([^"]+(?:\\\\.[^"]*)*)"`);
  const m = block.match(re);
  return m ? m[1].replace(/\\"/g, '"') : null;
};

const items = [];
for (const block of blocks) {
  const slug = field(block, "slug");
  const title = field(block, "title");
  const excerpt = field(block, "excerpt");
  const category = field(block, "category");
  const date = field(block, "date");
  if (!slug || !title || !date) continue;
  items.push({ slug, title, excerpt: excerpt || "", category: category || "", date });
}

items.sort((a, b) => (a.date < b.date ? 1 : -1));

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

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
