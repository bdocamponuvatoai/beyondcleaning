// Pure helpers for the quote planner. No imports so the file runs under
// `node --test` with native type stripping.
//
// Beyond Cleaning publishes no email address, so the planner never submits
// anything: it prepares notes to read out on a call or paste into the
// official contact form.

export const serviceOptions = [
  "Maid service",
  "Deep cleaning",
  "Move-in / move-out cleaning",
  "Post-renovation cleaning",
  "Office & janitorial cleaning",
  "Carpet & upholstery cleaning",
  "Floor & stone care",
  "Water damage cleanup",
  "Something else",
] as const;

export type ServiceOption = (typeof serviceOptions)[number];

export const homeSpaces = ["Apartment", "Brownstone or town house", "Co-op or condo", "House"] as const;
export const businessSpaces = ["Office", "Medical office", "Restaurant, bar or café", "Other business space"] as const;
export const spaceOptions = [...homeSpaces, ...businessSpaces] as const;

export type SpaceOption = (typeof spaceOptions)[number];

export const homeSizeOptions = ["Studio", "1 bedroom", "2 bedrooms", "3 bedrooms", "4 or more bedrooms"] as const;
export const bathroomOptions = ["1", "2", "3", "4 or more"] as const;
export const frequencyOptions = ["One time", "Weekly", "Every two weeks", "Monthly", "Not sure yet"] as const;

export type RequestDetails = {
  service: string;
  space: string;
  size: string;
  bathrooms: string;
  frequency: string;
  zip: string;
  details: string;
};

export const emptyRequest: RequestDetails = {
  service: "",
  space: "Apartment",
  size: "",
  bathrooms: "",
  frequency: "Not sure yet",
  zip: "",
  details: "",
};

export function isServiceOption(value: unknown): value is ServiceOption {
  return typeof value === "string" && (serviceOptions as readonly string[]).includes(value);
}

export function isSpaceOption(value: unknown): value is SpaceOption {
  return typeof value === "string" && (spaceOptions as readonly string[]).includes(value);
}

export function isHomeSpace(space: string) {
  return (homeSpaces as readonly string[]).includes(space);
}

export type RequestErrors = Partial<Record<"service" | "zip", string>>;

export function validateRequest(data: Pick<RequestDetails, "service" | "zip">): RequestErrors {
  const errors: RequestErrors = {};
  if (!data.service) errors.service = "Choose a service to continue.";
  if (!/^\d{5}$/.test(data.zip.trim())) errors.zip = "Enter a five-digit ZIP code.";
  return errors;
}

/** Rows shown on the review step and written into the notes. */
export function summarizeRequest(data: RequestDetails): [label: string, value: string][] {
  const home = isHomeSpace(data.space);
  return [
    ["Service", data.service],
    ["Space", data.space],
    ["Size", data.size.trim() || "Not given"],
    [home ? "Bathrooms" : "Restrooms", data.bathrooms || "Not given"],
    ["How often", data.frequency],
    ["ZIP code", data.zip.trim()],
    ["Extra requests", data.details.trim() || "None yet"],
  ];
}

export function createQuoteNotes(data: RequestDetails) {
  return [
    "Free quote request for Beyond Cleaning",
    "",
    ...summarizeRequest(data).map(([label, value]) => `${label}: ${value}`),
    "",
    "Please let me know the price and your availability.",
  ].join("\n");
}
