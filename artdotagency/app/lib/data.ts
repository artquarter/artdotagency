export type CaseStudy = {
  slug: string;
  client: string;
  category: string;
  image: string;
  video?: string;
  stats?: { label: string; value: string }[];
  content?: {
    brief?: string;
    ourRole?: string;
    workDelivered?: string;
    evidencedResult?: string;
    deliveringOrganisation?: string;
    partners?: string;
  };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "community-screenings",
    client: "Inclusive community screenings at Art Quarter",
    category: "LED screen and public screening programme",
    image: "/images/screenings.jpg",
    stats: [
      { label: "UKSPF capital grant", value: "£29,496.60" },
      { label: "Events", value: "22" },
      { label: "Recorded attendances", value: "3,771" }
    ],
    content: {
      brief: "To procure and install an inclusive LED screen and deliver a programme of public screenings to engage the local community.",
      ourRole: "Procurement, funding development, installation coordination, programming, communications and reporting.",
      workDelivered: "A full public screening programme delivered at AQ Foodhall, providing shared cultural experiences in a community setting.",
      evidencedResult: "Successfully secured capital grant and delivered 22 events with 3,771 recorded attendances.",
      deliveringOrganisation: "Art Quarter",
      partners: "UK Shared Prosperity Fund (UKSPF)"
    }
  },
  {
    slug: "content-creator-programme",
    client: "Content Creator Training Programme",
    category: "Creative skills training",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    video: "/vid/content-creator-winter-2025.mp4",
    stats: [
      { label: "Completions", value: "14" }
    ],
    content: {
      brief: "To deliver practical content creator training for the next generation of Birmingham creatives.",
      ourRole: "Programme design, partner coordination, and practical production training.",
      workDelivered: "A structured training cohort delivering practical skills development in a working environment.",
      evidencedResult: "14 learner completions and practical production outputs for Art Quarter brands.",
      deliveringOrganisation: "Art Quarter",
      partners: "South and City College Birmingham (SCCB), West Midlands Combined Authority (WMCA)"
    }
  },
  {
    slug: "aq-foodhall",
    client: "AQ Foodhall",
    category: "Group Venture Destination",
    image: "/images/aq-foodhall.jpg",
    content: {
      brief: "To establish a vibrant food and hospitality concept in Digbeth.",
      ourRole: "Concept development and operational mobilisation.",
      workDelivered: "A multi-vendor food hall environment.",
      evidencedResult: "Established a working environment that anchors the Art Quarter ecosystem.",
      deliveringOrganisation: "Art Quarter"
    }
  },
  {
    slug: "art-barbers",
    client: "Art Barbers",
    category: "Brand & customer experience",
    image: "/images/barbers.jpg",
    content: {
      brief: "To develop a distinctive personal service brand.",
      ourRole: "Brand creation and experiential design.",
      workDelivered: "A fully mobilised barbering environment.",
      evidencedResult: "Integrated into the Art Quarter ecosystem.",
      deliveringOrganisation: "Art Quarter"
    }
  },
  {
    slug: "art-salon",
    client: "Art Salon",
    category: "Brand & audience understanding",
    image: "/images/salon.jpg",
    content: {
      brief: "To expand the personal services offer with a dedicated salon brand.",
      ourRole: "Brand creation and audience engagement.",
      workDelivered: "A fully mobilised salon environment.",
      evidencedResult: "Integrated into the Art Quarter ecosystem.",
      deliveringOrganisation: "Art Quarter"
    }
  },
  {
    slug: "community-events",
    client: "Community events",
    category: "St George's Day & Big Lunch",
    image: "/images/events.jpg",
    content: {
      brief: "To host community-focused events engaging diverse local audiences.",
      ourRole: "Event programming, coordination and delivery.",
      workDelivered: "Live temporary experiences connecting the community.",
      evidencedResult: "Successful delivery of key cultural moments in Digbeth.",
      deliveringOrganisation: "Art Quarter"
    }
  }
];