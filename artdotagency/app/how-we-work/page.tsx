"use client";

import { motion } from "framer-motion";
import Cursor from "../component /Cursor";
import Footer from "../component /Footer";

export default function HowWeWorkPage() {
  const models = [
    {
      title: "Initial Review",
      description: "A focused starting point to clarify the opportunity, identify gaps and agree the next steps. An agreed assessment and action paper. Scope and fee are confirmed before work begins."
    },
    {
      title: "Defined Project",
      description: "A fixed scope for a strategy, bid, brand, programme, campaign or mobilisation phase. A defined brief, deliverables and timetable with a written fee proposal."
    },
    {
      title: "Retained Support",
      description: "Ongoing strategic or creative support with agreed priorities and capacity. An agreed team, priorities and monthly capacity, quoted to scope."
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
          <span className="text-[#FFB800] text-xs md:text-sm tracking-[0.2em] lowercase font-kamerick block mb-4">
            Methodology
          </span>
          <h1 className="text-4xl md:text-6xl font-bold lowercase tracking-tighter font-kamerick max-w-4xl mb-8">
            Three ways to work with Artdot
          </h1>
          <p className="text-xl md:text-2xl font-kamerick text-gray-400 max-w-3xl">
            Start with a focused review, commission a defined project or retain ongoing support. We agree the scope, team, outputs and fee before work begins.
          </p>
        </motion.div>

        {/* 3 Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {models.map((model, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0F0F0F] border border-white/5 p-8 md:p-12 hover:border-[#FFB800]/30 transition-colors group"
            >
              <div className="text-[#FFB800] font-kamerick text-4xl font-bold opacity-50 mb-6 group-hover:opacity-100 transition-opacity">
                0{index + 1}
              </div>
              <h3 className="font-kamerick text-2xl font-bold lowercase mb-4 text-white">
                {model.title}
              </h3>
              <p className="font-kamerick text-gray-400 text-sm leading-relaxed">
                {model.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
      <div className="mt-32">
        <Footer />
      </div>
    </main>
  );
}

