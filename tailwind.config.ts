import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      large: { max: '1439px' },
      medium: { max: '1080px' },
      md: { max: '768px' },
      lg: { min: '1080px' },
      xl: { min: '1280px' },
    },
    colors: {
      black: '#121212',
      'black-light': '#1b1b1b',
      'black-dark': '#181818',
      'black-80': 'rgba(0, 0, 0, 0.8)',
      white: '#ffffff',
      'white-50': 'rgba(255, 255, 255, 0.5)',
      'white-30': 'rgba(255, 255, 255, 0.3)',
      'white-10': 'rgba(255, 255, 255, 0.1)',
      gray: '#929292',
      'gray-80': 'rgba(146, 146, 146, 0.8)',
      'gray-50': '#f8f8f8',
      'gray-40': '#b2b2b2',
      'tutor-main': '#FF9B33',
      'tutor-light': '#FFD05D',
      'tutor-dark': '#FF5C01',
      blue: '#00D1FF',
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
