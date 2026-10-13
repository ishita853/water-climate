export interface FlagshipProject {
  tag: string
  title: string
  subtitle: string
  description: string
  cta: string
  link: string
  image: string
  accent: string
  tint: string
  darkTint: string
}

export interface PlatformProject {
  tag: string
  title: string
  subtitle: string
  description?: string
  cta: string
  link: string
  image: string
  accent: string
  tint: string
  darkTint: string
}

export const flagshipProjects: FlagshipProject[] = [
  {
    tag: 'National Deployment · Patent-Backed',
    title: 'Smart India Flood Analysis Tool',
    subtitle:
      'AI-powered flood analysis platform delivering rapid, remote-sensing-based insight for national disaster response teams.',
    description:
      'Analyzes flood events across Indian regions using satellite data and AI, enabling rapid extent assessment for disaster response. Its methodology underpins the 2025-filed Flood Risk Assessment System patent.',
    cta: 'View the Tool',
    link: 'https://ee-smartcities56.projects.earthengine.app/view/smart-city-flood-analysis-tool',
    image: '/assets/images/flood.png',
    accent: '#4338CA',
    tint: '#EEF2FF',
    darkTint: '#1E1B4B',
  },
  {
    tag: 'Regional Infrastructure',
    title: 'Central India Water Portal',
    subtitle:
      'Centralized regional water-data portal serving researchers, planners, and policymakers across Central India.',
    description:
      'Consolidates water-resource data for Central India into a single access point, reducing duplication across studies and giving planners a unified, authoritative reference for regional water-security decisions.',
    cta: 'View the Portal',
    link: 'https://ciwp.netlify.app/',
    image: '/assets/images/water_portal.png',
    accent: '#0F766E',
    tint: '#F0FDFA',
    darkTint: '#0F2E2B',
  },
  {
    tag: 'Granted Patent · First Deployed IP',
    title: 'Wetlands Analysis Platform',
    subtitle:
      'Satellite-driven wetland mapping platform assessing ecosystem extent and condition across India.',
    description:
      "Maps and assesses wetland extent and ecological condition, directly supporting the Ramsar wetlands research program and the lab's granted water-quality monitoring patent, its first deployed intellectual property.",
    cta: 'View the Platform',
    link: 'https://ee-ramsarwetlands5.projects.earthengine.app/view/ramsarwetlands',
    image: '/assets/images/wetlands.png',
    accent: '#047857',
    tint: '#ECFDF5',
    darkTint: '#052E22',
  },
]

export const platformProjects: PlatformProject[] = [
  {
    tag: 'Continuous Monitoring',
    title: 'Central India Water Body Analysis',
    subtitle:
      'Continuous dashboard tracking surface water body extent and change across Central India, feeding drought-response planning.',
    cta: 'View Dashboard',
    link: 'https://shaped-faculty-465005-t6.projects.earthengine.app/view/central-india-water-bodies-analysis',
    image: '/assets/images/water_body.png',
    accent: '#0369A1',
    tint: '#F0F9FF',
    darkTint: '#0C2B3D',
  },
  {
    tag: 'Daily Forecasting',
    title: 'Air Quality Prediction System',
    subtitle:
      "AI-based forecasting system translating the lab's aerosol and pollution research into daily public predictions.",
    cta: 'View Forecasts',
    link: 'https://airqualitycities.iiti.ac.in/',
    image: '/assets/images/air.png',
    accent: '#6D28D9',
    tint: '#F5F3FF',
    darkTint: '#2E1065',
  },
]
