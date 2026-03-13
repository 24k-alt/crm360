/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./ui/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif']
      },
      colors: {
        midnight: '#0f172a',
        mint: '#6fffe9',
        lilac: '#c084fc',
        blush: '#f472b6'
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.08), transparent 25%), radial-gradient(circle at 80% 0%, rgba(111,255,233,0.25), transparent 25%), radial-gradient(circle at 40% 80%, rgba(192,132,252,0.20), transparent 25%)'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
