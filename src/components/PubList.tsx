import { useMemo, useState } from 'react'
import { ExternalLink, FileText } from 'lucide-react'
import type { Publication } from '../types'
import { cardHover } from '../data/cardPalette'
import YearFilterDropdown, { RECENT_YEARS_FROM, type YearFilter } from './YearFilterDropdown'

interface PubListProps {
  publications: Publication[]
}

function groupByYear(publications: Publication[]) {
  const sorted = [...publications].sort((a, b) => b.year - a.year)
  const groups: { year: number; items: Publication[] }[] = []

  for (const pub of sorted) {
    const group = groups[groups.length - 1]
    if (group && group.year === pub.year) {
      group.items.push(pub)
    } else {
      groups.push({ year: pub.year, items: [pub] })
    }
  }

  return groups
}

function PubList({ publications }: PubListProps) {
  const [yearFilter, setYearFilter] = useState<YearFilter>('recent')

  const availableYears = useMemo(
    () => Array.from(new Set(publications.map((pub) => pub.year))).sort((a, b) => b - a),
    [publications],
  )

  const filtered = useMemo(() => {
    if (yearFilter === 'all') return publications
    if (yearFilter === 'recent') return publications.filter((pub) => pub.year >= RECENT_YEARS_FROM)
    return publications.filter((pub) => pub.year === yearFilter)
  }, [publications, yearFilter])

  if (publications.length === 0) {
    return <p className="text-stone-500 dark:text-stone-500">No publications yet.</p>
  }

  const groups = groupByYear(filtered)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-stone-500 dark:text-stone-500">
          Showing {filtered.length} of {publications.length} publications
        </p>
        <YearFilterDropdown value={yearFilter} availableYears={availableYears} onChange={setYearFilter} />
      </div>

      {groups.length === 0 && <p className="text-stone-500 dark:text-stone-500">No publications for this year.</p>}

      {groups.map((group) => (
        <div key={group.year}>
          <div className="mb-4 flex items-center gap-4">
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-50">{group.year}</h2>
            <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800" />
          </div>
          <ul className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {group.items.map((pub) => (
              <li
                key={pub.id}
                className={`rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 ${cardHover}`}
              >
                <p className="font-medium leading-snug text-stone-900 dark:text-stone-100">{pub.title}</p>
                <p className="mt-1.5 text-sm text-stone-600 dark:text-stone-400">{pub.authors}</p>
                <p className="text-sm italic text-teal-700 dark:text-teal-400">
                  {pub.venue}
                  {pub.impactFactor && (
                    <span className="ml-2 not-italic text-stone-400 dark:text-stone-500">
                      · IF {pub.impactFactor}
                    </span>
                  )}
                </p>
                {(pub.link || pub.pdf) && (
                  <div className="mt-3 flex gap-4 text-sm">
                    {pub.link && (
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-medium text-stone-500 transition-colors hover:text-teal-700 dark:text-stone-500 dark:hover:text-teal-400"
                      >
                        <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
                        Link
                      </a>
                    )}
                    {pub.pdf && (
                      <a
                        href={pub.pdf}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-medium text-stone-500 transition-colors hover:text-teal-700 dark:text-stone-500 dark:hover:text-teal-400"
                      >
                        <FileText className="h-3.5 w-3.5" strokeWidth={1.75} />
                        PDF
                      </a>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default PubList
