import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import type { Distinction } from '../types'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

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
  const prefersReducedMotion = usePrefersReducedMotion()

  if (items.length === 0) {
    return <p className="text-stone-700 dark:text-stone-200">Nothing to show yet.</p>
  }

  const dated = [...items].filter((item) => item.date !== 'N/A').sort((a, b) => sortKey(b.date) - sortKey(a.date))
  const undated = items.filter((item) => item.date === 'N/A')

  return (
    <div className="flex flex-col gap-16">
      {dated.length > 0 && (
        <div className="relative">
          <div
            aria-hidden
            className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-teal-600 via-stone-200 to-transparent dark:from-teal-500 dark:via-stone-800"
          />
          <ul className="flex flex-col">
            {dated.map((item, i) => {
              const formatted = formatDate(item.date)
              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : Math.min(i, 8) * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="relative border-b border-stone-200 py-6 pl-8 last:border-b-0 dark:border-stone-800 sm:pl-10"
                >
                  <span className="absolute left-[-4px] top-8 h-2 w-2 rounded-full bg-teal-600 dark:bg-teal-400" />
                  {formatted && (
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-700 dark:text-teal-400">
                      {formatted}
                    </p>
                  )}
                  <p className="mt-1.5 font-serif text-xl font-semibold sm:text-2xl text-stone-900 dark:text-stone-50">
                    {item.title}
                  </p>
                  <p className="mt-1.5 max-w-2xl text-base leading-relaxed text-stone-700 dark:text-stone-200 sm:text-lg">
                    {item.description}
                  </p>
                </motion.li>
              )
            })}
          </ul>
        </div>
      )}

      {undated.length > 0 && (
        <div>
          <h2 className="mb-6 flex items-center gap-2 font-serif text-lg font-semibold text-stone-900 dark:text-stone-50">
            <Sparkles className="h-4 w-4 text-teal-600 dark:text-teal-400" strokeWidth={1.75} />
            Ongoing Roles &amp; Honors
          </h2>
          <ul className="grid grid-cols-1 gap-x-10 gap-y-6 divide-y divide-stone-200 dark:divide-stone-800 sm:grid-cols-2 sm:divide-y-0">
            {undated.map((item, i) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : Math.min(i, 8) * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="pt-6 first:pt-0 sm:pt-0"
              >
                <p className="font-serif text-base font-semibold text-stone-900 dark:text-stone-50">{item.title}</p>
                <p className="mt-1.5 text-base leading-relaxed text-stone-700 dark:text-stone-200 sm:text-lg">{item.description}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default DistinctionsList
