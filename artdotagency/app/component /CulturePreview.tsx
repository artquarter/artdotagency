"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play, Heart } from "lucide-react";

export default function CulturePreview() {
  const reports = [
    {
      title: "The creator economy and Birmingham's next generation",
      authors: "Jordan Patel and Emmanuel Y. Cobbold. Supported by Professor Helen Wood",
      summary: "An in-depth exploration of how the creator economy is shaping opportunities for young people in Birmingham, looking at the intersection of digital skills, community spaces, and economic development."
    },
    {
      title: "Screening programme report",
      authors: "Artdot Agency",
      summary: "A comprehensive review of the UKSPF-funded community screening programme, detailing the delivery of 22 events, attendance metrics, and the social impact of shared cultural experiences in community settings."
    },
    {
      title: "Content creator training report",
      authors: "Artdot Agency",
      summary: "Analysis of the Content Creator Programme delivered in partnership with SCCB and supported by WMCA. The report covers the methodology, participant progress, and outcomes for the 14 completed learners."
    }
  ];

  return (
    <section id="insights" className="relative w-full py-24 md:py-32 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-6">
        
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-16"
        >
            <div className="mb-4 flex items-center gap-4">
                <div className="w-12 h-[1px] bg-[#FFB800]" />
                <span className="font-kamerick text-[#FFB800] text-[10px] tracking-[0.2em] lowercase">
                    08 — Insights
                </span>
            </div>
            <h2 className="font-kamerick text-4xl md:text-6xl font-bold text-white lowercase tracking-tighter leading-[0.9]">
                Reports & <br/> <span className="text-[#FFB800]">Thinking</span>
            </h2>
        </motion.div>

        <div className="flex flex-col gap-8">
            {reports.map((report, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-[#0F0F0F] border border-white/5 p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 hover:border-white/20 transition-colors"
                >
                    <div className="md:w-2/3">
                        <h3 className="font-kamerick text-2xl md:text-3xl font-bold text-white lowercase tracking-tight mb-3">
                            {report.title}
                        </h3>
                        <p className="font-kamerick text-[#FFB800] text-[10px] tracking-[0.2em] lowercase mb-4">
                            {report.authors}
                        </p>
                        <p className="font-kamerick text-gray-400 text-sm leading-relaxed">
                            {report.summary}
                        </p>
                    </div>
                    
                    <div className="md:w-1/3 flex justify-start md:justify-end">
                        <button className="flex items-center gap-4 px-6 py-4 border border-[#FFB800] text-[#FFB800] rounded-full hover:bg-[#FFB800] hover:text-black transition-colors">
                            <span className="font-kamerick text-xs font-bold lowercase tracking-widest">Download PDF</span>
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>

      </div>
    </section>
  );
}