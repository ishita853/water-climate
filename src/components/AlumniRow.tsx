import type { StudentEntry } from '../types'
import { cardHover } from '../data/cardPalette'

interface AlumniRowProps {
  entries: StudentEntry[]
}

function AlumniRow({ entries }: AlumniRowProps) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map((entry) => (
        <li
          key={entry.name}
          className={`group flex flex-col items-center rounded-xl border border-stone-200 bg-white p-8 text-center dark:border-stone-800 dark:bg-stone-900 ${cardHover}`}
        >
          {entry.photo ? (
            <img
              src={entry.photo}
              alt={entry.name}
              className="h-36 w-36 shrink-0 rounded-full border border-stone-200 object-cover transition-transform duration-300 group-hover:scale-105 dark:border-stone-700"
            />
          ) : (
            <div className="flex h-36 w-36 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-stone-100 font-serif text-2xl font-semibold text-stone-400 transition-transform duration-300 group-hover:scale-105 dark:border-stone-700 dark:bg-stone-800">
              {entry.name
                .replace(/^(Mr\.|Ms\.|Dr\.)\s*/i, '')
                .split(' ')
                .map((part) => part[0])
                .join('')
                .slice(0, 2)}
            </div>
          )}

          <p className="mt-4 font-serif text-lg font-semibold text-stone-900 transition-colors duration-300 group-hover:text-teal-800 dark:text-stone-100 dark:group-hover:text-teal-300">
            {entry.name}
            {entry.year && <span className="font-normal text-stone-500 dark:text-stone-500"> ({entry.year})</span>}
          </p>

          {entry.currentPosition && (
            <p className="mt-1 text-sm font-medium text-stone-600 dark:text-stone-400">{entry.currentPosition}</p>
          )}

          {entry.topic && (
            <p className="mt-3 text-sm italic leading-relaxed text-stone-500 dark:text-stone-500">
              {entry.year ? 'Thesis Title: ' : 'Research Focus: '}
              {entry.topic}
            </p>
          )}
        </li>
      ))}
    </ul>
  )
}

export default AlumniRow
