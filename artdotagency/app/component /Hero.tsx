"use client";

import { motion, Variants } from "framer-motion"; // 1. Import Variants type
import Link from "next/link";
import Silk from "./Silk";
import { ArrowRight } from "lucide-react";

// 2. Explicitly type the variants to prevent TS errors
const textReveal: Variants = {
  hidden: { y: "110%" },
  visible: { 
    y: "0%",
    transition: { 
      duration: 1.5, 
      ease: [0.76, 0, 0.24, 1], 
    }
  }
};

const fadeReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

// 3. Define proper links (Fixing the "#our" vs "#process" bug)
const navItems = [
  { id: '01', label: 'About Us', href: '#about' },
  { id: '02', label: 'Capabilities', href: '#capabilities' },
  { id: '03', label: 'Reach & Impact', href: '#impact' }, // Changed to #impact based on your previous component
  { id: '04', label: 'Our Process', href: '#process' }     // Fixed: Was pointing to #our
];

export default function Hero({ startAnimation }: { startAnimation: boolean }) {
  return (
    <section 
      className="sticky top-0 z-0 w-full h-[100dvh] bg-[#050505] overflow-hidden flex flex-col items-center justify-center text-white"
    >
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        {/* Ensure Silk handles props correctly. If strict, pass numbers in curly braces */}
        <Silk speed={2.0} scale={1.5} color="#453F35" noiseIntensity={0.2} rotation={15} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)] pointer-events-none" />
      </div>

      {/* LOGO */}
      <div className="absolute top-8 right-8 z-50">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={startAnimation ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }} 
          className="font-kamerick text-2xl font-bold tracking-tighter text-white"
        >
          art.
        </motion.h2>
      </div>

      {/* CENTER CONTENT */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center gap-8 -mt-24 md:mt-0">
        
        <h1 className="font-kamerick text-4xl md:text-7xl font-bold leading-[1.0] tracking-tight text-white max-w-4xl flex flex-col items-center">
          
          <div className="overflow-hidden">
            <motion.span 
              variants={textReveal} 
              initial="hidden" 
              animate={startAnimation ? "visible" : "hidden"}
              transition={{ delay: 0.1 }} 
              className="block"
            >
              A brand is only
            </motion.span>
          </div>
          
          <div className="overflow-hidden">
             <motion.span 
               variants={textReveal} 
               initial="hidden" 
               animate={startAnimation ? "visible" : "hidden"}
               transition={{ delay: 0.2 }} 
               className="block"
             >
               as strong as its <span className="text-[#FFB800]">strategy.</span>
             </motion.span>
          </div>
          
        </h1>

        <motion.div 
          variants={fadeReveal}
          initial="hidden"
          animate={startAnimation ? "visible" : "hidden"}
          transition={{ delay: 0.4 }} 
        >
          <Link 
            href="#pricing"
            className="group relative inline-flex items-center gap-3 px-8 py-3 bg-white text-black text-xs font-bold font-kamerick uppercase tracking-widest rounded-full overflow-hidden transition-all hover:bg-[#FFB800] hover:text-black"
          >
            <span className="relative z-10">Start a Project</span>
            <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* BOTTOM NAV */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="absolute bottom-12 left-0 w-full z-20"
      >
        <div className="container mx-auto px-6 md:px-8">
          <div className="w-full h-[1px] bg-white/10 mb-6" />
          <div className="flex flex-col md:flex-row justify-between items-end">
            <p className="hidden md:block text-[10px] text-gray-500 uppercase tracking-[0.2em] font-kamerick mb-2">
              ( Scroll to Explore )
            </p>
            <div className="w-full md:w-auto grid grid-cols-2 md:flex md:gap-12 gap-x-4 gap-y-4 text-xs font-bold tracking-widest uppercase text-gray-400">
              {navItems.map((item) => (
                <Link 
                  key={item.id} 
                  href={item.href} 
                  className="group flex items-center gap-3 hover:text-[#FFB800] transition-colors"
                >
                  <span className="text-[#FFB800] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden md:inline-block">•</span>
                  <span className="opacity-50 group-hover:opacity-100 transition-opacity font-mono">{item.id}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

    </section>
  );
}