/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.hygraph.com',
      },
      {
        protocol: 'https',
        hostname: 'media.graphassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.graphassets.com',
      },
      {
        protocol: 'https',
        hostname: 'eu-west-2.graphassets.com',
      },
    ],
  },
};

export default nextConfig;
