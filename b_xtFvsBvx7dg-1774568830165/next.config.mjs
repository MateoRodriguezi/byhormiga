/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
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
