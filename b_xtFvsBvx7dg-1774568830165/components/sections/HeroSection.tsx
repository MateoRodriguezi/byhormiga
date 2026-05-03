'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { InteractiveButton } from '@/components/ui/InteractiveButton'

const letterVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
}

const rotatingTexts = ['momentos únicos', 'experiencias inolvidables']

export function HeroSection() {
  const byLetters = ['B', 'Y']
  const hormigaLetters = ['H', 'O', 'R', 'M', 'I', 'G', 'A']
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen bg-[#0a0908] flex flex-col justify-end pb-12 md:pb-16 lg:pb-24 px-4 sm:px-6 lg:px-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0908] via-[#0a0908] to-[#0a0908]" />
      </div>

      {/* Background Logo with overlay effect */}
      <div className="absolute top-1/4 right-0 opacity-[0.08] pointer-events-none hidden sm:block z-[1] mix-blend-overlay">
        <Image
          src="/images/logo-hormiga.png"
          alt=""
          width={500}
          height={500}
          className="w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px] object-contain"
        />
      </div>



      {/* Main content */}
      <div className="relative z-10 max-w-[1600px] mx-auto w-full">
        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="w-8 h-px bg-gray-500" />
          <span className="text-[10px] tracking-[.2em] text-gray-400 uppercase">
            Events · Creative · Corporate · Montevideo, Uruguay
          </span>
        </motion.div>

        {/* Main Title */}
        <h1 className="overflow-hidden">
          <div className="flex overflow-hidden">
            {byLetters.map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={letterVariants}
                className="text-white font-black tracking-[-0.04em]"
                style={{
                  fontSize: 'clamp(48px, 14vw, 220px)',
                  lineHeight: 0.9,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
          <div className="flex overflow-hidden">
            {hormigaLetters.map((letter, i) => (
              <motion.span
                key={i}
                custom={i + byLetters.length}
                initial="hidden"
                animate="visible"
                variants={letterVariants}
                className="text-stroke font-black tracking-[-0.04em]"
                style={{
                  fontSize: 'clamp(48px, 14vw, 220px)',
                  lineHeight: 0.9,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </h1>

        {/* Tagline with rotating text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 text-base lg:text-lg max-w-md leading-relaxed"
        >
          <div className="relative h-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentTextIndex}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute left-0 text-white font-semibold uppercase tracking-wider"
              >
                {rotatingTexts[currentTextIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <InteractiveButton href="/#eventos" variant="primary">
            VER EVENTOS
          </InteractiveButton>
          <InteractiveButton href="/#contacto" variant="secondary">
            TRABAJEMOS JUNTOS
          </InteractiveButton>
        </motion.div>
      </div>

      {/* Scroll indicator - bottom right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 right-6 lg:right-12 hidden lg:flex flex-col items-center gap-4"
      >
        <span className="text-[10px] tracking-[.25em] text-gray-500 uppercase origin-center rotate-90 translate-y-6">
          SCROLL
        </span>
        <div className="w-px h-16 bg-white/20 relative overflow-hidden mt-8">
          <div className="absolute inset-0 bg-white animate-scroll-line" />
        </div>
      </motion.div>
    </section>
  )
}
