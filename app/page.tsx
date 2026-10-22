import { Business } from "@/components/sections/business";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Faq } from "@/components/sections/faq";
import { FirstVisit } from "@/components/sections/first-visit";
import { Hero } from "@/components/sections/hero";
import { Quotes } from "@/components/sections/quotes";
import { Services } from "@/components/sections/services";
import { Spaces } from "@/components/sections/spaces";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Spaces />
      <Services />
      <Quotes />
      <FirstVisit />
      <Business />
      <Faq />
      <ClosingCta />
    </>
  );
}
