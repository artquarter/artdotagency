"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Cursor from "../../component /Cursor";
import Footer from "../../component /Footer";

export default function ReportPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white pt-32">
      <Cursor />
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-12">
          <Link href="/insights" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#FFB800] transition-colors font-kamerick text-xs tracking-widest lowercase">
            <ArrowLeft className="w-4 h-4" />
            back to insights
          </Link>
        </div>

        <div className="mb-16">
          <span className="text-[#FFB800] text-[10px] tracking-[0.2em] lowercase border border-[#FFB800] px-3 py-1 rounded-full mb-4 inline-block">
            Impact report
          </span>
          <h1 className="text-3xl md:text-5xl font-bold lowercase tracking-tighter font-kamerick max-w-4xl mb-6 mt-4">
            Content creator training register
          </h1>
          <p className="text-gray-400 font-kamerick text-sm max-w-2xl leading-relaxed">
            Attendance and completion registers for the second Content Creator Programme cohort delivered by Art Quarter with South and City College Birmingham, recording learner completions.
          </p>
        </div>

        <div className="flex flex-col gap-8 max-w-4xl mx-auto mb-32">
          <div className="relative w-full overflow-hidden border border-white/10 bg-[#0F0F0F] rounded-lg">
            <Image 
              src="/reports/ccp-register-1.jpg" 
              alt="Content Creator Programme Register Page 1" 
              width={1200} 
              height={1600} 
              className="w-full h-auto object-contain"
              unoptimized
            />
          </div>
          <div className="relative w-full overflow-hidden border border-white/10 bg-[#0F0F0F] rounded-lg">
            <Image 
              src="/reports/ccp-register-2.jpg" 
              alt="Content Creator Programme Register Page 2" 
              width={1200} 
              height={1600} 
              className="w-full h-auto object-contain"
              unoptimized
            />
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}

