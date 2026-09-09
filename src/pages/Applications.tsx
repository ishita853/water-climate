import { applications } from '../data/applicationsData'
import ApplicationsCarousel from '../components/ApplicationsCarousel'
import Reveal from '../components/Reveal'

function Applications() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-serif text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
          Applications
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-[1.7] text-stone-600 dark:text-stone-400">
          Two decades of hydro-climate research, deployed as public infrastructure: national-scale
          tools, operational dashboards, and patented platforms built on the lab's science.
        </p>
      </div>

      <Reveal>
        <ApplicationsCarousel apps={applications} />
      </Reveal>
    </div>
  )
}

export default Applications
