'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { RotatingPhotos } from '@/components/RotatingPhotos'

// Imágenes de fondo que van rotando
const backgroundImages = [
  '/mock-photos/about-1.jpg',
  '/mock-photos/about-2.jpg',
  '/mock-photos/about-3.jpg',
  '/mock-photos/about-4.jpg',
  '/mock-photos/about-5.jpg',
]

// Fotos que van rotando en cada sector de "Quiénes somos"
const sectorPhotos = [
  ['/mock-photos/about-6.jpg', '/mock-photos/about-7.jpg', '/mock-photos/about-8.jpg'],
  ['/mock-photos/about-9.jpg', '/mock-photos/about-10.jpg', '/mock-photos/about-11.jpg'],
]

export function AboutSection() {
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
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-[-0.035em] text-white">
            Quiénes somos
          </h2>
        </motion.div>

        {/* Intro con texto destacado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto mb-20 lg:mb-32 text-center"
        >
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed">
            Somos una <span className="font-bold text-white">productora de eventos y entretenimiento en Uruguay</span>, enfocada en crear propuestas de alta convocatoria que integran producción, contenido y ejecución profesional. Lo que comenzó como un pequeño proyecto hoy se convirtió en un referente del entretenimiento, desarrollando formatos innovadores para distintos públicos, con <span className="font-bold text-white">impacto, recordación y conexión emocional</span>.
          </p>
        </motion.div>

        {/* Section 1: Descripción adicional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-6xl mx-auto mb-20 lg:mb-32 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
        >
          <div className="lg:order-2">
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Al año producimos un promedio de más de <span className="font-bold text-white">200 eventos</span>, trabajamos junto a más de <span className="font-bold text-white">150 artistas</span> nacionales e internacionales y convocamos a más de <span className="font-bold text-white">200.000 personas</span>. Además, somos una de las empresas con mayor volumen de eventos para menores de 18 años en Uruguay, con un conocimiento profundo de las particularidades operativas, legales y logísticas que este tipo de producciones requiere.
            </p>
          </div>
          <div className="lg:order-1">
            <RotatingPhotos images={sectorPhotos[0]} alt="Eventos ByHormiga" />
          </div>
        </motion.div>

        {/* Section 2: Filosofía */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
        >
          <div>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Nuestra filosofía es simple: cada evento es una oportunidad para crear algo extraordinario. Por eso, <span className="font-bold text-white">combinamos creatividad, tecnología y pasión</span> para diseñar propuestas memorables, capaces de superar las expectativas de cada cliente.
            </p>
          </div>
          <div>
            <RotatingPhotos images={sectorPhotos[1]} alt="Producción ByHormiga" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
