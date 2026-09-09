import type { EventItem } from '../types'

/** The dataset stores events oldest-first (verified against the data — ids/photo numbering
 * both increase with date), so the most recent entries are simply the tail of the array.
 * Among those, only ones with a photo gallery can drive a slideshow — since there's no
 * explicit "featured" flag in the data to key off instead. Shared by the Events page and the
 * homepage's events teaser so both agree on what counts as "recent". */
export function getRecentEvents(items: EventItem[], count: number): EventItem[] {
  return [...items]
    .reverse()
    .filter((event) => event.photos.length > 0)
    .slice(0, count)
}

/** Pulls the year out of the free-text date string (e.g. "22-26 December 2014" → 2014).
 * Every event date ends in a single four-digit year, so the last match is always it. */
export function getEventYear(date: string): number {
  const matches = date.match(/\d{4}/g)
  return matches ? parseInt(matches[matches.length - 1], 10) : 0
}
