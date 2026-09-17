"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Instagram, Facebook, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

// ------------------------------------------------------------------
// CUSTOM ICON: TikTok
// ------------------------------------------------------------------
const Tiktok = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// ------------------------------------------------------------------
// SUB-COMPONENT: Magnetic Button
// ------------------------------------------------------------------
const MagneticButton = ({ children, href }: { children: React.ReactNode; href: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.5, y: middleY * 0.5 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      style={{ position: "relative" }}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <Link
        href={href}
        ref={ref}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#FFB800] hover:text-black hover:border-[#FFB800] transition-colors duration-300 group overflow-hidden relative"
      >
        <div className="relative z-10">{children}</div>
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
    <h1 className="flex overflow-hidden font-kamerick text-5xl md:text-7xl lg:text-[8rem] font-bold text-white lowercase tracking-tighter leading-[0.85] select-none mix-blend-difference">
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
// MAIN COMPONENT: FOOTER
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
              rgba(255, 184, 0, 0.04),
              transparent 80%
            )
          `,
        }}
      />

      <div className="container mx-auto px-6 md:px-12 flex flex-col justify-between">
        
        {/* 2. TOP SECTION: BIG TYPOGRAPHY */}
        <div className="flex flex-col mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[1px] bg-[#FFB800]" />
            <span className="font-kamerick text-[#FFB800] text-[10px] md:text-xs tracking-[0.2em] lowercase">
              To Partner With Us
            </span>
          </motion.div>
          
          <div className="relative">
            <SplitText text="Thank" />
            <SplitText text="You" delay={0.2} />
          </div>
        </div>

        {/* 3. BOTTOM GRID: CONNECTING THE FAMILY */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 border-t border-white/10 pt-16 relative z-10">
          
          {/* Column 1: Contact & Address */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <span className="font-kamerick text-gray-500 text-[10px] lowercase tracking-widest flex items-center gap-2">
              <div className="w-1 h-1 bg-[#FFB800] rounded-full" /> Inquiries
            </span>
            <a 
              href="mailto:jordan.patel@artdotquarter.io" 
              className="font-kamerick text-xl md:text-2xl font-bold text-white hover:text-[#FFB800] transition-colors group/link w-fit"
            >
              jordan.patel@artdotquarter.io
              <div className="h-[1px] w-0 bg-[#FFB800] group-hover/link:w-full transition-all duration-500" />
            </a>
            <p className="font-kamerick text-gray-400 text-[10px] leading-relaxed lowercase tracking-[0.2em] mt-2">
              14-15 Allison Street, Birmingham <br /> United Kingdom
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <span className="font-kamerick text-gray-500 text-[10px] lowercase tracking-widest flex items-center gap-2">
              <div className="w-1 h-1 bg-[#FFB800] rounded-full" /> Navigation
            </span>
            <nav className="flex flex-col gap-3">
              {[
                { name: "Services", href: "/services" },
                { name: "Work", href: "/#work" },
                { name: "Insights", href: "/insights" },
                { name: "About", href: "/about" },
                { name: "How we work", href: "/how-we-work" },
              ].map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="font-kamerick text-[12px] text-gray-300 hover:text-[#FFB800] transition-colors lowercase tracking-widest"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Legal */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <span className="font-kamerick text-gray-500 text-[10px] lowercase tracking-widest flex items-center gap-2">
              <div className="w-1 h-1 bg-[#FFB800] rounded-full" /> Legal
            </span>
            <nav className="flex flex-col gap-3">
              {[
                { name: "Privacy", href: "/privacy" },
                { name: "Cookies", href: "/cookies" },
                { name: "Accessibility", href: "/accessibility" },
              ].map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="font-kamerick text-[12px] text-gray-300 hover:text-[#FFB800] transition-colors lowercase tracking-widest"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4: Social Connectivity */}
          <div className="md:col-span-2 flex flex-col gap-6 md:items-end">
            <span className="font-kamerick text-gray-500 text-[10px] lowercase tracking-widest">
              Connectivity
            </span>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/artdotagency?igsh=a2x0dHp5cHZyZ212&utm_source=qr" }, 
                { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61578248177400" }, 
                { Icon: Tiktok, href: "https://www.tiktok.com/@artdotagency_?_r=1&_t=ZN-93VDwETKkrO" }
              ].map((item, i) => (
                <MagneticButton key={i} href={item.href}>
                  <item.Icon className="w-4 h-4" />
                </MagneticButton>
              ))}
            </div>
          </div>
        </div>

        {/* 4. COPYRIGHT TICKER */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-20 pt-8 border-t border-white/5 gap-4">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-kamerick text-white/45 text-[9px]  tracking-[0.3em]"
          >
            © {new Date().getFullYear()} artdotagency
          </motion.p>
          
          <button 
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
             className="font-kamerick text-[#FFB800] text-[10px] lowercase tracking-widest hover:text-white transition-colors cursor-pointer"
          >
             Back to Top ↑
          </button>
        </div>
      </div>
      
      {/* Cinematic Floor Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-[#FFB800]/5 to-transparent pointer-events-none" />
    </footer>
  );
}