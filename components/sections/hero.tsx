import Image from "next/image";
import type { CSSProperties } from "react";
import home from "@/assets/images/home.webp";
import { ArrowRight, Phone, Sun } from "@/components/icons";
import { RequestButton } from "@/components/request/request-button";
import { ButtonArrow, buttonClass } from "@/components/ui";
import { business } from "@/lib/site";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-stone-50">
      <div className="shell grid gap-10 pt-28 pb-12 sm:pt-32 lg:min-h-[max(44rem,100vh)] lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-28 supports-[height:100svh]:lg:min-h-[max(44rem,100svh)]">
        <div className="relative lg:col-span-7">
          <Sun
            className="intro-sunrise absolute -top-10 -left-8 -z-10 size-36 text-sun sm:-top-14 sm:-left-12 sm:size-52 lg:size-60"
            rayClassName="sun-rays"
            style={delay(100)}
          />

          <h1
            id="hero-title"
            className="text-display-xl font-extrabold [overflow-wrap:anywhere] text-ink uppercase font-condensed"
          >
            <span className="intro-rise block" style={delay(200)}>
              New York homes
            </span>{" "}
            <span className="intro-rise block" style={delay(280)}>
              &amp; offices,
            </span>{" "}
            <span className="intro-rise block text-cobalt" style={delay(360)}>
              properly clean.
            </span>
          </h1>

          <div className="intro-rise" style={delay(480)}>
            <p className="mt-8 max-w-[38ch] text-lede text-ink/80">
              Regular cleaning, deep cleans, move-outs and post-renovation cleanups for apartments, brownstones, offices
              and more. Tell us about your space and get a free quote.
            </p>
            <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <RequestButton className={buttonClass("cobalt")}>
                Plan a free quote <ButtonArrow icon={<ArrowRight />} />
              </RequestButton>
              <a href={business.phone.href} className={buttonClass("ghost-dark")}>
                <Phone className="text-lg" />
                <span className="tabular-nums">{business.phone.display}</span>
              </a>
            </div>
          </div>

          <dl
            className="intro-fade mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/12 pt-6 sm:grid-cols-3"
            style={delay(700)}
          >
            <div>
              <dt className="caps-label text-umber">Quotes</dt>
              <dd className="mt-1.5 font-semibold">Free, by phone</dd>
            </div>
            <div>
              <dt className="caps-label text-umber">Office hours</dt>
              <dd className="mt-1.5 font-semibold tabular-nums">
                {business.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.short} {h.display}
                  </span>
                ))}
              </dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="caps-label text-umber">Based at</dt>
              <dd className="mt-1.5 font-semibold">{business.address.street}, Manhattan</dd>
            </div>
          </dl>
        </div>

        <figure className="intro-fade relative lg:col-span-5 lg:-mr-[clamp(1rem,5vw,4.5rem)]" style={delay(150)}>
          <div className="relative h-[min(62svh,30rem)] min-h-72 overflow-hidden rounded-[1.75rem] sm:h-[34rem] lg:h-[min(50rem,84vh)] lg:rounded-l-[2.5rem] lg:rounded-r-none">
            <Image
              src={home}
              alt="A sunlit brownstone living room with a linen sofa and an oak coffee table"
              preload
              fetchPriority="high"
              placeholder="blur"
              sizes="(min-width: 64rem) 50vw, 100vw"
              className="size-full object-cover object-[62%_50%]"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
