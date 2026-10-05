import Link from "next/link";
import { Check } from "lucide-react";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import { packages } from "../../lib/site";

/**
 * Advisory tiers presented as an editorial ledger rather than a SaaS grid:
 * each engagement reads as a considered commitment with explicit hours and term.
 */
export default function Packages() {
  return (
    <section aria-labelledby="packages-title" className="py-24 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeading
            id="packages-title"
            eyebrow="Ways to engage"
            title="Support that fits your organisation."
          />

        <Reveal stagger className="flex flex-col gap-4">
          {packages.map((p, i) => (
            <article
              key={p.name}
              aria-labelledby={`pkg-${i}`}
              className={`relative grid gap-7 rounded-3xl border p-6 sm:p-8 md:p-12 lg:grid-cols-12 lg:gap-12 ${
                p.flagship
                  ? "border-neonlime/60 bg-gradient-to-br from-ultraviolet/25 via-void to-void"
                  : "border-alabaster/10 bg-alabaster/[0.02]"
              }`}
            >
              <div className="lg:col-span-5 flex flex-col gap-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm tabular-nums text-alabaster/40">{String(i + 1).padStart(2, "0")}</span>
                  {p.flagship && (
                    <span className="rounded-full bg-neonlime px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-void">
                      Flagship
                    </span>
                  )}
                  {i === 0 && (
                    <span className="rounded-full border border-alabaster/20 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-alabaster/70">
                      Paid diagnosis
                    </span>
                  )}
                </div>
                <h3 id={`pkg-${i}`} className="font-kamerick text-2xl md:text-3xl leading-tight text-alabaster">
                  {p.name}
                </h3>
                <p className="text-base leading-relaxed text-alabaster/65 text-pretty">{p.positioning}</p>
              </div>

              <details className="lg:col-span-4 lg:border-l lg:border-alabaster/10 lg:pl-12">
                <summary className="w-fit cursor-pointer rounded text-sm text-alabaster/75 hover:text-neonlime focus-visible:outline-2 focus-visible:outline-neonlime focus-visible:outline-offset-4">What’s included</summary>
                <ul className="mt-5 flex flex-col gap-3">
                  {p.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-alabaster/75">
                      <Check aria-hidden className="mt-0.5 h-4 w-4 flex-none text-neonlime" />
                      {item}
                    </li>
                  ))}
                </ul>
              </details>

              <div className="lg:col-span-3 flex flex-col gap-6 lg:items-end lg:text-right">
                <p className="flex flex-wrap items-baseline gap-2 lg:flex-col lg:items-end lg:gap-1">
                  <span className="font-sans text-4xl sm:text-5xl font-semibold tabular-nums tracking-tight text-alabaster">
                    {p.price}
                  </span>
                  <span className="text-sm text-alabaster/55">{p.cadence}</span>
                </p>
                <dl className="flex flex-col gap-1 text-sm text-alabaster/70">
                  <div>
                    <dt className="sr-only">Capacity</dt>
                    <dd>{p.hours}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Minimum term</dt>
                    <dd>{p.term}</dd>
                  </div>
                </dl>
                <Link
                  href={`/enquire?package=${encodeURIComponent(p.name)}`}
                  className={`mt-auto inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium transition-colors lg:w-auto ${
                    p.flagship
                      ? "bg-neonlime text-void hover:bg-alabaster"
                      : "border border-alabaster/20 text-alabaster hover:border-neonlime hover:text-neonlime"
                  }`}
                >
                  Enquire about this
                </Link>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
