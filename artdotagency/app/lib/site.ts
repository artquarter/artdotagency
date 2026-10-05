/**
 * Single source of truth for Artdot's consultancy proposition.
 * Navigation, capabilities, packages, proof points and insights all live here
 * so copy changes never need to touch layout code.
 */

export type NavItem = { label: string; href: string };

export type Capability = {
  slug: string;
  title: string;
  summary: string;
  questions: string[];
  outputs: string[];
};

export type Package = {
  name: string;
  price: string;
  cadence: "one-off" | "per month";
  hours: string;
  term: string;
  positioning: string;
  includes: string[];
  flagship?: boolean;
};

/**
 * Every published impact figure must name who holds the underlying evidence
 * and when it was last checked. `reviewDate` uses ISO format (YYYY-MM).
 * Leave `reviewDate` empty until the evidence owner has signed it off; the
 * figure will still render, but a warning is shown in development builds.
 */
export type Metric = {
  value: string;
  label: string;
  context: string;
  evidenceOwner: string;
  reviewDate: string;
};

export const capabilities: Capability[] = [
  {
    slug: "funding-and-investment",
    title: "Funding and Investment",
    summary:
      "Funding strategy, grant bid development and investment planning to help cultural and community organisations diversify income.",
    questions: [
      "We rely too heavily on one funder or one grant cycle.",
      "We have a major bid coming up and need it to be investment-ready.",
      "We are not sure which funds, investors or partners are realistic for us.",
    ],
    outputs: [
      "Funding and investment strategy",
      "Pipeline of prioritised funding opportunities",
      "Bid development and case for support",
      "Budget and match-funding planning",
    ],
  },
  {
    slug: "research-and-insight",
    title: "Research and Insight",
    summary:
      "Audience and community research, stakeholder interviews and feasibility studies to help you test demand and make informed decisions.",
    questions: [
      "We do not have reliable evidence about who uses us and who does not.",
      "We need to test demand before committing to a new idea.",
      "Our board is being asked to decide without enough information.",
    ],
    outputs: [
      "Audience and community research",
      "Feasibility and demand testing",
      "Stakeholder interviews and workshops",
      "Clear findings with recommendations",
    ],
  },
  {
    slug: "impact-and-evidence",
    title: "Impact and Evidence",
    summary:
      "Impact measurement, programme evaluation and social value reporting to show funders and partners what your organisation achieves.",
    questions: [
      "Funders are asking for evidence we cannot easily produce.",
      "We collect data but it does not tell a useful story.",
      "We need to report social value in a credible, defensible way.",
    ],
    outputs: [
      "Theory of change and outcomes framework",
      "Monitoring and evaluation plan",
      "Impact and social value reports",
      "Data collection tools and processes",
    ],
  },
  {
    slug: "commercial-growth",
    title: "Commercial Growth",
    summary:
      "Business planning, financial modelling and pricing reviews to help charities, cultural venues and social enterprises grow earned income.",
    questions: [
      "We want to grow earned income without compromising our purpose.",
      "Our trading activity is not covering its costs.",
      "We have an idea for a new revenue stream but no business case.",
    ],
    outputs: [
      "Commercial review and opportunity assessment",
      "Business plans and financial models",
      "Pricing and income diversification options",
      "Operating model recommendations",
    ],
  },
  {
    slug: "community-asset-growth",
    title: "Community Asset Growth",
    summary:
      "Community asset appraisals, venue business plans and operating models to help you develop sustainable buildings and shared spaces.",
    questions: [
      "We have a building or space that is not working as hard as it could.",
      "We are considering a community asset transfer or new venue.",
      "We need an operating model that will last beyond the first few years.",
    ],
    outputs: [
      "Asset and options appraisal",
      "Operating and governance models",
      "Community use and programming plans",
      "Asset development business case",
    ],
  },
  {
    slug: "strategy-and-stakeholder-support",
    title: "Strategy and Stakeholder Support",
    summary:
      "Organisational strategy, stakeholder engagement and board facilitation to align your team, partners and community around a practical plan.",
    questions: [
      "Our strategy is out of date or not driving decisions.",
      "We need partners, funders or the community to back a change.",
      "Our board needs independent, senior challenge and support.",
    ],
    outputs: [
      "Organisational strategy and delivery plan",
      "Stakeholder mapping and engagement",
      "Board and trustee facilitation",
      "Partnership development",
    ],
  },
];

export const capabilityNav: NavItem[] = capabilities.map((c) => ({
  label: c.title,
  href: `/what-we-do/${c.slug}`,
}));

