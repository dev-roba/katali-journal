import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Mail, MapPin, Twitter, Github, Rss } from "lucide-react";
import { CATEGORIES, SITE } from "../data/posts";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="noise relative overflow-hidden rounded-3xl border border-paper/10 bg-soot px-6 py-12 sm:px-12 sm:py-16"
    >
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 size-72 rounded-full bg-ochre/15 blur-3xl"
      />
      <div className="relative mx-auto max-w-2xl text-center">
        <p className="eyebrow mb-4">The occasional letter</p>
        <h2
          id="newsletter-heading"
          className="serif text-3xl font-semibold leading-tight text-balance text-paper sm:text-4xl"
        >
          One essay, one note, once in a while
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          No feed, no firehose — just a short letter every few weeks when there's
          something worth the paper. Unsubscribe whenever you like.
        </p>
        {done ? (
          <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-ochre/40 bg-ochre/10 px-5 py-3 text-sm font-medium text-ochre" role="status">
            <Mail className="size-4" aria-hidden="true" /> You're on the list — see you in the next letter.
          </p>
        ) : (
          <form
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) setDone(true);
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-12 flex-1 rounded-full border border-paper/15 bg-ink px-5 text-sm text-paper placeholder:text-faint focus:border-ochre/60 focus:outline-none"
            />
            <button
              type="submit"
              className="h-12 rounded-full bg-ochre px-6 text-sm font-semibold text-ink transition-colors hover:bg-ochre-deep hover:text-paper"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-paper/10">
      <div className="container-x py-14">
        <Newsletter />
        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-2.5" aria-label="Home">
              <span className="grid size-9 place-items-center rounded-xl bg-ochre/15 font-serif text-lg font-bold text-ochre">
                K
              </span>
              <span className="serif text-lg font-semibold text-paper">Katali Journal</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {SITE.tagline}. Written slowly, from Nairobi, for readers who still
              like the long version.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-faint">
              <MapPin className="size-4" aria-hidden="true" /> Nairobi, Kenya · {year}
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { href: "https://twitter.com", label: "Twitter", icon: Twitter },
                { href: "https://github.com", label: "GitHub", icon: Github },
                { href: "/posts/rss.xml", label: "RSS feed", icon: Rss },
                { href: "mailto:hello@katalijournal.example", label: "Email", icon: Mail },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-full border border-paper/15 text-muted transition-colors hover:border-ochre/50 hover:text-ochre"
                >
                  <s.icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Categories" className="md:col-span-3">
            <h3 className="eyebrow mb-4">Categories</h3>
            <ul className="space-y-2.5">
              {CATEGORIES.filter((c) => c.slug !== "all").map((c) => (
                <li key={c.slug}>
                  <Link to={`/category/${c.slug}`} className="link-underline text-sm text-muted transition-colors hover:text-paper">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Navigate" className="md:col-span-2">
            <h3 className="eyebrow mb-4">Navigate</h3>
            <ul className="space-y-2.5">
              {[
                { to: "/", label: "Home" },
                { to: "/gallery", label: "Gallery" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
                { to: "/search", label: "Search" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="link-underline text-sm text-muted transition-colors hover:text-paper">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h3 className="eyebrow mb-4">Colophon</h3>
            <p className="text-sm leading-relaxed text-muted">
              Built by hand with React & Tailwind. No trackers, no ad scripts — just
              type and a few kilobytes of CSS.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-paper/10 pt-8 sm:flex-row">
          <p className="text-xs text-faint">
            © {year} Karim Katali. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-paper"
            aria-label="Back to top"
          >
            Back to top <ArrowUp className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}