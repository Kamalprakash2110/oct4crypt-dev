/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static export temporarily to fix build issues
  // output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: undefined,
  basePath: '',
  // Skip static generation for pages that use client-side features
  excludeDefaultMomentLocales: true,
  // Add this to handle client-side pages
  experimental: {
    missingSuspense: true
  }
}

module.exports = nextConfig
