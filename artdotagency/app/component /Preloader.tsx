"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onFinish }: { onFinish: () => void }) {
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // 1. KICKSTART: Start at random ~12% so it feels instant (Fixes "takes forever")
    let current = Math.floor(Math.random() * 10) + 10;
    setCount(current);

    const interval = setInterval(() => {
      // 2. RANDOM JUMPS
      const jump = Math.floor(Math.random() * 10) + 1;
      current += jump;

      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setCount(100); // Force the 100 update first

        // 3. MICRO-PAUSE (200ms): 
        // This is critical. It lets React paint "100" on screen 
        // BEFORE we tell it to unmount. Fixes the "96" bug.
        setTimeout(() => {
          setIsComplete(true);
          if (onFinish) onFinish();
        }, 200);

      } else {
        setCount(current);
      }
    }, 20); // Fast tick rate

    return () => clearInterval(interval);
  }, [onFinish]);

  const shutterVariants = {
    initial: { clipPath: "inset(0 0 0 0)" },
    exit: (i: number) => ({
      clipPath: "inset(100% 0 0 0)",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1], // Cinematic Ease
        delay: i * 0.05, // Stagger
      },
    }),
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <div className="fixed inset-0 z-[9999] flex pointer-events-none">
          
          {/* THE 5 SHUTTERS */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={shutterVariants}
              initial="initial"
              exit="exit"
              className="w-1/5 h-full bg-[#050505] relative border-r border-white/5 last:border-r-0"
            />
          ))}

          {/* THE NUMBER */}
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            <h1 className="font-kamerick text-[15vw] md:text-[12rem] font-bold text-[#FFB800] tracking-tighter leading-none mix-blend-difference">
              {count}
            </h1>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}