"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../component /Footer";
import Cursor from "../component /Cursor";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const servicesList = [
    "strategy and advisory",
    "funding and bids",
    "brands and places",
    "mobilisation and delivery",
    "events and experiences",
    "programmes and training",
    "marketing and content",
    "initial review",
    "ongoing support",
    "not sure yet"
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      organisation: formData.get("organisation"),
      email: formData.get("email"),
      typeOfSupport: formData.get("typeOfSupport"),
      budget: formData.get("budget"),
      goals: formData.get("goals"),
      deadline: formData.get("deadline")
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <main className="bg-[#050505] min-h-screen text-white">
      <Cursor />
      <div className="container mx-auto px-6 py-32 relative z-10 min-h-screen flex flex-col justify-center">
        <div className="max-w-3xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <h1 className="font-kamerick text-4xl md:text-6xl font-bold mb-6 tracking-tight lowercase">
              discuss a <span className="text-[#FFB800]">project</span>
            </h1>
            <p className="font-kamerick text-gray-400 text-sm md:text-lg lowercase tracking-widest max-w-xl mx-auto">
              tell us about your organisation, the opportunity and any date that matters.
            </p>
          </motion.div>

          {status === "success" ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0F0F0F] border border-[#FFB800]/30 text-[#FFB800] p-12 text-center"
            >
              <h2 className="font-kamerick text-3xl font-bold mb-4 lowercase">thank you</h2>
              <p className="font-kamerick text-gray-400 tracking-widest lowercase text-sm">your enquiry has been received. we will review it and consider the next step.</p>
            </motion.div>
          ) : (
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit} 
              className="space-y-8 bg-[#0F0F0F] border border-white/5 p-8 md:p-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className="block font-kamerick text-xs text-gray-400 lowercase tracking-widest mb-2">your name *</label>
                  <input type="text" id="name" name="name" required className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#FFB800] transition-colors" />
                </div>
                <div>
                  <label htmlFor="organisation" className="block font-kamerick text-xs text-gray-400 lowercase tracking-widest mb-2">organisation *</label>
                  <input type="text" id="organisation" name="organisation" required className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#FFB800] transition-colors" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block font-kamerick text-xs text-gray-400 lowercase tracking-widest mb-2">email *</label>
                <input type="email" id="email" name="email" required className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#FFB800] transition-colors" />
              </div>

              <div>
                <label htmlFor="typeOfSupport" className="block font-kamerick text-xs text-gray-400 lowercase tracking-widest mb-2">type of support</label>
                <select id="typeOfSupport" name="typeOfSupport" className="w-full bg-black/50 border border-white/10 px-4 py-3 text-gray-400 focus:outline-none focus:border-[#FFB800] transition-colors appearance-none lowercase">
                  <option value="">select an option</option>
                  {servicesList.map((service, index) => (
                    <option key={index} value={service} className="bg-[#050505]">{service}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="budget" className="block font-kamerick text-xs text-gray-400 lowercase tracking-widest mb-2">indicative project budget</label>
                  <input type="text" id="budget" name="budget" placeholder="prefer to discuss" className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#FFB800] transition-colors placeholder:text-gray-600 lowercase" />
                </div>
                <div>
                  <label htmlFor="deadline" className="block font-kamerick text-xs text-gray-400 lowercase tracking-widest mb-2">deadline or important date</label>
                  <input type="text" id="deadline" name="deadline" className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#FFB800] transition-colors" />
                </div>
              </div>

              <div>
                <label htmlFor="goals" className="block font-kamerick text-xs text-gray-400 lowercase tracking-widest mb-2">what are you trying to achieve? *</label>
                <textarea id="goals" name="goals" required rows={5} className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#FFB800] transition-colors resize-none"></textarea>
              </div>

              {status === "error" && (
                <div className="text-red-500 font-kamerick text-xs lowercase tracking-widest text-center">
                  something went wrong. please try again.
                </div>
              )}

              <button 
                type="submit" 
                disabled={status === "submitting"}
                className="w-full px-8 py-5 bg-[#FFB800] text-black font-kamerick text-sm font-bold lowercase tracking-widest hover:bg-white transition-colors disabled:opacity-50"
              >
                {status === "submitting" ? "submitting..." : "submit enquiry"}
              </button>
            </motion.form>
          )}
        </div>
      </div>
      <div className="relative z-10 bg-[#050505]">
        <Footer />
      </div>
    </main>
  );
}

