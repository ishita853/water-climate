import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { flagshipProjects } from '../data/projectsData'
import ProjectCard from './ProjectCard'

function FeaturedProjects() {
  return (
    <section>
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
            From Research to Infrastructure
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            Featured Projects
          </h2>
        </div>
        <Link
          to="/applications"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
        >
          All projects &amp; applications
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {flagshipProjects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  )
}

export default FeaturedProjects
