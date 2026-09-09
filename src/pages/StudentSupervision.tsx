import { useEffect, useRef, useState } from 'react'
import { Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import students from '../../data/students.json'
import profile from '../../data/profile.json'
import StudentList from '../components/StudentList'
import ScholarCard from '../components/ScholarCard'
import AlumniRow from '../components/AlumniRow'
import Reveal from '../components/Reveal'
import { socialLinksMeta } from '../data/socialLinksMeta'
import { institutionLogos } from '../data/institutionLogos'

// Dr. Shivam Singh (2024) is the last PhD alumnus before the international fellows'
// short-term visits, and the most recent graduates (2025) follow after — so the fellows
// slot in right after him rather than at either end of the Alumni grid.
const shivamSinghIndex = students.phdCompleted.findIndex((entry) => entry.name === 'Dr. Shivam Singh')
const alumniWithFellows = [
  ...students.phdCompleted.slice(0, shivamSinghIndex + 1),
  ...students.internationalFellows,
  ...students.phdCompleted.slice(shivamSinghIndex + 1),
]

const studentGroups = [
  { id: 'mtech-ongoing', label: 'M.Tech. Ongoing', entries: students.mtechOngoing },
  { id: 'mtech-completed', label: 'M.Tech. Completed', entries: students.mtechCompleted },
  { id: 'btech-ongoing', label: 'B.Tech. Ongoing', entries: students.btechOngoing },
  { id: 'btech-completed', label: 'B.Tech. Completed', entries: students.btechCompleted },
].filter((group) => group.entries.length > 0)

const totalStudents = studentGroups.reduce((sum, group) => sum + group.entries.length, 0)

interface Section {
  id: string
  label: string
  count?: number
}

const sections: Section[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'alumni', label: 'Alumni', count: alumniWithFellows.length },
  { id: 'phd-scholars', label: 'Ph.D. Scholars', count: students.phdOngoing.length },
  { id: 'students', label: 'Students', count: totalStudents },
].filter((section) => section.id === 'overview' || (section.count ?? 0) > 0)

function SectionHeading({ label, count }: { label: string; count?: number }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <h2 className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50">{label}</h2>
      {typeof count === 'number' && (
        <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-700 dark:bg-teal-950 dark:text-teal-400">
          {count}
        </span>
      )}
      <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800" />
    </div>
  )
}

