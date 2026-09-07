import { createFileRoute, notFound } from "@tanstack/react-router";
import { getAuthor } from "@/data/authors";
import { articlesByAuthor } from "@/data/articles";
import { ArticleCard } from "@/components/site/cards";
import { Breadcrumbs, EmptyState, SectionHeading } from "@/components/site/primitives";

export const Route = createFileRoute("/author/$slug")({
  loader: ({ params }) => {
    const author = getAuthor(params.slug);
    if (!author) throw notFound();
    return { author, articles: articlesByAuthor(params.slug) };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Author unavailable — R&R" }, { name: "robots", content: "noindex" }],
      };
    }
    const { author } = loaderData;
    const title = `${author.name} — ${author.role}, Reel & Rhythm`;
    return {
      meta: [
        { title },
        { name: "description", content: author.bio },
        { property: "og:title", content: title },
        { property: "og:description", content: author.bio },
        { property: "og:type", content: "profile" },
        { property: "og:url", content: `/author/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/author/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: author.name,
            jobTitle: author.role,
            description: author.bio,
            worksFor: { "@type": "Organization", name: "Reel & Rhythm" },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-editorial py-24">
      <EmptyState
        title="That author page isn't available."
        description="See the full list of R&R authors instead."
      />
    </div>
  ),
  component: AuthorPage,
});

function AuthorPage() {
  const { author, articles } = Route.useLoaderData();

  return (
    <div className="container-editorial py-12 md:py-16">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Authors", to: "/authors" },
          { label: author.name },
        ]}
      />

      <header className="flex flex-col gap-6 border-b border-border pb-10 md:flex-row md:items-start">
        <span
          aria-hidden
          className="num flex size-20 shrink-0 items-center justify-center rounded-full bg-ink text-xl text-ink-foreground"
        >
          {author.initials}
        </span>
        <div>
          <h1 className="text-4xl leading-tight md:text-5xl">{author.name}</h1>
          <p className="eyebrow mt-2 text-primary">{author.role}</p>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {author.bio}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {author.expertise.map((item) => (
              <li key={item} className="eyebrow rounded-sm border border-border px-3 py-1.5">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </header>

      <section className="py-12">
        <SectionHeading eyebrow="Published work" title={`Analysis by ${author.name}`} />
        {articles.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="No published work yet."
              description="Articles by this author will appear here once published."
            />
          </div>
        ) : (
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
