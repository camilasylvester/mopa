/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mopar: {
          blue: '#0066B3',
          'blue-mid': '#0077CC',
          'blue-bright': '#1A88D4',
          'blue-dim': 'rgba(0,102,179,0.15)',
        },
        surface: {
          base: '#07070C',
          card: 'rgba(255,255,255,0.03)',
          hover: 'rgba(255,255,255,0.055)',
          active: 'rgba(0,87,168,0.09)',
        },
        brand: {
          jeep: '#1B3A14',
          'jeep-mid': '#2D5C1E',
          ram: '#282828',
          'ram-mid': '#3A3A3A',
          peugeot: '#0F2A4A',
          'peugeot-mid': '#1A3D6B',
          fiat: '#4A1010',
          'fiat-mid': '#6B1818',
          citroen: '#0F1F4A',
          'citroen-mid': '#1A2D6B',
        },
      },
      fontFamily: {
        // Tungsten Condensed Black — hero headlines
        display:   ['Tungsten', 'Barlow Condensed', 'Impact', 'sans-serif'],
        // Titling Gothic FB Condensed — section titles, cards, UI
        condensed: ['TitlingGothic', 'Barlow Condensed', 'sans-serif'],
        // Titling Gothic FB Normal — body / descriptions
        sans:      ['TitlingGothic', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        carbon: [
          'repeating-linear-gradient(45deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 9px)',
          'repeating-linear-gradient(-45deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 9px)',
        ].join(', '),
        'hero-lights': [
          'radial-gradient(ellipse 60% 40% at 15% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)',
          'radial-gradient(ellipse 60% 40% at 85% 0%, rgba(255,255,255,0.03) 0%, transparent 70%)',
          'radial-gradient(ellipse 40% 50% at 50% 20%, rgba(0,87,168,0.07) 0%, transparent 70%)',
        ].join(', '),
      },
      animation: {
        'reveal-up': 'revealUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
        'slide-down': 'slideDown 0.35s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
      },
      keyframes: {
        revealUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.04)' },
        },
      },
    },
  },
  plugins: [],
}
