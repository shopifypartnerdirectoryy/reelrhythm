import { createFileRoute } from "@tanstack/react-router";
import { BRIEFS } from "@/data/brief";
import { BriefCard } from "@/components/site/cards";
import { NewsletterSignup } from "@/components/site/NewsletterSignup";
import { Breadcrumbs, SectionHeading } from "@/components/site/primitives";

export const Route = createFileRoute("/newsletter")({
  head: () => ({
    meta: [
      { title: "Newsletter archive — R&R Brief" },
      {
        name: "description",
        content:
          "Subscribe to the R&R Brief and browse every published edition of our weekly briefing on African entertainment.",
      },
      { property: "og:title", content: "Newsletter archive — R&R Brief" },
      { property: "og:description", content: "Every edition of the R&R Brief in one place." },
      { property: "og:url", content: "/newsletter" },
    ],
    links: [{ rel: "canonical", href: "/newsletter" }],
  }),
  component: NewsletterPage,
});

function NewsletterPage() {
  return (
    <>
      <section className="bg-ink py-14 text-ink-foreground md:py-20">
        <div className="container-editorial">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Newsletter" }]} />
          <p className="eyebrow text-gold">Newsletter</p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.05] md:text-6xl">
            One email a week. The numbers that matter.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-foreground/75">
            The R&amp;R Brief lands every week with the film, television, music, streaming and box
            office movements worth your attention — and the data behind them.
          </p>
          <div className="mt-10 max-w-xl">
            <NewsletterSignup />
          </div>
          <p className="mt-4 text-xs text-ink-foreground/50">
            Sign-up is a demo during development and stores no data. No spam, unsubscribe any time.
          </p>
        </div>
      </section>

      <section className="container-editorial py-16">
        <SectionHeading
          eyebrow="Archive"
          title="Every published edition"
          subtitle="Read past briefings in full, including the numbers and takeaways from each week."
        />
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {BRIEFS.map((brief) => (
            <BriefCard key={brief.slug} brief={brief} />
          ))}
        </div>
      </section>
    </>
  );
}
