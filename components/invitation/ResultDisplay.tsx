"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface ResultDisplayProps {
  result: string;
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [confettiItems] = useState(() => {
    return [...Array(50)].map(() => ({
      x:
        Math.random() *
        (typeof window !== "undefined" ? window.innerWidth : 1000),
      rotate: Math.random() * 720 - 360,
      duration: Math.random() * 2 + 2,
      delay: Math.random() * 0.5,
      left: Math.random() * 100,
      emoji: ["🎊", "🎉", "✨", "🧧", "🏮"][Math.floor(Math.random() * 5)],
    }));
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:py-16 relative overflow-hidden">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {confettiItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{
                x: item.x,
                y: -20,
                rotate: 0,
                opacity: 1,
              }}
              animate={{
                y:
                  typeof window !== "undefined"
                    ? window.innerHeight + 20
                    : 1000,
                rotate: item.rotate,
                opacity: 0,
              }}
              transition={{
                duration: item.duration,
                delay: item.delay,
                ease: "linear",
              }}
              className="absolute"
              style={{
                left: item.left + "%",
              }}
            >
              {item.emoji}
            </motion.div>
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="max-w-2xl w-full relative z-10"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="text-6xl sm:text-7xl md:text-8xl mb-4 sm:mb-6"
          >
            🎉
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-cny-red mb-3 sm:mb-4"
          >
            Congratulations!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl sm:text-2xl text-cny-gold font-semibold mb-4 sm:mb-6"
          >
            恭喜发财 🧧
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
            className="bg-gradient-to-br from-cny-gold-light to-cny-gold rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-lg"
          >
            <p className="text-xs sm:text-sm text-cny-red-dark font-medium mb-2 uppercase tracking-wide">
              Your Prize
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-cny-red-dark break-words">
              {result}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-4"
          >
            Wishing you prosperity and good fortune in the new year!
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap gap-2 justify-center text-3xl sm:text-4xl"
          >
            🏮 🎊 🧧 ✨ 🎉
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
