"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function CherryBlossoms() {
  const [petals] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
      size: 10 + Math.random() * 10,
    })),
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute opacity-40"
          style={{
            left: `${petal.left}%`,
            width: petal.size,
            height: petal.size,
          }}
          animate={{
            y: ["-10vh", "110vh"],
            x: [0, Math.sin(petal.id) * 50, -Math.cos(petal.id) * 30],
            rotate: [0, 360],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 4-petal cherry blossom arranged in cross pattern */}

            {/* Petal 1 - Top */}
            <path
              d="M 12 4 Q 9 4 8 7 Q 8 9 10 10.5 L 12 11.5 L 14 10.5 Q 16 9 16 7 Q 15 4 12 4 Z"
              fill="#FFB6C1"
              opacity="0.9"
            />

            {/* Petal 2 - Right */}
            <path
              d="M 20 12 Q 20 9 17 8 Q 15 8 13.5 10 L 12.5 12 L 13.5 14 Q 15 16 17 16 Q 20 15 20 12 Z"
              fill="#FFC0CB"
              opacity="0.9"
            />

            {/* Petal 3 - Bottom */}
            <path
              d="M 12 20 Q 15 20 16 17 Q 16 15 14 13.5 L 12 12.5 L 10 13.5 Q 8 15 8 17 Q 9 20 12 20 Z"
              fill="#FFB6C1"
              opacity="0.9"
            />

            {/* Petal 4 - Left */}
            <path
              d="M 4 12 Q 4 15 7 16 Q 9 16 10.5 14 L 11.5 12 L 10.5 10 Q 9 8 7 8 Q 4 9 4 12 Z"
              fill="#FFC0CB"
              opacity="0.9"
            />

            {/* Center of flower */}
            <circle cx="12" cy="12" r="2" fill="#FFF4E6" />
            <circle cx="12" cy="12" r="1.2" fill="#FFE4B5" />

            {/* Small stamen dots */}
            <circle cx="11" cy="11.5" r="0.4" fill="#F59E0B" opacity="0.7" />
            <circle cx="13" cy="11.5" r="0.4" fill="#F59E0B" opacity="0.7" />
            <circle cx="12" cy="10.8" r="0.4" fill="#F59E0B" opacity="0.7" />
            <circle cx="12" cy="13.2" r="0.4" fill="#F59E0B" opacity="0.7" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
