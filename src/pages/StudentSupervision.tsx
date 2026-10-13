import { Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import students from '../../data/students.json'
import profile from '../../data/profile.json'
import StudentList from '../components/StudentList'
import ScholarCard from '../components/ScholarCard'
import AlumniRow from '../components/AlumniRow'
import Reveal from '../components/Reveal'
import MaskedHeading from '../components/MaskedHeading'
import { socialLinksMeta } from '../data/socialLinksMeta'
import { institutionLogos } from '../data/institutionLogos'
import { useScrollToHash } from '../hooks/useScrollToHash'

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
  useScrollToHash()

  return (
    <div className="flex flex-col gap-10">
      <Reveal>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
            Mentorship
          </p>
          <MaskedHeading as="h1" className="mt-2 font-serif text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
            Team
          </MaskedHeading>
          <p className="mt-4 max-w-2xl text-base leading-[1.7] text-stone-700 dark:text-stone-200">
            A multidisciplinary research group working across water, climate, hydrology, remote
            sensing, AI and environmental systems.
          </p>
        </div>
      </Reveal>

      <div className="flex flex-col gap-16">
        {/* PI / Professor — large featured profile, built entirely from existing profile.json
            fields already used elsewhere (ProfileCard, AboutSection, Hero) */}
        <section id="overview">
          <Reveal>
            <div className="grid grid-cols-1 gap-8 overflow-hidden rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900 sm:p-10 lg:grid-cols-[320px_1fr] lg:gap-12">
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
                <p className="mt-1 text-sm text-stone-700 dark:text-stone-200">{profile.title}</p>
                <p className="text-sm text-stone-700 dark:text-stone-200">
                  {profile.department} &middot; {profile.institution}
                </p>

                <p className="mt-4 max-w-2xl text-sm leading-[1.75] text-stone-700 dark:text-stone-200">
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
          <section id="alumni">
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
          <section id="phd-scholars">
            <SectionHeading label="Ph.D. Scholars" count={students.phdOngoing.length} />
            <ScholarCard entries={students.phdOngoing} />
          </section>
        )}

        {studentGroups.length > 0 && (
          <section id="students">
            <SectionHeading label="Students" count={totalStudents} />
            <div className="flex flex-col gap-10">
              {studentGroups.map((group) => (
                <div key={group.id}>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-stone-700 dark:text-stone-200">
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
  )
}

export default StudentSupervision
