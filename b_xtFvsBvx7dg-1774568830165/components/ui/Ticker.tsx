'use client'

import { motion } from 'framer-motion'

interface TickerProps {
  items: string[]
  speed?: number
}

export function Ticker({ items, speed = 30 }: TickerProps) {
  const repeatedItems = [...items, ...items, ...items, ...items]

  return (
    <div className="relative overflow-hidden bg-white py-6 border-y border-black/10">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {repeatedItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-12"
          >
            <span className="text-3xl md:text-4xl lg:text-5xl font-black text-black uppercase tracking-tight">
              {item}
            </span>
            <span className="text-2xl text-black/20">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
