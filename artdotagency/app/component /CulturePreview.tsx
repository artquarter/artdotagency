"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const cultureItems = [
  {
    title: "The Creator Economy and Birmingham’s Next Generation",
    desc: "A strategic paper exploring how Birmingham could support emerging creators through skills, infrastructure, enterprise development and a more coordinated approach to investment.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    link: "/insights"
  },
  {
    title: "Screening Programme Report",
    desc: "This report records the delivery of a UKSPF funded LED screen and a programme of public screenings at AQ Foodhall.",
    image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80&w=800",
    link: "/insights"
  },
  {
    title: "Content Creator Training Report",
    desc: "The April 2026 stakeholder report reviews the second content creator programme cohort delivered by Art Quarter with South and City College Birmingham.",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800",
    link: "/insights"
  }
];

export default function CulturePreview() {
  return (
    <section className="relative w-full bg-[#050505] py-24 md:py-32 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="font-kamerick text-4xl md:text-6xl font-bold text-white tracking-tight lowercase">
              Insights & <br/><span className="text-gray-600">reports</span>
            </h2>
          </div>
          <Link 
            href="/insights"
            className="group flex items-center gap-3 text-xs font-kamerick tracking-widest text-[#FFB800] hover:text-white transition-colors lowercase"
          >
            view all insights
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Horizontal Scroll Area / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cultureItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group cursor-pointer block h-full flex flex-col"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#0F0F0F] mb-6">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                
                {/* Yellow overlay on hover */}
                <div className="absolute inset-0 bg-[#FFB800]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
              </div>

              {/* Text */}
              <div className="flex-grow">
                <h3 className="font-kamerick text-xl font-bold text-white mb-3 group-hover:text-[#FFB800] transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="font-kamerick text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}