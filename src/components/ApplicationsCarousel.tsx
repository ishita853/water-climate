import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Application } from '../data/applicationsData'

interface ApplicationsCarouselProps {
  apps: Application[]
  intervalMs?: number
}

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -40 : 40, opacity: 0 }),
}

function ApplicationsCarousel({ apps, intervalMs = 5000 }: ApplicationsCarouselProps) {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 1])
  const [isPaused, setIsPaused] = useState(false)
  const total = apps.length

  function paginate(newDirection: number) {
    setIndex(([current]) => {
      const next = (current + newDirection + total) % total
      return [next, newDirection]
    })
  }

  function goTo(target: number) {
    setIndex(([current]) => [target, target > current ? 1 : -1])
  }

  useEffect(() => {
    if (isPaused || total <= 1) return
    const id = setInterval(() => paginate(1), intervalMs)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, index, total, intervalMs])

  const app = apps[index]

  return (
    <div
      className="relative overflow-hidden rounded-[24px] border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={app.slug}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            to={`/applications/${app.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-2"
            aria-label={`View application: ${app.title}`}
          >
            <div
              className="flex items-center justify-center overflow-hidden bg-stone-50 p-10 dark:bg-stone-800 sm:p-14"
              style={{ background: `linear-gradient(135deg, ${app.accent}14, transparent 65%)` }}
            >
              <div
                className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition-transform duration-500 group-hover:scale-[1.04] dark:border-stone-700 dark:bg-stone-900 sm:h-40 sm:w-40"
                style={{ boxShadow: `0 4px 20px ${app.accent}22` }}
              >
                <img src={app.icon} alt="" className="h-full w-full object-cover" />
              </div>
            </div>

            <div className="flex flex-col justify-center p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: app.accent }}>
                {app.domainTag} &middot; Application {index + 1} of {total}
              </p>
              <h3 className="mt-3 font-serif text-2xl font-semibold text-stone-900 transition-colors duration-300 group-hover:text-teal-800 dark:text-stone-50 dark:group-hover:text-teal-300 sm:text-3xl">
                {app.title}
              </h3>
              {app.description && (
                <p className="mt-3 text-base leading-[1.7] text-stone-600 dark:text-stone-400">{app.description}</p>
              )}
              <span className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-teal-700 dark:text-teal-400">
                View Application
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </motion.div>
      </AnimatePresence>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Previous application"
            className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-stone-600 shadow-md transition-colors hover:text-teal-700 dark:bg-stone-900/90 dark:text-stone-300 dark:hover:text-teal-400"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => paginate(1)}
            aria-label="Next application"
            className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-stone-600 shadow-md transition-colors hover:text-teal-700 dark:bg-stone-900/90 dark:text-stone-300 dark:hover:text-teal-400"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
            {apps.map((item, i) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to ${item.title}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-6 bg-teal-600 dark:bg-teal-500' : 'w-1.5 bg-stone-300 dark:bg-stone-600'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ApplicationsCarousel
