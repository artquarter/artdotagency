"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { gsap } from "gsap";
import Link from "next/link";
import { generateStrategy } from "../actions";

type View = "form" | "processing" | "dashboard";
type Tab = "diagnostic" | "opportunities" | "plan";


const initialBrief = {
  organisation: "",
  assets: "",
  challenge: "",
  rate: ""
};


const WIZARD_ASSETS = ["Food Kitchens", "Shared Dining", "Events Room", "Co-working Space", "Exhibition Hall", "Meeting Rooms", "Cafe/Bar", "Outdoor Space", "Workshop"];
const WIZARD_CHALLENGES = [
  "We have floor plan discrepancies and lack audience data.",
  "We need to secure government funding within 3 months.",
  "We want to launch a commercial event to generate revenue.",
  "Our current community program lacks engagement.",
];
const WIZARD_RATES = ["£200 - £250/hour", "£300 - £350/hour", "£400+/hour"];

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

const evidenceStates = ["Contradicted", "Evidence required"];

const tourSteps = [
  { label: "Welcome", title: "A walkthrough of your workspace.", body: "It shows how Artdot takes an organisation from what it has today to a clear plan. Four short sections, about two minutes." },
  { label: "01 Project", title: "What you have.", body: "The organisation's spaces, its main challenge and the support package. This is the information we gather in the first diagnostic." },
  { label: "02 Priorities", title: "What needs fixing first.", body: "Gaps in the evidence are listed before any work starts, so applications are never built on unsupported claims." },
  { label: "03 Options", title: "Ways to move forward.", body: "Funding and income options, each with a fit score and a source. Nothing goes ahead without approval." },
  { label: "04 Next steps", title: "Who does what.", body: "A 90-day plan with a named owner for every task, and a live count of support hours. Jordan can approve, discuss or decline the first task." },
];

const focusClass = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neonlime";
const primaryClass = `inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-neonlime px-5 py-3 text-sm font-medium text-void transition-colors hover:bg-alabaster ${focusClass}`;
const secondaryClass = `inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-alabaster/65 transition-colors hover:bg-alabaster/5 hover:text-alabaster ${focusClass}`;


const cardClass = "rounded-2xl border border-alabaster/10 bg-[#0b0b0b]";

