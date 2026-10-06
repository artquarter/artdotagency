"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronDown, FileText } from "lucide-react";
import { gsap } from "gsap";
import Link from "next/link";

type View = "form" | "processing" | "dashboard";
type Tab = "diagnostic" | "opportunities" | "plan";

const mockData = {
  "client": "Art Quarter",
  "capacityLedger": { "package": "Growth Partner", "fee": "£6,000/month", "maxHours": 16, "allocated": 5, "remaining": 11 },
  "diagnostic": {
    "physicalAssets": "28 Food Kitchens, 600m² Shared Dining, 400m² Events Room",
    "targetRealisedRate": "£300 - £350/hour",
    "evidenceGaps": ["The floor plans show two different sizes: 3,766m² and 3,392m².", "We need information about the local people this project will serve."]
  },
  "opportunities": [
    { "id": 1, "title": "Together on Culture: Magnets and Moonshots Fund", "type": "Funding (Birmingham City Council)", "score": 92, "status": "GREEN LIGHT REQUIRED" },
    { "id": 2, "title": "Ramadan Nights Lakemba-Style Food Pilot", "type": "Commercial Activation", "score": 85, "status": "RECOMMENDED" }
  ],
  "plan": [
    { "priority": 1, "title": "Prepare the funding application", "owner": "Bid Writer, approved by Jordan", "status": "Green light required" },
    { "priority": 2, "title": "Confirm the floor measurements", "owner": "Operations Lead with Art Quarter", "status": "In progress" },
    { "priority": 3, "title": "Plan community food nights", "owner": "Community Producer with Art Quarter", "status": "Identified" }
  ]
};

const initialBrief = {
  organisation: mockData.client,
  assets: `${mockData.diagnostic.physicalAssets}.`,
  challenge: "The floor plans show two different sizes (3,766m² and 3,392m²). We also need information about the people this project will serve.",
  rate: mockData.diagnostic.targetRealisedRate,
};

const reviewSteps = [
  "Checking the project details",
  "Reviewing funding options",
  "Reviewing income ideas",
  "Putting the next steps in order",
];

const journey: { id: "brief" | Tab; label: string; description: string }[] = [
  { id: "brief", label: "Project", description: "What you have" },
  { id: "diagnostic", label: "Priorities", description: "What needs fixing" },
  { id: "opportunities", label: "Options", description: "Ways to move forward" },
  { id: "plan", label: "Next steps", description: "Who does what" },
];

const tourSteps = [
  { label: "Welcome", title: "A walkthrough of your workspace.", body: "This is a sample client. It shows how Artdot takes an organisation from what it has today to a clear plan. Four short sections, about two minutes." },
  { label: "01 Project", title: "What you have.", body: "The organisation's spaces, its main challenge and the support package. This is the information we gather in the first diagnostic." },
  { label: "02 Priorities", title: "What needs fixing first.", body: "Gaps in the evidence are listed before any work starts, so applications are never built on unsupported claims." },
  { label: "03 Options", title: "Ways to move forward.", body: "Funding and income options, each with a fit score and a source. Nothing goes ahead without approval." },
  { label: "04 Next steps", title: "Who does what.", body: "A 90-day plan with a named owner for every task, and a live count of support hours. Try the Approve button on the first task." },
];

const focusClass = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neonlime";
const primaryClass = `inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-neonlime px-5 py-3 text-sm font-medium text-void transition-colors hover:bg-alabaster ${focusClass}`;
const secondaryClass = `inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-alabaster/65 transition-colors hover:bg-alabaster/5 hover:text-alabaster ${focusClass}`;
const inputClass = "min-w-0 w-full rounded-md border border-alabaster/20 bg-[#101010] px-3 py-2.5 text-base text-alabaster outline-none focus:border-neonlime focus:ring-1 focus:ring-neonlime";
const labelClass = "mb-2 block text-xs font-medium text-alabaster/65";
const cardClass = "rounded-2xl border border-alabaster/10 bg-[#0b0b0b]";

