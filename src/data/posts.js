export const SITE = {
  name: "Katali Journal",
  tagline: "Essays on craft, code & the spaces between",
  author: {
    name: "Karim Katali",
    role: "Software engineer, writer, occasional field photographer",
    location: "Nairobi, Kenya",
    avatar: "/images/author.jpg",
    bio: "Karim builds small, fast things for the web and writes about the craft behind them. He splits his time between shipping production systems and teaching others how to build with care.",
  },
};

export const CATEGORIES = [
  { slug: "engineering", label: "Engineering", tint: "--color-teal" },
  { slug: "design", label: "Design", tint: "--color-lilac" },
  { slug: "culture", label: "Culture", tint: "--color-ochre" },
  { slug: "travel", label: "Travel", tint: "--color-sage" },
  { slug: "product", label: "Product", tint: "--color-rose" },
  { slug: "practice", label: "Practice", tint: "--color-muted" },
  {
    slug: "all",
    label: "All writing",
    tint: "transparent",
  },
];

export const categoryMeta = (slug) =>
  CATEGORIES.find((c) => c.slug === slug) ?? CATEGORIES[0];

const P = (text) => ({ type: "p", text });
const H2 = (text) => ({ type: "h2", text });
const H3 = (text) => ({ type: "h3", text });
const Q = (text, cite) => ({ type: "quote", text, cite });
const UL = (items) => ({ type: "ul", items });
const OL = (items) => ({ type: "ol", items });
const CALLOUT = (title, text) => ({ type: "callout", title, text });

