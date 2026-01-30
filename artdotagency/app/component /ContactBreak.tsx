"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ContactBreak() {
  return (
    // COLOR: White background acts as a "Palate Cleanser" between dark sections
    <section className="relative w-full bg-[#F5F5F5] py-20 md:py-24 overflow-hidden flex flex-col items-center justify-center text-center text-black">
      
      {/* BACKGROUND TICKER */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none overflow-hidden flex items-center justify-center">
        {/* TEXT: Updated to artdotagency */}
        <div className="whitespace-nowrap font-kamerick text-[12vw] font-bold leading-none text-black rotate-[-5deg] scale-110 origin-center lowercase tracking-tighter">
          artdotagency artdotagency artdotagency
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* 1. THE HOOK - Sized Down */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          // SIZE: Reduced to text-3xl / 5xl (Was 7xl)
          className="font-kamerick text-3xl md:text-5xl font-bold text-black uppercase tracking-tighter mb-4 leading-[1.1]"
        >
          Seen Enough?
        </motion.h2>

        {/* 2. THE CHALLENGE */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-kamerick text-black/60 text-xs md:text-sm uppercase tracking-widest max-w-md mx-auto mb-8"
        >
          You’ve seen the numbers. You’ve seen the reach. <br/>
          Now stop watching and start dominating.
        </motion.p>

        {/* 3. THE ACTION */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        >
          <a 
            href="mailto:Enquiry@artdotagency.co.uk" 
            // STYLE: Black button on White bg = Maximum Contrast
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#FFB800] text-black font-kamerick text-xs md:text-sm font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Start a Project</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            
            {/* Hover Fill - Slides in Gold */}
            <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}