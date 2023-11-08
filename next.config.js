/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/apps/nextjs-cpanel',
  reactStrictMode: true,
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

module.exports = nextConfig;

