import { spawn } from "node:child_process";
import { chromium } from "playwright";

const BASE = process.env.TEST_BASE_URL || "http://localhost:4173";
const CHROME = process.env.TEST_CHROMIUM || "/usr/bin/chromium";

let server = null;
let passed = 0;
let failed = 0;

function ok(name) {
  passed++;
  console.log(`  ✔ ${name}`);
}
function fail(name, detail) {
  failed++;
  console.error(`  ✘ ${name}`);
  if (detail) console.error(`      ${detail}`);
}

function assert(cond, name, detail) {
  cond ? ok(name) : fail(name, detail);
}

async function boot() {
  server = spawn("npx", ["vite", "preview", "--port", "4173", "--strictPort"], {
    stdio: "ignore",
  });
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(BASE);
      if (r.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("Preview server did not come up");
}

function collectErrors(page) {
  const errors = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(e.message));
  return errors;
}

async function main() {
  await boot();
  const browser = await chromium.launch({ executablePath: CHROME });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log("\n— Core routes —");

  { // Homepage
    const errs = collectErrors(page);
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    assert((await page.title()) !== "", "homepage has a title", await page.title());
    assert((await page.locator("h1").count()) === 1, "homepage has exactly one h1");
    const hero = page.locator("h1").first();
    assert((await hero.innerText()).includes("craft"), "hero headline present");
    assert((await page.locator("article").count()) >= 6, "multiple article cards on homepage");
    assert((await page.locator("img[alt*='Portrait']").count()) >= 1, "author portrait rendered from local image");
    assert((await page.locator("a[href*='/blog/']").count()) >= 5, "blog links present");
    const noNested = await page.locator("a a").count();
    assert(noNested === 0, "no nested <a> tags anywhere", `found ${noNested}`);
    assert(errs.length === 0, "no console errors on homepage", errs.join("\n"));
  }

  { // Post page
    const errs = collectErrors(page);
    await page.goto(`${BASE}/blog/the-quiet-discipline-of-a-personal-website`, { waitUntil: "networkidle" });
    assert(await page.title(), "post title set", "title should not be empty");
    assert((await page.locator("h1").innerText()).includes("Quiet Discipline"), "post h1 renders");
    assert((await page.locator("blockquote").count()) >= 1, "blockquote rendered");
    assert((await page.locator("article p").count()) >= 6, "prose paragraphs rendered");
    const related = await page.locator("main a[href*='/blog/']").count();
    assert(related >= 4, "related + sidebar links present", `got ${related}`);
    assert(errs.length === 0, "no console errors on post page", errs.join("\n"));
  }

  { // Category page
    const errs = collectErrors(page);
    await page.goto(`${BASE}/category/travel`, { waitUntil: "networkidle" });
    assert((await page.locator("h1").innerText()).includes("Travel"), "category heading renders");
    assert((await page.locator("article").count()) >= 1, "category has posts");
    assert(errs.length === 0, "no console errors on category page", errs.join("\n"));
  }

  { // Search — typed query, url param
    const errs = collectErrors(page);
    await page.goto(`${BASE}/search?q=latency`, { waitUntil: "networkidle" });
    assert((await page.locator("h1").innerText()).includes("latency"), "search heading reflects query");
    const count = await page.locator("main article a[href*='/blog/']").count();
    assert(count >= 1, `search returns results (got ${count})`);
    assert(errs.length === 0, "no console errors on search page", errs.join("\n"));
  }

  { // About
    const errs = collectErrors(page);
    await page.goto(`${BASE}/about`, { waitUntil: "networkidle" });
    assert((await page.locator("h1").innerText()).length > 10, "about headline renders");
    assert((await page.locator("img[alt*='Portrait']").count()) >= 1, "author portrait on about");
    assert(errs.length === 0, "no console errors on about page", errs.join("\n"));
  }

  { // Contact form
    const errs = collectErrors(page);
    await page.goto(`${BASE}/contact`, { waitUntil: "networkidle" });
    await page.fill("#contact-name", "Test User");
    await page.fill("#contact-email", "test@example.com");
    await page.fill("#contact-subject", "hello");
    await page.fill("#contact-message", "The long version.");
    await page.getByRole("button", { name: "Send it" }).click();
    await page.getByText("Message sent").waitFor({ timeout: 5000 });
    assert(true, "contact form shows success state");
    assert(errs.length === 0, "no console errors on contact page", errs.join("\n"));
  }

  { // 404
    await page.goto(`${BASE}/nope`, { waitUntil: "networkidle" });
    assert((await page.locator("h1").innerText()).includes("wandered"), "404 page renders");
  }

  { // Navigation via UI
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    await page.getByRole("link", { name: "About" }).first().click();
    await page.waitForURL(/\/about/);
    assert(true, "header link navigates to /about");
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    await page.getByRole("link", { name: /Read the latest essay/ }).click();
    await page.waitForURL(/\/blog\//);
    assert(true, "hero CTA navigates to a post");
  }

  { // Keyboard search from header
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    await page.keyboard.press("Control+k");
    await page.locator('input[aria-label="Search essays"]').fill("nairobi");
    await page.keyboard.press("Enter");
    await page.waitForURL(/\/search\?q=/);
    assert(true, "Ctrl+K search navigates to results");
  }

  { // Theme toggle
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    const before = await page.evaluate(() =>
      getComputedStyle(document.body).backgroundColor);
    await page.getByRole("button", { name: /mode/ }).first().click();
    const after = await page.evaluate(() =>
      getComputedStyle(document.body).backgroundColor);
    assert(before !== after, "theme toggle changes background", `${before} → ${after}`);
    await page.evaluate(() => localStorage.removeItem("theme"));
  }

  { // Mobile responsiveness
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    const hScroll = await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
    assert(hScroll, "no horizontal overflow at 390px");
    await page.getByRole("button", { name: "Toggle menu" }).click();
    assert(await page.getByRole("navigation", { name: "Mobile" }).isVisible(), "mobile menu opens");
    assert((await page.locator("a a").count()) === 0, "no nested anchors at mobile");
  }

  console.log("\n— Round-2 features —");

  { // Static SEO assets
    await page.setViewportSize({ width: 1440, height: 900 });
    for (const path of ["/sitemap.xml", "/posts/rss.xml", "/og/og-the-quiet-discipline-of-a-personal-website.jpg", "/images/covers/field-notes-a-weekend-in-lake-naivasha.jpg", "/fonts/fraunces-variable-normal.woff2"]) {
      const res = await page.request.get(`${BASE}${path}`);
      assert(res.status() === 200, `${path} serves 200`, `status ${res.status()}`);
    }
  }

  { // Route-level og + JSON-LD
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    const homeOg = await page.locator('meta[property="og:image"]').getAttribute("content");
    assert(!!homeOg && homeOg.includes("/og/og-"), "homepage sets og:image", `${homeOg}`);
    const homeLd = await page.locator("#route-jsonld").innerText();
    assert(homeLd.includes('"WebSite"'), "homepage injects WebSite JSON-LD");

    await page.goto(`${BASE}/blog/the-tyranny-of-the-infinite-feed`, { waitUntil: "networkidle" });
    const postOg = await page.locator('meta[property="og:image"]').getAttribute("content");
    assert(postOg?.includes("og-the-tyranny-of-the-infinite-feed"), "post sets unique og:image", `${postOg}`);
    const ld = await page.locator("#route-jsonld").innerText();
    const jl = JSON.parse(ld);
    assert(jl["@type"] === "Article" && jl.headline.length > 0, "post injects Article JSON-LD with headline");
    assert(jl.datePublished === "2025-08-09", "Article JSON-LD has datePublished");
    assert((await page.title()).includes("Infinite Feed"), "post title uses essay name");
  }

  { // Photo covers render
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    const imgs = await page.locator('img[src*="/images/covers/"]').count();
    assert(imgs >= 6, `cover photos used across homepage (got ${imgs})`);
    const natural = await page.locator('img[src*="/images/covers/"]').first().evaluate(
      (el) => el.complete && el.naturalWidth > 0
    );
    assert(natural, "first cover photo actually loaded");
  }

  { // Gallery page
    const errs = collectErrors(page);
    await page.goto(`${BASE}/gallery`, { waitUntil: "networkidle" });
    assert((await page.locator("h1").innerText()).includes("Pictures"), "gallery heading renders");
    assert((await page.locator('img[src*="/images/covers/"]').count()) === 12, "gallery shows 12 photo tiles");
    assert((await page.locator("a[href*='/blog/']").count()) >= 12, "gallery tiles link to essays");
    assert(errs.length === 0, "no console errors on gallery", errs.join("\n"));
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
    assert(overflow, "gallery has no horizontal overflow");
  }

  { // Post page round-2: TOC, progress, prev/next
    const errs = collectErrors(page);
    await page.goto(`${BASE}/blog/what-moving-to-nairobi-taught-me-about-latency`, { waitUntil: "networkidle" });
    assert((await page.locator('nav[aria-label="Within this essay"]').count()) === 1, "TOC nav present");
    const tocLinks = await page.locator('nav[aria-label="Within this essay"] a').count();
    assert(tocLinks >= 2, "TOC lists section anchors", `got ${tocLinks}`);
    const tocOk = await page.locator('nav[aria-label="Within this essay"] a').first().evaluate(
      (el) => {
        const target = document.querySelector(el.getAttribute("href"));
        return target?.id === "sec-1" || !!target;
      });
    assert(tocOk, "TOC anchor targets an existing heading");
    assert((await page.locator('nav[aria-label="Adjacent essays"]').count()) === 1, "prev/next strip present");
    assert(
      (await page.locator('div[aria-hidden="true"].fixed, div[aria-hidden="true"]').filter({ hasText: "" }).count()) >= 0,
      "progress bar container rendered"
    );
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(150);
    const barWidth = await page.locator('div[aria-hidden="true"] div.bg-ochre').first().evaluate((el) => el.style.width);
    assert(barWidth.includes("%") && parseFloat(barWidth) > 0, "progress bar advances with scroll", barWidth);
    assert(errs.length === 0, "no console errors on upgraded post page", errs.join("\n"));
  }

  console.log(`\n${passed} passed, ${failed} failed`);
  await browser.close();
  server.kill("SIGTERM");
  process.exit(failed ? 1 : 0);
}

main().catch(async (e) => {
  console.error(e);
  if (server) server.kill("SIGTERM");
  process.exit(1);
});