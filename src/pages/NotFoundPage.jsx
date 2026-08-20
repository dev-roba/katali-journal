import { Link } from "react-router-dom";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFoundPage() {
  return (
    <section className="noise relative flex min-h-[62vh] items-center justify-center overflow-hidden border-b border-paper/10">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ochre/10 blur-3xl" />
      </div>
      <div className="container-x relative py-24 text-center">
        <FileQuestion className="mx-auto size-10 text-ochre" aria-hidden="true" />
        <p className="eyebrow mt-6">404 — page not found</p>
        <h1 className="serif mt-4 text-5xl font-semibold tracking-tight text-balance text-paper sm:text-7xl">
          This page wandered off the grid.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted sm:text-base">
          The essay you're after may have been renamed, merged, or — more
          likely — never written. The front page is a good place to reconnect.
        </p>
        <Link
          to="/"
          className="mt-9 inline-flex h-12 items-center gap-2 rounded-full bg-ochre px-7 text-sm font-semibold text-ink transition-colors hover:bg-ochre-deep hover:text-paper"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> Back to the journal
        </Link>
      </div>
    </section>
  );
}