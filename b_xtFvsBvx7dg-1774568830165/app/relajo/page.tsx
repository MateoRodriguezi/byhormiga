'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

const featuredProducts = [
  {
    name: 'Hoodie Crazy David',
    color: 'Negro',
    image: 'https://f.fcdn.app/imgs/bb4a9b/www.relajoperoconorden.com/relauy/cce8/original/catalogo/H29725C_H29725C_1/800_1200/hoodie-crazy-david-negro-hoodie-crazy-david-negro.jpg'
  },
  {
    name: 'Hoodie Quilombito',
    color: 'Negro',
    image: 'https://f.fcdn.app/imgs/8be745/www.relajoperoconorden.com/relauy/cc6b/original/catalogo/HOQUI_NEG_1/800_1200/hoodie-quilombito-negro.jpg'
  },
  {
    name: 'Hoodie Full Classic',
    color: 'Crema',
    image: 'https://f.fcdn.app/imgs/ed0704/www.relajoperoconorden.com/relauy/b41d/original/catalogo/HOFC_CR_1/800_1200/hoodie-full-classic-crema.jpg'
  },
  {
    name: 'Hoodie Essential',
    color: 'Blanco',
    image: 'https://f.fcdn.app/imgs/374d8e/www.relajoperoconorden.com/relauy/b691/original/catalogo/HOESS_BLA_1/800_1200/hoodie-essential-blanco.jpg'
  },
  {
    name: 'Hoodie POV',
    color: 'Crema',
    image: 'https://f.fcdn.app/imgs/6492c1/www.relajoperoconorden.com/relauy/b413/original/catalogo/HOPOV_CR_1/800_1200/hoodie-pov-crema.jpg'
  },
  {
    name: 'Hoodie Satelite',
    color: 'Blanco',
    image: 'https://f.fcdn.app/imgs/397c9a/www.relajoperoconorden.com/relauy/06c3/original/catalogo/HOSAT_BLA_1/800_1200/hoodie-satelite-blanco.jpg'
  },
]

const categories = [
  { name: 'Hoodies', description: 'Buzos con capucha de alta calidad' },
  { name: 'Remerones', description: 'Remeras oversize premium' },
  { name: 'Personalizados', description: 'Diseños únicos para tu grupo' },
]

export default function RelajoPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[70vh] bg-[#0a0908] flex items-center justify-center px-4 sm:px-6 lg:px-12 pt-24 pb-12">
          <div className="max-w-[1400px] mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <span className="text-xs sm:text-sm tracking-[.25em] text-white uppercase font-mono">
                RELAJO PERO CON ORDEN
              </span>
              <h1 className="mt-6 text-5xl lg:text-8xl font-black tracking-tight text-white uppercase leading-tight">
                HOODIES<br />
                <span className="text-gray-600">CON ESTILO</span>
              </h1>
              <p className="mt-8 text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Ropa oversize, diseños que rompen el molde y una nueva línea de Stone Wash.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="bg-[#0a0908] py-20 lg:py-32 px-4 sm:px-6 lg:px-12 border-t border-white/[.08]">
          <div className="max-w-[1600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-6xl font-black text-white uppercase mb-4">
                PRODUCTOS DESTACADOS
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group border border-white/[.08] hover:border-white/20 transition-all overflow-hidden"
                >
                  {/* Product image */}
                  <div className="aspect-square relative overflow-hidden bg-stone-900">
                    <Image
                      src={product.image}
                      alt={`${product.name} - ${product.color}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-xs tracking-wider uppercase text-white/80">{product.color}</span>
                    </div>
                  </div>

                  {/* Product info */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white uppercase">{product.name}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="bg-[#0a0908] py-20 lg:py-32 px-4 sm:px-6 lg:px-12 border-t border-white/[.08]">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="border border-white/[.08] p-8 lg:p-10 text-center"
                >
                  <div className="text-4xl font-black text-white mb-4">{String(index + 1).padStart(2, '0')}</div>
                  <h3 className="text-2xl font-bold text-white uppercase mb-3">{category.name}</h3>
                  <p className="text-sm text-gray-400">{category.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Nosotros Section */}
        <section className="bg-[#0a0908] py-20 lg:py-32 px-4 sm:px-6 lg:px-12 border-t border-white/[.08]">
          <div className="max-w-[900px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-4xl lg:text-6xl font-black text-white uppercase mb-8">
                Nosotros
              </h2>
              <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
                <p className="text-xl text-white font-bold">
                  Bienvenidos al verdadero Relajo.
                </p>
                <p>
                  Somos un grupo de amigos con un solo objetivo en mente: hacer un poco de relajo.
                </p>
                <p>
                  Teníamos claro una sola cosa, queríamos crear algo distinto. Las preguntas fueron miles cuando arrancamos,
                  pero te contamos la primera: ¿Qué?. Y, sin tenerla muy clara, nuestra respuesta fue simple: ropa oversize,
                  diseños que rompan el molde y una nueva línea de Stone Wash que te hace volar la peluca.
                </p>
                <p>
                  Nuestras prendas están hechas y pensadas para vos, mezclamos diseños copados y cortes fuera de lo común.
                  Seguimos una onda relajada para cualquiera que se anime a jugar con prendas distintas y cancheras.
                </p>
                <p>
                  Date una vuelta por nuestra colección y descubrí cómo tu ropa puede hablar por vos sin decir una sola palabra.
                  Sabemos que no todo el mundo sigue las mismas reglas, así que si llegaste hasta acá te preguntamos:
                </p>
                <p className="text-2xl text-white font-black pt-4">
                  ¿Quién dice que no se puede vestir con un poco de Relajo?
                </p>
                <p className="text-sm text-gray-500 italic">
                  (ahora... que sea con un poco de orden).
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#0a0908] py-20 lg:py-32 px-4 sm:px-6 lg:px-12 border-t border-white/[.08]">
          <div className="max-w-[800px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-5xl font-black text-white uppercase mb-8">
                Comprá online
              </h2>
              <p className="text-gray-400 mb-12">
                Visitá nuestra tienda online para ver todos los modelos disponibles,
                elegir tu talle y realizar tu pedido.
              </p>

              <Link
                href="https://www.relajoperoconorden.com/hoodies"
                target="_blank"
                rel="noopener noreferrer"
				className="inline-flex items-center gap-3 bg-white text-[#0a0908] px-12 py-5 text-[12px] font-bold tracking-[.2em] uppercase hover:bg-white/90 transition-colors"
              >
                IR A LA TIENDA
                <ExternalLink className="w-4 h-4" />
              </Link>

              <p className="mt-6 text-xs text-gray-500">
                relajoperoconorden.com
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
