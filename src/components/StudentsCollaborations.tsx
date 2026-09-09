import { ArrowRight, GraduationCap, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import students from '../../data/students.json'
import Reveal from './Reveal'
import { cardStyle } from '../data/cardPalette'

const stats = [
  { value: students.phdCompleted.length, label: 'Ph.D. Scholars Completed' },
  { value: students.phdOngoing.length, label: 'Ph.D. Scholars Ongoing' },
  {
    value:
      students.mtechCompleted.length +
      students.mtechOngoing.length +
      students.btechCompleted.length +
      students.btechOngoing.length,
    label: 'M.Tech. & B.Tech. Mentees',
  },
  { value: students.internationalFellows.length, label: 'International Doctoral Fellows' },
]

function StudentsCollaborations() {
  return (
    <Reveal>
      <section>
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50">
            Students &amp; Collaborations
          </h2>
          <Link
            to="/student-supervision"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
          >
            Full supervision record
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const style = cardStyle(i)
            return (
              <div
                key={stat.label}
                className={`rounded-xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${style.card}`}
              >
                {stat.label.includes('International') ? (
                  <Users className="h-6 w-6" style={{ color: style.dot }} strokeWidth={1.5} />
                ) : (
                  <GraduationCap className="h-6 w-6" style={{ color: style.dot }} strokeWidth={1.5} />
                )}
                <p className="mt-3 font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50">{stat.value}</p>
                <p className="mt-1 text-sm leading-snug text-stone-600 dark:text-stone-400">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </section>
    </Reveal>
  )
}

export default StudentsCollaborations
