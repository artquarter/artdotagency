"use client";

import { motion } from "framer-motion";
import Cursor from "../component /Cursor";
import Footer from "../component /Footer";

export default function InsightsPage() {
  const reports = [
    {
      title: "The creator economy and Birmingham’s next generation",
      type: "Strategic proposal",
      audience: "For policymakers, educators and cultural funders.",
      authors: "Prepared by Jordan Patel and Emmanuel Y. Cobbold. Supported by Professor Helen Wood.",
      summary: "A strategic paper exploring how Birmingham could support emerging creators through skills, infrastructure, enterprise development and a more coordinated approach to investment."
    },
    {
      title: "Screening programme report",
      type: "Impact report",
      audience: "For delivery partners and local government.",
      authors: "",
      summary: "This report records the delivery of a UKSPF funded LED screen and a programme of public screenings at AQ Foodhall. It brings together procurement, expenditure, event attendance, communications and delivery learning. The strongest evidence concerns direct use of the screen, with 22 events and 3,771 recorded attendances."
    },
    {
      title: "Content creator training report",
      type: "Impact report",
      audience: "For education providers and programme stakeholders.",
      authors: "",
      summary: "The April 2026 stakeholder report reviews the second Content Creator Programme cohort delivered by Art Quarter with South and City College Birmingham. It records 14 completions, practical production for Art Quarter brands, learner feedback and early progression."
    }
  ];

  return (
    <main className="bg-[#050505] min-h-screen text-white pt-32">
      <Cursor />
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 border-b border-white/10 pb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold lowercase tracking-tighter font-kamerick max-w-4xl mb-8">
            The thinking behind the work
          </h1>
          <p className="text-xl md:text-2xl font-kamerick text-gray-400 max-w-3xl">
            Explore our creator economy paper and programme reports, bringing together practical experience, delivery evidence and proposals for what comes next.
          </p>
        </motion.div>

        {/* Reports List */}
        <div className="flex flex-col gap-8 mb-32">
          {reports.map((report, index) => (
            <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-[#0F0F0F] border border-white/5 p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 hover:border-white/20 transition-colors"
            >
                <div className="md:w-2/3 flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-4 mb-2">
                       <span className="font-kamerick text-[#FFB800] text-[10px] tracking-[0.2em] lowercase border border-[#FFB800] px-3 py-1 rounded-full">
                         {report.type}
                       </span>
                       <span className="font-kamerick text-gray-500 text-[10px] tracking-[0.1em] lowercase">
                         {report.audience}
                       </span>
                    </div>

                    <h3 className="font-kamerick text-2xl md:text-4xl font-bold text-white lowercase tracking-tight">
                        {report.title}
                    </h3>
                    
                    {report.authors && (
                      <p className="font-kamerick text-[#FFB800] text-[10px] tracking-[0.2em] lowercase">
                          {report.authors}
                      </p>
                    )}
                    
                    <p className="font-kamerick text-gray-400 text-sm leading-relaxed max-w-2xl">
                        {report.summary}
                    </p>
                </div>
                
                <div className="md:w-1/3 flex justify-start md:justify-end">
                    <button disabled className="flex items-center gap-4 px-6 py-4 border border-white/20 text-gray-400 rounded-full cursor-not-allowed bg-white/5">
                        <span className="font-kamerick text-[10px] md:text-xs font-bold lowercase tracking-widest">available upon request</span>
                    </button>
                </div>
            </motion.div>
          ))}
        </div>

      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}

