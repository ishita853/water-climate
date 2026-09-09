import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { flagshipProjects, platformProjects } from '../data/projectsData'
import ProjectCard from './ProjectCard'

// Both real, already-authored arrays — platformProjects previously had no page of its own to
// appear on; surfacing it here (alongside flagshipProjects) keeps it visible on the site now
// that Applications points at a different, newer set of deployed tools.
const projects = [...flagshipProjects, ...platformProjects]

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
          to="/research"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
        >
          All research
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  )
}

export default FeaturedProjects
