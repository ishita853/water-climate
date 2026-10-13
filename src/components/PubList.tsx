import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, FileText } from 'lucide-react'
import type { Publication } from '../types'
import MaskedHeading from './MaskedHeading'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
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
  const prefersReducedMotion = usePrefersReducedMotion()

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
    return <p className="text-stone-700 dark:text-stone-200">No publications yet.</p>
  }

  const groups = groupByYear(filtered)

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-stone-700 dark:text-stone-200">
          Showing {filtered.length} of {publications.length} publications
        </p>
        <YearFilterDropdown value={yearFilter} availableYears={availableYears} onChange={setYearFilter} />
      </div>

      {groups.length === 0 && <p className="text-stone-700 dark:text-stone-200">No publications for this year.</p>}

      {groups.map((group) => (
        <div key={group.year}>
          <div className="mb-2 flex items-baseline gap-4">
            <MaskedHeading as="h2" className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-50">
              {group.year}
            </MaskedHeading>
            <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800" />
          </div>
          <ul className="flex flex-col divide-y divide-stone-200 dark:divide-stone-800">
            {group.items.map((pub, i) => (
              <motion.li
                key={pub.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : Math.min(i, 8) * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="group relative -mx-3 flex items-start justify-between gap-4 rounded-md px-3 py-5 transition-colors duration-300 hover:bg-teal-50/50 dark:hover:bg-teal-950/20"
              >
                <div className="min-w-0 flex-1 transition-transform duration-300 ease-out group-hover:translate-x-1">
                  <p className="font-medium leading-snug text-stone-900 dark:text-stone-100">{pub.title}</p>
                  <p className="mt-1.5 text-sm text-stone-700 dark:text-stone-200">{pub.authors}</p>
                  <p className="text-sm italic text-teal-700 dark:text-teal-400">
                    {pub.venue}
                    {pub.impactFactor && (
                      <span className="ml-2 not-italic text-stone-700 dark:text-stone-200">
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
                          className="inline-flex items-center gap-1.5 font-medium text-stone-700 transition-colors hover:text-teal-700 dark:text-stone-200 dark:hover:text-teal-400"
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
                          className="inline-flex items-center gap-1.5 font-medium text-stone-700 transition-colors hover:text-teal-700 dark:text-stone-200 dark:hover:text-teal-400"
                        >
                          <FileText className="h-3.5 w-3.5" strokeWidth={1.75} />
                          PDF
                        </a>
                      )}
                    </div>
                  )}
                </div>
                {(pub.link || pub.pdf) && (
                  <ArrowUpRight
                    className="mt-1 h-4 w-4 shrink-0 text-teal-600 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 dark:text-teal-400"
                    strokeWidth={1.75}
                  />
                )}
              </motion.li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default PubList