export default function PortalDemo() {
  const [view, setView] = useState<View>("form");
  const [loadingStep, setLoadingStep] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>("diagnostic");
  const [editing, setEditing] = useState(false);
  const [brief, setBrief] = useState(initialBrief);
  const [reviewedBrief, setReviewedBrief] = useState(initialBrief);
  const [hasResults, setHasResults] = useState(false);
  const [approved, setApproved] = useState(false);
  const [tourOpen, setTourOpen] = useState(true);
  const [tourStep, setTourStep] = useState(0);
  const tourNextRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const shouldFocus = useRef(false);
  const { capacityLedger } = mockData;
  const currentStep = view === "dashboard" ? journey.findIndex((step) => step.id === activeTab) : 0;
  const briefUnchanged = JSON.stringify(brief) === JSON.stringify(reviewedBrief);
  const canReturn = hasResults && briefUnchanged;

  useEffect(() => {
    if (view !== "processing") return;
    let step = 0;
    const interval = window.setInterval(() => {
      step += 1;
      if (step === reviewSteps.length) {
        window.clearInterval(interval);
        setHasResults(true);
        setView("dashboard");
      } else {
        setLoadingStep(step);
      }
    }, 1500);
    return () => window.clearInterval(interval);
  }, [view]);

  useEffect(() => {
    if (!shouldFocus.current) return;
    window.scrollTo({ top: 0, behavior: "instant" });
    headingRef.current?.focus({ preventScroll: true });
  }, [view, activeTab]);

  useLayoutEffect(() => {
    if (view === "processing" || !contentRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.fromTo(".animate-in", { opacity: 0, y: 10 }, {
        opacity: 1, y: 0, duration: 0.35, stagger: 0.06,
        ease: "power2.out", clearProps: "opacity,transform",
      });
    }, contentRef);
    return () => context.revert();
  }, [view, activeTab]);

  useEffect(() => {
    if (!tourOpen) return;
    tourNextRef.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setTourOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tourOpen, tourStep]);

  function openTour() { setTourStep(0); setTourOpen(true); }

  function goTo(step: "brief" | Tab) {
    shouldFocus.current = true;
    if (step === "brief") {
      setView("form");
    } else {
      setActiveTab(step);
      setView("dashboard");
    }
  }

  function runDiagnostic(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    shouldFocus.current = true;
    if (Object.values(brief).some((value) => !value.trim())) {
      setEditing(true);
      return;
    }
    setEditing(false);
    setActiveTab("diagnostic");
    if (canReturn) {
      setView("dashboard");
      return;
    }
    setReviewedBrief({ ...brief });
    setHasResults(false);
    setLoadingStep(0);
    setView("processing");
  }

  function updateBrief(field: keyof typeof initialBrief, value: string) {
    setBrief((previous) => ({ ...previous, [field]: value }));
  }

  return (
    <div className="min-h-svh bg-void font-kamerick text-alabaster antialiased selection:bg-neonlime selection:text-void lg:grid lg:grid-cols-[220px_minmax(0,1fr)]">
      <aside className="border-b border-alabaster/10 bg-void text-white lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-5 py-5 lg:block lg:px-7 lg:pt-9 lg:pb-10">
          <Link href="/" prefetch={false} aria-label="Artdot home" className="font-kamerick text-xl tracking-tight text-alabaster transition-colors hover:text-neonlime">artdot<span className="text-neonlime">.</span></Link>
          <p className="text-[10px] uppercase tracking-[0.18em] text-alabaster/55 lg:mt-3">Your workspace</p>
        </div>
        <nav aria-label="Project review" className="grid grid-cols-4 gap-1 px-3 pb-3 lg:grid-cols-1 lg:gap-2 lg:px-4">
          {journey.map((step, index) => {
            const isCurrent = currentStep === index;
            const disabled = view === "processing" || (index > 0 && !canReturn);
            return (
              <button
                key={step.id}
                type="button"
                disabled={disabled}
                aria-current={isCurrent ? "step" : undefined}
                onClick={() => goTo(step.id)}
                className={`flex min-h-14 min-w-0 flex-col items-center justify-center gap-1.5 rounded-lg px-1 py-2 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neonlime disabled:cursor-default lg:flex-row lg:justify-start lg:gap-3 lg:px-3 lg:py-3 lg:text-left ${isCurrent ? "bg-alabaster/5 text-neonlime" : "text-alabaster/60 enabled:hover:bg-alabaster/5 enabled:hover:text-white"}`}
              >
                <span aria-hidden="true" className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[9px] tabular-nums lg:h-6 lg:w-6 ${isCurrent ? "border-neonlime/40" : "border-white/15"}`}>{hasResults && index < currentStep ? <Check className="h-3 w-3" /> : `0${index + 1}`}</span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-medium sm:text-xs lg:text-sm">{step.label}</span>
                  <span className="mt-1 hidden text-[10px] text-alabaster/55 lg:block">{step.description}</span>
                </span>
              </button>
            );
          })}
        </nav>
        <div className="mt-auto hidden px-7 pb-7 lg:block">
          <div className="border-t border-white/10 pt-6">
            <p className="text-[10px] uppercase tracking-wider text-alabaster/55">Your support package</p>
            <p className="mt-3 text-sm">{capacityLedger.package}</p>
            <p className="mt-1 text-xs text-alabaster/55">{capacityLedger.fee}</p>
          </div>
        </div>
      </aside>

      <main id="main" className="min-w-0">
        <header className="flex min-h-16 items-center justify-between gap-4 border-b border-alabaster/10 bg-void px-5 py-4 sm:px-8 lg:px-10">
          <p className="min-w-0 text-xs leading-5 text-alabaster/65">{view === "form" ? brief.organisation : reviewedBrief.organisation}</p>
          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden text-[10px] uppercase tracking-wider text-alabaster/50 sm:block">Sample project · preloaded data</span>
            <button type="button" onClick={openTour} className={`${secondaryClass} min-h-9 px-3 text-xs`}>Take the tour</button>
          </div>
        </header>

        <div ref={contentRef} className="mx-auto max-w-[1120px] px-5 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          {view === "form" && (
            <form onSubmit={runDiagnostic}>
              <div className="animate-in mb-7 max-w-xl sm:mb-9">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-neonlime">01 / Your project</p>
                <h1 ref={headingRef} tabIndex={-1} className="text-[26px] font-medium leading-tight tracking-tight outline-none sm:text-3xl">Your project at a glance.</h1>
                <p className="mt-3 text-sm leading-6 text-alabaster/65">Check the details, then see what needs fixing and what to do next.</p>
              </div>

              <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
                <section className={`animate-in min-w-0 ${cardClass}`} aria-labelledby="brief-title">
                  <div className="flex items-center justify-between gap-3 border-b border-alabaster/10 px-5 py-4 sm:px-6">
                    <h2 id="brief-title" className="text-sm font-medium">Project summary</h2>
                    <button type="button" aria-expanded={editing} aria-controls="brief-details" onClick={() => setEditing(!editing)} className={`${secondaryClass} min-h-9 px-2 text-xs`}>
                      {editing ? "Close details" : "Edit details"}<ChevronDown aria-hidden className={`h-3.5 w-3.5 transition-transform ${editing ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                  {editing ? (
                    <div id="brief-details" className="grid gap-5 p-5 sm:p-6">
                      <div><label htmlFor="organisation" className={labelClass}>Organisation</label><input id="organisation" name="organisation" value={brief.organisation} onChange={(e) => updateBrief("organisation", e.target.value)} required className={inputClass} /></div>
                      <div><label htmlFor="assets" className={labelClass}>Spaces available</label><textarea id="assets" name="assets" value={brief.assets} onChange={(e) => updateBrief("assets", e.target.value)} rows={3} required className={inputClass} /></div>
                      <div><label htmlFor="challenge" className={labelClass}>Main challenge</label><textarea id="challenge" name="challenge" value={brief.challenge} onChange={(e) => updateBrief("challenge", e.target.value)} rows={4} required className={inputClass} /></div>
                      <div><label htmlFor="rate" className={labelClass}>Target hourly rate</label><input id="rate" name="rate" value={brief.rate} onChange={(e) => updateBrief("rate", e.target.value)} required className={inputClass} /></div>
                      <div><label htmlFor="retainer" className={labelClass}>Support package</label><select id="retainer" name="retainer" className={inputClass} defaultValue="Growth Partner (£6,000/month)"><option>Growth Partner (£6,000/month)</option></select></div>
                    </div>
                  ) : (
                    <div id="brief-details" className="p-5 sm:p-6">
                      <p className="text-[10px] uppercase tracking-wider text-alabaster/50">Spaces available</p>
                      <div className="mt-3 grid gap-2 sm:grid-cols-3">
                        {brief.assets.replace(/\.$/, "").split(",").map((asset, index) => (
                          <div key={index} className="rounded-lg border border-alabaster/10 bg-alabaster/[0.025] p-3.5">
                            <span className="mb-3 hidden text-[9px] tabular-nums text-neonlime sm:block">0{index + 1}</span>
                            <p className="text-sm font-medium leading-5">{asset.trim()}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 border-t border-alabaster/10 pt-5">
                        <p className="text-[10px] uppercase tracking-wider text-alabaster/50">What needs help</p>
                        <p className="mt-2 text-sm leading-6 text-alabaster/75">{brief.challenge}</p>
                      </div>
                      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-2 border-t border-alabaster/10 pt-5">
                        <span className="text-xs text-alabaster/50">Target hourly rate</span>
                        <span className="text-sm font-medium tabular-nums">{brief.rate}</span>
                      </div>
                    </div>
                  )}
                </section>
                <aside className={`animate-in hidden xl:block ${cardClass} p-5 sm:p-6`} aria-labelledby="review-includes">
                  <FileText aria-hidden className="mb-5 h-5 w-5 text-neonlime" />
                  <h2 id="review-includes" className="text-base font-medium">What you’ll see next</h2>
                  <ol className="mt-5 grid gap-5">
                    {journey.slice(1).map((step, index) => (
                      <li key={step.id} className="flex gap-3">
                        <span className="pt-0.5 text-[10px] tabular-nums text-alabaster/50">0{index + 1}</span>
                        <div><p className="text-sm font-medium">{step.label}</p><p className="mt-1 text-xs leading-5 text-alabaster/50">{step.description}.</p></div>
                      </li>
                    ))}
                  </ol>
                </aside>
              </div>
              <div className="animate-in mt-6 flex flex-col justify-between gap-4 rounded-xl border border-neonlime/20 bg-neonlime/[0.035] p-5 sm:flex-row sm:items-center sm:px-6">
                <div><p className="text-sm font-medium">{canReturn ? "Your priorities are ready." : "Ready to see the next step?"}</p><p className="mt-1 text-xs leading-5 text-alabaster/60">{canReturn ? "Pick up where you left off." : "Start with what needs attention."}</p></div>
                <button type="submit" className={`${primaryClass} shrink-0`}>{canReturn ? "Back to priorities" : "See priorities"}<ArrowRight aria-hidden className="h-4 w-4" /></button>
              </div>
            </form>
          )}

          {view === "processing" && (
            <section className="mx-auto max-w-xl py-5 sm:py-12" aria-labelledby="processing-title">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-neonlime">Project review</p>
              <h1 id="processing-title" ref={headingRef} tabIndex={-1} className="text-[26px] font-medium tracking-tight outline-none sm:text-3xl">Getting your plan ready.</h1>
              <p className="mt-3 text-sm leading-6 text-alabaster/65">We’re organising the priorities, options and next steps for your project.</p>
              <div className={`mt-7 ${cardClass} p-5 sm:p-7`}>
                <p className="border-b border-alabaster/10 pb-5 text-sm font-medium leading-6">{reviewedBrief.organisation}</p>
                <ol className="mt-6 grid gap-6" aria-label="Review progress">
                  {reviewSteps.map((step, index) => (
                    <li key={step} aria-current={index === loadingStep ? "step" : undefined} className={`flex items-center gap-3 text-sm ${index <= loadingStep ? "text-alabaster" : "text-alabaster/50"}`}>
                      <span aria-hidden className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${index < loadingStep ? "bg-neonlime/10 text-neonlime" : "border border-alabaster/15"}`}>
                        {index < loadingStep ? <Check className="h-3.5 w-3.5" /> : index === loadingStep ? <span className="h-3 w-3 animate-spin rounded-full border border-alabaster/15 border-t-neonlime motion-reduce:animate-none" /> : <span className="text-[9px]">{index + 1}</span>}
                      </span>{step}
                    </li>
                  ))}
                </ol>
                <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">{reviewSteps[loadingStep]}</p>
              </div>
              <p className="mt-5 text-center text-xs text-alabaster/50">Next: what to fix first.</p>
            </section>
          )}

          {view === "dashboard" && (
            <div key={activeTab}>
              <div className="animate-in mb-7 max-w-2xl sm:mb-9">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-neonlime">0{currentStep + 1} / {journey[currentStep].label}</p>
                <h1 ref={headingRef} tabIndex={-1} className="text-[26px] font-medium leading-tight tracking-tight outline-none sm:text-3xl">{activeTab === "diagnostic" ? "Two things to fix first." : activeTab === "opportunities" ? "Two ways to move forward." : "Your next 90 days."}</h1>
                <p className="mt-3 text-sm leading-6 text-alabaster/65">{activeTab === "diagnostic" ? "Resolve these two gaps to support a stronger funding application." : activeTab === "opportunities" ? "Consider a funding application and a small community food event." : "The work to do, who is responsible and where each task stands."}</p>
              </div>

              {activeTab === "diagnostic" && (
                <>
                  <section className="animate-in mb-5 rounded-xl border border-neonlime/20 bg-gradient-to-br from-ultraviolet/15 to-void p-5 sm:p-6" aria-labelledby="priority-title">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-neonlime">Start here</p>
                    <h2 id="priority-title" className="text-lg font-medium leading-snug">Confirm the space and who it serves.</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-alabaster/65">Agree the correct floor size and gather local audience information.</p>
                  </section>
                  <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                    <section className={`animate-in ${cardClass} p-5 sm:p-6`} aria-labelledby="gaps-title">
                      <div className="mb-5 flex items-center justify-between gap-3"><h2 id="gaps-title" className="text-sm font-medium">What’s missing</h2><span className="rounded-full bg-red-400/10 px-2.5 py-1 text-[10px] text-red-300">2 items</span></div>
                      <ol className="divide-y divide-alabaster/10">
                        {mockData.diagnostic.evidenceGaps.map((gap, index) => (
                          <li key={gap} className="flex gap-3 py-4 first:pt-0 last:pb-0"><span className="mt-0.5 text-xs tabular-nums text-alabaster/50">0{index + 1}</span><p className="text-sm leading-6">{gap}</p></li>
                        ))}
                      </ol>
                    </section>
                    <section className={`animate-in ${cardClass} p-5 sm:p-6`} aria-labelledby="baseline-title">
                      <h2 id="baseline-title" className="mb-5 text-sm font-medium">Your space</h2>
                      <dl className="grid gap-5"><div><dt className="text-[10px] uppercase tracking-wider text-alabaster/50">Spaces available</dt><dd className="mt-2 text-sm leading-6">{reviewedBrief.assets}</dd></div><div><dt className="text-[10px] uppercase tracking-wider text-alabaster/50">Target hourly rate</dt><dd className="mt-2 text-base font-medium">{reviewedBrief.rate}</dd></div></dl>
                    </section>
                  </div>
                  <div className="animate-in mt-7 flex flex-col-reverse justify-between gap-3 border-t border-alabaster/10 pt-5 sm:flex-row sm:items-center">
                    <button type="button" onClick={() => goTo("brief")} className={secondaryClass}><ArrowLeft aria-hidden className="h-4 w-4" />Back to project</button>
                    <button type="button" onClick={() => goTo("opportunities")} className={primaryClass}>See your options<ArrowRight aria-hidden className="h-4 w-4" /></button>
                  </div>
                </>
              )}

              {activeTab === "opportunities" && (
                <>
                  <div className="grid gap-5 xl:grid-cols-2">
                    {mockData.opportunities.map((opportunity, index) => (
                      <article key={opportunity.id} className={`animate-in flex min-w-0 flex-col ${cardClass} p-5 sm:p-6`}>
                        <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><span className="text-[10px] uppercase tracking-wider text-alabaster/50">Option 0{index + 1}</span><span className={`rounded-full px-2.5 py-1 text-[9px] font-semibold tracking-wide ${index === 0 ? "bg-amber-300/10 text-amber-200" : "bg-neonlime/10 text-neonlime"}`}>{index === 0 ? "Needs approval" : "Suggested"}</span></div>
                        <p className="mb-2 text-xs text-alabaster/50">{index === 0 ? "Government funding" : "Income from events"}</p>
                        <h2 className="text-lg font-medium leading-snug">{index === 0 ? "Apply for cultural funding" : "Try community food nights"}</h2>
                        <details className="mt-5 rounded-lg border border-alabaster/10 px-3 py-2">
                          <summary className={`cursor-pointer py-1 text-xs text-alabaster/65 ${focusClass}`}>More details</summary>
                          <p className="mt-3 text-sm leading-6">{opportunity.title}</p>
                          <p className="mt-2 text-xs leading-5 text-alabaster/60">{opportunity.type}</p>
                          <p className="mt-3 text-xs text-alabaster/60">Project match: {opportunity.score} / 100 (sample score)</p>
                          <p className="mt-2 pb-1 text-xs text-alabaster/60">{index === 0 ? "Eligibility to be confirmed by the Bid Writer against current guidance." : "Costs and assumptions to be reviewed before approval."}</p>
                        </details>
                        <div className="mt-5"><p className="text-[10px] uppercase tracking-wider text-alabaster/50">What to do next</p><p className="mt-2 text-sm leading-6 text-alabaster/75">{index === 0 ? "Check whether the project qualifies for this funding before starting the application." : "Agree the size, budget and team for a first food event."}</p></div>
                        <button type="button" onClick={() => goTo("plan")} className={`mt-auto flex min-h-12 items-center justify-between gap-3 pt-6 text-left text-sm font-medium text-neonlime ${focusClass}`}>See next steps<ArrowRight aria-hidden className="h-4 w-4 shrink-0" /></button>
                      </article>
                    ))}
                  </div>
                  <div className="animate-in mt-7 flex flex-col-reverse justify-between gap-3 border-t border-alabaster/10 pt-5 sm:flex-row sm:items-center"><button type="button" onClick={() => goTo("diagnostic")} className={secondaryClass}><ArrowLeft aria-hidden className="h-4 w-4" />Back to priorities</button><button type="button" onClick={() => goTo("plan")} className={primaryClass}>See next steps<ArrowRight aria-hidden className="h-4 w-4" /></button></div>
                </>
              )}

              {activeTab === "plan" && (
                <>
                  <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
                    <section className={`animate-in ${cardClass} p-5 sm:p-6`} aria-labelledby="work-title">
                      <div className="mb-6 flex items-center justify-between gap-3"><h2 id="work-title" className="text-sm font-medium">The next 90 days</h2><span className="text-xs text-alabaster/50">3 tasks</span></div>
                      <ol className="ml-3 border-l border-alabaster/15">
                        {mockData.plan.map((item) => {
                          const status = item.priority === 1 && approved ? "In production" : item.status;
                          return (
                          <li key={item.priority} className="animate-in relative pb-7 pl-6 last:pb-0 sm:pl-7">
                            <span aria-hidden className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-alabaster/15 bg-[#0b0b0b] text-[10px] text-neonlime">{item.priority}</span>
                            <h3 className="text-sm font-medium leading-6 sm:text-base">{item.title}</h3>
                            <p className="mt-2 text-xs leading-5 text-alabaster/50">{item.owner}</p>
                            <div className="mt-3 flex flex-wrap items-center gap-3">
                              <span className={`inline-block rounded-full px-2.5 py-1 text-[10px] ${status === "Green light required" ? "bg-amber-300/10 text-amber-200" : status === "In progress" || status === "In production" ? "bg-neonlime/10 text-neonlime" : "bg-alabaster/5 text-alabaster/65"}`}>{status}</span>
                              {item.priority === 1 && !approved && (
                                <button type="button" onClick={() => setApproved(true)} className={`rounded-full border border-neonlime/40 px-3 py-1 text-[11px] text-neonlime transition-colors hover:bg-neonlime/10 ${focusClass}`}>Approve as Jordan</button>
                              )}
                            </div>
                            {item.priority === 1 && (
                              <p className="mt-2 text-[11px] leading-5 text-alabaster/50">{approved ? "Approved by Jordan. Drafting can begin; the Bid Writer reviews before anything is submitted." : "Nothing is drafted until a named person approves."}</p>
                            )}
                          </li>
                          );
                        })}
                      </ol>
                    </section>
                    <div className="grid gap-5">
                      <section className="animate-in rounded-xl border border-neonlime/20 bg-neonlime/[0.035] p-5 sm:p-6" aria-labelledby="decision-title">
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-neonlime">Your next decision</p>
                        <h2 id="decision-title" className="text-base font-medium leading-snug">Agree who will take the first step.</h2>
                        <p className="mt-3 text-sm leading-6 text-alabaster/65">Confirm who will check the floor size and gather audience information. Then decide whether to proceed with the funding application.</p>
                      </section>
                      <section className={`animate-in ${cardClass} p-5 sm:p-6`} aria-labelledby="capacity-title">
                        <h2 id="capacity-title" className="text-sm font-medium">Your support hours</h2>
                        <p className="mt-1 text-xs text-alabaster/50">{capacityLedger.package} · {capacityLedger.fee}</p>
                        <div className="mt-5 flex items-baseline justify-between gap-2"><p className="text-2xl font-medium tabular-nums">{capacityLedger.remaining}<span className="ml-1 text-xs font-normal text-alabaster/50">hours remaining</span></p><span className="text-[10px] text-alabaster/50">{capacityLedger.allocated} / {capacityLedger.maxHours}h allocated</span></div>
                        <div role="progressbar" aria-label="Support hours allocated" aria-valuemin={0} aria-valuemax={capacityLedger.maxHours} aria-valuenow={capacityLedger.allocated} className="mt-3 h-1.5 overflow-hidden rounded-full bg-alabaster/10"><div className="h-full rounded-full bg-neonlime" style={{ width: `${(capacityLedger.allocated / capacityLedger.maxHours) * 100}%` }} /></div>
                      </section>
                    </div>
                  </div>
                  <div className="animate-in mt-7 flex flex-col-reverse justify-between gap-3 border-t border-alabaster/10 pt-5 sm:flex-row sm:items-center"><button type="button" onClick={() => goTo("opportunities")} className={secondaryClass}><ArrowLeft aria-hidden className="h-4 w-4" />Back to options</button><button type="button" onClick={() => goTo("diagnostic")} className={primaryClass}>Back to priorities<ArrowRight aria-hidden className="h-4 w-4" /></button></div>
                </>
              )}
            </div>
          )}
        </div>
      </main>

      {tourOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center" onClick={() => setTourOpen(false)}>
          <div role="dialog" aria-modal="true" aria-labelledby="tour-title" onClick={(e) => e.stopPropagation()} className={`w-full max-w-md ${cardClass} p-6 shadow-2xl sm:p-7`}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neonlime">{tourSteps[tourStep].label}</p>
            <h2 id="tour-title" className="mt-3 text-xl font-medium leading-snug tracking-tight">{tourSteps[tourStep].title}</h2>
            <p className="mt-3 text-sm leading-6 text-alabaster/70">{tourSteps[tourStep].body}</p>
            <div className="mt-6 flex items-center gap-1.5" aria-hidden="true">
              {tourSteps.map((_, i) => (
                <span key={i} className={`h-1 rounded-full transition-all ${i === tourStep ? "w-6 bg-neonlime" : "w-2 bg-alabaster/20"}`} />
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between gap-3">
              <button type="button" onClick={() => setTourOpen(false)} className={secondaryClass}>Skip</button>
              <div className="flex items-center gap-2">
                {tourStep > 0 && <button type="button" onClick={() => setTourStep(tourStep - 1)} className={secondaryClass}>Back</button>}
                <button
                  ref={tourNextRef}
                  type="button"
                  onClick={() => (tourStep === tourSteps.length - 1 ? setTourOpen(false) : setTourStep(tourStep + 1))}
                  className={primaryClass}
                >
                  {tourStep === tourSteps.length - 1 ? "Start demo" : "Next"}<ArrowRight aria-hidden className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="sr-only" role="status" aria-live="polite">Step {tourStep + 1} of {tourSteps.length}</p>
          </div>
        </div>
      )}
    </div>
  );
}
