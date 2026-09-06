import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getArticle, relatedArticles } from "@/data/articles";
import { getAuthor } from "@/data/authors";
import { SERIES } from "@/data/rankings";
import { categoryName, formatDate } from "@/data/site";
import type { ArticleBlock } from "@/data/types";
import { ArticleCard } from "@/components/site/cards";
import { BarChartCard, LineChartCard } from "@/components/site/charts";
import { NewsletterSignup } from "@/components/site/NewsletterSignup";
import { ShareButtons } from "@/components/site/ShareButtons";
import {
  Breadcrumbs,
  EmptyState,
  KPIStat,
  MethodologyNotice,
  SectionHeading,
} from "@/components/site/primitives";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article, related: relatedArticles(params.slug) };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article unavailable — R&R Insights" }, { name: "robots", content: "noindex" }],
      };
    }
    const { article } = loaderData;
    return {
      meta: [
        { title: `${article.title} — R&R Insights` },
        { name: "description", content: article.excerpt },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/insights/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/insights/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            datePublished: article.date,
            author: { "@type": "Person", name: getAuthor(article.authorSlug)?.name ?? "R&R" },
            publisher: { "@type": "Organization", name: "Reel & Rhythm" },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-editorial py-24">
      <EmptyState
        title="That article isn't available."
        description="It may have been moved or unpublished. Browse R&R Insights for current analysis."
      />
    </div>
  ),
  component: ArticlePage,
});

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "heading":
      return <h2 className="mt-12 text-3xl leading-snug">{block.text}</h2>;
    case "quote":
      return (
        <figure className="my-10 border-l-2 border-primary pl-6">
          <blockquote className="text-2xl leading-snug">{block.text}</blockquote>
          {block.attribution ? (
            <figcaption className="eyebrow mt-3 text-muted-foreground">
              {block.attribution}
            </figcaption>
          ) : null}
        </figure>
      );
    case "data":
      return (
        <div className="my-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {(block.data ?? []).map((d) => (
            <KPIStat key={d.label} value={d.value} label={d.label} note={d.note} />
          ))}
        </div>
      );
    case "chart": {
      const data = block.chartKey ? SERIES[block.chartKey] : undefined;
      if (!data) return null;
      const isBar = block.chartKey === "streaming-share";
      return (
        <div className="my-10">
          {isBar ? (
            <BarChartCard
              title={block.text ?? "Chart"}
              data={data}
              source="R&R Research — sample data"
            />
          ) : (
            <LineChartCard
              title={block.text ?? "Chart"}
              data={data}
              source="R&R Research — sample data"
            />
          )}
        </div>
      );
    }
    case "table": {
      if (!block.table) return null;
      return (
        <div className="-mx-5 my-10 overflow-x-auto px-5 md:mx-0 md:px-0">
          <table className="w-full min-w-[32rem] border-collapse text-left">
            {block.text ? <caption className="sr-only">{block.text}</caption> : null}
            <thead>
              <tr className="border-y border-border">
                {block.table.columns.map((col) => (
                  <th key={col} scope="col" className="eyebrow py-3 pr-4 text-muted-foreground">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.table.rows.map((row, i) => (
                <tr key={i} className="border-b border-border">
                  {row.map((cell, j) => (
                    <td key={j} className="num py-3 pr-4 text-sm">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    default:
      return <p className="mt-6 text-lg leading-[1.8] text-foreground/85">{block.text}</p>;
  }
}

function ArticlePage() {
  const { article, related } = Route.useLoaderData();
  const author = getAuthor(article.authorSlug);

  return (
    <article>
      <div className="container-editorial pt-12">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "R&R Insights", to: "/insights" },
            { label: article.title },
          ]}
        />
        <p className="eyebrow text-primary">{categoryName(article.category)}</p>
        <h1 className="mt-5 max-w-4xl text-4xl leading-[1.05] md:text-6xl">{article.title}</h1>
        <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">
          {article.deck}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-border py-4">
          {author ? (
            <Link
              to="/author/$slug"
              params={{ slug: author.slug }}
              className="text-sm font-medium link-underline"
            >
              {author.name}
            </Link>
          ) : null}
          <time dateTime={article.date} className="num text-xs text-muted-foreground">
            {formatDate(article.date)}
          </time>
          <span className="num text-xs text-muted-foreground">
            {article.readingTime} min read
          </span>
          <ShareButtons title={article.title} className="ml-auto" />
        </div>
      </div>

      <div className="container-editorial mt-10">
        <img
          src={article.image}
          alt={article.imageAlt}
          width={1600}
          height={900}
          loading="lazy"
          className="aspect-[16/9] w-full rounded-sm object-cover"
        />
      </div>

      <div className="container-editorial grid gap-12 py-12 lg:grid-cols-[minmax(0,44rem)_1fr]">
        <div>
          {article.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}

          {article.sources && article.sources.length > 0 ? (
            <section className="mt-14 border-t border-border pt-6">
              <h2 className="eyebrow text-primary">Sources</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {article.sources.map((source) => (
                  <li key={source}>{source}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
          {author ? (
            <div className="rounded-sm border border-border p-5">
              <p className="eyebrow text-primary">Written by</p>
              <p className="mt-3 text-lg">{author.name}</p>
              <p className="text-sm text-muted-foreground">{author.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{author.bio}</p>
              <Link
                to="/author/$slug"
                params={{ slug: author.slug }}
                className="mt-4 inline-block text-sm text-primary link-underline"
              >
                All work by {author.name}
              </Link>
            </div>
          ) : null}
          <MethodologyNotice>
            All figures in R&amp;R Insights are sample data during development and are labelled as
            such.
          </MethodologyNotice>
          <div className="rounded-sm border border-border p-5">
            <p className="eyebrow text-primary">Weekly briefing</p>
            <div className="mt-4">
              <NewsletterSignup variant="inline" />
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="container-editorial pb-24">
          <SectionHeading eyebrow="Keep reading" title="Related analysis" />
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
