import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Capabilities } from "@/components/capabilities";
import { Features } from "@/components/features";
import { ViewsGallery } from "@/components/views-gallery";
import { Inspector } from "@/components/inspector";
import { Stats } from "@/components/stats";
import { Testimonials } from "@/components/testimonials";
import { Pricing } from "@/components/pricing";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative grain">
        <Hero />
        <Capabilities />
        <Stats />
        <Features />
        <ViewsGallery />
        <Inspector />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
