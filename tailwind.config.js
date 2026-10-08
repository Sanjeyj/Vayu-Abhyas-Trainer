/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          950: '#060B16',
          900: '#0A0F1D',
          850: '#0D1527',
          800: '#11192E',
          750: '#16223B',
          700: '#1C2B4B',
          600: '#253B64',
        },
        tactical: {
          green: '#10B981',
          cyan: '#06B6D4',
          amber: '#F59E0B',
          red: '#EF4444',
          slate: '#64748B',
          panel: 'rgba(13, 21, 39, 0.85)',
          border: 'rgba(37, 59, 100, 0.5)'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Consolas', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'radar-sweep': 'radarSweep 4s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'subtle-ping': 'subtlePing 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        subtlePing: {
          '75%, 100%': { transform: 'scale(1.4)', opacity: '0' }
        }
      }
    },
  },
  plugins: [],
}
