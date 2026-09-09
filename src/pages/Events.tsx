import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import events from '../../data/events.json'
import EventCard from '../components/EventCard'
import EventTextCard from '../components/EventTextCard'
import RecentEventsSlideshow from '../components/RecentEventsSlideshow'
import Reveal from '../components/Reveal'
import YearFilterDropdown, { type YearFilter } from '../components/YearFilterDropdown'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { getEventYear, getRecentEvents } from '../lib/events'
import type { EventItem } from '../types'

const EASE = [0.22, 1, 0.36, 1] as const
const RECENT_COUNT = 3

function groupByYear(items: EventItem[]) {
  const newestFirst = [...items].reverse()
  const groups: { year: number; items: EventItem[] }[] = []

  for (const event of newestFirst) {
    const year = getEventYear(event.date)
    const group = groups[groups.length - 1]
    if (group && group.year === year) {
      group.items.push(event)
    } else {
      groups.push({ year, items: [event] })
    }
  }

  return groups
}

function EventGridItem({ event, index }: { event: EventItem; index: number }) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <motion.li
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: prefersReducedMotion ? 0.15 : 0.4,
        delay: prefersReducedMotion ? 0 : Math.min(index, 4) * 0.06,
        ease: EASE,
      }}
    >
      {event.photos.length > 0 ? <EventCard event={event} /> : <EventTextCard event={event} />}
    </motion.li>
  )
}

function Events() {
  const items = events as EventItem[]
  const prefersReducedMotion = usePrefersReducedMotion()
  const [yearFilter, setYearFilter] = useState<YearFilter>('all')

  const recentEvents = useMemo(() => getRecentEvents(items, RECENT_COUNT), [items])

  const availableYears = useMemo(
    () => Array.from(new Set(items.map((event) => getEventYear(event.date)))).sort((a, b) => b - a),
    [items],
  )

  const filtered = useMemo(() => {
    if (yearFilter === 'all') return items
    if (yearFilter === 'recent') return items.filter((event) => getEventYear(event.date) >= 2025)
    return items.filter((event) => getEventYear(event.date) === yearFilter)
  }, [items, yearFilter])

  const groups = groupByYear(filtered)

  return (
    <div className="flex flex-col gap-14">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
          Field &amp; Outreach
        </p>
        <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
          Events
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-[1.7] text-stone-600 dark:text-stone-400">
          Workshops, capacity-building programs, and outreach activities from the field.
        </p>
      </div>

      {items.length === 0 ? (
        <p className="text-stone-500 dark:text-stone-500">Nothing to show yet.</p>
      ) : (
        <>
          {recentEvents.length > 0 && (
            <Reveal>
              <section>
                <h2 className="mb-5 font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50">
                  Recent Events
                </h2>
                <RecentEventsSlideshow events={recentEvents} />
              </section>
            </Reveal>
          )}

          <section>
            <Reveal>
              <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                <h2 className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50">All Events</h2>
                <div className="flex items-center gap-3">
                  <p className="text-sm text-stone-500 dark:text-stone-500">
                    Showing {filtered.length} of {items.length} events
                  </p>
                  <YearFilterDropdown value={yearFilter} availableYears={availableYears} onChange={setYearFilter} />
                </div>
              </div>
            </Reveal>

            <AnimatePresence mode="wait">
              <motion.div
                key={String(yearFilter)}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
                transition={{ duration: prefersReducedMotion ? 0.1 : 0.25, ease: EASE }}
                className="flex flex-col gap-12"
              >
                {groups.length === 0 && (
                  <p className="text-stone-500 dark:text-stone-500">No events for this year.</p>
                )}
                {groups.map((group) => (
                  <div key={group.year}>
                    <div className="mb-5 flex items-center gap-4">
                      <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-50">{group.year}</h3>
                      <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800" />
                    </div>
                    <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                      {group.items.map((event, i) => (
                        <EventGridItem key={event.id} event={event} index={i} />
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </section>
        </>
      )}
    </div>
  )
}

export default Events
