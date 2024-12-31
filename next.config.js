/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/illegal',
  output: 'export',
  images: {
    domains: ['images.pexels.com'],
    unoptimized: true,
  },
}

module.exports = nextConfig 