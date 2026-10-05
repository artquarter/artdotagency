import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import { problemsSolved } from "../../lib/site";

export default function ProblemsSolved() {
  return (
    <section aria-labelledby="problems-title" className="py-24 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeading
          id="problems-title"
          eyebrow="Problems we solve"
          title="The challenges leaders bring to us."
        />
        <Reveal stagger as="ul" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12 mt-16 md:mt-24 border-t border-alabaster/10 pt-16">
          {problemsSolved.map((p, i) => (
            <li key={p.title} className="flex flex-col gap-6">
              <span className="text-xs font-mono text-neonlime border border-neonlime/20 bg-neonlime/10 px-3 py-1 rounded-full w-fit">
                0{i + 1}
              </span>
              <h3 className="font-kamerick text-2xl text-alabaster">{p.title}</h3>
              <p className="text-base leading-relaxed text-alabaster/60 text-pretty">{p.body}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
