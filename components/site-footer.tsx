import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { Logo } from "@/components/logo";
import { RequestButton } from "@/components/request/request-button";
import { business, navigation } from "@/lib/site";

const linkClass = "transition-colors hover:text-white";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer data-theme="dark" className="bg-ink-950 pb-28 text-white/75 lg:pb-0">
      <div className="shell grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-4">
          <Link href="/" className="inline-block rounded-sm pl-3 text-[0.9375rem]">
            <Logo tone="light" />
          </Link>
          <p className="mt-6 max-w-[30ch] leading-relaxed">Home and business cleaning for {business.areaServed}.</p>
        </div>

        <div className="lg:col-span-3">
          <h2 className="caps-label text-white/70">Talk to us</h2>
          <ul className="mt-5 space-y-3">
            <li>
              <a
                href={business.phone.href}
                className="text-2xl font-semibold tracking-[-0.02em] text-white tabular-nums hover:text-sun"
              >
                {business.phone.display}
              </a>
            </li>
            <li>
              <RequestButton className={`${linkClass} text-left`}>Plan a free quote</RequestButton>
            </li>
            <li>
              <a
                href={business.contactFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} inline-flex items-center gap-2`}
              >
                Official contact form <ArrowUpRight />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="caps-label text-white/70">Office</h2>
          <address className="mt-5 leading-relaxed not-italic">
            {business.address.street}
            <br />
            {business.address.city}, {business.address.region} {business.address.postalCode}
          </address>
          <dl className="mt-4 space-y-1 text-sm">
            {business.hours.map((h) => (
              <div key={h.days} className="flex gap-3">
                <dt className="w-16 shrink-0">{h.short}</dt>
                <dd className="tabular-nums">{h.display}</dd>
              </div>
            ))}
          </dl>
          <a
            href={business.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClass} mt-4 inline-flex items-center gap-2`}
          >
            View on map <ArrowUpRight />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h2 className="caps-label text-white/70">Explore</h2>
          <ul className="mt-5 space-y-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="shell flex flex-col gap-3 border-t border-white/10 py-6 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {business.legalName}
        </p>
        <p>Photography is illustrative and does not show Beyond Cleaning staff or projects.</p>
        <Link href="/privacy" className={linkClass}>
          Privacy
        </Link>
      </div>
    </footer>
  );
}
