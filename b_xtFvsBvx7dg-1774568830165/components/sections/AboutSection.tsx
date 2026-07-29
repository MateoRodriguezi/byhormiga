'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { RotatingPhotos } from '@/components/RotatingPhotos'
import type { StoryBlock } from '@/lib/types'

// Imágenes de fondo que van rotando
const backgroundImages = [
  '/mock-photos/about-1.jpg',
  '/mock-photos/about-2.jpg',
  '/mock-photos/about-3.jpg',
  '/mock-photos/about-4.jpg',
  '/mock-photos/about-5.jpg',
]

export function AboutSection({
  heroTitle,
  storyBlocks,
}: {
  heroTitle: string
  storyBlocks: StoryBlock[]
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [currentBgIndex, setCurrentBgIndex] = useState(0)

  // Cambiar imagen de fondo cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const [introBlock, ...photoBlocks] = storyBlocks

  return (
    <section id="nosotros" className="relative bg-[#0a0908] py-8 sm:py-10 lg:py-14 overflow-hidden">
      {/* Background images con baja opacidad que van cambiando */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.04 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${backgroundImages[currentBgIndex]})`,
                filter: 'grayscale(0.8)',
              }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0908]/85 via-[#0a0908]/70 to-[#0a0908]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-24"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black font-heading tracking-[-0.035em] text-white">
            {heroTitle}
          </h2>
        </motion.div>

        {/* Intro con texto destacado */}
        {introBlock && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-5xl mx-auto mb-20 lg:mb-32 text-center"
          >
            <p
              className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed text-balance [&_strong]:font-bold [&_strong]:text-white"
              dangerouslySetInnerHTML={{ __html: introBlock.text }}
            />
          </motion.div>
        )}

        {/* Bloques con foto, alternando lado */}
        {photoBlocks.map((block, index) => {
          const imageFirst = index % 2 === 0
          const isLast = index === photoBlocks.length - 1

          return (
            <motion.div
              key={`${block.title}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className={`max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-center ${isLast ? '' : 'mb-20 lg:mb-32'}`}
            >
              <div className={`lg:col-span-2 ${imageFirst ? 'lg:order-2' : ''}`}>
                <p
                  className="text-base sm:text-lg text-gray-300 leading-relaxed text-balance [&_strong]:font-bold [&_strong]:text-white"
                  dangerouslySetInnerHTML={{ __html: block.text }}
                />
              </div>
              <div className={`lg:col-span-3 ${imageFirst ? 'lg:order-1' : ''}`}>
                {block.images?.length > 0 && (
                  <RotatingPhotos images={block.images} alt={block.title || 'ByHormiga'} />
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
