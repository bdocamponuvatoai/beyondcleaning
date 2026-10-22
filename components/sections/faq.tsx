import { ArrowUpRight, Plus } from "@/components/icons";
import { faqs } from "@/lib/content";
import { business } from "@/lib/site";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-white section-y">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <h2 id="faq-title" data-reveal className="text-display font-extrabold uppercase font-condensed">
              Good to know.
            </h2>
            <p className="mt-8 text-ink/75">Something else on your mind? Call the office.</p>
            <a
              href={business.phone.href}
              className="mt-3 inline-block text-2xl font-semibold tracking-[-0.02em] tabular-nums underline decoration-ink/20 underline-offset-[6px] transition-colors hover:decoration-cobalt"
            >
              {business.phone.display}
            </a>
            <a
              href={business.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center gap-2 text-sm font-semibold text-cobalt"
            >
              Read customer reviews on beyondcleaning.com <ArrowUpRight />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>

        <div className="border-t border-ink/12 lg:col-span-7 lg:col-start-6">
          {faqs.map((item) => (
            <details key={item.q} className="group border-b border-ink/12">
              <summary className="flex cursor-pointer items-start justify-between gap-6 py-6 text-lg font-semibold tracking-[-0.015em] transition-colors hover:text-cobalt sm:py-7 sm:text-xl">
                {item.q}
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-ink/15 text-base transition-[transform,background-color,color] duration-500 ease-(--ease-out-expo) group-open:rotate-45 group-open:border-cobalt group-open:bg-cobalt group-open:text-white"
                >
                  <Plus />
                </span>
              </summary>
              <p className="max-w-[60ch] pr-12 pb-7 leading-relaxed text-ink/75">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
