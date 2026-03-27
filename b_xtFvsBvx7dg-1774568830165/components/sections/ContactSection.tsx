'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { submitContactForm } from '@/lib/api'
import { AntLogo } from '../AntLogo'

const socialLinks = [
  { label: 'IG', href: 'https://instagram.com/by.hormiga' },
]

function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-8 sm:mb-12 lg:mb-16"
    >
      <span className="text-[9px] sm:text-[10px] tracking-[.2em] sm:tracking-[.25em] text-gray-500 uppercase font-mono">
        04 — CONTACTO
      </span>
      <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight text-white uppercase">
        HABLEMOS
      </h2>
    </motion.div>
  )
}

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(contentRef, { once: true, margin: '-100px' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    }

    try {
      await submitContactForm(data)
      setIsSubmitted(true)
      formRef.current?.reset()
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contacto" className="bg-[#111111] py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12">
        <SectionHeader />

        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
        >
          {/* Left Column - Typography & Info */}
          <div className="relative">
            {/* Watermark logo */}
            <div className="absolute -left-8 top-0 opacity-[0.04] pointer-events-none hidden lg:block">
              <AntLogo size="lg" />
            </div>

            {/* Large typographic statement */}
            <div className="mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none">
                ¿TENÉS ALGO
                <br />
                EN MENTE?
              </h3>
              <p className="mt-2 text-2xl sm:text-3xl lg:text-5xl font-black text-stroke uppercase tracking-tight leading-none">
                ESCRIBINOS.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-6 mb-12">
              <div>
                <span className="block text-[10px] tracking-[.2em] text-gray-500 uppercase mb-1">
                  Email
                </span>
                <a
                  href="mailto:contacto@byhormiga.com"
                  className="text-white hover:text-white/70 transition-colors"
                >
                  contacto@byhormiga.com
                </a>
              </div>
              <div>
                <span className="block text-[10px] tracking-[.2em] text-gray-500 uppercase mb-1">
                  Teléfono
                </span>
                <a
                  href="tel:+59893911111"
                  className="text-white hover:text-white/70 transition-colors"
                >
                  +598 93 911 111
                </a>
              </div>
              <div>
                <span className="block text-[10px] tracking-[.2em] text-gray-500 uppercase mb-1">
                  Dirección
                </span>
                <p className="text-white">Av. Burgues 3169, Montevideo</p>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-white/20 flex items-center justify-center text-[10px] font-bold tracking-[.1em] text-white/60 hover:bg-white/10 hover:text-white transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            {isSubmitted ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white uppercase tracking-wide mb-2">
                    MENSAJE ENVIADO
                  </p>
                  <p className="text-sm text-gray-400">
                    Te responderemos lo antes posible.
                  </p>
                </div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="sr-only">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="NOMBRE"
                      className="w-full bg-white/[.03] border border-white/[.08] px-4 py-4 text-sm text-white placeholder:text-gray-600 placeholder:text-[10px] placeholder:tracking-[.2em] focus:border-white/30 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="EMAIL"
                      className="w-full bg-white/[.03] border border-white/[.08] px-4 py-4 text-sm text-white placeholder:text-gray-600 placeholder:text-[10px] placeholder:tracking-[.2em] focus:border-white/30 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="sr-only">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    placeholder="ASUNTO"
                    className="w-full bg-white/[.03] border border-white/[.08] px-4 py-4 text-sm text-white placeholder:text-gray-600 placeholder:text-[10px] placeholder:tracking-[.2em] focus:border-white/30 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="sr-only">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="MENSAJE"
                    className="w-full bg-white/[.03] border border-white/[.08] px-4 py-4 text-sm text-white placeholder:text-gray-600 placeholder:text-[10px] placeholder:tracking-[.2em] focus:border-white/30 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-[#0a0908] py-4 text-[10px] font-bold tracking-[.2em] uppercase hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
