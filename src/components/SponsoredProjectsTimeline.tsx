import { motion } from 'framer-motion'
import { FlaskConical, Landmark } from 'lucide-react'
import { cardHover } from '../data/cardPalette'
import type { ResearchProject } from '../types'

const EASE = [0.22, 1, 0.36, 1] as const

interface SponsoredProjectsTimelineProps {
  projects: ResearchProject[]
}

function SponsoredProjectsTimeline({ projects }: SponsoredProjectsTimelineProps) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute left-[13px] top-1.5 bottom-1.5 w-px bg-gradient-to-b from-teal-600 via-stone-200 to-transparent dark:from-teal-500 dark:via-stone-800 sm:left-[15px]"
      />
      <ul className="flex flex-col gap-5">
        {projects.map((project, i) => {
          const isPI = project.role === 'PI'
          return (
            <motion.li
              key={project.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: Math.min(i, 6) * 0.06, ease: EASE }}
              className="relative flex gap-4 pl-9 sm:gap-5 sm:pl-11"
            >
              <span className="absolute left-0 top-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-teal-600 bg-white text-teal-700 shadow-[0_0_0_4px_rgba(255,255,255,1)] dark:border-teal-500 dark:bg-stone-950 dark:text-teal-400 dark:shadow-[0_0_0_4px_rgba(9,9,11,1)] sm:h-8 sm:w-8">
                <FlaskConical className="h-3.5 w-3.5" strokeWidth={1.75} />
              </span>
              <div className={`flex-1 rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6 ${cardHover}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-700 dark:text-teal-400">
                    {project.duration}
                  </p>
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-[0.8125rem] font-semibold uppercase tracking-wide ${
                      isPI
                        ? 'border-teal-600 bg-teal-600 text-white dark:border-teal-500 dark:bg-teal-500'
                        : 'border-teal-600/50 text-teal-700 dark:border-teal-500/40 dark:text-teal-400'
                    }`}
                  >
                    {project.role}
                  </span>
                </div>
                <p className="mt-1.5 font-serif text-lg font-semibold leading-snug text-stone-900 dark:text-stone-50">
                  {project.title}
                </p>
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm italic text-stone-700 dark:text-stone-200">
                  <Landmark className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                  {project.agency}
                </p>
              </div>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}

export default SponsoredProjectsTimeline
