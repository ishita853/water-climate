import { motion } from 'framer-motion'
import profile from '../../data/profile.json'
import ProfileCard from './ProfileCard'

function Hero() {
  return (
    <section className="relative isolate grid grid-cols-1 items-center gap-10 pt-4 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="font-serif text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-6xl">
          {profile.name}
        </h1>
        <p className="mt-3 text-xl text-stone-700 dark:text-stone-300">{profile.title}</p>
        {profile.secondaryTitles.map((line) => (
          <p key={line} className="mt-1 text-stone-500 dark:text-stone-500">
            {line}
          </p>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <ProfileCard />
      </motion.div>
    </section>
  )
}

export default Hero
