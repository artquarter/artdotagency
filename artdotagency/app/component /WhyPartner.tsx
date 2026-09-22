"use client";

import { motion, useMotionTemplate, useMotionValue, useInView } from "framer-motion";
import { Users, Eye, TrendingUp } from "lucide-react";
import { useRef } from "react";

// Data
const benefits = [
  {
    icon: Eye,
    title: "Review",
    desc: "A focused assessment with recommendations and a prioritised action plan."
  },
  {
    icon: Users,
    title: "Project",
    desc: "An agreed piece of work with defined deliverables, responsibilities, timetable and fee."
  },
  {
    icon: TrendingUp,
    title: "Retained",
    desc: "Ongoing support with agreed priorities, monthly capacity and review arrangements."
  }
];

// ------------------------------------------------------------------
// SUB-COMPONENT: Cinematic Card
// ------------------------------------------------------------------
const BenefitCard = ({ item, index }: { item: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  
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
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1, 
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onMouseMove={handleMouseMove}
      className="group relative bg-[#0F0F0F] border border-white/5 p-8 overflow-hidden"
    >
      
      {/* 1. SPOTLIGHT EFFECT */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-screen"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 184, 0, 0.1),
              transparent 80%
            )
          `,
        }}
      />

      {/* 2. FLASH EFFECT */}
      <div className="absolute inset-0 bg-white mix-blend-overlay opacity-0 group-hover:animate-flash pointer-events-none z-10" />

      {/* 3. CONTENT */}
      <div className="relative z-20">
        
        {/* Icon */}
        <div className="w-12 h-12 bg-white/5 border border-white/5 flex items-center justify-center mb-6 text-gray-400 group-hover:text-[#FFB800] group-hover:border-[#FFB800] group-hover:bg-[#FFB800]/10 transition-all duration-300">
          <item.icon className="w-5 h-5" />
        </div>
        
        {/* Title */}
        <h3 className="font-kamerick text-xl font-bold text-white lowercase tracking-tight mb-3 group-hover:translate-x-1 transition-transform duration-300">
          {item.title}
        </h3>
        
        {/* Desc */}
        <p className="font-kamerick text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
          {item.desc}
        </p>

      </div>
    </motion.div>
  );
};

export default function WhyPartner() {
  return (
    <section className="relative w-full bg-[#050505] py-24 md:py-32 border-t border-white/5 overflow-hidden">
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-kamerick text-4xl md:text-6xl font-bold text-white lowercase tracking-tight mb-4"
          >
            Ways of <span className="text-[#FFB800]">working</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-kamerick text-gray-400 text-sm max-w-lg mx-auto"
          >
            We agree the scope, team, outputs and fees before work begins.
          </motion.p>
        </div>

        {/* 3x1 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {benefits.map((item, index) => (
            <BenefitCard key={index} item={item} index={index} />
          ))}
        </div>

      </div>

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