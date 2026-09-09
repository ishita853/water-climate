import type { DesignedCourse } from '../types'
import { cardStyle, cardHover } from '../data/cardPalette'

interface CourseDesignListProps {
  courses: DesignedCourse[]
}

function CourseDesignList({ courses }: CourseDesignListProps) {
  if (courses.length === 0) {
    return <p className="text-stone-500 dark:text-stone-500">No courses listed yet.</p>
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {courses.map((course, i) => {
        const style = cardStyle(i)
        return (
          <li key={course.id} className={`rounded-xl border p-4 ${style.card} ${cardHover}`}>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: style.dot }} />
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                {course.code}
              </p>
            </div>
            <p className="mt-1 font-medium text-stone-900 dark:text-stone-100">{course.title}</p>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
              <span className="font-semibold text-stone-500 dark:text-stone-500">Unique features: </span>
              {course.uniqueFeatures}
            </p>
            <p className="mt-1.5 text-sm text-stone-600 dark:text-stone-400">
              <span className="font-semibold text-stone-500 dark:text-stone-500">Methodology: </span>
              {course.methodology}
            </p>
            {course.practicalComponent && (
              <p className="mt-1.5 text-sm text-stone-600 dark:text-stone-400">
                <span className="font-semibold text-stone-500 dark:text-stone-500">Practical component: </span>
                {course.practicalComponent}
              </p>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default CourseDesignList
