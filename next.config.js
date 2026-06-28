/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server Actions are stable in Next.js 14+; configure at top level.
  serverExternalPackages: [],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/aida-public/**',
      },
    ],
  },

  // allowedOrigins for Server Actions (stable — not under experimental)
  serverActions: {
    allowedOrigins: ['localhost:3000'],
  },
};

module.exports = nextConfig;
