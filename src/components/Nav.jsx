import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Search, Menu, X, ArrowRight, Sun, Moon } from "lucide-react";
import { CATEGORIES, SITE } from "../data/posts";

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved =
      typeof window !== "undefined" ? window.localStorage.getItem("theme") : null;
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia?.("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  });
  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    window.localStorage.setItem("theme", theme);
  }, [theme]);
  return [theme, setTheme];
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const [theme, setTheme] = useTheme();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearching(true);
        setTimeout(() => inputRef.current?.focus(), 30);
      }
      if (e.key === "Escape") {
        setSearching(false);
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (location.pathname === "/search" && params.get("q")) {
      setQuery(params.get("q"));
    }
    setSearching(location.pathname === "/search" && !!params.get("q"));
  }, [location.pathname, params]);

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : "/search");
  };

  const navLink = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-paper ${
      isActive ? "text-ochre" : "text-muted"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-paper/10 bg-ink/85 backdrop-blur-xl">
      <a
        href="#main"
        className="fixed left-4 top-4 z-[60] -translate-y-20 rounded-md bg-ochre px-4 py-2 text-sm font-semibold text-ink transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          className="group flex items-center gap-2.5 focus-visible:outline-none"
          aria-label={`${SITE.name} — home`}
        >
          <span className="grid size-9 place-items-center rounded-xl bg-ochre/15 font-serif text-lg font-bold text-ochre transition-colors group-hover:bg-ochre group-hover:text-ink">
            K
          </span>
          <span className="serif text-lg font-semibold tracking-tight text-paper">Katali Journal</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          <NavLink to="/" className={navLink} end>
            Home
          </NavLink>
          <NavLink to="/gallery" className={navLink}>
            Gallery
          </NavLink>
          <NavLink to="/about" className={navLink}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLink}>
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <form
            role="search"
            onSubmit={submitSearch}
            className={`relative transition-all duration-300 ${
              searching ? "w-56 sm:w-72" : "w-10"
            }`}
            aria-label="Search the journal"
          >
            <Search
              className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-faint"
              aria-hidden="true"
            />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSearching(true)}
              onBlur={() => {
                if (!query.trim()) setSearching(false);
              }}
              placeholder="Search essays…"
              aria-label="Search essays"
              className={`h-9 w-full rounded-full border border-paper/15 bg-ink-soft pl-8 pr-3 text-sm text-paper placeholder:text-faint focus:border-ochre/60 focus:outline-none transition-all ${
                searching ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            />
            <button
              type="button"
              onClick={() => setSearching((s) => !s)}
              aria-label={searching ? "Close search" : "Open search (Ctrl+K)"}
              className={`absolute right-1.5 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-faint transition-colors hover:text-paper ${
                searching ? "" : "left-1/2 -translate-x-1/2 border border-paper/15 bg-ink-soft"
              }`}
            >
              {searching ? <X className="size-4" aria-hidden="true" /> : <Search className="size-4" aria-hidden="true" />}
            </button>
          </form>

          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="hidden size-9 place-items-center rounded-full border border-paper/15 text-muted transition-colors hover:text-paper sm:grid"
          >
            {theme === "dark" ? <Sun className="size-4" aria-hidden="true" /> : <Moon className="size-4" aria-hidden="true" />}
          </button>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            className="grid size-9 place-items-center rounded-full border border-paper/15 text-paper lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`border-t border-paper/10 lg:hidden ${open ? "block" : "hidden"}`}
      >
        <nav aria-label="Mobile" className="container-x flex flex-col gap-1 py-4">
          {[{ to: "/", label: "Home", end: true }, ...CATEGORIES.filter((c) => c.slug !== "all").map((c) => ({ to: `/category/${c.slug}`, label: c.label })), { to: "/gallery", label: "Gallery" }, { to: "/about", label: "About" }, { to: "/contact", label: "Contact" }].map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive ? "bg-ochre/10 text-ochre" : "text-muted hover:text-paper"
                }`
              }
            >
              {l.label}
              <ArrowRight className="size-4 opacity-50" aria-hidden="true" />
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}