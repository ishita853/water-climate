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
          <div className="aspect-[4/5] w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
            {entry.photo ? (
              <img
                src={entry.photo}
                alt={entry.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-serif text-3xl font-semibold text-stone-400 dark:text-stone-600">
                {initials(entry.name)}
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col p-5">
            <p className="font-serif text-lg font-semibold text-teal-700 dark:text-teal-400">{entry.name}</p>
            {entry.year && <p className="mt-0.5 text-sm text-stone-500 dark:text-stone-500">{entry.year}</p>}
            {entry.topic && (
              <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                <span className="font-semibold text-stone-700 dark:text-stone-300">Key research: </span>
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
