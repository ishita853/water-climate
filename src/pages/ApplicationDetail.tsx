import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { getAdjacentApplications, getApplicationBySlug } from '../data/applicationsData'
import Reveal from '../components/Reveal'
import EmbeddedAppFrame from '../components/EmbeddedAppFrame'

function ApplicationDetail() {
  const { slug } = useParams<{ slug: string }>()
  const application = getApplicationBySlug(slug)

  if (!application) {
    return <Navigate to="/applications" replace />
  }

  const { previous, next } = getAdjacentApplications(application.slug)

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10">
      <Reveal className="flex flex-col items-center text-center">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-700"
          style={{ boxShadow: `0 2px 10px ${application.accent}22` }}
        >
          <img src={application.icon} alt="" className="h-full w-full object-cover" />
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: application.accent }}>
          {application.domainTag}
        </p>
        <h1 className="mt-2 max-w-2xl font-serif text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
          {application.title}
        </h1>
        {application.description && (
          <p className="mt-4 max-w-xl text-base leading-[1.7] text-stone-600 dark:text-stone-400">
            {application.description}
          </p>
        )}

        <a
          href={application.url}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: application.accent }}
        >
          Open Application
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </Reveal>

      <Reveal delay={0.1}>
        {application.embeddable && application.status === 'live' ? (
          <EmbeddedAppFrame url={application.url} title={application.title} accent={application.accent} />
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-stone-200 bg-white px-6 py-16 text-center dark:border-stone-800 dark:bg-stone-900">
            <p className="font-serif text-lg font-semibold text-stone-800 dark:text-stone-100">
              This application is temporarily unavailable
            </p>
            <p className="max-w-md text-sm leading-relaxed text-stone-500 dark:text-stone-500">
              Its deployment isn&rsquo;t currently reachable, so it can&rsquo;t be embedded here right
              now. Use the link above to check on it directly.
            </p>
          </div>
        )}
      </Reveal>

      <div className="flex flex-col gap-4 border-t border-stone-200 pt-6 dark:border-stone-800">
        <Link
          to="/applications"
          className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Applications
        </Link>

        {(previous || next) && (
          <div className="flex items-center justify-between gap-4 text-sm">
            {previous ? (
              <Link
                to={`/applications/${previous.slug}`}
                className="group flex max-w-[45%] items-center gap-1.5 text-stone-600 hover:text-teal-700 dark:text-stone-400 dark:hover:text-teal-400"
              >
                <ArrowLeft className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:-translate-x-1" />
                <span className="truncate">
                  <span className="block text-xs text-stone-400 dark:text-stone-500">Previous Application</span>
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                to={`/applications/${next.slug}`}
                className="group flex max-w-[45%] items-center justify-end gap-1.5 text-right text-stone-600 hover:text-teal-700 dark:text-stone-400 dark:hover:text-teal-400"
              >
                <span className="truncate">
                  <span className="block text-xs text-stone-400 dark:text-stone-500">Next Application</span>
                  {next.title}
                </span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ApplicationDetail
