'use client'

import { cn } from '@/lib/utils'

interface AntLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function AntLogo({ className, size = 'md' }: AntLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-32 h-32',
    xl: 'w-64 h-64',
  }

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn(sizeClasses[size], className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hand-drawn style ant - rough strokes */}
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Head */}
        <ellipse cx="50" cy="22" rx="10" ry="8" fill="currentColor" />
        
        {/* Antennae - rough curved strokes */}
        <path d="M44 16 C40 10, 35 6, 30 4" strokeWidth="1.5" />
        <path d="M56 16 C60 10, 65 6, 70 4" strokeWidth="1.5" />
        
        {/* Thorax */}
        <ellipse cx="50" cy="38" rx="12" ry="10" fill="currentColor" />
        
        {/* Abdomen - larger, segmented feel */}
        <ellipse cx="50" cy="62" rx="16" ry="20" fill="currentColor" />
        
        {/* Front legs */}
        <path d="M38 34 C30 28, 22 26, 16 22" strokeWidth="1.8" />
        <path d="M62 34 C70 28, 78 26, 84 22" strokeWidth="1.8" />
        
        {/* Middle legs */}
        <path d="M38 42 C28 44, 18 48, 10 54" strokeWidth="1.8" />
        <path d="M62 42 C72 44, 82 48, 90 54" strokeWidth="1.8" />
        
        {/* Back legs */}
        <path d="M40 58 C30 66, 20 76, 14 86" strokeWidth="1.8" />
        <path d="M60 58 C70 66, 80 76, 86 86" strokeWidth="1.8" />
        
        {/* Eyes - small dots */}
        <circle cx="46" cy="20" r="2" fill="#0a0908" />
        <circle cx="54" cy="20" r="2" fill="#0a0908" />
      </g>
    </svg>
  )
}
