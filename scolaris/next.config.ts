import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    ],
  },
  output: 'standalone',
  allowedDevOrigins: ['127.0.0.1', 'localhost', '*.replit.dev', '*.repl.co'],
}

export default nextConfig