function StudentSupervision() {
  const [activeId, setActiveId] = useState(sections[0].id)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    const elements = sections.map((s) => sectionRefs.current[s.id]).filter((el): el is HTMLElement => Boolean(el))
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length === 0) return
        const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b))
        const id = topMost.target.getAttribute('data-section-id')
        if (id) setActiveId(id)
      },
      { rootMargin: '-15% 0px -65% 0px', threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  function scrollToSection(id: string) {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="flex flex-col gap-10">
      <Reveal>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
            Mentorship
          </p>
          <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
            Team
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-[1.7] text-stone-600 dark:text-stone-400">
            A multidisciplinary research group working across water, climate, hydrology, remote
            sensing, AI and environmental systems.
          </p>
        </div>
      </Reveal>

      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:items-start lg:gap-14">
        <nav
          aria-label="Team sections"
          className="mb-8 flex gap-1 overflow-x-auto pb-2 lg:sticky lg:top-24 lg:mb-0 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0"
        >
          {sections.map((section) => {
            const isActive = section.id === activeId
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`group flex shrink-0 items-center gap-2.5 whitespace-nowrap border-b-2 px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50 lg:w-full lg:justify-between lg:border-b-0 lg:border-l-2 lg:px-4 lg:py-2.5 dark:focus-visible:ring-offset-stone-950 ${
                  isActive
                    ? 'border-teal-600 bg-teal-50/70 dark:border-teal-400 dark:bg-teal-950/30'
                    : 'border-transparent hover:border-teal-600/40 hover:bg-stone-100 dark:hover:bg-stone-900'
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    isActive
                      ? 'text-teal-800 dark:text-teal-300'
                      : 'text-stone-600 transition-colors group-hover:text-teal-700 dark:text-stone-400 dark:group-hover:text-teal-400'
                  }`}
                >
                  {section.label}
                </span>
                {typeof section.count === 'number' && (
                  <span
                    className={`shrink-0 text-xs font-semibold tabular-nums ${
                      isActive ? 'text-teal-700 dark:text-teal-400' : 'text-stone-400 dark:text-stone-500'
                    }`}
                  >
                    {section.count}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        <div className="flex min-w-0 flex-col gap-16">
          {/* PI / Professor — large featured profile, built entirely from existing profile.json
              fields already used elsewhere (ProfileCard, AboutSection, Hero) */}
          <section
            id="overview"
            ref={(el) => {
              sectionRefs.current.overview = el
            }}
            data-section-id="overview"
          >
            <Reveal>
              <div className="grid grid-cols-1 gap-8 overflow-hidden rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900 sm:p-10 lg:grid-cols-[220px_1fr] lg:gap-12">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="h-40 w-40 rounded-2xl border border-stone-200 object-cover object-top dark:border-stone-700 lg:h-full lg:w-full"
                />
                <div className="flex flex-col">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
                    Principal Investigator
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-bold text-stone-900 dark:text-stone-50 sm:text-3xl">
                    {profile.name}
                  </h3>
                  <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{profile.title}</p>
                  <p className="text-sm text-stone-500 dark:text-stone-500">
                    {profile.department} &middot; {profile.institution}
                  </p>

                  <p className="mt-4 max-w-2xl text-sm leading-[1.75] text-stone-600 dark:text-stone-400">
                    {profile.bio}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {profile.researchInterests.map((area) => (
                      <span
                        key={area}
                        className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700 dark:bg-teal-950 dark:text-teal-400"
                      >
                        {area}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-stone-200 pt-5 dark:border-stone-800">
                    <Link
                      to="/publications"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
                    >
                      Publications &rarr;
                    </Link>
                    <div className="h-4 w-px bg-stone-200 dark:bg-stone-800" />
                    <a
                      href={`mailto:${profile.email}`}
                      aria-label="Email"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-400 transition-transform hover:scale-105"
                    >
                      <Mail className="h-4 w-4 text-white" strokeWidth={2} />
                    </a>
                    {Object.entries(profile.socialLinks).map(([platform, url]) => {
                      const meta = socialLinksMeta[platform]
                      if (!meta) return null
                      const Icon = meta.icon
                      return (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={meta.label}
                          title={meta.label}
                          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full transition-transform hover:scale-105"
                          style={meta.image ? undefined : { backgroundColor: meta.color }}
                        >
                          {meta.image ? (
                            <img src={meta.image} alt={meta.label} className="h-full w-full object-cover" />
                          ) : (
                            <Icon className="h-4 w-4 text-white" strokeWidth={2} />
                          )}
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          {alumniWithFellows.length > 0 && (
            <section
              id="alumni"
              ref={(el) => {
                sectionRefs.current.alumni = el
              }}
              data-section-id="alumni"
            >
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <h2 className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50">Alumni</h2>
                <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-700 dark:bg-teal-950 dark:text-teal-400">
                  {alumniWithFellows.length}
                </span>
                <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800" />
                <div className="flex max-w-full flex-wrap items-center gap-3 sm:gap-4" aria-label="Alumni now at">
                  {institutionLogos.map((institution) => (
                    <div
                      key={institution.name}
                      title={institution.name}
                      className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-stone-200 bg-white shadow-sm dark:border-stone-700 sm:h-20 sm:w-20"
                    >
                      <img
                        src={institution.logo}
                        alt={institution.name}
                        className={`h-full w-full object-contain p-1 ${institution.zoomClass ?? ''}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <AlumniRow entries={alumniWithFellows} />
            </section>
          )}

          {students.phdOngoing.length > 0 && (
            <section
              id="phd-scholars"
              ref={(el) => {
                sectionRefs.current['phd-scholars'] = el
              }}
              data-section-id="phd-scholars"
            >
              <SectionHeading label="Ph.D. Scholars" count={students.phdOngoing.length} />
              <ScholarCard entries={students.phdOngoing} />
            </section>
          )}

          {studentGroups.length > 0 && (
            <section
              id="students"
              ref={(el) => {
                sectionRefs.current.students = el
              }}
              data-section-id="students"
            >
              <SectionHeading label="Students" count={totalStudents} />
              <div className="flex flex-col gap-10">
                {studentGroups.map((group) => (
                  <div key={group.id}>
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                      {group.label}
                    </h3>
                    <StudentList entries={group.entries} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentSupervision
