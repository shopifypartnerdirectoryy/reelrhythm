import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SERIES, TICKET_INDEX } from "@/data/rankings";
import { LineChartCard } from "@/components/site/charts";
import { CategoryFilter } from "@/components/site/filters";
import {
  Breadcrumbs,
  DataSourceBadge,
  KPIStat,
  MethodologyNotice,
  SectionHeading,
  UpdateTimestamp,
} from "@/components/site/primitives";

const RANGES = [
  { value: "ticket-index-weekly", label: "Weekly" },
  { value: "ticket-index-monthly", label: "Monthly" },
  { value: "ticket-index", label: "Quarterly" },
  { value: "ticket-index-annual", label: "Annual" },
];

export const Route = createFileRoute("/charts/ticket-price-index")({
  head: () => ({
    meta: [
      { title: "R&R Ticket Price Index — Cinema pricing across African markets" },
      {
        name: "description",
        content:
          "A tracked index of cinema ticket pricing across selected African markets, rebased to 100, with stated methodology and sources.",
      },
      { property: "og:title", content: "R&R Ticket Price Index" },
      {
        property: "og:description",
        content: "Cinema ticket pricing across selected African markets, rebased to 100.",
      },
      { property: "og:url", content: "/charts/ticket-price-index" },
    ],
    links: [{ rel: "canonical", href: "/charts/ticket-price-index" }],
  }),
  component: TicketIndexPage,
});

function TicketIndexPage() {
  const [range, setRange] = useState("ticket-index");
  const change = (
    ((TICKET_INDEX.current - TICKET_INDEX.previous) / TICKET_INDEX.previous) *
    100
  ).toFixed(1);

  return (
    <div className="container-editorial py-12 md:py-16">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Charts & Rankings", to: "/charts" },
          { label: "Ticket Price Index" },
        ]}
      />

      <header className="border-b border-border pb-8">
        <p className="eyebrow text-primary">Data product</p>
        <h1 className="mt-5 max-w-3xl text-4xl leading-[1.05] md:text-6xl">
          R&amp;R Ticket Price Index
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          A single tracked measure of what it costs to go to the cinema across the African markets
          R&amp;R follows, rebased to 100 at the start of the series.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <UpdateTimestamp date={TICKET_INDEX.updated} />
          <DataSourceBadge source="R&R Research — sample data" />
        </div>
      </header>

      <section className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <KPIStat
          value={String(TICKET_INDEX.current)}
          label="Current index level"
          change={`+${change}%`}
          note="Sample data"
        />
        <KPIStat value={String(TICKET_INDEX.previous)} label="Previous period" note="Sample data" />
        <KPIStat
          value={TICKET_INDEX.averagePrice}
          label="Average ticket price"
          note="Sample data"
        />
        <KPIStat
          value={String(TICKET_INDEX.markets.length)}
          label="Markets in the index"
          note="Sample data"
        />
      </section>

      <section className="border-t border-border py-10">
        <SectionHeading eyebrow="Index history" title="Track the index over time" />
        <div className="mt-8">
          <CategoryFilter label="Select time range" value={range} onChange={setRange} options={RANGES} />
        </div>
        <div className="mt-8">
          <LineChartCard
            title="Ticket Price Index"
            subtitle={RANGES.find((r) => r.value === range)?.label}
            data={SERIES[range] ?? []}
            comparisonLabel="General prices"
            source="R&R Research — sample data"
          />
        </div>
      </section>

      <section className="grid gap-10 border-t border-border py-10 md:grid-cols-2">
        <div>
          <h2 className="eyebrow text-primary">Markets covered</h2>
          <ul className="mt-4 space-y-2 text-base">
            {TICKET_INDEX.markets.map((market) => (
              <li key={market} className="border-b border-border pb-2">
                {market}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="eyebrow text-primary">Methodology</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <li>
              Prices are collected per market from a fixed basket of cinema sites and screening
              types, then weighted by admissions share.
            </li>
            <li>
              The index is rebased to 100 at the first period in the series so that movement, not
              absolute price, is the comparison.
            </li>
            <li>
              Currency effects are reported separately from local-currency price movement rather
              than blended into a single figure.
            </li>
            <li>Where a site does not report for a period, it is excluded rather than estimated.</li>
          </ul>
        </div>
      </section>

      <MethodologyNotice>
        All index values shown are sample data during development and are not reported market
        figures.
      </MethodologyNotice>
    </div>
  );
}
