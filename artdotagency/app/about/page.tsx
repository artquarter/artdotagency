"use client";

import { motion, Variants } from "framer-motion";
import Cursor from "../component /Cursor";
import Footer from "../component /Footer";

export default function AboutPage() {
  const sentence: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02 }
    }
  };
  const wordAnim: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const paragraph = "We help organisations develop ideas, build distinctive brands and deliver practical projects. Our work brings together strategy, funding development, creative production, programmes and mobilisation, from the first brief through to launch and delivery. Our experience has grown through Art Quarter, where brands, food, personal services, training and community events have been developed in a working environment. We bring that practical perspective and deep community understanding to the organisations we work with.".split(" ");

  return (
    <main className="bg-transparent min-h-screen text-white pt-32 relative overflow-hidden">
      <Cursor />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 mb-32">
        
        {/* Massive Header */}
        <div className="mb-24 md:mb-40 pt-12 md:pt-24 border-b border-white/10 pb-12">
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-neonlime text-xs md:text-sm tracking-[0.2em] lowercase font-kamerick block mb-12"
          >
            ( about us )
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="text-6xl md:text-[8vw] font-bold lowercase tracking-tighter font-kamerick max-w-[95vw] leading-[0.85]"
          >
            built through <span className="text-neonlime italic font-light">practical</span><br/>experience.
          </motion.h1>
        </div>

        {/* Agency Intro - Word by Word Reveal */}
        <div className="mb-32 flex justify-end">
          <motion.p 
            variants={sentence}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="text-xl md:text-4xl font-kamerick text-gray-300 leading-relaxed max-w-4xl flex flex-wrap"
          >
            {paragraph.map((word, i) => (
              <motion.span key={i} variants={wordAnim} className="mr-[0.25em]">
                {word}
              </motion.span>
            ))}
          </motion.p>
        </div>

        {/* Full-width Cinematic Panels for Leadership & Team */}
        <div className="flex flex-col gap-8 md:gap-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-void/40 backdrop-blur-md border border-white/5 p-8 md:p-16 lg:p-24 relative group overflow-hidden flex flex-col md:flex-row gap-12 justify-between items-start"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neonlime/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="md:w-1/3 relative z-10">
              <h2 className="text-neonlime text-xs lowercase tracking-[0.2em] font-kamerick mb-6">( the network )</h2>
              <h3 className="text-3xl md:text-5xl font-bold lowercase tracking-tight font-kamerick leading-none">an associate network of specialists</h3>
            </div>
            
            <div className="md:w-1/2 relative z-10">
              <p className="text-base md:text-xl text-gray-400 font-kamerick leading-relaxed">
                We do not operate as a traditional siloed agency. Instead, ArtDot functions as a robust associate network of civic strategists, cultural producers, researchers, and community engagement specialists. We draw on deep practical experience founding Art Quarter in Digbeth, bringing together brand development, creative skills programmes, and community activity. We assemble bespoke teams tailored to the exact requirements of your public sector commission or cultural strategy.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-void/40 backdrop-blur-md border border-white/5 p-8 md:p-16 lg:p-24 relative group overflow-hidden flex flex-col md:flex-row gap-12 justify-between items-start"
          >
            <div className="absolute inset-0 bg-gradient-to-l from-neonlime/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="md:w-1/3 relative z-10">
              <h2 className="text-neonlime text-xs lowercase tracking-[0.2em] font-kamerick mb-6">( the execution )</h2>
              <h3 className="text-3xl md:text-5xl font-bold lowercase tracking-tight font-kamerick leading-none">built around the work</h3>
            </div>
            
            <div className="md:w-1/2 relative z-10">
              <p className="text-base md:text-xl text-gray-400 font-kamerick leading-relaxed">
                Every project has a named lead and an agreed team. We bring together strategic, creative and delivery specialists according to the brief, with clear responsibilities and a shared understanding of what needs to be achieved. We deliver the strategy, integrating closely with your stakeholders and communities.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
      
      {/* Footer Wrapper */}
      <div className="relative z-30 bg-void">
        <Footer />
      </div>
    </main>
  );
}

