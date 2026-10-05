import Reveal from "../Reveal";
import MetricCard from "../MetricCard";
import { verifiedMetrics, ART_QUARTER_NOTE } from "../../lib/site";

export default function VerifiedProof() {
  return (
    <section aria-labelledby="proof-title" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="proof-title" className="text-xs uppercase tracking-[0.25em] text-neonlime flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-neonlime" />
            Verified proof
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-alabaster/55">{ART_QUARTER_NOTE}</p>
        </Reveal>
        <Reveal stagger className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {verifiedMetrics.map((m) => (
            <MetricCard key={m.label} metric={m} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
