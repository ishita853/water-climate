import type { ConferenceEvent } from '../types'
import { cardHover } from '../data/cardPalette'

interface ConferenceListProps {
  events: ConferenceEvent[]
}

function groupByYear(events: ConferenceEvent[]) {
  const sorted = [...events].sort((a, b) => b.year - a.year)
  const groups: { year: number; items: ConferenceEvent[] }[] = []

  for (const event of sorted) {
    const group = groups[groups.length - 1]
    if (group && group.year === event.year) {
      group.items.push(event)
    } else {
      groups.push({ year: event.year, items: [event] })
    }
  }

  return groups
}

function ConferenceList({ events }: ConferenceListProps) {
  if (events.length === 0) {
    return <p className="text-stone-700 dark:text-stone-200">No events yet.</p>
  }

  const groups = groupByYear(events)

  return (
    <div className="flex flex-col gap-10">
      {groups.map((group) => (
        <div key={group.year}>
          <div className="mb-4 flex items-center gap-4">
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-50">{group.year}</h2>
            <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800" />
          </div>
          <ul className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {group.items.map((event) => (
              <li
                key={event.id}
                className={`rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 ${cardHover}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="font-medium leading-snug text-stone-900 dark:text-stone-100">{event.title}</p>
                  {event.type && (
                    <span className="shrink-0 rounded-full bg-teal-50 px-2.5 py-1 text-[0.8125rem] font-semibold uppercase tracking-wide text-teal-700 dark:bg-teal-950 dark:text-teal-400">
                      {event.type}
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-sm text-stone-700 dark:text-stone-200">
                  {[event.date, event.duration].filter(Boolean).join(' · ')}
                </p>
                {event.organizer && (
                  <p className="mt-1 text-sm text-stone-700 dark:text-stone-200">{event.organizer}</p>
                )}
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {event.role && <span className="italic text-teal-700 dark:text-teal-400">{event.role}</span>}
                  {event.venue && <span className="text-stone-700 dark:text-stone-200">{event.venue}</span>}
                  {event.participants && (
                    <span className="text-stone-700 dark:text-stone-200">{event.participants} participants</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default ConferenceList
