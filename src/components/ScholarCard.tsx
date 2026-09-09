import type { StudentEntry } from '../types'
import { cardHover } from '../data/cardPalette'

interface ScholarCardProps {
  entries: StudentEntry[]
}

function ScholarCard({ entries }: ScholarCardProps) {
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map((entry) => (
        <li
          key={entry.name}
          className={`group flex flex-col items-center rounded-xl border border-stone-200 bg-white p-6 text-center shadow-sm dark:border-stone-800 dark:bg-stone-900 ${cardHover}`}
        >
          {entry.photo ? (
            <img
              src={entry.photo}
              alt={entry.name}
              className="h-24 w-24 rounded-full border border-stone-200 object-cover transition-transform duration-300 group-hover:scale-105 dark:border-stone-700"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-stone-200 bg-stone-100 font-serif text-xl font-semibold text-stone-400 transition-transform duration-300 group-hover:scale-105 dark:border-stone-700 dark:bg-stone-800">
              {entry.name
                .replace(/^(Mr\.|Ms\.|Dr\.)\s*/i, '')
                .split(' ')
                .map((part) => part[0])
                .join('')
                .slice(0, 2)}
            </div>
          )}
          <p className="mt-4 font-serif text-lg font-semibold text-stone-900 transition-colors duration-300 group-hover:text-teal-800 dark:text-stone-50 dark:group-hover:text-teal-300">
            {entry.name}
          </p>
          {entry.topic && (
            <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              <span className="font-semibold text-stone-500 dark:text-stone-500">Key research: </span>
              {entry.topic}
            </p>
          )}
        </li>
      ))}
    </ul>
  )
}

export default ScholarCard