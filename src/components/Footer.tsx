import { Mail } from 'lucide-react'
import profile from '../../data/profile.json'
import { socialLinksMeta } from '../data/socialLinksMeta'
import { CONTAINER } from '../lib/layout'

function Footer() {
  const year = new Date().getFullYear()
  const socialLinks = Object.entries(profile.socialLinks)

  return (
    <footer className="border-t border-stone-200 bg-stone-100 dark:border-stone-800 dark:bg-stone-900">
      <div className="h-0.5 bg-teal-600 dark:bg-teal-500" />
      <div className={`${CONTAINER} grid grid-cols-1 gap-8 py-10 text-sm sm:grid-cols-3`}>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-500">
            About
          </h2>
          <p className="mt-3 font-medium text-stone-800 dark:text-stone-200">{profile.name}</p>
          <p className="text-stone-600 dark:text-stone-400">{profile.title}</p>
          <p className="text-stone-600 dark:text-stone-400">{profile.department}</p>
          <p className="text-stone-600 dark:text-stone-400">{profile.school}</p>
          <p className="text-stone-600 dark:text-stone-400">{profile.institution}</p>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-500">
            Contact
          </h2>
          <p className="mt-3">
            <a
              href={`mailto:${profile.email}`}
              className="text-stone-600 hover:text-teal-700 dark:text-stone-400 dark:hover:text-teal-400"
            >
              {profile.email}
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-500">
            Connect
          </h2>
          <div className="mt-3 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              aria-label="Gmail"
              title="Gmail"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform hover:scale-105"
              style={{ backgroundColor: '#EA4335' }}
            >
              <Mail className="h-4 w-4 text-white" strokeWidth={2} />
            </a>
            {socialLinks.map(([platform, url]) => {
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
                  className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full transition-transform hover:scale-105"
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

      <div className="border-t border-stone-200 py-4 text-center text-xs text-stone-500 dark:border-stone-800 dark:text-stone-500">
        &copy; {year} {profile.name}
      </div>
    </footer>
  )
}

export default Footer
