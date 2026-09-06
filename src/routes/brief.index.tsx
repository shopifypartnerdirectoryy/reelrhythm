import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { BRIEFS, latestBrief } from "@/data/brief";
import { BriefCard } from "@/components/site/cards";
import { NewsletterSignup } from "@/components/site/NewsletterSignup";
import { Breadcrumbs, KPIStat, SectionHeading } from "@/components/site/primitives";

const COVERAGE = [
  { title: "Film & TV performance", text: "Releases, slates, admissions and what moved in cinemas." },
  { title: "Afrobeats trends", text: "Chart movement, catalogue behaviour and touring economics." },
  { title: "Streaming", text: "Platform strategy, commissioning volume and pricing changes." },
  { title: "Box office", text: "Reported gross, occupancy and yield across tracked markets." },
  { title: "Audience behaviour", text: "How, where and on what people are watching and listening." },
  { title: "Industry movements", text: "Deals, appointments and structural shifts worth tracking." },
];

export const Route = createFileRoute("/brief/")({
  head: () => ({
    meta: [
      { title: "R&R Brief — Weekly intelligence on African entertainment" },
      {
        name: "description",
        content:
          "The R&R Brief is a weekly intelligence briefing on African film, television, music, streaming and box office.",
      },
      { property: "og:title", content: "R&R Brief — Weekly intelligence on African entertainment" },
      {
        property: "og:description",
        content: "A concise weekly look at the numbers shaping African entertainment.",
      },
      { property: "og:url", content: "/brief" },
    ],
    links: [{ rel: "canonical", href: "/brief" }],
  }),
  component: BriefHub,
});

function BriefHub() {
  const latest = latestBrief();

  return (
    <>
      <section className="bg-ink py-16 text-ink-foreground md:py-24">
        <div className="container-editorial">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "R&R Brief" }]} />
          <p className="eyebrow text-gold">R&amp;R Brief</p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.05] md:text-6xl">
            The weekly intelligence briefing on African entertainment.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-foreground/75">
            One email a week: what changed in film, television, music, streaming and the business
            behind them — with the numbers that support it.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild size="lg" variant="gold">
              <Link to="/brief/$edition" params={{ edition: latest.slug }}>
                Read the latest edition
              </Link>
            </Button>
            <Button asChild size="lg" variant="onInk">
              <Link to="/newsletter">Browse the archive</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container-editorial py-20">
        <SectionHeading eyebrow="What the Brief covers" title="Six recurring sections, every week." />
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {COVERAGE.map((item) => (
            <div key={item.title} className="border-t border-border pt-5">
              <h3 className="text-xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40 py-20">
        <div className="container-editorial">
          <SectionHeading
            eyebrow={`Edition ${latest.number}`}
            title={latest.headline}
            subtitle={latest.summary}
          />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {latest.numbers.map((n) => (
              <KPIStat key={n.label} value={n.value} label={n.label} note={n.note} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-editorial py-20">
        <SectionHeading eyebrow="Recent editions" title="Previous briefings" />
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {BRIEFS.map((brief) => (
            <BriefCard key={brief.slug} brief={brief} />
          ))}
        </div>
      </section>

      <section className="container-editorial pb-24">
        <div className="rounded-sm bg-ink p-8 text-ink-foreground md:p-12">
          <h2 className="max-w-xl text-3xl leading-tight md:text-4xl">
            The African creative economy, in your inbox.
          </h2>
          <div className="mt-8">
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </>
  );
}
