"use client";

import { useState, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const mockData = {
  client: "Art Quarter (Coventry Cultural Gateway)",
  capacityLedger: {
    package: "Growth Partner",
    fee: "£6,000/month",
    maxHours: 16,
    allocated: 5,
    remaining: 11
  },
  diagnostic: {
    physicalAssets: "28 Food Kitchens, 600m² Shared Dining, 400m² Events Room",
    targetRealisedRate: "£300 - £350/hour",
    evidenceGaps: [
      "Unresolved floor space calculation (3,766m² vs 3,392m²)",
      "Missing local audience demographic data for funding bids"
    ]
  },
  opportunities: [
    {
      id: 1,
      title: "Together on Culture: Magnets and Moonshots Fund",
      type: "Funding (Birmingham City Council)",
      value: "£10,000 - £50,000",
      score: 92,
      deadline: "6 Nov 2026",
      status: "GREEN LIGHT REQUIRED"
    },
    {
      id: 2,
      title: "Ramadan Nights Lakemba-Style Food Pilot",
      type: "Commercial Activation",
      score: 85,
      effort: "High",
      status: "RECOMMENDED"
    }
  ],
  plan: [
    {
      priority: 1,
      title: "Draft Magnets & Moonshots Grant Application",
      owner: "Bid Writer & Jordan",
      status: "Awaiting Approval"
    },
    {
      priority: 2,
      title: "Reconcile Ground Floor Measurements & Fit-Out",
      owner: "Systems Analyst & Operator",
      status: "In Progress"
    },
    {
      priority: 3,
      title: "Design Ramadan Food Nights Community Pilot",
      owner: "Nav & Community Producer",
      status: "Drafting"
    }
  ]
};

export default function DashboardPrototype() {
  const [activeTab, setActiveTab] = useState<"diagnostic" | "opportunities" | "plan">("diagnostic");
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!contentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".animate-in",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" }
      );
    }, contentRef);

    return () => ctx.revert();
  }, [activeTab]);

  const percentageUsed = Math.round((mockData.capacityLedger.allocated / mockData.capacityLedger.maxHours) * 100);

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#010101] font-sans antialiased">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-xl font-medium tracking-tight">{mockData.client}</h1>
            <p className="text-sm text-gray-500 mt-1">Active Plan: {mockData.capacityLedger.package} ({mockData.capacityLedger.fee})</p>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-64">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Capacity Ledger</span>
              <span className="text-gray-500">{mockData.capacityLedger.allocated}h / {mockData.capacityLedger.maxHours}h</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-black transition-all duration-700 ease-in-out" 
                style={{ width: `${percentageUsed}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex gap-8 border-t border-gray-100 pt-1 -mb-px">
            {[
              { id: "diagnostic", label: "Diagnostic Health" },
              { id: "opportunities", label: "Opportunity Scout" },
              { id: "plan", label: "90-Day Plan" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id 
                    ? "border-black text-black" 
                    : "border-transparent text-gray-400 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 py-12" ref={contentRef}>
        
        {/* TAB 1: Diagnostic Health */}
        {activeTab === "diagnostic" && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="animate-in bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xs uppercase tracking-wider text-gray-400 mb-6">Asset Baseline</h2>
              <dl className="grid gap-6">
                <div>
                  <dt className="text-sm text-gray-500 mb-1">Physical Assets</dt>
                  <dd className="text-base font-medium">{mockData.diagnostic.physicalAssets}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500 mb-1">Target Realised Rate</dt>
                  <dd className="text-base font-medium">{mockData.diagnostic.targetRealisedRate}</dd>
                </div>
              </dl>
            </div>

            <div className="animate-in bg-red-50 border border-red-100 rounded-lg p-6">
              <h2 className="text-xs uppercase tracking-wider text-red-500 font-semibold mb-6">Attention Required: Evidence Gaps</h2>
              <ul className="grid gap-4">
                {mockData.diagnostic.evidenceGaps.map((gap, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-red-900">
                    <span className="mt-0.5 flex-none w-1.5 h-1.5 rounded-full bg-red-400" />
                    {gap}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: Opportunity Scout */}
        {activeTab === "opportunities" && (
          <div className="grid gap-4">
            {mockData.opportunities.map((opp) => (
              <div key={opp.id} className="animate-in flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm ${
                      opp.status === "GREEN LIGHT REQUIRED" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
                    }`}>
                      {opp.status}
                    </span>
                    <span className="text-xs text-gray-500">{opp.type}</span>
                  </div>
                  <h3 className="text-lg font-medium">{opp.title}</h3>
                  <div className="flex gap-4 mt-3 text-sm text-gray-600">
                    {opp.value && <span>Value: {opp.value}</span>}
                    {opp.deadline && <span>Deadline: {opp.deadline}</span>}
                    {opp.effort && <span>Effort: {opp.effort}</span>}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 border-t border-gray-100 md:border-none pt-4 md:pt-0">
                  <div className="text-right">
                    <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Match Score</div>
                    <div className="text-xl font-medium">{opp.score}%</div>
                  </div>
                  <svg className="w-12 h-12 transform -rotate-90">
                    <circle className="text-gray-100" strokeWidth="4" stroke="currentColor" fill="transparent" r="20" cx="24" cy="24" />
                    <circle 
                      className="text-black transition-all duration-1000 ease-out" 
                      strokeWidth="4" 
                      strokeDasharray={20 * 2 * Math.PI} 
                      strokeDashoffset={20 * 2 * Math.PI - (opp.score / 100) * (20 * 2 * Math.PI)}
                      strokeLinecap="round" 
                      stroke="currentColor" 
                      fill="transparent" 
                      r="20" 
                      cx="24" 
                      cy="24" 
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: 90-Day Plan */}
        {activeTab === "plan" && (
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h2 className="text-xs uppercase tracking-wider text-gray-400 mb-8">Active Workflows</h2>
            <div className="relative border-l border-gray-200 ml-3 md:ml-4">
              {mockData.plan.map((item, i) => (
                <div key={item.priority} className="animate-in mb-10 pl-6 md:pl-8 relative last:mb-0">
                  <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center text-[10px] font-medium text-gray-500">
                    {item.priority}
                  </span>
                  
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-medium">{item.title}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs uppercase tracking-wide text-gray-400">Owner:</span>
                        <span className="text-sm font-medium text-gray-800">{item.owner}</span>
                      </div>
                    </div>
                    
                    <span className="inline-flex text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-sm font-medium whitespace-nowrap w-fit">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
