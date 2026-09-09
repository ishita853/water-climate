import profile from '../../data/profile.json'

function AboutSection() {
  return (
    <section className="max-w-3xl">
      <h2 className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50">About</h2>
      <p className="mt-4 text-base leading-[1.7] text-stone-700 dark:text-stone-300">{profile.bio}</p>

      {profile.highlight && (
        <div className="mt-6 rounded-r-lg border-l-4 border-teal-600 bg-teal-50 p-4 dark:border-teal-500 dark:bg-teal-950/50">
          <h3 className="font-semibold text-teal-900 dark:text-teal-200">{profile.highlight.title}</h3>
          <p className="mt-1 text-sm text-teal-800 dark:text-teal-300">{profile.highlight.description}</p>
        </div>
      )}
    </section>
  )
}

export default AboutSection
