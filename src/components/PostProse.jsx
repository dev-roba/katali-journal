import { Link } from "react-router-dom";
import { SITE } from "../data/posts";

export default function PostProse({ post }) {
  return (
    <div className="[&>p]:mb-6 [&>p]:text-[1.05rem] [&>p]:leading-relaxed">
      {post.content.map((block, i) => {
        switch (block.type) {
          case "p":
            return <p key={i}>{block.text}</p>;
          case "h2":
            return (
              <h2
                key={i}
                id={`sec-${i}`}
                className="serif mt-12 mb-4 flex scroll-mt-24 items-center gap-3 text-2xl font-semibold tracking-tight text-paper sm:text-3xl"
              >
                <span aria-hidden="true" className="h-px w-8 bg-ochre/60" />
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="serif mt-8 mb-3 text-xl font-semibold text-paper">
                {block.text}
              </h3>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="relative my-10 border-l-2 border-ochre pl-6"
              >
                <p className="serif text-2xl font-medium leading-snug text-balance text-paper italic sm:text-[1.7rem]">
                  {block.text}
                </p>
                {block.cite && (
                  <footer className="mt-4 text-sm text-muted">— {block.cite}</footer>
                )}
              </blockquote>
            );
          case "callout":
            return (
              <aside
                key={i}
                className="my-8 rounded-2xl border border-ochre/25 bg-ochre/8 p-6"
              >
                <p className="eyebrow mb-2">{block.title}</p>
                <p className="text-sm leading-relaxed text-paper">{block.text}</p>
              </aside>
            );
          case "ul":
            return (
              <ul key={i} className="my-6 space-y-3 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[1.02rem] leading-relaxed">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-sm bg-ochre" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="my-6 space-y-3 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-4 text-[1.02rem] leading-relaxed">
                    <span className="serif shrink-0 font-bold text-ochre">
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export function AuthorBio({ compact = false }) {
  return (
    <div className="flex gap-5 rounded-2xl border border-paper/10 bg-ink-soft p-6 sm:p-7">
      <img
        src={SITE.author.avatar}
        alt={`Portrait of ${SITE.author.name}`}
        width={72}
        height={92}
        loading="lazy"
        className="size-[4.5rem] shrink-0 rounded-full border-2 border-ochre/40 object-cover object-top"
      />
      <div>
        <p className="text-sm font-semibold text-paper">{SITE.author.name}</p>
        <p className="text-xs text-faint"># {SITE.author.location}</p>
        {!compact && (
          <>
            <p className="mt-3 text-sm leading-relaxed text-muted">{SITE.author.bio}</p>
            <Link
              to="/about"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ochre transition-colors hover:text-ochre-deep"
            >
              Read the full story <span aria-hidden="true">→</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}