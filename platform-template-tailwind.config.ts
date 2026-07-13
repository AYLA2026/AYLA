import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@ayla/ui-kit/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ayla: {
          bg: {
            primary: '#1a0f0a',
            secondary: '#2d1f16',
            tertiary: '#3d2b1f',
            elevated: '#4a3525',
          },
          gold: {
            50: '#faf6e9',
            100: '#f0e6c4',
            200: '#e8d5a3',
            300: '#d4b76a',
            400: '#c9a227',
            500: '#b8941f',
            600: '#9a7a1a',
            700: '#7a6015',
            800: '#5c4810',
            900: '#3d300b',
          },
          text: {
            primary: '#f5f0e8',
            secondary: '#a89b8c',
            muted: '#7a6b5c',
          },
        },
      },
      fontFamily: {
        arabic: ['Noto Sans Arabic', 'Cairo', 'sans-serif'],
        english: ['Inter', 'Poppins', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 4px 20px rgba(201, 162, 39, 0.3)',
        'gold-lg': '0 8px 30px rgba(201, 162, 39, 0.4)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 162, 39, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(201, 162, 39, 0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
