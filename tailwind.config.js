/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          600: '#8B4513',
          700: '#723A0F',
        },
        burgundy: {
          50: '#fdf2f4',
          100: '#fbe6ea',
          200: '#f5ccd5',
          300: '#efa3b4',
          400: '#e67a93',
          500: '#d65475',
          600: '#8B2942',
          700: '#6B1D31',
          800: '#581427',
          900: '#4a1121',
        },
      },
      keyframes: {
        highlight: {
          '0%': { boxShadow: '0 0 0 0 rgba(234, 179, 8, 0.4)' },
          '70%': { boxShadow: '0 0 0 20px rgba(234, 179, 8, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(234, 179, 8, 0)' }
        },
        shockwave: {
          '0%': {
            transform: 'scale(1)',
            border: '0px solid rgba(234, 179, 8, 0.5)',
            opacity: 1
          },
          '100%': {
            transform: 'scale(1.3)',
            border: '6px solid rgba(234, 179, 8, 0)',
            opacity: 0
          }
        }
      },
      animation: {
        highlight: 'highlight 1s ease-in-out',
        shockwave: 'shockwave 1s ease-out'
      }
    },
  },
  plugins: [],
}

