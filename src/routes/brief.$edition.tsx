import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { briefNeighbours, getBrief } from "@/data/brief";
import { formatDate } from "@/data/site";
import { NewsletterSignup } from "@/components/site/NewsletterSignup";
import { ShareButtons } from "@/components/site/ShareButtons";
import {
  Breadcrumbs,
  EmptyState,
  KPIStat,
  MethodologyNotice,
} from "@/components/site/primitives";

export const Route = createFileRoute("/brief/$edition")({
  loader: ({ params }) => {
    const brief = getBrief(params.edition);
    if (!brief) throw notFound();
    return { brief };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Edition unavailable — R&R Brief" }, { name: "robots", content: "noindex" }],
      };
    }
    const { brief } = loaderData;
    const title = `R&R Brief No. ${brief.number} — ${brief.headline}`;
    return {
      meta: [
        { title },
        { name: "description", content: brief.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: brief.summary },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/brief/${params.edition}` },
      ],
      links: [{ rel: "canonical", href: `/brief/${params.edition}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: brief.headline,
            datePublished: brief.date,
            publisher: { "@type": "Organization", name: "Reel & Rhythm" },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-editorial py-24">
      <EmptyState
        title="That edition isn't available."
        description="It may have been renumbered or has not been published yet."
      />
    </div>
  ),
  component: BriefEditionPage,
});

function BriefEditionPage() {
  const { brief } = Route.useLoaderData();
  const { previous, next } = briefNeighbours(brief.slug);

  return (
    <article className="container-editorial py-12 md:py-16">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "R&R Brief", to: "/brief" },
          { label: `Edition ${brief.number}` },
        ]}
      />

      <header className="border-b border-border pb-10">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="eyebrow text-primary">R&amp;R Brief</p>
          <p className="num text-xs text-muted-foreground">Edition {brief.number}</p>
          <time dateTime={brief.date} className="num text-xs text-muted-foreground">
            {formatDate(brief.date)}
          </time>
        </div>
        <h1 className="mt-5 max-w-4xl text-4xl leading-[1.05] md:text-6xl">{brief.headline}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{brief.intro}</p>
        <div className="mt-8">
          <ShareButtons title={brief.headline} />
        </div>
      </header>

      <section className="py-12">
        <h2 className="eyebrow text-primary">This week in numbers</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {brief.numbers.map((n) => (
            <KPIStat key={n.label} value={n.value} label={n.label} note={n.note} />
          ))}
        </div>
      </section>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,42rem)_1fr]">
        <div>
          {brief.sections.map((section) => (
            <section key={section.heading} className="border-t border-border py-10">
              <h2 className="eyebrow text-primary">{section.heading}</h2>
              {section.body.map((paragraph, i) => (
                <p key={i} className="mt-4 text-lg leading-[1.75] text-foreground/85">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <section className="border-t-2 border-ink py-10">
            <h2 className="eyebrow text-primary">The takeaway</h2>
            <p className="mt-4 text-2xl leading-snug">{brief.takeaway}</p>
          </section>
        </div>

        <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
          <MethodologyNotice>
            Figures in the Brief are drawn from the R&amp;R sample panel and are labelled as sample
            data during development.
          </MethodologyNotice>
          <div className="rounded-sm border border-border p-5">
            <p className="eyebrow text-primary">Get this weekly</p>
            <div className="mt-4">
              <NewsletterSignup variant="inline" />
            </div>
          </div>
        </aside>
      </div>

      <nav
        aria-label="Edition navigation"
        className="mt-12 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
      >
        {previous ? (
          <Link
            to="/brief/$edition"
            params={{ edition: previous.slug }}
            className="group rounded-sm border border-border p-5 transition-colors hover:border-primary"
          >
            <span className="eyebrow flex items-center gap-2 text-muted-foreground">
              <ArrowLeft className="size-3" aria-hidden /> Previous edition
            </span>
            <span className="mt-2 block text-lg">{previous.headline}</span>
          </Link>
        ) : (
          <div className="rounded-sm border border-dashed border-border p-5 text-sm text-muted-foreground">
            This is the earliest published edition.
          </div>
        )}
        {next ? (
          <Link
            to="/brief/$edition"
            params={{ edition: next.slug }}
            className="group rounded-sm border border-border p-5 text-right transition-colors hover:border-primary"
          >
            <span className="eyebrow flex items-center justify-end gap-2 text-muted-foreground">
              Next edition <ArrowRight className="size-3" aria-hidden />
            </span>
            <span className="mt-2 block text-lg">{next.headline}</span>
          </Link>
        ) : (
          <div className="rounded-sm border border-dashed border-border p-5 text-right text-sm text-muted-foreground">
            This is the most recent edition.
          </div>
        )}
      </nav>
    </article>
  );
}
