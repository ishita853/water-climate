/** @type {import('tailwindcss').Config} */
const sansStack = [
  'Inter',
  'ui-sans-serif',
  'system-ui',
  '-apple-system',
  'Segoe UI',
  'Roboto',
  'Helvetica Neue',
  'Arial',
  'sans-serif',
]

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // One professional family site-wide. `font-serif` is kept as an alias (rather than
        // removed) so existing heading classNames don't need to be touched file-by-file.
        sans: sansStack,
        serif: sansStack,
      },
      colors: {
        stone: {
          50: '#FAFAF8',
          900: '#171717',
        },
        // Muted deep-teal accent ramp anchored at #006D68 (primary accent), replacing
        // Tailwind's brighter default teal so every existing `teal-*` class site-wide
        // repaints to the restrained brand color without per-file edits.
        teal: {
          50: '#EAF5F4',
          100: '#CFE8E5',
          200: '#A3D2CC',
          300: '#6FB6AE',
          400: '#3D968D',
          500: '#1C7D74',
          600: '#006D68',
          700: '#005852',
          800: '#04443F',
          900: '#0A332F',
          950: '#051D1A',
        },
      },
      maxWidth: {
        page: '1800px',
      },
    },
  },
  plugins: [],
}
