"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";

export default function Proposition({ startAnimation }: { startAnimation: boolean }) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || !startAnimation) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo("[data-line]", { yPercent: 110 }, { yPercent: 0, duration: 1.3, stagger: 0.1 })
        .fromTo("[data-fade]", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.12 }, "-=0.8");
    }, el);
    return () => ctx.revert();
  }, [startAnimation]);

  return (
    <section
      ref={root}
      aria-labelledby="proposition-title"
      className="relative flex items-center pt-32 pb-14 md:min-h-[85svh] md:items-end md:pt-40 md:pb-24"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <p data-fade className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-neonlime md:mb-10 md:text-xs">
          <span aria-hidden className="h-px w-8 bg-neonlime" />
          For culture &amp; community
        </p>

        <h1
          id="proposition-title"
          className="font-kamerick text-[clamp(2rem,7vw,6.5rem)] leading-[1.05] tracking-[-0.03em] text-alabaster max-w-[19ch]"
        >
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-line className="block">Funding &amp; impact</span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-line className="block">
              <span className="text-neonlime">consultancy.</span>
            </span>
          </span>
        </h1>

        <div className="mt-7 grid gap-6 md:mt-12 md:gap-10 md:border-t md:border-alabaster/10 md:pt-8 md:grid-cols-12 md:items-end">
          <p data-fade className="max-w-lg md:col-span-6 text-base md:text-xl leading-relaxed text-alabaster/75 text-pretty">
            We help cultural and community organisations secure funding, prove impact and grow.
          </p>
          <div data-fade className="md:col-span-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-end">
            <Link
              href="/enquire"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-neonlime px-6 py-4 text-sm font-medium text-void transition-colors hover:bg-alabaster"
            >
              Book a diagnostic
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/what-we-do"
              className="inline-flex items-center justify-center rounded-full border border-alabaster/20 px-6 py-4 text-sm text-alabaster transition-colors hover:border-alabaster/60"
            >
              Explore our services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
