import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "../Reveal";

export default function EnquiryCTA() {
  return (
    <section aria-labelledby="enquiry-title" className="py-24 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-alabaster/10 bg-gradient-to-br from-ultraviolet/40 via-void to-void p-6 sm:p-10 md:p-16">
          <div aria-hidden className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-ultraviolet/40 blur-[120px]" />
          <div className="relative grid gap-12 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="mb-6 text-xs uppercase tracking-[0.25em] text-neonlime">Enquiry</p>
              <h2 id="enquiry-title" className="font-kamerick text-[1.75rem] sm:text-3xl md:text-5xl lg:text-6xl leading-[1.15] text-alabaster text-balance">
                What’s your next move?
              </h2>
              <p className="mt-5 max-w-xl text-base md:text-lg leading-relaxed text-alabaster/70">
                Tell us your challenge. We aim to reply within 24 hours.
              </p>
            </div>
            <div className="md:col-span-4 md:flex md:justify-end">
              <Link
                href="/enquire"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-neonlime px-6 py-4 text-sm md:text-base font-medium text-void transition-colors hover:bg-alabaster"
              >
                Start an enquiry
                <ArrowRight aria-hidden className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
