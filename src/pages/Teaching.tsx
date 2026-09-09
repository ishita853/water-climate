import { useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import coursesData from '../../data/courses.json'
import courseDesign from '../../data/courseDesign.json'
import CourseList from '../components/CourseList'
import CourseDesignList from '../components/CourseDesignList'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import type { Course } from '../types'

const EASE = [0.22, 1, 0.36, 1] as const

const courses = coursesData as Course[]
const ugCourses = courses.filter((course) => course.level === 'UG')
const pgCourses = courses.filter((course) => course.level === 'PG')

interface Category {
  id: string
  label: string
  count: number
}

const categories: Category[] = [
  { id: 'undergraduate', label: 'Undergraduate Courses', count: ugCourses.length },
  { id: 'postgraduate', label: 'Postgraduate Courses', count: pgCourses.length },
  { id: 'designed', label: 'Courses Designed & Coordinated', count: courseDesign.length },
]

const DEFAULT_CATEGORY = categories[0].id

function CategoryPanel({ id }: { id: string }) {
  if (id === 'undergraduate') return <CourseList courses={ugCourses} />
  if (id === 'postgraduate') return <CourseList courses={pgCourses} />
  return (
    <div>
      <p className="mb-4 text-sm text-stone-500 dark:text-stone-500">
        M.Tech Water, Climate &amp; Sustainability Program
      </p>
      <CourseDesignList courses={courseDesign} />
    </div>
  )
}

function Teaching() {
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
    <div className="flex flex-col gap-10">
      <h1 className="font-serif text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
        Teaching
      </h1>

      <div className="lg:grid lg:grid-cols-[280px_1fr] lg:items-start lg:gap-14">
        <div
          role="tablist"
          aria-label="Course categories"
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
                className={`shrink-0 whitespace-nowrap border-b-2 px-3 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50 lg:w-full lg:border-b-0 lg:border-l-2 lg:px-4 lg:py-2.5 dark:focus-visible:ring-offset-stone-950 ${
                  isActive
                    ? 'border-teal-600 bg-teal-50/70 text-teal-800 dark:border-teal-400 dark:bg-teal-950/30 dark:text-teal-300'
                    : 'border-transparent text-stone-600 hover:border-teal-600/40 hover:bg-stone-100 hover:text-teal-700 dark:text-stone-400 dark:hover:bg-stone-900 dark:hover:text-teal-400'
                }`}
              >
                {cat.label}
                <span className="ml-2 text-xs text-stone-400 dark:text-stone-500">{cat.count}</span>
              </button>
            )
          })}
        </div>

        <div role="tabpanel" id={`panel-${activeId}`} aria-labelledby={`tab-${activeId}`} tabIndex={0} className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, x: xOffset }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -xOffset }}
              transition={{ duration, ease: EASE }}
            >
              <CategoryPanel id={activeId} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Teaching
