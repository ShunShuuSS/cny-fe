'use client';

import { motion } from 'framer-motion';

export default function FloatingLanterns() {
  const lanterns = [
    { size: 60, left: '10%', delay: 0, duration: 8 },
    { size: 50, left: '25%', delay: 2, duration: 10 },
    { size: 70, left: '50%', delay: 1, duration: 9 },
    { size: 55, left: '75%', delay: 3, duration: 11 },
    { size: 65, left: '90%', delay: 1.5, duration: 8.5 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {lanterns.map((lantern, i) => (
        <motion.div
          key={i}
          className="absolute opacity-30"
          style={{
            left: lantern.left,
            width: lantern.size,
            height: lantern.size * 1.3,
          }}
          animate={{
            y: ['100vh', '-20vh'],
            x: [0, Math.sin(i) * 30, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: lantern.duration,
            delay: lantern.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="35" y="5" width="30" height="8" rx="2" fill="#D97706" />
            <ellipse cx="50" cy="30" rx="28" ry="12" fill="#DC2626" />
            <rect x="25" y="30" width="50" height="60" rx="8" fill="#DC2626" />
            <ellipse cx="50" cy="90" rx="28" ry="12" fill="#DC2626" />
            <line x1="30" y1="45" x2="70" y2="45" stroke="#F59E0B" strokeWidth="2" />
            <line x1="30" y1="60" x2="70" y2="60" stroke="#F59E0B" strokeWidth="2" />
            <line x1="30" y1="75" x2="70" y2="75" stroke="#F59E0B" strokeWidth="2" />
            <rect x="47" y="95" width="6" height="15" fill="#D97706" />
            <circle cx="50" cy="112" r="4" fill="#F59E0B" />
            <path d="M 40 50 Q 50 55 60 50" stroke="#F59E0B" strokeWidth="3" fill="none" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
