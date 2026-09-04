import type { Report } from "./types";

/** SAMPLE CONTENT — future WordPress custom post type `rr_report`. */
export const REPORTS: Report[] = [
  {
    slug: "african-streaming-outlook-2026",
    title: "The African Streaming Outlook",
    subtitle: "Pricing, churn and commissioning across seven sample markets",
    category: "Streaming",
    date: "2026-08-30",
    description:
      "A structural view of how subscription pricing, ad-supported tiers and local commissioning interact across the markets R&R tracks.",
    pages: 48,
    dataPoints: 120,
    executiveSummary:
      "Subscription growth in our sample markets is increasingly driven by lower-priced mobile tiers. That shifts the economics of commissioning: platforms need more local volume per revenue unit, while producers face flatter licence fees. This report sets out an illustrative framework for reading those trade-offs, using clearly labelled sample data throughout.",
    keyFindings: [
      "Entry-tier pricing raises gross additions and churn simultaneously in our illustrative model.",
      "Local commissioning volume correlates more closely with subscriber base than with revenue per user.",
      "Reported subscriber figures are rarely comparable across platforms without normalising definitions.",
      "Ad-supported inventory remains constrained by measurement rather than demand.",
    ],
    highlights: [
      { label: "Markets modelled", value: "7", note: "Sample data" },
      { label: "Platforms tracked", value: "XX", note: "Sample data" },
      { label: "Model horizon", value: "36 months", note: "Sample data" },
    ],
    methodology: [
      "Sample construction: platforms and markets were selected for coverage breadth, not market share.",
      "All figures shown are illustrative placeholders and are labelled as sample data.",
      "Definitions for subscriber, active user and churn are normalised before comparison.",
      "Where a source does not publish a figure, the cell is left empty rather than estimated.",
    ],
    sections: [
      {
        heading: "Market structure",
        body: [
          "Platform strategy in the sample splits between breadth-first catalogue plays and depth-first local commissioning. The two produce different cost curves.",
          "Distribution partnerships with mobile operators remain the primary acquisition channel in most sample markets.",
        ],
      },
      {
        heading: "Pricing and churn",
        body: [
          "Lower entry pricing expands the addressable base but compresses revenue per user. Upgrade design determines whether that trade is positive over the model horizon.",
        ],
      },
      {
        heading: "Commissioning",
        body: [
          "Cost-plus structures dominate in the sample, concentrating downside protection with producers and upside with platforms.",
        ],
      },
    ],
    sources: [
      "R&R Research — illustrative model inputs",
      "Publicly disclosed platform statements, where definitions permit comparison",
    ],
  },
  {
    slug: "box-office-and-exhibition",
    title: "Box Office & Exhibition",
    subtitle: "Screen supply, occupancy and yield in sample African markets",
    category: "Film",
    date: "2026-07-12",
    description:
      "How screen build-out, occupancy and pricing combine to produce reported box office — and where published figures diverge.",
    pages: 36,
    dataPoints: 90,
    executiveSummary:
      "Reported box office growth in the sample is driven as much by pricing and capacity as by admissions. Reading the three together produces a materially different picture from headline revenue alone.",
    keyFindings: [
      "Capacity growth outpaced admissions growth in most sample markets.",
      "Average yield is a more stable comparison metric than gross revenue.",
      "Reporting definitions differ enough to make cross-market totals unreliable without adjustment.",
    ],
    highlights: [
      { label: "Markets covered", value: "XX", note: "Sample data" },
      { label: "Screens in sample", value: "XXX", note: "Sample data" },
      { label: "Series length", value: "24 months", note: "Sample data" },
    ],
    methodology: [
      "Admissions and gross are collected separately and never derived from one another.",
      "Index values are rebased to 100 at the series start.",
      "Corrections are published with a dated note.",
    ],
    sections: [
      {
        heading: "Supply",
        body: ["New-build screens cluster in a small number of urban catchments."],
      },
      {
        heading: "Demand",
        body: ["Occupancy is seasonal and highly sensitive to release timing."],
      },
    ],
    sources: ["R&R Ticket Price Index — sample series", "R&R Research — exhibition tracking"],
  },
  {
    slug: "afrobeats-catalogue-value",
    title: "Afrobeats Catalogue Value",
    subtitle: "Durability, decay curves and what catalogues are worth",
    category: "Music",
    date: "2026-06-05",
    description:
      "An illustrative framework for valuing African music catalogues based on multi-year decay rather than launch performance.",
    pages: 30,
    dataPoints: 75,
    executiveSummary:
      "Launch performance is a weak predictor of catalogue value. This report sets out a decay-based framework and applies it to an illustrative sample.",
    keyFindings: [
      "Year-three retained share separates catalogues more than first-quarter peak.",
      "Publishing splits materially change effective yield.",
      "Advance structures priced on launch data systematically misprice durable catalogues.",
    ],
    highlights: [
      { label: "Catalogues in sample", value: "38", note: "Sample data" },
      { label: "Decay horizon", value: "5 years", note: "Sample data" },
    ],
    methodology: [
      "Decay curves are fitted on illustrative sample data only.",
      "No real artist or label figures are presented.",
    ],
    sections: [
      {
        heading: "Valuation framework",
        body: ["The model discounts a fitted decay curve rather than a flat multiple."],
      },
    ],
    sources: ["R&R Research — illustrative catalogue sample"],
  },
  {
    slug: "audience-measurement-gap",
    title: "The Audience Measurement Gap",
    subtitle: "Why African audience data is fragmented, and what to do about it",
    category: "Audience",
    date: "2026-05-02",
    description:
      "A review of measurement practice across broadcast, cinema and streaming, and a proposed minimum reporting standard.",
    pages: 42,
    dataPoints: 60,
    executiveSummary:
      "Fragmented definitions, not missing data, are the main barrier to comparable audience measurement across the continent.",
    keyFindings: [
      "Four incompatible definitions of an 'active viewer' appear in the sample.",
      "A minimum reporting standard would resolve most comparability issues.",
    ],
    highlights: [{ label: "Sources reviewed", value: "XX", note: "Sample data" }],
    methodology: ["Desk review of publicly available reporting practice."],
    sections: [
      { heading: "Definitions", body: ["Standardising the denominator is the first step."] },
    ],
    sources: ["R&R Research — desk review"],
  },
];

export const REPORT_CATEGORIES = [
  "All",
  "Film",
  "Music",
  "Streaming",
  "Audience",
  "Business",
  "Creative Economy",
];

export function getReport(slug: string): Report | undefined {
  return REPORTS.find((r) => r.slug === slug);
}

export function latestReport(): Report {
  return REPORTS[0];
}
