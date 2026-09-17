"use client";

import { motion } from "framer-motion";
import Cursor from "../component /Cursor";
import Footer from "../component /Footer";
import CreativeServices from "../component /CreativeServices";

export default function ServicesPage() {
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
          <span className="text-[#FFB800] text-xs md:text-sm tracking-[0.2em] lowercase font-kamerick block mb-4">
            Our Services
          </span>
          <h1 className="text-4xl md:text-6xl font-bold lowercase tracking-tighter font-kamerick max-w-4xl mb-8">
            The expertise to shape and deliver your project
          </h1>
          <p className="text-xl md:text-2xl font-kamerick text-gray-400 max-w-4xl">
            Start with the support you need now. We can lead a complete project or take responsibility for a defined part, from strategy and funding development to creative production, mobilisation and delivery.
          </p>
        </motion.div>
        
        <div className="mb-32">
           <CreativeServices hideHeader={true} />
        </div>

      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}
