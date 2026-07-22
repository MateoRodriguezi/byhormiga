'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RotatingPhotos } from '@/components/RotatingPhotos'
import type { Brand } from '@/lib/brands'

function Hero({ brand }: { brand: Brand }) {
  return (
    <section className="relative min-h-[60vh] bg-[#0a0908] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 mt-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        {brand.heroVideo ? (
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60">
            <source src={brand.heroVideo} type="video/mp4" />
          </video>
        ) : brand.heroImage ? (
          <Image src={brand.heroImage} alt="" fill className="object-cover opacity-60" priority />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0908]/70 via-[#0a0908]/60 to-[#0a0908]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto w-full text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {brand.logo ? (
            <div className="relative mx-auto w-[min(80vw,520px)] h-[160px] lg:h-[220px]">
              <Image src={brand.logo} alt={brand.name} fill className="object-contain brightness-0 invert" priority />
            </div>
          ) : (
            <h1 className="text-5xl lg:text-8xl font-black font-heading tracking-[-0.035em] text-white">{brand.name}</h1>
          )}
        </motion.div>
      </div>
    </section>
  )
}

const wordVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

function Destacado({ text }: { text: string }) {
  const words = text.split(' ')

  return (
    <section className="bg-[#0a0908] py-16 lg:py-24 px-4 sm:px-6 lg:px-12 border-t border-white/[.08]">
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        transition={{ staggerChildren: 0.06 }}
        className="max-w-4xl mx-auto text-center text-2xl lg:text-4xl font-black text-white font-heading tracking-[-0.035em] leading-tight"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordVariants}
            transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        ))}
      </motion.p>
    </section>
  )
}

function SectionBlock({ side, text, images, video, label }: Brand['sections'][number]) {
  if (side === 'full') {
    return (
      <section className="bg-[#0a0908] px-4 sm:px-6 lg:px-12 pb-16 lg:pb-24">
        <div className="max-w-[1600px] mx-auto">
          {label && (
            <p className="text-center text-xs tracking-[.25em] text-gray-500 uppercase mb-6">{label}</p>
          )}
          {video ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              controls
              className="mx-auto max-h-[85vh] w-auto max-w-full bg-black object-contain"
            >
              <source src={video} type="video/mp4" />
            </video>
          ) : images && images.length > 0 ? (
            <div className="relative w-full aspect-video overflow-hidden">
              <Image src={images[0]} alt={label ?? ''} fill className="object-cover" />
            </div>
          ) : null}
        </div>
      </section>
    )
  }

  const imageFirst = side === 'left'

  return (
    <section className="bg-[#0a0908] px-4 sm:px-6 lg:px-12 pb-16 lg:pb-24">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div className={imageFirst ? 'lg:order-1' : 'lg:order-2'}>
          {images && images.length > 0 && <RotatingPhotos images={images} alt="" intervalMs={2800} />}
        </div>
        <div className={imageFirst ? 'lg:order-2' : 'lg:order-1'}>
          {text && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-lg lg:text-xl text-gray-300 leading-relaxed text-balance"
            >
              {text}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  )
}

function Venues({ intro, venues }: { intro?: string; venues: Brand['venues'] }) {
  if (!venues || venues.length === 0) return null

  const cols = venues.length >= 5 ? 'md:grid-cols-4' : venues.length === 4 ? 'md:grid-cols-4' : venues.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'

  return (
    <section className="bg-[#0a0908] px-4 sm:px-6 lg:px-12 pb-16 lg:pb-24">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="text-xs tracking-[.25em] text-gray-500 uppercase mb-4 text-center">Venues</h2>
        {intro && (
          <p className="max-w-3xl mx-auto text-center text-gray-400 leading-relaxed text-balance mb-10">{intro}</p>
        )}
        <div className={`grid grid-cols-2 ${cols} gap-[3px]`}>
          {venues.map((venue) => (
            <div key={venue.name} className="relative aspect-square overflow-hidden bg-white/[.03] border border-white/[.08] group">
              {venue.image ? (
                <Image
                  src={venue.image}
                  alt={venue.name}
                  fill
                  className="object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-500"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a0908] via-[#1a1a1a] to-[#0f0f0f]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xs lg:text-sm font-bold text-white uppercase tracking-wide">{venue.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Closing({ image, video, text }: { image?: string; video?: string; text?: string }) {
  if (!image && !video && !text) return null

  return (
    <section className="bg-[#0a0908] border-t border-white/[.08]">
      {video ? (
        <video autoPlay loop muted playsInline className="w-full aspect-video object-cover">
          <source src={video} type="video/mp4" />
        </video>
      ) : image ? (
        <div className="relative w-full aspect-video">
          <Image src={image} alt="" fill className="object-cover" />
        </div>
      ) : null}
      {text && (
        <div className="px-4 sm:px-6 lg:px-12 py-16 lg:py-24">
          <p className="max-w-3xl mx-auto text-center text-gray-400 leading-relaxed text-balance text-base lg:text-lg">
            {text}
          </p>
        </div>
      )}
    </section>
  )
}

export function BrandPage({ brand }: { brand: Brand }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0a0908]">
        <div className="pt-32 px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto w-full">
          <Link
            href="/eventos/todos"
            className="text-[12px] tracking-[.2em] text-gray-500 uppercase hover:text-white transition-colors inline-block"
          >
            ← Volver a nuestras producciones
          </Link>
        </div>

        <Hero brand={brand} />
        <Destacado text={brand.destacado} />

        {brand.sections.map((section, i) => (
          <SectionBlock key={i} {...section} />
        ))}

        <Venues intro={brand.venuesIntro} venues={brand.venues} />

        <Closing image={brand.closingImage} video={brand.closingVideo} text={brand.closingText} />
      </main>
      <Footer />
    </>
  )
}
