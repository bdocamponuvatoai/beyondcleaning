import Image from "next/image";
import office from "@/assets/images/office.webp";
import { ArrowRight } from "@/components/icons";
import { RequestButton } from "@/components/request/request-button";
import { ButtonArrow, buttonClass } from "@/components/ui";

// Commercial client types listed on the live homepage.
const clientTypes = [
  "Offices",
  "Medical facilities",
  "Schools",
  "Hotels",
  "Restaurants, bars & cafés",
  "Churches, synagogues & mosques",
];

export function Business() {
  return (
    <section
      aria-labelledby="business-title"
      data-theme="dark"
      className="relative isolate overflow-hidden bg-ink-950 text-white"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={office}
          alt=""
          placeholder="blur"
          sizes="100vw"
          className="size-full object-cover object-[30%_50%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(6_20_46/0.96)_0%,rgb(6_20_46/0.86)_45%,rgb(6_20_46/0.5)_100%)] lg:bg-[linear-gradient(to_right,rgb(6_20_46/0.95)_0%,rgb(6_20_46/0.85)_45%,rgb(6_20_46/0.2)_100%)]" />
      </div>

      <div className="shell grid min-h-[40rem] items-end gap-10 py-20 lg:grid-cols-12 lg:items-center lg:py-28">
        <div className="lg:col-span-6">
          <h2 id="business-title" data-reveal className="text-display font-extrabold uppercase font-condensed">
            Open for business.
            <br />
            <span className="text-sun">Clean after hours.</span>
          </h2>
          <p data-reveal className="mt-6 max-w-[42ch] text-lede text-white/90">
            Office and janitorial cleaning on a schedule that suits you. Event cleaning and after-hours office cleaning
            can be arranged any day of the week.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {clientTypes.map((type) => (
              <li key={type} className="rounded-full px-4 py-2 text-sm font-medium ring-1 ring-white/35 ring-inset">
                {type}
              </li>
            ))}
          </ul>
          <RequestButton service="Office & janitorial cleaning" space="Office" className={buttonClass("sun", "mt-10")}>
            Plan a business quote <ButtonArrow icon={<ArrowRight />} />
          </RequestButton>
        </div>
        <p className="justify-self-start rounded-full bg-ink-950/80 px-3 py-1.5 caps-label text-white lg:col-span-6 lg:self-end lg:justify-self-end">
          Illustrative image
        </p>
      </div>
    </section>
  );
}
