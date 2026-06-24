/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        black:    '#0D0D0D',
        charcoal: '#1A1816',
        gold:     '#C8962A',
        'gold-light': '#E8B84B',
        cream:    '#F0EBE1',
        muted:    '#9A9590',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        body:    ['"Lato"', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.35em',
      },
    },
  },
  plugins: [],
}
