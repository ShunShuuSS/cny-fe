"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ForecastData } from "@/lib/api";

interface ForecastPreviewProps {
  forecast: ForecastData | null;
  zodiacName: string;
  zodiacImage: string;
  loading: boolean;
}

const fortuneCategories = [
  {
    key: "career" as const,
    icon: "💼",
    label: "Career",
    color: "from-blue-500 to-blue-600",
  },
  {
    key: "wealth" as const,
    icon: "💰",
    label: "Wealth",
    color: "from-green-500 to-green-600",
  },
  {
    key: "health" as const,
    icon: "❤️",
    label: "Health",
    color: "from-red-500 to-red-600",
  },
  {
    key: "romance" as const,
    icon: "💕",
    label: "Romance",
    color: "from-pink-500 to-pink-600",
  },
];

export default function ForecastPreview({
  forecast,
  zodiacName,
  zodiacImage,
  loading,
}: ForecastPreviewProps) {
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl"
      >
        <div className="text-center text-white">
          <div className="animate-pulse">Loading forecast...</div>
        </div>
      </motion.div>
    );
  }

  if (!forecast) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="mt-8 lg:p-6 sm:p-8"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-cny-gold/30">
          <img
            src={zodiacImage}
            alt={zodiacName}
            className="w-16 h-16 object-contain"
          />
          <div>
            <h3 className="text-2xl font-bold text-cny-gold capitalize">
              {zodiacName} Forecast
            </h3>
            {forecast.ranking && (
              <p className="text-sm text-white/70">
                Ranking: #{forecast.ranking}
              </p>
            )}
          </div>
        </div>

        {/* General Forecast */}
        {forecast.general_forecast && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 p-4 bg-cny-gold/20 rounded-xl border border-cny-gold/30"
          >
            <p className="text-white/90 text-sm leading-relaxed text-justify">
              {forecast.general_forecast}
            </p>
          </motion.div>
        )}

        {/* Category Forecasts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {fortuneCategories.map((category, index) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{category.icon}</span>
                <h4 className="text-base font-bold text-cny-gold">
                  {category.label}
                </h4>
                {forecast[category.key]?.rating && (
                  <span className="ml-auto text-xs font-semibold text-white/70">
                    ★ {forecast[category.key].rating}/5
                  </span>
                )}
              </div>
              <p className="text-white/80 text-xs leading-relaxed text-justify">
                {forecast[category.key].text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Lucky Number */}
        {forecast.lucky_number && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center p-4 bg-cny-gold/20 rounded-xl border border-cny-gold/30"
          >
            <p className="text-sm text-white/70 mb-1">Lucky Number</p>
            <p className="text-3xl font-bold text-cny-gold">
              {forecast.lucky_number}
            </p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
