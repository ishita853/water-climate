import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { applications } from '../data/applicationsData'
import Reveal from '../components/Reveal'
import MaskedHeading from '../components/MaskedHeading'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { cardHover } from '../data/cardPalette'

const AUTOPLAY_MS = 5500
const EASE = [0.22, 1, 0.36, 1] as const

const visualVariants = {
  enter: (direction: number) => ({ opacity: 0, scale: 1.08, clipPath: direction >= 0 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)' }),
  center: { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.4, ease: EASE } },
}

const textChild = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: EASE } },
}

function FeaturedApplications() {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 1])
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const total = applications.length

  const paginate = useCallback((newDirection: number) => {
    setIndex(([current]) => [(current + newDirection + total) % total, newDirection])
  }, [total])

  function goTo(target: number) {
    setIndex(([current]) => [target, target > current ? 1 : -1])
  }

  // Content keeps advancing even when the visitor prefers reduced motion — only the
  // transition itself simplifies (see the duration overrides below).
  useEffect(() => {
    if (isPaused || total <= 1) return
    const id = setInterval(() => paginate(1), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [isPaused, index, total, paginate])

  const app = applications[index]

  return (
    <div
      className="grid grid-cols-1 gap-3 lg:grid-cols-[64px_1fr]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Small numbered navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {applications.map((a, i) => (
          <button
            key={a.slug}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show ${a.title}`}
            aria-current={i === index}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border font-serif text-sm font-semibold tabular-nums transition-colors ${
              i === index
                ? 'border-teal-600 bg-teal-600 text-white dark:border-teal-500 dark:bg-teal-500'
                : 'border-stone-200 text-stone-700 hover:border-teal-300 hover:text-teal-700 dark:border-stone-700 dark:text-stone-200 dark:hover:border-teal-700 dark:hover:text-teal-400'
            }`}
          >
            {String(i + 1).padStart(2, '0')}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-stone-200 dark:border-stone-800">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div
            className="relative flex aspect-[4/3] items-center justify-center overflow-hidden sm:aspect-auto"
            style={{ background: `linear-gradient(135deg, ${app.accent}20, transparent 70%)` }}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={app.slug}
                custom={direction}
                variants={visualVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: prefersReducedMotion ? 0.2 : 0.9, ease: EASE }}
                className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm dark:border-stone-700 dark:bg-stone-900 sm:h-44 sm:w-44"
                style={{ boxShadow: `0 8px 30px ${app.accent}22` }}
              >
                <img src={app.icon} alt="" className="h-full w-full object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative flex min-h-[280px] flex-col justify-center p-8 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div key={app.slug} initial="enter" animate="center" exit="exit">
                <motion.p
                  variants={textChild}
                  className="text-xs font-semibold uppercase tracking-[0.15em]"
                  style={{ color: app.accent }}
                >
                  {app.domainTag} &middot; {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </motion.p>
                <motion.h2 variants={textChild} className="mt-3 font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50 sm:text-3xl">
                  {app.title}
                </motion.h2>
                {app.description && (
                  <motion.p variants={textChild} className="mt-3 text-base leading-[1.7] text-stone-700 dark:text-stone-200">
                    {app.description}
                  </motion.p>
                )}
                <motion.div variants={textChild} className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link
                    to={`/applications/${app.slug}`}
                    className="group/cta inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 dark:text-teal-400"
                  >
                    Open Application
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-1" />
                  </Link>
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/cta inline-flex items-center gap-1.5 text-sm font-medium text-stone-700 transition-colors hover:text-teal-700 dark:text-stone-200 dark:hover:text-teal-400"
                  >
                    Launch externally
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                  </a>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

function ApplicationRow({ app, index }: { app: (typeof applications)[number]; index: number }) {
  return (
    <Reveal delay={Math.min(index, 4) * 0.05}>
      <Link
        to={`/applications/${app.slug}`}
        className={`group flex items-center gap-4 rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900 ${cardHover}`}
      >
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-stone-200 bg-stone-50 dark:border-stone-700 dark:bg-stone-800"
          style={{ boxShadow: `0 1px 6px ${app.accent}22` }}
        >
          <img src={app.icon} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.13em]" style={{ color: app.accent }}>
            {app.domainTag}
          </p>
          <p className="mt-0.5 truncate font-serif text-base font-semibold text-stone-900 transition-colors duration-300 group-hover:text-teal-800 dark:text-stone-50 dark:group-hover:text-teal-300">
            {app.title}
          </p>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-stone-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-teal-600 dark:text-stone-200" />
      </Link>
    </Reveal>
  )
}

function Applications() {
  return (
    <div className="flex flex-col gap-14">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
          Digital Platforms
        </p>
        <MaskedHeading as="h1" className="mt-2 font-serif text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
          Applications
        </MaskedHeading>
        <p className="mt-4 max-w-2xl font-serif text-xl font-semibold text-stone-800 dark:text-stone-100">
          We build research tools for a sustainable future.
        </p>
        <p className="mt-3 max-w-2xl text-base leading-[1.7] text-stone-700 dark:text-stone-200">
          Our platforms span climate, water, and air quality, making complex environmental data
          accessible and actionable for India. Open each one to explore it directly inside the
          portfolio, or launch it in its own tab.
        </p>
      </div>

      <FeaturedApplications />

      <div>
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-stone-700 dark:text-stone-200">
          All Applications
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {applications.map((app, index) => (
            <ApplicationRow key={app.slug} app={app} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Applications
