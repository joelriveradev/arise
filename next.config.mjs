/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'us-east-1-shared-usea1-02.graphassets.com',
        port: '',
        pathname: '/*/**',
      },
    ],
  },
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
  },
  experimental: {
    reactCompiler: true,
  },
}

export default nextConfig
