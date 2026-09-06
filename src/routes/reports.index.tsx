import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { REPORTS, REPORT_CATEGORIES, latestReport } from "@/data/reports";
import { ReportCard } from "@/components/site/cards";
import { CategoryFilter } from "@/components/site/filters";
import { Breadcrumbs, EmptyState, KPIStat, SectionHeading } from "@/components/site/primitives";

export const Route = createFileRoute("/reports/")({
  head: () => ({
    meta: [
      { title: "R&R Reports — Research on African entertainment markets" },
      {
        name: "description",
        content:
          "In-depth research reports on African film, music, streaming, audiences and the creative economy, with stated methodology and sources.",
      },
      { property: "og:title", content: "R&R Reports" },
      {
        property: "og:description",
        content: "Deeper research into the markets, audiences and businesses behind African entertainment.",
      },
      { property: "og:url", content: "/reports" },
    ],
    links: [{ rel: "canonical", href: "/reports" }],
  }),
  component: ReportsHub,
});

function ReportsHub() {
  const [category, setCategory] = useState("All");
  const latest = latestReport();

  const filtered = useMemo(
    () => (category === "All" ? REPORTS : REPORTS.filter((r) => r.category === category)),
    [category],
  );

  return (
    <>
      <section className="border-b border-border py-12 md:py-16">
        <div className="container-editorial">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "R&R Reports" }]} />
          <p className="eyebrow text-primary">R&amp;R Reports</p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.05] md:text-6xl">
            Research into the markets behind African entertainment.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Each report sets out its sample, method and sources so the findings can be checked as
            well as read.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-secondary/40 py-16">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="Latest report"
            title={latest.title}
            subtitle={latest.description}
          />
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {latest.highlights.map((h) => (
              <KPIStat key={h.label} value={h.value} label={h.label} note={h.note} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-editorial py-16">
        <CategoryFilter
          label="Filter reports"
          value={category}
          onChange={setCategory}
          options={REPORT_CATEGORIES.map((c) => ({ value: c, label: c }))}
        />

        {filtered.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="No reports in this category yet."
              description="New research publishes here as it clears review."
            />
          </div>
        ) : (
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {filtered.map((report) => (
              <ReportCard key={report.slug} report={report} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
