import { motion } from 'framer-motion'
import type { DesignedCourse } from '../types'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface CourseDesignListProps {
  courses: DesignedCourse[]
}

function CourseDesignList({ courses }: CourseDesignListProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  if (courses.length === 0) {
    return <p className="text-stone-700 dark:text-stone-200">No courses listed yet.</p>
  }

  return (
    <ul className="flex flex-col divide-y divide-stone-200 dark:divide-stone-800">
      {courses.map((course, i) => (
        <motion.li
          key={course.id}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : Math.min(i, 8) * 0.04, ease: [0.22, 1, 0.36, 1] }}
          className="py-6"
        >
          <span className="text-xs font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-400">
            {course.code}
          </span>
          <p className="mt-1 font-serif text-lg font-semibold text-stone-900 dark:text-stone-50">{course.title}</p>
          <dl className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-stone-700 dark:text-stone-200">
                Unique Features
              </dt>
              <dd className="mt-1 text-base leading-relaxed text-stone-700 dark:text-stone-200">
                {course.uniqueFeatures}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-stone-700 dark:text-stone-200">
                Methodology
              </dt>
              <dd className="mt-1 text-base leading-relaxed text-stone-700 dark:text-stone-200">{course.methodology}</dd>
            </div>
            {course.practicalComponent && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-stone-700 dark:text-stone-200">
                  Practical Component
                </dt>
                <dd className="mt-1 text-base leading-relaxed text-stone-700 dark:text-stone-200">
                  {course.practicalComponent}
                </dd>
              </div>
            )}
          </dl>
        </motion.li>
      ))}
    </ul>
  )
}

export default CourseDesignList
