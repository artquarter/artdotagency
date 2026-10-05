"use client";

import { FormEvent, Suspense, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import PageHero from "../component /PageHero";
import Reveal from "../component /Reveal";
import Footer from "../component /Footer";
import { sectors, budgetBands, sources } from "../lib/site";

type Status = "idle" | "loading" | "success" | "error";

function EnquiryForm() {
  const searchParams = useSearchParams();
  const initialPackage = searchParams.get("package") ?? "";
  
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) return;
    
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    
    // We append the package to the message if it was pre-selected
    if (initialPackage) {
      payload.message = `[Enquiry for: ${initialPackage}]\n\n${payload.message}`;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      formRef.current?.reset();
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Could not submit enquiry.");
    }
  };

  const inputClass = "w-full border-b border-alabaster/20 bg-transparent py-4 text-alabaster outline-none transition-colors focus:border-neonlime placeholder:text-alabaster/20 rounded-none text-base";
  const labelClass = "text-xs uppercase tracking-[0.15em] text-alabaster/50 mb-1 block";

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-alabaster/10 bg-alabaster/[0.02] p-12 md:p-16 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-neonlime/20 text-neonlime">
          <Check className="h-8 w-8" />
        </div>
        <h2 className="font-kamerick text-2xl md:text-3xl text-alabaster mb-4">Enquiry Received</h2>
        <p className="text-alabaster/70 text-lg leading-relaxed max-w-lg mx-auto">
          Thank you for reaching out. We will review your submission and aim to respond within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="grid gap-12">
      
      {/* 1. The Basics */}
      <div className="grid gap-8 border-t border-alabaster/10 pt-10 md:grid-cols-2">
        <div className="md:col-span-2">
           <h3 className="text-sm font-medium text-alabaster">1. About You</h3>
        </div>
        
        <div>
          <label htmlFor="name" className={labelClass}>Contact Name *</label>
          <input required type="text" id="name" name="name" className={inputClass} placeholder="Jane Doe" />
        </div>
        
        <div>
          <label htmlFor="email" className={labelClass}>Email Address *</label>
          <input required type="email" id="email" name="email" className={inputClass} placeholder="jane@example.com" />
        </div>
        
        <div>
          <label htmlFor="organisation" className={labelClass}>Organisation Name *</label>
          <input required type="text" id="organisation" name="organisation" className={inputClass} placeholder="Acme Cultural Trust" />
        </div>
        
        <div>
          <label htmlFor="website" className={labelClass}>Website URL</label>
          <input type="url" id="website" name="website" className={inputClass} placeholder="https://" />
        </div>
        
        <div>
          <label htmlFor="role" className={labelClass}>Your Role *</label>
          <input required type="text" id="role" name="role" className={inputClass} placeholder="Chief Executive" />
        </div>
        
        <div>
          <label htmlFor="decisionMaker" className="flex items-center gap-3 cursor-pointer mt-8">
            <input type="checkbox" id="decisionMaker" name="decisionMaker" value="Yes" className="h-5 w-5 rounded-sm border-alabaster/20 bg-transparent text-neonlime focus:ring-neonlime accent-neonlime" />
            <span className="text-sm text-alabaster/80">I am the primary decision maker for this project</span>
          </label>
        </div>
      </div>

      {/* 2. The Project */}
      <div className="grid gap-8 border-t border-alabaster/10 pt-10 md:grid-cols-2">
        <div className="md:col-span-2">
           <h3 className="text-sm font-medium text-alabaster">2. The Challenge</h3>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="message" className={labelClass}>The Problem or Opportunity *</label>
          <textarea required id="message" name="message" rows={4} className={`${inputClass} resize-none`} placeholder="What are you trying to achieve, and why now?" />
        </div>
        
        <div>
          <label htmlFor="sector" className={labelClass}>Sector *</label>
          <select required id="sector" name="sector" className={`${inputClass} appearance-none rounded-none`}>
            <option value="" disabled selected>Select a sector</option>
            {sectors.map(s => <option key={s} value={s} className="bg-void">{s}</option>)}
          </select>
        </div>
        
        <div>
          <label htmlFor="budget" className={labelClass}>Budget Band *</label>
          <select required id="budget" name="budget" className={`${inputClass} appearance-none rounded-none`}>
            <option value="" disabled selected>Select a budget band</option>
            {budgetBands.map(b => <option key={b} value={b} className="bg-void">{b}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="startDate" className={labelClass}>Target Start Date</label>
          <input type="text" id="startDate" name="startDate" className={inputClass} placeholder="e.g. Next month, Q3, ASAP" />
        </div>
        
        <div>
          <label htmlFor="source" className={labelClass}>How did you hear about us? *</label>
          <select required id="source" name="source" className={`${inputClass} appearance-none rounded-none`}>
            <option value="" disabled selected>Select an option</option>
            {sources.map(s => <option key={s} value={s} className="bg-void">{s}</option>)}
          </select>
        </div>
      </div>

      {/* 3. Consent & Submit */}
      <div className="flex flex-col gap-6 border-t border-alabaster/10 pt-10">
        {status === "error" && (
           <p className="text-sm text-red-400 p-4 border border-red-500/20 bg-red-500/10 rounded-xl">{errorMessage}</p>
        )}
        <label className="flex items-start gap-4 cursor-pointer">
          <input 
            type="checkbox" 
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-5 w-5 rounded-sm border-alabaster/20 bg-transparent text-neonlime focus:ring-neonlime accent-neonlime flex-none" 
          />
          <span className="text-sm text-alabaster/60 leading-relaxed">
            I consent to Artdot Agency collecting and storing the data submitted in this form to process my enquiry, in accordance with the Privacy Policy.
          </span>
        </label>
        
        <button
          type="submit"
          disabled={status === "loading" || !consent}
          className="group inline-flex items-center justify-center gap-3 rounded-full bg-neonlime px-8 py-4 text-base font-medium text-void transition-all hover:bg-alabaster disabled:opacity-50 disabled:cursor-not-allowed sm:w-fit mt-4"
        >
          {status === "loading" ? "Submitting..." : "Submit Enquiry"}
          {status !== "loading" && <ArrowRight aria-hidden className="h-5 w-5 transition-transform group-hover:translate-x-1" />}
        </button>
      </div>

    </form>
  );
}

export default function EnquirePage() {
  return (
    <>
      <main id="main" className="relative z-10">
        <PageHero
          eyebrow="Enquire"
          title="Tell us what you are trying to achieve."
          intro="Tell us about your funding, research, impact or growth challenge. We will review your enquiry, check whether our consultancy is the right fit and aim to reply within 24 hours."
        />
        
        <section className="pb-24 md:pb-40">
          <div className="mx-auto max-w-[800px] px-6 md:px-10">
            <Reveal>
              <Suspense fallback={<div className="h-96 w-full animate-pulse rounded-3xl bg-alabaster/5" />}>
                <EnquiryForm />
              </Suspense>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
