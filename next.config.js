/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lojadocraque.com.br'],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
