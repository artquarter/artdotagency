"use client";

import { motion } from "framer-motion";

// Clients (Original List)
const originalClients = [
  "AXEL ARIGATO",
  "SIEMATIC",
  "CARSICKO",
  "SOUTHWESTSIX",
  "YOYOSO",
];

// TRIPLE the list to ensure there's enough content to scroll smoothly on huge monitors
// The key is to have enough "buffer" content so the reset (0% -> -50%) is invisible
const marqueeClients = [...originalClients, ...originalClients, ...originalClients, ...originalClients];

export default function MarketingExperience() {
  return (
    <section className="relative w-full bg-[#050505] py-24 md:py-32 overflow-hidden border-t border-white/5">
      
      {/* ------------------------------------------------------- */}
      {/* 4.6 PART 1: MARKETING EXPERIENCE (Logo Wall)            */}
      {/* ------------------------------------------------------- */}
      <div className="container mx-auto px-6 md:px-12 mb-32">
        
        {/* Title Block */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-kamerick text-2xl md:text-4xl font-bold text-white uppercase tracking-tight"
          >
            Our Marketing Experience
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-kamerick text-gray-400 text-xs md:text-sm max-w-xl uppercase tracking-widest leading-relaxed"
          >
            We have extensive experience growing brands driving real results through data led strategies.
          </motion.p>
        </div>

        {/* LOGO WALL (Infinite Marquee - FIXED) */}
        <div className="relative w-full overflow-hidden mask-linear-fade group">
          
          {/* Container width must be huge to fit all items.
            We use two sets of items animated side-by-side for the "infinite" illusion.
            Actually, the simplest modern way is to have ONE huge flex container translating.
          */}
          <div className="flex w-max items-center gap-16 md:gap-32 animate-marquee hover:pause">
            
            {/* Render the TRIPLED list */}
            {marqueeClients.map((client, i) => (
              <span 
                key={i} 
                className="font-kamerick text-xl md:text-3xl font-bold text-gray-300 hover:text-[#FFB800] whitespace-nowrap transition-colors duration-300 cursor-default select-none"
              >
                {client}
              </span>
            ))}
            
            {/* DUPLICATE THE ENTIRE TRIPLED LIST AGAIN just to be safe for the loop seam.
              (Total: 4x original list repeated twice = 8x coverage)
             */}
            {marqueeClients.map((client, i) => (
              <span 
                key={`dup-${i}`} 
                className="font-kamerick text-xl md:text-3xl font-bold text-gray-300 hover:text-[#FFB800] whitespace-nowrap transition-colors duration-300 cursor-default select-none"
              >
                {client}
              </span>
            ))}

          </div>
        </div>

      </div>

      {/* ------------------------------------------------------- */}
      {/* 4.6 PART 2: BRAND ACTIVATION                            */}
      {/* ------------------------------------------------------- */}
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="relative bg-[#0F0F0F] border border-white/5 overflow-hidden group">
          
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFB800]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="flex flex-col md:flex-row">
            
            {/* Title */}
            <div className="p-8 md:p-12 md:w-1/3 border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-center gap-2">
              <span className="font-kamerick text-[#FFB800] text-[10px] tracking-[0.2em] uppercase">
                Live Experiences
              </span>
              <h3 className="font-kamerick text-3xl font-bold text-white uppercase leading-none">
                Brand <br/> Activation
              </h3>
            </div>

            {/* Statement */}
            <div className="p-8 md:p-12 md:w-1/3 flex items-center">
              <p className="font-kamerick text-sm md:text-lg text-gray-300 font-medium uppercase leading-[1.6] tracking-wide">
                We have hosted cultural events promoting vibrancy with some of the worlds biggest artists.
              </p>
            </div>

            {/* Stats */}
            <div className="md:w-1/3 bg-[#0A0A0A] p-8 md:p-12 flex flex-col justify-center gap-8 border-t md:border-t-0 md:border-l border-white/5">
              
              <div>
                <span className="block font-kamerick text-4xl md:text-5xl font-bold text-[#FFB800] mb-1">
                  15+
                </span>
                <span className="block font-kamerick text-gray-500 text-[10px] uppercase tracking-widest">
                  Cultural Events Hosted
                </span>
              </div>

              <div>
                <span className="block font-kamerick text-4xl md:text-5xl font-bold text-[#FFB800] mb-1">
                  10k+
                </span>
                <span className="block font-kamerick text-gray-500 text-[10px] uppercase tracking-widest">
                  Total Attendees
                </span>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Global CSS for Smooth Loop */}
      <style jsx global>{`
        .mask-linear-fade {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } 
        }
        
        .animate-marquee {
          /* Adjust speed here: 60s for slow elegance */
          animation: marquee 60s linear infinite;
        }

        /* Optional: Pause on hover for readability */
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}