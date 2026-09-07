import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ARTICLES } from "@/data/articles";
import { BRIEFS } from "@/data/brief";
import { REPORTS } from "@/data/reports";
import { RANKINGS } from "@/data/rankings";
import { categoryName, formatDate } from "@/data/site";
import { CategoryFilter, SearchBar } from "@/components/site/filters";
import { Breadcrumbs, EmptyState } from "@/components/site/primitives";

type Result = {
  key: string;
  kind: "Insight" | "Brief" | "Report" | "Ranking";
  title: string;
  description: string;
  meta: string;
  href: { to: string; params?: Record<string, string> };
};

const TYPES = [
  { value: "all", label: "Everything" },
  { value: "Insight", label: "Insights" },
  { value: "Brief", label: "Brief" },
  { value: "Report", label: "Reports" },
  { value: "Ranking", label: "Rankings" },
];

const INDEX: Result[] = [
  ...ARTICLES.map<Result>((a) => ({
    key: `a-${a.slug}`,
    kind: "Insight",
    title: a.title,
    description: a.excerpt,
    meta: `${categoryName(a.category)} · ${formatDate(a.date)}`,
    href: { to: "/insights/$slug", params: { slug: a.slug } },
  })),
  ...BRIEFS.map<Result>((b) => ({
    key: `b-${b.slug}`,
    kind: "Brief",
    title: `No. ${b.number} — ${b.headline}`,
    description: b.summary,
    meta: formatDate(b.date),
    href: { to: "/brief/$edition", params: { edition: b.slug } },
  })),
  ...REPORTS.map<Result>((r) => ({
    key: `r-${r.slug}`,
    kind: "Report",
    title: r.title,
    description: r.description,
    meta: `${r.category} · ${formatDate(r.date)}`,
    href: { to: "/reports/$slug", params: { slug: r.slug } },
  })),
  ...RANKINGS.map<Result>((r) => ({
    key: `k-${r.slug}`,
    kind: "Ranking",
    title: r.title,
    description: r.description,
    meta: r.period,
    href: { to: "/charts/$slug", params: { slug: r.slug } },
  })),
];

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search — Reel & Rhythm" },
      {
        name: "description",
        content:
          "Search R&R Insights, Brief editions, research reports and rankings across African entertainment.",
      },
      { property: "og:title", content: "Search — Reel & Rhythm" },
      { property: "og:description", content: "Search everything Reel & Rhythm publishes." },
      { property: "og:url", content: "/search" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/search" }],
  }),
  component: SearchPage,
});

function SearchPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INDEX.filter((item) => {
      const matchesType = type === "all" || item.kind === type;
      const matchesQuery =
        q.length === 0 ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchesType && matchesQuery;
    });
  }, [query, type]);

  return (
    <div className="container-editorial py-12 md:py-16">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Search" }]} />
      <h1 className="text-4xl leading-[1.05] md:text-5xl">Search Reel &amp; Rhythm</h1>

      <div className="mt-10 max-w-3xl">
        <SearchBar id="site-search" value={query} onChange={setQuery} autoFocus />
      </div>

      <div className="mt-8">
        <CategoryFilter label="Filter results by type" value={type} onChange={setType} options={TYPES} />
      </div>

      <p className="num mt-8 text-xs text-muted-foreground">
        {results.length} {results.length === 1 ? "result" : "results"}
      </p>

      {results.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="Nothing matched that search."
            description="Try a broader term, or browse the Brief, Insights, Rankings and Reports directly."
          />
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-border border-t border-border">
          {results.map((result) => (
            <li key={result.key} className="py-6">
              <p className="eyebrow text-primary">{result.kind}</p>
              <h2 className="mt-2 text-2xl leading-snug">
                <Link
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  to={result.href.to as any}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  params={result.href.params as any}
                  className="link-underline"
                >
                  {result.title}
                </Link>
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {result.description}
              </p>
              <p className="num mt-3 text-xs text-muted-foreground">{result.meta}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
