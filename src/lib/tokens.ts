/** Semantic accent colors shared across the site, so per-item branding (research domains,
 * applications, projects) and generic UI (stat tiles, hover states) draw from one small,
 * water/hydrology-grounded set instead of arbitrary hues. All four are colors already in use
 * elsewhere in the codebase (the custom `teal` ramp, Tailwind's default `sky`/`amber`) — this
 * module just names them so new code has one place to reference instead of repeating hex. */
export const ACCENT_PRIMARY = '#006D68' // teal-600 — brand primary
export const ACCENT_OCEAN = '#0369A1' // sky-700 — secondary, muted ocean blue
export const ACCENT_AQUA = '#3D968D' // teal-400 — soft aqua
export const ACCENT_AMBER = '#D97706' // amber-600 — restrained warm accent
