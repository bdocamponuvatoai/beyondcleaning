import { ArrowRight, Sun } from "@/components/icons";
import { RequestButton } from "@/components/request/request-button";
import { ButtonArrow, buttonClass } from "@/components/ui";
import { business } from "@/lib/site";

export function ClosingCta() {
  return (
    <section aria-labelledby="closing-title" className="relative isolate overflow-hidden bg-sun section-y">
      <Sun
        className="absolute -right-24 -bottom-24 -z-10 size-[28rem] text-white/45 sm:-right-16 lg:size-[40rem]"
        rayClassName="sun-rays"
      />
      <div className="shell">
        <h2
          id="closing-title"
          data-reveal
          className="max-w-[16ch] text-display font-extrabold uppercase font-condensed"
        >
          Get a free quote today.
        </h2>
        <a
          href={business.phone.href}
          className="mt-8 inline-block text-[clamp(3rem,1.6rem+6vw,7.5rem)] leading-none font-extrabold text-cobalt font-condensed tabular-nums underline decoration-cobalt/30 decoration-4 underline-offset-[0.12em] transition-colors hover:decoration-cobalt"
        >
          {business.phone.display}
        </a>
        <p className="mt-8 max-w-[46ch] text-lede">
          The office is open{" "}
          {business.hours.map((h, i) => (
            <span key={h.days}>
              {i > 0 && ", and "}
              {h.days} <span className="whitespace-nowrap">{h.display}</span>
            </span>
          ))}
          . Rather plan first? Answer a few questions and take your notes to the call.
        </p>
        <RequestButton className={buttonClass("cobalt", "mt-8")}>
          Plan a free quote <ButtonArrow icon={<ArrowRight />} />
        </RequestButton>
      </div>
    </section>
  );
}
