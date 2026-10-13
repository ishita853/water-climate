import { motion } from 'framer-motion'
import type { Course } from '../types'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface CourseListProps {
  courses: Course[]
}

function CourseList({ courses }: CourseListProps) {
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
          className="py-5"
        >
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            {course.code && (
              <span className="text-xs font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-400">
                {course.code}
              </span>
            )}
            <p className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-50">{course.title}</p>
          </div>
          {course.semester && <p className="mt-1 text-sm text-stone-700 dark:text-stone-200">{course.semester}</p>}
          {course.description && (
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-stone-700 dark:text-stone-200 sm:text-lg">
              {course.description}
            </p>
          )}
          {course.syllabus && (
            <a
              href={course.syllabus}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-sm font-medium text-teal-700 transition-colors hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
            >
              Syllabus &rarr;
            </a>
          )}
        </motion.li>
      ))}
    </ul>
  )
}

export default CourseList
