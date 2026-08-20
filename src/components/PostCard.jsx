import { Link } from "react-router-dom";
import { Clock3, ArrowUpRight } from "lucide-react";
import Cover from "./Cover";
import { categoryMeta, formatDate } from "../data/posts";

export function CategoryTag({ category, className = "", link = true }) {
  const meta = categoryMeta(category);
  const inner = (
    <>
      <span
        className="size-1.5 rounded-full"
        style={{ backgroundColor: `var(${meta.tint})` }}
        aria-hidden="true"
      />
      {meta.label}
    </>
  );
  if (!link) return <span className={`inline-flex items-center gap-2 text-xs font-medium tracking-wide text-muted ${className}`}>{inner}</span>;
  return (
    <Link
      to={`/category/${category}`}
      className={`inline-flex items-center gap-2 text-xs font-medium tracking-wide text-muted hover:text-paper transition-colors ${className}`}
    >
      {inner}
    </Link>
  );
}

export function PostCard({ post, featured = false, eager = false }) {
  return (
    <article
      className={
        featured
          ? "group relative flex flex-col overflow-hidden rounded-2xl border border-paper/10 bg-ink-soft transition-colors duration-300 hover:border-paper/20"
          : "group relative flex flex-col overflow-hidden rounded-2xl border border-paper/10 bg-ink-soft transition-colors duration-300 hover:border-paper/20"
      }
    >
      <Link
        to={`/blog/${post.slug}`}
        className="flex h-full flex-col focus-visible:outline-none"
        aria-label={post.title}
      >
        <div className="relative isolate aspect-[16/10] overflow-hidden">
          <Cover
            slug={post.slug}
            category={post.category}
            title={post.title}
            className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            eager={eager}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" aria-hidden="true" />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex items-center gap-2.5">
            <CategoryTag category={post.category} link={false} />
            <span className="text-xs text-faint">·</span>
            <time dateTime={post.date} className="text-xs text-faint">
              {formatDate(post.date)}
            </time>
          </div>
          <h3 className={`serif font-semibold leading-tight text-balance text-paper ${featured ? "text-2xl sm:text-[1.65rem]" : "text-xl"}`}>
            {post.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted">{post.description}</p>
          <div className="mt-auto flex items-center gap-4 pt-3 text-xs text-faint">
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="size-3.5" aria-hidden="true" />
              {post.readTime} min read
            </span>
            <span className="inline-flex items-center gap-1 font-medium text-ochre transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              Read the essay
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function RowCard({ post }) {
  return (
    <article className="group border-b border-paper/10 py-6 first:pt-0 last:border-0">
      <Link to={`/blog/${post.slug}`} className="flex gap-4 sm:gap-6" aria-label={post.title}>
        <div className="relative hidden w-28 shrink-0 overflow-hidden rounded-xl border border-paper/10 xs:block sm:w-40">
          <Cover
            slug={post.slug}
            category={post.category}
            title={post.title}
            className="aspect-[4/3] transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2.5">
            <CategoryTag category={post.category} link={false} />
            <span className="text-xs text-faint">·</span>
            <time dateTime={post.date} className="text-xs text-faint">
              {formatDate(post.date)}
              <span className="sr-only">, {post.readTime} min read</span>
            </time>
          </div>
          <h3 className="serif text-lg font-semibold leading-snug text-paper transition-colors group-hover:text-ochre sm:text-xl">
            {post.title}
          </h3>
          <p className="line-clamp-2 max-w-2xl text-sm text-muted">{post.description}</p>
        </div>
      </Link>
    </article>
  );
}