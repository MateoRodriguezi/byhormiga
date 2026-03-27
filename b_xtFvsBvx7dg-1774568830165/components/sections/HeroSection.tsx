'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

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

export function HeroSection() {
  const byLetters = ['B', 'Y']
  const hormigaLetters = ['H', 'O', 'R', 'M', 'I', 'G', 'A']

  return (
    <section className="relative min-h-screen bg-[#0a0908] flex flex-col justify-end pb-12 md:pb-16 lg:pb-24 px-4 sm:px-6 lg:px-12 overflow-hidden">
      {/* Background Logo */}
      <div className="absolute top-1/4 right-0 opacity-[0.06] pointer-events-none hidden sm:block">
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

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 text-gray-400 text-sm lg:text-base max-w-md leading-relaxed"
        >
          Dedicados a crear momentos únicos y experiencias que no se olvidan.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="#eventos"
            className="inline-flex items-center justify-center bg-white text-[#0a0908] px-6 sm:px-8 py-3 sm:py-4 text-[9px] sm:text-[10px] font-bold tracking-[.15em] sm:tracking-[.2em] uppercase hover:bg-white/90 transition-colors"
          >
            VER EVENTOS
          </Link>
          <Link
            href="#contacto"
            className="inline-flex items-center justify-center border border-white text-white px-6 sm:px-8 py-3 sm:py-4 text-[9px] sm:text-[10px] font-bold tracking-[.15em] sm:tracking-[.2em] uppercase hover:bg-white hover:text-[#0a0908] transition-colors"
          >
            TRABAJEMOS JUNTOS
          </Link>
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
