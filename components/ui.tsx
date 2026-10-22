import type { ReactNode } from "react";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Shared button styling so links and buttons look identical. */
export function buttonClass(variant: "cobalt" | "sun" | "ghost-light" | "ghost-dark" = "cobalt", className?: string) {
  return cx(
    "group/button inline-flex min-h-13 items-center justify-center gap-3 rounded-full px-6 text-[0.9375rem] font-semibold tracking-[-0.01em] whitespace-nowrap",
    "transition-[background-color,color,box-shadow,transform] duration-300 ease-(--ease-out-expo) active:scale-[0.98]",
    variant === "cobalt" && "bg-cobalt text-white hover:bg-cobalt-700",
    variant === "sun" && "bg-sun text-ink hover:bg-sun-300 hover:shadow-[0_10px_30px_-12px_rgb(248_208_112/0.9)]",
    variant === "ghost-light" && "text-white ring-1 ring-white/40 ring-inset hover:bg-white hover:text-ink",
    variant === "ghost-dark" && "text-ink ring-1 ring-ink/25 ring-inset hover:bg-ink hover:text-white",
    className,
  );
}

/** Arrow that nudges on hover of the parent `group/button`. */
export function ButtonArrow({ icon }: { icon: ReactNode }) {
  return (
    <span className="-mr-1 inline-flex text-lg transition-transform duration-300 ease-(--ease-out-expo) group-hover/button:translate-x-1">
      {icon}
    </span>
  );
}

/** Wide caps label, used sparingly, never above every section. */
export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx("caps-label", className)}>{children}</p>;
}
