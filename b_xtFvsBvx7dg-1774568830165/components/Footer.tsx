'use client'

import Link from 'next/link'
import Image from 'next/image'

const footerLinks = [
  { href: '#eventos', label: 'EVENTOS' },
  { href: '#galeria', label: 'GALERÍA' },
  { href: '#prensa', label: 'PRENSA' },
  { href: '#contacto', label: 'CONTACTO' },
]

export function Footer() {
  return (
    <footer className="border-t border-white/[.08] bg-[#0a0908]">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 sm:gap-4 group">
            <Image
              src="/images/logo-hormiga.png"
              alt="BYHORMIGA"
              width={32}
              height={32}
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain opacity-60 group-hover:opacity-100 transition-opacity"
            />
            <span className="text-[10px] sm:text-xs font-black tracking-[.2em] sm:tracking-[.25em] text-white uppercase">
              BYHORMIGA
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[9px] sm:text-[10px] font-medium tracking-[.2em] sm:tracking-[.25em] text-white/50 uppercase hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-[8px] sm:text-[10px] tracking-[.1em] sm:tracking-[.15em] text-white/40 uppercase text-center lg:text-right">
            © 2026 · Montevideo, Uruguay
          </p>
        </div>
      </div>
    </footer>
  )
}
