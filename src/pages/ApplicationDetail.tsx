import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import {
  getAdjacentApplications,
  getApplicationBySlug,
  getRelatedPatent,
  getRelatedResearchDomain,
} from '../data/applicationsData'
import Reveal from '../components/Reveal'

function HowItWorks({ steps, accent }: { steps: string[]; accent: string }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-2">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-2 sm:flex-1">
          <div className="flex flex-1 items-center gap-3 rounded-lg border border-stone-200 bg-white px-4 py-3 dark:border-stone-800 dark:bg-stone-900">
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
              style={{ backgroundColor: `${accent}1a`, color: accent }}
            >
              {i + 1}
            </span>
            <p className="text-sm font-medium text-stone-800 dark:text-stone-200">{step}</p>
          </div>
          {i < steps.length - 1 && (
            <ArrowRight className="hidden h-4 w-4 shrink-0 text-stone-300 dark:text-stone-700 sm:block" />
          )}
        </div>
      ))}
    </div>
  )
}

function ApplicationDetail() {
  const { slug } = useParams<{ slug: string }>()
  const application = getApplicationBySlug(slug)

  if (!application) {
    return <Navigate to="/applications" replace />
  }

  const { previous, next } = getAdjacentApplications(application.slug)
  const relatedDomain = getRelatedResearchDomain(application.relatedResearchEyebrow)
  const relatedPatent = getRelatedPatent(application.relatedPatentId)
  const overview = application.description ?? application.tagline

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12">
      {/* Hero — deliberately centered and spare, a break from the site's usual left-aligned
          page headers, so the application itself (not the chrome) reads as the subject. */}
      <Reveal className="flex flex-col items-center text-center">
        <p
          className="text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: application.accent }}
        >
          Application
        </p>
        <h1 className="mt-3 max-w-2xl font-serif text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
          {application.title}
        </h1>
        {/* Only shown when a distinct, longer Overview follows below — otherwise the tagline
            appears once, as the Overview body, rather than being printed twice in a row. */}
        {application.description && (
          <p className="mt-4 max-w-xl text-base leading-[1.7] text-stone-600 dark:text-stone-400">
            {application.tagline}
          </p>
        )}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-wide text-stone-400 dark:text-stone-500">
          <span>{application.type}</span>
          <span aria-hidden>&middot;</span>
          <span>{application.status}</span>
        </div>
      </Reveal>

      {/* Breaks out beyond the site's normal reading column so the application artwork can
          read as the dominant artifact on the page — body's overflow-x-hidden keeps this safe. */}
      <Reveal delay={0.1}>
        <div className="relative left-1/2 w-screen -translate-x-1/2 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1200px] overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <img
              src={application.detailImage}
              alt={application.title}
              className="max-h-[720px] w-full object-contain"
            />
          </div>
        </div>
      </Reveal>

      {/* Overview + project metadata */}
      <Reveal delay={0.15}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[65%_1fr]">
          <div>
            <h2 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-50">Overview</h2>
            <p className="mt-3 text-base leading-[1.75] text-stone-600 dark:text-stone-400">{overview}</p>
          </div>

          <div className="flex flex-col gap-5 rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
            <a
              href={application.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: application.accent }}
            >
              {application.cta}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <dl className="flex flex-col gap-4 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-stone-400 dark:text-stone-500">
                  Type
                </dt>
                <dd className="mt-1 text-stone-800 dark:text-stone-200">{application.type}</dd>
              </div>

              {relatedDomain && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-stone-400 dark:text-stone-500">
                    Domain
                  </dt>
                  <dd className="mt-1 text-stone-800 dark:text-stone-200">{relatedDomain.title}</dd>
                </div>
              )}

              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-stone-400 dark:text-stone-500">
                  Status
                </dt>
                <dd className="mt-1 text-stone-800 dark:text-stone-200">{application.status}</dd>
              </div>

              {relatedPatent && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-stone-400 dark:text-stone-500">
                    Related IP
                  </dt>
                  <dd className="mt-1 text-stone-800 dark:text-stone-200">
                    {relatedPatent.status}
                    {relatedPatent.year && ` · ${relatedPatent.year}`}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </Reveal>

      {/* How it works — only rendered when the existing description actually supports it */}
      {application.howItWorks && application.howItWorks.length > 0 && (
        <Reveal delay={0.2}>
          <div>
            <h2 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-50">How it works</h2>
            <div className="mt-4">
              <HowItWorks steps={application.howItWorks} accent={application.accent} />
            </div>
          </div>
        </Reveal>
      )}

      {/* Related research + IP */}
      {(relatedDomain || relatedPatent) && (
        <Reveal delay={0.25}>
          <div className="flex flex-col gap-6 sm:flex-row">
            {relatedDomain && (
              <div className="flex-1">
                <h2 className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-50">
                  Related Research
                </h2>
                <Link
                  to="/research"
                  className="group mt-3 flex items-center justify-between gap-3 rounded-lg border border-stone-200 bg-white px-4 py-3 transition-colors hover:border-teal-200 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-teal-900/60"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-400">
                      {relatedDomain.eyebrow}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-stone-800 dark:text-stone-200">
                      {relatedDomain.title}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-stone-400 transition-transform group-hover:translate-x-1 group-hover:text-teal-700 dark:group-hover:text-teal-400" />
                </Link>
              </div>
            )}

            {relatedPatent && (
              <div className="flex-1">
                <h2 className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-50">
                  Related Intellectual Property
                </h2>
                {relatedPatent.status === 'Granted' ? (
                  <Link
                    to="/research#patents"
                    className="group mt-3 flex items-center justify-between gap-3 rounded-lg border border-stone-200 bg-white px-4 py-3 transition-colors hover:border-teal-200 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-teal-900/60"
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-400">
                        {relatedPatent.status}
                        {relatedPatent.year && ` · ${relatedPatent.year}`}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-stone-800 dark:text-stone-200">
                        {relatedPatent.title}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-stone-400 transition-transform group-hover:translate-x-1 group-hover:text-teal-700 dark:group-hover:text-teal-400" />
                  </Link>
                ) : (
                  <div className="mt-3 rounded-lg border border-stone-200 bg-white px-4 py-3 dark:border-stone-800 dark:bg-stone-900">
                    <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 dark:text-stone-500">
                      {relatedPatent.status}
                      {relatedPatent.year && ` · ${relatedPatent.year}`}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-stone-800 dark:text-stone-200">
                      {relatedPatent.title}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </Reveal>
      )}

      {/* Navigation */}
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
