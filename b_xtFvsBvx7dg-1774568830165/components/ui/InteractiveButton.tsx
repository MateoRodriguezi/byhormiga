'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

interface InteractiveButtonProps {
  href?: string
  onClick?: () => void
  children: ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
}

export function InteractiveButton({
  href,
  onClick,
  children,
  variant = 'primary',
  className = '',
}: InteractiveButtonProps) {
  const baseClasses =
    'group relative inline-flex items-center justify-center px-8 py-4 text-[10px] font-bold tracking-[.2em] uppercase overflow-hidden transition-all duration-500'

  const variantClasses = {
    primary:
      'bg-white text-[#0a0908] hover:bg-[#0a0908] hover:text-white border border-white',
    secondary:
      'bg-[#0a0908] text-white hover:bg-white hover:text-[#0a0908] border border-white',
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  const content = (
    <>
      {/* Background animation */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
        style={{ transformOrigin: 'left' }}
      />

      {/* Cursor follower */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      {/* Content */}
      <span className="relative z-10 transition-colors duration-500">{children}</span>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  )
}
