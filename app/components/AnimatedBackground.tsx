"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      
      {/* GRADIENT BASE */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-black" />

      {/* BLOB 1 */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-20 left-20 w-72 h-72 rounded-full bg-purple-500/20 blur-3xl"
      />

      {/* BLOB 2 */}
      <motion.div
        animate={{ x: [0, -60, 0], y: [0, 50, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
        className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-cyan-400/20 blur-3xl"
      />

      {/* BLOB 3 */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-pink-500/15 blur-3xl"
      />
    </div>
  );
}
