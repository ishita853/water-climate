import { Mail } from 'lucide-react'
import profile from '../../data/profile.json'
import { socialLinksMeta } from '../data/socialLinksMeta'

function ProfileCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-stone-800 dark:bg-stone-900">
      <div className="h-1.5 bg-gradient-to-r from-teal-600 to-teal-400 dark:from-teal-500 dark:to-teal-300" />
      <div className="flex flex-col items-center p-6 text-center">
        <img
          src={profile.photo}
          alt={profile.name}
          className="h-28 w-28 rounded-full border border-stone-200 object-cover object-top dark:border-stone-700"
        />
        <p className="mt-4 font-serif text-lg font-semibold text-stone-900 dark:text-stone-50">{profile.name}</p>
        <p className="text-sm text-stone-700 dark:text-stone-200">{profile.title}</p>
        <p className="text-sm text-stone-700 dark:text-stone-200">{profile.institution}</p>

        <div className="mt-4 flex gap-4 border-t border-stone-200 pt-4 dark:border-stone-800">
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

        <p className="mt-4 w-full border-t border-stone-200 pt-4 text-left text-xs font-semibold uppercase tracking-wide text-stone-700 dark:border-stone-800 dark:text-stone-200">
          Key Fellowships
        </p>
        <ul className="mt-2 flex flex-wrap justify-center gap-1.5">
          {profile.credentials.map((credential) => (
            <li
              key={credential}
              className="rounded bg-stone-100 px-2 py-0.5 text-xs text-stone-700 dark:bg-stone-800 dark:text-stone-200"
            >
              {credential}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ProfileCard
