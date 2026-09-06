import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ARTICLES } from "@/data/articles";
import { CATEGORIES } from "@/data/site";
import { ArticleCard } from "@/components/site/cards";
import { CategoryFilter, SearchBar } from "@/components/site/filters";
import { Breadcrumbs, EmptyState, Pagination } from "@/components/site/primitives";

const PER_PAGE = 6;

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "R&R Insights — Reporting and analysis on Africa's creative economy" },
      {
        name: "description",
        content:
          "Original analysis and reporting on African film, television, music, streaming, box office and the business behind them.",
      },
      { property: "og:title", content: "R&R Insights — Reporting and analysis" },
      {
        property: "og:description",
        content: "Original analysis on the forces shaping Africa's creative industries.",
      },
      { property: "og:url", content: "/insights" },
    ],
    links: [{ rel: "canonical", href: "/insights" }],
  }),
  component: InsightsHub,
});

function InsightsHub() {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES.filter((a) => {
      const matchesCategory = category === "all" || a.category === category;
      const matchesQuery =
        q.length === 0 ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.deck.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const visible = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return (
    <>
      <section className="border-b border-border py-12 md:py-16">
        <div className="container-editorial">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "R&R Insights" }]} />
          <p className="eyebrow text-primary">R&amp;R Insights</p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.05] md:text-6xl">
            Reporting and analysis on Africa's creative economy.
          </h1>
          <div className="mt-10 max-w-2xl">
            <SearchBar
              id="insights-search"
              label="Search insights"
              placeholder="Search headlines and analysis"
              value={query}
              onChange={(v) => {
                setQuery(v);
                setPage(1);
              }}
            />
          </div>
        </div>
      </section>

      <section className="container-editorial py-10">
        <CategoryFilter
          value={category}
          onChange={(v) => {
            setCategory(v);
            setPage(1);
          }}
          options={[
            { value: "all", label: "All" },
            ...CATEGORIES.map((c) => ({ value: c.slug, label: c.name })),
          ]}
        />

        <p className="num mt-6 text-xs text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "article" : "articles"}
        </p>

        {visible.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              title="No articles match this filter yet."
              description="Try another category, or clear your search to see everything we've published."
            />
          </div>
        ) : (
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}

        <Pagination page={current} totalPages={totalPages} onChange={setPage} />
      </section>
    </>
  );
}
