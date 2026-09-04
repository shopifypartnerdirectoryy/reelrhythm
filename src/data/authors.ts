import type { Author } from "./types";

/** Sample authors. Maps to WordPress users with an extended profile field group. */
export const AUTHORS: Author[] = [
  {
    slug: "amara-okonjo",
    name: "Amara Okonjo",
    role: "Editor-in-Chief",
    bio: "Amara leads editorial direction at Reel & Rhythm, with a focus on the economics of film and television production across West Africa. She previously covered media and telecoms for regional business publications.",
    expertise: ["Film & TV", "Media business", "Production finance"],
    initials: "AO",
  },
  {
    slug: "thandi-mokoena",
    name: "Thandi Mokoena",
    role: "Head of Research",
    bio: "Thandi designs the methodology behind R&R rankings and indices. Her work centres on audience measurement, ticketing data and survey design in markets with fragmented reporting.",
    expertise: ["Research design", "Audience measurement", "Indices"],
    initials: "TM",
  },
  {
    slug: "kwabena-mensah",
    name: "Kwabena Mensah",
    role: "Music & Streaming Correspondent",
    bio: "Kwabena reports on Afrobeats, catalogue economics and the platform strategies of streaming services operating across the continent.",
    expertise: ["Afrobeats", "Streaming", "Rights & catalogue"],
    initials: "KM",
  },
  {
    slug: "leila-haddad",
    name: "Leila Haddad",
    role: "Markets Analyst",
    bio: "Leila tracks exhibition, cinema build-out and ticket pricing across North and East African markets, and maintains the R&R Ticket Price Index.",
    expertise: ["Cinema & exhibition", "Pricing", "Market sizing"],
    initials: "LH",
  },
];

export function getAuthor(slug: string): Author | undefined {
  return AUTHORS.find((a) => a.slug === slug);
}

export function authorName(slug: string): string {
  return getAuthor(slug)?.name ?? "R&R Newsroom";
}
