import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        revenue: '#10b981',
        expense: '#f97316',
        profit: '#6366e7',
        loss: '#ef4444',
      },
    },
  },
  plugins: [],
  darkMode: ['class', '[data-theme="dark"]'],
};

export default config;
