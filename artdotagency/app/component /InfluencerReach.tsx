"use client";

import { motion, useInView, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Instagram, Smartphone } from "lucide-react"; 

// ------------------------------------------------------------------
// DATA CONFIGURATION
// ------------------------------------------------------------------
const metrics = [
  { value: 3.83, suffix: "M", label: "Avg Reach / Event" },
  { value: 22.97, suffix: "M+", label: "Total Impressions" },
];

const artists = [
  { 
    name: "BURNA BOY", 
    ig: "17.7M", tiktok: "6.8M",
    handle: "@burnaboygram",
    image: "/images/burna.webp", 
  },
  { 
    name: "HEADIE ONE", 
    ig: "8.48M", tiktok: "2.18M",
    handle: "@headieone",
    image: "/images/headie-one.jpg",
  },
  { 
    name: "EHIZ", 
    ig: "330K", tiktok: "12.7M", 
    handle: "@ehizufuah",
    image: "/images/ehiz.jpg",
  },
  { 
    name: "UCHE NATORI", 
    ig: "653K", tiktok: "8.35M",
    handle: "@uchjn",
    image: "/images/uche.webp",
  },
  { 
    name: "RIMZEE", 
    ig: "1.28M", tiktok: null,
    handle: "@therealrimzee",
    image: "/images/rimzee.jpg",
  },
  { 
    name: "M HUNCHO", 
    ig: "616K", tiktok: null,
    handle: "@mhuncho",
    image: "/images/mhuncho.jpg",
  },
  { 
    name: "BRUMTOWNUK", 
    ig: "35K", tiktok: "556",
    handle: "@brumtownuk",
    image: "/images/brum.jpg",
  },
];

// ------------------------------------------------------------------
// SUB-COMPONENT: Rolling Counter (Odometer Effect)
// ------------------------------------------------------------------
const RollingCounter = ({ value }: { value: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    duration: 2 // Long duration for dramatic effect
  });
  
  const displayValue = useTransform(springValue, (latest) => latest.toFixed(2));

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

// ------------------------------------------------------------------
// SUB-COMPONENT: Cinematic Artist Card
// ------------------------------------------------------------------
const ArtistCard = ({ artist, index }: { artist: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div
      // ENTRANCE ANIMATION: Blur -> Focus + Slide Up
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative w-full h-[350px] bg-[#0F0F0F] border border-white/5 overflow-hidden cursor-none" // added cursor-none if you have custom cursor
    >
      
      {/* 1. IMAGE LAYER (Ken Burns Zoom Effect) */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out will-change-transform"
            style={{ 
                backgroundImage: `url(${artist.image})`,
                transform: isHovered ? "scale(1.1)" : "scale(1.0)" // Subtle zoom on hover
            }}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
        
        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
      </div>

      {/* 2. VIDEO LAYER (Optional: Add <video> tag here if you have sources) */}
      {/* <video ref={videoRef} ... className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500" /> */}

      {/* 3. INFO LAYER */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end z-20 pointer-events-none">
        
        {/* Handle (Top Left) - Slide In */}
        <div className="absolute top-4 left-4 overflow-hidden">
           <motion.div 
             initial={{ y: -20, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.5 + (index * 0.1) }}
           >
                <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-[9px] font-kamerick uppercase tracking-widest border border-white/10 rounded-sm">
                {artist.handle}
                </span>
           </motion.div>
        </div>

        {/* Name & Stats Container */}
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          
          {/* Name */}
          <h3 className="font-kamerick text-2xl md:text-3xl font-bold text-white uppercase tracking-tight leading-none drop-shadow-md mb-2">
            {artist.name}
          </h3>
          
          {/* Stats: Reveal on Hover */}
          <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
            <div className="flex items-center gap-1.5">
              <Instagram className="w-3 h-3 text-[#FFB800]" />
              <span className="font-kamerick text-sm font-bold text-white">{artist.ig}</span>
            </div>
            
            {artist.tiktok && (
              <div className="flex items-center gap-1.5 border-l border-white/30 pl-4">
                <Smartphone className="w-3 h-3 text-[#FFB800]" />
                <span className="font-kamerick text-sm font-bold text-white">{artist.tiktok}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function InfluencerReach() {
  return (
    <section id="reach" className="relative w-full bg-[#050505] py-24 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* ------------------------------------------------------- */}
        {/* 1. METRICS ROW (The "Odometer" Effect)                  */}
        {/* ------------------------------------------------------- */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-12 mb-16 gap-8">
            
            {/* Title Section */}
            <div className="flex flex-col gap-2">
                 <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="font-kamerick text-[#FFB800] text-[10px] tracking-[0.2em] uppercase"
                 >
                  The Network
                </motion.span>
                
                <div className="overflow-hidden">
                    <motion.h2 
                        initial={{ y: "100%" }}
                        whileInView={{ y: "0%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        className="font-kamerick text-3xl md:text-4xl font-bold text-white uppercase tracking-tight"
                    >
                        Renowned <br /> Artists
                    </motion.h2>
                </div>
            </div>

            {/* Metrics: Rolling Counters */}
            <div className="flex gap-12 md:gap-24">
                {metrics.map((metric, i) => (
                    <div key={i} className="flex flex-col">
                        <span className="font-kamerick text-4xl md:text-5xl font-bold text-white tracking-tighter flex items-baseline">
                            {/* Animated Number */}
                            <RollingCounter value={metric.value} />
                            <span className="text-[#FFB800] text-2xl md:text-3xl ml-1">{metric.suffix}</span>
                        </span>
                        
                        <motion.span 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + (i * 0.2) }}
                            className="font-kamerick text-gray-500 text-[10px] uppercase tracking-widest mt-1"
                        >
                            {metric.label}
                        </motion.span>
                    </div>
                ))}
            </div>
        </div>

        {/* ------------------------------------------------------- */}
        {/* 2. CINEMATIC ARTIST GRID                                */}
        {/* ------------------------------------------------------- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {artists.map((artist, index) => (
            <div 
              key={index}
              className={`${index < 2 ? 'lg:col-span-2 col-span-2' : 'col-span-2 md:col-span-1'}`}
            >
              <ArtistCard artist={artist} index={index} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}