import { ArrowRight, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import profile from '../../data/profile.json'
import Reveal from './Reveal'

function ContactCta() {
  return (
    <Reveal>
      <section className="flex flex-col items-center gap-4 border-t border-b border-stone-200 bg-stone-100/60 px-6 py-14 text-center dark:border-stone-800 dark:bg-stone-900/40 sm:px-10 sm:py-20">
        <Mail className="h-6 w-6 text-teal-600 dark:text-teal-400" strokeWidth={1.5} />
        <h2 className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50 sm:text-3xl">
          Interested in collaborating?
        </h2>
        <p className="max-w-md text-base leading-relaxed text-stone-700 dark:text-stone-200">
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
