import type { Category, DataPoint } from "./types";

export const SITE = {
  name: "Reel & Rhythm",
  short: "R&R",
  tagline: "Intelligence for the African Creative Economy",
  description:
    "Tracking the numbers, trends, people and business shaping Africa's entertainment and creative industries.",
  updated: "September 2026",
} as const;

export const NAV = [
  { label: "R&R Brief", to: "/brief" },
  { label: "R&R Insights", to: "/insights" },
  { label: "Charts & Rankings", to: "/charts" },
  { label: "R&R Reports", to: "/reports" },
  { label: "About", to: "/about" },
] as const;

export const FOOTER_NAV = [
  { label: "R&R Brief", to: "/brief" },
  { label: "R&R Insights", to: "/insights" },
  { label: "Charts & Rankings", to: "/charts" },
  { label: "Reports", to: "/reports" },
  { label: "Newsletter Archive", to: "/newsletter" },
  { label: "Authors", to: "/authors" },
  { label: "About", to: "/about" },
  { label: "Methodology", to: "/methodology" },
  { label: "Contact", to: "/contact" },
] as const;

export const CATEGORIES: Category[] = [
  { slug: "film-tv", name: "Film & TV" },
  { slug: "music", name: "Music" },
  { slug: "streaming", name: "Streaming" },
  { slug: "box-office", name: "Box Office" },
  { slug: "business", name: "Business" },
  { slug: "audience", name: "Audience" },
  { slug: "industry", name: "Industry" },
];

export function categoryName(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}

/** Editable in WordPress later (options / ACF field group: "Homepage Numbers"). */
export const HEADLINE_STATS: (DataPoint & { change?: string })[] = [
  { label: "Box Office Tracked", value: "₦X.XB", note: "Sample data", change: "+X.X%" },
  { label: "Streaming Activity", value: "XXM", note: "Sample data", change: "+X.X%" },
  { label: "Markets Covered", value: "XX", note: "Sample data" },
  { label: "Audience Growth", value: "XX%", note: "Sample data", change: "+X.X pts" },
];

export const PRODUCTS = [
  {
    eyebrow: "R&R Brief",
    title: "R&R Brief",
    description:
      "Your weekly briefing on film, television, music, streaming and the business of African entertainment.",
    cta: "Read the Brief",
    to: "/brief",
  },
  {
    eyebrow: "R&R Insights",
    title: "R&R Insights",
    description:
      "Original analysis and reporting on the forces shaping Africa's creative industries.",
    cta: "Explore Insights",
    to: "/insights",
  },
  {
    eyebrow: "R&R Charts & Rankings",
    title: "R&R Charts & Rankings",
    description: "Track the performers, platforms and markets moving the numbers.",
    cta: "View Rankings",
    to: "/charts",
  },
  {
    eyebrow: "R&R Reports",
    title: "R&R Reports",
    description:
      "Deeper research into the markets, audiences and businesses behind African entertainment.",
    cta: "Explore Reports",
    to: "/reports",
  },
] as const;

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
