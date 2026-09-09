import { useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import research from '../../data/research.json'
import patentsData from '../../data/patents.json'
import { domains } from '../data/researchDomainsData'
import ResearchDomains from '../components/ResearchDomains'
import ResearchAreasList from '../components/ResearchAreasList'
import SponsoredProjectsTimeline from '../components/SponsoredProjectsTimeline'
import PatentsList from '../components/PatentsList'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import type { Patent } from '../types'

const patents = patentsData as Patent[]

const EASE = [0.22, 1, 0.36, 1] as const

/** Projects only carry a free-text duration ("2013-2015", "Jan 2022-Jan 2025"), not a
 * clean date — pull the first four-digit year out of it so we can sort most-recent-first. */
function projectSortKey(duration: string) {
  const match = duration.match(/\d{4}/)
  return match ? parseInt(match[0], 10) : 0
}

const sortedProjects = [...research.nationalProjects].sort(
  (a, b) => projectSortKey(b.duration) - projectSortKey(a.duration),
)

// This page only surfaces patents that have actually been granted; filed applications
// are tracked separately (see the Applications page).
const grantedPatents = patents.filter((patent) => patent.status === 'Granted')

interface Category {
  id: string
  label: string
  count: number
}

const categories: Category[] = [
  { id: 'research-domains', label: 'Research Domains', count: domains.length },
  { id: 'research-areas', label: 'Research Areas', count: research.areas.length },
  { id: 'sponsored-projects', label: 'Sponsored Research Projects', count: sortedProjects.length },
  { id: 'patents', label: 'Patents & Technology Transfer', count: grantedPatents.length },
]

const DEFAULT_CATEGORY = categories[0].id

function CategoryPanel({ id }: { id: string }) {
  if (id === 'research-domains') return <ResearchDomains />
  if (id === 'research-areas') return <ResearchAreasList areas={research.areas} />
  if (id === 'sponsored-projects') return <SponsoredProjectsTimeline projects={sortedProjects} />
  return <PatentsList patents={grantedPatents} />
}

function Research() {
  const location = useLocation()
  const navigate = useNavigate()
  const prefersReducedMotion = usePrefersReducedMotion()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const initialId = useMemo(() => {
    const fromHash = location.hash.slice(1)
    return categories.some((c) => c.id === fromHash) ? fromHash : DEFAULT_CATEGORY
    // Only the URL the page was first opened with should seed the initial tab —
    // subsequent hash writes come from selectCategory itself, not external navigation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [activeId, setActiveId] = useState(initialId)
  const activeIndex = categories.findIndex((c) => c.id === activeId)
  const active = categories[activeIndex]

  function selectCategory(id: string) {
    setActiveId(id)
    navigate(`#${id}`, { replace: true })
  }

  function handleTabKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = (index + 1) % categories.length
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = (index - 1 + categories.length) % categories.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = categories.length - 1

    if (nextIndex !== null) {
      event.preventDefault()
      tabRefs.current[nextIndex]?.focus()
    }
  }

  const xOffset = prefersReducedMotion ? 0 : 16
  const duration = prefersReducedMotion ? 0.15 : 0.35

  return (
    <div className="flex flex-col gap-12">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
          Our Laboratory
        </p>
        <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
          Research
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-[1.7] text-stone-600 dark:text-stone-400">
          Six domains, two decades of hydro-climate science, from Himalayan cryosphere risk to
          deployable AI systems, unified by one mission: turning data into public resilience.
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-[280px_1fr] lg:items-start lg:gap-14">
        <div
          role="tablist"
          aria-label="Research categories"
          className="mb-8 flex gap-1 overflow-x-auto pb-2 lg:sticky lg:top-24 lg:mb-0 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0"
        >
          {categories.map((cat, index) => {
            const isActive = cat.id === activeId
            return (
              <button
                key={cat.id}
                ref={(el) => {
                  tabRefs.current[index] = el
                }}
                type="button"
                role="tab"
                id={`tab-${cat.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${cat.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectCategory(cat.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={`group flex shrink-0 items-center gap-2.5 whitespace-nowrap border-b-2 px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50 lg:w-full lg:justify-between lg:border-b-0 lg:border-l-2 lg:px-4 lg:py-2.5 dark:focus-visible:ring-offset-stone-950 ${
                  isActive
                    ? 'border-teal-600 bg-teal-50/70 dark:border-teal-400 dark:bg-teal-950/30'
                    : 'border-transparent hover:border-teal-600/40 hover:bg-stone-100 dark:hover:bg-stone-900'
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    isActive
                      ? 'text-teal-800 dark:text-teal-300'
                      : 'text-stone-600 transition-colors group-hover:text-teal-700 dark:text-stone-400 dark:group-hover:text-teal-400'
                  }`}
                >
                  {cat.label}
                </span>
                <span
                  className={`shrink-0 text-xs font-semibold tabular-nums ${
                    isActive ? 'text-teal-700 dark:text-teal-400' : 'text-stone-400 dark:text-stone-500'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            )
          })}
        </div>

        <div role="tabpanel" id={`panel-${active.id}`} aria-labelledby={`tab-${active.id}`} tabIndex={0} className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: xOffset }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -xOffset }}
              transition={{ duration, ease: EASE }}
            >
              <div className="mb-6 flex items-center gap-3">
                <h2 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-50">{active.label}</h2>
                <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-700 dark:bg-teal-950 dark:text-teal-400">
                  {active.count}
                </span>
                <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800" />
              </div>
              <CategoryPanel id={active.id} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Research
