// Content adapted from beyondcleaning.com (reviewed 2026-10-23).
// Service names and links come from /all-cleaning-services/; the grouping is
// editorial. Every claim is traced in docs/content-sources.md.
import type { ServiceOption, SpaceOption } from "./request";

const base = "https://beyondcleaning.com/service";

export type ServiceGroup = {
  title: string;
  quote: ServiceOption;
  services: { name: string; href: string }[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    title: "Homes",
    quote: "Maid service",
    services: [
      { name: "Maid service", href: `${base}/maid-service/` },
      { name: "Deep cleaning", href: `${base}/deep-cleaning-service/` },
      { name: "Deep clean before maid service", href: `${base}/deep-clean-before-maid-service/` },
      { name: "Move-in deep cleaning", href: `${base}/move-in-deep-cleaning/` },
      { name: "Move-out deep cleaning", href: `${base}/move-out-deep-cleaning/` },
      { name: "Seasonal cleaning", href: `${base}/seasonal-cleaning-services/` },
      { name: "Organizing deep cleaning", href: `${base}/deep-cleaning-service/organizing-deep-cleaning/` },
      { name: "Tenant turnover cleaning", href: `${base}/tenant-turnover-cleaning/` },
      { name: "Vacation rental cleaning", href: `${base}/vacation-rental-cleaning/` },
    ],
  },
  {
    title: "Businesses",
    quote: "Office & janitorial cleaning",
    services: [
      { name: "Office cleaning", href: `${base}/office-cleaning-service/` },
      { name: "Janitorial service", href: `${base}/janitorial-services-2/` },
      { name: "Medical office deep cleaning", href: `${base}/medical-office-deep-cleaning/` },
      { name: "Event cleaning", href: `${base}/event-cleaning-service/` },
    ],
  },
  {
    title: "Renovation & specialist",
    quote: "Post-renovation cleaning",
    services: [
      { name: "Post-renovation cleaning", href: `${base}/post-renovation-cleaning-service-nyc/` },
      { name: "Construction cleaning", href: `${base}/construction-cleaning-service/` },
      { name: "Hoarder deep clean", href: `${base}/hoarder-deep-clean-service/` },
      { name: "Mold remediation", href: `${base}/mold-remediation-service/` },
      { name: "Disinfecting", href: `${base}/disinfecting-service/` },
      { name: "Sanitize and disinfect", href: `${base}/sanitize-and-disinfect-service/` },
      { name: "Sanitizing", href: `${base}/sanitizing-service/` },
      { name: "Graffiti cleaning", href: `${base}/graffiti-cleaning-service/` },
      { name: "Power washing", href: `${base}/power-washing-service/` },
    ],
  },
  {
    title: "Water damage",
    quote: "Water damage cleanup",
    services: [
      { name: "Flood damage cleaning", href: `${base}/flood-damage-cleaning-service/` },
      { name: "Storm damage cleanup", href: `${base}/storm-damage-cleanup-service/` },
      { name: "Sewage cleanup", href: `${base}/sewage-cleanup-service/` },
    ],
  },
  {
    title: "Indoor air",
    quote: "Something else",
    services: [
      { name: "Allergy cleaning", href: `${base}/anti-allergy-cleaning-service/` },
      { name: "Pet allergy deep cleaning", href: `${base}/pet-allergy-deep-cleaning/` },
      { name: "Air duct cleaning", href: `${base}/air-duct-cleaning-service/` },
      { name: "HVAC cleaning", href: `${base}/hvac-cleaning-service/` },
      { name: "Odor removal", href: `${base}/odor-removal-service/` },
    ],
  },
  {
    title: "Floors & stone",
    quote: "Floor & stone care",
    services: [
      { name: "Deep floor cleaning", href: `${base}/deep-floor-cleaning-service/` },
      { name: "Wood floor cleaning", href: `${base}/wood-floor-cleaning-service/` },
      { name: "Vinyl floor cleaning", href: `${base}/vinyl-floor-cleaning-service/` },
      { name: "Tile and grout cleaning", href: `${base}/tile-and-grout-cleaning/` },
      { name: "Stone cleaning", href: `${base}/stone-cleaning-service/` },
      { name: "Marble cleaning", href: `${base}/marble-cleaning-service/` },
      { name: "Granite polishing", href: `${base}/granite-polishing-service/` },
    ],
  },
  {
    title: "Fabric",
    quote: "Carpet & upholstery cleaning",
    services: [
      { name: "Carpet cleaning", href: `${base}/carpet-cleaning-service/` },
      { name: "Upholstery cleaning", href: `${base}/upholstery-cleaning-service/` },
      { name: "Drapery cleaning", href: `${base}/drapery-cleaning-service/` },
    ],
  },
  {
    title: "Windows & surfaces",
    quote: "Something else",
    services: [
      { name: "Window cleaning", href: `${base}/window-cleaning-service/` },
      { name: "Blinds cleaning", href: `${base}/blinds-cleaning-service/` },
      { name: "Wall cleaning", href: `${base}/wall-cleaning-service/` },
      { name: "Ceiling cleaning", href: `${base}/ceiling-cleaning-service/` },
    ],
  },
];

