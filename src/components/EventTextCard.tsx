import { Calendar, MapPin } from 'lucide-react'
import type { EventItem } from '../types'

/** Editorial text-only treatment for events with no photos — no empty image box,
 * no placeholder graphic, just a clean accent rule and the real event details. */
function EventTextCard({ event }: { event: EventItem }) {
  return (
    <article className="group/card flex flex-col justify-center rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md dark:border-stone-800 dark:bg-stone-900 dark:hover:border-teal-900/60 sm:p-8">
      <div className="h-0.5 w-10 rounded-full bg-teal-600 dark:bg-teal-500" />
      <h3 className="mt-4 font-serif text-xl font-semibold leading-snug text-stone-900 transition-colors duration-300 group-hover/card:text-teal-700 dark:text-stone-50 dark:group-hover/card:text-teal-400">
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
    </article>
  )
}

export default EventTextCard
