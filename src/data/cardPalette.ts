/** Shared rotating card palette — a light, restrained gradient tint per hue, cycled by index
 * across small categorical lists (research areas, teaching sections, stat tiles). Kept
 * deliberately faint (a single soft `from` stop fading to white/the card surface) rather than
 * a saturated multi-stop wash, so it reads as gentle variety, not decoration.
 *
 * Deliberately monochromatic — every slot is a shade of the site's one water-blue accent
 * (varying only depth), rather than cycling through unrelated hues. Water + climate science,
 * not a rainbow of "sustainability" colors. */
export const cardPalette = [
  {
    dot: '#0B5E8E', // Marine Blue
    card: 'border-teal-100 bg-gradient-to-br from-teal-50 to-white dark:border-teal-900/40 dark:from-teal-950/25 dark:to-stone-900',
  },
  {
    dot: '#168CC7', // Water Blue
    card: 'border-teal-100 bg-gradient-to-br from-teal-50/80 to-white dark:border-teal-900/30 dark:from-teal-950/15 dark:to-stone-900',
  },
  {
    dot: '#5BAED6', // Atmospheric Blue
    card: 'border-teal-100 bg-gradient-to-br from-teal-50/60 to-white dark:border-teal-900/20 dark:from-teal-950/10 dark:to-stone-900',
  },
  {
    dot: '#083B5C', // Deep Ocean
    card: 'border-stone-200 bg-gradient-to-br from-stone-100/70 to-white dark:border-stone-700 dark:from-stone-800/40 dark:to-stone-900',
  },
] as const

export function cardStyle(index: number) {
  return cardPalette[index % cardPalette.length]
}

/** Shared hover treatment for bordered list cards: a soft lift, a light water-blue wash, and
 * a gentle shadow. Used site-wide (publications, books, students, events, activities, etc.) so
 * the wash/lift/timing only ever needs to be tuned in one place. Kept faint (low-opacity
 * stops) — a hint of color, not a bright wash. */
export const cardHover =
  'transition-all duration-300 ease-out hover:-translate-y-1 hover:border-teal-300 hover:shadow-md hover:bg-teal-50/40 dark:hover:border-teal-700 dark:hover:bg-teal-950/20'

/** Shared hover treatment for filled primary buttons (e.g. the header's Contact CTA): a
 * touch of lift and shadow on top of the existing color-darken, same timing as cardHover. */
export const buttonHover = 'transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md'
