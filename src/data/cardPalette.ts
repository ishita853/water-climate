/** Shared rotating card palette — a light, restrained gradient tint per hue, cycled by index
 * across small categorical lists (research areas, teaching sections, stat tiles). Kept
 * deliberately faint (a single soft `from` stop fading to white/the card surface) rather than
 * a saturated multi-stop wash, so it reads as gentle variety, not decoration. */
export const cardPalette = [
  {
    dot: '#0284C7',
    card: 'border-sky-100 bg-gradient-to-br from-sky-50 to-white dark:border-sky-900/30 dark:from-sky-950/20 dark:to-stone-900',
  },
  {
    dot: '#006D68',
    card: 'border-teal-100 bg-gradient-to-br from-teal-50 to-white dark:border-teal-900/30 dark:from-teal-950/20 dark:to-stone-900',
  },
  {
    dot: '#7C3AED',
    card: 'border-violet-100 bg-gradient-to-br from-violet-50 to-white dark:border-violet-900/30 dark:from-violet-950/20 dark:to-stone-900',
  },
  {
    dot: '#D97706',
    card: 'border-amber-100 bg-gradient-to-br from-amber-50 to-white dark:border-amber-900/30 dark:from-amber-950/20 dark:to-stone-900',
  },
] as const

export function cardStyle(index: number) {
  return cardPalette[index % cardPalette.length]
}

/** Shared hover treatment for bordered list cards: a soft lift, a light teal-to-amber
 * gradient wash, and a gentle shadow. Used site-wide (publications, books, students, events,
 * activities, etc.) so the wash/lift/timing only ever needs to be tuned in one place. Kept
 * faint (low-opacity stops) — a hint of color, not a bright wash. */
export const cardHover =
  'transition-all duration-300 ease-out hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg hover:bg-gradient-to-br hover:from-teal-50/70 hover:via-white hover:to-amber-50/50 dark:hover:border-teal-800 dark:hover:from-teal-950/25 dark:hover:via-stone-900 dark:hover:to-amber-950/10'

/** Shared hover treatment for filled primary buttons (e.g. the header's Contact CTA): a
 * touch of lift and shadow on top of the existing color-darken, same timing as cardHover. */
export const buttonHover = 'transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md'
