export interface Application {
  slug: string
  title: string
  url: string
  /** Literal subject noun already present in the app's own title — not an invented category. */
  domainTag: string
  accent: string
  icon: string
  /** Only present where an official one-line description exists (sourced from the lab's own
   * water.iiti.ac.in "Applications Hosted" copy) — left undefined rather than invented where
   * no official description exists yet (Air Quality Monitoring Portal, DRMP). */
  description?: string
  /** Verified against live response headers (no X-Frame-Options/CSP frame-ancestors block) —
   * still worth re-checking if a target app's hosting changes. */
  embeddable: boolean
  status: 'live' | 'unavailable'
}

// Real, currently-deployed research applications from the Water, Climate and Sustainability
// Lab, IIT Indore ecosystem (water.iiti.ac.in). Replaces the previous 5 applications derived
// from projectsData.ts — those flagship/platform projects now surface under Projects on the
// homepage instead (see FeaturedProjects), so nothing is deleted, just recategorized.
export const applications: Application[] = [
  {
    slug: 'air-quality-monitoring-portal',
    title: 'Air Quality Monitoring Portal',
    url: 'https://erc.mp.gov.in/aero/',
    domainTag: 'Air Quality',
    accent: '#7c3aed',
    icon: '/assets/images/app-air-quality-portal-icon.png',
    embeddable: true,
    status: 'live',
  },
  {
    slug: 'district-river-management-plan',
    title: 'District River Management Plan (DRMP)',
    url: 'https://district-river-management-plan.netlify.app/',
    domainTag: 'River Management',
    accent: '#1e40af',
    icon: '/assets/images/app-drmp-icon.png',
    embeddable: true,
    status: 'live',
  },
  {
    slug: 'heatwave-portal',
    title: 'Heatwave Portal',
    url: 'https://heat-wave.netlify.app/',
    domainTag: 'Heatwave & Climate',
    accent: '#dc2626',
    icon: '/assets/images/app-heatwave-portal-icon.png',
    description: 'Climate intelligence and heat risk analytics platform.',
    embeddable: true,
    status: 'live',
  },
  {
    slug: 'central-india-water-portal',
    title: 'Central India Water Portal',
    url: 'https://water-portal.netlify.app/',
    domainTag: 'Water Resources',
    accent: '#0891b2',
    icon: '/assets/images/app-water-portal-icon.jpeg',
    description: 'Water resource monitoring and visualization system.',
    embeddable: true,
    status: 'live',
  },
  {
    slug: 'indian-key-biodiversity-areas-portal',
    title: 'Indian Key Biodiversity Areas Portal',
    url: 'https://kba-iiti-cb1w.vercel.app/',
    domainTag: 'Biodiversity',
    accent: '#16a34a',
    icon: '/assets/images/app-kba-portal-icon.jpeg',
    description: 'Biodiversity and ecological assessment tools.',
    embeddable: true,
    status: 'live',
  },
  {
    slug: 'indian-water-audit-portal',
    title: 'Indian Water Audit Portal',
    url: 'https://water-audit-azure.vercel.app',
    domainTag: 'Water Audit',
    accent: '#2563eb',
    icon: '/assets/images/app-water-audit-portal-icon.jpeg',
    description: 'Audit and sustainability reporting framework.',
    embeddable: true,
    status: 'live',
  },
]

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
