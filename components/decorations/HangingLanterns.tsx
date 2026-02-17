"use client";

import { motion } from "framer-motion";

export default function HangingLanterns() {
  // Mobile: 2 lanterns
  const mobileLanterns = [
    { left: "20%", delay: 0, duration: 3, size: 70 },
    { left: "60%", delay: 0.5, duration: 3.5, size: 70 },
  ];

  // Tablet: 3 lanterns
  const tabletLanterns = [
    { left: "15%", delay: 0, duration: 3, size: 75 },
    { left: "45%", delay: 0.5, duration: 3.5, size: 70 },
    { left: "75%", delay: 1, duration: 3.2, size: 75 },
  ];

  // Desktop: 4 lanterns
  const desktopLanterns = [
    { left: "15%", delay: 0, duration: 3, size: 80 },
    { left: "35%", delay: 0.5, duration: 3.5, size: 70 },
    { left: "65%", delay: 1, duration: 3.2, size: 75 },
    { left: "85%", delay: 0.3, duration: 3.8, size: 65 },
  ];

  return (
    <>
      {/* Mobile: 2 lanterns */}
      <div className="fixed top-0 left-0 right-0 pointer-events-none z-0 h-32 block sm:hidden">
        {mobileLanterns.map((lantern, i) => (
          <motion.div
            key={i}
            className="absolute opacity-40"
            style={{
              left: lantern.left,
              top: "-20px",
              width: lantern.size,
              height: lantern.size * 1.4,
            }}
            animate={{
              rotate: [-5, 5, -5],
              x: [-10, 10, -10],
            }}
            transition={{
              duration: lantern.duration,
              delay: lantern.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Hanging string */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gray-700/60" />

            {/* Round Paper Lantern SVG - Spherical with horizontal ridges */}
            <svg
              viewBox="0 0 120 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-2xl"
            >
              {/* Top metal ring */}
              <ellipse cx="60" cy="12" rx="8" ry="3" fill="#B45309" />
              <rect x="56" y="10" width="8" height="3" fill="#92400E" />

              {/* Main spherical body with horizontal paper ridges */}
              <defs>
                <radialGradient id={`glow-${i}`} cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#FCD34D" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#DC2626" stopOpacity="1" />
                </radialGradient>
              </defs>

              {/* Sphere outline - filled with glow gradient */}
              <circle cx="60" cy="70" r="45" fill={`url(#glow-${i})`} />

              {/* Outer red paper layer with opacity for glow through */}
              <circle cx="60" cy="70" r="45" fill="#DC2626" opacity="0.85" />

              {/* Horizontal paper ridges - creating the folded paper effect */}
              <ellipse
                cx="60"
                cy="35"
                rx="42"
                ry="8"
                fill="#EF4444"
                opacity="0.7"
              />
              <ellipse
                cx="60"
                cy="50"
                rx="45"
                ry="6"
                fill="#DC2626"
                opacity="0.8"
              />
              <ellipse
                cx="60"
                cy="70"
                rx="45"
                ry="7"
                fill="#B91C1C"
                opacity="0.6"
              />
              <ellipse
                cx="60"
                cy="90"
                rx="45"
                ry="6"
                fill="#DC2626"
                opacity="0.8"
              />
              <ellipse
                cx="60"
                cy="105"
                rx="42"
                ry="8"
                fill="#EF4444"
                opacity="0.7"
              />

              {/* Ridge shadows for depth */}
              <ellipse
                cx="60"
                cy="35"
                rx="40"
                ry="2"
                fill="#991B1B"
                opacity="0.4"
              />
              <ellipse
                cx="60"
                cy="50"
                rx="43"
                ry="2"
                fill="#991B1B"
                opacity="0.4"
              />
              <ellipse
                cx="60"
                cy="90"
                rx="43"
                ry="2"
                fill="#991B1B"
                opacity="0.4"
              />
              <ellipse
                cx="60"
                cy="105"
                rx="40"
                ry="2"
                fill="#991B1B"
                opacity="0.4"
              />

              {/* Vertical lines suggesting paper segments */}
              <path
                d="M 60 25 Q 55 70 60 115"
                stroke="#B91C1C"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <path
                d="M 75 40 Q 73 70 75 100"
                stroke="#B91C1C"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <path
                d="M 45 40 Q 47 70 45 100"
                stroke="#B91C1C"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <path
                d="M 90 55 Q 88 70 90 85"
                stroke="#B91C1C"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <path
                d="M 30 55 Q 32 70 30 85"
                stroke="#B91C1C"
                strokeWidth="0.5"
                opacity="0.3"
              />

              {/* Inner bright glow center - lit from within effect */}
              <ellipse
                cx="60"
                cy="70"
                rx="25"
                ry="30"
                fill="#FEF3C7"
                opacity="0.6"
              />
              <ellipse
                cx="60"
                cy="70"
                rx="15"
                ry="20"
                fill="#FDE68A"
                opacity="0.8"
              />

              {/* Bottom gold tassel */}
              <rect x="56" y="115" width="8" height="3" fill="#B45309" />
              <ellipse cx="60" cy="117" rx="8" ry="3" fill="#D97706" />

              {/* Tassel fringe */}
              <g opacity="0.8">
                <line
                  x1="54"
                  y1="118"
                  x2="52"
                  y2="128"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                />
                <line
                  x1="57"
                  y1="118"
                  x2="56"
                  y2="130"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                />
                <line
                  x1="60"
                  y1="118"
                  x2="60"
                  y2="132"
                  stroke="#F59E0B"
                  strokeWidth="2"
                />
                <line
                  x1="63"
                  y1="118"
                  x2="64"
                  y2="130"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                />
                <line
                  x1="66"
                  y1="118"
                  x2="68"
                  y2="128"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                />
              </g>

              {/* Tassel decorative ends */}
              <circle cx="52" cy="128" r="1.5" fill="#FBBF24" />
              <circle cx="56" cy="130" r="1.5" fill="#FBBF24" />
              <circle cx="60" cy="132" r="2" fill="#FBBF24" />
              <circle cx="64" cy="130" r="1.5" fill="#FBBF24" />
              <circle cx="68" cy="128" r="1.5" fill="#FBBF24" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Tablet: 3 lanterns */}
      <div className="fixed top-0 left-0 right-0 pointer-events-none z-0 h-32 hidden sm:block lg:hidden">
        {tabletLanterns.map((lantern, i) => (
          <motion.div
            key={i}
            className="absolute opacity-40"
            style={{
              left: lantern.left,
              top: "-20px",
              width: lantern.size,
              height: lantern.size * 1.4,
            }}
            animate={{
              rotate: [-5, 5, -5],
              x: [-10, 10, -10],
            }}
            transition={{
              duration: lantern.duration,
              delay: lantern.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gray-700/60" />
            <svg
              viewBox="0 0 120 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-2xl"
            >
              <ellipse cx="60" cy="12" rx="8" ry="3" fill="#B45309" />
              <rect x="56" y="10" width="8" height="3" fill="#92400E" />
              <defs>
                <radialGradient id={`glow-tablet-${i}`} cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#FCD34D" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#DC2626" stopOpacity="1" />
                </radialGradient>
              </defs>
              <circle cx="60" cy="70" r="45" fill={`url(#glow-tablet-${i})`} />
              <circle cx="60" cy="70" r="45" fill="#DC2626" opacity="0.85" />
              <ellipse
                cx="60"
                cy="35"
                rx="42"
                ry="8"
                fill="#EF4444"
                opacity="0.7"
              />
              <ellipse
                cx="60"
                cy="50"
                rx="45"
                ry="6"
                fill="#DC2626"
                opacity="0.8"
              />
              <ellipse
                cx="60"
                cy="70"
                rx="45"
                ry="7"
                fill="#B91C1C"
                opacity="0.6"
              />
              <ellipse
                cx="60"
                cy="90"
                rx="45"
                ry="6"
                fill="#DC2626"
                opacity="0.8"
              />
              <ellipse
                cx="60"
                cy="105"
                rx="42"
                ry="8"
                fill="#EF4444"
                opacity="0.7"
              />
              <ellipse
                cx="60"
                cy="35"
                rx="40"
                ry="2"
                fill="#991B1B"
                opacity="0.4"
              />
              <ellipse
                cx="60"
                cy="50"
                rx="43"
                ry="2"
                fill="#991B1B"
                opacity="0.4"
              />
              <ellipse
                cx="60"
                cy="90"
                rx="43"
                ry="2"
                fill="#991B1B"
                opacity="0.4"
              />
              <ellipse
                cx="60"
                cy="105"
                rx="40"
                ry="2"
                fill="#991B1B"
                opacity="0.4"
              />
              <path
                d="M 60 25 Q 55 70 60 115"
                stroke="#B91C1C"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <path
                d="M 75 40 Q 73 70 75 100"
                stroke="#B91C1C"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <path
                d="M 45 40 Q 47 70 45 100"
                stroke="#B91C1C"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <path
                d="M 90 55 Q 88 70 90 85"
                stroke="#B91C1C"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <path
                d="M 30 55 Q 32 70 30 85"
                stroke="#B91C1C"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <ellipse
                cx="60"
                cy="70"
                rx="25"
                ry="30"
                fill="#FEF3C7"
                opacity="0.6"
              />
              <ellipse
                cx="60"
                cy="70"
                rx="15"
                ry="20"
                fill="#FDE68A"
                opacity="0.8"
              />
              <rect x="56" y="115" width="8" height="3" fill="#B45309" />
              <ellipse cx="60" cy="117" rx="8" ry="3" fill="#D97706" />
              <g opacity="0.8">
                <line
                  x1="54"
                  y1="118"
                  x2="52"
                  y2="128"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                />
                <line
                  x1="57"
                  y1="118"
                  x2="56"
                  y2="130"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                />
                <line
                  x1="60"
                  y1="118"
                  x2="60"
                  y2="132"
                  stroke="#F59E0B"
                  strokeWidth="2"
                />
                <line
                  x1="63"
                  y1="118"
                  x2="64"
                  y2="130"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                />
                <line
                  x1="66"
                  y1="118"
                  x2="68"
                  y2="128"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                />
              </g>
              <circle cx="52" cy="128" r="1.5" fill="#FBBF24" />
              <circle cx="56" cy="130" r="1.5" fill="#FBBF24" />
              <circle cx="60" cy="132" r="2" fill="#FBBF24" />
              <circle cx="64" cy="130" r="1.5" fill="#FBBF24" />
              <circle cx="68" cy="128" r="1.5" fill="#FBBF24" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Desktop: 4 lanterns */}
      <div className="fixed top-0 left-0 right-0 pointer-events-none z-0 h-32 hidden lg:block">
        {desktopLanterns.map((lantern, i) => (
          <motion.div
            key={i}
            className="absolute opacity-40"
            style={{
              left: lantern.left,
              top: "-20px",
              width: lantern.size,
              height: lantern.size * 1.4,
            }}
            animate={{
              rotate: [-5, 5, -5],
              x: [-10, 10, -10],
            }}
            transition={{
              duration: lantern.duration,
              delay: lantern.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gray-700/60" />
            <svg
              viewBox="0 0 120 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-2xl"
            >
              <ellipse cx="60" cy="12" rx="8" ry="3" fill="#B45309" />
              <rect x="56" y="10" width="8" height="3" fill="#92400E" />
              <defs>
                <radialGradient id={`glow-${i}`} cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#FCD34D" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#DC2626" stopOpacity="1" />
                </radialGradient>
              </defs>
              <circle cx="60" cy="70" r="45" fill={`url(#glow-${i})`} />
              <circle cx="60" cy="70" r="45" fill="#DC2626" opacity="0.85" />
              <ellipse
                cx="60"
                cy="35"
                rx="42"
                ry="8"
                fill="#EF4444"
                opacity="0.7"
              />
              <ellipse
                cx="60"
                cy="50"
                rx="45"
                ry="6"
                fill="#DC2626"
                opacity="0.8"
              />
              <ellipse
                cx="60"
                cy="70"
                rx="45"
                ry="7"
                fill="#B91C1C"
                opacity="0.6"
              />
              <ellipse
                cx="60"
                cy="90"
                rx="45"
                ry="6"
                fill="#DC2626"
                opacity="0.8"
              />
              <ellipse
                cx="60"
                cy="105"
                rx="42"
                ry="8"
                fill="#EF4444"
                opacity="0.7"
              />
              <ellipse
                cx="60"
                cy="35"
                rx="40"
                ry="2"
                fill="#991B1B"
                opacity="0.4"
              />
              <ellipse
                cx="60"
                cy="50"
                rx="43"
                ry="2"
                fill="#991B1B"
                opacity="0.4"
              />
              <ellipse
                cx="60"
                cy="90"
                rx="43"
                ry="2"
                fill="#991B1B"
                opacity="0.4"
              />
              <ellipse
                cx="60"
                cy="105"
                rx="40"
                ry="2"
                fill="#991B1B"
                opacity="0.4"
              />
              <path
                d="M 60 25 Q 55 70 60 115"
                stroke="#B91C1C"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <path
                d="M 75 40 Q 73 70 75 100"
                stroke="#B91C1C"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <path
                d="M 45 40 Q 47 70 45 100"
                stroke="#B91C1C"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <path
                d="M 90 55 Q 88 70 90 85"
                stroke="#B91C1C"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <path
                d="M 30 55 Q 32 70 30 85"
                stroke="#B91C1C"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <ellipse
                cx="60"
                cy="70"
                rx="25"
                ry="30"
                fill="#FEF3C7"
                opacity="0.6"
              />
              <ellipse
                cx="60"
                cy="70"
                rx="15"
                ry="20"
                fill="#FDE68A"
                opacity="0.8"
              />
              <rect x="56" y="115" width="8" height="3" fill="#B45309" />
              <ellipse cx="60" cy="117" rx="8" ry="3" fill="#D97706" />
              <g opacity="0.8">
                <line
                  x1="54"
                  y1="118"
                  x2="52"
                  y2="128"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                />
                <line
                  x1="57"
                  y1="118"
                  x2="56"
                  y2="130"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                />
                <line
                  x1="60"
                  y1="118"
                  x2="60"
                  y2="132"
                  stroke="#F59E0B"
                  strokeWidth="2"
                />
                <line
                  x1="63"
                  y1="118"
                  x2="64"
                  y2="130"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                />
                <line
                  x1="66"
                  y1="118"
                  x2="68"
                  y2="128"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                />
              </g>
              <circle cx="52" cy="128" r="1.5" fill="#FBBF24" />
              <circle cx="56" cy="130" r="1.5" fill="#FBBF24" />
              <circle cx="60" cy="132" r="2" fill="#FBBF24" />
              <circle cx="64" cy="130" r="1.5" fill="#FBBF24" />
              <circle cx="68" cy="128" r="1.5" fill="#FBBF24" />
            </svg>
          </motion.div>
        ))}
      </div>
    </>
  );
}
