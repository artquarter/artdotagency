import { pageMetadata } from "../lib/seo";
import PageHero from "../component /PageHero";
import Reveal from "../component /Reveal";
import EnquiryCTA from "../component /home/EnquiryCTA";
import Footer from "../component /Footer";
import { ART_QUARTER_NOTE } from "../lib/site";

export const metadata = pageMetadata(
  "About Our Cultural & Community Consultancy",
  "Meet Artdot, an independent consultancy supporting cultural and community organisations with funding, research, impact evidence and sustainable growth.",
  "/about",
);

export default function AboutPage() {
  return (
    <>
      <main id="main" className="relative z-10">
        <PageHero
          eyebrow="About"
          title="Practical experience, strategic rigor."
          intro="Artdot was founded to give cultural, community and purpose-led organisations the same quality of strategic advice, research and commercial modeling that corporate sectors expect."
        />

        <section className="pb-24 md:pb-40">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid md:grid-cols-12 gap-12 md:gap-24">
            <Reveal className="md:col-span-7 flex flex-col gap-8 text-lg md:text-xl leading-relaxed text-alabaster/70 text-pretty">
              <p>
                Too often, consultants bring generic frameworks that do not survive contact with community reality.
              </p>
              <p>
                Our perspective was shaped on the ground. We understand how hard it is to secure funding, how complex it is to manage a physical asset, and how much pressure chief executives are under to prove social value.
              </p>
              <p>
                We do not use jargon, we do not make assumptions, and we do not produce strategy documents that sit in a drawer. We build actionable, evidenced plans that give leaders the confidence to make decisions and the proof to secure investment.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="md:col-span-5 bg-alabaster/[0.02] border border-alabaster/10 p-10 md:p-12 rounded-3xl h-fit">
               <h3 className="text-xs uppercase tracking-[0.25em] text-neonlime mb-6">Our Heritage</h3>
               <p className="text-base leading-relaxed text-alabaster/80">
                 {ART_QUARTER_NOTE}
               </p>
            </Reveal>
          </div>
        </section>

        <EnquiryCTA />
      </main>
      <Footer />
    </>
  );
}
