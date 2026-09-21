export type CaseStudy = {
  slug: string;
  client: string;
  category: string;
  image: string;
  stats?: { label: string; value: string }[];
  content?: {
    story?: string;
    goal?: string;
    solution?: string;
    results?: string;
  };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "aq-foodhall",
    client: "AQ Foodhall",
    category: "Group Venture Destination",
    image: "/images/aq-foodhall.jpg"
  },
  {
    slug: "community-screenings",
    client: "Community Screenings",
    category: "LED screen, UKSPF capital grant, 22 events, 3,771 attendances",
    image: "/images/screenings.jpg"
  },
  {
    slug: "content-creator-programme",
    client: "Content Creator Programme",
    category: "SCCB partnership, WMCA support, 14 completions",
    image: "/images/content-creator.jpg"
  },

  {
    slug: "art-barbers",
    client: "Art Barbers",
    category: "Brand & customer experience",
    image: "/images/barbers.jpg"
  },
  {
    slug: "art-salon",
    client: "Art Salon",
    category: "Brand & audience understanding",
    image: "/images/salon.jpg"
  },
  {
    slug: "community-events",
    client: "Community events",
    category: "St George's Day & Big Lunch",
    image: "/images/events.jpg"
  }
];