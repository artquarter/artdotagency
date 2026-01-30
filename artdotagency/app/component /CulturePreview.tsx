"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play, Heart } from "lucide-react";

export default function CulturePreview() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#050505] overflow-hidden">
      
      {/* REMOVED: The yellow background glow div is gone. 
         The section is now pure black for a sleeker look.
      */}

      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-16 md:gap-12">
        
        {/* LEFT: TEXT CONTENT (Slide In Animation) */}
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:w-1/2 relative z-10"
        >
            <div className="mb-8 flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="font-kamerick text-xs font-bold text-red-500 uppercase tracking-[0.2em]">
                    Live Feed
                </span>
            </div>
            
            <h2 className="font-kamerick text-5xl md:text-8xl font-bold text-white uppercase tracking-tighter leading-[0.9] mb-8">
                Unfiltered <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">Culture.</span>
            </h2>
            
            <p className="font-kamerick text-gray-400 text-sm md:text-lg max-w-md mb-10 leading-relaxed">
                No scripts. No storyboards. Just raw moments from the artists and events shaping the timeline right now.
            </p>

            <Link href="/culture">
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex items-center gap-5 px-8 py-5 bg-[#FFB800] rounded-full transition-all shadow-[0_0_20px_rgba(255,184,0,0.3)] hover:shadow-[0_0_40px_rgba(255,184,0,0.5)]"
                >
                    <span className="font-kamerick text-black font-bold uppercase tracking-widest text-sm">
                        Watch The Feed
                    </span>
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
                        <Play className="w-3 h-3 text-white fill-white ml-0.5" />
                    </div>
                </motion.button>
            </Link>
        </motion.div>

        {/* RIGHT: PHONE PREVIEW (Float & Rotate Animation) */}
        <motion.div 
            initial={{ opacity: 0, y: 100, rotate: 10 }}
            whileInView={{ opacity: 1, y: 0, rotate: 3 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.2 }}
            className="md:w-1/2 flex justify-center relative"
        >
            <motion.div 
                animate={{ y: [0, -15, 0] }} // Floating idle animation
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                whileHover={{ scale: 1.02, rotate: 0 }}
                className="relative w-[300px] h-[600px] bg-black border-[8px] border-[#1a1a1a] rounded-[3.5rem] overflow-hidden shadow-2xl cursor-pointer"
            >
                {/* Simulated Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-[#1a1a1a] rounded-b-2xl z-20" />
                
                {/* Video Loop */}
                <video 
                    src="https://pub-19ba6d8519c546cd9f2831cf6463db3d.r2.dev/mhuncho.mp4" 
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                />

                {/* Fake UI Overlay */}
                <div className="absolute bottom-8 right-6 flex flex-col gap-6 z-10">
                     {/* HEART ICON: Changed to RED and FILLED to look "liked" */}
                     <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10">
                        <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                     </div>
                     
                </div>
                
               
            </motion.div>
        </motion.div>

      </div>
    </section>
  );
}