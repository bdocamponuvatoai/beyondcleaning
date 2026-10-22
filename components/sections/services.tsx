import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { RequestButton } from "@/components/request/request-button";
import { serviceCount, serviceGroups } from "@/lib/content";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="bg-stone-50 section-y">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <h2
            id="services-title"
            data-reveal
            className="text-display font-extrabold uppercase font-condensed lg:col-span-7"
          >
            {serviceCount} services.
            <br />
            <span className="text-cobalt">One number to call.</span>
          </h2>
          <p data-reveal className="max-w-[44ch] text-lede text-ink/75 lg:col-span-5">
            From the weekly clean to flood cleanup and marble polishing. Each service name opens its full description on
            Beyond Cleaning’s current website.
            <span id="services-external" className="sr-only">
              (opens beyondcleaning.com in a new tab)
            </span>
          </p>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-12 border-t border-ink/12 pt-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {serviceGroups.map((group) => (
            <div key={group.title} className="flex flex-col">
              <h3 className="flex items-baseline gap-2.5 text-2xl font-bold uppercase font-condensed">
                {group.title}
                <span className="font-sans text-sm font-semibold text-umber tabular-nums">{group.services.length}</span>
              </h3>
              <ul className="mt-4 grid gap-0.5">
                {group.services.map((service) => (
                  <li key={service.href}>
                    <a
                      href={service.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-describedby="services-external"
                      className="group inline-flex items-center gap-1.5 py-1.5 text-ink/80 transition-colors hover:text-cobalt"
                    >
                      {service.name}
                      <ArrowUpRight className="text-sm opacity-50 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
              <RequestButton
                service={group.quote}
                className="group mt-4 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-cobalt"
              >
                Quote for {group.title.toLowerCase()}
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </RequestButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
