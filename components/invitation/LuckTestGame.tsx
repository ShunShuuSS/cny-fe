"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LuckTestGameProps {
  onComplete: (score: number) => void;
  onProceed: () => void;
  loading: boolean;
  score: number | null;
}

interface ConfettiParticle {
  id: number;
  y: number;
  x: number;
  rotate: number;
  color: string;
}

// Generate confetti particle animations
function generateConfettiParticles(count: number = 20): ConfettiParticle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    y: Math.random() * -200 - 100,
    x: (Math.random() - 0.5) * 400,
    rotate: Math.random() * 360,
    color: ["#fbbf24", "#ef4444", "#ec4899", "#8b5cf6"][
      Math.floor(Math.random() * 4)
    ],
  }));
}

// Generate random amounts totaling 666,888 with min 10,000 per envelope
function generateAngpaoAmounts(
  total: number = 666888,
  count: number = 15,
  min: number = 10000,
): number[] {
  const amounts: number[] = [];
  let remaining = total;

  // Generate random amounts for first (count - 1) envelopes
  for (let i = 0; i < count - 1; i++) {
    const maxPossible = remaining - (count - i - 1) * min;
    const amount = Math.floor(Math.random() * (maxPossible - min + 1)) + min;
    amounts.push(amount);
    remaining -= amount;
  }

  // Last envelope gets whatever is remaining
  amounts.push(remaining);

  // Shuffle array to randomize positions
  for (let i = amounts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [amounts[i], amounts[j]] = [amounts[j], amounts[i]];
  }

  return amounts;
}

