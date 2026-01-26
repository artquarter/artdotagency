"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position state
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth physics for the follower ring
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16); // Center the ring (32px width / 2)
      mouseY.set(e.clientY - 16);
    };

    // Detect hover on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "BUTTON" || target.tagName === "A" || target.closest("a") || target.closest("button")) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* 1. The Small Dot (Instant) */}
      <motion.div
        // ADDED: 'hidden md:block' to hide on mobile
        className="hidden md:block fixed top-0 left-0 w-2 h-2 bg-[#FFB800] rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ 
            translateX: mouseX, 
            translateY: mouseY,
            x: 12, // Manual offset to center inside the ring
            y: 12 
        }}
      />

      {/* 2. The Follower Ring (Smooth) */}
      <motion.div
        // ADDED: 'hidden md:block' to hide on mobile
        className="hidden md:block fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{ translateX: cursorX, translateY: cursorY }}
        animate={{
          scale: isHovered ? 2.5 : 1, // Expands on hover
          backgroundColor: isHovered ? "rgba(255, 184, 0, 0.1)" : "transparent",
          borderColor: isHovered ? "#FFB800" : "rgba(255, 255, 255, 0.5)",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}