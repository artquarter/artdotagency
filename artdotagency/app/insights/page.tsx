"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cursor from "../component /Cursor";
import Footer from "../component /Footer";
import MagneticButton from "../component /MagneticButton";
import Image from "next/image";

const reports = [
  {
    title: "The creator economy and Birmingham’s next generation",
    type: "Strategic proposal",
    audience: "For policymakers, educators and cultural funders.",
    authors: "Prepared by Jordan Patel and Emmanuel Y. Cobbold. Supported by Professor Helen Wood.",
    summary: "A strategic paper exploring how Birmingham could support emerging creators through skills, infrastructure, enterprise development and a more coordinated approach to investment.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Screening programme report",
    type: "Impact report",
    audience: "For delivery partners and local government.",
    authors: "",
    summary: "This report records the delivery of a UKSPF funded LED screen and a programme of public screenings at AQ Foodhall. It brings together procurement, expenditure, event attendance, communications and delivery learning. The strongest evidence concerns direct use of the screen, with 22 events and 3,771 recorded attendances.",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Content creator training report",
    type: "Impact report",
    audience: "For education providers and programme stakeholders.",
    authors: "",
    summary: "The April 2026 stakeholder report reviews the second Content Creator Programme cohort delivered by Art Quarter with South and City College Birmingham. It records 14 completions, practical production for Art Quarter brands, learner feedback and early progression.",
    image: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=800"
  }
];

export default function InsightsPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <main className="bg-void min-h-screen text-white pt-32 relative overflow-hidden">
      <Cursor />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 mb-32">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 pb-12"
        >
          <h1 className="text-5xl md:text-8xl font-bold lowercase tracking-tighter font-kamerick max-w-5xl mb-8 leading-[0.9]">
            the thinking<br/><span className="text-gray-600">behind the work</span>
          </h1>
          <p className="text-xl md:text-2xl font-kamerick text-gray-400 max-w-3xl">
            Explore our creator economy paper and programme reports, bringing together practical experience, delivery evidence and proposals for what comes next.
          </p>
        </motion.div>

        {/* Massive Accordion List */}
        <div className="flex flex-col border-t border-white/10">
          {reports.map((report, index) => {
            const isHovered = hoveredIndex === index;
            
            return (
              <div 
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative border-b border-white/10 py-8 md:py-12 cursor-pointer"
              >
                {/* Number & Type (Top) */}
                <div className="flex justify-between items-center mb-6">
                   <span className={`font-mono text-xs md:text-sm transition-colors duration-300 ${isHovered ? 'text-neonlime' : 'text-gray-500'}`}>
                     {(index + 1).toString().padStart(2, '0')}
                   </span>
                   <span className={`font-kamerick text-[10px] tracking-[0.2em] lowercase transition-colors duration-300 ${isHovered ? 'text-neonlime' : 'text-gray-500'}`}>
                     {report.type}
                   </span>
                </div>

                {/* The Massive Title */}
                <motion.h2 
                  layout
                  className={`font-kamerick text-4xl md:text-7xl font-bold lowercase tracking-tighter leading-[0.9] transition-all duration-500 ${isHovered ? 'text-white translate-x-4 md:translate-x-8' : 'text-gray-400'}`}
                >
                  {report.title}
                </motion.h2>

                {/* Collapsible Content */}
                <motion.div
                  initial={false}
                  animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-12 md:pt-16 pb-4 flex flex-col lg:flex-row gap-12 lg:gap-24 items-start md:pl-8">
                    
                    {/* Abstract Image Block */}
                    <div className="w-full lg:w-1/3 aspect-[4/3] relative overflow-hidden bg-white/5 grayscale group-hover:grayscale-0 transition-all duration-700">
                       <Image 
                         src={report.image}
                         alt={report.title}
                         fill
                         className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700 ease-out"
                       />
                       <div className="absolute inset-0 bg-neonlime/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                    
                    {/* Details Block */}
                    <div className="w-full lg:w-2/3 flex flex-col gap-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-kamerick text-gray-500 text-[10px] tracking-[0.2em] lowercase mb-2">audience</h4>
                          <p className="font-kamerick text-white text-sm leading-relaxed">{report.audience}</p>
                        </div>
                        {report.authors && (
                          <div>
                            <h4 className="font-kamerick text-gray-500 text-[10px] tracking-[0.2em] lowercase mb-2">authors</h4>
                            <p className="font-kamerick text-neonlime text-sm leading-relaxed">{report.authors}</p>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <h4 className="font-kamerick text-gray-500 text-[10px] tracking-[0.2em] lowercase mb-2">summary</h4>
                        <p className="font-kamerick text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl">{report.summary}</p>
                      </div>

                      <div className="pt-6">
                        <MagneticButton>
                          <button disabled className="flex items-center gap-4 px-8 py-5 border border-white/20 text-white rounded-full cursor-not-allowed bg-white/5 hover:bg-neonlime hover:text-black hover:border-neonlime transition-all duration-300">
                              <span className="font-kamerick text-xs font-bold lowercase tracking-widest">available upon request</span>
                          </button>
                        </MagneticButton>
                      </div>
                    </div>

                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
      <div className="relative z-30 bg-void">
        <Footer />
      </div>
    </main>
  );
}

