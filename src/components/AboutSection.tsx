import { Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import profile from '../../data/profile.json'
import { socialLinksMeta } from '../data/socialLinksMeta'

function AboutSection() {
  return (
    <section className="grid max-w-[1320px] grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_540px] lg:gap-14">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
          Our Research
        </p>
        <h2 className="mt-4 max-w-3xl font-serif text-[2rem] font-semibold leading-[1.15] tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
          Research at the intersection of water resources, climate change, and artificial
          intelligence.
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-[1.75] text-stone-700 dark:text-stone-200">
          The Water and Climate Lab at IIT Indore is led by Prof. Manish Kumar Goyal, recognized
          among the top 2 percent of scientists globally by Stanford University and Elsevier for
          2020 through 2025. The lab integrates climate science, remote sensing, big data
          analytics, and artificial intelligence to solve challenges related to water scarcity,
          drought and flood modeling, ecosystem resilience, and smart city solutions. Research
          projects emphasize innovative approaches for modeling and managing water systems in the
          face of changing climatic conditions and foster interdisciplinary collaborations with
          academic, industry, and government partners.
        </p>
      </div>

      <div className="flex items-start gap-5">
        <div className="aspect-[3/4] w-[220px] shrink-0 overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-sm dark:border-stone-800 dark:bg-stone-800">
          <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover object-top" />
        </div>

        <div>
          <p className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-50 lg:whitespace-nowrap">{profile.name}</p>
          <p className="mt-1 text-sm text-stone-700 dark:text-stone-200 lg:whitespace-nowrap">{profile.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-stone-700 dark:text-stone-200 lg:whitespace-nowrap">{profile.department}</p>
          <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-200 lg:whitespace-nowrap">{profile.institution}</p>

          <Link
            to="/distinctions"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
          >
            About &rarr;
          </Link>

          <div className="mt-3 flex flex-wrap items-center gap-2">
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
    </section>
  )
}

export default AboutSection
