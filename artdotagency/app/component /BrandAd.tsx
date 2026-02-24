"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";

const allBusinesses = [
  { 
    name: "art.barber", 
    desc: "Ready for a sharp haircut? Step into the craft.", 
    url: "https://www.artdotbarbers.io/", 
    short: "Barbers" 
  },
  { 
    name: "art.salon", 
    desc: "Looking for a women's only luxury salon experience?", 
    url: "https://www.artdotsalon.com/", 
    short: "Salon" 
  },
  { 
    name: "aqbodyandspa", 
    desc: "Premium wellness and recovery for the body and mind.", 
    url: "https://aqbodyandspa.co.uk/", 
    short: "Spa" 
  },
  { 
    name: "aqfoodhall", 
    desc: "Taste the culture. High-end dining, curated for you.", 
    url: "https://aqfoodhall.artdotquarter.io/", 
    short: "Food" 
  },
  { 
    name: "Creator Economy", 
    desc: "The future of talent starts here. Join the network.", 
    url: "https://www.artdotquarter.io/creator-economy", 
    short: "Creators" 
  },
  { 
    name: "Pilot Program", 
    desc: "Accelerate your vision with our exclusive program.", 
    url: "https://www.artdotquarter.io/pilot-program", 
    short: "Pilot" 
  }
];

export default function BrandAd() {
  const [isVisible, setIsVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 5000);
    const cycle = setInterval(() => {
      setIndex((prev) => (prev + 1) % allBusinesses.length);
    }, 7000);

    return () => {
      clearTimeout(timer);
      clearInterval(cycle);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 md:bottom-8 right-0 md:right-8 z-[100] w-full md:w-[340px] p-4 md:p-0"
      >
        <div className="bg-[#0a0a0a] border border-white/10 rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden relative">
          
          {/* Progress Bar (Timer) */}
          <motion.div 
            key={`bar-${index}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 7, ease: "linear" }}
            className="absolute top-0 left-0 h-[2px] bg-[#FFB800] origin-left w-full z-20"
          />

          <div className="p-5 md:p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#FFB800] rounded-full animate-pulse" />
                <span className="text-[9px] text-[#FFB800] uppercase tracking-[0.3em] font-bold">
                  The Family
                </span>
              </div>
              <button onClick={() => setIsVisible(false)} className="text-white/30 hover:text-white">
                <X size={16} />
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="min-h-[80px]"
              >
                <h3 className="font-kamerick text-lg font-bold text-white mb-1 lowercase tracking-tight">
                  {allBusinesses[index].name}
                </h3>
                <p className="font-kamerick text-[11px] md:text-[12px] text-gray-400 leading-relaxed tracking-wide">
                  {allBusinesses[index].desc}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex items-center gap-3">
              <a 
                href={allBusinesses[index].url}
                target="_blank"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[#FFB800] transition-colors group"
              >
                Visit Site
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              
              {/* Mobile Page Indicator */}
              <div className="text-[10px] font-mono text-gray-600 px-2">
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}