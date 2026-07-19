'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

export function RotatingPhotos({
  images,
  alt,
  intervalMs = 1200,
  className = 'aspect-[4/5] lg:aspect-[4/3]',
}: {
  images: string[]
  alt: string
  intervalMs?: number
  className?: string
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (images.length < 2) return
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, intervalMs)
    return () => clearInterval(interval)
  }, [images.length, intervalMs])

  if (images.length === 0) return null

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Image src={images[index]} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
