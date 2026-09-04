import type { Movement, Ranking, RankingRow, SeriesPoint } from "./types";

/** SAMPLE CONTENT — future WordPress custom post type `rr_ranking`. */

export function movementOf(row: RankingRow): Movement {
  if (row.previousRank === null) return "new";
  if (row.previousRank > row.rank) return "up";
  if (row.previousRank < row.rank) return "down";
  return "same";
}

export const RANKING_TABS = [
  { key: "all", label: "All" },
  { key: "film", label: "Film" },
  { key: "streaming", label: "Streaming" },
  { key: "music", label: "Music" },
  { key: "box-office", label: "Box Office" },
  { key: "cinema", label: "Cinema" },
  { key: "audience", label: "Audience" },
  { key: "markets", label: "Markets" },
] as const;

export const RANKINGS: Ranking[] = [
  {
    slug: "highest-grossing-films",
    title: "Highest-Grossing Films",
    type: "box-office",
    description:
      "Theatrical performance across tracked African markets, ranked by reported gross for the selected period.",
    metricLabel: "Gross",
    entityLabel: "Title",
    period: "Week of 25 Aug – 31 Aug 2026",
    updated: "2026-09-01",
    source: "R&R Research — sample exhibition returns",
    methodology:
      "Gross is collected from exhibitor returns where available and never derived from admissions. Titles without a verified return for the period are excluded rather than estimated.",
    rows: [
      { rank: 1, previousRank: 2, title: "The Harmattan Line", country: "Nigeria", metricValue: "₦XXX.XM", changePct: 12.4 },
      { rank: 2, previousRank: 1, title: "Salt of Accra", country: "Ghana", metricValue: "₦XXX.XM", changePct: -6.1 },
      { rank: 3, previousRank: null, title: "Nairobi After Dark", country: "Kenya", metricValue: "₦XX.XM" },
      { rank: 4, previousRank: 4, title: "The Cartographer's Daughter", country: "South Africa", metricValue: "₦XX.XM", changePct: 0.4 },
      { rank: 5, previousRank: 3, title: "Sahel Blue", country: "Senegal", metricValue: "₦XX.XM", changePct: -9.8 },
      { rank: 6, previousRank: 8, title: "Two Rivers", country: "Nigeria", metricValue: "₦XX.XM", changePct: 5.2 },
      { rank: 7, previousRank: 5, title: "Copperbelt", country: "Zambia", metricValue: "₦XX.XM", changePct: -3.3 },
      { rank: 8, previousRank: 9, title: "House of Ijebu", country: "Nigeria", metricValue: "₦XX.XM", changePct: 1.9 },
      { rank: 9, previousRank: 7, title: "The Long Rains", country: "Kenya", metricValue: "₦X.XM", changePct: -11.0 },
      { rank: 10, previousRank: null, title: "Marrakech Standard", country: "Morocco", metricValue: "₦X.XM" },
    ],
  },
  {
    slug: "streaming-rankings",
    title: "Streaming Rankings",
    type: "streaming",
    description:
      "Most-watched titles across tracked streaming platforms operating in African markets.",
    metricLabel: "Share of viewing",
    entityLabel: "Title",
    period: "Week of 25 Aug – 31 Aug 2026",
    updated: "2026-09-01",
    source: "R&R Research — sample platform panel",
    methodology:
      "Share of viewing is normalised across platforms using a common definition of a qualifying view. Platforms that do not disclose a comparable denominator are reported separately.",
    rows: [
      { rank: 1, previousRank: 1, title: "The Harmattan Line", subtitle: "Platform A", country: "Nigeria", metricValue: "X.X%", changePct: 2.1 },
      { rank: 2, previousRank: 4, title: "Lagos Signal", subtitle: "Platform B", country: "Nigeria", metricValue: "X.X%", changePct: 8.6 },
      { rank: 3, previousRank: 2, title: "Nairobi After Dark", subtitle: "Platform A", country: "Kenya", metricValue: "X.X%", changePct: -1.4 },
      { rank: 4, previousRank: 3, title: "Salt of Accra", subtitle: "Platform C", country: "Ghana", metricValue: "X.X%", changePct: -2.8 },
      { rank: 5, previousRank: null, title: "The Cartographer's Daughter", subtitle: "Platform B", country: "South Africa", metricValue: "X.X%" },
      { rank: 6, previousRank: 5, title: "Copperbelt", subtitle: "Platform C", country: "Zambia", metricValue: "X.X%", changePct: -0.6 },
      { rank: 7, previousRank: 7, title: "Two Rivers", subtitle: "Platform A", country: "Nigeria", metricValue: "X.X%", changePct: 0 },
      { rank: 8, previousRank: 6, title: "Sahel Blue", subtitle: "Platform D", country: "Senegal", metricValue: "X.X%", changePct: -4.2 },
    ],
  },
  {
    slug: "music-rankings",
    title: "African Music Rankings",
    type: "music",
    description:
      "Songs ranked by combined streaming and radio activity across tracked African markets.",
    metricLabel: "R&R Index",
    entityLabel: "Song / Artist",
    period: "Week of 25 Aug – 31 Aug 2026",
    updated: "2026-09-01",
    source: "R&R Research — sample chart panel",
    methodology:
      "The index blends normalised streaming activity with tracked radio rotation. Weighting is published and reviewed quarterly.",
    rows: [
      { rank: 1, previousRank: 1, title: "Owambe Season", subtitle: "Tolu Ade", country: "Nigeria", metricValue: "XX.X", changePct: 1.2 },
      { rank: 2, previousRank: 5, title: "Rain in Aburi", subtitle: "Kofi Nyame", country: "Ghana", metricValue: "XX.X", changePct: 14.7 },
      { rank: 3, previousRank: 2, title: "Bahari", subtitle: "Zawadi", country: "Kenya", metricValue: "XX.X", changePct: -2.0 },
      { rank: 4, previousRank: null, title: "Gqom Letter", subtitle: "Sipho M", country: "South Africa", metricValue: "XX.X" },
      { rank: 5, previousRank: 3, title: "Dakar Nights", subtitle: "Awa Sy", country: "Senegal", metricValue: "XX.X", changePct: -6.4 },
      { rank: 6, previousRank: 6, title: "Third Mainland", subtitle: "Ejima", country: "Nigeria", metricValue: "XX.X", changePct: 0 },
      { rank: 7, previousRank: 4, title: "Kampala Blue", subtitle: "Nsubuga", country: "Uganda", metricValue: "XX.X", changePct: -8.1 },
      { rank: 8, previousRank: 10, title: "Harmattan Dust", subtitle: "Tolu Ade", country: "Nigeria", metricValue: "XX.X", changePct: 6.9 },
    ],
  },
  {
    slug: "top-films-cinema-admissions",
    title: "Cinema Admissions",
    type: "cinema",
    description: "Admissions by title across tracked exhibitors.",
    metricLabel: "Admissions",
    entityLabel: "Title",
    period: "Week of 25 Aug – 31 Aug 2026",
    updated: "2026-09-01",
    source: "R&R Research — sample exhibitor returns",
    methodology: "Admissions are reported directly by exhibitors and are never derived from gross.",
    rows: [
      { rank: 1, previousRank: 1, title: "The Harmattan Line", country: "Nigeria", metricValue: "XXX,XXX", changePct: 3.1 },
      { rank: 2, previousRank: 3, title: "Salt of Accra", country: "Ghana", metricValue: "XX,XXX", changePct: 7.4 },
      { rank: 3, previousRank: 2, title: "Nairobi After Dark", country: "Kenya", metricValue: "XX,XXX", changePct: -4.5 },
      { rank: 4, previousRank: null, title: "Marrakech Standard", country: "Morocco", metricValue: "XX,XXX" },
      { rank: 5, previousRank: 4, title: "Copperbelt", country: "Zambia", metricValue: "X,XXX", changePct: -1.2 },
    ],
  },
  {
    slug: "market-growth",
    title: "Market Activity",
    type: "markets",
    description: "Tracked markets ranked by period-on-period activity in the R&R sample.",
    metricLabel: "Activity index",
    entityLabel: "Market",
    period: "August 2026",
    updated: "2026-09-01",
    source: "R&R Research — sample market panel",
    methodology: "Activity blends admissions, streaming activity and live event volume, rebased to 100.",
    rows: [
      { rank: 1, previousRank: 1, title: "Nigeria", country: "West Africa", metricValue: "XXX.X", changePct: 2.4 },
      { rank: 2, previousRank: 2, title: "South Africa", country: "Southern Africa", metricValue: "XXX.X", changePct: 1.1 },
      { rank: 3, previousRank: 4, title: "Kenya", country: "East Africa", metricValue: "XX.X", changePct: 4.8 },
      { rank: 4, previousRank: 3, title: "Ghana", country: "West Africa", metricValue: "XX.X", changePct: -0.9 },
      { rank: 5, previousRank: 5, title: "Morocco", country: "North Africa", metricValue: "XX.X", changePct: 0.3 },
      { rank: 6, previousRank: null, title: "Senegal", country: "West Africa", metricValue: "XX.X" },
    ],
  },
  {
    slug: "audience-reach",
    title: "Audience Reach",
    type: "audience",
    description: "Estimated weekly reach by content format in the R&R sample panel.",
    metricLabel: "Weekly reach",
    entityLabel: "Format",
    period: "August 2026",
    updated: "2026-09-01",
    source: "R&R Research — sample audience panel",
    methodology: "Panel-based estimates using a normalised definition of weekly reach.",
    rows: [
      { rank: 1, previousRank: 1, title: "Broadcast television", country: "Pan-African", metricValue: "XX%", changePct: -0.4 },
      { rank: 2, previousRank: 2, title: "Streaming video", country: "Pan-African", metricValue: "XX%", changePct: 2.2 },
      { rank: 3, previousRank: 3, title: "Short-form video", country: "Pan-African", metricValue: "XX%", changePct: 3.6 },
      { rank: 4, previousRank: 4, title: "Cinema", country: "Pan-African", metricValue: "X%", changePct: 0.2 },
    ],
  },
];

