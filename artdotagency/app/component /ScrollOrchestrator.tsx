"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollOrchestrator() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Get the global background container
    const bgContainer = document.getElementById("global-bg-container");
    const body = document.body;

    // Phase 1: State A -> State B (When Case Studies enter)
    const trigger1 = ScrollTrigger.create({
      trigger: "#case-studies-section",
      start: "top 30%",
      end: "bottom bottom",
      onEnter: () => {
        if (bgContainer) bgContainer.style.backgroundColor = "#6E00FF"; // Ultraviolet
        body.style.backgroundColor = "#6E00FF";
      },
      onLeaveBack: () => {
        if (bgContainer) bgContainer.style.backgroundColor = "#010101"; // Void
        body.style.backgroundColor = "#010101";
      },
    });

    // Phase 2: State B -> State A (When Community Model / Insights enter)
    const trigger2 = ScrollTrigger.create({
      trigger: "#insights-section",
      start: "top 50%",
      onEnter: () => {
        if (bgContainer) bgContainer.style.backgroundColor = "#010101"; // Void
        body.style.backgroundColor = "#010101";
      },
      onLeaveBack: () => {
        if (bgContainer) bgContainer.style.backgroundColor = "#6E00FF"; // Ultraviolet
        body.style.backgroundColor = "#6E00FF";
      },
    });

    return () => {
      trigger1.kill();
      trigger2.kill();
    };
  }, []);

  return null;
}
