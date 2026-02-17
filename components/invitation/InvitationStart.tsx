"use client";

import { motion } from "framer-motion";

interface InvitationStartProps {
  invitationName: string;
  onStart: () => void;
  loading: boolean;
}

export default function InvitationStart({
  invitationName,
  onStart,
  loading,
}: InvitationStartProps) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-8xl mb-6"
          >
            🏮
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-cny-red mb-3"
          >
            {invitationName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg sm:text-xl md:text-2xl text-cny-gold font-semibold mb-2"
          >
            恭喜发财 🧧 新年快乐
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8 px-4"
          >
            Happy Chinese New Year! You&apos;ve been invited to join the
            celebration.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-gray-500 text-sm sm:text-base mb-8 sm:mb-10 px-4"
          >
            Start your journey to receive your lucky draw!
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            disabled={loading}
            className="px-8 sm:px-10 py-3 sm:py-4 bg-cny-red text-white text-base sm:text-lg font-semibold rounded-full hover:bg-cny-red-dark transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
          >
            {loading ? "Starting..." : "Start Celebration 🎊"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
