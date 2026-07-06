import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CATEGORY_LABELS, coproduccionNacional, getBrandsByCategory, type Brand } from '@/lib/brands'

export const metadata: Metadata = {
  title: 'Nuestras Producciones | BYHORMIGA',
  description: 'Todas las producciones y eventos de BYHORMIGA en Uruguay.',
}

function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link
      href={`/eventos/todos/${brand.slug}`}
      className="group relative block overflow-hidden border border-white/10 bg-gradient-to-br from-[#0a0908] to-[#1a1a1a] p-8 hover:border-white/30 transition-all duration-300"
    >
      {brand.heroImage ? (
        <Image
          src={brand.heroImage}
          alt=""
          fill
          className="object-cover opacity-20 grayscale group-hover:opacity-30 group-hover:grayscale-0 transition-all duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-[#0a0908]/70 to-[#0a0908]/40" />

      <div className="relative">
        {brand.logo ? (
          <div className="mb-6 h-24 flex items-center justify-start">
            <div className="relative w-full h-full">
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                className="object-contain object-left brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        ) : (
          <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-4">{brand.name}</h3>
        )}

        <p className="text-sm text-gray-400 leading-relaxed">{brand.cardDescription}</p>

        <span className="mt-6 inline-block text-[11px] tracking-[.2em] text-white/60 uppercase group-hover:text-white transition-colors">
          Ver más →
        </span>
      </div>

      <div className="absolute inset-0 bg-white/[.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </Link>
  )
}

function CategorySection({
  id,
  title,
  subtitle,
  brands,
}: {
  id: string
  title: string
  subtitle?: string
  brands: Brand[]
}) {
  if (brands.length === 0) return null

  return (
    <div id={id} className="mb-24 lg:mb-32">
      <div className="mb-12">
        <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-white uppercase">{title}</h2>
        {subtitle && <p className="mt-4 text-sm text-gray-400 max-w-3xl">{subtitle}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <BrandCard key={brand.slug} brand={brand} />
        ))}
      </div>
    </div>
  )
}

export default function TodosEventosPage() {
  const matinee = getBrandsByCategory('matinee')
  const plus15 = getBrandsByCategory('plus15')
  const plus18 = getBrandsByCategory('plus18')
  const coprodInternacional = getBrandsByCategory('coproduccion_internacional')

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0a0908] pt-32 pb-24">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          {/* Header */}
          <div className="mb-20">
            <Link
              href="/"
              className="text-[12px] tracking-[.2em] text-gray-500 uppercase hover:text-white transition-colors mb-4 inline-block"
            >
              ← VOLVER AL INICIO
            </Link>
            <h1 className="mt-8 text-5xl lg:text-7xl font-black tracking-tight text-white uppercase">
              Nuestras producciones
            </h1>
            <p className="mt-6 text-lg text-gray-400 max-w-3xl leading-relaxed">
              Creamos experiencias de entretenimiento para distintos públicos, combinando producción, contenido y ejecución profesional.
            </p>
          </div>

          {/* Category Navigation */}
          <div className="mb-16 flex flex-wrap gap-4">
            <a href="#matinee" className="border border-white/30 text-white px-6 py-3 text-[12px] font-medium tracking-[.2em] uppercase hover:bg-white hover:text-[#0a0908] transition-colors">
              {CATEGORY_LABELS.matinee}
            </a>
            <a href="#plus15" className="border border-white/30 text-white px-6 py-3 text-[12px] font-medium tracking-[.2em] uppercase hover:bg-white hover:text-[#0a0908] transition-colors">
              {CATEGORY_LABELS.plus15}
            </a>
            <a href="#plus18" className="border border-white/30 text-white px-6 py-3 text-[12px] font-medium tracking-[.2em] uppercase hover:bg-white hover:text-[#0a0908] transition-colors">
              {CATEGORY_LABELS.plus18}
            </a>
            <a href="#coproducciones" className="border border-white/30 text-white px-6 py-3 text-[12px] font-medium tracking-[.2em] uppercase hover:bg-white hover:text-[#0a0908] transition-colors">
              {CATEGORY_LABELS.coproduccion_internacional}
            </a>
          </div>

          <CategorySection
            id="matinee"
            title="Nuestras matinées"
            subtitle="Propuestas de entretenimiento para adolescentes de 12 a 15 años, diseñadas con foco en la diversión, la innovación y el cuidado integral de la experiencia."
            brands={matinee}
          />

          <CategorySection
            id="plus15"
            title="Nuestras Plus 15"
            subtitle="Eventos para adolescentes de 15 a 17 años."
            brands={plus15}
          />

          <CategorySection
            id="plus18"
            title="Nuestros productos para mayores de 18 años"
            brands={plus18}
          />

          <div id="coproducciones" className="mb-24 lg:mb-32">
            <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-white uppercase mb-12">
              Co-Producciones internacionales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coprodInternacional.map((brand) => (
                <BrandCard key={brand.slug} brand={brand} />
              ))}
            </div>

            <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-white uppercase mb-12 mt-20">
              Co-Producciones nacionales
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {coproduccionNacional.map((event) => (
                <div
                  key={event.name}
                  className="group relative border border-white/10 bg-gradient-to-br from-[#0a0908] to-[#1a1a1a] p-8 hover:border-white/30 transition-all duration-300 aspect-square flex items-center justify-center"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={event.logo}
                      alt={event.name}
                      fill
                      className="object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
