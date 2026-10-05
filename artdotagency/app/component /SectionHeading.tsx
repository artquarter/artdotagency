import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  id?: string;
  align?: "left" | "split";
  invert?: boolean;
};

/** Consistent typographic hierarchy for every section on the site. */
export default function SectionHeading({ eyebrow, title, intro, id, align = "split", invert = false }: Props) {
  return (
    <Reveal
      className={`grid gap-5 mb-10 md:mb-20 ${align === "split" ? "md:grid-cols-12 md:items-end" : ""}`}
    >
      <div className={align === "split" ? "md:col-span-7" : "max-w-3xl"}>
        <p className={`flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] mb-4 md:mb-6 ${invert ? 'text-electric' : 'text-neonlime'}`}>
          <span aria-hidden className={`h-px w-8 ${invert ? 'bg-electric' : 'bg-neonlime'}`} />
          {eyebrow}
        </p>
        <h2
          id={id}
          className={`font-kamerick text-[1.75rem] sm:text-3xl md:text-5xl lg:text-6xl leading-[1.15] tracking-tight text-balance ${invert ? 'text-void' : 'text-alabaster'}`}
        >
          {title}
        </h2>
      </div>
      {intro && (
        <p
          className={`text-base md:text-lg leading-relaxed text-pretty ${
            align === "split" ? "md:col-span-5" : "max-w-2xl"
          } ${invert ? 'text-void/70' : 'text-alabaster/65'}`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
