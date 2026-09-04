import type { Article } from "./types";
import film from "@/assets/editorial-film.jpg";
import music from "@/assets/editorial-music.jpg";
import cinema from "@/assets/editorial-cinema.jpg";
import streaming from "@/assets/editorial-streaming.jpg";

/**
 * SAMPLE CONTENT — fictional titles and illustrative figures only.
 * Replace with WordPress `post` data before launch.
 */
export const ARTICLES: Article[] = [
  {
    slug: "how-streaming-is-reshaping-african-film-distribution",
    category: "streaming",
    title: "How Streaming Is Reshaping African Film Distribution",
    deck: "Windowing, licensing and local commissioning are converging — and the release calendar is being rewritten around them.",
    excerpt:
      "Platform commissioning has changed what gets made, how long it stays in cinemas, and who carries the financial risk.",
    authorSlug: "amara-okonjo",
    date: "2026-09-02",
    readingTime: 9,
    image: streaming,
    imageAlt: "A viewer browsing a streaming catalogue on a laptop and tablet",
    dataPoint: { label: "Sample: titles tracked", value: "1,240", note: "Sample data" },
    featured: true,
    body: [
      {
        type: "paragraph",
        text: "Distribution decisions that were once made title by title are increasingly made slate by slate. Producers negotiating with platforms are trading upside for certainty, and the shape of the theatrical window is moving with them.",
      },
      { type: "heading", text: "The window is shortening" },
      {
        type: "paragraph",
        text: "In our sample of tracked releases, the median gap between theatrical opening and platform availability has narrowed. Exhibitors argue this compresses the tail of a run; distributors counter that it concentrates marketing spend where it converts.",
      },
      {
        type: "data",
        data: [
          { label: "Median window", value: "XX days", note: "Sample data" },
          { label: "Titles with day-and-date", value: "XX%", note: "Sample data" },
          { label: "Local commissions", value: "XXX", note: "Sample data" },
        ],
      },
      { type: "chart", chartKey: "streaming-share" },
      {
        type: "quote",
        text: "The question is no longer whether a film goes to a platform. It is what the platform pays for exclusivity, and for how long.",
        attribution: "Sample interview, R&R Research",
      },
      { type: "heading", text: "Who carries the risk" },
      {
        type: "paragraph",
        text: "Cost-plus commissioning removes downside for producers but caps participation in a hit. A minority of production companies in our sample retain any backend at all, which has consequences for how studios capitalise their next slate.",
      },
      {
        type: "table",
        table: {
          columns: ["Deal structure", "Share of sample", "Backend retained"],
          rows: [
            ["Cost-plus commission", "XX%", "None"],
            ["Licence, exclusive", "XX%", "Partial"],
            ["Licence, non-exclusive", "XX%", "Full"],
          ],
        },
      },
      {
        type: "paragraph",
        text: "The next phase of this shift will be visible in the balance between original commissions and acquisitions, which we track quarterly.",
      },
    ],
    sources: [
      "R&R Research — sample release tracking set (illustrative)",
      "R&R methodology: see the Methodology page for collection and verification rules",
    ],
  },
  {
    slug: "afrobeats-catalogue-economics",
    category: "music",
    title: "Afrobeats Catalogue Economics, Explained",
    deck: "Why the value of a back catalogue is becoming the defining question for African labels.",
    excerpt:
      "Advance structures, publishing splits and platform payout models are pulling label strategy in different directions.",
    authorSlug: "kwabena-mensah",
    date: "2026-08-28",
    readingTime: 7,
    image: music,
    imageAlt: "Close-up of a recording studio mixing desk",
    dataPoint: { label: "Sample: catalogues reviewed", value: "38", note: "Sample data" },
    body: [
      {
        type: "paragraph",
        text: "Catalogue value is a function of durability, not launch performance. The tracks that hold their streaming share into year three are rarely the ones that peaked hardest in week one.",
      },
      { type: "chart", chartKey: "catalogue-decay" },
      {
        type: "paragraph",
        text: "Labels that structure advances against a three-year decay curve rather than a first-quarter forecast tend to price deals differently, and to sign differently.",
      },
    ],
    sources: ["R&R Research — illustrative catalogue sample"],
  },
  {
    slug: "cinema-build-out-east-africa",
    category: "box-office",
    title: "The Cinema Build-Out Nobody Is Counting",
    deck: "Screen growth is uneven, under-reported, and central to any credible box office estimate.",
    excerpt:
      "Screen counts, seat capacity and pricing move together. Most published figures track only the first.",
    authorSlug: "leila-haddad",
    date: "2026-08-21",
    readingTime: 6,
    image: cinema,
    imageAlt: "Cinema lobby with an evening queue",
    dataPoint: { label: "Sample: markets covered", value: "XX", note: "Sample data" },
    body: [
      {
        type: "paragraph",
        text: "A market with more screens but lower average occupancy can report growth while admissions fall. Reading the two figures together is the whole exercise.",
      },
      { type: "chart", chartKey: "ticket-index" },
      {
        type: "paragraph",
        text: "The R&R Ticket Price Index exists to make that comparison possible across markets with different reporting standards.",
      },
    ],
    sources: ["R&R Ticket Price Index — sample series"],
  },
  {
    slug: "nollywood-production-finance",
    category: "business",
    title: "Nollywood's Production Finance Problem",
    deck: "Working capital, not talent, is the binding constraint on slate size.",
    excerpt:
      "Bridge finance, completion bonds and receivables discounting are still thin — and that shapes what gets greenlit.",
    authorSlug: "amara-okonjo",
    date: "2026-08-14",
    readingTime: 8,
    image: film,
    imageAlt: "Film crew working on a studio set",
    body: [
      {
        type: "paragraph",
        text: "Producers describe the same sequence: a commission is agreed, payment schedules stretch, and the gap is covered personally or not at all.",
      },
      {
        type: "data",
        data: [
          { label: "Median payment lag", value: "XX days", note: "Sample data" },
          { label: "Slates delayed", value: "XX%", note: "Sample data" },
        ],
      },
    ],
    sources: ["R&R Research — sample producer survey (illustrative)"],
  },
  {
    slug: "audience-behaviour-second-screen",
    category: "audience",
    title: "What Second-Screen Behaviour Tells Us About Retention",
    deck: "Attention is shared. Measurement rarely accounts for it.",
    excerpt:
      "Completion rates read differently once concurrent device use is taken into account.",
    authorSlug: "thandi-mokoena",
    date: "2026-08-07",
    readingTime: 5,
    image: streaming,
    imageAlt: "A person watching video on a laptop while holding a phone",
    body: [
      {
        type: "paragraph",
        text: "Our sample panel suggests that a meaningful share of completed views involve concurrent phone use, which complicates any read of engagement based on completion alone.",
      },
    ],
    sources: ["R&R Research — sample audience panel (illustrative)"],
  },
  {
    slug: "television-formats-licensing",
    category: "film-tv",
    title: "Format Licensing Is Quietly Becoming an Export Business",
    deck: "Local formats are travelling. The rights infrastructure is catching up slowly.",
    excerpt:
      "Adaptation deals are increasing in our sample, but standard terms remain inconsistent across markets.",
    authorSlug: "amara-okonjo",
    date: "2026-07-31",
    readingTime: 6,
    image: film,
    imageAlt: "Television production crew on set",
    body: [
      {
        type: "paragraph",
        text: "Format sales rarely appear in headline production figures, yet they represent recurring, low-capital revenue for the producers who hold the underlying rights.",
      },
    ],
    sources: ["R&R Research — sample rights tracking"],
  },
  {
    slug: "streaming-price-tiers-africa",
    category: "streaming",
    title: "Price Tiers, Churn and the Mobile-First Subscriber",
    deck: "Ad-supported and mobile-only tiers are changing the shape of the subscriber base.",
    excerpt:
      "Lower entry prices raise gross additions and churn at the same time. Net growth depends on which moves faster.",
    authorSlug: "kwabena-mensah",
    date: "2026-07-24",
    readingTime: 7,
    image: streaming,
    imageAlt: "Streaming interface on a laptop screen",
    body: [
      {
        type: "paragraph",
        text: "In our illustrative model, a mobile-only tier priced below the standard plan grows the base but reduces revenue per user unless upgrade paths are deliberate.",
      },
      { type: "chart", chartKey: "streaming-share" },
    ],
    sources: ["R&R Research — illustrative model"],
  },
  {
    slug: "concert-economics-lagos-nairobi",
    category: "industry",
    title: "Concert Economics: Two Cities, Two Cost Structures",
    deck: "Venue supply, insurance and freight explain more of the ticket price than headline fees.",
    excerpt:
      "Comparing sample cost stacks across two markets shows where promoter margin actually sits.",
    authorSlug: "leila-haddad",
    date: "2026-07-17",
    readingTime: 6,
    image: music,
    imageAlt: "Studio and live sound equipment",
    body: [
      {
        type: "paragraph",
        text: "Artist fees dominate the conversation and rarely dominate the budget. In our sample stacks, production and logistics together exceed talent cost.",
      },
      {
        type: "table",
        table: {
          columns: ["Cost line", "Market A", "Market B"],
          rows: [
            ["Talent", "XX%", "XX%"],
            ["Production", "XX%", "XX%"],
            ["Venue & logistics", "XX%", "XX%"],
            ["Marketing", "XX%", "XX%"],
          ],
        },
      },
    ],
    sources: ["R&R Research — sample promoter budgets (illustrative)"],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function featuredArticle(): Article {
  return ARTICLES.find((a) => a.featured) ?? ARTICLES[0]!;
}

export function articlesByAuthor(slug: string): Article[] {
  return ARTICLES.filter((a) => a.authorSlug === slug);
}

export function relatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticle(slug);
  if (!current) return ARTICLES.slice(0, limit);
  const sameCategory = ARTICLES.filter(
    (a) => a.slug !== slug && a.category === current.category,
  );
  const rest = ARTICLES.filter((a) => a.slug !== slug && a.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
