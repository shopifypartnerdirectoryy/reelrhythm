import { createFileRoute } from "@tanstack/react-router";
import { AUTHORS } from "@/data/authors";
import { AuthorCard } from "@/components/site/cards";
import { Breadcrumbs } from "@/components/site/primitives";

export const Route = createFileRoute("/authors")({
  head: () => ({
    meta: [
      { title: "Authors — Reel & Rhythm" },
      {
        name: "description",
        content:
          "The analysts and reporters behind Reel & Rhythm's coverage of the African entertainment and creative economy.",
      },
      { property: "og:title", content: "Authors — Reel & Rhythm" },
      { property: "og:description", content: "The people behind R&R's research and reporting." },
      { property: "og:url", content: "/authors" },
    ],
    links: [{ rel: "canonical", href: "/authors" }],
  }),
  component: AuthorsPage,
});

function AuthorsPage() {
  return (
    <div className="container-editorial py-12 md:py-16">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Authors" }]} />
      <p className="eyebrow text-primary">Authors</p>
      <h1 className="mt-5 max-w-3xl text-4xl leading-[1.05] md:text-6xl">
        The people behind the research.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Every piece R&amp;R publishes carries a named author and a stated method. These are the
        people responsible for it.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {AUTHORS.map((author) => (
          <AuthorCard key={author.slug} author={author} />
        ))}
      </div>
    </div>
  );
}
