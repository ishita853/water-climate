import distinctions from '../../data/distinctions.json'
import DistinctionsList from '../components/DistinctionsList'
import Reveal from '../components/Reveal'

function Distinctions() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
          Recognition
        </p>
        <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
          Distinctions
        </h1>
      </div>
      <Reveal>
        <DistinctionsList items={distinctions} />
      </Reveal>
    </div>
  )
}

export default Distinctions
