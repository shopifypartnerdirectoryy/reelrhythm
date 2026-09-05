import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import heroArt from "@/assets/hero-data.jpg";
import { HEADLINE_STATS, PRODUCTS, SITE } from "@/data/site";
import { ARTICLES, featuredArticle } from "@/data/articles";
import { latestBrief } from "@/data/brief";
import { latestReport } from "@/data/reports";
import { getRanking, SERIES } from "@/data/rankings";
import {
  ArrowLink,
  DataSourceBadge,
  KPIStat,
  SectionHeading,
  UpdateTimestamp,
} from "@/components/site/primitives";
import { ArticleCard, FeaturedArticle, ProductCard } from "@/components/site/cards";
import { RankingTable } from "@/components/site/RankingTable";
import { NewsletterSignup } from "@/components/site/NewsletterSignup";
import { BarChartCard } from "@/components/site/charts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Reel & Rhythm — Intelligence for the African Creative Economy" },
      {
        name: "description",
        content:
          "Tracking the numbers, trends, people and business shaping Africa's entertainment and creative industries.",
      },
      { property: "og:title", content: "Reel & Rhythm — Intelligence for the African Creative Economy" },
      {
        property: "og:description",
        content:
          "Weekly briefings, original analysis, rankings and research on African film, music and streaming.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const feature = featuredArticle();
  const latest = ARTICLES.filter((a) => a.slug !== feature.slug).slice(0, 3);
  const brief = latestBrief();
  const report = latestReport();
  const filmRanking = getRanking("highest-grossing-films");

  return (
    <>
      {/* Hero */}
      <section className="grain relative overflow-hidden bg-ink text-ink-foreground">
        <img
          src={heroArt}
          alt=""
          width={1600}
          height={1008}
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover opacity-45"
        />
        <div className="relative container-editorial py-20 md:py-32">
          <p className="eyebrow text-gold">{SITE.tagline}</p>
          <h1 className="mt-6 max-w-4xl text-5xl leading-[0.95] md:text-7xl lg:text-8xl">
            Reel <span className="text-gold">&amp;</span> Rhythm
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-foreground/80 md:text-xl">
            {SITE.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild size="lg" variant="gold">
              <Link to="/insights">Explore R&amp;R Insights</Link>
            </Button>
            <Button asChild size="lg" variant="onInk">
              <Link to="/newsletter">Subscribe to R&amp;R Brief</Link>
            </Button>
          </div>
          <dl className="mt-16 grid gap-8 border-t border-ink-foreground/20 pt-8 sm:grid-cols-3">
            {[
              { k: "Weekly", v: "R&R Brief" },
              { k: "Recurring", v: "Charts & Rankings" },
              { k: "Quarterly", v: "Research Reports" },
            ].map((item) => (
              <div key={item.v}>
                <dt className="eyebrow text-gold">{item.k}</dt>
                <dd className="mt-2 text-xl text-ink-foreground">{item.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* This week */}
      <section className="container-editorial py-20 md:py-24">
        <SectionHeading
          eyebrow="This Week"
          title="The numbers, stories and movements shaping Africa's creative economy."
        />
        <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product, i) => (
            <ProductCard
              key={product.to}
              eyebrow={product.eyebrow}
              description={product.description}
              cta={product.cta}
              to={product.to}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* The numbers */}
      <section className="bg-ink py-20 text-ink-foreground md:py-24">
        <div className="container-editorial">
          <SectionHeading
            inverted
            eyebrow="The Numbers"
            title="What we track, updated weekly."
            subtitle="Figures shown are placeholders during development and are labelled as sample data."
          />
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {HEADLINE_STATS.map((stat) => (
              <KPIStat
                key={stat.label}
                inverted
                value={stat.value}
                label={stat.label}
                note={stat.note}
                change={stat.change}
              />
            ))}
          </div>
          <p className="eyebrow mt-10 text-ink-foreground/50">
            Source: R&amp;R Research · Updated weekly
          </p>
        </div>
      </section>

      {/* Featured insight */}
      <section className="container-editorial py-20 md:py-24">
        <SectionHeading
          eyebrow="Featured Insight"
          title="Featured Insights"
          action={<ArrowLink to="/insights">All insights</ArrowLink>}
        />
        <div className="mt-12">
          <FeaturedArticle article={feature} />
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {latest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* Charts & rankings */}
      <section className="border-y border-border bg-secondary/40 py-20 md:py-24">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="R&R Charts & Rankings"
            title="Where the numbers tell the story."
            action={<ArrowLink to="/charts">View all rankings</ArrowLink>}
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div className="rounded-sm border border-border bg-card p-5 md:p-7">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="eyebrow text-primary">Top Films</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {filmRanking?.period ?? "Current period"}
                  </p>
                </div>
                {filmRanking ? <UpdateTimestamp date={filmRanking.updated} /> : null}
              </div>
              <div className="mt-6">
                {filmRanking ? <RankingTable ranking={filmRanking} limit={5} compact /> : null}
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                {filmRanking ? <DataSourceBadge source={filmRanking.source} /> : null}
                <ArrowLink to="/charts/$slug" params={{ slug: "highest-grossing-films" }}>
                  Full ranking
                </ArrowLink>
              </div>
            </div>
            <BarChartCard
              title="Share of viewing by platform"
              subtitle="Illustrative distribution across tracked platforms."
              data={SERIES["streaming-share"] ?? []}
              source="R&R Research — sample platform panel"
            />
          </div>
        </div>
      </section>

      {/* Latest report */}
      <section className="container-editorial py-20 md:py-24">
        <SectionHeading eyebrow="Latest Report" title={report.title} subtitle={report.subtitle} />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="rounded-sm border border-border bg-ink p-10 text-ink-foreground">
            <p className="eyebrow text-gold">R&amp;R Reports</p>
            <p className="mt-6 text-3xl leading-tight">{report.title}</p>
            <p className="mt-4 text-sm text-ink-foreground/70">{report.subtitle}</p>
            <p className="num mt-10 border-t border-ink-foreground/20 pt-4 text-xs text-ink-foreground/60">
              {report.pages} pages · {report.dataPoints} data points · {report.category}
            </p>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-muted-foreground">{report.description}</p>
            <p className="eyebrow mt-6 text-muted-foreground">
              Published{" "}
              <time dateTime={report.date} className="num">
                {new Date(report.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/reports/$slug" params={{ slug: report.slug }}>
                  Read Report
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/reports/$slug" params={{ slug: report.slug }} hash="download">
                  Download Report
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Brief teaser */}
      <section className="container-editorial pb-4">
        <div className="rounded-sm border border-border bg-card p-8 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="eyebrow text-primary">R&amp;R Brief · Edition {brief.number}</p>
            <UpdateTimestamp date={brief.date} label="Published" />
          </div>
          <h2 className="mt-4 max-w-3xl text-3xl leading-tight">{brief.headline}</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">{brief.summary}</p>
          <div className="mt-6">
            <ArrowLink to="/brief/$edition" params={{ edition: brief.slug }}>
              Read the Brief
            </ArrowLink>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-editorial py-20 md:py-24">
        <div className="rounded-sm bg-ink p-8 text-ink-foreground md:p-14">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow text-gold">R&amp;R Brief</p>
              <h2 className="mt-4 text-4xl leading-[1.05] md:text-5xl">
                The African creative economy, in your inbox.
              </h2>
              <p className="mt-5 max-w-md text-ink-foreground/75">
                Get the R&amp;R Brief every week — a concise look at the numbers, trends and stories
                shaping African entertainment.
              </p>
            </div>
            <NewsletterSignup />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="container-editorial pb-24">
        <SectionHeading
          eyebrow="About"
          title="A research company that publishes."
          subtitle="Reel & Rhythm is a data-driven media and intelligence platform focused on understanding Africa's rapidly evolving creative economy."
          action={<ArrowLink to="/about">About Reel &amp; Rhythm</ArrowLink>}
        />
      </section>
    </>
  );
}
