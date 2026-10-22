import { Fragment } from "react";
import { ArrowRight } from "@/components/icons";
import { RequestButton } from "@/components/request/request-button";
import { ButtonArrow, buttonClass } from "@/components/ui";
import { quoteFactors } from "@/lib/content";

export function Quotes() {
  return (
    <section id="quotes" aria-labelledby="quotes-title" data-theme="dark" className="bg-cobalt section-y text-white">
      <div className="shell">
        <h2 id="quotes-title" className="max-w-[24ch] text-title font-semibold">
          How your free quote is worked out
        </h2>

        {/* The formula reads as one sentence to assistive tech; operators are decorative. */}
        <p
          data-reveal
          className="mt-10 text-[clamp(2.75rem,1.4rem+6vw,8rem)] leading-[0.88] font-extrabold uppercase font-condensed"
        >
          {quoteFactors.map((factor, i) => (
            <Fragment key={factor.term}>
              <span className="whitespace-nowrap">{factor.term}</span>
              {i < quoteFactors.length - 1 ? (
                <span aria-hidden="true" className="text-sun">
                  {" "}
                  +{" "}
                </span>
              ) : (
                <>
                  <span className="sr-only">, which together set</span>
                  <span aria-hidden="true" className="text-sun">
                    {" "}
                    ={" "}
                  </span>
                </>
              )}
            </Fragment>
          ))}
          <span className="whitespace-nowrap">your quote.</span>
        </p>

        <dl className="mt-14 grid gap-8 border-t border-white/25 pt-8 sm:grid-cols-3 lg:mt-20">
          {quoteFactors.map((factor) => (
            <div key={factor.term}>
              <dt className="caps-label text-white">{factor.term}</dt>
              <dd className="mt-2 max-w-[30ch] text-white/95">{factor.detail}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 grid gap-8 rounded-[1.75rem] bg-white/10 p-6 sm:p-8 lg:grid-cols-12 lg:items-center">
          <ul className="grid gap-3 text-lede lg:col-span-8">
            <li>Your first visit usually costs more than the regular visits after it.</li>
            <li>No long-term contract. Book once, or set up regular visits.</li>
          </ul>
          <div className="lg:col-span-4 lg:justify-self-end">
            <RequestButton className={buttonClass("sun", "w-full sm:w-auto")}>
              Plan a free quote <ButtonArrow icon={<ArrowRight />} />
            </RequestButton>
          </div>
        </div>
      </div>
    </section>
  );
}
