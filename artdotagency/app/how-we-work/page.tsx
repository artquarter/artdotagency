import { pageMetadata } from "../lib/seo";
import PageHero from "../component /PageHero";
import Reveal from "../component /Reveal";
import HowWeWorkSection from "../component /home/HowWeWorkSection";
import Packages from "../component /home/Packages";
import EnquiryCTA from "../component /home/EnquiryCTA";
import Footer from "../component /Footer";

export const metadata = pageMetadata(
  "Consultancy Process, Packages & Pricing",
  "Start with a £3,000 Growth and Funding Diagnostic. Explore fixed-fee advisory and delivery support for funding, strategy and impact measurement.",
  "/how-we-work",
);

export default function HowWeWorkPage() {
  return (
    <>
      <main id="main" className="relative z-10">
        <PageHero
          eyebrow="How we work"
          title="Methodical, transparent and evidenced."
          intro="We do not believe in open-ended retainers or ambiguous deliverables. Our process is designed to protect your budget, clarify the outcomes and ensure you always know what we are working on."
        />
        <HowWeWorkSection />
        <Packages />
        <EnquiryCTA />
      </main>
      <Footer />
    </>
  );
}
