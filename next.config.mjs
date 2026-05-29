/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/edugenai-bibliotheek',
  assetPrefix: '/edugenai-bibliotheek/',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
