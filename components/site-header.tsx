"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, Close, Phone } from "@/components/icons";
import { Logo } from "@/components/logo";
import { RequestButton } from "@/components/request/request-button";
import { buttonClass, cx } from "@/components/ui";
import { business, navigation } from "@/lib/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu if the viewport grows past the breakpoint.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 64rem)");
    const onChange = (event: MediaQueryListEvent) => event.matches && menuRef.current?.close();
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      data-scrolled={scrolled ? "" : undefined}
      className={cx(
        "fixed inset-x-0 top-0 z-40 text-ink transition-[background-color,box-shadow] duration-500 ease-(--ease-out-expo)",
        scrolled
          ? "bg-stone-50/96 shadow-[0_1px_0_rgb(10_31_68/0.08)] supports-backdrop-filter:bg-stone-50/88 supports-backdrop-filter:backdrop-blur-xl supports-backdrop-filter:backdrop-saturate-150"
          : "bg-transparent",
      )}
    >
      <div className="shell flex h-18 items-center justify-between gap-6 lg:h-20">
        <Link href="/" className="shrink-0 rounded-sm pl-3 text-[0.8125rem] lg:text-[0.9375rem]">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3.5 py-2.5 text-[0.9375rem] font-medium tracking-[-0.01em] transition-colors hover:bg-ink/6 xl:px-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={business.phone.href}
            className="hidden items-center gap-2.5 rounded-full px-4 py-2.5 text-[0.9375rem] font-semibold tabular-nums transition-colors hover:bg-ink/6 md:inline-flex"
          >
            <Phone className="text-base text-cobalt" />
            {business.phone.display}
          </a>
          <RequestButton className={buttonClass("cobalt", "min-h-11 px-5 text-sm max-sm:hidden")}>
            Free quote
          </RequestButton>
          <button
            type="button"
            onClick={() => menuRef.current?.showModal()}
            aria-label="Open menu"
            aria-haspopup="dialog"
            className="-mr-2 grid size-11 place-items-center rounded-full transition-colors hover:bg-ink/6 lg:hidden"
          >
            <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
              <span className="h-0.5 w-full rounded-full bg-current" />
              <span className="h-0.5 w-3/5 self-end rounded-full bg-current" />
            </span>
          </button>
        </div>
      </div>

      <dialog
        ref={menuRef}
        aria-label="Menu"
        data-theme="dark"
        className="sheet bg-ink text-white lg:hidden"
        onClick={(event) => {
          // Links and the quote trigger both dismiss the menu once they've acted.
          if ((event.target as HTMLElement).closest("a, [aria-haspopup='dialog']")) menuRef.current?.close();
        }}
      >
        <div className="shell flex h-full flex-col pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <div className="flex h-18 items-center justify-between">
            <span className="pl-3 text-[0.8125rem]">
              <Logo tone="light" />
            </span>
            <button
              type="button"
              onClick={() => menuRef.current?.close()}
              aria-label="Close menu"
              className="-mr-2 grid size-11 place-items-center rounded-full text-xl hover:bg-white/10"
            >
              <Close />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-8">
            <ul>
              {navigation.map((item, i) => (
                <li key={item.href} className="border-b border-white/12">
                  <Link
                    href={item.href}
                    className="intro-rise flex items-baseline justify-between py-4 text-[2.5rem] leading-none font-extrabold uppercase font-condensed"
                    style={{ "--delay": `${80 + i * 50}ms` } as CSSProperties}
                  >
                    {item.label}
                    <ArrowRight className="text-2xl text-sun" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto grid gap-3 pt-10">
            <a href={business.phone.href} className={buttonClass("ghost-light", "w-full")}>
              <Phone className="text-lg" /> Call {business.phone.display}
            </a>
            <RequestButton className={buttonClass("sun", "w-full")}>
              Plan a free quote <ArrowRight className="text-lg" />
            </RequestButton>
          </div>
        </div>
      </dialog>
    </header>
  );
}
