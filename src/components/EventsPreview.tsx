import { useMemo } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import events from '../../data/events.json'
import RecentEventsSlideshow from './RecentEventsSlideshow'
import Reveal from './Reveal'
import { getRecentEvents } from '../lib/events'
import type { EventItem } from '../types'

const RECENT_COUNT = 3

function EventsPreview() {
  const items = events as EventItem[]
  const recentEvents = useMemo(() => getRecentEvents(items, RECENT_COUNT), [items])

  if (recentEvents.length === 0) return null

  return (
    <Reveal>
      <section>
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
              Field &amp; Academic Life
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-stone-900 sm:text-3xl dark:text-stone-50 sm:text-3xl">
              Recent Events
            </h2>
          </div>
          <Link
            to="/events"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
          >
            All events
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-5">
          <RecentEventsSlideshow events={recentEvents} />
        </div>
      </section>
    </Reveal>
  )
}

export default EventsPreview
