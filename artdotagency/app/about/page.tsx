"use client";

import { motion } from "framer-motion";
import Cursor from "../component /Cursor";
import Footer from "../component /Footer";

export default function AboutPage() {
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
            About Us
          </span>
          <h1 className="text-4xl md:text-6xl font-bold lowercase tracking-tighter font-kamerick max-w-4xl">
            Built through practical experience
          </h1>
        </motion.div>

        {/* Agency Intro */}
        <div className="mb-24">
          <p className="text-xl md:text-3xl font-kamerick text-gray-300 leading-relaxed max-w-4xl">
            We help organisations develop ideas, build distinctive brands and deliver projects that connect with people. Our work brings together strategy, funding development, creative production, programmes and mobilisation, from the first brief through to launch and delivery. Our experience has grown through Art Quarter, where brands, food, personal services, training and community events have been developed in a working environment. We bring that practical perspective to the organisations we work with.
          </p>
        </div>

        {/* Two Column Grid for Leadership & Team */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          
          <div className="bg-[#0F0F0F] border border-white/5 p-8 md:p-12 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFB800]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h2 className="text-[#FFB800] text-xs lowercase tracking-[0.2em] font-kamerick mb-6">Leadership</h2>
            <h3 className="text-3xl font-bold lowercase font-kamerick mb-6">Jordan Patel</h3>
            <p className="text-sm md:text-base text-gray-400 font-kamerick leading-relaxed">
              Jordan Patel is the founder of Art Quarter in Digbeth. His work brings together brand development, food and personal service environments, creative skills programmes and community activity. He has led the development of relationships across local government, education, business and the voluntary sector, alongside work on the creator economy and cultural infrastructure. Through Artdot, Jordan brings that practical experience to strategy, partnership development and project delivery, supported by specialists appointed to the needs of each brief.
            </p>
          </div>

          <div className="bg-[#0F0F0F] border border-white/5 p-8 md:p-12 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-bl from-[#FFB800]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h2 className="text-[#FFB800] text-xs lowercase tracking-[0.2em] font-kamerick mb-6">The Team</h2>
            <h3 className="text-3xl font-bold lowercase font-kamerick mb-6">Built around the work</h3>
            <p className="text-sm md:text-base text-gray-400 font-kamerick leading-relaxed">
              A team built around the work. Every project has a named lead and an agreed team. We bring together strategic, creative and delivery specialists according to the brief, with clear responsibilities and a shared understanding of what needs to be achieved.
            </p>
          </div>

        </div>

      </div>
      <div className="mt-32">
        <Footer />
      </div>
    </main>
  );
}

