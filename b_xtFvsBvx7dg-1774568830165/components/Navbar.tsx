'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/nosotros', label: 'NOSOTROS' },
  {
    href: '/eventos',
    label: 'EVENTOS',
    submenu: [
      { href: '/eventos/activos', label: 'ACTIVOS' },
      { href: '/eventos/todos', label: 'TODOS' },
    ]
  },
  { href: '/momentos', label: 'MOMENTOS' },
  { href: '/noticias', label: 'NOTICIAS' },
  { href: '/sponsors', label: 'SPONSORS' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-[#0a0908]/95 backdrop-blur-md border-b border-white/10 shadow-lg'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12">
          <div className={cn(
            "flex items-center justify-between transition-all duration-500",
            isScrolled ? "h-14 sm:h-16" : "h-16 sm:h-20"
          )}>
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center group"
            >
              <div className={cn(
                "transition-all duration-500",
                isScrolled ? "w-7 h-7 sm:w-8 sm:h-8" : "w-8 h-8 sm:w-10 sm:h-10"
              )}>
                <Image
                  src="/images/logo-hormiga.png"
                  alt="BYHORMIGA"
                  width={40}
                  height={40}
                  priority
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 brightness-0 invert"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                'submenu' in link ? (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setOpenSubmenu(link.label)}
                    onMouseLeave={() => setOpenSubmenu(null)}
                  >
                    <button
                      className="text-[12px] font-medium tracking-[.25em] text-white/70 uppercase hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                    <AnimatePresence>
                      {openSubmenu === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-4 bg-[#0a0908] border border-white/10 shadow-2xl min-w-[160px] py-2"
                        >
                          {link.submenu.map((sublink) => (
                            <Link
                              key={sublink.href}
                              href={sublink.href}
                              className="block px-5 py-2.5 text-[11px] tracking-[.2em] text-white/70 uppercase hover:text-white hover:bg-white/5 transition-colors"
                            >
                              {sublink.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[12px] font-medium tracking-[.25em] text-white/70 uppercase hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>

            {/* Desktop CTA */}
            <Link
              href="/#contacto"
              className={cn(
				"hidden lg:block border border-white text-[12px] font-medium tracking-[.25em] uppercase text-white hover:bg-white hover:text-[#0a0908] transition-all duration-300",
                isScrolled ? "px-5 py-2" : "px-6 py-2.5"
              )}
            >
              CONTACTO
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-6 h-px bg-white block"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-px bg-white block"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-6 h-px bg-white block"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0a0908] flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex flex-col items-center gap-4"
                >
                  {'submenu' in link ? (
                    <>
                      <span className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
                        {link.label}
                      </span>
                      <div className="flex flex-col items-center gap-3">
                        {link.submenu.map((sublink) => (
                          <Link
                            key={sublink.href}
                            href={sublink.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg text-white/70 uppercase hover:text-white transition-colors tracking-wider"
                          >
                            {sublink.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase hover:text-white/60 transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: navLinks.length * 0.1, duration: 0.4 }}
              >
                <Link
                  href="/#contacto"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase hover:text-white/60 transition-colors"
                >
                  CONTACTO
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
