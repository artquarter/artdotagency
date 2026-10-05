"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { gsap } from "gsap";

type View = "form" | "processing" | "dashboard";
type Tab = "diagnostic" | "opportunities" | "plan";

const mockData = {
  "client": "Art Quarter (Coventry Cultural Gateway)",
  "capacityLedger": { "package": "Growth Partner", "fee": "£6,000/month", "maxHours": 16, "allocated": 5, "remaining": 11 },
  "diagnostic": {
    "physicalAssets": "28 Food Kitchens, 600m² Shared Dining, 400m² Events Room",
    "targetRealisedRate": "£300 - £350/hour",
    "evidenceGaps": ["Unresolved floor space calculation (3,766m² vs 3,392m²)", "Missing local audience demographic data for funding bids"]
  },
  "opportunities": [
    { "id": 1, "title": "Together on Culture: Magnets and Moonshots Fund", "type": "Funding (Birmingham City Council)", "score": 92, "status": "GREEN LIGHT REQUIRED" },
    { "id": 2, "title": "Ramadan Nights Lakemba-Style Food Pilot", "type": "Commercial Activation", "score": 85, "status": "RECOMMENDED" }
  ],
  "plan": [
    { "priority": 1, "title": "Draft Magnets & Moonshots Grant Application", "owner": "Bid Writer & Jordan", "status": "Awaiting Approval" },
    { "priority": 2, "title": "Reconcile Ground Floor Measurements", "owner": "Systems Analyst & Operator", "status": "In Progress" },
    { "priority": 3, "title": "Design Ramadan Food Nights Community Pilot", "owner": "Nav & Community Producer", "status": "Drafting" }
  ]
};

const loadingPhases = [
  "Parsing asset inventory and challenge parameters...",
  "Cross-referencing regional funding databases...",
  "Evaluating commercial utilization capacity...",
  "Drafting 90-day strategic workflows...",
];

const tabs: { id: Tab; label: string }[] = [
  { id: "diagnostic", label: "Diagnostic Health" },
  { id: "opportunities", label: "Opportunity Scout" },
  { id: "plan", label: "90-Day Plan" },
];

const inputClass = "min-w-0 w-full rounded-sm border border-gray-300 bg-white px-3 py-2.5 text-base text-gray-950 outline-none transition-colors focus:border-black focus:ring-1 focus:ring-black";
const labelClass = "mb-2 block text-xs font-medium text-gray-600";
const focusClass = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black";

