"use client";

import { useState } from "react";

// Imports using your specific "./component" structure
import Hero from "./component /Hero";
import CreativeServices from "./component /CreativeServices";
import CaseStudies from "./component /CaseStudies";
import WhyPartner from "./component /WhyPartner";
import AboutMission from "./component /AboutMission";
import CulturePreview from "./component /CulturePreview";
import ContactBreak from "./component /ContactBreak";
import Footer from "./component /Footer";
import Preloader from "./component /Preloader";
import Cursor from "./component /Cursor";
import ScrollOrchestrator from "./component /ScrollOrchestrator";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return sessionStorage.getItem("art_session_loaded") ? false : true;
  });

  const handleFinish = () => {
    setLoading(false);
    sessionStorage.setItem("art_session_loaded", "true");
  };

  return (
    <main className="min-h-screen bg-transparent">
      
      {/* 1. PRELOADER */}
      {loading && <Preloader onFinish={handleFinish} />}
        
      {/* 2. HERO */}
      <Hero startAnimation={!loading} />

      {/* 3. CONTENT WRAPPER */}
      <div className="relative z-10 bg-transparent">
        <Cursor />
        <ScrollOrchestrator />
        
        {/* Sequence: Services -> Work -> Ways of Working -> Intro -> Insights -> Contact */}
        <CreativeServices />
        <CaseStudies />
        <WhyPartner />
        <AboutMission />
        <CulturePreview />
        <ContactBreak />
        
        <Footer />
      </div>
      
    </main>
  );
}