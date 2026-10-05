import { pageMetadata } from "../lib/seo";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHero from "../component /PageHero";
import Reveal from "../component /Reveal";
import EnquiryCTA from "../component /home/EnquiryCTA";
import Footer from "../component /Footer";
import { insightsPreview } from "../lib/site";

export const metadata = pageMetadata(
  "Research, Funding & Community Impact Reports",
  "Read research and programme reports on cultural organisations, community activity and creative skills, including delivery experience through Art Quarter.",
  "/insights",
);

export default function InsightsPage() {
  return (
    <>
      <main id="main" className="relative z-10">
        <PageHero
          eyebrow="Insights"
          title="Research and reports from our work."
          intro="We publish impact reports, strategic proposals and research from our engagements so that learning can be shared across the sector."
        />
        
        <section className="pb-24 md:pb-40">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <Reveal stagger as="ul" className="border-t border-alabaster/10">
              {insightsPreview.map((r) => {
                const Resource = r.href ? Link : "div";
                return (
                <li key={r.title} className="border-b border-alabaster/10">
                  <Resource href={r.href ?? ""} className="group grid gap-4 py-12 md:grid-cols-12 md:items-center md:gap-8">
                    <span className="md:col-span-2 text-xs uppercase tracking-[0.2em] text-neonlime">{r.type}</span>
                    <div className="md:col-span-9 flex flex-col gap-4">
                       <h2 className="font-kamerick text-xl sm:text-2xl md:text-3xl leading-tight text-alabaster group-hover:text-neonlime transition-colors">
                         {r.title}
                       </h2>
                       <p className="text-lg leading-relaxed text-alabaster/60 max-w-2xl">{r.summary}</p>
                    </div>
                    <span className="md:col-span-1 flex md:justify-end">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-alabaster/15 text-alabaster transition-all duration-300 group-hover:border-neonlime group-hover:bg-neonlime group-hover:text-void">
                        {r.href && <ArrowUpRight aria-hidden className="h-4 w-4" />}
                      </span>
                    </span>
                  </Resource>
                </li>
              );
              })}
            </Reveal>
          </div>
        </section>

        <EnquiryCTA />
      </main>
      <Footer />
    </>
  );
}