export const serviceCount = serviceGroups.reduce((total, group) => total + group.services.length, 0);

export type Space = {
  id: string;
  label: string;
  space: SpaceOption;
  service: ServiceOption;
  note: string;
  services: string[];
};

// Space types come from the "who we clean for" lists on the live homepage.
export const spaces: Space[] = [
  {
    id: "apartment",
    label: "Apartment",
    space: "Apartment",
    service: "Maid service",
    note: "Studios to family-size, walk-ups to doorman buildings. A regular visit or a one-time reset.",
    services: ["Maid service", "Deep cleaning", "Move-in and move-out deep cleaning", "Carpet and upholstery cleaning"],
  },
  {
    id: "brownstone",
    label: "Brownstone",
    space: "Brownstone or town house",
    service: "Deep cleaning",
    note: "More floors, more stairs, more original detail. Worth planning room by room.",
    services: ["Deep cleaning", "Post-renovation cleaning", "Wood floor cleaning", "Window and blinds cleaning"],
  },
  {
    id: "co-op",
    label: "Co-op or condo",
    space: "Co-op or condo",
    service: "Move-in / move-out cleaning",
    note: "Moving in, moving out, or keeping a place guest-ready between visits.",
    services: ["Move-in and move-out deep cleaning", "Maid service", "Marble and stone cleaning", "Allergy cleaning"],
  },
  {
    id: "office",
    label: "Office",
    space: "Office",
    service: "Office & janitorial cleaning",
    note: "After-hours office cleaning can be arranged any day of the week.",
    services: ["Office cleaning", "Janitorial service", "Carpet cleaning", "Event cleaning"],
  },
  {
    id: "medical",
    label: "Medical office",
    space: "Medical office",
    service: "Office & janitorial cleaning",
    note: "Exam rooms, waiting areas and shared surfaces that need regular attention.",
    services: ["Medical office deep cleaning", "Sanitize and disinfect", "Janitorial service", "Deep floor cleaning"],
  },
  {
    id: "restaurant",
    label: "Restaurant or café",
    space: "Restaurant, bar or café",
    service: "Floor & stone care",
    note: "Floors, tile and grout, and front-of-house surfaces that take a beating every service.",
    services: ["Deep floor cleaning", "Tile and grout cleaning", "Power washing", "Sanitizing"],
  },
];

export const quoteFactors = [
  { term: "Size", detail: "How many rooms, or how many square feet." },
  { term: "Bathrooms", detail: "The number of bathrooms in the space." },
  { term: "Extras", detail: "Inside the oven, the fridge, the windows. Anything beyond the usual." },
] as const;

export const firstVisit = [
  {
    title: "Getting in",
    body: "Leave a key on file, have your doorman let the team in, or be home for the visit.",
  },
  {
    title: "Alarms",
    body: "Switch your alarm off on cleaning day, or share a code or a temporary one.",
  },
  {
    title: "Pets",
    body: "Mention pets when you book. The team works around them, and a protective dog can stay in another room.",
  },
  {
    title: "Valuables",
    body: "Put away valuables and heirlooms before the visit.",
  },
  {
    title: "Supplies",
    body: "The team brings its own equipment and single-use disposables. Prefer your own products? Just say.",
  },
  {
    title: "Changes",
    body: "Need to cancel? Give at least 24 hours’ notice. Visits that land on a major holiday are rescheduled with you.",
  },
] as const;

export const faqs = [
  {
    q: "How much will my cleaning cost?",
    a: "It depends on the size of your space, the number of bathrooms and any extra requests. Your first visit usually costs more than the regular visits after it. Quotes are free: call, or use the contact form on Beyond Cleaning’s website.",
  },
  {
    q: "Do I need a long-term contract?",
    a: "No. You can book a one-time clean or set up regular visits, with no long-term contract required.",
  },
  {
    q: "When can you clean?",
    a: "Regular cleaning happens on weekdays during business hours. Event cleaning and after-hours office cleaning can be arranged any day. For water or flood damage, call to check availability.",
  },
  {
    q: "Do I need to be home?",
    a: "No. Many clients leave a key on file or have their doorman let the team in. You can also be home for the visit.",
  },
  {
    q: "Do I need to supply cleaning products?",
    a: "No. The team brings its own equipment and single-use disposables. If you’d rather they use your products, let them know.",
  },
  {
    q: "How can I pay?",
    a: "Cash, check and major credit cards are accepted. You can keep a card on file to be charged after each cleaning.",
  },
  {
    q: "Does this website book my cleaning?",
    a: "No. The quote planner only prepares notes about your space on your device. Nothing is sent. Call or use the official contact form, and the team confirms the price and a time with you.",
  },
] as const;
