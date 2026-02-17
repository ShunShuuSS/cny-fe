"use client";

import { motion } from "framer-motion";

interface GreetingScreenProps {
  onContinue: () => void;
  loading: boolean;
}

export default function GreetingScreen({
  onContinue,
  loading,
}: GreetingScreenProps) {
  const greeting =
    "Happy Lunar New Year! As the new year begins, may it bring you renewed hope, greater strength, and endless opportunities. May your days be filled with joy, your home be filled with laughter, and your heart be filled with peace. May prosperity flow steadily into your life, just like a river that never runs dry. May good health stay with you and your loved ones throughout the year. May your hard work bear fruitful rewards, and may every challenge turn into wisdom and growth. Let this new year be a time of gratitude for the past, courage for the present, and faith for the future. Wishing you harmony in your family, success in your career, and happiness in everything you pursue. May fortune smile upon you, and may blessings multiply in every step you take. Gong Xi Fa Cai!";

  return (
    <div className="min-h-screen p-4 py-16 relative overflow-y-auto flex flex-col justify-start items-center">
      <motion.div
        className="absolute top-10 left-10 text-6xl"
        animate={{
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        🏮
      </motion.div>
      <motion.div
        className="absolute top-20 right-16 text-6xl"
        animate={{
          rotate: [0, -10, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        🏮
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-20 text-5xl"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 15, -15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        🐴
      </motion.div>
      <motion.div
        className="absolute bottom-24 right-24 text-5xl"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      >
        🔥
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-3xl relative z-10 w-full"
      >
        <motion.div
          className="text-9xl mb-10"
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🧧
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8"
          style={{
            background:
              "linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            恭喜發財
          </motion.span>
        </motion.h1>

        {/* Greeting Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-white/90 max-w-3xl mx-auto leading-relaxed text-base sm:text-lg md:text-xl mb-6"
        >
          {greeting}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          onClick={!loading ? onContinue : undefined}
          className={`cursor-pointer select-none mb-8 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <motion.p
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-xl sm:text-2xl text-cny-gold font-light tracking-widest"
          >
            {loading ? "Loading..." : "✨ Click to Continue ✨"}
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}
