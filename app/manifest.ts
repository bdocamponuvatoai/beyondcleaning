import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Beyond Cleaning",
    short_name: "Beyond Cleaning",
    description: "Home and business cleaning in New York City.",
    start_url: "/",
    display: "browser",
    background_color: "#faf8f3",
    theme_color: "#faf8f3",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
