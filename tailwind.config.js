/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#101411',
        paper: '#f7f5ef',
        moss: '#31483b',
        sage: '#9caf9f',
        clay: '#b9785d',
        stone: '#d9d6cb',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['DM Serif Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 18px 60px rgba(16,20,17,.09)',
      },
    },
  },
  plugins: [],
}