import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Relajo Pero Con Orden - Hoodies y Ropa Oversize',
  description:
    'Ropa oversize, diseños que rompen el molde y una nueva línea de Stone Wash. Descubrí la colección de hoodies, remerones y personalizados de Relajo.',
  url: '/relajo',
})

export default function RelajoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
