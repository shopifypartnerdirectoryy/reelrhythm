import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { RANKINGS, RANKING_TABS, SERIES, TICKET_INDEX, rankingsByType } from "@/data/rankings";
import { RankingTable } from "@/components/site/RankingTable";
import { CategoryFilter } from "@/components/site/filters";
import { LineChartCard } from "@/components/site/charts";
import {
  Breadcrumbs,
  DataSourceBadge,
  EmptyState,
  MethodologyNotice,
  SectionHeading,
  UpdateTimestamp,
} from "@/components/site/primitives";

export const Route = createFileRoute("/charts/")({
  head: () => ({
    meta: [
      { title: "R&R Charts & Rankings — African entertainment performance data" },
      {
        name: "description",
        content:
          "Recurring rankings across African film, streaming, music, box office, cinema and markets, with movement tracking and stated methodology.",
      },
      { property: "og:title", content: "R&R Charts & Rankings" },
      {
        property: "og:description",
        content: "Track the performers, platforms and markets moving the numbers.",
      },
      { property: "og:url", content: "/charts" },
    ],
    links: [{ rel: "canonical", href: "/charts" }],
  }),
  component: ChartsHub,
});

function ChartsHub() {
  const [tab, setTab] = useState<string>("all");
  const visible = rankingsByType(tab);

  return (
    <>
      <section className="border-b border-border py-12 md:py-16">
        <div className="container-editorial">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Charts & Rankings" }]} />
          <p className="eyebrow text-primary">R&amp;R Charts &amp; Rankings</p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.05] md:text-6xl">
            The performers, platforms and markets moving the numbers.
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <UpdateTimestamp date={TICKET_INDEX.updated} />
            <DataSourceBadge source="R&R Research — sample data" />
          </div>
        </div>
      </section>

      <section className="container-editorial py-10">
        <CategoryFilter
          label="Filter rankings"
          value={tab}
          onChange={setTab}
          options={RANKING_TABS.map((t) => ({ value: t.key, label: t.label }))}
        />
      </section>

      <section className="container-editorial pb-16">
        {visible.length === 0 ? (
          <EmptyState
            title="No rankings in this category yet."
            description="New ranking series publish as verified data becomes available."
          />
        ) : (
          <div className="space-y-16">
            {visible.map((ranking) => (
              <div key={ranking.slug}>
                <SectionHeading
                  eyebrow={ranking.period}
                  title={ranking.title}
                  subtitle={ranking.description}
                  action={
                    <Link
                      to="/charts/$slug"
                      params={{ slug: ranking.slug }}
                      className="inline-flex items-center gap-2 text-sm text-primary"
                    >
                      <span className="link-underline">Full ranking &amp; methodology</span>
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  }
                />
                <div className="mt-8">
                  <RankingTable ranking={ranking} limit={5} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-border bg-secondary/40 py-16">
        <div className="container-editorial grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Featured data product"
              title="R&R Ticket Price Index"
              subtitle="A tracked index of cinema ticket pricing across selected African markets, rebased to 100."
            />
            <p className="num mt-8 text-6xl">{TICKET_INDEX.current}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Index level, latest period. Previous: {TICKET_INDEX.previous}
            </p>
            <Link
              to="/charts/ticket-price-index"
              className="mt-6 inline-flex items-center gap-2 text-sm text-primary"
            >
              <span className="link-underline">Open the Ticket Price Index</span>
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <LineChartCard
            title="Ticket Price Index vs general prices"
            subtitle="Rebased to 100, quarterly"
            data={SERIES["ticket-index"] ?? []}
            comparisonLabel="General prices"
            source="R&R Research — sample data"
          />
        </div>
      </section>

      <section className="container-editorial py-16">
        <MethodologyNotice>
          Every ranking states its period, source and metric. Rankings are recalculated each period
          and movement is measured against the previous published table. {RANKINGS.length} series are
          currently tracked.
        </MethodologyNotice>
      </section>
    </>
  );
}
