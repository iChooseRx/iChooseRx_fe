/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  reactStrictMode: true,
  images: {
    unoptimized: false,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  compress: true,
  output: 'standalone', // 🔥 Highly recommended for Cloud Run/Docker
};

export default nextConfig;
