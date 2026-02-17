"use client";

import { motion } from "framer-motion";

interface GateScreenProps {
  onGateClick: () => void;
  isOpening: boolean;
}

export default function GateScreen({
  onGateClick,
  isOpening,
}: GateScreenProps) {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />

      <motion.div
        className="absolute top-6 sm:top-10 md:top-14 text-center z-20"
        animate={
          isOpening
            ? { opacity: 0, scale: 0.9, y: -30 }
            : { opacity: 1, scale: 1, y: 0 }
        }
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-2 sm:mb-3"
          style={{
            background:
              "linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Welcome
        </motion.h1>
      </motion.div>

      <div className="relative w-full h-full flex items-center justify-center px-4">
        <motion.div
          className="relative w-full max-w-[85vw] h-[60vh] sm:max-w-[550px] sm:h-[70vh] md:max-w-[650px] md:h-[75vh] lg:max-w-[750px] cursor-pointer"
          onClick={onGateClick}
          whileHover={!isOpening ? { scale: 1.01 } : {}}
          whileTap={!isOpening ? { scale: 0.99 } : {}}
          animate={
            isOpening
              ? {
                  scale: [1, 1.3, 1.8],
                  opacity: [1, 1, 0.3],
                }
              : {}
          }
          transition={
            isOpening
              ? { duration: 2, ease: [0.22, 1, 0.36, 1], times: [0, 0.5, 1] }
              : {}
          }
        >
          <div className="absolute -inset-4 bg-gradient-to-b from-amber-500/30 via-yellow-600/20 to-amber-500/30 blur-2xl rounded-3xl" />

          {!isOpening && (
            <>
              <motion.div
                className="absolute top-2 sm:top-4 md:top-6 left-1/2 -translate-x-1/2 z-10"
                animate={{
                  y: [0, -8, 0],
                  rotateZ: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-yellow-400 to-amber-600 blur-xl opacity-60 rounded-full" />
                  <div className="relative bg-gradient-to-b from-red-600 via-red-700 to-red-900 px-6 py-3 sm:px-8 sm:py-4 rounded-2xl border-4 border-amber-400 shadow-2xl">
                    <span className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                      福
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -top-2 left-[15%] text-4xl sm:text-5xl md:text-6xl drop-shadow-2xl"
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, 10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                🏮
              </motion.div>
              <motion.div
                className="absolute -top-2 right-[15%] text-4xl sm:text-5xl md:text-6xl drop-shadow-2xl"
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.7,
                }}
              >
                🏮
              </motion.div>
            </>
          )}

          {isOpening && (
            <motion.div
              className="absolute inset-0 z-50 pointer-events-none rounded-3xl overflow-hidden flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 1, 1] }}
              transition={{ duration: 1.5, times: [0, 0.2, 0.5, 1] }}
            >
              <motion.div
                className="absolute"
                style={{
                  width: "2px",
                  height: "100%",
                  background:
                    "linear-gradient(to bottom, transparent, white, white, transparent)",
                }}
                animate={{
                  width: ["2px", "10%", "50%", "200%"],
                  height: ["100%", "100%", "100%", "200%"],
                }}
                transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
              >
                <div className="absolute inset-0 bg-white blur-3xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-amber-100 via-white to-amber-100" />
              </motion.div>
            </motion.div>
          )}

          <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-600 via-yellow-600 to-amber-700 p-1">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 opacity-50 blur-md" />

              <div className="relative w-full h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 flex">
                  <motion.div
                    className="flex-1 relative"
                    animate={
                      isOpening
                        ? {
                            x: [0, "-105%"],
                          }
                        : {}
                    }
                    transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-red-800 via-red-900 to-red-950">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-600/10 via-transparent to-transparent" />

                      <div className="absolute inset-0 opacity-40">
                        <div className="absolute top-[20%] left-[25%] w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 blur-3xl" />
                        <div className="absolute bottom-[25%] left-[20%] w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 blur-2xl" />
                        <div className="absolute top-[45%] left-[30%] w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-amber-300 blur-xl" />
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/50 to-transparent" />

                      <div className="absolute top-1/2 right-[8%] -translate-y-1/2">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-yellow-600 blur-2xl opacity-60 rounded-full w-24 h-24 sm:w-32 sm:h-32" />
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-amber-500 via-yellow-600 to-amber-700 shadow-2xl flex items-center justify-center border-4 border-amber-400">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-amber-800 to-yellow-900" />
                          </div>
                        </div>
                      </div>

                      <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-transparent via-amber-600 to-transparent" />
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex-1 relative"
                    animate={
                      isOpening
                        ? {
                            x: [0, "105%"],
                          }
                        : {}
                    }
                    transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-bl from-red-800 via-red-900 to-red-950">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-600/10 via-transparent to-transparent" />

                      <div className="absolute inset-0 opacity-40">
                        <div className="absolute top-[20%] right-[25%] w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-bl from-amber-400 to-yellow-600 blur-3xl" />
                        <div className="absolute bottom-[25%] right-[20%] w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-bl from-yellow-300 to-amber-500 blur-2xl" />
                        <div className="absolute top-[45%] right-[30%] w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-amber-300 blur-xl" />
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/50 to-transparent" />

                      <div className="absolute top-1/2 left-[8%] -translate-y-1/2">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-bl from-amber-500 to-yellow-600 blur-2xl opacity-60 rounded-full w-24 h-24 sm:w-32 sm:h-32" />
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-bl from-amber-500 via-yellow-600 to-amber-700 shadow-2xl flex items-center justify-center border-4 border-amber-400">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-bl from-amber-800 to-yellow-900" />
                          </div>
                        </div>
                      </div>

                      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-amber-600 to-transparent" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 sm:bottom-12 md:bottom-16 text-center z-20"
        animate={
          isOpening
            ? { opacity: 0, y: 30 }
            : {
                opacity: [0.7, 1, 0.7],
              }
        }
        transition={
          isOpening
            ? { duration: 0.8, ease: "easeOut" }
            : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <div className="flex items-center gap-4 text-xl sm:text-2xl md:text-3xl font-light tracking-widest">
          <span className="text-amber-400">✨</span>
          <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
            Click to Enter
          </span>
          <span className="text-amber-400">✨</span>
        </div>
      </motion.div>
    </div>
  );
}
