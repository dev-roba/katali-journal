import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE, POSTS, CATEGORIES } from "../src/data/posts.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "posts");
mkdirSync(outDir, { recursive: true });

const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const items = POSTS.map((p) => {
  const link = `https://katalijournal.example/blog/${p.slug}`;
  return `    <item>
      <title>${escape(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <category>${p.category}</category>
      <description>${escape(p.description)}</description>
    </item>`;
}).join("\n");

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(SITE.name)}</title>
    <link>https://katalijournal.example</link>
    <description>${escape(SITE.tagline)}</description>
    <language>en</language>
    <atom:link href="https://katalijournal.example/posts/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

writeFileSync(join(outDir, "rss.xml"), feed);
console.log(`rss.xml written with ${POSTS.length} items`);

const BASE_URL = "https://katalijournal.example";
const staticRoutes = [
  { path: "/", priority: "1.0" },
  { path: "/about", priority: "0.7" },
  { path: "/contact", priority: "0.5" },
  { path: "/gallery", priority: "0.6" },
  { path: "/search", priority: "0.3" },
  { path: "/category/all", priority: "0.8" },
];
const urls = [
  ...staticRoutes.map((r) => ({ path: r.path, priority: r.priority })),
  ...CATEGORIES.filter((c) => c.slug !== "all").map((c) => ({
    path: `/category/${c.slug}`,
    priority: "0.6",
  })),
  ...POSTS.map((p) => ({
    path: `/blog/${p.slug}`,
    priority: "0.9",
    lastmod: p.date,
  })),
];
const urlset = urls
  .map(
    (u) =>
      `  <url>\n    <loc>${BASE_URL}${u.path}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}\n    <priority>${u.priority}</priority>\n  </url>`
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>
`;
writeFileSync(join(root, "public", "sitemap.xml"), sitemap);
console.log(`sitemap.xml written with ${urls.length} URLs`);