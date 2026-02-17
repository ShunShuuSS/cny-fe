"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ForecastPreview from "./ForecastPreview";
import * as api from "@/lib/api";

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

interface ZodiacData {
  sign: ZodiacSign;
  image: string;
  name: string;
  name_en: string;
}

interface ZodiacSelectionProps {
  selectedZodiac: ZodiacSign | null;
  onSelect: (zodiac: ZodiacSign | null) => void;
  onConfirm: () => void;
  zodiacData: Record<string, { image: string; name: string; name_en: string }>;
  year: number;
}

export default function ZodiacSelection({
  selectedZodiac,
  onSelect,
  onConfirm,
  zodiacData,
  year,
}: ZodiacSelectionProps) {
  const [forecast, setForecast] = useState<api.ForecastData | null>(null);
  const [forecastLoading, setForecastLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Lock body scroll when modal is open (mobile-compatible)
  useEffect(() => {
    if (showModal) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [showModal]);

  const zodiacList: ZodiacData[] = Object.entries(zodiacData).map(
    ([key, value]) => ({
      sign: key as ZodiacSign,
      image: value.image,
      name: value.name,
      name_en: value.name_en,
    }),
  );

  useEffect(() => {
    const fetchForecast = async () => {
      if (!selectedZodiac) {
        setForecast(null);
        setShowModal(false);
        return;
      }

      setShowModal(true);
      setForecastLoading(true);
      try {
        const response = await api.getForecastByZodiac(selectedZodiac, year);
        if (response.success) {
          setForecast(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch forecast:", error);
        setForecast(null);
      } finally {
        setForecastLoading(false);
      }
    };

    fetchForecast();
  }, [selectedZodiac, year]);
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl w-full"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold text-cny-gold text-center mb-4"
        >
          Choose Your Zodiac
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-white/80 text-center mb-8 text-lg"
        >
          Select one zodiac to reveal your fortune
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {zodiacList.map((zodiac, index) => (
            <motion.button
              key={zodiac.sign}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
              onClick={() => {
                if (selectedZodiac === zodiac.sign) {
                  setShowModal(true);
                } else {
                  onSelect(zodiac.sign);
                }
              }}
              className={`
                relative p-6 rounded-2xl transition-all transform
                ${
                  selectedZodiac === zodiac.sign
                    ? "bg-cny-gold text-cny-red scale-105 shadow-2xl"
                    : "bg-white/10 text-white hover:bg-white/20 hover:scale-105"
                }
              `}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="mb-2 flex justify-center">
                <img
                  src={zodiac.image}
                  alt={zodiac.name}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div className="text-center">
                <div className="font-semibold text-sm">{zodiac.name}</div>
                <div className="text-xs opacity-80 capitalize">
                  {zodiac.name_en}
                </div>
              </div>

              {selectedZodiac === zodiac.sign && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                >
                  ✓
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Forecast Modal */}
        <AnimatePresence>
          {selectedZodiac && showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowModal(false);
                onSelect(null);
              }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-gradient-to-br from-red-900 to-red-950 rounded-3xl p-4 sm:p-8 max-w-4xl w-full shadow-2xl border-4 border-cny-gold max-h-[80vh] overflow-y-auto"
              >
                {/* Close button */}
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => {
                      setShowModal(false);
                      onSelect(null);
                    }}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all text-xl"
                  >
                    ✕
                  </button>
                </div>

                <ForecastPreview
                  forecast={forecast}
                  zodiacName={zodiacData[selectedZodiac]?.name || ""}
                  zodiacImage={zodiacData[selectedZodiac]?.image || ""}
                  loading={forecastLoading}
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center mt-6"
                >
                  <motion.button
                    onClick={onConfirm}
                    disabled={forecastLoading}
                    className="px-8 py-4 bg-cny-gold text-cny-red font-bold text-xl rounded-full hover:bg-cny-gold-light transition-all shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        "0 25px 50px -12px rgba(255, 215, 0, 0.5)",
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    Test Your Luck!
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
