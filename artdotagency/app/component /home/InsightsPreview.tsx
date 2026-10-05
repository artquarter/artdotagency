import Link from "next/link";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import { insightsPreview } from "../../lib/site";

export default function InsightsPreview() {
  return (
    <section aria-labelledby="insights-title" className="py-24 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeading
          id="insights-title"
          eyebrow="Insights"
          title="Research and reports from our work."
        />
        <Reveal stagger as="ul" className="border-t border-alabaster/10">
          {insightsPreview.map((r) => {
            const Resource = r.href ? Link : "div";
            return (
            <li key={r.title} className="border-b border-alabaster/10">
              <Resource href={r.href ?? ""} className="group grid gap-3 py-10 md:grid-cols-12 md:gap-8">
                <span className="md:col-span-2 text-xs uppercase tracking-[0.2em] text-neonlime pt-2">{r.type}</span>
                <h3 className="md:col-span-5 font-kamerick text-xl md:text-3xl leading-snug text-alabaster group-hover:text-neonlime transition-colors">
                  {r.title}
                </h3>
                <p className="md:col-span-5 text-base leading-relaxed text-alabaster/60">{r.summary}</p>
              </Resource>
            </li>
          );
              })}
        </Reveal>
      </div>
    </section>
  );
}
