import type { BriefEdition } from "./types";

/** SAMPLE CONTENT — future WordPress custom post type `rr_brief`. */
export const BRIEFS: BriefEdition[] = [
  {
    number: 42,
    slug: "edition-42",
    date: "2026-09-01",
    headline: "The release calendar is getting shorter",
    summary:
      "Windowing pressure, a crowded September slate and what platform pricing changes mean for the rest of the year.",
    intro:
      "This week: exhibition and platforms are negotiating the same calendar from opposite ends, music catalogue values keep separating from launch performance, and two markets published admissions data on different definitions again.",
    numbers: [
      { label: "Titles tracked", value: "1,240", note: "Sample data" },
      { label: "Median theatrical window", value: "XX days", note: "Sample data" },
      { label: "Markets reporting", value: "XX", note: "Sample data" },
      { label: "Chart entries this week", value: "XXX", note: "Sample data" },
    ],
    sections: [
      {
        heading: "Film & TV",
        body: [
          "Three sample titles moved release dates inside the same fortnight, concentrating marketing spend in a narrow window and pushing two smaller releases into October.",
          "Format licensing continues to appear in producer conversations as a secondary revenue line rather than a strategy in its own right.",
        ],
      },
      {
        heading: "Music",
        body: [
          "Catalogue durability, not launch peak, remains the strongest predictor of value in our illustrative sample.",
          "Two sample labels restructured advance terms against multi-year decay assumptions.",
        ],
      },
      {
        heading: "Streaming",
        body: [
          "Mobile-first tiers grew gross additions in our sample model while raising churn — net effect depends on upgrade design.",
          "Local commissioning volumes held steady week on week.",
        ],
      },
      {
        heading: "What We're Watching",
        body: [
          "Whether admissions reporting definitions converge across the two markets that published this week.",
          "Ticket pricing moves ahead of the December season.",
        ],
      },
    ],
    takeaway:
      "The calendar, not the catalogue, is where the pressure is showing first. Watch how exhibitors respond to the December slate before drawing conclusions about window length.",
  },
  {
    number: 41,
    slug: "edition-41",
    date: "2026-08-25",
    headline: "Screen counts are rising faster than admissions",
    summary:
      "Why capacity growth and attendance are diverging in our sample markets, and what that does to average ticket yield.",
    intro:
      "This week: capacity is outpacing attendance in several sample markets, and the gap is showing up in yield rather than headline revenue.",
    numbers: [
      { label: "Screens tracked", value: "XXX", note: "Sample data" },
      { label: "Average occupancy", value: "XX%", note: "Sample data" },
      { label: "Index change", value: "+X.X%", note: "Sample data" },
    ],
    sections: [
      {
        heading: "Film & TV",
        body: ["Sample slate activity was concentrated in two markets."],
      },
      {
        heading: "Music",
        body: ["Festival announcements clustered ahead of the dry season."],
      },
      {
        heading: "Streaming",
        body: ["Catalogue refresh rates were flat across tracked platforms."],
      },
      {
        heading: "What We're Watching",
        body: ["Whether new-build screens sustain occupancy past opening quarter."],
      },
    ],
    takeaway:
      "Capacity growth is not the same as demand growth. Yield is the number to watch.",
  },
  {
    number: 40,
    slug: "edition-40",
    date: "2026-08-18",
    headline: "Where production finance actually breaks",
    summary:
      "Payment lags, bridge finance and the working-capital gap behind delayed slates.",
    intro:
      "This week: producers describe the same working-capital sequence across markets, and it shapes what gets greenlit next.",
    numbers: [
      { label: "Producers surveyed", value: "XX", note: "Sample data" },
      { label: "Median payment lag", value: "XX days", note: "Sample data" },
    ],
    sections: [
      { heading: "Film & TV", body: ["Slate delays clustered around payment schedules."] },
      { heading: "Music", body: ["Touring costs rose against a flat ticket price."] },
      { heading: "Streaming", body: ["No material change in commissioning volume."] },
      { heading: "What We're Watching", body: ["Any movement on completion bond availability."] },
    ],
    takeaway: "Finance infrastructure, not appetite, is the constraint.",
  },
];

export function getBrief(slug: string): BriefEdition | undefined {
  return BRIEFS.find((b) => b.slug === slug);
}

export function latestBrief(): BriefEdition {
  return BRIEFS[0]!;
}

export function briefNeighbours(slug: string) {
  const index = BRIEFS.findIndex((b) => b.slug === slug);
  return {
    previous: index >= 0 && index < BRIEFS.length - 1 ? BRIEFS[index + 1]! : undefined,
    next: index > 0 ? BRIEFS[index - 1]! : undefined,
  };
}
