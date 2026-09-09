import { useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import students from '../../data/students.json'
import StudentList from '../components/StudentList'
import ScholarCard from '../components/ScholarCard'
import AlumniRow from '../components/AlumniRow'
import Reveal from '../components/Reveal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { institutionLogos } from '../data/institutionLogos'
import type { StudentEntry } from '../types'

const EASE = [0.22, 1, 0.36, 1] as const

type Variant = 'alumni' | 'scholar' | 'list'

interface Category {
  id: string
  label: string
  count: number
  variant: Variant
  entries: StudentEntry[]
}

// Dr. Shivam Singh (2024) is the last PhD alumnus before the international fellows'
// short-term visits, and the most recent graduates (2025) follow after — so the fellows
// slot in right after him rather than at either end of the Alumni grid.
const shivamSinghIndex = students.phdCompleted.findIndex((entry) => entry.name === 'Dr. Shivam Singh')
const alumniWithFellows = [
  ...students.phdCompleted.slice(0, shivamSinghIndex + 1),
  ...students.internationalFellows,
  ...students.phdCompleted.slice(shivamSinghIndex + 1),
]

const categories: Category[] = [
  { id: 'alumni', label: 'Alumni', variant: 'alumni', entries: alumniWithFellows, count: alumniWithFellows.length },
  {
    id: 'phd-scholars',
    label: 'Ph.D. Scholars',
    variant: 'scholar',
    entries: students.phdOngoing,
    count: students.phdOngoing.length,
  },
  {
    id: 'mtech-completed',
    label: 'M.Tech. Completed',
    variant: 'list',
    entries: students.mtechCompleted,
    count: students.mtechCompleted.length,
  },
  {
    id: 'mtech-ongoing',
    label: 'M.Tech. Ongoing',
    variant: 'list',
    entries: students.mtechOngoing,
    count: students.mtechOngoing.length,
  },
  // Only surfaced once the lab actually has an ongoing B.Tech student — matches the
  // original page, which hid this section entirely while the array was empty.
  ...(students.btechOngoing.length > 0
    ? [
        {
          id: 'btech-ongoing',
          label: 'B.Tech. Ongoing',
          variant: 'list' as Variant,
          entries: students.btechOngoing,
          count: students.btechOngoing.length,
        },
      ]
    : []),
  {
    id: 'btech-completed',
    label: 'B.Tech. Completed',
    variant: 'list',
    entries: students.btechCompleted,
    count: students.btechCompleted.length,
  },
]

const DEFAULT_CATEGORY = categories[0].id

function CategoryPanel({ category }: { category: Category }) {
  if (category.count === 0) {
    return <p className="text-stone-500 dark:text-stone-500">Nothing to show yet.</p>
  }
  if (category.variant === 'alumni') return <AlumniRow entries={category.entries} />
  if (category.variant === 'scholar') return <ScholarCard entries={category.entries} />
  return <StudentList entries={category.entries} />
}

function StudentSupervision() {
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
  const duration = prefersReducedMotion ? 0.15 : 0.5

  return (
    <div className="flex flex-col gap-10">
      <Reveal>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">Mentorship</p>
          <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
            Student Supervision
          </h1>
        </div>
      </Reveal>

      <div className="lg:grid lg:grid-cols-[280px_1fr] lg:items-start lg:gap-14">
        <div
          role="tablist"
          aria-label="Student categories"
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
                {active.id === 'alumni' && (
                  <div className="flex shrink-0 items-center gap-4" aria-label="Alumni now at">
                    {institutionLogos.map((institution) => (
                      <div
                        key={institution.name}
                        title={institution.name}
                        className="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-stone-200 bg-white shadow-sm dark:border-stone-700"
                      >
                        <img
                          src={institution.logo}
                          alt={institution.name}
                          className={`h-full w-full object-contain p-1 ${institution.zoomClass ?? ''}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <CategoryPanel category={active} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default StudentSupervision
