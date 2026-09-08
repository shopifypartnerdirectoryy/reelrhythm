import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Reel & Rhythm" },
      {
        name: "description",
        content:
          "How Reel & Rhythm collects, uses and protects personal data across the website and the R&R Brief newsletter.",
      },
      { property: "og:title", content: "Privacy Policy — Reel & Rhythm" },
      { property: "og:description", content: "How we handle personal data at Reel & Rhythm." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <LegalPage
      label="Privacy Policy"
      title="How we handle your data."
      intro="This policy explains what Reel & Rhythm collects when you read the site or subscribe to the R&R Brief, and what we do with it."
      sections={[
        {
          heading: "What we collect",
          body: [
            "If you subscribe to the R&R Brief we collect the name and email address you provide.",
            "We collect aggregate usage data about how pages are read so we can prioritise coverage. This is not used to build individual profiles.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "Subscriber details are used to send the R&R Brief and occasional notices about new reports. Nothing else.",
            "We do not sell personal data, and we do not share subscriber lists with advertisers or partners.",
          ],
        },
        {
          heading: "Your choices",
          body: [
            "Every email includes an unsubscribe link that takes effect immediately.",
            "You can ask us to confirm what data we hold about you, correct it, or delete it entirely by contacting the editorial desk.",
          ],
        },
        {
          heading: "Retention",
          body: [
            "Subscriber records are kept while your subscription is active and removed after you unsubscribe.",
          ],
        },
      ]}
    />
  ),
});
