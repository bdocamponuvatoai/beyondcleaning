import { Sun } from "@/components/icons";
import { cx } from "@/components/ui";

/**
 * Wordmark redrawn from the client's current logo: sun behind heavy condensed caps.
 * On dark backgrounds the sun sits beside the letters, since white on yellow is unreadable.
 */
export function Logo({ tone = "brand", className }: { tone?: "brand" | "light"; className?: string }) {
  const light = tone === "light";
  return (
    <span className={cx("relative inline-flex items-center", light && "pl-[1.9em]", className)}>
      <Sun
        className={cx(
          "absolute text-sun",
          light ? "left-0 size-[1.6em]" : "-left-2 size-[2.6em] -translate-x-[0.15em]",
        )}
      />
      <span
        className={cx(
          "relative text-[1.5em] leading-none font-extrabold tracking-[-0.005em] uppercase font-condensed",
          light ? "text-white" : "text-cobalt",
        )}
      >
        Beyond Cleaning
      </span>
    </span>
  );
}
