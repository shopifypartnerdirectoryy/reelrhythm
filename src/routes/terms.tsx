import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Reel & Rhythm" },
      {
        name: "description",
        content:
          "The terms that apply to using Reel & Rhythm, including citation of R&R data, rankings and research reports.",
      },
      { property: "og:title", content: "Terms of Use — Reel & Rhythm" },
      { property: "og:description", content: "Terms for using R&R content, data and research." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <LegalPage
      label="Terms of Use"
      title="Using R&R content and data."
      intro="These terms cover how Reel & Rhythm content, rankings, indices and reports may be used."
      sections={[
        {
          heading: "Citation",
          body: [
            "You may quote short extracts and individual figures with clear attribution to Reel & Rhythm and a link to the source page.",
            "Republishing full articles, reports, ranking tables or index series requires written permission.",
          ],
        },
        {
          heading: "Accuracy",
          body: [
            "R&R publishes research and analysis, not investment, legal or commercial advice. Decisions taken on the basis of our figures are yours.",
            "Data on this site is currently clearly labelled sample data during development and should not be cited as reported market results.",
          ],
        },
        {
          heading: "Corrections",
          body: [
            "If you believe a published figure is wrong, tell us. Corrections are appended to the affected page, dated and described.",
          ],
        },
        {
          heading: "Changes",
          body: [
            "These terms may be updated as the platform develops. Material changes will be noted on this page.",
          ],
        },
      ]}
    />
  ),
});
