import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon, X } from "lucide-react";
import { searchPosts, LATEST } from "../data/posts";
import { PostCard, RowCard } from "../components/PostCard";

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const [input, setInput] = useState(q);
  const inputRef = useRef(null);
  const results = q ? searchPosts(q) : [];

  useEffect(() => {
    setInput(q);
    if (!q) inputRef.current?.focus();
  }, [q]);

  const submit = (e) => {
    e.preventDefault();
    setParams(input.trim() ? { q: input.trim() } : {});
  };

  return (
    <>
      <header className="noise relative overflow-hidden border-b border-paper/10">
        <div className="container-x relative max-w-3xl py-16 sm:py-20">
          <p className="eyebrow mb-4">Search the journal</p>
          <h1 className="serif text-4xl font-semibold tracking-tight text-paper sm:text-5xl">
            {q ? `Results for “${q}”` : "Find an essay"}
          </h1>

          <form
            role="search"
            onSubmit={submit}
            className="mt-8 flex w-full items-center gap-2 rounded-full border border-paper/15 bg-ink-soft px-5 transition-colors focus-within:border-ochre/60"
          >
            <SearchIcon className="size-4 shrink-0 text-faint" aria-hidden="true" />
            <label htmlFor="search-input" className="sr-only">Search essays</label>
            <input
              id="search-input"
              ref={inputRef}
              type="search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Try “latency”, “notes”, “Nairobi”…"
              className="h-14 flex-1 bg-transparent text-base text-paper placeholder:text-faint focus:outline-none"
            />
            {input && (
              <button
                type="button"
                onClick={() => {
                  setInput("");
                  inputRef.current?.focus();
                }}
                aria-label="Clear search"
                className="grid size-8 shrink-0 place-items-center rounded-full text-faint transition-colors hover:text-paper"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            )}
          </form>
        </div>
      </header>

      <section className="container-x max-w-5xl py-12 sm:py-16" aria-label="Search results">
        {q ? (
          results.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-paper/15 p-12 text-center">
              <p className="serif text-2xl font-semibold text-paper">Nothing matched that.</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                The archive is only a dozen essays deep, so try a wider word —
                or browse by category from the menu.
              </p>
            </div>
          ) : (
            <>
              <p className="mb-8 text-sm text-faint" role="status">
                {results.length} {results.length === 1 ? "result" : "results"}
                {q ? ` for “${q}”` : ""}
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                {results.slice(0, 4).map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
              {results.length > 4 && (
                <div className="mx-auto mt-12 max-w-3xl" aria-label="More search results">
                  {results.slice(4).map((post) => (
                    <RowCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </>
          )
        ) : (
          <div>
            <h2 className="eyebrow mb-6">Or start from the newest</h2>
            <div className="space-y-0 max-w-3xl">
              {LATEST.slice(0, 5).map((post) => (
                <RowCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}