"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LuckyDrawProps {
  onDraw: () => Promise<void>;
  loading: boolean;
}

export default function LuckyDraw({ onDraw, loading }: LuckyDrawProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleDraw = async () => {
    setIsAnimating(true);
    await onDraw();
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:py-16">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3">
            Lucky Draw Time!
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-cny-gold-light px-4">
            Tap the red envelope to reveal your prize 🎁
          </p>
        </motion.div>

        <div className="relative flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
          <AnimatePresence>
            {!loading && !isAnimating && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, -2, 2, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="cursor-pointer"
                  onClick={handleDraw}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-32 h-44 sm:w-40 sm:h-56 md:w-48 md:h-64 bg-gradient-to-br from-cny-red via-cny-crimson to-cny-red-dark rounded-xl sm:rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden"
                  >
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(251, 191, 36, 0.5)",
                          "0 0 40px rgba(251, 191, 36, 0.8)",
                          "0 0 20px rgba(251, 191, 36, 0.5)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-xl sm:rounded-2xl"
                    />

                    <div className="relative z-10">
                      <div className="text-5xl sm:text-6xl md:text-8xl mb-1 sm:mb-2">
                        🧧
                      </div>
                      <div className="text-cny-gold font-bold text-lg sm:text-xl md:text-2xl">
                        福
                      </div>
                    </div>

                    <div className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-cny-gold rounded-full"></div>
                    <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 w-10 sm:w-12 md:w-16 h-0.5 sm:h-1 bg-cny-gold rounded-full"></div>
                  </motion.div>
                </motion.div>

                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-4 sm:mt-6 text-white text-base sm:text-lg font-medium"
                >
                  Tap to open 👆
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {(loading || isAnimating) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 360,
              }}
              transition={{
                rotate: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
              className="w-32 h-44 sm:w-40 sm:h-56 md:w-48 md:h-64"
            >
              <div className="w-full h-full bg-gradient-to-br from-cny-red via-cny-gold to-cny-red-dark rounded-xl sm:rounded-2xl shadow-2xl flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                  className="text-5xl sm:text-6xl md:text-8xl"
                >
                  🧧
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>

        <p className="mt-8 text-white/70 text-sm">One lucky draw per session</p>
      </div>
    </div>
  );
}
