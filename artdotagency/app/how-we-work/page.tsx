"use client";

import { motion } from "framer-motion";
import Cursor from "../component /Cursor";
import Footer from "../component /Footer";

export default function HowWeWorkPage() {
  const models = [
    {
      title: "Review",
      description: "A focused assessment with recommendations and a prioritised action plan."
    },
    {
      title: "Project",
      description: "An agreed piece of work with defined deliverables, responsibilities, timetable and fee."
    },
    {
      title: "Retained",
      description: "Ongoing support with agreed priorities, monthly capacity and review arrangements."
    }
  ];

  const processSteps = [
    { title: "Initial brief", desc: "Understanding the problem, context, and desired outcomes." },
    { title: "Commercials agreed", desc: "Clear agreement on scope, team, outputs, and fees." },
    { title: "Planning", desc: "Developing the strategy, timeline, and required resources." },
    { title: "Mobilisation", desc: "Preparing teams, partners, and operations for execution." },
    { title: "Launch & Reporting", desc: "Executing the plan and reporting on evidenced results." }
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
            Three ways to work with Artdot
          </h1>
          <p className="text-xl md:text-2xl font-kamerick text-gray-400 max-w-3xl">
            Start with a focused review, commission a defined project or retain ongoing support. We agree the scope, team, outputs and fee before work begins.
          </p>
        </motion.div>

        {/* 3 Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {models.map((model, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0F0F0F] border border-white/5 p-8 md:p-12 hover:border-[#FFB800]/30 transition-colors group"
            >
              <h3 className="font-kamerick text-2xl font-bold lowercase mb-4 text-white">
                {model.title}
              </h3>
              <p className="font-kamerick text-gray-400 text-sm leading-relaxed">
                {model.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Delivery Process */}
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold font-kamerick lowercase mb-12"
          >
            Delivery <span className="text-[#FFB800]">process</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#0A0A0A] border-t-2 border-[#FFB800] p-6"
              >
                <div className="text-[#FFB800] font-kamerick text-sm font-bold mb-4">0{index + 1}</div>
                <h3 className="font-kamerick text-lg font-bold lowercase text-white mb-2">{step.title}</h3>
                <p className="font-kamerick text-gray-400 text-xs leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
      <div className="mt-32">
        <Footer />
      </div>
    </main>
  );
}

