/** @type {import('tailwindcss').Config} */
// One consistent, professional serif across the whole site (headings, body, UI).
// Times New Roman ships with Windows/macOS; Tinos / Liberation Serif are its
// metric-compatible equivalents on Linux/Android, so layouts don't shift.
const fontStack = ['"Times New Roman"', 'Times', 'Tinos', '"Liberation Serif"', 'ui-serif', 'Georgia', 'serif']

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: fontStack,
        serif: fontStack,
      },
      colors: {
        // Neutral scale — warm research-white through to a deep navy/charcoal, NOT Tailwind's
        // default warm-gray-black. `stone-900` (light-mode heading text) is a deep navy rather
        // than near-black, and `stone-800/900/950` (dark-mode surfaces) form a genuine
        // "atmosphere / ocean at night" ramp rather than an inverted gray scale.
        stone: {
          50: '#F7F8F6',
          // 100–600 inherit Tailwind's default warm-neutral stone scale for body/muted text
          // and light-mode borders — those steps already read correctly.
          700: '#2A3942',
          800: '#1B2830',
          900: '#101B24',
          950: '#08121A',
        },
        // The site's one accent family — deep ocean to atmospheric-ice blue. Water + climate
        // science, not sustainability-green: no other hue competes with this one for UI
        // chrome (nav, buttons, links, borders, progress, cards). Named `teal` only so the
        // ~30 files already using `teal-*` utility classes repaint without per-file edits;
        // the actual hues are unambiguously blue (hue ~198-205°), not teal/cyan-green.
        teal: {
          50: '#EFF6FA',
          100: '#DCECF3', // "Ice / Mist"
          200: '#B8DAEA',
          300: '#8FC3DD',
          400: '#5BAED6', // "Atmospheric Blue"
          500: '#2E93C4',
          600: '#168CC7', // "Water Blue" — primary interactive shade (buttons, links, active states)
          700: '#0B5E8E', // "Marine Blue"
          800: '#083B5C', // "Deep Ocean"
          900: '#062A42',
          950: '#061B2B', // "Midnight / Deep Water"
        },
        // Header/footer-only tokens — a light "mineral" neutral family and a dark "abyss" navy
        // family, kept separate from `stone` so this pass (global chrome only) can't ripple
        // into every page's card surfaces. Light mode uses `mineral` (near-white, cool-toned,
        // never dark); dark mode uses `abyss` (genuine midnight navy, tuned to read as blue at
        // low brightness, never green-black).
        mineral: {
          50: '#F7FAFC', // Mineral white
          100: '#EEF7FB', // Soft ice
          200: '#DCEFF7', // Pale water
          300: '#B9DCEB', // Light blue
        },
        abyss: {
          700: '#193C52', // Blue-gray
          800: '#0A3048', // Marine navy
          900: '#071E30', // Deep ocean
          950: '#06131F', // Midnight
        },
      },
      // Slightly larger text scale than Tailwind's default so body copy, captions and
      // labels stay comfortably readable. Everything is rem-based, so it also scales with
      // the fluid root font-size set in index.css on large screens.
      fontSize: {
        xs: ['0.875rem', { lineHeight: '1.35rem' }],
        sm: ['1.0625rem', { lineHeight: '1.65rem' }],
        base: ['1.125rem', { lineHeight: '1.8rem' }],
        lg: ['1.25rem', { lineHeight: '1.9rem' }],
        xl: ['1.375rem', { lineHeight: '2rem' }],
      },
      maxWidth: {
        page: '2160px',
      },
    },
  },
  plugins: [],
}
