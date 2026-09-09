import { cardStyle, cardHover } from '../data/cardPalette'
import type { Patent } from '../types'

interface PatentsListProps {
  patents: Patent[]
}

function PatentsList({ patents }: PatentsListProps) {
  return (
    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {patents.map((patent, i) => {
        const style = cardStyle(i)
        return (
          <li key={patent.id} className={`rounded-lg border p-4 ${style.card} ${cardHover}`}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: style.dot }} />
                <p className="font-medium text-stone-900 dark:text-stone-100">{patent.title}</p>
              </div>
              <span className="shrink-0 rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-stone-700 dark:bg-stone-900/60 dark:text-stone-300">
                {patent.status}
                {patent.patentNumber && ` · No. ${patent.patentNumber}`}
                {patent.year && ` · ${patent.year}`}
              </span>
            </div>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{patent.inventors}</p>
            {patent.commercialization && (
              <p className="mt-2 text-sm italic text-stone-500 dark:text-stone-500">{patent.commercialization}</p>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default PatentsList
