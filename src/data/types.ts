/**
 * Content model for Reel & Rhythm.
 *
 * These types mirror the intended WordPress content architecture:
 *  - Article  -> `post` (category taxonomy: Film & TV, Music, ...)
 *  - Brief    -> custom post type `rr_brief`
 *  - Report   -> custom post type `rr_report`
 *  - Ranking  -> custom post type `rr_ranking` + repeating rank rows
 *  - Author   -> WordPress user
 *
 * Everything in `src/data/*` is sample data only. Swap these modules for
 * REST API calls (`/wp-json/wp/v2/...`) without touching presentation code.
 */

export type CategorySlug =
  | "film-tv"
  | "music"
  | "streaming"
  | "box-office"
  | "business"
  | "audience"
  | "industry";

export interface Category {
  slug: CategorySlug;
  name: string;
}

export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  initials: string;
}

export interface DataPoint {
  label: string;
  value: string;
  note?: string;
}

export interface ArticleBlock {
  type: "paragraph" | "heading" | "quote" | "data" | "chart" | "table";
  text?: string;
  attribution?: string;
  data?: DataPoint[];
  chartKey?: string;
  table?: { columns: string[]; rows: string[][] };
}

export interface Article {
  slug: string;
  category: CategorySlug;
  title: string;
  deck: string;
  excerpt: string;
  authorSlug: string;
  date: string; // ISO
  readingTime: number;
  image: string;
  imageAlt: string;
  dataPoint?: DataPoint;
  featured?: boolean;
  body: ArticleBlock[];
  sources?: string[];
}

export interface BriefSection {
  heading: string;
  body: string[];
}

export interface BriefEdition {
  number: number;
  slug: string;
  date: string;
  headline: string;
  summary: string;
  intro: string;
  numbers: DataPoint[];
  sections: BriefSection[];
  takeaway: string;
}

export interface Report {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  description: string;
  pages: number;
  dataPoints: number;
  executiveSummary: string;
  keyFindings: string[];
  highlights: DataPoint[];
  methodology: string[];
  sections: { heading: string; body: string[] }[];
  sources: string[];
}

export type Movement = "up" | "down" | "same" | "new";

export interface RankingRow {
  rank: number;
  previousRank: number | null;
  title: string;
  subtitle?: string;
  country: string;
  metricValue: string;
  changePct?: number;
}

export interface Ranking {
  slug: string;
  title: string;
  type: "film" | "streaming" | "music" | "box-office" | "cinema" | "audience" | "markets";
  description: string;
  metricLabel: string;
  entityLabel: string;
  period: string;
  updated: string;
  source: string;
  methodology: string;
  rows: RankingRow[];
}

export interface SeriesPoint {
  label: string;
  value: number;
  comparison?: number;
}
