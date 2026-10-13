import type { StudentEntry } from '../types'
import { cardHover } from '../data/cardPalette'

interface StudentListProps {
  entries: StudentEntry[]
}

function StudentList({ entries }: StudentListProps) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {entries.map((entry) => (
        <li
          key={entry.name}
          className={`group rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900 ${cardHover}`}
        >
          <p className="font-medium text-stone-900 transition-colors duration-300 group-hover:text-teal-800 dark:text-stone-100 dark:group-hover:text-teal-300">
            {entry.name}
            {entry.year && <span className="font-normal text-stone-700 dark:text-stone-200"> ({entry.year})</span>}
          </p>
          {entry.topic && (
            <p className="mt-1.5 text-base leading-relaxed text-stone-700 dark:text-stone-200 sm:text-lg">{entry.topic}</p>
          )}
          {entry.currentPosition && (
            <p className="mt-1.5 text-sm italic text-teal-700 dark:text-teal-400">{entry.currentPosition}</p>
          )}
        </li>
      ))}
    </ul>
  )
}

export default StudentList