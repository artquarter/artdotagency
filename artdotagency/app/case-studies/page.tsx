import { pageMetadata } from "../lib/seo";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import PageHero from "../component /PageHero";
import Reveal from "../component /Reveal";
import EnquiryCTA from "../component /home/EnquiryCTA";
import Footer from "../component /Footer";
import { caseStudies } from "../lib/data";

export const metadata = pageMetadata(
  "Funding, Community & Creative Programme Case Studies",
  "Explore the team’s delivery experience through Art Quarter: funding development, community screenings, creative training and community spaces.",
  "/case-studies",
);

export default function CaseStudiesPage() {
  return (
    <>
      <main id="main" className="relative z-10">
        <PageHero
          eyebrow="Case Studies"
          title="Evidence in action."
          intro="We do not ask you to trust our process on faith. These case studies set out the original brief, our precise role and the evidenced outcomes."
        />

        <section className="pb-24 md:pb-40">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <Reveal stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((c) => (
                <Link
                  key={c.slug}
                  href={`/case-studies/${c.slug}`}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-alabaster/10 bg-alabaster/[0.02] transition-colors hover:border-alabaster/30"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-void/80 px-3 py-1 text-xs text-alabaster backdrop-blur">
                      {c.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-8">
                    <h3 className="font-kamerick text-2xl leading-snug text-alabaster">{c.client}</h3>
                    {c.content?.brief && (
                      <p className="text-sm leading-relaxed text-alabaster/60 line-clamp-3">{c.content.brief}</p>
                    )}
                    <span className="mt-auto flex items-center gap-2 pt-4 text-sm text-neonlime">
                      Read case study
                      <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </Reveal>
          </div>
        </section>

        <EnquiryCTA />
      </main>
      <Footer />
    </>
  );
}
