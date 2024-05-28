/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
  },
  experimental: {
    reactCompiler: true,
  },
}

export default nextConfig
