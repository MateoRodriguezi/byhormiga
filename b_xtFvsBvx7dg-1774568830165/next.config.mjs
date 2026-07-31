/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Por default Vercel cachea cada imagen optimizada solo 60s, asi que si
    // pasa mas de un minuto sin pedidos se vuelve a procesar desde cero
    // (lento). Se sube a 30 dias: las fotos de eventos/producciones no
    // cambian seguido una vez cargadas.
    minimumCacheTTL: 2592000,
    // Next.js pide hasta 3840px de ancho por default (pensado para heroes a
    // pantalla completa en 4K). Nada del sitio se muestra tan grande - se
    // saca ese variante (y 2048) para consumir menos cuota de optimizacion
    // de imagenes de Vercel por cada foto nueva.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    qualities: [75, 95],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'byhormiga-production.up.railway.app',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/eventos/todos',
        destination: '/producciones',
        permanent: true,
      },
      {
        source: '/eventos/todos/:slug',
        destination: '/producciones/:slug',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
