import { flagshipProjects, platformProjects } from './projectsData'
import { domains } from './researchDomainsData'
import patents from '../../data/patents.json'

export interface Application {
  slug: string
  title: string
  tagline: string
  /** Longer factual description — only flagship projects have one; platform projects rely on `tagline`. */
  description?: string
  status: string
  type: string
  cta: string
  link: string
  /** Illustration used on the index carousel and the Home page's Featured Projects. */
  image: string
  /** A more literal artifact (e.g. a screenshot of the live tool) shown large on the detail page. */
  detailImage: string
  accent: string
  tint: string
  darkTint: string
  /** Stages paraphrased directly from the project's own description/tagline — no invented architecture. */
  howItWorks?: string[]
  /** Eyebrow of the research domain this project is explicitly tied to in existing site copy. */
  relatedResearchEyebrow?: string
  /** id of the patent this project is explicitly tied to in existing site copy. */
  relatedPatentId?: string
}

interface ApplicationMeta {
  slug: string
  type: string
  detailImage: string
  howItWorks?: string[]
  relatedResearchEyebrow?: string
  relatedPatentId?: string
}

// Keyed by the project's existing title. Each field here is derived from wording already
// present in projectsData.ts / researchDomainsData.ts / patents.json — nothing invented.
const metaByTitle: Record<string, ApplicationMeta> = {
  'Smart India Flood Analysis Tool': {
    slug: 'smart-india-flood-analysis',
    type: 'Tool',
    detailImage: '/assets/images/flood-c.png',
    howItWorks: ['Satellite Data', 'AI-Based Analysis', 'Flood Extent Assessment', 'Disaster Response Teams'],
    relatedResearchEyebrow: 'AI Systems',
    relatedPatentId: 'patent-2025-flood-risk-assessment',
  },
  'Central India Water Portal': {
    slug: 'central-india-water-portal',
    type: 'Portal',
    detailImage: '/assets/images/wp.png',
    howItWorks: ['Regional Water-Resource Data', 'Consolidated Access Point', 'Unified Reference', 'Planning & Policy Decisions'],
    relatedResearchEyebrow: 'AI Systems',
  },
  'Wetlands Analysis Platform': {
    slug: 'wetlands-analysis-platform',
    type: 'Platform',
    detailImage: '/assets/images/wetlnds-c.png',
    howItWorks: ['Satellite Remote Sensing', 'Wetland Mapping', 'Ecological Condition Assessment', 'Ramsar Research & Policy Support'],
    relatedResearchEyebrow: 'Wetlands',
    relatedPatentId: 'patent-576312-wetland-water-quality',
  },
  'Central India Water Body Analysis': {
    slug: 'central-india-water-body-analysis',
    type: 'Dashboard',
    detailImage: '/assets/images/wb.png',
    howItWorks: ['Continuous Monitoring', 'Water Body Extent & Change Detection', 'Dashboard', 'Drought-Response Planning'],
  },
  'Air Quality Prediction System': {
    slug: 'air-quality-prediction',
    type: 'System',
    detailImage: '/assets/images/air-q.png',
    howItWorks: ['Aerosol & Pollution Research', 'AI Forecasting Model', 'Daily Predictions', 'Public Access'],
    relatedResearchEyebrow: 'Atmosphere',
  },
}

function buildApplication(project: (typeof flagshipProjects)[number] | (typeof platformProjects)[number]): Application {
  const meta = metaByTitle[project.title]
  if (!meta) {
    throw new Error(`No application metadata registered for "${project.title}"`)
  }
  return {
    slug: meta.slug,
    title: project.title,
    tagline: project.subtitle,
    description: 'description' in project ? project.description : undefined,
    status: project.tag,
    type: meta.type,
    cta: project.cta,
    link: project.link,
    image: project.image,
    detailImage: meta.detailImage,
    accent: project.accent,
    tint: project.tint,
    darkTint: project.darkTint,
    howItWorks: meta.howItWorks,
    relatedResearchEyebrow: meta.relatedResearchEyebrow,
    relatedPatentId: meta.relatedPatentId,
  }
}

export const applications: Application[] = [...flagshipProjects, ...platformProjects].map(buildApplication)

export function getApplicationBySlug(slug: string | undefined) {
  return applications.find((app) => app.slug === slug)
}

export function getAdjacentApplications(slug: string) {
  const index = applications.findIndex((app) => app.slug === slug)
  if (index === -1) return { previous: undefined, next: undefined }
  const total = applications.length
  return {
    previous: applications[(index - 1 + total) % total],
    next: applications[(index + 1) % total],
  }
}

export function getRelatedResearchDomain(eyebrow: string | undefined) {
  if (!eyebrow) return undefined
  return domains.find((domain) => domain.eyebrow === eyebrow)
}

export function getRelatedPatent(patentId: string | undefined) {
  if (!patentId) return undefined
  return patents.find((patent) => patent.id === patentId)
}
