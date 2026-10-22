"use client";

import { useEffect } from "react";
import { buttonClass } from "@/components/ui";
import { business } from "@/lib/site";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="shell flex min-h-[80vh] flex-col justify-center pt-32 pb-24">
      <p className="caps-label text-umber">Something went wrong</p>
      <h1 className="mt-6 max-w-[16ch] text-display font-extrabold uppercase font-condensed">We hit a snag.</h1>
      <p className="mt-6 max-w-[44ch] text-lede text-ink/75">
        This page didn’t load properly. Try again, or call {business.phone.display} and the office will help directly.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className={buttonClass("cobalt")}>
          Try again
        </button>
        <a href={business.phone.href} className={buttonClass("ghost-dark")}>
          Call {business.phone.display}
        </a>
      </div>
    </section>
  );
}
