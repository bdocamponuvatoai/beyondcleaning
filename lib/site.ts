// Business facts confirmed from beyondcleaning.com (reviewed 2026-10-23).
// See docs/content-sources.md before adding any new claim.
export const business = {
  name: "Beyond Cleaning",
  legalName: "Beyond Cleaning NYC, Inc.",
  phone: { href: "tel:+12125204815", display: "(212) 520-4815", e164: "+12125204815" },
  address: {
    street: "244 5th Avenue",
    city: "New York",
    region: "NY",
    postalCode: "10001",
  },
  areaServed: "New York City and the surrounding areas",
  hours: [
    { days: "Monday to Friday", short: "Mon–Fri", opens: "08:00", closes: "18:00", display: "8am–6pm" },
    { days: "Saturday", short: "Sat", opens: "09:00", closes: "16:00", display: "9am–4pm" },
  ],
  mapUrl: "https://www.google.com/maps/search/?api=1&query=244+5th+Avenue+New+York+NY+10001",
  website: "https://beyondcleaning.com/",
  contactFormUrl: "https://beyondcleaning.com/contact-nyc/",
} as const;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const navigation = [
  { href: "/#spaces", label: "Your space" },
  { href: "/#services", label: "Services" },
  { href: "/#quotes", label: "Quotes" },
  { href: "/#first-visit", label: "First visit" },
  { href: "/#faq", label: "Questions" },
] as const;
