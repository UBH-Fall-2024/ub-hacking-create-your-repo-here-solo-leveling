'use client';

import { motion } from 'framer-motion';

export function OracleAnimation() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden">
      {/* Full viewport backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/95"
      />

      {/* Cosmic Anomaly */}
      <div className="relative w-screen h-screen flex items-center justify-center">
        {/* Swirling energy streams */}
        {[...Array(36)].map((_, i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute w-0.5 origin-center opacity-40"
            style={{
              height: '200vh',
              background: `linear-gradient(to top, 
                transparent, 
                ${i % 2 ? 'rgba(168, 85, 247, 0.4)' : 'rgba(236, 72, 153, 0.4)'}, 
                transparent
              )`,
              rotate: `${(i * 360) / 36}deg`,
            }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.2, 1],
              rotate: [`${(i * 360) / 36}deg`, `${((i * 360) / 36) + 360}deg`],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Pulsing core */}
        <motion.div
          className="absolute w-64 h-64"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Core layers */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`core-${i}`}
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, 
                  rgba(168, 85, 247, ${0.3 - i * 0.05}), 
                  rgba(236, 72, 153, ${0.2 - i * 0.05}), 
                  transparent
                )`,
                transform: `scale(${1 + i * 0.2})`,
              }}
              animate={{
                scale: [1 + i * 0.2, 1.2 + i * 0.2, 1 + i * 0.2],
                rotate: [0, 360],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </motion.div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                background: i % 2 ? '#D946EF' : '#A855F7',
                top: '50%',
                left: '50%',
                filter: 'blur(1px)',
              }}
              animate={{
                x: [0, (Math.random() - 0.5) * 500],
                y: [0, (Math.random() - 0.5) * 500],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Ethereal text */}
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center z-10"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="relative">
            <motion.p
              animate={{
                filter: ['blur(0px)', 'blur(2px)', 'blur(0px)'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
            >
              Weaving Reality...
            </motion.p>
            <motion.div
              className="absolute inset-0 blur-lg"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                Weaving Reality...
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 