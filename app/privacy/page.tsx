import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { business } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How the Beyond Cleaning quote planner handles the details you enter.",
  alternates: { canonical: "/privacy" },
};

const linkClass = "font-semibold text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink";

export default function PrivacyPage() {
  return (
    <article className="shell pt-36 pb-24 sm:pt-44 lg:pb-36">
      <p className="caps-label text-umber">Privacy</p>
      <h1 className="mt-6 max-w-[14ch] text-display font-extrabold uppercase font-condensed">
        Your answers stay with you.
      </h1>

      <div className="mt-12 max-w-[62ch] space-y-6 text-lede text-ink/80">
        <p>
          The quote planner prepares notes about your space on your device. This website does not send what you enter to
          a server, and does not save it in browser storage. Closing the page clears it.
        </p>
        <p>
          If you copy the notes, they go to your clipboard. If you paste them into the contact form on Beyond Cleaning’s
          current website, that website handles them under its own terms.
        </p>
        <p>
          This site does not use analytics or advertising cookies. Telephone and map links are handled by their
          respective apps or providers.
        </p>
        <p>
          Questions? Call{" "}
          <a className={linkClass} href={business.phone.href}>
            {business.phone.display}
          </a>
          .
        </p>
      </div>

      <Link href="/" className="group mt-14 inline-flex items-center gap-3 font-semibold">
        Back to home
        <ArrowRight className="text-lg transition-transform group-hover:translate-x-1" />
      </Link>
    </article>
  );
}
