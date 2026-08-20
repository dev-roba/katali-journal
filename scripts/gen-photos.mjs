import { mkdirSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { POSTS } from "../src/data/posts.js";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const outDir = join(root, "public", "images", "covers");
mkdirSync(outDir, { recursive: true });

const PHOTO_BY_SLUG = {
  "the-quiet-discipline-of-a-personal-website": "photo-1455390582262-044cdead277a",
  "what-moving-to-nairobi-taught-me-about-latency": "photo-1451187580459-43490279c0fa",
  "designing-for-slow-connections": "photo-1581291518857-4e27b48ff24e",
  "why-i-write-my-own-css-instead-of-a-framework": "photo-1518770660439-4636190af475",
  "the-case-for-boring-technology": "photo-1555066931-4365d14bab8c",
  "on-finding-your-voice-in-public": "photo-1470071459604-3b5ec3a7fe05",
  "field-notes-a-weekend-in-lake-naivasha": "photo-1439066615861-d1af74d74000",
  "the-tyranny-of-the-infinite-feed": "photo-1515879218367-8466d910aaa4",
  "notes-on-building-a-personal-knowledge-system": "photo-1517841905240-472988babdf9",
  "accessibility-is-a-performance-budget": "photo-1454165804606-c3d57bc86b40",
  "slow-food-fast-code-lessons-from-the-kitchen": "photo-1504674900247-0877df9cc836",
  "shipping-small-a-manifesto-for-indie-builders": "photo-1519389950473-47ba0277781c",
};

function download(url, dest) {
  execFileSync(
    "curl",
    ["-sfL", "--retry", "2", "--connect-timeout", "15", "-o", dest, url],
    { stdio: ["ignore", "ignore", "pipe"] }
  );
  return statSync(dest).size;
}

async function main() {
  let total = 0;
  for (const post of POSTS) {
    const id = PHOTO_BY_SLUG[post.slug];
    if (!id) {
      console.log(`  skip ${post.slug} (no photo mapped)`);
      continue;
    }
    const url = `https://images.unsplash.com/${id}?w=1400&q=78&fm=jpg&fit=crop&auto=format`;
    const dest = join(outDir, `${post.slug}.jpg`);
    const bytes = await download(url, dest);
    total += bytes;
    console.log(`  ${post.slug}.jpg  ${(bytes / 1024).toFixed(0)} KiB`);
  }
  console.log(`\nDownloaded covers → public/images/covers (${(total / 1024 / 1024).toFixed(1)} MiB total)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});