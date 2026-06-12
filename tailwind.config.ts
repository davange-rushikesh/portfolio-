import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './data/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 60px rgba(125, 107, 255, 0.17)',
        soft: '0 16px 80px rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top, rgba(120, 97, 255, 0.18), transparent 32%), radial-gradient(circle at right, rgba(24, 210, 255, 0.18), transparent 28%), radial-gradient(circle at left, rgba(151, 65, 252, 0.16), transparent 24%)',
      },
      colors: {
        midnight: '#05050d',
        eclipse: '#090a13',
        neonblue: '#72f2ff',
        neonpurple: '#8c6bff',
        neongreen: '#55fff1'
      }
    }
  },
  plugins: [],
};

export default config;
