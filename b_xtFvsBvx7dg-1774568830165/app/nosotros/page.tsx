'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'

const teamMembers = [
  {
    name: 'Fernando Herrero',
    role: 'Fundador & Director',
    bio: 'Con más de 30 años de experiencia en la industria del entretenimiento, Fernando fundó ByHormiga con la visión de crear experiencias que trascienden.',
    image: '/team/fernando.jpg',
  },
  {
    name: 'Equipo Creativo',
    role: 'Diseño & Producción',
    bio: 'Nuestro equipo de creativos trabaja incansablemente para dar vida a cada evento con diseño innovador y producción impecable.',
    image: '/team/creative.jpg',
  },
  {
    name: 'Equipo Técnico',
    role: 'Sonido & Luces',
    bio: 'Expertos en tecnología audiovisual que garantizan que cada evento tenga la mejor calidad técnica.',
    image: '/team/tech.jpg',
  },
]

function HeroSection() {
  return (
    <section className="relative min-h-[60vh] bg-[#0a0908] flex items-center justify-center px-4 sm:px-6 lg:px-12 pt-24">
      <div className="max-w-[1600px] mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] tracking-[.25em] text-gray-500 uppercase font-mono">
            QUIÉNES SOMOS
          </span>
          <h1 className="mt-6 text-5xl lg:text-7xl font-black tracking-tight text-white uppercase">
            NOSOTROS
          </h1>
          <p className="mt-8 text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Desde 1996, ByHormiga ha estado transformando la escena de eventos en Uruguay,
            creando experiencias inolvidables que conectan a las personas a través de la música,
            el arte y la cultura.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section className="bg-[#0a0908] py-20 lg:py-32 px-4 sm:px-6 lg:px-12 border-t border-white/[.08]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left - Text */}
          <div>
            <h2 className="text-3xl lg:text-5xl font-black text-white uppercase mb-6">
              30 Años de Historia
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                ByHormiga nació en 1996 con una misión clara: crear momentos únicos que las
                personas recordarán para siempre. Lo que comenzó como una pequeña productora
                de eventos se ha convertido en la empresa líder de entretenimiento en Uruguay.
              </p>
              <p>
                Hemos producido más de 500 eventos, trabajado con más de 200 artistas
                nacionales e internacionales, y creado experiencias para miles de personas
                que confían en nosotros para los momentos más importantes de sus vidas.
              </p>
              <p>
                Nuestra filosofía es simple: cada evento es una oportunidad para crear algo
                extraordinario. Combinamos creatividad, tecnología y pasión para entregar
                experiencias que superan las expectativas.
              </p>
            </div>
          </div>

          {/* Right - Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="border border-white/[.08] p-8 text-center">
              <div className="text-5xl font-black text-white mb-2">30+</div>
              <div className="text-xs tracking-[.2em] text-gray-500 uppercase">Años</div>
            </div>
            <div className="border border-white/[.08] p-8 text-center">
              <div className="text-5xl font-black text-white mb-2">500+</div>
              <div className="text-xs tracking-[.2em] text-gray-500 uppercase">Eventos</div>
            </div>
            <div className="border border-white/[.08] p-8 text-center">
              <div className="text-5xl font-black text-white mb-2">200+</div>
              <div className="text-xs tracking-[.2em] text-gray-500 uppercase">Artistas</div>
            </div>
            <div className="border border-white/[.08] p-8 text-center">
              <div className="text-5xl font-black text-white mb-2">50+</div>
              <div className="text-xs tracking-[.2em] text-gray-500 uppercase">Por Mes</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function TeamSection() {
  return (
    <section className="bg-[#0a0908] py-20 lg:py-32 px-4 sm:px-6 lg:px-12 border-t border-white/[.08]">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[10px] tracking-[.25em] text-gray-500 uppercase font-mono">
            EL EQUIPO
          </span>
          <h2 className="mt-4 text-4xl lg:text-6xl font-black tracking-tight text-white uppercase">
            NUESTRO EQUIPO
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group"
            >
              {/* Photo placeholder */}
              <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 mb-6 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white/20 text-6xl font-black">
                  {member.name.charAt(0)}
                </div>
              </div>

              {/* Info */}
              <h3 className="text-xl font-bold text-white uppercase mb-2">
                {member.name}
              </h3>
              <p className="text-xs tracking-[.2em] text-gray-500 uppercase mb-4">
                {member.role}
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function NosotrosPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <TeamSection />
      </main>
      <Footer />
    </>
  )
}
