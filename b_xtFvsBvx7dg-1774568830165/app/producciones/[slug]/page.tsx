import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BrandPage } from '@/components/BrandPage'
import { brands, getBrandBySlug } from '@/lib/brands'

interface BrandRouteProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }))
}

export async function generateMetadata({ params }: BrandRouteProps): Promise<Metadata> {
  const { slug } = await params
  const brand = getBrandBySlug(slug)

  if (!brand) {
    return { title: 'No encontrado | BYHORMIGA' }
  }

  return {
    title: `${brand.name} | BYHORMIGA`,
    description: brand.cardDescription,
  }
}

export default async function BrandRoute({ params }: BrandRouteProps) {
  const { slug } = await params
  const brand = getBrandBySlug(slug)

  if (!brand) {
    notFound()
  }

  return <BrandPage brand={brand} />
}
