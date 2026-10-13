import { ArrowUpRight } from 'lucide-react'
import type { StudentEntry } from '../types'
import { cardHover } from '../data/cardPalette'

interface ScholarCardProps {
  entries: StudentEntry[]
}

function initials(name: string) {
  return name
    .replace(/^(Mr\.|Ms\.|Dr\.)\s*/i, '')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
}

function ScholarCard({ entries }: ScholarCardProps) {
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {entries.map((entry) => (
        <li
          key={entry.name}
          className={`group flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900 ${cardHover}`}
        >
          <div className="aspect-square w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
            {entry.photo ? (
              <img
                src={entry.photo}
                alt={entry.name}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-serif text-3xl font-semibold text-stone-700 dark:text-stone-200">
                {initials(entry.name)}
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-start justify-between gap-2">
              <p className="font-serif text-lg font-semibold text-teal-700 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 dark:text-teal-400">
                {entry.name}
              </p>
              <ArrowUpRight
                className="mt-1 h-4 w-4 shrink-0 text-stone-300 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 dark:text-stone-200"
                strokeWidth={1.75}
              />
            </div>
            {entry.year && <p className="mt-0.5 text-sm text-stone-700 dark:text-stone-200">{entry.year}</p>}
            {entry.topic && (
              <p className="mt-3 text-base leading-relaxed text-stone-700 dark:text-stone-200">
                <span className="font-semibold text-stone-700 dark:text-stone-200">Key research: </span>
                {entry.topic}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ScholarCard