export const primaryNav: NavItem[] = [
  { label: "How We Work", href: "/how-we-work" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export const problemsSolved = [
  {
    title: "Too few income sources",
    body: "Diversify income with a realistic funding plan.",
  },
  {
    title: "Decisions without evidence",
    body: "Give your board the insight to act.",
  },
  {
    title: "Impact that is hard to prove",
    body: "Capture results that funders can trust.",
  },
  {
    title: "Underused spaces",
    body: "Find a sustainable model for your assets.",
  },
  {
    title: "An outdated strategy",
    body: "Align your leadership around a clear plan.",
  },
  {
    title: "Disconnected stakeholders",
    body: "Build backing from partners and communities.",
  },
];

export const howWeWork = [
  {
    step: "01",
    title: "Diagnose",
    body: "A paid diagnostic to identify what matters most.",
  },
  {
    step: "02",
    title: "Agree",
    body: "Clear priorities, named responsibilities, capped hours and a fixed fee.",
  },
  {
    step: "03",
    title: "Advise and deliver",
    body: "Senior advice, practical delivery and regular check-ins.",
  },
  {
    step: "04",
    title: "Review and evidence",
    body: "Review outcomes and record the evidence of change.",
  },
];

export const packages: Package[] = [
  {
    name: "Growth and Funding Diagnostic",
    price: "£3,000",
    cadence: "one-off",
    hours: "Up to 8 professional hours",
    term: "Single engagement",
    positioning:
      "Understand your position. Prioritise your next steps.",
    includes: [
      "Review of strategy, income and evidence",
      "Leadership conversation and document review",
      "Written diagnostic with prioritised recommendations",
    ],
  },
  {
    name: "Strategic Advisory",
    price: "£3,000",
    cadence: "per month",
    hours: "Up to 8 professional hours each month",
    term: "3-month minimum",
    positioning:
      "A senior adviser for your key decisions.",
    includes: [
      "Monthly advisory sessions",
      "Review of plans, bids and board papers",
      "Agreed priorities reviewed each month",
    ],
  },
  {
    name: "Growth Partner",
    price: "£6,000",
    cadence: "per month",
    hours: "Up to 16 professional hours each month",
    term: "3-month minimum",
    positioning:
      "Senior advice with hands-on delivery.",
    includes: [
      "Everything in Strategic Advisory",
      "Hands-on work on funding, commercial or evidence priorities",
      "Stakeholder and partner support",
      "Monthly progress and outcomes review",
    ],
    flagship: true,
  },
  {
    name: "Strategic Growth Partner",
    price: "£12,000",
    cadence: "per month",
    hours: "Up to 32 professional hours each month",
    term: "6-month minimum",
    positioning:
      "Senior capacity for major change and growth.",
    includes: [
      "Everything in Growth Partner",
      "Multiple workstreams delivered in parallel",
      "Board and trustee support",
      "Quarterly impact and evidence reporting",
    ],
  },
];

/**
 * Proof points. Figures are rendered exactly as written, never animated or
 * re-parsed, so currency and decimals display correctly.
 */
export const verifiedMetrics: Metric[] = [
  {
    value: "£29,496.60",
    label: "UKSPF capital grant secured",
    context: "Inclusive LED screen and public screening programme",
    evidenceOwner: "Art Quarter (UKSPF grant reporting)",
    reviewDate: "",
  },
  {
    value: "3,771",
    label: "Recorded attendances",
    context: "Across 22 public screening events",
    evidenceOwner: "Art Quarter (event attendance records)",
    reviewDate: "",
  },
  {
    value: "22",
    label: "Public events delivered",
    context: "Community screening programme at AQ Foodhall",
    evidenceOwner: "Art Quarter (programme records)",
    reviewDate: "",
  },
  {
    value: "14",
    label: "Learner completions",
    context: "Content creator training with SCCB and WMCA",
    evidenceOwner: "South and City College Birmingham",
    reviewDate: "",
  },
];

export const featuredCaseStudySlugs = [
  "community-screenings",
  "content-creator-programme",
];

export const insightsPreview: { title: string; type: string; summary: string; href?: string }[] = [
  {
    title: "The creator economy and Birmingham's next generation",
    type: "Forthcoming paper",
    summary:
      "Skills, spaces and investment for emerging creators.",
  },
  {
    title: "Community screening programme case study",
    href: "/case-studies/community-screenings",
    type: "Impact report",
    summary:
      "Delivery, attendance and lessons from community screenings.",
  },
  {
    title: "Content creator training register",
    href: "/reports/content-creator-training",
    type: "Impact report",
    summary:
      "Practical skills and outcomes for a new generation of creators.",
  },
];

export const ART_QUARTER_NOTE =
  "Delivered through Art Quarter, where our team built its practical delivery experience. Artdot is a separate, independent consultancy.";

export const sectors = [
  "Arts and culture",
  "Heritage",
  "Community and voluntary",
  "Charity or social enterprise",
  "Local or combined authority",
  "Education or skills",
  "Housing or regeneration",
  "Funder or foundation",
  "Other",
];

export const budgetBands = [
  "Under £3,000",
  "£3,000 (diagnostic)",
  "£3,000 – £6,000 per month",
  "£6,000 – £12,000 per month",
  "£12,000+ per month",
  "Not yet known",
];

export const sources = [
  "Recommendation or referral",
  "Search engine",
  "LinkedIn",
  "Event or talk",
  "Existing relationship",
  "Other",
];
