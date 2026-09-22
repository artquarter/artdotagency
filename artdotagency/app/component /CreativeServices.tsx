"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Data
const services = [
  {
    name: "Strategy and advisory",
    description: "Defining commercial or cultural goals and outlining an actionable roadmap to achieve them."
  },
  {
    name: "Funding and bids",
    description: "Identifying funding opportunities and developing competitive bids to secure necessary capital."
  },
  {
    name: "Brands and places",
    description: "Creating distinctive brand identities and shaping physical environments that connect with people."
  },
  {
    name: "Mobilisation and delivery",
    description: "Preparing teams, partners, schedules and operations for a successful launch and practical delivery."
  },
  {
    name: "Events and experiences",
    description: "Producing live, temporary experiences that engage audiences directly."
  },
  {
    name: "Programmes and training",
    description: "Designing and leading structured, ongoing activity delivered over time."
  },
  {
    name: "Marketing and content",
    description: "Supporting communication and audience engagement through planned campaigns and content creation."
  },
  {
    name: "ai and business automation",
    description: "streamlining operations by integrating crm systems and automated communication pipelines to eliminate manual admin and simplify daily workflows."
  }
];

// ------------------------------------------------------------------
// SUB-COMPONENT: Clean Editorial List Item
// ------------------------------------------------------------------
const ServiceItem = ({ item, index }: { item: { name: string, description: string }; index: number }) => {
  const ref = useRef<HTMLDivElement>(null); 
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      className="group relative flex flex-col justify-center py-6 md:py-9 border-b border-white/10 overflow-hidden cursor-pointer"
    >
      
      {/* 1. FLASHBULB EFFECT */}
      <div className="absolute inset-0 bg-white mix-blend-overlay opacity-0 group-hover:animate-flash pointer-events-none z-10" />
      
      {/* 2. HOVER BACKGROUND */}
      <div className="absolute inset-0 bg-[#FFB800]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform origin-left scale-x-0 group-hover:scale-x-100 ease-out" />

      {/* 3. CONTENT */}
      <div className="relative z-20 w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.h3 
          initial={{ y: "100%" }}
          animate={isInView ? { y: "0%" } : {}}
          transition={{ duration: 0.5, delay: index * 0.05, ease: [0.76, 0, 0.24, 1] }}
          className="font-kamerick text-xl md:text-3xl font-bold text-white group-hover:text-white group-hover:pl-6 transition-all duration-300 tracking-tight lowercase"
        >
          {item.name}
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.05 + 0.2 }}
          className="font-kamerick text-sm text-gray-400 group-hover:text-gray-300 md:text-right max-w-sm group-hover:pr-6 transition-all duration-300"
        >
          {item.description}
        </motion.p>
      </div>

    </motion.div>
  );
};

export default function CreativeServices({ hideHeader = false }: { hideHeader?: boolean }) {
  return (
    <section className="relative w-full bg-[#050505] py-24 md:py-32 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          
          {/* Left: Title & Context */}
          {!hideHeader && (
            <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/3 lg:sticky lg:top-32 self-start"
          >
            <h2 className="font-kamerick text-4xl md:text-6xl font-bold text-white tracking-tight mb-8 leading-[0.9] lowercase">
              Our <span className="text-[#FFB800]">Services</span>
            </h2>
            
            <p className="font-kamerick text-gray-400 text-sm leading-relaxed max-w-sm border-l border-white/10 pl-6">
              We provide practical expertise to shape and deliver your project, from strategy to launch.
            </p>
            </motion.div>
          )}

          {/* Right: The List (Clean) */}
          <div className={`flex flex-col ${hideHeader ? 'w-full' : 'lg:w-2/3'}`}>
            {services.map((item, index) => (
              <ServiceItem key={index} item={item} index={index} />
            ))}
          </div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes flash {
          0% { opacity: 0; }
          50% { opacity: 0.1; }
          100% { opacity: 0; }
        }
        .animate-flash {
          animation: flash 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
}