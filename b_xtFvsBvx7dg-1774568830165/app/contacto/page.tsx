import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ContactSection } from '@/components/sections/ContactSection'

export const metadata: Metadata = {
  title: 'Contacto | BYHORMIGA',
  description: 'Contactá con BYHORMIGA para eventos, prensa y consultas generales.',
}

export default function ContactoPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0a0908] pt-32">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12 pb-12">
          <Link
            href="/"
            className="text-[10px] tracking-[.2em] text-gray-500 uppercase hover:text-white transition-colors mb-4 inline-block"
          >
            ← VOLVER AL INICIO
          </Link>
        </div>
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
