import Reveal from "./Reveal";

export default function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <header className="pt-28 pb-12 md:pt-52 md:pb-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <p className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-neonlime md:mb-8">
            <span aria-hidden className="h-px w-8 bg-neonlime" />
            {eyebrow}
          </p>
          <h1 className="font-kamerick text-[clamp(1.875rem,5.5vw,5rem)] leading-[1.15] tracking-[-0.02em] text-alabaster max-w-[18ch] text-balance">
            {title}
          </h1>
          {intro && (
            <p className="mt-6 max-w-2xl text-base md:mt-10 md:text-xl leading-relaxed text-alabaster/70 text-pretty">{intro}</p>
          )}
        </Reveal>
      </div>
    </header>
  );
}
