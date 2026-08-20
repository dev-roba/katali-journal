import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Compass, Feather, Globe2, ListOrdered } from "lucide-react";
import { CATEGORIES, FEATURED, LATEST, SITE, formatDate, categoryMeta } from "../data/posts";
import { PostCard, CategoryTag } from "../components/PostCard";
import { AuthorBio } from "../components/PostProse";
import Cover from "../components/Cover";

function Hero() {
  const lead = LATEST[0];
  return (
    <section className="noise relative overflow-hidden border-b border-paper/10">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[36rem] w-[64rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-ochre/10 blur-3xl" />
        <div className="absolute -right-40 top-40 h-96 w-96 rounded-full bg-lilac/10 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-teal/10 blur-3xl" />
      </div>

      <div className="container-x relative py-20 sm:py-28 lg:py-32">
        <p className="eyebrow mb-6 flex items-center gap-3">
          <span className="h-px w-10 bg-ochre/60" aria-hidden="true" />
          A personal journal · est. 2025
        </p>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-8">
            <h1 className="serif text-4xl font-semibold leading-[1.05] tracking-tight text-balance text-paper sm:text-6xl lg:text-7xl">
              Essays on craft, code,{" "}
              <em className="font-serif italic text-ochre">and the spaces</em>{" "}
              between.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Written slowly, from Nairobi. Notes on software, design, attention,
              and the long way around — for readers who still like the long
              version.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={SITE.author.avatar}
                  alt={`Portrait of ${SITE.author.name}`}
                  width={56}
                  height={72}
                  className="size-14 rounded-full border-2 border-ochre/50 object-cover object-top"
                />
                <div className="text-sm leading-tight">
                  <p className="font-semibold text-paper">{SITE.author.name}</p>
                  <p className="text-faint">{SITE.author.location}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Link
                  to={`/blog/${lead.slug}`}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-ochre px-6 text-sm font-semibold text-ink transition-colors hover:bg-ochre-deep hover:text-paper"
                >
                  Read the latest essay <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-paper/20 px-6 text-sm font-medium text-paper transition-colors hover:border-ochre/60 hover:text-ochre"
                >
                  About the author
                </Link>
              </div>
            </div>

            <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-xs tracking-wide text-faint">
              <li className="inline-flex items-center gap-2"><Feather className="size-3.5 text-ochre" aria-hidden="true" /> {LATEST.length} essays in the archive</li>
              <li className="inline-flex items-center gap-2"><Globe2 className="size-3.5 text-ochre" aria-hidden="true" /> One writer, one city</li>
              <li className="inline-flex items-center gap-2"><ListOrdered className="size-3.5 text-ochre" aria-hidden="true" /> Long-form only</li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <Link
              to={`/blog/${lead.slug}`}
              className="group relative block overflow-hidden rounded-3xl border border-paper/10 bg-ink-soft"
              aria-label={`Featured: ${lead.title}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Cover
                  slug={lead.slug}
                  category={lead.category}
                  title={lead.title}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" aria-hidden="true" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="eyebrow mb-2">Latest essay</p>
                <h2 className="serif text-xl font-semibold leading-snug text-balance text-paper">
                  {lead.title}
                </h2>
                <p className="mt-2 text-xs text-muted">
                  {formatDate(lead.date)} · {lead.readTime} min read
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const FeaturedSection = () => {
  const [first, ...rest] = FEATURED;
  return (
    <section className="container-x py-16 sm:py-20" aria-labelledby="featured-heading">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow mb-3">Curated for new readers</p>
          <h2 id="featured-heading" className="serif text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
            Featured essays
          </h2>
        </div>
        <Link
          to="/search"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ochre"
        >
          Browse everything <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="group relative overflow-hidden rounded-3xl border border-paper/10 bg-ink-soft lg:row-span-2">
          <Link to={`/blog/${first.slug}`} className="flex h-full flex-col" aria-label={first.title}>
            <div className="relative aspect-[16/11] overflow-hidden">
              <Cover
                slug={first.slug}
                category={first.category}
                title={first.title}
                className="transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" aria-hidden="true" />
              <span className="absolute left-5 top-5 rounded-full bg-ochre px-3 py-1 text-xs font-semibold text-ink">
                Editor's pick
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-7 sm:p-8">
              <div className="flex items-center gap-2.5">
                <CategoryTag category={first.category} link={false} />
                <span className="text-xs text-faint">·</span>
                <time dateTime={first.date} className="text-xs text-faint">{formatDate(first.date)}</time>
                <span className="text-xs text-faint">· {first.readTime} min read</span>
              </div>
              <h3 className="serif text-3xl font-semibold leading-tight text-balance text-paper sm:text-4xl">
                {first.title}
              </h3>
              <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">{first.description}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-medium text-ochre">
                Read the essay <ArrowUpRight className="size-4" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </article>

        {rest.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}

function LatestSection() {
  const latest = LATEST.filter((p) => !p.featured).slice(0, 6);
  return (
    <section className="border-t border-paper/10 bg-ink-soft/40" aria-labelledby="latest-heading">
      <div className="container-x py-16 sm:py-20">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-3">The archive grows</p>
            <h2 id="latest-heading" className="serif text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
              Latest essays
            </h2>
          </div>
          <Link
            to="/category/all"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ochre"
          >
            Index of everything <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="grid gap-6 sm:grid-cols-2">
              {latest.concat(latest.slice(0, 2)).slice(0, 6).map((post) => (
                <PostCard key={`${post.slug}-${post.date}`} post={post} />
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-paper/10 bg-ink-soft p-6">
              <p className="eyebrow mb-5">Browse by category</p>
              <ul className="space-y-1">
                {CATEGORIES.filter((c) => c.slug !== "all").map((c) => (
                  <li key={c.slug}>
                    <Link
                      to={`/category/${c.slug}`}
                      className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-ochre/10 hover:text-paper"
                    >
                      <span className="inline-flex items-center gap-3">
                        <span className="size-2 rounded-full" style={{ backgroundColor: `var(${c.tint})` }} aria-hidden="true" />
                        {c.label}
                      </span>
                      <ArrowRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <AuthorBio />
          </aside>
        </div>
      </div>
    </section>
  );
}

function FieldNotesBand() {
  const travel = LATEST.find((p) => p.category === "travel");
  return (
    <section className="container-x py-16 sm:py-20" aria-labelledby="field-heading">
      <div className="relative overflow-hidden rounded-3xl border border-paper/10 bg-soot">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-64 lg:min-h-full">
            <Cover slug={travel?.slug ?? "field-notes"} category="travel" title="Field Notes" className="h-full" />
          </div>
          <div className="noise relative flex flex-col justify-center gap-6 p-8 sm:p-12">
            <p className="eyebrow flex items-center gap-2">
              <Compass className="size-4" aria-hidden="true" />
              Field notes
            </p>
            <h2 id="field-heading" className="serif text-3xl font-semibold leading-tight text-balance text-paper sm:text-4xl">
              The slowest writing comes from moving around.
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              Weekend dispatches, notebook scraps, and distances measured in
              windows instead of wall clocks. Mostly from the Rift Valley, when
              the network allows.
            </p>
            <Link
              to="/category/travel"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-ochre px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ochre-deep hover:text-paper"
            >
              Read field notes <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedSection />
      <LatestSection />
      <FieldNotesBand />
    </>
  );
}