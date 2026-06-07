import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Nuestras Producciones | BYHORMIGA',
  description: 'Todas las producciones y eventos de BYHORMIGA en Uruguay.',
}

// Event data structure
interface EventData {
  name: string
  description: string
  logo?: string
  images?: string[]
}

const matineeEvents: EventData[] = [
  {
    name: 'Wonder',
    description: 'Con una edición mensual y un promedio de 1.300 personas por apertura, desde 2019 se posiciona como una propuesta consolidada dentro del entretenimiento para menores en Uruguay.',
    logo: '/logos/wonder.png',
  },
  {
    name: 'Mood',
    description: 'Con una edición trimestral y un promedio de 800 personas por apertura, desde 2023 se consolida como una propuesta de entretenimiento para menores, pensada desde la música, la producción y la seguridad.',
    logo: '/logos/mood.png',
  },
]

const plus15Events: EventData[] = [
  {
    name: 'CLOSE',
    description: 'Activa desde 2023, con una edición trimestral y un promedio de 1.200 personas por apertura, ofrece una experiencia de alta convocatoria en un entorno seguro y profesional.',
    logo: '/logos/close.png',
  },
  {
    name: 'LA FESTA',
    description: 'Con una edición trimestral y un promedio de 4.000 personas por apertura, desde 2025 ofrece una experiencia masiva, cuidada y profesional.',
    logo: '/logos/la-festa.png',
  },
  {
    name: 'MARLEY',
    description: 'Es una fiesta activa desde 2023. Con una edición trimestral y un promedio de 1.200 personas por apertura, se consolida como una propuesta joven, segura y profesional.',
    logo: '/logos/marley.png',
  },
]

const plus18Events: EventData[] = [
  {
    name: 'China',
    description: 'Es una fiesta para público de 18 a 25 años, activa desde 2016. Con una edición semanal y un promedio de 1.500 personas por apertura, es una de las propuestas más constantes de la noche.',
    logo: '/logos/china.png',
  },
  {
    name: 'Oversize',
    description: 'Es una fiesta para público de 18 a 25 años, activa desde 2022. Con 6 ediciones anuales y un promedio de 3.500 personas por apertura, se destaca por su gran escala y alta convocatoria.',
    logo: '/logos/oversize.png',
  },
  {
    name: 'BDHK',
    description: 'Es una fiesta para público de 18 a 25 años, activa desde 2020. Con una edición bimensual y un promedio de 1.200 personas por apertura, ofrece una propuesta sólida dentro del entretenimiento nocturno.',
    logo: '/logos/bdhk.png',
  },
  {
    name: 'PILLA™',
    description: 'Es una fiesta para público de 20 a 30 años, activa desde el año 2020. Con una edición mensual y un promedio de 800 personas por apertura, mantiene una propuesta constante, cuidada y profesional.',
    logo: '/logos/pilla.png',
  },
  {
    name: 'NADA QUE VER',
    description: 'Es una fiesta para público de 30 a 40 años, activa desde 2025. Con una edición trimestral y un promedio de 1.500 personas por apertura, se diferencia por su dinámica sin fotos ni videos y por temáticas distintas en cada fecha.',
    logo: '/logos/nada-que-ver.png',
  },
  {
    name: 'MALA',
    description: 'Es una fiesta para público de 18 a 22 años, activa desde 2024. Con una edición bimensual y un promedio de 1.000 personas por apertura, se consolida como una propuesta joven, intensa y de alta convocatoria.',
    logo: '/logos/mala.png',
  },
  {
    name: 'ORCA',
    description: 'Es una fiesta para público de 30 a 45 años, con una trayectoria de 25 años y una edición actualizada en 2025. Con un promedio de 800 personas por apertura, mantiene una propuesta reconocida y vigente.',
    logo: '/logos/orca.png',
  },
  {
    name: 'Bufón',
    description: 'Es una propuesta para público de 30 a 45 años, con 2 ediciones en 2025. En formato after office, reúne un promedio de 450 personas por apertura en un entorno cuidado y profesional.',
    logo: '/logos/bufon.png',
  },
  {
    name: 'NaviNait',
    description: 'Es una fiesta para público de 18 a 30 años, activa desde 2025. Con una edición anual en Club de la Costa y un promedio de 800 personas por apertura, ofrece una experiencia puntual, fresca y de alta convocatoria.',
    logo: '/logos/navinait.png',
  },
  {
    name: 'Hit The Beach',
    description: 'Es una fiesta para público de 18 a 30 años, activa desde 2023. Con una edición anual en Punta del Este y un promedio de 300 personas por apertura, propone una experiencia de temporada en formato playa.',
    logo: '/logos/hit-the-beach.png',
  },
]

const coproduccionInternacional: EventData[] = [
  {
    name: 'Polenta',
    description: 'Es una fiesta Argentina para público de 20 a 30 años, producimos una edición mensual en Uruguay. Promedia 1.300 personas por apertura y se consolida como una marca fuerte dentro del entretenimiento nocturno.',
    logo: '/logos/polenta.png',
  },
  {
    name: 'El Caserío Club',
    description: 'Llega desde Argentina con una experiencia para público de 20 a 30 años. Con una edición mensual en Uruguay y un promedio de 1.200 personas por apertura, se destaca por su identidad propia y alta convocatoria.',
    logo: '/logos/el-caserio-club.png',
  },
  {
    name: 'Non Stop',
    description: 'Es una marca Argentina orientada a público de 18 a 25 años, con una edición bimensual en Uruguay. Promedia 1.500 personas por apertura y se caracteriza por su energía, continuidad y conexión con el público joven.',
    logo: '/logos/non-stop.png',
  },
  {
    name: 'Hay Plan',
    description: 'Fiesta de Argentina orientada a público de 25 a 35 años, con una edición bimensual en Uruguay. Promedia 1.500 personas por apertura y se caracteriza por su energía, continuidad y conexión con el público joven.',
    logo: '/logos/hay-plan.png',
  },
]

