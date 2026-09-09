import { Mail, MapPin, Phone } from 'lucide-react'
import profile from '../../data/profile.json'
import { socialLinksMeta } from '../data/socialLinksMeta'
import Reveal from '../components/Reveal'
import { cardHover } from '../data/cardPalette'

const CARD = `rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900 sm:p-8`

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Mail
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400" strokeWidth={1.75} />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 dark:text-stone-500">{label}</p>
        <div className="mt-0.5 text-sm text-stone-700 dark:text-stone-300">{children}</div>
      </div>
    </div>
  )
}

function Contact() {
  const lab = profile.lab

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
          Get in Touch
        </p>
        <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
          Contact
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-[1.7] text-stone-600 dark:text-stone-400">
          For research collaborations, project discussions, platform support, or general
          inquiries, reach out directly below.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Reveal>
          <div className={`flex h-full flex-col gap-6 ${CARD} ${cardHover}`}>
            <div className="flex items-center gap-4">
              <img
                src={profile.photo}
                alt={profile.name}
                className="h-16 w-16 shrink-0 rounded-full border border-stone-200 object-cover object-top dark:border-stone-700"
              />
              <div>
                <p className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-50">{profile.name}</p>
                <p className="text-sm text-stone-500 dark:text-stone-500">{profile.title}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-stone-200 pt-5 dark:border-stone-800">
              <ContactRow icon={Mail} label="Email">
                <a href={`mailto:${profile.email}`} className="hover:text-teal-700 dark:hover:text-teal-400">
                  {profile.email}
                </a>
              </ContactRow>
              <ContactRow icon={Phone} label="Phone">
                <a
                  href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                  className="hover:text-teal-700 dark:hover:text-teal-400"
                >
                  {profile.phone}
                </a>
              </ContactRow>
              <ContactRow icon={MapPin} label="Office">
                {profile.office}
              </ContactRow>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className={`flex h-full flex-col gap-6 ${CARD} ${cardHover}`}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 dark:text-stone-500">Lab</p>
              <p className="mt-1 font-serif text-lg font-semibold text-stone-900 dark:text-stone-50">{lab.name}</p>
              <a
                href={lab.website}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-block text-sm text-teal-700 hover:underline dark:text-teal-400"
              >
                {lab.website.replace(/^https?:\/\//, '').replace(/\/$/, '')} &rarr;
              </a>
            </div>

            <div className="flex flex-col gap-4 border-t border-stone-200 pt-5 dark:border-stone-800">
              <ContactRow icon={Mail} label="Lab Email">
                <a href={`mailto:${lab.email}`} className="hover:text-teal-700 dark:hover:text-teal-400">
                  {lab.email}
                </a>
              </ContactRow>
              <ContactRow icon={Phone} label="Lab Phone">
                <a href={`tel:${lab.phone.replace(/\s+/g, '')}`} className="hover:text-teal-700 dark:hover:text-teal-400">
                  {lab.phone}
                </a>
              </ContactRow>
            </div>

            <div className="mt-auto flex flex-wrap gap-3 border-t border-stone-200 pt-5 dark:border-stone-800">
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
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <section className="rounded-r-lg border-l-4 border-teal-600 bg-teal-50 p-5 dark:border-teal-500 dark:bg-teal-950/30 sm:p-6">
          <p className="font-serif text-base font-semibold text-teal-900 dark:text-teal-200">
            Interested in collaborating?
          </p>
          <p className="mt-1 text-sm text-teal-800 dark:text-teal-300">
            Send a note with a short summary of your interest and we&rsquo;ll get back to you.
          </p>
          <a
            href={`mailto:${lab.email}?subject=${encodeURIComponent('Research collaboration inquiry')}`}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 underline hover:text-teal-900 dark:text-teal-400 dark:hover:text-teal-300"
          >
            <Mail className="h-3.5 w-3.5" />
            Compose a message
          </a>
        </section>
      </Reveal>
    </div>
  )
}

export default Contact
