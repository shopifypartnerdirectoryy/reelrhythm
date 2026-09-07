import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs, MethodologyNotice, SectionHeading } from "@/components/site/primitives";

const SECTIONS = [
  {
    heading: "Data collection",
    body: [
      "R&R collects performance data from exhibitors, distributors, platforms, rights bodies, promoters and public filings, plus a recurring audience panel across the markets we track.",
      "Each series states the markets included and the period covered. Coverage is deliberately narrower than 'Africa' where the underlying reporting does not support a continental figure.",
    ],
  },
  {
    heading: "Verification",
    body: [
      "Figures are cross-checked against at least one independent source where one exists. Where a single source is the only available reporting, we label it as such.",
      "Where a number cannot be verified, we publish the gap rather than an estimate. Empty means not reported, never zero.",
    ],
  },
  {
    heading: "Ranking construction",
    body: [
      "Rankings are recalculated each period from the same metric definition. Movement is measured against the previous published table, not against a revised backfill.",
      "Ties are shown at the same rank. An entity absent from the previous table is marked as a new entry rather than given an implied movement.",
    ],
  },
  {
    heading: "Index construction",
    body: [
      "Indices, including the R&R Ticket Price Index, are rebased to 100 at the first period so that movement is comparable across markets with different price levels and currencies.",
      "Local-currency movement and currency effects are reported separately rather than blended into one figure.",
    ],
  },
  {
    heading: "Revisions",
    body: [
      "When a source revises a figure, we revise the series and note the change on the affected page rather than silently overwriting history.",
      "Corrections to published analysis are appended to the article, dated and described.",
    ],
  },
  {
    heading: "Limitations",
    body: [
      "Reporting standards differ sharply between African markets. Comparisons across markets are directional unless the underlying definitions match.",
      "Informal and unreported activity is a material part of several segments we cover and is not captured by reported data.",
    ],
  },
];

export const Route = createFileRoute("/methodology")({
  head: () => ({
    meta: [
      { title: "Methodology — How Reel & Rhythm collects and verifies data" },
      {
        name: "description",
        content:
          "How R&R collects, verifies, ranks, indexes and revises data on African film, music, streaming and box office — including stated limitations.",
      },
      { property: "og:title", content: "Methodology — Reel & Rhythm" },
      {
        property: "og:description",
        content: "How we collect, verify and publish data on African entertainment.",
      },
      { property: "og:url", content: "/methodology" },
    ],
    links: [{ rel: "canonical", href: "/methodology" }],
  }),
  component: MethodologyPage,
});

function MethodologyPage() {
  return (
    <div className="container-editorial py-12 md:py-16">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Methodology" }]} />
      <p className="eyebrow text-primary">Methodology</p>
      <h1 className="mt-5 max-w-3xl text-4xl leading-[1.05] md:text-6xl">
        How we collect, check and publish data.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Numbers are only useful if you can see how they were made. This page sets out the standard
        R&amp;R applies across the Brief, Insights, Charts &amp; Rankings and Reports.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,44rem)_1fr]">
        <div>
          {SECTIONS.map((section) => (
            <section key={section.heading} className="border-t border-border py-8">
              <h2 className="text-2xl leading-snug">{section.heading}</h2>
              {section.body.map((paragraph, i) => (
                <p key={i} className="mt-4 text-lg leading-[1.8] text-foreground/85">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
          <MethodologyNotice>
            All figures on this site are clearly labelled sample data during development and should
            not be cited as reported market results.
          </MethodologyNotice>
          <div className="rounded-sm border border-border p-5">
            <p className="eyebrow text-primary">Questions on a figure?</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              If a published number looks wrong to you, tell us. We would rather correct it than
              defend it.
            </p>
            <Link to="/contact" className="mt-4 inline-block text-sm text-primary link-underline">
              Contact the research desk
            </Link>
          </div>
        </aside>
      </div>

      <section className="border-t-2 border-ink py-10">
        <SectionHeading eyebrow="In short" title="Sourced, dated, bounded and revisable." />
      </section>
    </div>
  );
}
