import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import React from "react";
import { renderToString } from "react-dom/server";
import { chromium } from "playwright";
import { POSTS, categoryMeta, SITE } from "../src/data/posts.js";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const outDir = join(root, "public", "og");
mkdirSync(outDir, { recursive: true });

const CHROME = process.env.TEST_CHROMIUM || "/usr/bin/chromium";
const W = 1200;
const H = 630;

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function main() {
  const server = await createServer({
    root,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "error",
  });
  const { SvgCover } = await server.ssrLoadModule("/src/components/Cover.jsx");

  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
  await page.addStyleTag({ content: "body{margin:0}" });

  for (const post of POSTS) {
    const svg = renderToString(
      React.createElement(SvgCover, {
        slug: post.slug,
        category: post.category,
        title: post.title,
        width: W,
        height: H,
      })
    );
    const cat = categoryMeta(post.category).label.toUpperCase();
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>
      body{margin:0;width:${W}px;height:${H}px;overflow:hidden}
      .wrap{position:relative;width:${W}px;height:${H}px}
      .wrap svg{position:absolute;inset:0;width:${W}px;height:${H}px}
      .scrim{position:absolute;inset:0;background:linear-gradient(to top,rgba(15,13,10,.94),rgba(15,13,10,.45) 42%,rgba(15,13,10,.15))}
      .cap{position:absolute;left:64px;right:64px;bottom:54px}
      .eyebrow{font:700 20px/1.1 system-ui,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:#e5a94b;margin-bottom:18px}
      .title{font:600 55px/1.14 Georgia,'Times New Roman',serif;color:#f2ecdf;text-wrap:balance}
      .site{margin-top:26px;font:600 18px/1 system-ui,sans-serif;letter-spacing:.28em;text-transform:uppercase;color:#b5a88f}
    </style></head><body><div class="wrap">${svg}<div class="scrim"></div><div class="cap">
      <div class="eyebrow">${esc(cat)}</div>
      <div class="title">${esc(post.title)}</div>
      <div class="site">${esc(SITE.name.toUpperCase())}</div>
    </div></div></body></html>`;

    await page.setContent(html, { waitUntil: "load" });
    await page.screenshot({
      path: join(outDir, `og-${post.slug}.jpg`),
      type: "jpeg",
      quality: 86,
    });
    console.log(`  og-${post.slug}.jpg`);
  }

  await browser.close();
  await server.close();
  console.log(`\nWrote ${POSTS.length} OG images → public/og/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});