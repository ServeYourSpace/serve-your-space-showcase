/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    container: { center: true, padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' }, screens: { '2xl': '1280px' } },
    extend: {
      colors: {
        bg: token('bg'),
        'bg-soft': token('bg-soft'),
        surface: token('surface'),
        ink: token('ink'),
        muted: token('muted'),
        line: token('line'),
        brand: {
          DEFAULT: '#8a47fa',
          50: '#f4eeff',
          100: '#e9dcff',
          200: '#d3b9ff',
          300: '#b98fff',
          400: '#a06bfc',
          500: '#8a47fa',
          600: '#7330e6',
          700: '#5b22bd',
          800: '#451b8f',
          900: '#32106b',
          950: '#1d0942',
        },
        night: { DEFAULT: '#0b0712', 2: '#171020' },
        lavender: '#f7f5fc',
      },
      fontFamily: {
        display: ['Sora', 'IBM Plex Sans Arabic', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'IBM Plex Sans Arabic', 'system-ui', 'sans-serif'],
        arabic: ['IBM Plex Sans Arabic', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgb(138 71 250 / .25), 0 20px 60px -15px rgb(138 71 250 / .55)',
        soft: '0 30px 80px -30px rgb(var(--shadow) / .45)',
        phone: '0 50px 100px -30px rgb(var(--shadow) / .6), 0 30px 60px -30px rgb(0 0 0 / .35)',
      },
      borderRadius: { '4xl': '2rem', '5xl': '2.75rem' },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        pulseglow: { '0%,100%': { opacity: '.55' }, '50%': { opacity: '1' } },
        typing: { '0%,80%,100%': { transform: 'translateY(0)', opacity: '.4' }, '40%': { transform: 'translateY(-4px)', opacity: '1' } },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        'spin-slow': 'spin-slow 30s linear infinite',
        pulseglow: 'pulseglow 4s ease-in-out infinite',
        typing: 'typing 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
