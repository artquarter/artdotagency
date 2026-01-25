"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function Preloader({ onFinish }: { onFinish: () => void }) {
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    
    let current = Math.floor(Math.random() * 10) + 10;

    const interval = setInterval(() => {
      // 2. RANDOM JUMPS
      const jump = Math.floor(Math.random() * 10) + 1;
      current += jump;

      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setCount(100); 

        // 3. MICRO-PAUSE & TRIGGER
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(() => {
              if (onFinish) onFinish();
          }, 200); 
        }, 200);

      } else {
        setCount(current);
      }
    }, 30); 

    return () => clearInterval(interval);
  }, [onFinish]);

  const shutterVariants: Variants = {
    initial: { height: "100%" },
    exit: (i: number) => ({
      height: "0%",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as const, 
        delay: i * 0.08, 
      },
    }),
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.1, delay: 1.2 }}
            className="fixed inset-0 z-[9999] flex pointer-events-none"
        >
            {/* Background Noise */}
            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          
            {/* THE 5 SHUTTERS */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={shutterVariants}
                  initial="initial"
                  exit="exit"
                  className="w-1/5 bg-[#050505] relative border-r border-white/5 last:border-r-0 origin-top"
                />
            ))}

            {/* THE NUMBER */}
            <motion.div
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex flex-col items-center justify-center z-20 mix-blend-difference"
            >
                <h1 className="font-kamerick text-[15vw] md:text-[12rem] font-bold text-[#FFB800] tracking-tighter leading-none">
                {count}
                </h1>
            </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}