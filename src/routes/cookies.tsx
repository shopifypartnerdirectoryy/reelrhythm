import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Reel & Rhythm" },
      {
        name: "description",
        content:
          "Which cookies Reel & Rhythm uses, what they are for, and how to control them in your browser.",
      },
      { property: "og:title", content: "Cookie Policy — Reel & Rhythm" },
      { property: "og:description", content: "How Reel & Rhythm uses cookies." },
      { property: "og:url", content: "/cookies" },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
  component: () => (
    <LegalPage
      label="Cookie Policy"
      title="The cookies we use."
      intro="Reel & Rhythm keeps cookie use to the minimum needed to run the site and understand which coverage is read."
      sections={[
        {
          heading: "Essential cookies",
          body: [
            "A small number of cookies are needed for the site to function, such as remembering display preferences. These cannot be switched off.",
          ],
        },
        {
          heading: "Analytics cookies",
          body: [
            "We use aggregate analytics to see which articles, rankings and reports are read. These figures are reported in aggregate and are not used to identify individual readers.",
          ],
        },
        {
          heading: "Advertising",
          body: [
            "We do not use third-party advertising or cross-site tracking cookies.",
          ],
        },
        {
          heading: "Managing cookies",
          body: [
            "You can block or delete cookies in your browser settings at any time. Blocking essential cookies may affect how parts of the site behave.",
          ],
        },
      ]}
    />
  ),
});
