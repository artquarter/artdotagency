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
  // State to coordinate the sequence
  const [loading, setLoading] = useState(true);

  return (
    <main className="bg-[#050505] min-h-screen">
      
      {/* 1. PRELOADER: Handles the loading state */}
      <Preloader onFinish={() => setLoading(false)} />
        
      
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