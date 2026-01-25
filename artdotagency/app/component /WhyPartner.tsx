"use client";

import { motion, useMotionTemplate, useMotionValue, useInView } from "framer-motion";
import { Users, Eye, Zap, Radio, Video, TrendingUp } from "lucide-react";
import { useRef } from "react";

// Data
const benefits = [
  {
    icon: Users,
    title: "Hard-to-Reach Audience",
    desc: "Access to a hard-to-reach youth / Gen Z / BAME audience."
  },
  {
    icon: Eye,
    title: "Guaranteed Visibility",
    desc: "Guaranteed on-site footfall and high-impact visibility."
  },
  {
    icon: Zap,
    title: "Co-Created Activations",
    desc: "Co-created brand activations across streetwear, salon, music, and food."
  },
  {
    icon: Radio,
    title: "Media Attention",
    desc: "Hyper-local + national media attention for your brand."
  },
  {
    icon: Video,
    title: "Influencer Coverage",
    desc: "Real-time influencer-led coverage during events."
  },
  {
    icon: TrendingUp,
    title: "Viral Social Moments",
    desc: "Viral social moments crafted specifically for Instagram & TikTok."
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
        ease: [0.25, 0.46, 0.45, 0.94] // Fast "Punchy" Ease
      }}
      onMouseMove={handleMouseMove}
      className="group relative bg-[#0F0F0F] border border-white/5 p-8 overflow-hidden"
    >
      
      {/* 1. SPOTLIGHT EFFECT (Follows Mouse) */}
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

      {/* 2. FLASH EFFECT (White flash on hover) */}
      <div className="absolute inset-0 bg-white mix-blend-overlay opacity-0 group-hover:animate-flash pointer-events-none z-10" />

      {/* 3. CONTENT */}
      <div className="relative z-20">
        
        {/* Icon: Glows on hover */}
        <div className="w-12 h-12 bg-white/5 border border-white/5 flex items-center justify-center mb-6 text-gray-400 group-hover:text-[#FFB800] group-hover:border-[#FFB800] group-hover:bg-[#FFB800]/10 transition-all duration-300">
          <item.icon className="w-5 h-5" />
        </div>
        
        {/* Title: Slides right slightly */}
        <h3 className="font-kamerick text-xl font-bold text-white uppercase tracking-tight mb-3 group-hover:translate-x-1 transition-transform duration-300">
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
        <div className="text-center mb-20 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
             <span className="font-kamerick text-[#FFB800] text-[10px] tracking-[0.2em] uppercase">
                07 — Value Proposition
             </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-kamerick text-4xl md:text-6xl font-bold text-white uppercase tracking-tight mb-4"
          >
            Why Partner <span className="text-[#FFB800]">With Us?</span>
          </motion.h2>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {benefits.map((item, index) => (
            <BenefitCard key={index} item={item} index={index} />
          ))}
        </div>

      </div>

      {/* Global CSS for Flash Animation */}
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