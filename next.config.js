/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000']
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cesium.com'
      }
    ]
  }
}

module.exports = nextConfig
