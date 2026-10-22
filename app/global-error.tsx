"use client";

import { business } from "@/lib/site";
import "./globals.css";

// Last-resort boundary for errors in the root layout. It replaces the whole
// document, so it renders its own <html> and avoids layout-level providers.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-US">
      <body className="grid min-h-screen place-items-center bg-stone-50 p-6 text-ink">
        <main className="max-w-md text-center">
          <h1 className="text-3xl font-semibold tracking-tight">{business.name} is temporarily unavailable.</h1>
          <p className="mt-4 text-ink/75">
            Please try again, or call{" "}
            <a className="font-semibold underline" href={business.phone.href}>
              {business.phone.display}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-8 rounded-full bg-cobalt px-6 py-3 font-semibold text-white hover:bg-cobalt-700"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