const coproduccionNacional = [
  { name: 'After Pacha', logo: '/logos/after-pacha.png' },
  { name: 'Beerhouse', logo: '/logos/beerhouse.png' },
  { name: 'Casauma', logo: '/logos/casauma.png' },
  { name: 'Cordón Beer', logo: '/logos/cordonbeer.png' },
]

function CategorySection({
  title,
  subtitle,
  events,
  showDescription = true,
}: {
  title: string
  subtitle: string
  events: EventData[]
  showDescription?: boolean
}) {
  return (
    <section className="mb-24 lg:mb-32">
      <div className="mb-12">
        <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-white uppercase">
          {title}
        </h2>
        <p className="mt-4 text-sm text-gray-400 max-w-3xl">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <div
            key={index}
            className="group relative border border-white/10 bg-gradient-to-br from-[#0a0908] to-[#1a1a1a] p-8 hover:border-white/30 transition-all duration-300"
          >
            {/* Logo - solo mostrar si existe */}
            {event.logo && (
              <div className="mb-6 h-24 flex items-center justify-start">
                <div className="relative w-full h-full">
                  <Image
                    src={event.logo}
                    alt={event.name}
                    fill
                    className="object-contain object-left brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            )}

            {/* Event Name */}
            <h3 className={`text-xl font-bold text-white uppercase tracking-wide ${event.logo ? 'mb-4' : 'mb-6'}`}>
              {event.name}
            </h3>

            {/* Description */}
            {showDescription && event.description && (
              <p className="text-sm text-gray-400 leading-relaxed">
                {event.description}
              </p>
            )}

            {/* Hover effect */}
            <div className="absolute inset-0 bg-white/[.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  )
}

export default function TodosEventosPage() {
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
            <span className="block text-xs sm:text-sm tracking-[.25em] text-white uppercase font-mono mt-8">
              PORTAFOLIO COMPLETO
            </span>
            <h1 className="mt-4 text-5xl lg:text-7xl font-black tracking-tight text-white uppercase">
              Nuestras producciones / productos
            </h1>
          </div>

          {/* Category Navigation */}
          <div className="mb-16 flex flex-wrap gap-4">
            <a
              href="#matinee"
              className="border border-white/30 text-white px-6 py-3 text-[12px] font-medium tracking-[.2em] uppercase hover:bg-white hover:text-[#0a0908] transition-colors"
            >
              MATINEÉ
            </a>
            <a
              href="#plus15"
              className="border border-white/30 text-white px-6 py-3 text-[12px] font-medium tracking-[.2em] uppercase hover:bg-white hover:text-[#0a0908] transition-colors"
            >
              +15
            </a>
            <a
              href="#plus18"
              className="border border-white/30 text-white px-6 py-3 text-[12px] font-medium tracking-[.2em] uppercase hover:bg-white hover:text-[#0a0908] transition-colors"
            >
              +18
            </a>
            <a
              href="#coproducciones"
              className="border border-white/30 text-white px-6 py-3 text-[12px] font-medium tracking-[.2em] uppercase hover:bg-white hover:text-[#0a0908] transition-colors"
            >
              CO-PRODUCCIONES
            </a>
          </div>

          {/* Matineé Section */}
          <div id="matinee">
            <CategorySection
              title="Nuestras matinées"
              subtitle="Eventos para adolescentes de 12 a 15 años, con música, producción y seguridad."
              events={matineeEvents}
            />
          </div>

          {/* Plus 15 Section */}
          <div id="plus15">
            <CategorySection
              title="Nuestras Plus 15"
              subtitle="Eventos para adolescentes de 15 a 17 años."
              events={plus15Events}
            />
          </div>

          {/* Plus 18 Section */}
          <div id="plus18">
            <CategorySection
              title="Nuestros productos para mayores de 18 años"
              subtitle=""
              events={plus18Events}
            />
          </div>

          {/* Co-Producciones Section */}
          <div id="coproducciones" className="mb-24 lg:mb-32">
            <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-white uppercase mb-12">
              Co-Producciones internacionales
            </h2>
            <CategorySection
              title=""
              subtitle=""
              events={coproduccionInternacional}
            />

            <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-white uppercase mb-12 mt-20">
              Co-Producciones nacionales
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {coproduccionNacional.map((event, index) => (
                <div
                  key={index}
                  className="group relative border border-white/10 bg-gradient-to-br from-[#0a0908] to-[#1a1a1a] p-8 hover:border-white/30 transition-all duration-300 aspect-square flex items-center justify-center"
                >
                  {event.logo && (
                    <div className="relative w-full h-full">
                      <Image
                        src={event.logo}
                        alt={event.name}
                        fill
                        className="object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      />
                    </div>
                  )}
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
