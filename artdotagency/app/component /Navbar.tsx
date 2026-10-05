"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { capabilityNav, primaryNav } from "../lib/site";

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Stay out of the way while reading; return the moment the user scrolls up.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    setHidden(latest > prev && latest > 160 && !servicesOpen);
  });

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setMenuOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const servicesActive = pathname.startsWith("/what-we-do");

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-neonlime focus:text-void focus:px-4 focus:py-2 focus:rounded-full text-sm"
      >
        Skip to content
      </a>

      <motion.header
        animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled || menuOpen
            ? "bg-void/80 backdrop-blur-xl border-b border-alabaster/10"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-10"
        >
          <Link
            href="/"
            className="font-kamerick text-xl tracking-tight text-alabaster hover:text-neonlime transition-colors"
          >
            artdot<span className="text-neonlime">.</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <div ref={servicesRef} className="relative">
              <button
                type="button"
                aria-expanded={servicesOpen}
                aria-controls="services-menu"
                onClick={() => setServicesOpen((v) => !v)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm transition-colors ${
                  servicesActive || servicesOpen ? "text-alabaster" : "text-alabaster/65 hover:text-alabaster"
                }`}
              >
                What We Do
                <ChevronDown
                  aria-hidden
                  className={`h-4 w-4 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    id="services-menu"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute left-0 top-full mt-3 w-[560px] rounded-2xl border border-alabaster/10 bg-void/95 backdrop-blur-xl p-3 shadow-2xl shadow-black/50"
                  >
                    <ul className="grid grid-cols-2 gap-1">
                      {capabilityNav.map((item, i) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className={`group flex items-start gap-3 rounded-xl p-4 transition-colors hover:bg-alabaster/5 ${
                              isActive(item.href) ? "bg-alabaster/5" : ""
                            }`}
                          >
                            <span className="pt-0.5 text-xs tabular-nums text-neonlime">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="text-sm text-alabaster/85 group-hover:text-alabaster">
                              {item.label}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/what-we-do"
                      className="mt-2 flex items-center justify-between rounded-xl border-t border-alabaster/10 px-4 py-4 text-sm text-alabaster/65 hover:text-neonlime transition-colors"
                    >
                      Overview of our capabilities
                      <ArrowUpRight aria-hidden className="h-4 w-4" />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  isActive(item.href) ? "text-alabaster" : "text-alabaster/65 hover:text-alabaster"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/enquire"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-neonlime px-5 py-2.5 text-sm font-medium text-void transition-colors hover:bg-alabaster"
            >
              Enquire
            </Link>
            <button
              type="button"
              className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full border border-alabaster/15 text-alabaster"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-void pt-28 pb-12 px-6 lg:hidden"
          >
            <nav
              aria-label="Mobile"
              className="flex flex-col gap-7"
              onClick={(event) => {
                if ((event.target as HTMLElement).closest("a")) setMenuOpen(false);
              }}
            >
              <Link href="/" className="font-kamerick text-2xl text-alabaster">
                Home
              </Link>
              <div>
                <Link href="/what-we-do" className="font-kamerick text-2xl text-alabaster">
                  What We Do
                </Link>
                <ul className="mt-5 flex flex-col gap-3 border-l border-alabaster/10 pl-5">
                  {capabilityNav.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-base text-alabaster/70 hover:text-neonlime">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {primaryNav.map((item) => (
                <Link key={item.href} href={item.href} className="font-kamerick text-2xl text-alabaster">
                  {item.label}
                </Link>
              ))}
              <Link
                href="/enquire"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-neonlime px-6 py-4 text-base font-medium text-void"
              >
                Enquire
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
