"use client";

import { useState } from "react";
import { ArrowUpRight, ChartNoAxesCombined, FileText, Target, Users } from "lucide-react";

const outputIcons = [Target, ChartNoAxesCombined, Users, FileText];

/** A navigable map of deliverables, not a chart of client performance. */
export default function CapabilityDiagram({ title, outputs }: { title: string; outputs: string[] }) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="rounded-2xl border border-alabaster/10 bg-void/50 p-4">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.15em] text-alabaster/55">
        <span>Explore outputs</span>
        <span className="tabular-nums">0{selected + 1} / 0{outputs.length}</span>
      </div>
      <div className="relative mt-3 h-28">
        <svg aria-hidden="true" viewBox="0 0 240 112" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {outputs.map((output, index) => (
            <path
              key={output}
              d={`M 120 24 V 44 Q 120 52 ${30 + index * 60} 52 V 84`}
              fill="none"
              stroke={selected === index ? "#CCFF00" : "#F5F5F7"}
              strokeOpacity={selected === index ? 0.7 : 0.12}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
        <span aria-hidden="true" className="absolute left-1/2 top-0 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-xl border border-ultraviolet/60 bg-ultraviolet/25 text-alabaster">
          <ArrowUpRight className="h-4 w-4" />
        </span>
        <div role="group" aria-label={`${title} deliverables`} className="absolute inset-x-0 bottom-0 grid grid-cols-4">
          {outputs.map((output, index) => {
            const Icon = outputIcons[index];
            return (
              <button
                key={output}
                type="button"
                aria-label={output}
                aria-pressed={selected === index}
                onClick={() => setSelected(index)}
                className={`mx-auto flex h-11 w-11 items-center justify-center rounded-xl border transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neonlime ${selected === index ? "border-neonlime/60 bg-neonlime text-void" : "border-alabaster/15 bg-void text-alabaster/60 hover:border-neonlime/50 hover:text-neonlime"}`}
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
              </button>
            );
          })}
        </div>
      </div>
      <p aria-live="polite" aria-atomic="true" className="mt-4 min-h-10 text-xs leading-5 text-alabaster/75">{outputs[selected]}</p>
    </div>
  );
}
