import { useMemo, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import type { BookChapter } from '../types'
import { cardHover } from '../data/cardPalette'
import YearFilterDropdown, { RECENT_YEARS_FROM, type YearFilter } from './YearFilterDropdown'

interface BookChapterListProps {
  chapters: BookChapter[]
}

function groupByYear(chapters: BookChapter[]) {
  const sorted = [...chapters].sort((a, b) => b.year - a.year)
  const groups: { year: number; items: BookChapter[] }[] = []

  for (const chapter of sorted) {
    const group = groups[groups.length - 1]
    if (group && group.year === chapter.year) {
      group.items.push(chapter)
    } else {
      groups.push({ year: chapter.year, items: [chapter] })
    }
  }

  return groups
}

function BookChapterList({ chapters }: BookChapterListProps) {
  const [yearFilter, setYearFilter] = useState<YearFilter>('recent')

  const availableYears = useMemo(
    () => Array.from(new Set(chapters.map((c) => c.year))).sort((a, b) => b - a),
    [chapters],
  )

  const filtered = useMemo(() => {
    if (yearFilter === 'all') return chapters
    if (yearFilter === 'recent') return chapters.filter((c) => c.year >= RECENT_YEARS_FROM)
    return chapters.filter((c) => c.year === yearFilter)
  }, [chapters, yearFilter])

  if (chapters.length === 0) {
    return <p className="text-stone-500 dark:text-stone-500">No book chapters yet.</p>
  }

  const groups = groupByYear(filtered)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-stone-500 dark:text-stone-500">
          Showing {filtered.length} of {chapters.length} book chapters
        </p>
        <YearFilterDropdown value={yearFilter} availableYears={availableYears} onChange={setYearFilter} />
      </div>

      {groups.length === 0 && <p className="text-stone-500 dark:text-stone-500">No book chapters for this year.</p>}

      {groups.map((group) => (
        <div key={group.year}>
          <div className="mb-4 flex items-center gap-4">
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-50">{group.year}</h2>
            <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800" />
          </div>
          <ul className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {group.items.map((chapter) => (
              <li
                key={chapter.id}
                className={`rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 ${cardHover}`}
              >
                <p className="font-medium leading-snug text-stone-900 dark:text-stone-100">{chapter.title}</p>
                <p className="mt-1.5 text-sm text-stone-600 dark:text-stone-400">{chapter.authors}</p>
                <p className="text-sm italic text-teal-700 dark:text-teal-400">
                  {chapter.bookTitle}
                  {chapter.yearDetail && chapter.yearDetail !== String(chapter.year) && (
                    <span className="ml-2 not-italic text-stone-400 dark:text-stone-500">· {chapter.yearDetail}</span>
                  )}
                </p>
                {(chapter.link || chapter.isbn) && (
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                    {chapter.link && (
                      <a
                        href={chapter.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-medium text-stone-500 transition-colors hover:text-teal-700 dark:text-stone-500 dark:hover:text-teal-400"
                      >
                        <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
                        DOI
                      </a>
                    )}
                    {chapter.isbn && (
                      <span className="text-stone-400 dark:text-stone-500">ISBN {chapter.isbn}</span>
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

export default BookChapterList
