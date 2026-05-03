'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, ShoppingBag, Palette, TrendingUp } from 'lucide-react'

const featuredProducts = [
  { name: 'Hoodie Crazy David', color: 'Negro', price: '$2.490' },
  { name: 'Hoodie Quilombito', color: 'Negro', price: '$2.490' },
  { name: 'Hoodie Full Classic', color: 'Crema', price: '$2.490' },
  { name: 'Hoodie Essential', color: 'Blanco', price: '$2.490' },
  { name: 'Hoodie POV', color: 'Crema', price: '$2.490' },
  { name: 'Hoodie Satelite', color: 'Blanco / Negro', price: '$2.490' },
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
              <span className="text-[10px] tracking-[.25em] text-gray-500 uppercase font-mono">
                RELAJO PERO CON ORDEN
              </span>
              <h1 className="mt-6 text-5xl lg:text-8xl font-black tracking-tight text-white uppercase leading-tight">
                HOODIES<br />
                <span className="text-gray-600">CON ESTILO</span>
              </h1>
              <p className="mt-8 text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Diseños minimalistas, colores tierra y calidad premium.
                La marca uruguaya que combina relajación con orden.
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
              <p className="text-gray-400">Precio uniforme: <span className="text-white font-bold">$2.490 UYU</span></p>
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
                  {/* Product image placeholder */}
                  <div className="aspect-square bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <ShoppingBag className="w-16 h-16 text-white/20" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-xs tracking-wider uppercase text-white/80">{product.color}</span>
                    </div>
                  </div>

                  {/* Product info */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white uppercase mb-2">{product.name}</h3>
                    <p className="text-2xl font-black text-white">{product.price}</p>
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

        {/* Features */}
        <section className="bg-[#0a0908] py-20 px-4 sm:px-6 lg:px-12 border-t border-white/[.08]">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <Palette className="w-10 h-10 text-white mx-auto mb-4" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Colores Neutros</h4>
                <p className="text-xs text-gray-500">Beige, Marrón, Blanco, Negro</p>
              </div>
              <div>
                <TrendingUp className="w-10 h-10 text-white mx-auto mb-4" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Diseño Minimalista</h4>
                <p className="text-xs text-gray-500">Estilo casual pero estructurado</p>
              </div>
              <div>
                <ShoppingBag className="w-10 h-10 text-white mx-auto mb-4" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Calidad Premium</h4>
                <p className="text-xs text-gray-500">Los mejores materiales</p>
              </div>
            </div>
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
                className="inline-flex items-center gap-3 bg-white text-[#0a0908] px-12 py-5 text-[11px] font-bold tracking-[.2em] uppercase hover:bg-white/90 transition-colors"
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
