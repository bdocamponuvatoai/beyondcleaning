"use client";

import { useState } from "react";
import { ArrowRight, Check } from "@/components/icons";
import { RequestButton } from "@/components/request/request-button";
import { ButtonArrow, buttonClass, cx } from "@/components/ui";
import { spaces } from "@/lib/content";

/** A lobby directory board: pick the kind of space, see what to ask about. */
export function Spaces() {
  const [selectedId, setSelectedId] = useState(spaces[0]!.id);
  const selected = spaces.find((s) => s.id === selectedId) ?? spaces[0]!;

  return (
    <section id="spaces" aria-labelledby="spaces-title" className="bg-white section-y">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <h2
            id="spaces-title"
            data-reveal
            className="text-display font-extrabold uppercase font-condensed lg:col-span-7"
          >
            What are we cleaning?
          </h2>
          <p data-reveal className="max-w-[44ch] text-lede text-ink/75 lg:col-span-5">
            Every building in this city is different. Pick yours to see the services worth asking about.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:mt-16 lg:grid-cols-12 lg:gap-6">
          <div
            data-theme="dark"
            className="min-w-0 rounded-[1.75rem] bg-ink p-3 text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)] sm:p-4 lg:col-span-5"
          >
            <p className="flex items-center justify-between px-3 pt-2 pb-4 caps-label text-white/75">
              <span>Directory</span>
              <span aria-hidden="true">Lobby</span>
            </p>
            <ul className="grid gap-1" aria-label="Type of space">
              {spaces.map((space) => {
                const active = space.id === selected.id;
                return (
                  <li key={space.id}>
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSelectedId(space.id)}
                      className={cx(
                        "flex min-h-14 w-full items-center justify-between gap-4 rounded-xl px-3 text-left text-[1.5rem] leading-none font-bold uppercase font-condensed transition-colors duration-300 xs:text-[1.625rem] sm:text-[1.875rem]",
                        active ? "bg-sun text-ink" : "text-white hover:bg-white/8",
                      )}
                    >
                      {space.label}
                      <ArrowRight
                        className={cx(
                          "shrink-0 text-xl transition-[opacity,transform] duration-300",
                          active ? "opacity-100" : "-translate-x-2 opacity-0",
                        )}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            aria-live="polite"
            className="flex min-w-0 flex-col rounded-[1.75rem] bg-stone-100 p-6 sm:p-10 lg:col-span-7"
            key={selected.id}
          >
            <p className="caps-label text-umber">Services to ask about</p>
            <h3 className="mt-4 text-[clamp(2.5rem,1.8rem+3vw,4.5rem)] leading-[0.9] font-extrabold text-cobalt uppercase font-condensed">
              {selected.label}
            </h3>
            <p className="mt-5 max-w-[46ch] text-lede text-ink/80">{selected.note}</p>
            <ul className="mt-8 grid gap-x-8 gap-y-3 border-t border-ink/12 pt-6 sm:grid-cols-2">
              {selected.services.map((service) => (
                <li key={service} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-sun text-xs text-ink">
                    <Check />
                  </span>
                  {service}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-10">
              <RequestButton service={selected.service} space={selected.space} className={buttonClass("cobalt")}>
                Plan a quote for this space <ButtonArrow icon={<ArrowRight />} />
              </RequestButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
