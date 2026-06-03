/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  compress: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
}

export default nextConfig
