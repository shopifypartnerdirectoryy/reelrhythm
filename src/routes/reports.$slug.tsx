import { createFileRoute, notFound } from "@tanstack/react-router";
import { getReport } from "@/data/reports";
import { formatDate } from "@/data/site";
import { NewsletterSignup } from "@/components/site/NewsletterSignup";
import { ShareButtons } from "@/components/site/ShareButtons";
import {
  Breadcrumbs,
  EmptyState,
  KPIStat,
  MethodologyNotice,
} from "@/components/site/primitives";

export const Route = createFileRoute("/reports/$slug")({
  loader: ({ params }) => {
    const report = getReport(params.slug);
    if (!report) throw notFound();
    return { report };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Report unavailable — R&R" }, { name: "robots", content: "noindex" }],
      };
    }
    const { report } = loaderData;
    return {
      meta: [
        { title: `${report.title} — R&R Reports` },
        { name: "description", content: report.description },
        { property: "og:title", content: report.title },
        { property: "og:description", content: report.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/reports/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/reports/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Report",
            name: report.title,
            description: report.description,
            datePublished: report.date,
            publisher: { "@type": "Organization", name: "Reel & Rhythm" },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-editorial py-24">
      <EmptyState
        title="That report isn't available."
        description="Browse R&R Reports for the research currently published."
      />
    </div>
  ),
  component: ReportPage,
});

function ReportPage() {
  const { report } = Route.useLoaderData();

  return (
    <article>
      <section className="bg-ink py-14 text-ink-foreground md:py-20">
        <div className="container-editorial">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "R&R Reports", to: "/reports" },
              { label: report.title },
            ]}
          />
          <p className="eyebrow text-gold">{report.category}</p>
          <h1 className="mt-5 max-w-4xl text-4xl leading-[1.05] md:text-6xl">{report.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-foreground/75">{report.subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <time dateTime={report.date} className="num text-xs text-ink-foreground/60">
              {formatDate(report.date)}
            </time>
            <span className="num text-xs text-ink-foreground/60">{report.pages} pages</span>
            <span className="num text-xs text-ink-foreground/60">
              {report.dataPoints} data points
            </span>
          </div>
        </div>
      </section>

      <div className="container-editorial grid gap-12 py-12 lg:grid-cols-[minmax(0,44rem)_1fr]">
        <div>
          <section>
            <h2 className="eyebrow text-primary">Executive summary</h2>
            <p className="mt-4 text-lg leading-[1.8] text-foreground/85">
              {report.executiveSummary}
            </p>
          </section>

          <section className="mt-12 border-t border-border pt-8">
            <h2 className="eyebrow text-primary">Key findings</h2>
            <ol className="mt-6 space-y-5">
              {report.keyFindings.map((finding, i) => (
                <li key={finding} className="flex gap-4 border-b border-border pb-5">
                  <span className="num text-sm text-primary">0{i + 1}</span>
                  <span className="text-lg leading-snug">{finding}</span>
                </li>
              ))}
            </ol>
          </section>

          {report.sections.map((section) => (
            <section key={section.heading} className="mt-12 border-t border-border pt-8">
              <h2 className="text-3xl leading-snug">{section.heading}</h2>
              {section.body.map((paragraph, i) => (
                <p key={i} className="mt-4 text-lg leading-[1.8] text-foreground/85">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <section className="mt-12 border-t border-border pt-8">
            <h2 className="eyebrow text-primary">Methodology</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {report.methodology.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-12 border-t border-border pt-8">
            <h2 className="eyebrow text-primary">Sources</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {report.sources.map((source) => (
                <li key={source}>{source}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
          <div className="space-y-8">
            {report.highlights.map((h) => (
              <KPIStat key={h.label} value={h.value} label={h.label} note={h.note} />
            ))}
          </div>
          <ShareButtons title={report.title} />
          <MethodologyNotice>
            This report uses clearly labelled sample data during development.
          </MethodologyNotice>
          <div className="rounded-sm border border-border p-5">
            <p className="eyebrow text-primary">Get new reports first</p>
            <div className="mt-4">
              <NewsletterSignup variant="inline" />
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
