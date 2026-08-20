import { Link, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { categoryMeta, postsByCategory } from "../data/posts";
import { PostCard, RowCard } from "../components/PostCard";
import NotFoundPage from "./NotFoundPage";

export default function CategoryPage() {
  const { slug } = useParams();
  const meta = categoryMeta(slug);

  if (slug !== "all" && slug !== meta.slug) return <NotFoundPage />;

  const posts =
    slug === "all"
      ? [...postsByCategory("all")].sort(
          (a, b) => b.date.localeCompare(a.date)
        ) || []
      : postsByCategory(slug);

  const list = posts.length
    ? posts
    : (() => {
        const all = postsByCategory("all");
        return all.length ? all : [];
      })();

  return (
    <>
      <header className="noise relative overflow-hidden border-b border-paper/10">
        <div aria-hidden="true" className="absolute inset-0">
          <div
            className="absolute -right-24 -top-32 h-96 w-96 rounded-full blur-3xl"
            style={{ backgroundColor: `color-mix(in oklab, var(${meta.tint}) 18%, transparent)` }}
          />
        </div>
        <div className="container-x relative py-16 sm:py-20">
          <p className="eyebrow mb-4">The archive</p>
          <h1 className="serif text-4xl font-semibold tracking-tight text-balance text-paper sm:text-6xl">
            {slug === "all" ? "Every essay" : meta.label}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {slug === "all"
              ? "The complete archive, newest first. Slowly accrued, rarely deleted."
              : `${list.length} ${list.length === 1 ? "essay" : "essays"} filed under ${meta.label.toLowerCase()}.`}
          </p>
        </div>
      </header>

      <section className="container-x py-12 sm:py-16" aria-label={slug === "all" ? "All posts" : `${meta.label} posts`}>
        {list.length === 0 ? (
          <p className="text-muted">Nothing filed here yet — check back soon.</p>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {list.slice(0, Math.min(6, list.length)).map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>

            {list.length > 6 && (
              <div className="mx-auto mt-14 max-w-4xl" aria-label={slug === "all" ? "Older essays" : `Older ${meta.label} essays`}>
                <h2 className="eyebrow mb-2">Older essays in this category</h2>
                <div className="mt-4">
                  {list.slice(6).map((post) => (
                    <RowCard key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-paper/10 pt-8">
              <p className="text-sm text-faint">Keep exploring:</p>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ochre transition-colors hover:text-ochre-deep"
              >
                Back to the front page <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </>
        )}
      </section>
    </>
  );
}