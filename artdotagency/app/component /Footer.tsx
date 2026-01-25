"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Instagram, Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

// ------------------------------------------------------------------
// SUB-COMPONENT: Magnetic Button (Socials)
// ------------------------------------------------------------------
const MagneticButton = ({ children, href }: { children: React.ReactNode; href: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    // FIX: Safety check to ensure ref exists before accessing properties
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.5, y: middleY * 0.5 }); // Magnetic strength
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      style={{ position: "relative" }}
      animate={{ x: position.x, y: position.y }}
      // FIX: Added 'as const' to "spring" to satisfy TypeScript strict mode
      transition={{ type: "spring" as const, stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <Link
        href={href}
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#FFB800] hover:text-black hover:border-[#FFB800] transition-colors duration-300 group overflow-hidden relative"
      >
        <div className="relative z-10">{children}</div>
        {/* Hover Fill Effect */}
        <div className="absolute inset-0 bg-[#FFB800] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      </Link>
    </motion.div>
  );
};

// ------------------------------------------------------------------
// SUB-COMPONENT: Split Text Reveal
// ------------------------------------------------------------------
const SplitText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  return (
    <h1 className="flex overflow-hidden font-kamerick text-6xl md:text-8xl lg:text-[10rem] font-bold text-white uppercase tracking-tighter leading-[0.85] select-none mix-blend-difference">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            ease: [0.76, 0, 0.24, 1],
            delay: delay + i * 0.05,
          }}
          className="block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h1>
  );
};

// ------------------------------------------------------------------
// MAIN COMPONENT
// ------------------------------------------------------------------
export default function Footer() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <footer 
      className="relative w-full bg-[#050505] pt-32 pb-10 overflow-hidden border-t border-white/5 group"
      onMouseMove={handleMouseMove}
    >
      
      {/* 1. CINEMATIC BACKGROUND GLOW */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-1000 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              1200px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 184, 0, 0.03),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="container mx-auto px-6 md:px-12 flex flex-col justify-between min-h-[60vh]">
        
        {/* 2. TOP SECTION: BIG TYPOGRAPHY */}
        <div className="flex flex-col mb-20">
          
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[1px] bg-[#FFB800]" />
            <span className="font-kamerick text-[#FFB800] text-[10px] md:text-xs tracking-[0.2em] uppercase">
              To Partner With Us
            </span>
          </motion.div>
          
          {/* Split Text Animation */}
          <div>
            <SplitText text="Thank" />
            <SplitText text="You" delay={0.2} />
          </div>

        </div>

        {/* 3. BOTTOM SECTION: LINKS & CONTACT */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-end border-t border-white/10 pt-16 relative z-10">
          
          {/* Column 1: Email (Primary CTA) */}
          <div className="md:col-span-5 flex flex-col gap-4">
             <span className="font-kamerick text-gray-500 text-[10px] uppercase tracking-widest flex items-center gap-2">
               <div className="w-1 h-1 bg-[#FFB800] rounded-full" /> Get in Touch
             </span>
             <a 
               href="mailto:jordan.patel@artdotquarter.io" 
               className="font-kamerick text-xl md:text-3xl font-bold text-white hover:text-[#FFB800] transition-colors group/link w-fit"
             >
               jordan.patel@artdotquarter.io
               <div className="h-[1px] w-0 bg-[#FFB800] group-hover/link:w-full transition-all duration-500" />
             </a>
          </div>

          {/* Column 2: Address / Website */}
          <div className="md:col-span-4 flex flex-col gap-4">
             <span className="font-kamerick text-gray-500 text-[10px] uppercase tracking-widest flex items-center gap-2">
                <div className="w-1 h-1 bg-[#FFB800] rounded-full" /> Visit Us
             </span>
             
             <div>
                <a 
                  href="https://www.artdotquarter.io/" 
                  target="_blank"
                  className="font-kamerick text-lg md:text-xl font-bold text-white hover:text-[#FFB800] transition-colors flex items-center gap-2 mb-2 w-fit"
                >
                  artdotquarter.io
                  <ArrowUpRight className="w-4 h-4 text-[#FFB800]" />
                </a>
                
                <p className="font-kamerick text-gray-400 text-xs leading-relaxed uppercase tracking-wide">
                  14-15 Allison Street, Birmingham <br /> United Kingdom
                </p>
             </div>
          </div>

          {/* Column 3: Magnetic Socials */}
          <div className="md:col-span-3 flex flex-col gap-6 md:items-end">
             <span className="font-kamerick text-gray-500 text-[10px] uppercase tracking-widest hidden md:block">
               Follow Us
             </span>
             <div className="flex gap-4">
               {[
                 { Icon: Instagram, href: "#" }, 
                 { Icon: Linkedin, href: "#" }, 
                 { Icon: Twitter, href: "#" }
               ].map((item, i) => (
                 <MagneticButton key={i} href={item.href}>
                   <item.Icon className="w-4 h-4" />
                 </MagneticButton>
               ))}
             </div>
          </div>

        </div>

        {/* 4. COPYRIGHT TICKER */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-6 border-t border-white/5 gap-4 relative overflow-hidden">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-kamerick text-[#444] text-[10px] uppercase tracking-widest relative z-10"
          >
            © {new Date().getFullYear()} artdotagency. All Rights Reserved.
          </motion.p>
          
          {/* Subtle Back to Top Hint */}
          <motion.button 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             transition={{ delay: 0.8 }}
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
             className="font-kamerick text-[#FFB800] text-[10px] uppercase tracking-widest hover:text-white transition-colors cursor-pointer relative z-10"
          >
             Back to Top ↑
          </motion.button>
        </div>

      </div>
      
      {/* Background Gradient Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-[#FFB800]/5 to-transparent pointer-events-none" />

    </footer>
  );
}