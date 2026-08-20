import { useState } from "react";
import { Mail, MapPin, Twitter, Github, Send, CheckCircle2 } from "lucide-react";

const CHANNELS = [
  { icon: Mail, label: "Email", value: "hello@katalijournal.example", href: "mailto:hello@katalijournal.example" },
  { icon: MapPin, label: "Based in", value: "Nairobi, Kenya", href: null },
  { icon: Twitter, label: "Elsewhere", value: "@katali", href: "https://twitter.com" },
  { icon: Github, label: "Code", value: "github.com/katali", href: "https://github.com" },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <header className="noise relative overflow-hidden border-b border-paper/10">
        <div className="container-x relative py-16 sm:py-20">
          <p className="eyebrow mb-4">Contact</p>
          <h1 className="serif text-4xl font-semibold tracking-tight text-balance text-paper sm:text-6xl">
            Say hello, disagree, or point out an error.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Every essay here has a half-life of things I got wrong. Tell me
            about yours — I read it all and reply to the good ones.
          </p>
        </div>
      </header>

      <section className="container-x py-12 sm:py-16" aria-label="Contact">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {sent ? (
              <div
                role="status"
                className="flex h-full flex-col items-start justify-center gap-5 rounded-3xl border border-ochre/30 bg-ochre/10 p-10"
              >
                <CheckCircle2 className="size-12 text-ochre" aria-hidden="true" />
                <h2 className="serif text-2xl font-semibold text-paper">Message sent.</h2>
                <p className="max-w-md text-sm leading-relaxed text-muted">
                  Thank you for writing. It lands in the same folder as the
                  essays — read slowly, and answered when it survives the
                  sorting.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="text-sm font-medium text-ochre hover:text-ochre-deep"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                className="space-y-6 rounded-3xl border border-paper/10 bg-ink-soft p-7 sm:p-10"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-paper">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className="h-12 w-full rounded-xl border border-paper/15 bg-ink px-4 text-sm text-paper placeholder:text-faint focus:border-ochre/60 focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-paper">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="h-12 w-full rounded-xl border border-paper/15 bg-ink px-4 text-sm text-paper placeholder:text-faint focus:border-ochre/60 focus:outline-none"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-subject" className="mb-2 block text-sm font-medium text-paper">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    className="h-12 w-full rounded-xl border border-paper/15 bg-ink px-4 text-sm text-paper placeholder:text-faint focus:border-ochre/60 focus:outline-none"
                    placeholder="Which essay, or what's on your mind?"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-paper">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={6}
                    className="w-full rounded-xl border border-paper/15 bg-ink px-4 py-3 text-sm text-paper placeholder:text-faint focus:border-ochre/60 focus:outline-none"
                    placeholder="The long version — I like those."
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-faint">No newsletters from this form — only replies.</p>
                  <button
                    type="submit"
                    className="inline-flex h-12 items-center gap-2 rounded-full bg-ochre px-7 text-sm font-semibold text-ink transition-colors hover:bg-ochre-deep hover:text-paper"
                  >
                    Send it <Send className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </form>
            )}
          </div>

          <aside className="lg:col-span-5">
            <h2 className="serif text-2xl font-semibold text-paper">Other channels</h2>
            <ul className="mt-6 space-y-3">
              {CHANNELS.map((c) => {
                const inner = (
                  <>
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-paper/15 text-ochre">
                      <c.icon className="size-4.5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-paper">{c.label}</span>
                      <span className="block text-sm text-muted">{c.value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={c.label}>
                    {c.href ? (
                      <a
                        href={c.href}
                        className="group flex items-center gap-4 rounded-2xl border border-paper/10 bg-ink-soft p-4 transition-colors hover:border-ochre/40"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 rounded-2xl border border-paper/10 bg-ink-soft p-4">
                        {inner}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="mt-8 text-sm leading-relaxed text-faint">
              Prefer writing to a mailbox near a lake? All letters are
              forwarded. Responses usually come within a week, often faster if
              the essay was about latency.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}