import { ArrowRight, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import profile from '../../data/profile.json'
import Reveal from './Reveal'

function ContactCta() {
  return (
    <Reveal>
      <section className="flex flex-col items-center gap-4 rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 to-white px-6 py-12 text-center dark:border-teal-900/40 dark:from-teal-950/20 dark:to-stone-900 sm:px-10 sm:py-16">
        <Mail className="h-6 w-6 text-teal-600 dark:text-teal-400" strokeWidth={1.5} />
        <h2 className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50 sm:text-3xl">
          Interested in collaborating?
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          For research collaborations, project discussions, or general inquiries, reach out to{' '}
          {profile.name} or the {profile.lab.name}.
        </p>
        <Link
          to="/contact"
          className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 dark:bg-teal-500"
        >
          Get in Touch
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </section>
    </Reveal>
  )
}

export default ContactCta
