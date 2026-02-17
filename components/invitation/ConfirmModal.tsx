"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ConfirmModalProps {
  isOpen: boolean;
  zodiacName: string;
  zodiacImage: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}

export default function ConfirmModal({
  isOpen,
  zodiacName,
  zodiacImage,
  onConfirm,
  onCancel,
  loading,
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={!loading ? onCancel : undefined}
          />

          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8"
            >
              <div className="text-center">
                <motion.div
                  className="mb-4 flex justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <img
                    src={zodiacImage}
                    alt={zodiacName}
                    className="w-32 h-32 object-contain"
                  />
                </motion.div>

                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Are you sure?
                </h3>

                <p className="text-gray-600 mb-2">
                  You have selected the{" "}
                  <span className="font-bold text-cny-red">{zodiacName}</span>
                </p>

                <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 mb-6">
                  <p className="text-sm text-yellow-800 font-semibold">
                    ⚠️ You cannot change your zodiac after confirmation
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={onCancel}
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-full hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onConfirm}
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-cny-red text-white font-semibold rounded-full hover:bg-cny-red-dark transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          ⏳
                        </motion.span>
                        Revealing...
                      </span>
                    ) : (
                      "Confirm"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
