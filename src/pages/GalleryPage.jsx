import { Link } from "react-router-dom";
import { ArrowUpRight, Camera } from "lucide-react";
import { GALLERY, SITE } from "../data/posts";

export default function GalleryPage() {
  return (
    <>
      <header className="noise relative overflow-hidden border-b border-paper/10">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-sage/10 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-ochre/10 blur-3xl" />
        </div>
        <div className="container-x relative py-16 sm:py-20">
          <p className="eyebrow mb-4 flex items-center gap-2">
            <Camera className="size-4" aria-hidden="true" /> Field notes · photographs
          </p>
          <h1 className="serif text-4xl font-semibold tracking-tight text-balance text-paper sm:text-6xl">
            Pictures that wrote themselves into an essay.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Every essay in this journal has a photograph behind it — the desk,
            the lake, the kitchen, the road. Browse the contact sheets.
          </p>
        </div>
      </header>

      <section className="container-x py-12 sm:py-16" aria-label="Gallery">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
          <figure className="group relative overflow-hidden rounded-3xl border border-paper/10">
            <img
              src={SITE.author.avatar}
              alt={`Portrait of ${SITE.author.name}`}
              width={413}
              height={531}
              decoding="async"
              className="aspect-[3/4] w-full cursor-default object-cover object-top"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 to-transparent p-4 pt-12">
              <p className="serif text-sm font-semibold text-paper sm:text-base">The author at his desk</p>
              <p className="text-xs text-muted">{SITE.author.location}</p>
            </figcaption>
          </figure>

          {GALLERY.map((g, i) => (
            <figure
              key={g.slug}
              className={`group relative overflow-hidden rounded-3xl border border-paper/10 ${
                i === 0 || i === 5 ? "col-span-2" : ""
              }`}
            >
              <Link to={`/blog/${g.slug}`} className="block" aria-label={g.title}>
                <img
                  src={`/${g.src}`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="eyebrow mb-1.5" style={{ color: `var(${g.tint})` }}>
                    {g.category}
                  </p>
                  <p className="serif text-sm font-semibold leading-snug text-paper sm:text-base">
                    {g.title}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {g.date}
                    <ArrowUpRight className="ml-1 inline size-3.5 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                  </p>
                </figcaption>
              </Link>
            </figure>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-4 border-t border-paper/10 pt-8">
          <p className="text-sm text-faint">Each image links to the essay it belongs to.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ochre transition-colors hover:text-ochre-deep"
          >
            Back to the journal <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}