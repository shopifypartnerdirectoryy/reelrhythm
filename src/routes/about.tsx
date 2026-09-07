import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AUTHORS } from "@/data/authors";
import { PRODUCTS, SITE } from "@/data/site";
import { AuthorCard } from "@/components/site/cards";
import { Breadcrumbs, SectionHeading } from "@/components/site/primitives";

const PRINCIPLES = [
  {
    title: "Business over gossip",
    text: "We cover how the African entertainment industry works: what it earns, who it reaches and what changes the economics.",
  },
  {
    title: "Sourced, or not published",
    text: "Every figure carries a source and a period. Where a number is not reported, we say so rather than estimate it quietly.",
  },
  {
    title: "Methods in the open",
    text: "Rankings, indices and reports publish their method alongside their result so the work can be checked.",
  },
  {
    title: "Regional, not national",
    text: "African markets differ. We report them separately before we aggregate them.",
  },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Reel & Rhythm — Intelligence for the African creative economy" },
      {
        name: "description",
        content:
          "Reel & Rhythm is a data-driven media, research and intelligence platform covering the business of African entertainment.",
      },
      { property: "og:title", content: "About Reel & Rhythm" },
      {
        property: "og:description",
        content: "A research and intelligence platform for the African creative economy.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="bg-ink py-14 text-ink-foreground md:py-20">
        <div className="container-editorial">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "About" }]} />
          <p className="eyebrow text-gold">About</p>
          <h1 className="mt-5 max-w-4xl text-4xl leading-[1.05] md:text-6xl">
            {SITE.tagline}.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-foreground/75">
            Reel &amp; Rhythm tracks the numbers, trends, people and business shaping Africa's
            entertainment and creative industries — film and Nollywood, television, Afrobeats and
            music, streaming, cinema and box office, audiences and the wider creative economy.
          </p>
        </div>
      </section>

      <section className="container-editorial py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,32rem)_1fr]">
          <div>
            <h2 className="text-3xl leading-snug md:text-4xl">Our mission</h2>
            <p className="mt-6 text-lg leading-[1.8] text-foreground/85">
              African entertainment is one of the fastest-moving creative economies in the world,
              and one of the least measured. Decisions about what gets made, funded, licensed and
              toured are still taken with patchy evidence.
            </p>
            <p className="mt-4 text-lg leading-[1.8] text-foreground/85">
              R&amp;R exists to close that gap: to publish the performance data, market structure
              and analysis that producers, platforms, investors, brands and policymakers need —
              carefully sourced, clearly bounded and openly explained.
            </p>
          </div>
          <div className="space-y-8">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="border-t border-border pt-5">
                <h3 className="text-xl">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40 py-16">
        <div className="container-editorial">
          <SectionHeading eyebrow="What we publish" title="Four products, one view of the industry" />
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((product) => (
              <div key={product.to} className="border-t-2 border-ink/80 pt-5">
                <h3 className="text-xl">{product.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-editorial py-16">
        <SectionHeading
          eyebrow="Team"
          title="Who does the work"
          action={
            <Link to="/authors" className="text-sm text-primary link-underline">
              All authors
            </Link>
          }
        />
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {AUTHORS.slice(0, 4).map((author) => (
            <AuthorCard key={author.slug} author={author} />
          ))}
        </div>
      </section>

      <section className="container-editorial pb-24">
        <div className="flex flex-col items-start gap-6 border-t-2 border-ink pt-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl leading-snug">Work with R&amp;R</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Research partnerships, data licensing, press enquiries and speaking requests.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="ink" size="lg">
              <Link to="/contact">Get in touch</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/methodology">Read our methodology</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
