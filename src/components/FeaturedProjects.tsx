import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { flagshipProjects, platformProjects } from '../data/projectsData'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

// Both real, already-authored arrays — platformProjects previously had no page of its own to
// appear on; surfacing it here (alongside flagshipProjects) keeps it visible on the site now
// that Applications points at a different, newer set of deployed tools.
const projects = [...flagshipProjects, ...platformProjects]

const AUTOPLAY_MS = 5500
const EASE = [0.22, 1, 0.36, 1] as const

const imageVariants = {
  enter: (direction: number) => ({ opacity: 0, scale: 1.06, x: direction > 0 ? 30 : -30 }),
  center: { opacity: 1, scale: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, scale: 0.97, x: direction > 0 ? -24 : 24 }),
}

const textContainer = {
  enter: {},
  center: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
  exit: {},
}

const textChild = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: EASE } },
}

function FeaturedProjects() {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 1])
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const total = projects.length

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

  const project = projects[index]
  const description = project.description

  return (
    <section aria-label="Featured projects" className="relative">
      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-teal-950">
        <div
          className="relative mx-auto max-w-page px-5 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-12 xl:px-16 2xl:px-[72px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
                From Research to Infrastructure
              </p>
              <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Featured Projects
              </h2>
            </div>
            <Link
              to="/research"
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-teal-200 transition-colors hover:text-white"
            >
              All research
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-14">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-white sm:aspect-[16/10]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={project.title}
                  src={project.image}
                  alt={project.title}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: prefersReducedMotion ? 0.2 : 0.9, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:p-6"
                />
              </AnimatePresence>
            </div>

            <div className="relative min-h-[280px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={project.title}
                  custom={direction}
                  variants={textContainer}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <motion.p
                    variants={textChild}
                    className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-300"
                  >
                    {project.tag}
                  </motion.p>
                  <motion.h3 variants={textChild} className="mt-3 font-serif text-2xl font-semibold leading-snug text-white sm:text-[1.75rem]">
                    {project.title}
                  </motion.h3>
                  <motion.p variants={textChild} className="mt-3 text-[1.0625rem] leading-[1.7] text-teal-100">
                    {project.subtitle}
                  </motion.p>
                  {description && (
                    <motion.p variants={textChild} className="mt-2 text-base leading-[1.7] text-teal-100">
                      {description}
                    </motion.p>
                  )}
                  <motion.div variants={textChild} className="mt-6">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/cta inline-flex items-center gap-1.5 text-sm font-semibold text-white"
                    >
                      <span className="border-b border-white/30 pb-0.5 transition-colors group-hover/cta:border-white">
                        {project.cta}
                      </span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                    </a>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {total > 1 && (
            <div className="mt-10 flex items-center gap-3">
              {projects.map((p, i) => (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show project ${i + 1}: ${p.title}`}
                  aria-current={i === index}
                  className="group relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/15"
                >
                  {i === index && (
                    <motion.span
                      key={index}
                      className="absolute inset-y-0 left-0 rounded-full bg-white"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={
                        isPaused || prefersReducedMotion
                          ? { duration: 0 }
                          : { duration: AUTOPLAY_MS / 1000, ease: 'linear' }
                      }
                    />
                  )}
                  {i < index && <span className="absolute inset-0 rounded-full bg-white/60" />}
                </button>
              ))}
              <span className="ml-2 shrink-0 text-xs font-medium tabular-nums text-teal-300">
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
