import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Sponsors - Marcas que Confían en Nosotros',
  description:
    'Conocé las marcas que confían en ByHormiga para crear experiencias únicas: Speed, Pilsen, Coca Cola y más. Descubrí nuestras activaciones y partnerships.',
  url: '/sponsors',
})

export default function SponsorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
