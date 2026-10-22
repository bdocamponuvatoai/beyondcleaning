import Image from "next/image";
import care from "@/assets/images/care.webp";
import { firstVisit } from "@/lib/content";

export function FirstVisit() {
  return (
    <section id="first-visit" aria-labelledby="first-visit-title" className="bg-stone-50 section-y">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-8">
        <figure className="relative max-lg:order-last lg:col-span-5">
          <div
            data-reveal="image"
            className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] lg:sticky lg:top-28"
          >
            <Image
              src={care}
              alt="A cleaner in a green polo and gloves wiping a stone kitchen counter"
              placeholder="blur"
              sizes="(min-width: 64rem) 40vw, 100vw"
              className="size-full object-cover"
            />
          </div>
        </figure>

        <div className="lg:col-span-6 lg:col-start-7">
          <h2 id="first-visit-title" data-reveal className="text-display font-extrabold uppercase font-condensed">
            Before the
            <br />
            <span className="text-cobalt">first visit.</span>
          </h2>
          <p data-reveal className="mt-6 max-w-[44ch] text-lede text-ink/75">
            A few practical things, so the team can get straight to work. No need to be home.
          </p>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] bg-ink/10 sm:grid-cols-2">
            {firstVisit.map((item, i) => (
              <li key={item.title} className="bg-stone-50 p-6 sm:p-7">
                <p className="flex items-baseline gap-3">
                  <span className="text-3xl leading-none font-extrabold text-cobalt font-condensed tabular-nums">
                    {i + 1}
                  </span>
                  <span className="text-lg font-semibold tracking-[-0.01em]">{item.title}</span>
                </p>
                <p className="mt-3 leading-relaxed text-ink/75">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
