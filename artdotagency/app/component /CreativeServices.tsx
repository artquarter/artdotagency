"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Data
const services = [
  "Immersive Set Design",
  "Creative Campaigns",
  "Street Culture Consulting",
  "Brand Community Interfacing",
  "Event Production",
  "Influencer Partnerships",
  "Youth Co-creation Panels"
];

// ------------------------------------------------------------------
// SUB-COMPONENT: Clean Editorial List Item
// ------------------------------------------------------------------
const ServiceItem = ({ service, index }: { service: string; index: number }) => {
  // TYPE FIX: Explicitly tell TypeScript this ref belongs to a <div>
  const ref = useRef<HTMLDivElement>(null); 
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      className="group relative flex items-center justify-between py-6 md:py-9 border-b border-white/10 overflow-hidden cursor-pointer"
    >
      
      {/* 1. FLASHBULB EFFECT (White flash on hover) */}
      <div className="absolute inset-0 bg-white mix-blend-overlay opacity-0 group-hover:animate-flash pointer-events-none z-10" />
      
      {/* 2. HOVER BACKGROUND (Subtle shift) */}
      <div className="absolute inset-0 bg-[#FFB800]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform origin-left scale-x-0 group-hover:scale-x-100 ease-out" />

      {/* 3. TEXT REVEAL (Shutter Effect) */}
      <div className="relative z-20 overflow-hidden w-full">
        <motion.h3 
          initial={{ y: "100%" }}
          animate={isInView ? { y: "0%" } : {}}
          transition={{ duration: 0.5, delay: index * 0.05, ease: [0.76, 0, 0.24, 1] }}
          className="font-kamerick text-xl md:text-4xl font-bold text-white group-hover:text-white group-hover:pl-6 transition-all duration-300 uppercase tracking-tight"
        >
          {service}
        </motion.h3>
      </div>

    </motion.div>
  );
};

export default function CreativeServices() {
  return (
    <section className="relative w-full bg-[#050505] py-24 md:py-32 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          
          {/* Left: Title & Context */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/3 lg:sticky lg:top-32 self-start"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[#FFB800]" />
              <span className="font-kamerick text-[#FFB800] text-[10px] tracking-[0.2em] uppercase">
                06 — Services
              </span>
            </div>
            
            <h2 className="font-kamerick text-4xl md:text-6xl font-bold text-white uppercase tracking-tight mb-8 leading-[0.9]">
              Creative <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB800] to-yellow-600">Services</span>
            </h2>
            
            <p className="font-kamerick text-gray-400 text-sm leading-relaxed uppercase tracking-widest max-w-sm border-l border-white/10 pl-6">
              Bespoke solutions bridging the gap between brands and culture.
            </p>
          </motion.div>

          {/* Right: The List (Clean) */}
          <div className="lg:w-2/3 flex flex-col">
            {services.map((service, index) => (
              <ServiceItem key={index} service={service} index={index} />
            ))}
          </div>

        </div>
      </div>

      {/* Global CSS for Flash Animation */}
      <style jsx global>{`
        @keyframes flash {
          0% { opacity: 0; }
          50% { opacity: 0.1; }
          100% { opacity: 0; }
        }
        .animate-flash {
          animation: flash 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
}