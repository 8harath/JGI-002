/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable build checks for better code quality
  // If you encounter errors, fix them instead of ignoring
  eslint: {
    ignoreDuringBuilds: false, // Enable ESLint checks
  },
  typescript: {
    ignoreBuildErrors: false, // Enable TypeScript checks
  },
  images: {
    unoptimized: false, // Enable image optimization
    remotePatterns: [
      // Add patterns for external CDN images when using Cloudflare R2
      // Example:
      // {
      //   protocol: 'https',
      //   hostname: 'pub-*.r2.dev',
      // },
    ],
  },
  // Performance optimizations
  swcMinify: true, // Use SWC for faster minification
  reactStrictMode: true, // Enable React strict mode for better development
}

export default nextConfig