export default function PortalDemo() {
  const [view, setView] = useState<View>("form");
  const [loadingStep, setLoadingStep] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>("diagnostic");
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const hasTransitioned = useRef(false);
  const { capacityLedger, diagnostic } = mockData;
  const usedPercentage = (capacityLedger.allocated / capacityLedger.maxHours) * 100;

  useEffect(() => {
    if (view !== "processing") return;
    let step = 0;
    const interval = window.setInterval(() => {
      step += 1;
      if (step === loadingPhases.length) {
        window.clearInterval(interval);
        setView("dashboard");
      } else {
        setLoadingStep(step);
      }
    }, 1500);
    return () => window.clearInterval(interval);
  }, [view]);

  useEffect(() => {
    if (!hasTransitioned.current) return;
    window.scrollTo({ top: 0, behavior: "instant" });
    headingRef.current?.focus({ preventScroll: true });
  }, [view]);

  useLayoutEffect(() => {
    if (view !== "dashboard" || !contentRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        ".animate-in",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.07, ease: "power2.out", clearProps: "opacity,transform" },
      );
    }, contentRef);
    return () => context.revert();
  }, [view, activeTab]);

  function runDiagnostic(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    hasTransitioned.current = true;
    setLoadingStep(0);
    setActiveTab("diagnostic");
    setView("processing");
  }

  function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    setActiveTab(tabs[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <main id="main" className="min-h-svh bg-[#F5F5F7] font-sans text-[#010101] antialiased selection:bg-gray-200 selection:text-black">
      {view === "form" && (
        <div className="flex min-h-svh items-center justify-center px-4 py-8 sm:px-6">
          <section aria-labelledby="intake-title" className="w-full max-w-2xl rounded-sm border border-gray-200 bg-white p-5 sm:p-8">
            <div className="mb-6 border-b border-gray-200 pb-5">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Artdot Agency / Advisory</p>
              <h1 id="intake-title" ref={headingRef} tabIndex={-1} className="text-xl font-medium tracking-tight outline-none sm:text-2xl">Diagnostic Intake</h1>
            </div>
            <form onSubmit={runDiagnostic} className="grid gap-5">
              <div>
                <label htmlFor="organisation" className={labelClass}>Organisation Name</label>
                <input id="organisation" name="organisation" autoComplete="organization" defaultValue={mockData.client} required className={inputClass} />
              </div>
              <div>
                <label htmlFor="assets" className={labelClass}>Asset Inventory</label>
                <textarea id="assets" name="assets" defaultValue="28 Food Kitchens, 600m² Shared Dining, 400m² Events Room." rows={3} required className={`${inputClass} resize-y`} />
              </div>
              <div>
                <label htmlFor="challenge" className={labelClass}>Primary Challenge</label>
                <textarea id="challenge" name="challenge" defaultValue="Unresolved floor space calculation (3,766m² vs 3,392m²) and missing local demographic data for funding bids." rows={4} required className={`${inputClass} resize-y`} />
              </div>
              <div className="grid min-w-0 gap-5 sm:grid-cols-2">
                <div className="min-w-0">
                  <label htmlFor="rate" className={labelClass}>Target Realised Rate</label>
                  <input id="rate" name="rate" defaultValue={diagnostic.targetRealisedRate} required className={inputClass} />
                </div>
                <div className="min-w-0">
                  <label htmlFor="retainer" className={labelClass}>Retainer Level</label>
                  <select id="retainer" name="retainer" defaultValue="Growth Partner (£6,000/month)" className={inputClass}>
                    <option>Growth Partner (£6,000/month)</option>
                  </select>
                </div>
              </div>
              <button type="submit" className={`mt-1 min-h-12 w-full rounded-sm bg-black px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 ${focusClass}`}>
                Run Diagnostic &amp; Generate Plan
              </button>
            </form>
          </section>
        </div>
      )}

      {view === "processing" && (
        <section aria-labelledby="processing-title" aria-busy="true" className="flex min-h-svh flex-col items-center justify-center px-6 py-12 text-center">
          <div aria-hidden="true" className="mb-8 h-9 w-9 animate-spin rounded-full border-2 border-gray-200 border-t-black motion-reduce:animate-none" />
          <h1 id="processing-title" ref={headingRef} tabIndex={-1} className="text-lg font-medium tracking-tight outline-none">Diagnostic in progress</h1>
          <p role="status" aria-live="polite" aria-atomic="true" className="mt-4 min-h-16 w-full max-w-md text-sm leading-6 text-gray-600">
            {loadingPhases[loadingStep]}
          </p>
          <p className="mt-4 text-xs tabular-nums text-gray-500">Stage {loadingStep + 1} / {loadingPhases.length}</p>
        </section>
      )}

      {view === "dashboard" && (
        <>
          <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-6xl px-4 pt-5 sm:px-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">Artdot / Client advisory</p>
                <button type="button" onClick={() => setView("form")} className={`min-h-9 shrink-0 rounded-sm border border-gray-200 px-3 text-xs text-gray-600 hover:border-gray-400 hover:text-black ${focusClass}`}>
                  New diagnostic
                </button>
              </div>
              <div className="flex flex-col justify-between gap-5 pb-5 md:flex-row md:items-center md:gap-10">
                <div className="min-w-0">
                  <h1 ref={headingRef} tabIndex={-1} className="text-lg font-medium leading-snug tracking-tight outline-none sm:text-xl">{mockData.client}</h1>
                  <p className="mt-2 text-xs leading-5 text-gray-600 sm:text-sm">{capacityLedger.package} · {capacityLedger.fee}</p>
                </div>
                <div className="w-full shrink-0 md:w-64">
                  <div className="mb-2 flex justify-between gap-3 text-xs">
                    <span className="font-medium">Capacity Ledger</span>
                    <span className="tabular-nums text-gray-600">{capacityLedger.allocated}h / {capacityLedger.maxHours}h</span>
                  </div>
                  <div role="progressbar" aria-label="Allocated professional hours" aria-valuemin={0} aria-valuemax={capacityLedger.maxHours} aria-valuenow={capacityLedger.allocated} aria-valuetext={`${capacityLedger.allocated} of ${capacityLedger.maxHours} hours allocated`} className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full bg-black" style={{ width: `${usedPercentage}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">{capacityLedger.remaining} hours remaining</p>
                </div>
              </div>
              <div role="tablist" aria-label="Diagnostic sections" className="grid grid-cols-3 border-t border-gray-100 sm:flex sm:gap-8">
                {tabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    ref={(element) => { tabRefs.current[index] = element; }}
                    type="button"
                    role="tab"
                    id={`tab-${tab.id}`}
                    aria-selected={activeTab === tab.id}
                    aria-controls={`panel-${tab.id}`}
                    tabIndex={activeTab === tab.id ? 0 : -1}
                    onClick={() => setActiveTab(tab.id)}
                    onKeyDown={(event) => navigateTabs(event, index)}
                    className={`min-h-14 border-b-2 px-1 py-3 text-xs font-medium transition-colors sm:px-0 sm:text-sm ${focusClass} ${activeTab === tab.id ? "border-black text-black" : "border-transparent text-gray-500 hover:text-black"}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </header>

          <div ref={contentRef} className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
            <div key={activeTab} role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`} tabIndex={0} className={`rounded-sm ${focusClass}`}>
              {activeTab === "diagnostic" && (
                <div className="grid gap-4 md:grid-cols-2">
                  <section className="animate-in rounded-sm border border-gray-200 bg-white p-5 sm:p-7">
                    <h2 className="mb-6 text-xs font-semibold uppercase tracking-wider text-gray-500">Asset Baseline</h2>
                    <dl className="grid gap-6">
                      <div>
                        <dt className="mb-2 text-xs text-gray-500">Physical Assets</dt>
                        <dd className="text-base font-medium leading-7">{diagnostic.physicalAssets}</dd>
                      </div>
                      <div>
                        <dt className="mb-2 text-xs text-gray-500">Target Realised Rate</dt>
                        <dd className="text-base font-medium tabular-nums">{diagnostic.targetRealisedRate}</dd>
                      </div>
                    </dl>
                  </section>
                  <section aria-labelledby="evidence-title" className="animate-in rounded-sm border border-red-200 bg-red-50 p-5 sm:p-7">
                    <h2 id="evidence-title" className="mb-6 text-xs font-semibold uppercase tracking-wider text-red-800">Attention Required: Evidence Gaps</h2>
                    <ul className="grid gap-5">
                      {diagnostic.evidenceGaps.map((gap) => (
                        <li key={gap} className="flex items-start gap-3 text-sm leading-6 text-red-950">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
                          {gap}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              )}

              {activeTab === "opportunities" && (
                <div className="grid gap-4">
                  <h2 className="sr-only">Funding and commercial opportunities</h2>
                  {mockData.opportunities.map((opportunity) => (
                    <article key={opportunity.id} className="animate-in flex flex-col justify-between gap-5 rounded-sm border border-gray-200 bg-white p-5 sm:p-7 md:flex-row md:items-center">
                      <div className="min-w-0">
                        <div className="mb-3 flex flex-wrap items-center gap-3">
                          <span className={`rounded-sm px-2 py-1 text-[10px] font-semibold tracking-wide ${opportunity.status === "GREEN LIGHT REQUIRED" ? "bg-amber-50 text-amber-900" : "bg-emerald-50 text-emerald-900"}`}>{opportunity.status}</span>
                          <span className="text-xs text-gray-500">{opportunity.type}</span>
                        </div>
                        <h3 className="text-base font-medium leading-6 sm:text-lg">{opportunity.title}</h3>
                      </div>
                      <div className="flex shrink-0 items-center justify-between gap-4 border-t border-gray-100 pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-6">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-gray-500">Match Score</p>
                          <p className="mt-1 text-xl font-medium tabular-nums">{opportunity.score}<span className="text-sm text-gray-500"> / 100</span></p>
                        </div>
                        <svg aria-hidden="true" viewBox="0 0 56 56" className="h-14 w-14 -rotate-90">
                          <circle cx="28" cy="28" r="22" fill="none" stroke="#F3F4F6" strokeWidth="4" />
                          <circle cx="28" cy="28" r="22" fill="none" stroke="currentColor" strokeWidth="4" pathLength="100" strokeDasharray="100" strokeDashoffset={100 - opportunity.score} strokeLinecap="round" />
                        </svg>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {activeTab === "plan" && (
                <section className="rounded-sm border border-gray-200 bg-white p-5 sm:p-7">
                  <h2 className="mb-7 text-xs font-semibold uppercase tracking-wider text-gray-500">90-Day Plan / Active Workflows</h2>
                  <ol className="ml-3 border-l border-gray-200">
                    {mockData.plan.map((item) => (
                      <li key={item.priority} className="animate-in relative pb-8 pl-6 last:pb-0 sm:pl-8">
                        <span aria-hidden="true" className="absolute -left-3.5 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 bg-white text-xs tabular-nums text-gray-600">{item.priority}</span>
                        <div className="flex flex-col justify-between gap-3 md:flex-row md:gap-6">
                          <div className="min-w-0">
                            <h3 className="text-base font-medium leading-6">{item.title}</h3>
                            <div className="mt-3 flex flex-wrap items-center gap-2">
                              <span className="text-xs text-gray-500">Owner</span>
                              {item.owner.split(" & ").map((owner) => (
                                <span key={owner} className="inline-flex items-center rounded-sm border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-800">
                                  {owner}
                                </span>
                              ))}
                            </div>
                          </div>
                          <span className={`h-fit w-fit shrink-0 rounded-sm border px-2.5 py-1 text-xs ${item.status === "Awaiting Approval" ? "border-amber-200 bg-amber-50 text-amber-900" : item.status === "In Progress" ? "border-blue-200 bg-blue-50 text-blue-900" : "border-gray-200 bg-gray-50 text-gray-600"}`}>{item.status}</span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