export const POSTS = [
  {
    slug: "the-quiet-discipline-of-a-personal-website",
    title: "The Quiet Discipline of a Personal Website",
    description:
      "A personal site is not a portfolio. It is a practice — a way of thinking in public, slowly, on the internet that only rewards speed.",
    category: "practice",
    date: "2026-06-18",
    readTime: 7,
    featured: true,
    tags: ["craft", "writing", "web"],
    content: [
      P("For years I treated my own homepage as an afterthought. It was the thing I rushed out between real work, a stub of links and a photo I had outgrown. Then I moved to a new city and everything felt provisional, so I rebuilt it — slowly this time, the way you furnish a room you plan to live in."),
      H2("A place, not a page"),
      P("The distinction matters. A page is something you publish; a place is something you return to, maintain, and slowly furnish. When I stopped thinking of the site as a deliverable and started thinking of it as a room, the work changed. I no longer asked, 'What should this say about me?' I asked, 'What do I want to read when I come home at the end of a long build day?'"),
      Q("The web is the only medium where you can publish a thought and still edit it the following morning. That freedom is also the discipline.", "Katali, on why he writes online"),
      H2("Thinking in public"),
      P("Writing is thinking made visible. The discipline of a personal site is that there is no editor, no schedule, no metric except the small honest one of whether the post still holds up for you months later. You write for the future self who forgot, which is a far more forgiving and honest audience than the feed."),
      UL([
        "Write the post you wished you'd found last year.",
        "Publish ugly. Revise in public. The diff is the point.",
        "One useful thought is worth a hundred hot takes.",
        "Link generously. The web is a commons first.",
      ]),
      H2("Maintenance as meditation"),
      P("A personal site that stays small stays live. I prune aggressively: if a section hasn't earned its place in six months, it goes. Performance is a moral position here — every kilobyte is someone's attention on a shaky connection, and I've been on that side of the wire often enough to feel it."),
      CALLOUT("A useful measure", "If the whole site — fonts, images, scripts included — weighed less than a single page of ads, you have probably done something right."),
      P("So this journal exists for the long version of the argument: that building with care, in public, for a small audience of future selves, is still one of the best uses of a keyboard."),
    ],
  },
  {
    slug: "what-moving-to-nairobi-taught-me-about-latency",
    title: "What Moving to Nairobi Taught Me About Latency",
    description:
      "Two hundred milliseconds changes how you design. A year of building and browsing from East Africa is a masterclass in the real cost of the prettiest code you can write.",
    category: "engineering",
    date: "2026-04-02",
    readTime: 9,
    featured: true,
    tags: ["performance", "web", "infrastructure"],
    content: [
      P("Backend latency figures are usually quoted in isolation: 40ms here, 120ms there. Moving my working life to Nairobi turned those numbers into weather. The same CDN edge that felt instant in one city takes a visibly lazy breath when the packets cross an ocean and a few undersea cables."),
      H2("The budget is real"),
      P("When your baseline round-trip is two hundred milliseconds, every extra script you ship is not an abstraction — it is a delay you can feel. I started treating my personal projects like someone was timing them with a stopwatch on a throttled connection, because I was, and that person was me."),
      UL([
        "Render what matters first. The hero can wait.",
        "Ship fonts that subset. A stray emoji shard can double a font file.",
        "Cache aggressively at every layer you control.",
        "Treat third-party scripts like flies at a picnic: inspect each one, and swat most of them.",
      ]),
      H2("Slow is a teacher"),
      P("Frustration teaches faster than admiration. Building from a slower vantage point revealed how many 'modern' techniques are luxury goods. The designs that survive are the ones that assume nothing about the visitor's connection — and those are, almost without exception, the designs that feel best everywhere."),
      Q("Shipping fast code from a slow connection is the most honest performance review a developer can have.", "Katali, notes on infrastructure from the Global South"),
      P("None of this is a complaint. It is a calibration. The web's architecture is uneven on purpose — built in decades, layered by geography — and the craft of it is learning to design for the slowest reader you love, not the fastest you can imagine."),
    ],
  },
  {
    slug: "designing-for-slow-connections",
    title: "Designing for Slow Connections",
    description:
      "Performance is a design material. When latency is scarce, layout, typography, and motion all fall into line behind one question: what should the user see first?",
    category: "design",
    date: "2026-05-22",
    readTime: 6,
    featured: true,
    tags: ["performance", "ux", "a11y"],
    content: [
      P("Design tools let us preview at perfection: crisp fonts, instant images, buttery motion. But the moment a page ships, it enters a lottery. Somewhere, on a patio in the late afternoon, someone is loading it over a tethered hotspot, and the only design decision left standing is the order in which things appear."),
      H2("Progress is a feeling"),
      P("A slow page is a design problem before it is an engineering problem. The interface that structures meaning in the first painted frames — a headline, a readable body, a working link — will feel fast even when it is not. The interface that waits for everything will feel broken regardless of how quick the network is."),
      UL([
        "Decide the one thing a visitor came to do. Paint that first.",
        "Let text arrive un-lazy-loaded. Prioritize words over pixels.",
        "Grow images gradually with aspect-ratio — never pop or shift.",
        "Make loading states feel like progress, not waiting rooms.",
      ]),
      H2("Motion that respects patience"),
      P("Motion is sugar, and sugar should be rationed. On a slow connection, a heavy entrance animation is not a delight; it is a queue. I now ask of every interaction animation the same question a barista asks of a line of customers: is this making things feel faster, or just prettier?"),
      P("The result is a quieter aesthetic — and I have come to believe quiet is the more premium word. A page that loads its meaning first, without flourish, is a page that trusts its reader."),
    ],
  },
  {
    slug: "why-i-write-my-own-css-instead-of-a-framework",
    title: "Why I Write My Own CSS Instead of a Framework",
    description:
      "Black velvet notebooks, seventy-five CSS variables, and a stubborn belief that one person's utility layer can be another person's actual design system.",
    category: "engineering",
    date: "2026-01-14",
    readTime: 8,
    tags: ["css", "frontend", "craft"],
    content: [
      P("Every framework hands me the same gift on arrival: a vocabulary. Utility classes, component APIs, a palette with sensible defaults. And every framework also hands me the same tax: I spend the first month fighting the last author's opinions before I can hear my own."),
      H2("Ownership is the feature"),
      P("My core files are boring on purpose — a handful of primitives, a restrained set of tokens, and free rein to break the grid whenever a layout demands it. Writing them by hand means every class in my markup has a biography. Nothing is inherited; everything is earned."),
      UL([
        "Token everything you might touch twice: color, type, spacing, radius.",
        "Keep specificity flat. The cascade is a river, not a boss.",
        "Name for the future maintainer, who is usually you, three months tired.",
        "Delete more than you add. CSS is a garden, not a storage unit.",
      ]),
      H2("Fast, because it is small"),
      P("A framework is a toolkit; a handcrafted stylesheet is an outfit. The outfit is smaller, which is a real number on a metered connection. It is also coherent, because one person made every decision with the same project in mind."),
      P("This site's stylesheet is a few kilobytes. It does not look 'done by a framework' — it looks done by a person with opinions, which is, increasingly, the rarest thing on the web."),
    ],
  },
  {
    slug: "the-case-for-boring-technology",
    title: "The Case for Boring Technology",
    description:
      "New tools are exciting. Old tools ship. A defense of the unglamorous stack that quietly meets its deadline, every time, for years.",
    category: "product",
    date: "2025-12-05",
    readTime: 7,
    tags: ["architecture", "engineering", "product"],
    content: [
      P("There is a specific joy in choosing the tool nobody will tweet about. It is the joy of the long game: the framework that has been stable for five years, the database that has answered harder questions, the build tool whose name you never need to spread in a diagram."),
      H2("Excitement is a cost, not a benefit"),
      P("Every dependency is a bet you are placing with someone else's schedule. New tools are better in the demo and worse in the incident. Boring tech is the opposite: worse in the screenshot, better in the outage, best in the third year when the original authors have moved on and the thing still ships on schedule."),
      UL([
        "Prefer the thing the largest number of people have already regretted.",
        "Evaluate a tool by the size of its oldest production survivors.",
        "Your team's occlusion costs more than any framework's inefficiency.",
        "Boring is not stagnation; it is maturity that survived the hype cycle.",
      ]),
      Q("The fastest stack in the world is the one your team already knows cold.", "Katali, the Boring Manifesto"),
      P("I still adopt new things — carefully, one at a time, with a rollback plan and an exit ticket. The goal is not to be the last to a trend. The goal is to be the first to a finished product, repeatedly, without drama."),
    ],
  },
  {
    slug: "on-finding-your-voice-in-public",
    title: "On Finding Your Voice in Public",
    description:
      "Impostor syndrome and the internet are a matched pair. A personal essay about writing more loudly, more often, and more kindly.",
    category: "culture",
    date: "2025-11-11",
    readTime: 6,
    tags: ["writing", "community", "career"],
    content: [
      P("I did not start this site because I had something important to say. I started it because I had spent years quietly absorbing other people's important things without once testing my own. Writing in public is the cheapest therapy the profession offers, and the most underused."),
      H2("Volume before polish"),
      P("The first two hundred posts are training data. You learn which ideas still hold at 11pm, which arguments survive a re-read, and which sentences are actually someone else's voice doing a very good impression of you. The polish comes after the volume, not before it."),
      OL([
        "Write badly and specifically. Specificity is the antidote to impostor syndrome.",
        "Publish the draft, then improve it in the open.",
        "Answer at least one real question per post.",
        "Read comments slowly and reply to the kind ones first.",
      ]),
      H2("Voice is a byproduct of repetition"),
      P("You do not discover a voice in a workshop; you surface it by refusing to stop. Mine arrived as exhaustion with the pose. The more I wrote, the less I needed to sound official, and the less I needed to sound official, the more the writing sounded like me sitting across a table from you."),
    ],
  },
  {
    slug: "field-notes-a-weekend-in-lake-naivasha",
    title: "Field Notes: A Weekend in Lake Naivasha",
    description:
      "Flat-calm water, papyrus birds, and the particular stillness of a place where the network drops out and nobody panics.",
    category: "travel",
    date: "2025-09-28",
    readTime: 5,
    tags: ["kenya", "essay", "slowness"],
    content: [
      P("Ninety minutes north of Nairobi, the city's infinite feed gives way to flat-calm water and the rustle of papyrus. Lake Naivasha does not advertise; it simply waits. The weekend board decided for me: no notifications, no deadlines, just a boat to the crescent island and lunch that arrives when the fish is ready."),
      H2("The ratio of sky to screen"),
      P("I have started keeping a slowness ledger. Recomputed on every trip, it is the ratio of hours spent looking at distance to hours spent looking at rectangles. Naivasha scores absurdly well. The birds are ferocious and indifferent. The hippos keep their own schedule. The internet, out here, is a rumor."),
      Q("You cannot troubleshoot a feeling. You can only row somewhere quiet and let it surface.", "from the field notebook"),
      P("I came home with the usual cargo of photographs and exactly one paragraph of analysis. The paragraph is better than my last month of drafts. Distance, it turns out, is an editor too."),
    ],
  },
  {
    slug: "the-tyranny-of-the-infinite-feed",
    title: "The Tyranny of the Infinite Feed",
    description:
      "Endless scroll is not a feature, it is an architecture of avoidance. Why I installed brakes on the internet and started reading like it was 2010.",
    category: "culture",
    date: "2025-08-09",
    readTime: 6,
    tags: ["attention", "internet", "essay"],
    content: [
      P("The infinite feed is a tool lovingly calibrated to keep you from the thing you meant to look up. Its cruelty is its politeness: it never runs out, never says no, never once asks what you came for. I stopped being able to feel the difference between one refreshing and the next, which is precisely when the design becomes architecture."),
      H2("Brakes on purpose"),
      P("I removed the apps first, then the bookmarks, then the muscle memory. In their place I built something old-fashioned: a queue of saved pieces, a browser that defaults to quiet, and a rule that the feed only exists between nine and ten in the morning, after which it is closed for the day like a shop with better boundaries than me."),
      UL([
        "Subscribe to the people, not the platform.",
        "Batch. The feed binge is easier to resist weekly than hourly.",
        "Read the long version. Every hot take has a patient ancestor.",
        "Make leaving feel like liberation, because it is.",
      ]),
      P("The first week was withdrawal. The second week, my drafts got longer. By the third week I understood the trade completely: I was trading engagement for attention, and attention is the only resource this career actually runs on."),
    ],
  },
  {
    slug: "notes-on-building-a-personal-knowledge-system",
    title: "Notes on Building a Personal Knowledge System",
    description:
      "No fancy tools. Just a folder, a naming convention, and the discipline of writing your future self a mail you will actually read.",
    category: "practice",
    date: "2026-03-15",
    readTime: 7,
    tags: ["notes", "workflow", "productivity"],
    content: [
      P("The internet will sell you a knowledge system on a subscription. I built mine out of a folder and a naming convention, and it outperforms every tool I've abandoned. The insight is embarrassing in its simplicity: the system is only as good as the question you ask it, and the question is only as good as the notes you actually wrote down."),
      H2("Capture close to the moment"),
      P("Ideas are perishable. I keep a single scratch pad with a date stamp, and once a week I sort the survivors into long-form notes. The magic is not the organization; the magic is the sorting, because sorting forces a decision about whether the thought deserved the walk home."),
      UL([
        "One folder, flat names, dated. Search is overrated; memory starts with structure.",
        "Write the note for a stranger who shares your context.",
        "Link by hand. The links you type yourself carry reasoning.",
        "Re-read quarterly. A system that is never revisited is a hoard.",
      ]),
      CALLOUT("The real test", "If you cannot find the note for the thing you remember writing, the system has failed the only test that matters."),
      P("Most of this journal begins as a note that survived the sorting. The system, in the end, is not a place where knowledge lives. It is a habit that keeps knowledge moving — from the moment into the note, from the note into the post, from the post into the person it was always meant to find."),
    ],
  },
  {
    slug: "accessibility-is-a-performance-budget",
    title: "Accessibility Is a Performance Budget",
    description:
      "Screen readers and slow phones are the same sentence. A practical case for treating a11y like the performance constraint it always was.",
    category: "design",
    date: "2026-02-01",
    readTime: 6,
    tags: ["a11y", "performance", "ethics"],
    content: [
      P("When I audit a page, I run the same two checks back to back: the network throttler and the screen reader. They keep agreeing with each other, and that agreement taught me everything: the people who pay the highest price for a heavy, unlabeled page are disproportionately the same people who pay the highest price for a slow one."),
      H2("Same table, same bill"),
      P("A client that requires JavaScript to render its text is a client that requires the internet to have gone well. A button that is a div requires a visitor to guess. Accessibility and performance are not chores bolted onto design; they are the design, seen honestly from the load side and the preference side of the same coin."),
      UL([
        "Semantic order is the wireframe for everyone.",
        "Contrast is legibility; treat it as a palette constraint, not an afterthought.",
        "Announce loading and errors; silence confuses twice.",
        "Design the keyboard journey before the mouse journey.",
      ]),
      Q("The gap between a site that works for everyone and a site that works only for me is exactly the distance between craft and decoration.", "Katali, principles for building"),
      P("Craft is not the flourish; it is the floor. Build the floor first, and the rest of the room gets to stand on something honest."),
    ],
  },
  {
    slug: "slow-food-fast-code-lessons-from-the-kitchen",
    title: "Slow Food, Fast Code: Lessons from the Kitchen",
    description:
      "Sous vide as a deployment strategy. Mise en place as a refactor. What a weekend of cooking taught me about running services people depend on.",
    category: "practice",
    date: "2025-10-03",
    readTime: 5,
    tags: ["metaphor", "ops", "reflection"],
    content: [
      P("My grandmother used to say that a kitchen is a small office where the deadlines are edible. Watching her cook taught me more about reliable systems than any postmortem: the mise en place before the heat, the low flame that never surprises, the taste that checks the pipeline long before the final plate."),
      H2("Mise en place is a refactor"),
      P("Everything measured, chopped, and staged before the pan heats up is a system designed for calm under load. Cue flux in production and the difference between a calm kitchen and a panicking one is preparation done when nobody was watching."),
      UL([
        "Stage the work: prep, deploy, verify. Never combine two risky steps.",
        "Slow the busy path down to speed the whole service up.",
        "Taste constantly — observability is seasoning, not garnish.",
        "When it burns, eat the lesson but not the dish.",
      ]),
      H2("The low flame that never surprises"),
      P("Most incidents I have caused came from dialing the heat up. The most admired operators I know are not the ones who moved fastest; they are the ones who moved predictably, at a temperature the whole system could tolerate. Slow food, fast code — the speed is in the absence of chaos, not in the absence of patience."),
    ],
  },
  {
    slug: "shipping-small-a-manifesto-for-indie-builders",
    title: "Shipping Small: A Manifesto for Indie Builders",
    description:
      "The roadmaps are the trap. The tiny, boring, finished product is the moat. Why small might be the only sustainable strategy left.",
    category: "product",
    date: "2025-07-19",
    readTime: 7,
    tags: ["indie", "business", "strategy"],
    content: [
      P("Every ambitious product starts as a slide with three pillars and a roadmap. Every finished product I've been proud of started as a single page nobody believed was enough. Small is not the consolation prize of indie building; small is the strategy."),
      H2("The moat is the finish line"),
      P("A tool that exists, does one thing, and does it with embarrassing reliability defeats a platform that promises five things and delivers none on a good day. The moat in the long tail is not features; it is the boring unglamorous act of being done."),
      OL([
        "Scope the smallest thing your sharpest user would pay attention to.",
        "Ship it this month. A finished three-week product beats a perfect three-year one.",
        "Listen to the complaints about the tiny tool; they are the roadmap, debranded.",
        "Charge money early. Revenue is the most honest form of community.",
      ]),
      Q("Promises scale; delivery compounds. Build the thing that is true today.", "the Shipping Small notes"),
      P("I keep a file called 'the small list' with every grand idea that woke me at 3am. Most of them are still there, alive and unlaunched and perfectly fine. The ideas I shipped — the small ones — are the ones people actually use, and they are the only ones that ever paid rent."),
    ],
  },
];

