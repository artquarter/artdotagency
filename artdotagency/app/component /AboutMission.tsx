"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion"; // Added Variants type
import { useRef } from "react";

// Helper Component for the "Masked Word Reveal" animation
const MaskedReveal = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
  const words = text.split(" ");

  // Explicitly type as Variants to fix the build error
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.01, delayChildren: delay * 0.1 }, 
    }),
  };

  // Explicitly type as Variants to fix the build error
  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 5, 
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={`flex flex-wrap ${className}`}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "0.25em" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function AboutMission() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const paragraphStyle = "font-kamerick text-sm md:text-lg font-medium uppercase leading-[1.8] tracking-widest text-gray-200";

  return (
    <section 
      id="about" 
      ref={containerRef} 
      className="relative w-full bg-[#050505] text-white py-24 md:py-32 overflow-hidden"
    >
      
      {/* Decorative Background Glow */}
      <motion.div 
        style={{ y }}
        className="absolute top-20 right-0 w-[400px] h-[400px] bg-[#FFB800] rounded-full mix-blend-screen filter blur-[100px] opacity-[0.03] pointer-events-none" 
      />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col gap-24 md:gap-32">

        {/* 4.2 ABOUT US SECTION */}
        <div className="flex flex-col gap-6 max-w-4xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-[1px] bg-[#FFB800]" />
            <span className="font-kamerick text-[#FFB800] text-[10px] md:text-xs tracking-[0.2em] uppercase">
              01 — Who We Are
            </span>
          </motion.div>

          {/* Main Statement */}
          <MaskedReveal 
            text="We are a team of Midlands based marketers & entrepreneurs with a combined experience of over 50 years elevating brands from a concept to a prolific name delivering real impressive results."
            className={paragraphStyle}
          />

          {/* Supporting Line */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="font-kamerick text-gray-500 text-[10px] md:text-xs tracking-[0.2em] uppercase mt-2"
          >
            Part of our <span className="text-white">art.quarter</span> ecosystem
          </motion.p>
        </div>

        {/* 4.3 MISSION SECTION */}
        <div className="flex flex-col gap-6 max-w-4xl self-end text-right">
           {/* Label (Aligned Right) */}
           <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 justify-end"
          >
            <span className="font-kamerick text-gray-500 text-[10px] md:text-xs tracking-[0.2em] uppercase">
              02 — Our Mission
            </span>
            <div className="w-12 h-[1px] bg-gray-700" />
          </motion.div>

          {/* Mission Text */}
          <div className="flex justify-end">
            <MaskedReveal 
              text="We craft strategic, creative solutions that combine smart ideas with stunning, functional design. By obsessing over the details, we inspire action and deliver measurable results, empowering brands to thrive in a dynamic, ever-evolving marketplace."
              className={`${paragraphStyle} justify-end text-right`} 
              delay={2} 
            />
          </div>
        </div>

      </div>
    </section>
  );
}