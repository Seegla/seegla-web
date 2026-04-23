"use client";

import { motion } from "framer-motion";

export default function LivingBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Primary Teal Blob */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-teal/10 rounded-full blur-[120px]"
      />

      {/* Secondary Coral Blob */}
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 120, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] bg-brand-coral/5 rounded-full blur-[100px]"
      />

      {/* Deep Navy Accent */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[10%] left-[20%] w-[60%] h-[60%] bg-brand-navy/30 rounded-full blur-[150px]"
      />

      {/* Bottom Right Teal Glow */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-teal/5 rounded-full blur-[100px]"
      />
    </div>
  );
}
