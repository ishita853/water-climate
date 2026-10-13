import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import type { ResearchArea } from '../types'

interface ResearchAreasListProps {
  areas: ResearchArea[]
}

function ResearchAreasList({ areas }: ResearchAreasListProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <ul className="flex flex-col divide-y divide-stone-200 dark:divide-stone-800">
      {areas.map((area, i) => (
        <motion.li
          key={area.name}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="group flex items-start gap-5 py-6 sm:gap-8"
        >
          <span className="font-serif text-2xl font-semibold text-teal-600 tabular-nums dark:text-teal-400 sm:text-3xl">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <p className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-50 sm:text-xl">
              {area.name}
            </p>
            <p className="mt-1.5 max-w-2xl text-base leading-relaxed text-stone-700 dark:text-stone-200 sm:text-base">
              {area.description}
            </p>
          </div>
        </motion.li>
      ))}
    </ul>
  )
}

export default ResearchAreasList
