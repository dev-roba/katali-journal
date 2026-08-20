import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock3, Tag as TagIcon } from "lucide-react";
import { bySlug, related, formatDate, SITE, POSTS } from "../data/posts";
import PostProse, { AuthorBio } from "../components/PostProse";
import { PostCard, CategoryTag } from "../components/PostCard";
import Cover from "../components/Cover";
import NotFoundPage from "./NotFoundPage";

export default function PostPage() {
  const { slug } = useParams();
  const post = bySlug(slug);

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  if (!post) return <NotFoundPage />;

  const ordered = [...POSTS].sort((a, b) => a.date.localeCompare(b.date));
  const idx = ordered.findIndex((p) => p.slug === post.slug);
  const older = idx > 0 ? ordered[idx - 1] : null;
  const newer = idx < ordered.length - 1 ? ordered[idx + 1] : null;

  const relatedPosts = related(post, 3);
  const toc = post.content
    .map((b, i) => (b.type === "h2" ? { i, text: b.text } : null))
    .filter(Boolean);

  return (
    <article>
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-ochre/20"
      >
        <div
          className="h-full bg-ochre"
          style={{ width: `${progress}%` }}
        />
      </div>
      <header className="noise relative overflow-hidden border-b border-paper/10">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute left-1/2 top-[-10rem] h-[26rem] w-[50rem] -translate-x-1/2 rounded-full bg-ochre/10 blur-3xl" />
        </div>
        <div className="container-x relative max-w-4xl py-14 sm:py-20">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ochre"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> Back to the journal
          </Link>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <CategoryTag category={post.category} />
            <span className="text-faint">·</span>
            <time dateTime={post.date} className="text-sm text-faint">{formatDate(post.date)}</time>
            <span className="inline-flex items-center gap-1.5 text-sm text-faint">
              <Clock3 className="size-4" aria-hidden="true" /> {post.readTime} min read
            </span>
          </div>

          <h1 className="serif mt-5 text-4xl font-semibold leading-[1.08] tracking-tight text-balance text-paper sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {post.description}
          </p>

          <div className="mt-9 flex items-center gap-3 border-t border-paper/10 pt-6">
            <img
              src={SITE.author.avatar}
              alt={SITE.author.name}
              width={44}
              height={56}
              loading="lazy"
              className="size-11 rounded-full border-2 border-ochre/40 object-cover object-top"
            />
            <div className="text-sm leading-tight">
              <p className="font-semibold text-paper">{SITE.author.name}</p>
              <p className="text-faint">{SITE.author.role}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container-x max-w-4xl py-10 sm:py-14">
        <div className="relative aspect-[16/7] overflow-hidden rounded-3xl border border-paper/10 sm:aspect-[16/6]">
          <Cover slug={post.slug} category={post.category} title={post.title} />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <PostProse post={post} />

            <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-paper/10 pt-8">
              <TagIcon className="size-4 text-faint" aria-hidden="true" />
              {post.tags.map((t) => (
                <Link
                  key={t}
                  to={`/search?q=${encodeURIComponent(t)}`}
                  className="rounded-full border border-paper/15 px-3 py-1 text-xs text-muted transition-colors hover:border-ochre/50 hover:text-ochre"
                >
                  #{t}
                </Link>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-24">
              {toc.length > 0 && (
                <nav aria-label="Within this essay" className="rounded-2xl border border-paper/10 bg-ink-soft p-6">
                  <h2 className="eyebrow mb-4">On this page</h2>
                  <ol className="space-y-2.5">
                    {toc.map((t) => (
                      <li key={t.i}>
                        <a
                          href={`#sec-${t.i}`}
                          className="group flex items-baseline gap-3 text-sm text-muted transition-colors hover:text-ochre"
                        >
                          <span className="text-xs text-ochre/70" aria-hidden="true">
                            {String(t.i + 1).padStart(2, "0")}
                          </span>
                          {t.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
              <AuthorBio compact />
              <nav aria-label="More essays">
                <h2 className="eyebrow mb-4">Read on</h2>
                <ul className="space-y-4">
                  {relatedPosts.map((p) => (
                    <li key={p.slug}>
                      <Link
                        to={`/blog/${p.slug}`}
                        className="group flex gap-3 text-sm leading-snug"
                      >
                        <div className="relative w-16 shrink-0 overflow-hidden rounded-lg border border-paper/10">
                          <Cover slug={p.slug} category={p.category} title={p.title} className="aspect-square" />
                        </div>
                        <span className="pt-0.5 text-muted transition-colors group-hover:text-ochre">
                          {p.title}
                          <span className="mt-1 block text-xs text-faint">
                            {formatDate(p.date)} · {p.readTime} min
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <Link
                to="/category/all"
                className="inline-flex items-center gap-2 text-sm font-medium text-ochre transition-colors hover:text-ochre-deep"
              >
                The whole archive <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>

        {(older || newer) && (
          <nav
            aria-label="Adjacent essays"
            className="mt-20 grid gap-4 border-t border-paper/10 pt-12 sm:grid-cols-2"
          >
            {older ? (
              <Link
                to={`/blog/${older.slug}`}
                className="group flex flex-col gap-2 rounded-2xl border border-paper/10 bg-ink-soft p-6 transition-colors hover:border-ochre/40"
              >
                <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-faint">
                  <ArrowLeft className="size-3.5" aria-hidden="true" /> Earlier
                </span>
                <span className="serif font-semibold leading-snug text-paper transition-colors group-hover:text-ochre">
                  {older.title}
                </span>
                <span className="text-xs text-faint">{formatDate(older.date)}</span>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
            {newer ? (
              <Link
                to={`/blog/${newer.slug}`}
                className="group flex flex-col items-start gap-2 rounded-2xl border border-paper/10 bg-ink-soft p-6 text-right transition-colors hover:border-ochre/40 sm:items-end"
              >
                <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-faint">
                  Later <ArrowRight className="size-3.5" aria-hidden="true" />
                </span>
                <span className="serif font-semibold leading-snug text-paper transition-colors group-hover:text-ochre">
                  {newer.title}
                </span>
                <span className="text-xs text-faint">{formatDate(newer.date)}</span>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
          </nav>
        )}

        {relatedPosts.length > 0 && (
          <section className="mt-20 border-t border-paper/10 pt-12" aria-labelledby="related-heading">
            <h2 id="related-heading" className="serif mb-8 text-2xl font-semibold text-paper sm:text-3xl">
              If you liked this one
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {relatedPosts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}