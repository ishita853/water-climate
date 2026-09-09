import type { TeachingPhilosophyItem } from '../types'
import { cardStyle } from '../data/cardPalette'

interface TeachingPhilosophyListProps {
  items: TeachingPhilosophyItem[]
}

function TeachingPhilosophyList({ items }: TeachingPhilosophyListProps) {
  if (items.length === 0) {
    return <p className="text-stone-500 dark:text-stone-500">No entries yet.</p>
  }

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => {
        const style = cardStyle(i)
        return (
          <li key={item.id} className={`rounded-xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${style.card}`}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: style.dot }} />
                <p className="font-medium text-stone-900 dark:text-stone-100">{item.approach}</p>
              </div>
              <span className="shrink-0 rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-stone-700 dark:bg-stone-900/60 dark:text-stone-300">
                {item.mode}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{item.description}</p>
          </li>
        )
      })}
    </ul>
  )
}

export default TeachingPhilosophyList
