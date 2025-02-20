/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true, // Optimize global CSS (removes unused styles)
  },
  reactStrictMode: true, // Helps catch React issues in development
  images: {
    unoptimized: false, // Use Next.js image optimization
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console logs in production
  },
  compress: true, // Enable gzip and Brotli compression
};

export default nextConfig;
