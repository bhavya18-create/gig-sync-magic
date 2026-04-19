export type Gig = {
  id: string;
  title: string;
  eventType: string;
  date: string;
  location: string;
  budget: number;
  description: string;
  organizer: string;
  applicants: string[];
  status?: "open" | "applied" | "confirmed";
};

export const mockGigs: Gig[] = [
  {
    id: "g1",
    title: "Acoustic set for rooftop wedding",
    eventType: "Wedding",
    date: "2026-05-12",
    location: "Brooklyn, NY",
    budget: 850,
    description: "Looking for an acoustic duo to play a 2-hour cocktail set. Indie folk vibes.",
    organizer: "Lumen Events",
    applicants: ["Marcus Reid", "Ivy Lane Duo"],
  },
  {
    id: "g2",
    title: "Corporate summer party — live band",
    eventType: "Corporate",
    date: "2026-06-04",
    location: "Austin, TX",
    budget: 2400,
    description: "Energetic 4-piece band needed for 90 minutes. Pop / soul covers preferred.",
    organizer: "Northwind Co.",
    applicants: ["The Lush", "Velvet Hour"],
  },
  {
    id: "g3",
    title: "DJ for warehouse launch party",
    eventType: "Launch Party",
    date: "2026-04-30",
    location: "Los Angeles, CA",
    budget: 1200,
    description: "House / techno DJ for 3-hour set. Equipment provided.",
    organizer: "Studio Mira",
    applicants: [],
  },
  {
    id: "g4",
    title: "Jazz trio for restaurant opening",
    eventType: "Opening",
    date: "2026-05-22",
    location: "Chicago, IL",
    budget: 1500,
    description: "Smooth standards across 3 sets. PA on site.",
    organizer: "Maison Verte",
    applicants: ["Blue Note Trio"],
  },
];