export const FEATURED = POSTS.filter((p) => p.featured);
export const LATEST = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

export const bySlug = (slug) => POSTS.find((p) => p.slug === slug);
export const postsByCategory = (slug) =>
  slug === "all" ? POSTS : POSTS.filter((p) => p.category === slug);

export const related = (post, n = 3) =>
  POSTS.filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const score = (x) =>
        (x.category === post.category ? 4 : 0) +
        x.tags.filter((t) => post.tags.includes(t)).length;
      return score(b) - score(a);
    })
    .slice(0, n);

export const searchPosts = (query) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return POSTS.filter((p) =>
    [p.title, p.description, p.category, ...p.tags, contentToText(p)].join(" ").toLowerCase().includes(q)
  ).sort((a, b) => a.date.localeCompare(b.date));
};

const contentToText = (p) =>
  p.content
    .map((b) => {
      if (b.type === "p" || b.type === "h2" || b.type === "h3" || b.type === "quote") return b.text;
      if (b.type === "ul" || b.type === "ol") return b.items.join(" ");
      if (b.type === "callout") return `${b.title} ${b.text}`;
      return "";
    })
    .join(" ");

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const COVER_BY_SLUG = {
  "the-quiet-discipline-of-a-personal-website":
    "images/covers/the-quiet-discipline-of-a-personal-website.jpg",
  "what-moving-to-nairobi-taught-me-about-latency":
    "images/covers/what-moving-to-nairobi-taught-me-about-latency.jpg",
  "designing-for-slow-connections":
    "images/covers/designing-for-slow-connections.jpg",
  "why-i-write-my-own-css-instead-of-a-framework":
    "images/covers/why-i-write-my-own-css-instead-of-a-framework.jpg",
  "the-case-for-boring-technology":
    "images/covers/the-case-for-boring-technology.jpg",
  "on-finding-your-voice-in-public":
    "images/covers/on-finding-your-voice-in-public.jpg",
  "field-notes-a-weekend-in-lake-naivasha":
    "images/covers/field-notes-a-weekend-in-lake-naivasha.jpg",
  "the-tyranny-of-the-infinite-feed":
    "images/covers/the-tyranny-of-the-infinite-feed.jpg",
  "notes-on-building-a-personal-knowledge-system":
    "images/covers/notes-on-building-a-personal-knowledge-system.jpg",
  "accessibility-is-a-performance-budget":
    "images/covers/accessibility-is-a-performance-budget.jpg",
  "slow-food-fast-code-lessons-from-the-kitchen":
    "images/covers/slow-food-fast-code-lessons-from-the-kitchen.jpg",
  "shipping-small-a-manifesto-for-indie-builders":
    "images/covers/shipping-small-a-manifesto-for-indie-builders.jpg",
};

export const coverFor = (slug) => COVER_BY_SLUG[slug] ?? null;

export const GALLERY = POSTS.map((p) => ({
  slug: p.slug,
  title: p.title,
  category: categoryMeta(p.category).label,
  tint: categoryMeta(p.category).tint,
  date: formatDate(p.date),
  src: coverFor(p.slug),
})).filter((g) => g.src);