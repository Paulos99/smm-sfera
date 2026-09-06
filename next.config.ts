import type { NextConfig } from 'next';

// Apex custom domain https://smmsfera.ru is served at site root.
const basePath = '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
