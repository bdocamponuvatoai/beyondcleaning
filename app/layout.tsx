import type { Metadata, Viewport } from "next";
import { Mona_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { RequestProvider } from "@/components/request/request-context";
import { RevealObserver } from "@/components/reveal-observer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { allowIndexing, business, siteUrl } from "@/lib/site";
import "./globals.css";

// One variable family: condensed heavy caps echo the logo, normal width reads well in body copy.
const mona = Mona_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-mona",
});

const description =
  "Home and business cleaning in New York City: maid service, deep cleaning, move-in and move-out, post-renovation, office and janitorial cleaning. Free quotes by phone.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Beyond Cleaning · Home & business cleaning in New York City",
    template: "%s · Beyond Cleaning",
  },
  description,
  applicationName: business.name,
  alternates: { canonical: "/" },
  robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: business.name,
    title: "Beyond Cleaning · New York homes & offices, properly clean",
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Sunlit brownstone living room (illustrative)" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#faf8f3",
  colorScheme: "light",
  viewportFit: "cover",
};

const dayNames = {
  "Monday to Friday": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  Saturday: ["Saturday"],
} as const;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: business.name,
  legalName: business.legalName,
  url: siteUrl,
  telephone: business.phone.e164,
  image: `${siteUrl}/og.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    addressRegion: business.address.region,
    postalCode: business.address.postalCode,
    addressCountry: "US",
  },
  areaServed: { "@type": "City", name: "New York, NY" },
  openingHoursSpecification: business.hours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: dayNames[h.days],
    opens: h.opens,
    closes: h.closes,
  })),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-US" className={mona.variable}>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-50 -translate-y-24 rounded-full bg-sun px-5 py-3 font-semibold text-ink transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <RequestProvider>
          <SiteHeader />
          <main id="main" tabIndex={-1} className="focus:outline-none">
            {children}
          </main>
          <SiteFooter />
          <MobileActionBar />
        </RequestProvider>
        <RevealObserver />
        <script
          type="application/ld+json"
          // Static, server-defined data only; escape `<` to keep it inert.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
