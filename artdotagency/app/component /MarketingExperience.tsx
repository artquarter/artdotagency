"use client";

import { motion } from "framer-motion";

export default function MarketingExperience() {
  return (
    <section id="about-us" className="relative w-full bg-[#050505] py-24 md:py-32 overflow-hidden border-t border-white/5">
      
      <div className="container mx-auto px-6 md:px-12">
        <div className="relative bg-[#0F0F0F] border border-white/5 overflow-hidden group">
          
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFB800]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="flex flex-col md:flex-row">
            
            {/* Title */}
            <div className="p-8 md:p-12 md:w-1/3 border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-center gap-2">
              <span className="font-kamerick text-[#FFB800] text-[10px] tracking-[0.2em] lowercase">
                Leadership
              </span>
              <h3 className="font-kamerick text-3xl font-bold text-white lowercase leading-none">
                Jordan <br/> Patel
              </h3>
            </div>

            {/* Statement */}
            <div className="p-8 md:p-12 md:w-2/3 flex items-center">
              <p className="font-kamerick text-sm md:text-lg text-gray-300 font-medium lowercase leading-[1.6] tracking-wide">
                Jordan's work brings together brand development, food and personal service environments, creative skills programmes and community activity. He has led the development of relationships across local government, education, business and the voluntary sector.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}