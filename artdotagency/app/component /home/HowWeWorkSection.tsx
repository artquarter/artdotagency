import Link from "next/link";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import { howWeWork } from "../../lib/site";

export default function HowWeWorkSection() {
  return (
    <section aria-labelledby="how-title" className="py-24 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeading
          id="how-title"
          eyebrow="How we work"
          title="Clear scope, capped hours, evidenced outcomes."
        />
        <Reveal stagger as="ol" className="grid gap-px overflow-hidden rounded-3xl border border-alabaster/10 bg-alabaster/10 md:grid-cols-2 lg:grid-cols-4">
          {howWeWork.map((s) => (
            <li key={s.step} className="flex flex-col gap-6 bg-void p-8 md:p-10">
              <span className="text-sm tabular-nums text-neonlime">{s.step}</span>
              <h3 className="font-kamerick text-xl md:text-2xl text-alabaster">{s.title}</h3>
              <p className="text-base leading-relaxed text-alabaster/60">{s.body}</p>
            </li>
          ))}
        </Reveal>
        <Reveal className="mt-14 flex justify-center md:justify-start">
          <Link 
            href="/how-we-work" 
            className="group inline-flex items-center gap-3 rounded-full border border-alabaster/20 px-8 py-4 text-sm font-medium text-alabaster transition-colors hover:border-neonlime hover:text-neonlime"
          >
            Explore our process
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
