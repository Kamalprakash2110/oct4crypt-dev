/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export for now
  // output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: undefined,
  basePath: ''
}

module.exports = nextConfig
