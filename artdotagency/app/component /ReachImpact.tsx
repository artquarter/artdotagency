"use client";

import { motion, useInView, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Data
const stats = [
  { prefix: "£", label: "UKSPF capital grant awarded", value: "29496", suffix: ".60" },
  { prefix: "", label: "recorded attendances", value: "3,771", suffix: "" },
  { prefix: "", label: "training completions", value: "14", suffix: "" }
];

// ------------------------------------------------------------------
// SUB-COMPONENT: Chaos Scramble (The "Mad" Part)
// ------------------------------------------------------------------
const ChaosScramble = ({ value, trigger }: { value: string; trigger: boolean }) => {
  const [display, setDisplay] = useState("00");

  useEffect(() => {
    if (!trigger) return;

    let iterations = 0;
    const maxIterations = 25; // Longer scramble for drama
    const speed = 30; // Faster ticks

    const interval = setInterval(() => {
      // Generate random number of similar length
      const randomVal = Math.floor(Math.random() * 999).toString();
      setDisplay(randomVal.substring(0, value.length)); // Keep length consistent
      
      iterations++;

      if (iterations >= maxIterations) {
        clearInterval(interval);
        setDisplay(value); // Snap to reality
      }
    }, speed);

    return () => clearInterval(interval);
  }, [trigger, value]);

  return <>{display}</>;
};

// ------------------------------------------------------------------
// SUB-COMPONENT: Cinematic Card
// ------------------------------------------------------------------
const StatCard = ({ item, index }: { item: any; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  
  // Hover Flare Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      // ENTRANCE: "Focus Pull" Effect (Blur -> Sharp + Scale Down)
      initial={{ filter: "blur(10px)", opacity: 0, scale: 1.1 }} 
      animate={isInView ? { filter: "blur(0px)", opacity: 1, scale: 1 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.05, 
        ease: [0.25, 0.46, 0.45, 0.94] // Cinematic "Quad" Ease
      }}
      className="relative flex flex-col items-center justify-center p-6 md:p-10 bg-[#0F0F0F] border border-white/5 overflow-hidden group"
    >
      
      {/* 1. HOVER FLARE (The Lens Flare) */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-screen"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 184, 0, 0.25),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* 2. FLASH ON LOAD (White flash when it appears) */}
      <motion.div 
         initial={{ opacity: 1 }}
         animate={isInView ? { opacity: 0 } : {}}
         transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
         className="absolute inset-0 bg-white pointer-events-none z-20 mix-blend-overlay"
      />

      {/* 3. CONTENT */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Number */}
        <h3 className="font-kamerick text-4xl md:text-6xl font-bold text-white mb-2 tracking-tighter flex items-center justify-center">
          {item.prefix && (
            <span className="text-[#FFB800] text-3xl md:text-5xl align-top mr-1">
              {item.prefix}
            </span>
          )}
          <span className="group-hover:text-[#FFB800] transition-colors duration-200 tabular-nums">
              <ChaosScramble value={item.value} trigger={isInView} />
          </span>
          {item.suffix && (
            <span className="text-[#FFB800] text-3xl md:text-5xl align-top ml-1">
              {item.suffix}
            </span>
          )}
        </h3>
        
        {/* Label */}
        <p className="font-kamerick text-gray-500 text-[10px] md:text-xs lowercase tracking-[0.2em] text-center group-hover:text-white transition-colors duration-300">
          {item.label}
        </p>
      </div>

    </motion.div>
  );
};

export default function ReachImpact() {
  return (
    <section id="impact" className="relative w-full bg-[#050505] py-24 md:py-32 border-t border-white/5 overflow-hidden">
      
      {/* Background: Grainy Texture for "Film" Look */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20, filter: "blur(5px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-16 md:mb-24"
        >
          <div className="w-12 h-[1px] bg-[#FFB800]" />
          <span className="font-kamerick text-[#FFB800] text-[10px] md:text-xs tracking-[0.2em] lowercase">
            03 — Reach & Impact
          </span>
        </motion.div>

        {/* 3x3 Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-[1px] bg-white/10 border border-white/5">
          {stats.map((stat, index) => (
            <StatCard key={index} item={stat} index={index} />
          ))}
        </div>

        {/* Footer Line */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.2em" }} // "Cinematic Squeeze" effect
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
          className="font-kamerick text-center text-gray-500 text-[10px] lowercase mt-16 max-w-2xl mx-auto"
        >
          Delivering real impressive results through data led strategies 
        </motion.p>

      </div>
    </section>
  );
}