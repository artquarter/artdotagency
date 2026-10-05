import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import { caseStudies } from "../../lib/data";
import { featuredCaseStudySlugs } from "../../lib/site";

export default function SelectedWork() {
  const featured = featuredCaseStudySlugs
    .map((slug) => caseStudies.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <section aria-labelledby="work-title" className="py-24 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeading
          id="work-title"
          eyebrow="Selected work"
          title="Brief, role, outcome."
        />
        <Reveal stagger className="grid gap-6 md:grid-cols-3">
          {featured.map((c) => (
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
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <span className="absolute left-4 top-4 rounded-full bg-void/80 px-3 py-1 text-xs text-alabaster backdrop-blur">
                  {c.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-8">
                <h3 className="font-kamerick text-xl md:text-2xl leading-snug text-alabaster">{c.client}</h3>
                {c.content?.evidencedResult && (
                  <p className="text-sm leading-relaxed text-alabaster/60 line-clamp-3">{c.content.evidencedResult}</p>
                )}
                <span className="mt-auto flex items-center gap-2 pt-4 text-sm text-neonlime">
                  Read case study
                  <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </Reveal>
        <Reveal className="mt-14 flex justify-center">
          <Link 
            href="/case-studies" 
            className="group inline-flex items-center gap-3 rounded-full border border-alabaster/20 px-8 py-4 text-sm font-medium text-alabaster transition-colors hover:border-neonlime hover:text-neonlime"
          >
            View all case studies
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
