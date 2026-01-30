"use client";

import { motion } from "framer-motion";
import { Check, Mic2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

// ------------------------------------------------------------------
// DATA CONFIGURATION
// ------------------------------------------------------------------
const packages = [
  {
    id: "CH 01",
    title: "BASIC",
    price: "£599",
    level: 35,
    features: [
      "Basic content guidance",
      "Video topic planning",
      "Studio-based shooting",
      "Professional camera use",
      "Lighting & audio setup",
      "Full video editing",
      "Basic colour & sound correction",
      "Custom thumbnail design",
      "Basic YouTube SEO",
      "Two revision rounds"
    ]
  },
  {
    id: "CH 02",
    title: "ADVANCED",
    price: "£999",
    level: 65,
    isPopular: true,
    features: [
      "Content planning guidance",
      "Video topic structuring",
      "Studio-based video shooting",
      "Professional camera setup",
      "Lighting & audio setup",
      "Full video editing",
      "Colour correction & sound",
      "Custom thumbnail design",
      "YouTube SEO basics",
      "Two revision rounds"
    ]
  },
  {
    id: "CH 03",
    title: "PREMIUM",
    price: "£1,799",
    level: 100,
    features: [
      "YouTube content strategy",
      "Video planning & scheduling",
      "Studio-based video shooting",
      "Professional camera setup",
      "Lighting & audio setup",
      "Full video editing",
      "Colour correction & sound",
      "Custom thumbnail design",
      "YouTube SEO optimisation",
      "Two revision rounds"
    ]
  }
];

const hourlyOptions = [
  {
    id: "CH 04",
    title: "STUDIO SESSION",
    price: "£299",
    type: "Hourly",
    features: [
      "Professional studio access",
      "Camera, lighting & audio",
      "Multi-video recording",
      "Full video editing",
      "Thumbnail per video",
      "Two revision rounds"
    ]
  },
  {
    id: "CH 05",
    title: "STUDIO RENT",
    price: "£199",
    type: "Hourly",
    features: [
      "Professional studio access",
      "2 professional cameras",
      "Professional lighting",
      "Pod mics & collar mics",
      "Full equipment access"
    ]
  }
];

// ------------------------------------------------------------------
// SUB-COMPONENT: Vertical Battery Meter
// ------------------------------------------------------------------
const BatteryMeter = ({ level }: { level: number }) => (
  <div className="w-8 h-24 border border-white/20 rounded-sm p-1 relative mx-auto my-6">
    {/* Battery Cap */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-4 h-2 border-t border-x border-white/20 rounded-t-sm" />
    
    {/* Fill Level */}
    <div className="w-full h-full flex flex-col justify-end gap-0.5">
       <motion.div 
         initial={{ height: 0 }}
         whileInView={{ height: `${level}%` }}
         viewport={{ once: true }}
         transition={{ duration: 1, ease: "easeOut" }}
         className="w-full bg-[#FFB800] opacity-80 rounded-sm shadow-[0_0_15px_#FFB800]"
       />
    </div>
  </div>
);

export default function Pricing() {
  // --------------------------------------------------------
  // SLIDER LOGIC
  // --------------------------------------------------------
  const [sliderValue, setSliderValue] = useState(50); // 0 to 100
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Helper to convert 0-100 to Time (06:00 - 18:00)
  const formatTime = (val: number) => {
    const totalMinutes = 720; // 12 hours * 60 mins
    const startMinutes = 360; // 06:00 start
    const currentMinutes = startMinutes + (val / 100) * totalMinutes;
    
    const hours = Math.floor(currentMinutes / 60);
    const minutes = Math.floor(currentMinutes % 60);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    // Simple formatting
    const displayHours = hours > 12 ? hours - 12 : hours;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    
    return `${displayHours}:${displayMinutes} ${ampm}`;
  };

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    
    // Calculate percentage
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    // Clamp between 0 and 100
    percentage = Math.max(0, Math.min(100, percentage));
    
    setSliderValue(percentage);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleInteraction(e);
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      let percentage = ((clientX - rect.left) / rect.width) * 100;
      percentage = Math.max(0, Math.min(100, percentage));
      setSliderValue(percentage);
    };

    const handleUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleUp);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('touchend', handleUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging]);

  // --------------------------------------------------------
  // EMAIL HANDLERS (New Logic Added Here)
  // --------------------------------------------------------

  // 1. For Standard Packages
  const handleStartProject = (pkg: any) => {
    const subject = `Project Inquiry: ${pkg.title} Package`;
    const body = `Hi Team,\n\nI am interested in starting a project with the ${pkg.title} package (${pkg.price}).\n\nPlease let me know the next steps.\n\nBest,`;
    
    window.location.href = `mailto:info@artdotagency.co.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // 2. For Hourly Bookings (Uses Slider Time)
  const handleBookHourly = (opt: any) => {
    const selectedTime = formatTime(sliderValue); // Get current slider time
    const subject = `Booking Request: ${opt.title} @ ${selectedTime}`;
    const body = `Hi Team,\n\nI would like to book the ${opt.title} service (${opt.price}) for around ${selectedTime}.\n\nPlease confirm availability for this time slot.\n\nBest,`;
    
    window.location.href = `mailto:info@artdotagency.co.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="pricing" className="relative w-full bg-[#050505] py-24 md:py-32 border-t border-white/5 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,#1a1a1a_0%,transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
             <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-[#FFB800]" />
              <span className="font-kamerick text-[#FFB800] text-[10px] tracking-[0.2em] uppercase">
                07 — Pricing
              </span>
              <div className="w-12 h-[1px] bg-[#FFB800]" />
            </div>
            <h2 className="font-kamerick text-3xl md:text-5xl font-bold text-white uppercase tracking-tight">
              Packages & <span className="text-[#FFB800]">Rates</span>
            </h2>
          </motion.div>
        </div>

        {/* --------------------------------------------------------- */}
        {/* 1. MAIN PACKAGES GRID                                     */}
        {/* --------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24 items-start">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative group p-8 md:p-10 border rounded-2xl transition-all duration-500 flex flex-col
                ${pkg.isPopular 
                  ? "bg-[#0A0A0A] border-[#FFB800] shadow-[0_0_30px_-10px_rgba(255,184,0,0.15)]" 
                  : "bg-[#0F0F0F] border-white/5 hover:border-white/20"}
              `}
            >
              {pkg.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFB800] text-black px-4 py-1 rounded-full">
                  <span className="font-kamerick text-[10px] font-bold uppercase tracking-widest">
                    Popular
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 text-gray-500">
                  <span className="text-[10px] font-kamerick uppercase tracking-widest border border-white/10 px-2 py-0.5 rounded-sm">
                    SOLO
                  </span>
                  <Mic2 className="w-3 h-3" />
                </div>
                {pkg.isPopular && <div className="w-2 h-2 rounded-full bg-[#FFB800] shadow-[0_0_10px_#FFB800]" />}
              </div>

              <div className="text-center mb-6">
                <span className="block font-kamerick text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-2">
                  {pkg.id}
                </span>
                <h3 className={`font-kamerick text-2xl font-bold uppercase tracking-tight mb-1 ${pkg.isPopular ? 'text-[#FFB800]' : 'text-white'}`}>
                  {pkg.title}
                </h3>
                <span className="block font-kamerick text-gray-400 text-xs uppercase tracking-wider">
                  Package
                </span>
              </div>

              <BatteryMeter level={pkg.level} />

              <div className="text-center mb-8">
                 <span className="font-kamerick text-4xl md:text-5xl font-bold text-white tracking-tighter">
                   {pkg.price}
                 </span>
              </div>

              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

              <ul className="flex flex-col gap-3 mb-10 flex-grow">
                {pkg.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#FFB800] mt-0.5 flex-shrink-0" />
                    <span className="font-kamerick text-sm text-gray-300 leading-snug">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <button 
                // ADDED: onClick handler for Packages
                onClick={() => handleStartProject(pkg)}
                className={`w-full py-4 uppercase font-kamerick text-xs font-bold tracking-[0.2em] transition-all duration-300
                  ${pkg.isPopular 
                    ? "bg-[#FFB800] text-black hover:bg-white" 
                    : "bg-white/5 text-white hover:bg-white hover:text-black"}
                `}
              >
                Start A Project
              </button>
            </motion.div>
          ))}
        </div>

        {/* --------------------------------------------------------- */}
        {/* 2. HOURLY OPTIONS & INTERACTIVE SLIDER                    */}
        {/* --------------------------------------------------------- */}
        <div className="border-t border-white/10 pt-16">
          
          <div className="flex items-center gap-4 mb-12 justify-center">
             <span className="font-kamerick text-[#FFB800] text-[10px] tracking-[0.2em] uppercase">
               Hourly Options
             </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {hourlyOptions.map((opt, index) => (
              <motion.div
                key={opt.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + (index * 0.1) }}
                className="bg-[#0F0F0F] border border-white/5 p-8 flex flex-col hover:border-[#FFB800]/30 transition-colors"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="font-kamerick text-gray-500 text-[10px] uppercase tracking-[0.2em] block mb-1">
                      {opt.id}
                    </span>
                    <h3 className="font-kamerick text-xl font-bold text-white uppercase tracking-tight">
                      {opt.title}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="block font-kamerick text-2xl font-bold text-[#FFB800]">{opt.price}</span>
                    <span className="block font-kamerick text-[10px] text-gray-500 uppercase">Per Hour</span>
                  </div>
                </div>

                <ul className="flex flex-col gap-2 mb-8">
                  {opt.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-3">
                        <div className="w-1 h-1 bg-gray-500 rounded-full" />
                        <span className="font-kamerick text-sm text-gray-400">{feat}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  // ADDED: onClick handler for Hourly Booking
                  onClick={() => handleBookHourly(opt)}
                  className="w-full py-3 border border-white/10 text-white font-kamerick text-[10px] uppercase tracking-[0.2em] hover:border-[#FFB800] hover:text-[#FFB800] transition-colors mt-auto"
                >
                   Book {opt.type}
                </button>

              </motion.div>
            ))}
          </div>

          {/* ------------------------------------------------------- */}
          {/* 3. WORKING TIME SLIDER                                  */}
          {/* ------------------------------------------------------- */}
          <div className="max-w-3xl mx-auto px-4">
             {/* Slider Labels */}
             <div className="flex justify-between items-center mb-4 select-none">
                <span className="font-mono text-[#FFB800] text-xs">06:00 AM</span>
                <span className="font-mono text-gray-600 text-[10px] uppercase tracking-widest hidden md:block">
                  Drag to Select Time
                </span>
                <span className="font-mono text-gray-500 text-xs">06:00 PM</span>
             </div>
             
             {/* Slider Container */}
             <div 
               ref={sliderRef}
               onMouseDown={handleMouseDown}
               onTouchStart={handleInteraction}
               className="relative h-12 bg-[#0A0A0A] border border-white/10 rounded-full flex items-center px-2 cursor-pointer touch-none select-none hover:border-[#FFB800]/50 transition-colors"
             >
                
                {/* Background Ticks (Visual) */}
                <div className="absolute inset-0 flex justify-between px-6 items-center pointer-events-none">
                   {[...Array(13)].map((_, i) => (
                      <div key={i} className={`w-[1px] ${i % 3 === 0 ? 'bg-white/30 h-4' : 'bg-white/10 h-2'}`} />
                   ))}
                </div>

                {/* Left Fill Line (Dynamic) */}
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#FFB800]/50 pointer-events-none" 
                  style={{ width: `${sliderValue}%` }}
                />

                {/* Draggable Thumb (Dynamic) */}
                <div 
                   className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-[#FFB800] rounded-full shadow-[0_0_20px_#FFB800] flex items-center justify-center group z-10 hover:scale-110 transition-transform"
                   style={{ left: `calc(${sliderValue}% - 16px)` }}
                >
                   <div className="w-2 h-2 bg-black rounded-full" />
                   
                   {/* Dynamic Tooltip (Shows Actual Time) */}
                   <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black px-3 py-1.5 text-xs font-bold font-kamerick rounded opacity-100 shadow-lg whitespace-nowrap">
                      {formatTime(sliderValue)}
                      <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
                   </div>
                </div>

             </div>
          </div>

        </div>
      </div>
    </section>
  );
}