"use client";

import { useState } from "react";
import BaseModal from "../ui/BaseModal";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";

type ZodiacSign =
  | "rat"
  | "ox"
  | "tiger"
  | "rabbit"
  | "dragon"
  | "snake"
  | "horse"
  | "goat"
  | "monkey"
  | "rooster"
  | "dog"
  | "pig";

interface ForecastData {
  text: string;
  rating: number;
}

interface FortuneResult {
  career: ForecastData;
  wealth: ForecastData;
  health: ForecastData;
  romance: ForecastData;
}

interface FortuneResultProps {
  fortune: FortuneResult;
  zodiac: ZodiacSign;
  zodiacData: Record<string, { image: string; name: string; name_en: string }>;
  rewardLink?: string;
}

const fortuneCategories = [
  {
    key: "career" as const,
    emoji: "💼",
    label: "Career",
    color: "from-blue-500 to-blue-600",
  },
  {
    key: "wealth" as const,
    emoji: "💰",
    label: "Wealth",
    color: "from-green-500 to-green-600",
  },
  {
    key: "health" as const,
    emoji: "❤️",
    label: "Health",
    color: "from-red-500 to-red-600",
  },
  {
    key: "romance" as const,
    emoji: "💕",
    label: "Romance",
    color: "from-pink-500 to-pink-600",
  },
];

export default function FortuneResult({
  fortune,
  zodiac,
  zodiacData,
  rewardLink,
}: FortuneResultProps) {
  const currentZodiac = zodiacData[zodiac];
  const [selectedCategory, setSelectedCategory] = useState<
    (typeof fortuneCategories)[number] | null
  >(null);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Normalize data - handle both legacy string format and new object format
  const normalizeData = (data: any): ForecastData => {
    if (typeof data === "string") {
      // Legacy format - convert string to object
      return {
        text: data,
        rating: 3, // Default rating for legacy data
      };
    }
    // New format - already an object
    return data;
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? "text-yellow-500" : "text-gray-300"}
        >
          ★
        </span>,
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-2xl w-full"
      >
        <div className="bg-gradient-to-br from-cny-gold via-yellow-400 to-cny-gold-light rounded-3xl shadow-2xl p-8 sm:p-12 border-4 border-cny-gold relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 right-10 text-9xl">🏮</div>
            <div className="absolute bottom-10 left-10 text-9xl">🏮</div>
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-cny-red">
                Your Fortune
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {fortuneCategories.map((category, index) => {
                const data = normalizeData(fortune[category.key]);

                return (
                  <motion.div
                    key={category.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                    className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg cursor-pointer hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                    onClick={() => setSelectedCategory(category)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{category.emoji}</span>
                        <h3 className="text-lg font-bold text-gray-800">
                          {category.label}
                        </h3>
                      </div>
                      <span className="text-gray-400">▶</span>
                    </div>

                    <div className="flex items-center gap-1 text-2xl">
                      {renderStars(data.rating)}
                      <span className="text-sm text-gray-600 ml-2">
                        {data.rating}/5
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-center"
            >
              <motion.p
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-cny-red-dark font-semibold text-lg"
              >
                恭喜发财 • Happy Chinese New Year!
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Reward Button */}
        {rewardLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-8 text-center"
          >
            <button
              onClick={() => setShowRewardModal(true)}
              className="px-8 py-4 bg-gradient-to-r from-cny-gold to-yellow-400 text-cny-red font-bold text-xl rounded-full hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 border-4 border-cny-gold"
            >
              🎁 Claim Your Reward!
            </button>
          </motion.div>
        )}

        {/* Forecast Detail Modal */}
        {selectedCategory && (
          <BaseModal
            isOpen={!!selectedCategory}
            onClose={() => setSelectedCategory(null)}
            maxWidth="2xl"
            maxHeight="70vh"
            className="bg-white border-4 border-cny-gold p-8"
          >
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-5xl">{selectedCategory.emoji}</span>
                <h2 className="text-3xl font-bold text-gray-900">
                  {selectedCategory.label}
                </h2>
              </div>

              <div className="flex items-center gap-2 text-3xl mb-4">
                {renderStars(
                  normalizeData(fortune[selectedCategory.key]).rating,
                )}
                <span className="text-xl text-gray-600 ml-2">
                  {normalizeData(fortune[selectedCategory.key]).rating}/5
                </span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-base leading-relaxed text-justify">
                {normalizeData(fortune[selectedCategory.key]).text}
              </p>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSelectedCategory(null)}
                className="px-6 py-3 bg-cny-red text-white font-bold rounded-full hover:bg-red-700 transition-all transform hover:scale-105 active:scale-95"
              >
                Close
              </button>
            </div>
          </BaseModal>
        )}

        {/* Reward Modal */}
        {rewardLink && (
          <BaseModal
            isOpen={showRewardModal}
            onClose={() => setShowRewardModal(false)}
            maxWidth="md"
            className="bg-gradient-to-br from-cny-gold via-yellow-400 to-cny-gold-light border-4 border-cny-gold p-8"
          >
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-6xl mb-4"
              >
                🎁
              </motion.div>
              <h2 className="text-3xl font-bold text-cny-red mb-2">
                Your Bagi-Bagi Code!
              </h2>
              <p className="text-gray-800">
                Copy this code to claim your reward from MyBCA Bagi-Bagi
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-inner"
            >
              <div className="font-mono text-3xl font-bold text-cny-red mb-4 break-all text-center">
                {rewardLink}
              </div>
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(rewardLink);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  } catch (err) {
                    const textArea = document.createElement("textarea");
                    textArea.value = rewardLink;
                    textArea.style.position = "fixed";
                    textArea.style.opacity = "0";
                    document.body.appendChild(textArea);
                    textArea.select();
                    try {
                      document.execCommand("copy");
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    } catch (e) {
                      console.error("Copy failed", e);
                    }
                    document.body.removeChild(textArea);
                  }
                }}
                className="w-full px-6 py-4 bg-cny-red text-white font-bold text-lg rounded-full hover:bg-red-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check size={24} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={24} />
                    Copy Code
                  </>
                )}
              </button>
            </motion.div>

            <div className="text-center">
              <p className="text-sm text-gray-700 mb-4">
                Use this code at MyBCA to claim your reward! 🎉
              </p>
            </div>
          </BaseModal>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-6 text-center text-white/60 text-sm"
        >
          <p>Your fortune has been sealed. May prosperity follow you!</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
