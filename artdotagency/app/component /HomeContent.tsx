"use client";

import { useState } from "react";
import Preloader from "./Preloader";
import Cursor from "./Cursor";
import Footer from "./Footer";
import Proposition from "./home/Proposition";
import VerifiedProof from "./home/VerifiedProof";
import ProblemsSolved from "./home/ProblemsSolved";
import Capabilities from "./home/Capabilities";
import HowWeWorkSection from "./home/HowWeWorkSection";
import Packages from "./home/Packages";
import SelectedWork from "./home/SelectedWork";
import InsightsPreview from "./home/InsightsPreview";
import EnquiryCTA from "./home/EnquiryCTA";

export default function HomeContent() {
  const [loading, setLoading] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return !sessionStorage.getItem("art_session_loaded");
  });

  const handleFinish = () => {
    setLoading(false);
    sessionStorage.setItem("art_session_loaded", "true");
  };

  return (
    <>
      {loading && <Preloader onFinish={handleFinish} />}
      <Cursor />
      <main id="main" className="relative z-10">
        {/* Proposition -> Proof -> Problems -> Capabilities -> Process -> Packages -> Work -> Insights -> Enquiry */}
        <Proposition startAnimation={!loading} />
        <VerifiedProof />
        <ProblemsSolved />
        <Capabilities />
        <HowWeWorkSection />
        <Packages />
        <SelectedWork />
        <InsightsPreview />
        <EnquiryCTA />
      </main>
      <Footer />
    </>
  );
}
