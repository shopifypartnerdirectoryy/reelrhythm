import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getRanking } from "@/data/rankings";
import { RankingTable } from "@/components/site/RankingTable";
import { ShareButtons } from "@/components/site/ShareButtons";
import {
  Breadcrumbs,
  DataSourceBadge,
  EmptyState,
  MethodologyNotice,
  UpdateTimestamp,
} from "@/components/site/primitives";

export const Route = createFileRoute("/charts/$slug")({
  loader: ({ params }) => {
    const ranking = getRanking(params.slug);
    if (!ranking) throw notFound();
    return { ranking };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Ranking unavailable — R&R" }, { name: "robots", content: "noindex" }],
      };
    }
    const { ranking } = loaderData;
    const title = `${ranking.title} — R&R Charts & Rankings`;
    return {
      meta: [
        { title },
        { name: "description", content: ranking.description },
        { property: "og:title", content: title },
        { property: "og:description", content: ranking.description },
        { property: "og:url", content: `/charts/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/charts/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: ranking.title,
            itemListElement: ranking.rows.map((row) => ({
              "@type": "ListItem",
              position: row.rank,
              name: row.title,
            })),
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-editorial py-24">
      <EmptyState
        title="That ranking isn't available."
        description="Browse Charts & Rankings for the series currently published."
      />
    </div>
  ),
  component: RankingPage,
});

function RankingPage() {
  const { ranking } = Route.useLoaderData();

  return (
    <div className="container-editorial py-12 md:py-16">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Charts & Rankings", to: "/charts" },
          { label: ranking.title },
        ]}
      />

      <header className="border-b border-border pb-8">
        <p className="eyebrow text-primary">{ranking.period}</p>
        <h1 className="mt-5 max-w-3xl text-4xl leading-[1.05] md:text-6xl">{ranking.title}</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{ranking.description}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <UpdateTimestamp date={ranking.updated} />
          <DataSourceBadge source={ranking.source} />
          <ShareButtons title={ranking.title} className="ml-auto" />
        </div>
      </header>

      <div className="py-10">
        <RankingTable ranking={ranking} />
      </div>

      <section className="grid gap-8 border-t border-border py-10 md:grid-cols-2">
        <div>
          <h2 className="eyebrow text-primary">Methodology</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {ranking.methodology}
          </p>
        </div>
        <div>
          <h2 className="eyebrow text-primary">How to read this table</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Rank movement is measured against the previous published period.</li>
            <li>“New” marks an entry that was not in the previous table.</li>
            <li>The metric shown is {ranking.metricLabel.toLowerCase()}.</li>
            <li>Empty cells mean the figure was not reported, not that it is zero.</li>
          </ul>
          <Link to="/methodology" className="mt-4 inline-block text-sm text-primary link-underline">
            Read the full R&amp;R methodology
          </Link>
        </div>
      </section>

      <MethodologyNotice>
        All values in this ranking are sample data during development and should not be cited as
        reported figures.
      </MethodologyNotice>
    </div>
  );
}
