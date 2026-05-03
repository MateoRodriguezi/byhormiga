import { motion } from 'framer-motion'

export function SkeletonCard() {
  return (
    <div className="border border-white/[.08] overflow-hidden">
      {/* Image skeleton */}
      <motion.div
        className="aspect-video bg-gradient-to-r from-white/[.05] via-white/[.08] to-white/[.05]"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundSize: '200% 100%',
        }}
      />

      {/* Content skeleton */}
      <div className="p-6 space-y-3">
        <div className="h-4 bg-white/[.08] rounded w-3/4" />
        <div className="h-3 bg-white/[.05] rounded w-full" />
        <div className="h-3 bg-white/[.05] rounded w-5/6" />
      </div>
    </div>
  )
}

export function SkeletonEventCard() {
  return (
    <div className="border-b border-white/[.08] py-8">
      <div className="flex items-center justify-between gap-8">
        <div className="flex-1 space-y-4">
          <div className="h-6 bg-white/[.08] rounded w-1/4" />
          <div className="h-8 bg-white/[.1] rounded w-2/3" />
          <div className="h-4 bg-white/[.05] rounded w-1/3" />
        </div>
        <div className="h-12 w-32 bg-white/[.08] rounded" />
      </div>
    </div>
  )
}

export function SkeletonGalleryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
