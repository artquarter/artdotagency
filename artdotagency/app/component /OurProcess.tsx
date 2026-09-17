"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useState } from "react";

const steps = [
  {
    id: "01",
    title: "Discovery",
    description: "We start by understanding your organisation, the challenges you face and the opportunities available. This involves research, stakeholder engagement and baseline assessment."
  },
  {
    id: "02",
    title: "Development",
    description: "Working collaboratively, we build the strategy, design the programme or create the brand. We focus on practical, deliverable solutions that connect with your audience."
  },
  {
    id: "03",
    title: "Review",
    description: "We test our thinking, gather feedback and refine the approach. This ensures the proposed solutions are robust, viable and aligned with your objectives."
  },
  {
    id: "04",
    title: "Handover",
    description: "We support the transition to live delivery. Whether we are mobilising the project for you or handing over to your team, we ensure everything is in place for success."
  }
];

// ------------------------------------------------------------------
// SUB-COMPONENT: Cinema Text Reveal
// ------------------------------------------------------------------
const CinemaText = ({ text, isHovered }: { text: string; isHovered: boolean }) => {
  return (
    <div className="relative overflow-hidden block">
      {/* 1. Default Text (Slides Up) */}
      <motion.span
        animate={{ y: isHovered ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        className="block"
      >
        {text}
      </motion.span>

      {/* 2. Orange Text (Slides In from Bottom) */}
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: isHovered ? "0%" : "100%" }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 text-[#FFB800]"
      >
        {text}
      </motion.span>
    </div>
  );
};

// ------------------------------------------------------------------
// SUB-COMPONENT: Interactive Process Card
// ------------------------------------------------------------------
const ProcessCard = ({ step, index }: { step: any; index: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-[#0F0F0F] border border-white/5 p-8 md:p-10 flex flex-col gap-6 overflow-hidden"
    >
      
      {/* 1. SPOTLIGHT EFFECT (Searchlight) */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-screen"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 184, 0, 0.1),
              transparent 80%
            )
          `,
        }}
      />

      {/* 2. BORDER GLOW (Follows Mouse borders) */}
      <div className="absolute inset-0 border border-[#FFB800]/0 group-hover:border-[#FFB800]/30 transition-colors duration-500 pointer-events-none" />

      {/* 3. NUMBER & LINE */}
      <div className="flex items-center gap-4 relative z-10">
        <span className="font-kamerick text-4xl font-bold text-[#FFB800] tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity">
          {step.id}
        </span>
        <div className="h-[1px] flex-grow bg-white/10 overflow-hidden relative">
             <motion.div 
                className="absolute inset-0 bg-[#FFB800]"
                initial={{ x: "-100%" }}
                animate={{ x: isHovered ? "0%" : "-100%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
             />
        </div>
      </div>

      {/* 4. TITLE (Cinema Effect) */}
      <h3 className="font-kamerick text-xl font-bold text-white lowercase tracking-tight leading-snug min-h-[3rem] relative z-10">
        <CinemaText text={step.title} isHovered={isHovered} />
      </h3>

      {/* 5. DESCRIPTION */}
      <p className="font-kamerick text-gray-400 text-sm leading-relaxed relative z-10 transition-colors duration-300 group-hover:text-gray-300">
        {step.description}
      </p>

    </motion.div>
  );
};

export default function OurProcess() {
  return (
    <section id="process" className="relative w-full bg-[#050505] py-24 md:py-32 border-t border-white/5 overflow-hidden">
      
      {/* Background Noise for Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-[#FFB800]" />
              <span className="font-kamerick text-[#FFB800] text-[10px] md:text-xs tracking-[0.2em] lowercase">
                05 — Methodology
              </span>
            </div>
            <h2 className="font-kamerick text-3xl md:text-5xl font-bold text-white lowercase tracking-tight">
              Our <span className="text-[#FFB800]">Process</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-kamerick text-gray-500 text-xs md:text-sm lowercase tracking-widest max-w-xs text-right hidden md:block"
          >
            A strategic framework for scalable growth.
          </motion.p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <ProcessCard key={step.id} step={step} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}