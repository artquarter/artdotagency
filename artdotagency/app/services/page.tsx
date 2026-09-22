"use client";

import { motion } from "framer-motion";
import Cursor from "../component /Cursor";
import Footer from "../component /Footer";

const expandedServices = [
  {
    name: "Strategy and advisory",
    desc: "Defining commercial or cultural goals and outlining an actionable roadmap to achieve them.",
    outputs: "Audience research, feasibility assessments, masterplans, and strategic roadmaps.",
    example: "Evaluating community needs to position the AQ Foodhall within Digbeth's cultural landscape."
  },
  {
    name: "Funding and bids",
    desc: "Identifying funding opportunities and developing competitive bids to secure necessary capital.",
    outputs: "Funding strategy, bid writing, budget planning, and grant compliance reporting.",
    example: "Securing the £29,496.60 UKSPF capital grant for the inclusive community LED screen."
  },
  {
    name: "Brands and places",
    desc: "Creating distinctive brand identities and shaping physical environments that connect with people.",
    outputs: "Brand identity, spatial design, and environmental wayfinding.",
    example: "Establishing the distinctive brand and physical environment for Art Barbers."
  },
  {
    name: "Mobilisation and delivery",
    desc: "Preparing teams, partners, schedules and operations for a successful launch and practical delivery.",
    outputs: "Operational schedules, team onboarding, partner coordination, and launch management.",
    example: "Coordinating the multi-vendor operations and launch of the AQ Foodhall."
  },
  {
    name: "Events and experiences",
    desc: "Producing live, temporary experiences that engage audiences directly.",
    outputs: "Event production, programming, technical coordination, and live management.",
    example: "Delivering 22 live community screening events."
  },
  {
    name: "Programmes and training",
    desc: "Designing and leading structured, ongoing activity delivered over time.",
    outputs: "Curriculum design, cohort management, partnership coordination, and progression tracking.",
    example: "Leading the Content Creator Training Programme with SCCB, securing 14 learner completions."
  },
  {
    name: "Marketing and content",
    desc: "Supporting communication and audience engagement through planned campaigns and content creation.",
    outputs: "Campaign strategy, copywriting, social media management, and audience reporting.",
    example: "Building audience engagement across the Art Quarter ecosystem.",
    subOffer: {
      title: "Content Programme",
      desc: "An agreed programme bringing together content planning, photography, video, written content, publishing and performance review. Available as a defined project or retained support, subject to confirmed delivery capabilities."
    }
  },
  {
    name: "ai and business automation",
    desc: "streamlining operations by integrating crm systems and automated communication pipelines to eliminate manual admin and simplify daily workflows.",
    outputs: "CRM configuration, custom workflow automation, and digital infrastructure integration.",
    example: "Implementing automated data pipelines and ticketing infrastructure to support scalable delivery."
  }
];

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
          <h1 className="text-4xl md:text-6xl font-bold lowercase tracking-tighter font-kamerick max-w-4xl mb-8">
            The expertise to shape and deliver your project
          </h1>
          <p className="text-xl md:text-2xl font-kamerick text-gray-400 max-w-4xl">
            Start with the support you need now. We can lead a complete project or take responsibility for a defined part, from strategy and funding development to creative production, mobilisation and delivery.
          </p>
        </motion.div>
        
        {/* Detailed Services List */}
        <div className="mb-32 flex flex-col gap-12 lg:gap-16">
          {expandedServices.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0F0F0F] border border-white/5 p-8 md:p-12 flex flex-col md:flex-row gap-8 lg:gap-16"
            >
              <div className="md:w-1/3">
                <h2 className="text-2xl md:text-3xl font-bold lowercase tracking-tight font-kamerick text-white mb-4">
                  {service.name}
                </h2>
                <p className="text-gray-400 text-sm font-kamerick leading-relaxed">
                  {service.desc}
                </p>
              </div>
              
              <div className="md:w-2/3 flex flex-col gap-6">
                <div>
                  <h3 className="text-[#FFB800] text-xs lowercase tracking-[0.2em] font-kamerick mb-2">typical outputs</h3>
                  <p className="text-gray-300 font-kamerick text-sm">{service.outputs}</p>
                </div>
                <div>
                  <h3 className="text-[#FFB800] text-xs lowercase tracking-[0.2em] font-kamerick mb-2">relevant example</h3>
                  <p className="text-gray-300 font-kamerick text-sm">{service.example}</p>
                </div>
                
                {service.subOffer && (
                  <div className="mt-4 p-6 border border-[#FFB800]/30 bg-[#FFB800]/5">
                    <h3 className="text-white text-lg font-bold lowercase font-kamerick mb-2">{service.subOffer.title}</h3>
                    <p className="text-gray-400 font-kamerick text-sm leading-relaxed">{service.subOffer.desc}</p>
                  </div>
                )}
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
