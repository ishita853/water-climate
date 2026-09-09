import type { Course } from '../types'
import { cardStyle, cardHover } from '../data/cardPalette'

interface CourseListProps {
  courses: Course[]
}

function CourseList({ courses }: CourseListProps) {
  if (courses.length === 0) {
    return <p className="text-stone-500 dark:text-stone-500">No courses listed yet.</p>
  }

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {courses.map((course, i) => {
        const style = cardStyle(i)
        return (
          <li key={course.id} className={`rounded-lg border p-4 ${style.card} ${cardHover}`}>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: style.dot }} />
              <p className="font-medium text-stone-900 dark:text-stone-100">
                {course.code ? `${course.code}: ${course.title}` : course.title}
              </p>
            </div>
            {course.description && (
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">{course.description}</p>
            )}
            {course.syllabus && (
              <a
                href={course.syllabus}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-sm text-teal-700 underline hover:text-teal-900 dark:text-teal-400 dark:hover:text-teal-300"
              >
                Syllabus
              </a>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default CourseList