export function getRanking(slug: string): Ranking | undefined {
  return RANKINGS.find((r) => r.slug === slug);
}

export function rankingsByType(type: string): Ranking[] {
  if (type === "all") return RANKINGS;
  if (type === "film") return RANKINGS.filter((r) => r.type === "box-office" || r.type === "cinema");
  return RANKINGS.filter((r) => r.type === type);
}

/** Chart series — replace with API/WordPress data. */
export const SERIES: Record<string, SeriesPoint[]> = {
  "ticket-index": [
    { label: "Q1 25", value: 100, comparison: 100 },
    { label: "Q2 25", value: 102.4, comparison: 101.1 },
    { label: "Q3 25", value: 104.9, comparison: 101.8 },
    { label: "Q4 25", value: 108.2, comparison: 103.4 },
    { label: "Q1 26", value: 110.6, comparison: 104.2 },
    { label: "Q2 26", value: 113.9, comparison: 105.7 },
    { label: "Q3 26", value: 116.1, comparison: 106.3 },
  ],
  "ticket-index-monthly": [
    { label: "Mar", value: 109.1 },
    { label: "Apr", value: 110.4 },
    { label: "May", value: 111.8 },
    { label: "Jun", value: 113.2 },
    { label: "Jul", value: 114.6 },
    { label: "Aug", value: 116.1 },
  ],
  "ticket-index-weekly": [
    { label: "W31", value: 115.2 },
    { label: "W32", value: 115.4 },
    { label: "W33", value: 115.7 },
    { label: "W34", value: 115.9 },
    { label: "W35", value: 116.1 },
  ],
  "ticket-index-annual": [
    { label: "2022", value: 88.4 },
    { label: "2023", value: 92.7 },
    { label: "2024", value: 96.1 },
    { label: "2025", value: 103.8 },
    { label: "2026", value: 116.1 },
  ],
  "streaming-share": [
    { label: "Platform A", value: 34 },
    { label: "Platform B", value: 26 },
    { label: "Platform C", value: 19 },
    { label: "Platform D", value: 12 },
    { label: "Others", value: 9 },
  ],
  "catalogue-decay": [
    { label: "Y1", value: 100 },
    { label: "Y2", value: 62 },
    { label: "Y3", value: 44 },
    { label: "Y4", value: 35 },
    { label: "Y5", value: 30 },
  ],
  "box-office-trend": [
    { label: "Mar", value: 62, comparison: 55 },
    { label: "Apr", value: 68, comparison: 58 },
    { label: "May", value: 74, comparison: 61 },
    { label: "Jun", value: 71, comparison: 63 },
    { label: "Jul", value: 83, comparison: 66 },
    { label: "Aug", value: 89, comparison: 69 },
  ],
};

export const TICKET_INDEX = {
  current: 116.1,
  previous: 113.9,
  averagePrice: "₦X,XXX",
  markets: ["Nigeria", "Ghana", "Kenya", "South Africa", "Morocco"],
  updated: "2026-09-01",
} as const;
