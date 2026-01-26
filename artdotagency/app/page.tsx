"use client";

import { useState } from "react";

// Imports using your specific "./component" structure
import AboutMission from "./component /AboutMission";
import CaseStudies from "./component /CaseStudies";
import CreativeServices from "./component /CreativeServices";
import Hero from "./component /Hero";
import InfluencerReach from "./component /InfluencerReach";
import MarketingExperience from "./component /MarketingExperience";
import OurProcess from "./component /OurProcess";
import Pricing from "./component /Pricing";
import ReachImpact from "./component /ReachImpact";
import Services from "./component /Services";
import WhyPartner from "./component /WhyPartner";
import Footer from "./component /Footer";
import Preloader from "./component /Preloader";
import Cursor from "./component /Cursor";
import ContactBreak from "./component /ContactBreak";

export default function Home() {
  // State to coordinate the sequence, initialize from sessionStorage to avoid a synchronous setState inside an effect
  const [loading, setLoading] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return sessionStorage.getItem("art_session_loaded") ? false : true;
  });

  // ---------------------------------------------------------
  // 2. FINISH HANDLER
  // ---------------------------------------------------------
  const handleFinish = () => {
    setLoading(false);
    // Mark the session as "loaded" so it doesn't run again
    sessionStorage.setItem("art_session_loaded", "true");
  };

  return (
    <main className="bg-[#050505] min-h-screen">
      
      {/* 1. PRELOADER: Handles the loading state */}
     {loading && <Preloader onFinish={handleFinish} />}
        
      
      {/* 2. HERO: Stays fixed (Sticky) while content slides over it */}
      {/* Ensure your Hero component has className="sticky top-0 z-0 ..." */}
      <Hero startAnimation={!loading} />

      {/* 3. CONTENT WRAPPER: This slides OVER the Hero */}
      <div className="relative z-10 bg-[#050505]">
        <Cursor />
        <AboutMission />
        <Services />
        <ReachImpact />
        <MarketingExperience />
        <InfluencerReach />
        <ContactBreak />
        <CaseStudies />
        <OurProcess />
        <CreativeServices />
        <WhyPartner />
        <Pricing />
        <Footer />
      </div>
      
    </main>
  );
}