/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        100: '25rem'
      },
      height: {
        sidebar: 'calc(100vh - 128px)'
      }
    }
  },
  plugins: []
};