export default function PortalDemo() {
  const [formStep, setFormStep] = useState(1);
  const [wizardData, setWizardData] = useState({
    organisation: "",
    assets: [] as string[],
    challenge: "",
    rate: "",
  });

  async function submitWizard() {
    const generatedBrief = {
      organisation: wizardData.organisation,
      assets: wizardData.assets.join(", "),
      challenge: wizardData.challenge,
      rate: wizardData.rate
    };
    setBrief(generatedBrief);
    setReviewedBrief(generatedBrief);
    
    shouldFocus.current = true;
    
    setActiveTab("diagnostic");
    setHasResults(false);
    setLoadingStep(0);
    setView("processing");
    
    // Simulate steps updating for UI
    const timer = setInterval(() => {
        setLoadingStep(prev => Math.min(prev + 1, 3));
    }, 1500);

    try {
      const data = await generateStrategy(generatedBrief);
      setAiData(data);
      clearInterval(timer);
      setLoadingStep(4);
      setHasResults(true);
      setView("dashboard");
    } catch (e) {
      clearInterval(timer);
      console.error(e);
      alert("Failed to connect to OpenAI.");
      setView("form");
    }
  }

  const [view, setView] = useState<View>("form");
  const [loadingStep, setLoadingStep] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>("diagnostic");
  
  const [brief, setBrief] = useState(initialBrief);
  const [reviewedBrief, setReviewedBrief] = useState(initialBrief);
  const [hasResults, setHasResults] = useState(false);
  const [aiData, setAiData] = useState<any>(null);
  const [decision, setDecision] = useState<null | "approved" | "declined" | "discuss">(null);
  const [decidedAt, setDecidedAt] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("artdot_portal_state");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.formStep) setFormStep(parsed.formStep);
          if (parsed.wizardData) setWizardData(parsed.wizardData);
          if (parsed.brief) setBrief(parsed.brief);
          if (parsed.reviewedBrief) setReviewedBrief(parsed.reviewedBrief);
          if (parsed.hasResults) setHasResults(parsed.hasResults);
          if (parsed.aiData) setAiData(parsed.aiData);
          if (parsed.view) setView(parsed.view);
          if (parsed.activeTab) setActiveTab(parsed.activeTab);
          if (parsed.decision) setDecision(parsed.decision);
          if (parsed.decidedAt) setDecidedAt(parsed.decidedAt);
        } catch (e) {
          console.error("Failed to parse saved state", e);
        }
      }
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (isHydrated && typeof window !== "undefined") {
      const stateToSave = {
        formStep,
        wizardData,
        brief,
        reviewedBrief,
        hasResults,
        aiData,
        view,
        activeTab,
        decision,
        decidedAt
      };
      localStorage.setItem("artdot_portal_state", JSON.stringify(stateToSave));
    }
  }, [isHydrated, formStep, wizardData, brief, reviewedBrief, hasResults, aiData, view, activeTab, decision, decidedAt]);

  function decide(next: "approved" | "declined" | "discuss") {
    setDecision(next);
    setDecidedAt(new Date().toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }));
  }
  function resetDecision() { setDecision(null); setDecidedAt(""); }
  const [tourOpen, setTourOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSeen = localStorage.getItem("artdot_tour_seen");
      if (!hasSeen) {
        setTourOpen(true);
      }
    }
  }, []);

  function closeTour() {
    setTourOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("artdot_tour_seen", "true");
    }
  }
  const [tourStep, setTourStep] = useState(0);
  const tourNextRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const shouldFocus = useRef(false);
  const capacityLedger = { package: "Growth Partner", fee: "£6,000/month", maxHours: 16, allocated: 5, remaining: 11 };
  const currentStep = view === "dashboard" ? journey.findIndex((step) => step.id === activeTab) : 0;
  const briefUnchanged = JSON.stringify(brief) === JSON.stringify(reviewedBrief);
  const canReturn = hasResults && briefUnchanged;

  

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
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") closeTour(); };
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

  if (!isHydrated) {
    return null; // Prevent hydration flash
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
            <span className="hidden text-[10px] uppercase tracking-wider text-alabaster/50 sm:block">Workspace session</span>
            <button type="button" onClick={openTour} className={`${secondaryClass} min-h-9 px-3 text-xs`}>Take the tour</button>
          </div>
        </header>

        <div ref={contentRef} className="mx-auto max-w-[1120px] px-5 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
                    {view === "form" && (
            <div className="mx-auto max-w-2xl py-10">
              <div className="mb-10 flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neonlime">Step 0{formStep} / 04</p>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map(s => (
                    <div key={s} className={`h-1 rounded-full transition-all duration-300 ${s === formStep ? "w-6 bg-neonlime" : s < formStep ? "w-2 bg-neonlime/40" : "w-2 bg-alabaster/20"}`} />
                  ))}
                </div>
              </div>

              {formStep === 1 && (
                <div className="animate-in space-y-6">
                  <h1 className="text-[26px] font-medium tracking-tight sm:text-3xl">What is the name of your organisation?</h1>
                  <input 
                    type="text" 
                    autoFocus
                    placeholder="e.g. Art Quarter" 
                    value={wizardData.organisation} 
                    onChange={e => setWizardData({...wizardData, organisation: e.target.value})} 
                    className="w-full border-b border-alabaster/20 bg-transparent py-4 text-xl text-alabaster outline-none transition-colors focus:border-neonlime placeholder:text-alabaster/30"
                    onKeyDown={e => e.key === "Enter" && wizardData.organisation.trim() && setFormStep(2)}
                  />
                  <div className="mt-10 flex justify-end">
                    <button type="button" onClick={() => setFormStep(2)} disabled={!wizardData.organisation.trim()} className={`${primaryClass} disabled:opacity-50 disabled:cursor-not-allowed`}>Next<ArrowRight className="h-4 w-4" /></button>
                  </div>
                </div>
              )}
              
              {formStep === 2 && (
                <div className="animate-in space-y-6">
                  <h1 className="text-[26px] font-medium tracking-tight sm:text-3xl">What spaces do you have available?</h1>
                  <p className="text-sm text-alabaster/60">Select all that apply.</p>
                  <div className="flex flex-wrap gap-3">
                    {WIZARD_ASSETS.map(asset => {
                      const isSelected = wizardData.assets.includes(asset);
                      return (
                        <button 
                          key={asset} 
                          type="button" 
                          onClick={() => {
                            if (isSelected) setWizardData({...wizardData, assets: wizardData.assets.filter(a => a !== asset)});
                            else setWizardData({...wizardData, assets: [...wizardData.assets, asset]});
                          }}
                          className={`rounded-full border px-5 py-3 text-sm transition-all duration-200 ${isSelected ? "border-neonlime bg-neonlime/10 text-neonlime" : "border-alabaster/20 bg-[#101010] text-alabaster hover:border-alabaster/50 hover:bg-[#1a1a1a]"}`}
                        >
                          {asset}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-10 flex justify-between">
                    <button type="button" onClick={() => setFormStep(1)} className={secondaryClass}><ArrowLeft className="h-4 w-4" />Back</button>
                    <button type="button" onClick={() => setFormStep(3)} disabled={wizardData.assets.length === 0} className={`${primaryClass} disabled:opacity-50 disabled:cursor-not-allowed`}>Next<ArrowRight className="h-4 w-4" /></button>
                  </div>
                </div>
              )}

              {formStep === 3 && (
                <div className="animate-in space-y-6">
                  <h1 className="text-[26px] font-medium tracking-tight sm:text-3xl">What is your primary challenge right now?</h1>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {WIZARD_CHALLENGES.map(challenge => {
                      const isSelected = wizardData.challenge === challenge;
                      return (
                        <button 
                          key={challenge} 
                          type="button" 
                          onClick={() => setWizardData({...wizardData, challenge})}
                          className={`text-left rounded-xl border p-5 transition-all duration-200 ${isSelected ? "border-neonlime bg-neonlime/10" : "border-alabaster/20 bg-[#101010] hover:border-alabaster/50 hover:bg-[#1a1a1a]"}`}
                        >
                          <p className={`text-sm leading-relaxed ${isSelected ? "text-neonlime" : "text-alabaster/90"}`}>{challenge}</p>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-10 flex justify-between">
                    <button type="button" onClick={() => setFormStep(2)} className={secondaryClass}><ArrowLeft className="h-4 w-4" />Back</button>
                    <button type="button" onClick={() => setFormStep(4)} disabled={!wizardData.challenge} className={`${primaryClass} disabled:opacity-50 disabled:cursor-not-allowed`}>Next<ArrowRight className="h-4 w-4" /></button>
                  </div>
                </div>
              )}

              {formStep === 4 && (
                <div className="animate-in space-y-6">
                  <h1 className="text-[26px] font-medium tracking-tight sm:text-3xl">What is your target realised rate?</h1>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {WIZARD_RATES.map(rate => {
                      const isSelected = wizardData.rate === rate;
                      return (
                        <button 
                          key={rate} 
                          type="button" 
                          onClick={() => setWizardData({...wizardData, rate})}
                          className={`text-center rounded-xl border p-4 transition-all duration-200 ${isSelected ? "border-neonlime bg-neonlime/10 text-neonlime" : "border-alabaster/20 bg-[#101010] text-alabaster hover:border-alabaster/50 hover:bg-[#1a1a1a]"}`}
                        >
                          {rate}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-10 flex justify-between">
                    <button type="button" onClick={() => setFormStep(3)} className={secondaryClass}><ArrowLeft className="h-4 w-4" />Back</button>
                    <button type="button" onClick={() => submitWizard()} disabled={!wizardData.rate} className={`${primaryClass} disabled:opacity-50 disabled:cursor-not-allowed`}>Run Diagnostic<ArrowRight className="h-4 w-4" /></button>
                  </div>
                </div>
              )}
            </div>
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

          {view === "dashboard" && aiData && (
            <div key={activeTab}>
              <div className="animate-in mb-7 max-w-2xl sm:mb-9">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-neonlime">0{currentStep + 1} / {journey[currentStep].label}</p>
                <h1 ref={headingRef} tabIndex={-1} className="text-[26px] font-medium leading-tight tracking-tight outline-none sm:text-3xl">{activeTab === "diagnostic" ? "Two things to fix first." : activeTab === "opportunities" ? "Two ways to move forward." : "Your next 90 days."}</h1>
                <p className="mt-3 text-sm leading-6 text-alabaster/65">{activeTab === "diagnostic" ? "Review the evidence gaps before proceeding." : activeTab === "opportunities" ? "Here are the top options we matched for your project." : "The work to do, who is responsible and where each task stands."}</p>
              </div>

              {activeTab === "diagnostic" && (
                <>
                  <section className="animate-in mb-5 rounded-xl border border-neonlime/20 bg-gradient-to-br from-ultraviolet/15 to-void p-5 sm:p-6" aria-labelledby="priority-title">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-neonlime">Start here</p>
                    <h2 id="priority-title" className="text-lg font-medium leading-snug">{aiData.diagnostic.priorityTitle}</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-alabaster/65">{aiData.diagnostic.priorityDescription}</p>
                  </section>
                  <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                    <section className={`animate-in ${cardClass} p-5 sm:p-6`} aria-labelledby="gaps-title">
                      <div className="mb-5 flex items-center justify-between gap-3"><h2 id="gaps-title" className="text-sm font-medium">What’s missing</h2><span className="rounded-full bg-red-400/10 px-2.5 py-1 text-[10px] text-red-300">2 items</span></div>
                      <ol className="divide-y divide-alabaster/10">
                        {aiData.diagnostic.evidenceGaps.map((gap, index) => (
                          <li key={gap} className="flex gap-3 py-4 first:pt-0 last:pb-0"><span className="mt-0.5 text-xs tabular-nums text-alabaster/50">0{index + 1}</span><div><p className="text-sm leading-6">{gap}</p><span className="mt-2 inline-block rounded-full bg-red-400/10 px-2.5 py-1 text-[10px] text-red-300">{evidenceStates[index]}</span></div></li>
                        ))}
                      </ol>
                    </section>
                    <section className={`animate-in ${cardClass} p-5 sm:p-6`} aria-labelledby="baseline-title">
                      <h2 id="baseline-title" className="mb-5 text-sm font-medium">Your space</h2>
                      <dl className="grid gap-5"><div><dt className="text-[10px] uppercase tracking-wider text-alabaster/50">Spaces available</dt><dd className="mt-2 text-sm leading-6">{reviewedBrief.assets}</dd></div><div><dt className="text-[10px] uppercase tracking-wider text-alabaster/50">Support package</dt><dd className="mt-2 text-base font-medium">{capacityLedger.package}</dd></div></dl>
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
                    {aiData.opportunities.map((opportunity: any, index: number) => {
                      const isBestBet = index === 0;
                      return (
                      <article key={opportunity.id} className={`animate-in flex min-w-0 flex-col ${cardClass} p-5 sm:p-6 ${isBestBet ? "border-neonlime/30 bg-neonlime/[0.02]" : ""}`}>
                        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                          <span className="text-[10px] uppercase tracking-wider text-alabaster/50">Option 0{index + 1}</span>
                          <span className={`rounded-full px-2.5 py-1 text-[9px] font-semibold tracking-wide ${isBestBet ? "bg-neonlime/15 text-neonlime" : "bg-alabaster/10 text-alabaster"}`}>
                            {isBestBet ? "★ BEST BET" : "ALTERNATIVE"}
                          </span>
                        </div>
                        <p className="mb-2 text-xs text-alabaster/50 uppercase tracking-wider">{opportunity.type}</p>
                        <h2 className="text-lg font-medium leading-snug">{opportunity.title}</h2>
                        <p className="mt-3 text-sm leading-6 text-alabaster/80">{opportunity.shortDescription}</p>
                        <div className="mt-5 rounded-lg border border-alabaster/10 bg-[#101010] p-4">
                          <p className="text-xs text-alabaster/50">Match Score</p>
                          <div className="mt-2 flex items-center gap-3">
                            <div className="h-1.5 flex-1 rounded-full bg-alabaster/10"><div className="h-full rounded-full bg-neonlime" style={{ width: `${opportunity.score}%` }} /></div>
                            <span className="text-xs font-medium">{opportunity.score}/100</span>
                          </div>
                        </div>
                        <div className="mt-5">
                          <p className="text-[10px] uppercase tracking-wider text-alabaster/50">What to do next</p>
                          <p className="mt-2 text-sm leading-6 text-alabaster/75">{opportunity.nextSteps}</p>
                        </div>
                        <button type="button" onClick={() => goTo("plan")} className={`mt-auto flex min-h-12 items-center justify-between gap-3 pt-6 text-left text-sm font-medium text-neonlime ${focusClass}`}>See next steps<ArrowRight aria-hidden className="h-4 w-4 shrink-0" /></button>
                      </article>
                    )})}
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
                        {aiData.plan.map((item) => {
                          const status = item.priority === 1 && decision ? ({ approved: "In production", declined: "Declined", discuss: "Discussion requested" } as const)[decision] : item.status;
                          return (
                          <li key={item.priority} className="animate-in relative pb-7 pl-6 last:pb-0 sm:pl-7">
                            <span aria-hidden className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-alabaster/15 bg-[#0b0b0b] text-[10px] text-neonlime">{item.priority}</span>
                            <h3 className="text-sm font-medium leading-6 sm:text-base">{item.title}</h3>
                            <p className="mt-2 text-xs leading-5 text-alabaster/50">{item.owner}</p>
                            <div className="mt-3 flex flex-wrap items-center gap-3">
                              <span className={`inline-block rounded-full px-2.5 py-1 text-[10px] ${status === "Green light required" || status === "Discussion requested" ? "bg-amber-300/10 text-amber-200" : status === "In progress" || status === "In production" ? "bg-neonlime/10 text-neonlime" : "bg-alabaster/5 text-alabaster/65"}`}>{status}</span>
                              {item.priority === 1 && !decision && (
                                <>
                                  <button type="button" onClick={() => decide("approved")} className={`rounded-full border border-neonlime/40 px-3 py-1 text-[11px] text-neonlime transition-colors hover:bg-neonlime/10 ${focusClass}`}>Approve as Jordan</button>
                                  <button type="button" onClick={() => decide("discuss")} className={`rounded-full border border-alabaster/20 px-3 py-1 text-[11px] text-alabaster/75 transition-colors hover:bg-alabaster/5 ${focusClass}`}>Discuss</button>
                                  <button type="button" onClick={() => decide("declined")} className={`rounded-full border border-alabaster/20 px-3 py-1 text-[11px] text-alabaster/75 transition-colors hover:bg-alabaster/5 ${focusClass}`}>Decline</button>
                                </>
                              )}
                            </div>
                            {item.priority === 1 && (
                              <>
                                <p className="mt-2 text-[11px] leading-5 text-alabaster/50">Capacity check: about 9 of 11 remaining hours. Within capacity. Complexity: Class B.</p>
                                <p className="mt-1 text-[11px] leading-5 text-alabaster/50">{decision === "approved" ? "Approved by Jordan on condition that the Bid Writer reviews before anything is submitted." : decision === "declined" ? "Declined by Jordan. No work has started." : decision === "discuss" ? "Jordan has asked to discuss before deciding. No work has started." : "Nothing is drafted until a named person approves."}</p>
                                {decision && (
                                  <p className="mt-1 text-[11px] leading-5 text-alabaster/50">Decision record: Jordan · {decidedAt} <button type="button" onClick={resetDecision} className={`ml-2 underline underline-offset-2 hover:text-alabaster ${focusClass}`}>Reset demo</button></p>
                                )}
                              </>
                            )}
                          </li>
                          );
                        })}
                      </ol>
                    </section>
                    <div className="grid gap-5">
                      <section className="animate-in rounded-xl border border-neonlime/20 bg-neonlime/[0.035] p-5 sm:p-6" aria-labelledby="decision-title">
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-neonlime">Your next decision</p>
                        <h2 id="decision-title" className="text-base font-medium leading-snug">{aiData.plan[0]?.title || "Agree who will take the first step."}</h2>
                        <p className="mt-3 text-sm leading-6 text-alabaster/65">Review the priority task and decide whether to approve, discuss, or decline.</p>
                      </section>
                      <section className={`animate-in ${cardClass} p-5 sm:p-6`} aria-labelledby="needs-title">
                        <h2 id="needs-title" className="text-sm font-medium">What we need from you</h2>
                        <ol className="mt-4 grid gap-3">
                          {aiData.diagnostic.evidenceGaps.map((gap: string, index: number) => (
                            <li key={index} className="flex gap-3 text-sm leading-6">
                              <span className="mt-0.5 text-xs tabular-nums text-alabaster/50">0{index + 1}</span>{gap}
                            </li>
                          ))}
                        </ol>
                        <p className="mt-4 text-[11px] leading-5 text-alabaster/50">Drafting starts once both are confirmed.</p>
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
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center" onClick={closeTour}>
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
              <button type="button" onClick={closeTour} className={secondaryClass}>Skip</button>
              <div className="flex items-center gap-2">
                {tourStep > 0 && <button type="button" onClick={() => setTourStep(tourStep - 1)} className={secondaryClass}>Back</button>}
                <button
                  ref={tourNextRef}
                  type="button"
                  onClick={() => (tourStep === tourSteps.length - 1 ? closeTour() : setTourStep(tourStep + 1))}
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
