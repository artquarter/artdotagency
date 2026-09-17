"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { name: "services", href: "/services" },
  { name: "work", href: "/#work" }, 
  { name: "insights", href: "/insights" },
  { name: "about", href: "/about" },
  { name: "how we work", href: "/how-we-work" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (pathname !== "/") {
      setHidden(false);
      return;
    }
    const isPastHero = latest > window.innerHeight * 0.8;
    setHidden(!isPastHero);
  });

  useEffect(() => {
    if (pathname !== "/") {
      setHidden(false);
    }
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/10"
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-kamerick text-white font-bold text-xl hover:text-[#FFB800] transition-colors lowercase">
            artdotagency
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-kamerick text-sm lowercase tracking-widest transition-colors relative group ${
                    isActive ? "text-[#FFB800]" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div layoutId="nav-indicator" className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#FFB800] rounded-full" />
                  )}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="font-kamerick text-xs lowercase tracking-widest px-6 py-3 border border-[#FFB800] text-[#FFB800] rounded-full hover:bg-[#FFB800] hover:text-black transition-colors ml-4"
            >
              discuss a project
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white hover:text-[#FFB800] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#050505] pt-24 px-6 md:hidden flex flex-col"
          >
            <div className="flex flex-col gap-6 mt-8">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`font-kamerick text-2xl lowercase tracking-widest transition-colors ${
                      isActive ? "text-[#FFB800]" : "text-gray-400"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className="font-kamerick text-lg lowercase tracking-widest px-6 py-4 border border-[#FFB800] text-[#FFB800] rounded-full text-center mt-8"
              >
                discuss a project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
