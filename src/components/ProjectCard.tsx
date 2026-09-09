import { ArrowRight } from 'lucide-react'

interface ProjectCardProps {
  tag: string
  title: string
  subtitle: string
  description?: string
  cta: string
  link?: string
  image: string
  accent: string
  tint: string
  darkTint: string
  compact?: boolean
}

function ProjectCard({
  title,
  subtitle,
  description,
  cta,
  link,
  image,
  compact = false,
}: ProjectCardProps) {
  const cardContent = (
    <>
      <div className="overflow-hidden bg-stone-50 dark:bg-stone-800">
        <img
          src={image}
          alt={title}
          className="w-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h4
          className={`font-serif font-semibold text-stone-900 dark:text-stone-50 ${compact ? 'text-lg' : 'text-xl'}`}
        >
          {title}
        </h4>
        <p className="mt-2 text-sm leading-[1.7] text-stone-600 dark:text-stone-400">{subtitle}</p>
        {!compact && description && (
          <p className="mt-2 flex-1 text-sm leading-[1.7] text-stone-500 dark:text-stone-500">
            {description}
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 dark:text-teal-400">
          {cta}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </>
  )

  const className =
    'group flex flex-col overflow-hidden rounded-[18px] border border-stone-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-stone-800 dark:bg-stone-900'

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className={className}>
        {cardContent}
      </a>
    )
  }

  return <article className={className}>{cardContent}</article>
}

export default ProjectCard