import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import { capabilities } from "../../lib/site";
import CapabilityDiagram from "./CapabilityDiagram";

export default function Capabilities() {
  return (
    <section aria-labelledby="capabilities-title" className="py-24 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeading
          id="capabilities-title"
          eyebrow="Six capabilities"
          title="Funding, research & growth."
          intro="From grant applications and audience research to impact reports and venue business plans: choose the support your organisation needs."
        />
        
        <Reveal stagger as="ul" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 md:mt-24">
          {capabilities.map((c, i) => (
            <li key={c.slug} className="group relative min-w-0 rounded-3xl border border-alabaster/10 bg-alabaster/[0.02] p-6 sm:p-8 md:p-10 transition-colors hover:border-neonlime/50">
              <div className="flex flex-col h-full gap-8">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-mono text-alabaster/40 group-hover:text-neonlime transition-colors">
                    0{i + 1}
                  </span>
                  <ArrowUpRight aria-hidden className="h-5 w-5 text-alabaster/40 group-hover:text-neonlime transition-colors" />
                </div>
                
                <div className="mt-auto">
                  <h3 className="font-kamerick text-xl md:text-2xl text-alabaster mb-4">
                    <Link href={`/what-we-do/${c.slug}`} className="rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neonlime hover:text-neonlime">{c.title}</Link>
                  </h3>
                  <p className="text-sm leading-relaxed text-alabaster/60">
                    {c.summary}
                  </p>
                </div>
                <CapabilityDiagram title={c.title} outputs={c.outputs} />
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
