import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'api.ayladigital.com'],
  },
  // إعدادات للـ RTL
  i18n: {
    locales: ['ar', 'en'],
    defaultLocale: 'ar',
    localeDetection: true,
  },
  // إعدادات الـ Turbopack
  experimental: {
    turbo: {
      resolveAlias: {
        '@ayla/*': './node_modules/@ayla/*',
      },
    },
  },
};

export default nextConfig;