function formatCurrency(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

export default function LuckTestGame({
  onComplete,
  onProceed,
  loading,
  score,
}: LuckTestGameProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [showMyBCAModal, setShowMyBCAModal] = useState(false);
  const [animationStage, setAnimationStage] = useState<
    "idle" | "selecting" | "shaking" | "opening" | "revealing" | "complete"
  >("idle");

  // Generate amounts and confetti only once on mount
  const amounts = useMemo(() => generateAngpaoAmounts(), []);
  const confettiParticles = useMemo(() => generateConfettiParticles(), []);

  const handleEnvelopeClick = (index: number) => {
    if (selectedIndex !== null || score !== null || isOpening) return;

    setSelectedIndex(index);
    setAnimationStage("selecting");
    setIsOpening(true);

    // Animation sequence
    setTimeout(() => setAnimationStage("shaking"), 500);
    setTimeout(() => setAnimationStage("opening"), 1500);
    setTimeout(() => setAnimationStage("revealing"), 2500);
    setTimeout(() => {
      setAnimationStage("complete");
      setIsOpening(false);
      onComplete(amounts[index]);
    }, 3500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl w-full"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-bold text-cny-gold text-center mb-4"
        >
          Pick Your Lucky Angpao! 🧧
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-white text-lg mb-8"
        >
          Choose wisely - one contains your fortune!
        </motion.p>

        <AnimatePresence mode="wait">
          {score === null ? (
            <motion.div
              key="envelopes"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 mb-8"
            >
              {amounts.map((amount, index) => {
                const isSelected = selectedIndex === index;
                const shouldFade = selectedIndex !== null && !isSelected;

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleEnvelopeClick(index)}
                    disabled={isOpening || selectedIndex !== null}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: shouldFade ? 0.3 : 1,
                      scale:
                        isSelected && animationStage === "shaking"
                          ? [1, 1.05, 0.95, 1.05, 1]
                          : isSelected
                            ? 1.1
                            : 1,
                      y: shouldFade ? 0 : [0, -8, 0],
                      rotate:
                        isSelected && animationStage === "shaking"
                          ? [0, -3, 3, -3, 0]
                          : 0,
                    }}
                    transition={{
                      opacity: { duration: 0.3 },
                      scale: { duration: 0.3 },
                      y: {
                        duration: 2,
                        repeat: shouldFade ? 0 : Infinity,
                        ease: "easeInOut",
                        delay: index * 0.1,
                      },
                      rotate: {
                        duration: 0.5,
                        repeat: animationStage === "shaking" ? 3 : 0,
                      },
                    }}
                    whileHover={
                      !isOpening && selectedIndex === null
                        ? { scale: 1.05, y: -4 }
                        : {}
                    }
                    className="relative aspect-[3/4] bg-gradient-to-br from-red-600 to-red-700 rounded-lg shadow-xl overflow-hidden disabled:cursor-not-allowed group"
                  >
                    {/* Gold border decoration */}
                    <div className="absolute inset-0 border-4 border-yellow-400 rounded-lg opacity-80"></div>

                    {/* Traditional pattern overlay */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl">
                        福
                      </div>
                    </div>

                    {/* Glow effect on hover */}
                    {!isOpening && selectedIndex === null && (
                      <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    )}

                    {/* Opening animation */}
                    {isSelected &&
                      (animationStage === "opening" ||
                        animationStage === "revealing" ||
                        animationStage === "complete") && (
                        <motion.div
                          initial={{ scaleY: 0, originY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="absolute inset-0 bg-gradient-to-b from-yellow-400 to-yellow-500 z-10"
                        />
                      )}

                    {/* Amount reveal */}
                    {isSelected &&
                      (animationStage === "revealing" ||
                        animationStage === "complete") && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, ease: "backOut" }}
                          className="absolute inset-0 flex items-center justify-center z-20"
                        >
                          <div className="text-center">
                            <div className="text-3xl font-bold text-red-700">
                              🎊
                            </div>
                          </div>
                        </motion.div>
                      )}
                  </motion.button>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              {/* Confetti particles */}
              <div className="relative">
                {confettiParticles.map((particle) => (
                  <motion.div
                    key={particle.id}
                    initial={{ opacity: 1, y: 0, x: 0 }}
                    animate={{
                      opacity: 0,
                      y: particle.y,
                      x: particle.x,
                      rotate: particle.rotate,
                    }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute top-0 left-1/2 w-3 h-3 rounded-full"
                    style={{ backgroundColor: particle.color }}
                  />
                ))}
              </div>

              <div className="bg-gradient-to-br from-white to-yellow-50 rounded-3xl p-10 shadow-2xl border-4 border-yellow-400">
                <motion.h3
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="text-3xl font-bold text-gray-900 mb-6"
                >
                  � Your Lucky Amount! 🎊
                </motion.h3>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.6, delay: 0.2 }}
                  className="text-7xl font-bold text-red-600 mb-6 drop-shadow-lg"
                >
                  {formatCurrency(score)}
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-700 text-lg mb-8"
                >
                  {score >= 80000
                    ? "Incredible luck! 🌟 Your fortune shines bright!"
                    : score >= 60000
                      ? "Great fortune! 🎉 Prosperity awaits you!"
                      : score >= 40000
                        ? "Good luck! 💫 Blessings are coming your way!"
                        : "Lucky start! 🍀 More fortune is on the horizon!"}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <button
                    onClick={onProceed}
                    disabled={loading}
                    className="w-full px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-xl rounded-full hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 shadow-xl disabled:opacity-50"
                  >
                    {loading ? "Loading..." : "Continue to Your Fortune ✨"}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MyBCA Modal */}
        <AnimatePresence>
          {showMyBCAModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMyBCAModal(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                  🎁 MyBCA Bagi-Bagi
                </h3>
                <p className="text-gray-700 mb-6 text-center">
                  Claim your exclusive reward from MyBCA Bagi-Bagi!
                </p>

                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 mb-6 border-2 border-yellow-400">
                  <p className="text-sm text-gray-600 mb-3 text-center">
                    Visit the link below to claim your reward:
                  </p>
                  <a
                    href="https://www.bca.co.id/bagibagi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all text-center shadow-lg"
                  >
                    Open MyBCA Bagi-Bagi �
                  </a>
                </div>

                <button
                  onClick={() => setShowMyBCAModal(false)}
                  className="w-full px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 transition-all"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
