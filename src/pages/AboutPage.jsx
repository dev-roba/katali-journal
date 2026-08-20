import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Camera, Coffee, Code2 } from "lucide-react";
import { LATEST, SITE, formatDate } from "../data/posts";
import { AuthorBio } from "../components/PostProse";
import { RowCard } from "../components/PostCard";

const PRINCIPLES = [
  {
    icon: Code2,
    title: "Small, careful systems",
    body: "The best software I've built is the kind a single person can hold in their head. I prize legibility, honest dependencies, and code that has a biography.",
  },
  {
    icon: Camera,
    title: "Field notes over feeds",
    body: "I write from fact, not trend. Essays here start as notebook scraps — a failed deploy, a slow highway, a dish that taught me caching. Time between note and post is a feature.",
  },
  {
    icon: Coffee,
    title: "The long version",
    body: "A hot take is a paragraph with ambitions. I try to write the patient ancestor: argued, hedged, useful in six months. Fast enough to read, slow enough to trust.",
  },
];

const TIMELINE = [
  {
    year: "2018",
    label: "First commit",
    body: "Wrote my first real program in a shared Nairobi internet café on a metered connection — a lesson in efficiency that never left.",
  },
  {
    year: "2021",
    label: "Built for ships and ships",
    body: "Senior engineering around payment infrastructure: when every millisecond is someone's salary, performance becomes personal.",
  },
  {
    year: "2024",
    label: "The notebook era",
    body: "Started keeping public field notes. This journal is the grown-up version of that notebook.",
  },
  {
    year: "Today",
    label: "Here, mostly",
    body: "Building small ambitious things, teaching when asked, and writing here as the thoughts come together.",
  },
];

export default function AboutPage() {
  return (
    <>
      <header className="noise relative overflow-hidden border-b border-paper/10">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-ochre/10 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-teal/10 blur-3xl" />
        </div>
        <div className="container-x relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-ochre/60" aria-hidden="true" />
              About the author
            </p>
            <h1 className="serif text-4xl font-semibold leading-[1.08] tracking-tight text-balance text-paper sm:text-6xl">
              Someone who keeps passing the slowest way of doing things.
            </h1>
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4 text-ochre" aria-hidden="true" /> {SITE.author.location}
              </span>
              <span>Software engineering · writing · field notes</span>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-56 sm:w-64">
              <div aria-hidden="true" className="absolute -inset-4 rounded-[2.5rem] bg-ochre/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-paper/15 bg-ink-soft">
                <img
                  src={SITE.author.avatar}
                  alt={`Portrait of ${SITE.author.name}`}
                  width={413}
                  height={531}
                  decoding="async"
                  className="aspect-[3/4] w-full object-cover object-top"
                />
              </div>
              <p className="serif mt-4 text-center text-sm italic text-faint">
                “Nameless mountain, somewhere warm.”
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="container-x py-16 sm:py-20" aria-label="About the writer">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-paper/90">
              I'm <span className="font-semibold">{SITE.author.name}</span>, a
              software engineer living and working in Nairobi. I build payment
              systems, design tools, and small internet things that people lean
              on — and I write about the craft of doing all of it without
              drama.
            </p>
            <p className="mt-5 leading-relaxed text-muted">
              This journal exists for the essays that don't fit in a commit
              message: why a personal website is a discipline, what two hundred
              milliseconds of latency teaches you about design, and what a lake
              ninety minutes from a capital city can do for an attention span
              that has been fed too long by feeds. You'll find writing about
              engineering, design, culture, travel, and the practice of making
              things carefully.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {PRINCIPLES.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-paper/10 bg-ink-soft p-5"
                >
                  <p.icon className="size-5 text-ochre" aria-hidden="true" />
                  <h3 className="serif mt-4 font-semibold text-paper">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              ))}
            </div>

            <h2 className="serif mt-14 text-2xl font-semibold text-paper sm:text-3xl">
              A short timeline
            </h2>
            <ol className="mt-8 space-y-8 border-l border-paper/15 pl-6">
              {TIMELINE.map((t) => (
                <li key={t.year} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[1.72rem] top-1.5 size-2.5 rounded-full border border-ochre bg-ink"
                  />
                  <p className="text-xs font-semibold uppercase tracking-widest text-ochre">{t.year}</p>
                  <h3 className="serif mt-1 font-semibold text-paper">{t.label}</h3>
                  <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted">{t.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <aside className="lg:col-span-5">
            <div className="space-y-8 lg:sticky lg:top-24">
              <AuthorBio />
              <div>
                <h2 className="eyebrow mb-5">Recent writing</h2>
                <div className="max-w-md">
                  {LATEST.slice(0, 3).map((post) => (
                    <RowCard key={post.slug} post={post} />
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-paper/10 bg-ink-soft p-6">
                <p className="eyebrow mb-3">Work with me</p>
                <p className="text-sm leading-relaxed text-muted">
                  I take on a small number of performance, reliability, and
                  design-engineering engagements each quarter — and I read every
                  email about this journal.
                </p>
                <Link
                  to="/contact"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-ochre px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ochre-deep hover:text-paper"
                >
                  Start a conversation <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}