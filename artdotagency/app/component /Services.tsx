"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useState } from "react";

const services = [
  {
    id: "01",
    title: "ADVISORY",
    items: [
      "Strategic guidance for projects and programmes."
    ],
  },
  {
    id: "02",
    title: "CREATIVE",
    items: [
      "Design, branding and content development."
    ],
  }
];

// ------------------------------------------------------------------
// SUB-COMPONENT: Cinema Text Reveal (The New Effect)
// ------------------------------------------------------------------
const CinemaText = ({ text, isHovered }: { text: string; isHovered: boolean }) => {
  return (
    <div className="relative overflow-hidden h-8 flex items-center">
      {/* 1. The Default White Text (Slides Up) */}
      <motion.span
        animate={{ y: isHovered ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }} // Cinematic Ease
        className="block"
      >
        {text}
      </motion.span>

      {/* 2. The Orange Text (Slides In from Bottom) */}
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: isHovered ? "0%" : "100%" }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 text-[#FFB800]"
      >
        {text}
      </motion.span>
    </div>
  );
};

// ------------------------------------------------------------------
// SUB-COMPONENT: Spotlight Card
// ------------------------------------------------------------------
function ServiceCard({ service, index }: { service: any; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-[#0F0F0F] border border-white/5 p-8 md:p-10 overflow-hidden"
    >
      
      {/* 1. SPOTLIGHT EFFECT */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 184, 0, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* 2. BACKGROUND NUMBER */}
      <span className="absolute -top-6 -right-6 font-kamerick text-[120px] font-bold text-white/5 group-hover:text-white/10 transition-colors duration-500 select-none pointer-events-none z-0">
        {service.id}
      </span>

      {/* 3. CONTENT */}
      <div className="relative z-10">
        
        {/* Title Block with Cinema Effect */}
        <div className="mb-8">
          <h3 className="font-kamerick text-2xl md:text-3xl font-bold text-white tracking-tight mb-2 h-10 flex items-center">
            <CinemaText text={service.title} isHovered={isHovered} />
          </h3>
          {/* Animated Line */}
          <div className="w-12 h-[2px] bg-[#FFB800] opacity-50 group-hover:w-full group-hover:opacity-100 transition-all duration-500 ease-out" />
        </div>

        {/* List Items */}
        <ul className="flex flex-col gap-3">
          {service.items.map((item: string, i: number) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + (i * 0.05) }}
              className="flex items-baseline gap-3"
            >
              <span className="w-1.5 h-1.5 bg-[#FFB800] mt-1.5 flex-shrink-0 group-hover:shadow-[0_0_8px_#FFB800] transition-shadow duration-300" />
              <span className="font-kamerick text-sm md:text-base font-medium text-gray-200 group-hover:text-white lowercase tracking-wide leading-relaxed transition-colors duration-300">
                {item}
              </span>
            </motion.li>
          ))}
        </ul>

      </div>
    </motion.div>
  );
}

// ------------------------------------------------------------------
// MAIN COMPONENT
// ------------------------------------------------------------------
export default function Services() {
  return (
    <section id="capabilities" className="relative w-full bg-[#050505] py-24 md:py-32">
      
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16 md:mb-24"
        >
          <div className="w-12 h-[1px] bg-[#FFB800]" />
          <span className="font-kamerick text-[#FFB800] text-[10px] md:text-xs tracking-[0.2em] lowercase">
            02 — Capabilities
          </span>
        </motion.div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}