import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b0907',
        char: '#17110d',
        gold: '#f2b35a',
        cream: '#f6e7cf',
        ember: '#e4572e',
        flame: '#ff7a3d',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Impact', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-2deg)' },
          '50%': { transform: 'translateY(-18px) rotate(2deg)' },
        },
        rise: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0' },
          '20%': { opacity: '0.9' },
          '100%': { transform: 'translateY(-120px) scale(0.4)', opacity: '0' },
        },
      },
      animation: {
        drift: 'drift 6s ease-in-out infinite',
        rise: 'rise 4s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
