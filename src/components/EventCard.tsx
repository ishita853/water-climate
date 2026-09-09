import { Calendar, MapPin } from 'lucide-react'
import EventGallery from './EventGallery'
import { cardHover } from '../data/cardPalette'
import type { EventItem } from '../types'

interface EventCardProps {
  event: EventItem
}

/** All Events archive card — image on top at a genuinely visible size, details below. Only
 * used for events that actually have photos; see EventTextCard for the no-image case. */
function EventCard({ event }: EventCardProps) {
  return (
    <article
      className={`group/card overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900 ${cardHover}`}
    >
      <div className="p-2 sm:p-3">
        <EventGallery photos={event.photos} eventName={event.name} />
      </div>
      <div className="border-t border-stone-200 p-5 dark:border-stone-800 sm:p-6">
        <h3 className="font-serif text-xl font-semibold leading-snug text-stone-900 transition-colors duration-300 group-hover/card:text-teal-700 dark:text-stone-50 dark:group-hover/card:text-teal-400">
          {event.name}
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone-500 dark:text-stone-500">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
            {event.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
            {event.place}
          </span>
        </div>
      </div>
    </article>
  )
}

export default EventCard
