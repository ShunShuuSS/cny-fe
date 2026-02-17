"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Track {
  src: string;
  name: string;
}

interface MusicPlayerProps {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onNext: () => void;
  onPrevious: () => void;
  onPlayTrack: (index: number) => void;
  onTogglePlay: () => void;
}

export default function MusicPlayer({
  tracks,
  currentTrackIndex,
  isPlaying,
  currentTime,
  duration,
  onNext,
  onPrevious,
  onPlayTrack,
  onTogglePlay,
}: MusicPlayerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Modal Backdrop and Song List */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-br from-cny-red/95 to-cny-crimson/95 backdrop-blur-lg rounded-t-3xl shadow-2xl border-t border-cny-gold/30 max-h-[80vh] overflow-hidden"
            >
              <div className="p-4 sm:p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-cny-gold font-bold text-lg flex items-center gap-2">
                    <span>🎵</span>
                    <span>Music Queue</span>
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsModalOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                  >
                    ✕
                  </motion.button>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onPrevious}
                    className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors text-xl"
                  >
                    ⏮
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onTogglePlay}
                    className="w-16 h-16 rounded-full bg-cny-gold hover:bg-cny-gold-light flex items-center justify-center text-cny-red transition-colors text-2xl"
                  >
                    {isPlaying ? "⏸" : "▶"}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onNext}
                    className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors text-xl"
                  >
                    ⏭
                  </motion.button>
                </div>

                {/* Song List */}
                <div className="space-y-2 max-h-[50vh] overflow-y-auto custom-scrollbar">
                  {tracks.map((track, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        onPlayTrack(index);
                        setIsModalOpen(false);
                      }}
                      className={`p-3 rounded-xl transition-all cursor-pointer ${
                        index === currentTrackIndex
                          ? "bg-cny-gold/30 border border-cny-gold/50"
                          : "bg-white/10 hover:bg-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                            index === currentTrackIndex
                              ? "bg-cny-gold text-cny-red"
                              : "bg-white/20 text-white/60"
                          }`}
                        >
                          {index === currentTrackIndex && isPlaying ? (
                            <motion.span
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className="text-lg"
                            >
                              ▶
                            </motion.span>
                          ) : (
                            <span className="text-sm font-bold">
                              {index + 1}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm sm:text-base font-medium truncate ${
                              index === currentTrackIndex
                                ? "text-cny-gold"
                                : "text-white/90"
                            }`}
                          >
                            {track.name}
                          </p>
                        </div>
                        {index === currentTrackIndex && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex gap-1"
                          >
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                animate={{
                                  height: isPlaying
                                    ? ["4px", "16px", "4px"]
                                    : "4px",
                                }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Infinity,
                                  delay: i * 0.1,
                                  ease: "easeInOut",
                                }}
                                className="w-1 bg-cny-gold rounded-full"
                              />
                            ))}
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Fixed Bottom Player Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-cny-red to-cny-crimson text-white shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          {/* Desktop Controls - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            {/* Previous Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onPrevious();
              }}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              title="Previous"
            >
              <span className="text-sm">⏮</span>
            </motion.button>

            {/* Play/Pause Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onTogglePlay();
              }}
              className="w-10 h-10 rounded-full bg-cny-gold hover:bg-cny-gold-light flex items-center justify-center text-cny-red transition-colors"
              title={isPlaying ? "Pause" : "Play"}
            >
              <span className="text-lg">{isPlaying ? "⏸" : "▶"}</span>
            </motion.button>

            {/* Next Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              title="Next"
            >
              <span className="text-sm">⏭</span>
            </motion.button>
          </div>

          {/* Music Icon (opens modal) */}
          <motion.div
            onClick={() => setIsModalOpen(true)}
            animate={{
              rotate: isPlaying ? 360 : 0,
            }}
            transition={{
              duration: 2,
              repeat: isPlaying ? Infinity : 0,
              ease: "linear",
            }}
            className="text-2xl shrink-0 cursor-pointer"
          >
            🎵
          </motion.div>

          {/* Center: Song Name (clickable to open modal) */}
          <div
            onClick={() => setIsModalOpen(true)}
            className="flex-1 min-w-0 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="text-sm sm:text-base font-medium text-white/95 truncate">
              {tracks[currentTrackIndex]?.name || "No track"}
            </div>
            {/* Progress Bar */}
            <div className="relative w-full h-1 bg-white/20 rounded-full overflow-hidden mt-2">
              <motion.div
                className="absolute left-0 top-0 h-full bg-cny-gold"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Right: Up Arrow */}
          <motion.button
            onClick={() => setIsModalOpen(true)}
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-white text-xl shrink-0 hover:opacity-80 transition-opacity"
          >
            ▲
          </motion.button>
        </div>
      </motion.div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 215, 0, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 215, 0, 0.7);
        }
      `}</style>
    </>
  );
}
