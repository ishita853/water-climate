import { Award, Sparkles } from 'lucide-react'
import type { Distinction } from '../types'
import { cardHover } from '../data/cardPalette'

interface DistinctionsListProps {
  items: Distinction[]
}

function formatDate(date: string) {
  if (date === 'N/A') return null
  // A bare "YYYY" means we only know the year — don't imply false precision.
  if (/^\d{4}$/.test(date)) return date

  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function sortKey(date: string) {
  if (date === 'N/A') return -Infinity
  return new Date(/^\d{4}$/.test(date) ? `${date}-01-01` : date).getTime()
}

function DistinctionsList({ items }: DistinctionsListProps) {
  if (items.length === 0) {
    return <p className="text-stone-500 dark:text-stone-500">Nothing to show yet.</p>
  }

  const dated = [...items].filter((item) => item.date !== 'N/A').sort((a, b) => sortKey(b.date) - sortKey(a.date))
  const undated = items.filter((item) => item.date === 'N/A')

  return (
    <div className="flex flex-col gap-16">
      {dated.length > 0 && (
        <div className="relative">
          <div
            aria-hidden
            className="absolute left-[13px] top-1.5 bottom-1.5 w-px bg-gradient-to-b from-teal-600 via-stone-200 to-transparent dark:from-teal-500 dark:via-stone-800 sm:left-[15px]"
          />
          <ul className="flex flex-col gap-5">
            {dated.map((item) => {
              const formatted = formatDate(item.date)
              return (
                <li key={item.id} className="relative flex gap-4 pl-9 sm:gap-5 sm:pl-11">
                  <span className="absolute left-0 top-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-teal-600 bg-white text-teal-700 shadow-[0_0_0_4px_rgba(255,255,255,1)] dark:border-teal-500 dark:bg-stone-950 dark:text-teal-400 dark:shadow-[0_0_0_4px_rgba(9,9,11,1)] sm:h-8 sm:w-8">
                    <Award className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </span>
                  <div className={`flex-1 rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6 ${cardHover}`}>
                    {formatted && (
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-700 dark:text-teal-400">
                        {formatted}
                      </p>
                    )}
                    <p className="mt-1.5 font-serif text-lg font-semibold text-stone-900 dark:text-stone-50">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{item.description}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {undated.length > 0 && (
        <div>
          <h2 className="mb-5 flex items-center gap-2 font-serif text-lg font-semibold text-stone-900 dark:text-stone-50">
            <Sparkles className="h-4 w-4 text-teal-600 dark:text-teal-400" strokeWidth={1.75} />
            Ongoing Roles &amp; Honors
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {undated.map((item) => (
              <li
                key={item.id}
                className={`rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 ${cardHover}`}
              >
                <p className="font-serif text-base font-semibold text-stone-900 dark:text-stone-50">{item.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default DistinctionsList
