import type { Metric } from "../lib/site";

function formatReview(date: string) {
  const [y, m] = date.split("-").map(Number);
  if (!y || !m) return date;
  return new Date(y, m - 1).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

/**
 * Renders an impact figure verbatim (no count-up, no parsing) in a tabular
 * numeral face so values like £29,496.60 can never be mangled.
 */
export default function MetricCard({ metric }: { metric: Metric }) {
  const missingReview = !metric.reviewDate;

  return (
    <figure className="flex flex-col h-full border-t border-alabaster/15 pt-8">
      <p className="font-sans font-semibold tabular-nums tracking-tight text-alabaster text-3xl sm:text-4xl xl:text-5xl leading-none">
        {metric.value}
      </p>
      <figcaption className="mt-5 flex flex-col gap-2 flex-1">
        <span className="text-base text-alabaster">{metric.label}</span>
        <span className="text-sm text-alabaster/55 leading-relaxed">{metric.context}</span>
      </figcaption>
    </figure>
  );
}
