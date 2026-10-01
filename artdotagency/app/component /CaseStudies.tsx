"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { caseStudies } from "../lib/data"; 
import ImageShader from "./ImageShader";
import { motion } from "framer-motion";

// ------------------------------------------------------------------
// SUB-COMPONENT: Cinematic WebGL Card
// ------------------------------------------------------------------
const CinematicWebGLCard = ({ project, index }: { project: any; index: number }) => {
  return (
    <div className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden group border border-white/5 bg-void/40 backdrop-blur-md">
      <Link href={`/work/${project.slug}`} className="absolute inset-0 z-20 block" />
      
      {/* WEBGL SHADER BACKGROUND */}
      <div className="absolute inset-0 z-0 grayscale group-hover:grayscale-0 transition-all duration-700">
        <ImageShader imageUrl={project.image} alt={project.client} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

      <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col md:flex-row md:items-end justify-between gap-6 z-20 pointer-events-none">
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-neonlime text-sm md:text-base border border-neonlime/30 px-3 py-1 rounded-full">
              {(index + 1).toString().padStart(2, '0')}
            </span>
            <p className="font-kamerick text-neonlime text-xs md:text-sm tracking-[0.2em] lowercase">
              {project.category}
            </p>
          </div>
          <h3 className="font-kamerick text-4xl md:text-7xl font-bold text-alabaster lowercase tracking-tighter leading-none group-hover:translate-x-4 transition-transform duration-700 ease-out">
            {project.client}
          </h3>
        </div>

        <div className="hidden md:flex p-6 rounded-full border border-white/10 bg-void/50 backdrop-blur-sm group-hover:bg-neonlime group-hover:border-neonlime group-hover:text-void transition-all duration-500 group-hover:rotate-45 group-hover:scale-110">
          <ArrowUpRight className="w-8 h-8" />
        </div>

      </div>
    </div>
  );
};

export default function CaseStudies() {
  return (
    <section 
      id="case-studies-section" 
      className="relative w-full bg-transparent flex flex-col overflow-hidden border-t border-white/5 pt-32 pb-32"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-32 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/10 pb-12"
        >
          <h2 className="font-kamerick text-5xl md:text-8xl font-bold text-alabaster lowercase tracking-tighter leading-[0.9]">
            our <span className="text-neonlime italic font-light">work</span>
          </h2>
          <p className="font-kamerick text-gray-400 text-sm md:text-lg tracking-widest max-w-md lowercase">
            projects spanning cultural strategy, community engagement, and public realm curation.
          </p>
        </motion.div>

        {/* VERTICAL GRID */}
        <div className="flex flex-col gap-12 md:gap-32">
          {caseStudies.map((project, index) => {
            // Alternating alignment for a more editorial feel on desktop
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={project.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className={`w-full md:w-[85%] ${isEven ? 'mr-auto' : 'ml-auto'}`}
              >
                <CinematicWebGLCard project={project} index={index} />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}