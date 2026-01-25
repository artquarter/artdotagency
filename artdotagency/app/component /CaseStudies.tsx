"use client";

import { motion, useMotionTemplate, useMotionValue, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { caseStudies } from "../lib/data"; 
import Image from "next/image";
import { useRef } from "react";

// ------------------------------------------------------------------
// SUB-COMPONENT: Cinematic Card (No Blur)
// ------------------------------------------------------------------
const CinematicCard = ({ project, index }: { project: any; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // Mouse Tracking for Lens Flare
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
      // ENTRANCE: Clean Slide & Scale (No Blur)
      // Starts slightly zoomed in and transparent, then snaps to place
      initial={{ opacity: 0, scale: 1.05, y: 50 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1, 
        ease: [0.25, 0.46, 0.45, 0.94] // Cinematic curve
      }}
      className="w-full"
    >
      <Link
        href={`/work/${project.slug}`}
        className="group relative block h-[350px] md:h-[500px] w-full bg-[#0F0F0F] overflow-hidden border border-white/5"
        onMouseMove={handleMouseMove}
      >
        {/* 1. IMAGE LAYER (Ken Burns Zoom on Hover) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
           <motion.div 
             className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
           >
              <Image 
                src={project.image} 
                alt={project.client} 
                fill 
                className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" 
              />
           </motion.div>
        </div>

        {/* 2. LENS FLARE (Follows Mouse - Sharp Glow) */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-screen z-10"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                rgba(255, 255, 255, 0.15),
                transparent 80%
              )
            `,
          }}
        />

        {/* 3. CINEMATIC VIGNETTE (Dark edges) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 pointer-events-none" />

        {/* 4. CONTENT WRAPPER */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex flex-col gap-2 z-20">
          
          {/* Top Row: Number & Arrow */}
          <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-2 overflow-hidden">
            <span className="font-mono text-[#FFB800] text-xs translate-y-0 transition-transform duration-300 group-hover:-translate-y-1">
              {(index + 1).toString().padStart(2, '0')}
            </span>
            
            {/* Arrow: Rotation Effect */}
            <div className="p-3 rounded-full border border-white/10 group-hover:bg-[#FFB800] group-hover:border-[#FFB800] group-hover:text-black transition-all duration-300 group-hover:rotate-45">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Client Name */}
          <h3 className="font-kamerick text-3xl md:text-5xl font-bold text-white uppercase tracking-tight leading-none group-hover:translate-x-2 transition-transform duration-500 ease-out">
            {project.client}
          </h3>

          {/* Category */}
          <div className="overflow-hidden">
            <p className="font-kamerick text-gray-400 text-xs md:text-sm uppercase tracking-widest transform translate-y-0 group-hover:text-[#FFB800] transition-colors duration-300">
              {project.category}
            </p>
          </div>

        </div>

        {/* 5. FLASH OVERLAY (White flash on hover entry - Crisp) */}
        <div className="absolute inset-0 bg-white mix-blend-overlay opacity-0 group-hover:animate-flash pointer-events-none z-30" />

      </Link>
    </motion.div>
  );
};

export default function CaseStudies() {
  return (
    <section id="work" className="relative w-full bg-[#050505] py-16 md:py-24 border-t border-white/5 overflow-hidden">
      
      {/* Background Noise Texture for Film Grain Look (Sharp) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            // REPLACED BLUR with clean Opacity/Y fade
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-[#FFB800]" />
              <span className="font-kamerick text-[#FFB800] text-[10px] md:text-xs tracking-[0.2em] uppercase">
                04 — Selected Work
              </span>
            </div>
            <h2 className="font-kamerick text-3xl md:text-5xl font-bold text-white uppercase tracking-tight">
              Featured <span className="text-[#FFB800]">Case Studies</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="font-kamerick text-gray-500 text-xs md:text-sm uppercase tracking-widest max-w-xs text-right hidden md:block"
          >
            Real results delivered through data-led strategies.
          </motion.p>
        </div>

        {/* 2x2 GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((project, index) => (
            <CinematicCard key={project.slug} project={project} index={index} />
          ))}
        </div>

      </div>

      {/* Global Style for the Flash Animation */}
      <style jsx global>{`
        @keyframes flash {
          0% { opacity: 0; }
          50% { opacity: 0.1; }
          100% { opacity: 0; }
        }
        .animate-flash {
          animation: flash 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}