import coursesData from '../../data/courses.json'
import courseDesign from '../../data/courseDesign.json'
import CourseList from '../components/CourseList'
import CourseDesignList from '../components/CourseDesignList'
import MaskedHeading from '../components/MaskedHeading'
import type { Course } from '../types'

const courses = coursesData as Course[]
const ugCourses = courses.filter((course) => course.level === 'UG')
const pgCourses = courses.filter((course) => course.level === 'PG')

function SectionHeading({ label, count }: { label: string; count: number }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <MaskedHeading as="h2" className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50 sm:text-3xl">
        {label}
      </MaskedHeading>
      <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-700 dark:bg-teal-950 dark:text-teal-400">
        {count}
      </span>
      <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800" />
    </div>
  )
}

function Teaching() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
          Academic Program
        </p>
        <MaskedHeading
          as="h1"
          className="mt-2 font-serif text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl"
        >
          Teaching
        </MaskedHeading>
        <p className="mt-4 max-w-2xl text-base leading-[1.7] text-stone-700 dark:text-stone-200">
          Courses on water, climate and sustainability, taught within the Department of Civil
          Engineering.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-x-6 gap-y-8 border-y border-stone-200 py-8 dark:border-stone-800">
        {[
          { value: ugCourses.length, label: 'Undergraduate Courses' },
          { value: pgCourses.length, label: 'Postgraduate Courses' },
          { value: courseDesign.length, label: 'Courses Designed & Coordinated' },
        ].map((stat, i) => (
          <div key={stat.label} className={i > 0 ? 'border-stone-200 dark:border-stone-800 sm:border-l sm:pl-6' : ''}>
            <p className="font-serif text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
              {stat.value}
            </p>
            <p className="mt-1.5 text-sm leading-snug text-stone-700 dark:text-stone-200">{stat.label}</p>
          </div>
        ))}
      </div>

      <section>
        <SectionHeading label="Undergraduate Courses" count={ugCourses.length} />
        <CourseList courses={ugCourses} />
      </section>

      <section>
        <SectionHeading label="Postgraduate Courses" count={pgCourses.length} />
        <CourseList courses={pgCourses} />
      </section>

      <section>
        <SectionHeading label="Courses Designed & Coordinated" count={courseDesign.length} />
        <p className="mb-4 text-sm text-stone-700 dark:text-stone-200">
          M.Tech Water, Climate &amp; Sustainability Program
        </p>
        <CourseDesignList courses={courseDesign} />
      </section>
    </div>
  )
}

export default Teaching
