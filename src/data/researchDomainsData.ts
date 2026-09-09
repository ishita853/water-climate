export interface Domain {
  eyebrow: string
  title: string
  description: string
  image: string
  accent: string
}

export const domains: Domain[] = [
  {
    eyebrow: 'Hydrology',
    title: 'Water Resources & Hydrological Modeling',
    description:
      'Physically based models translating river-basin hydrology into water-security intelligence. Two decades of peer-reviewed streamflow and water-balance research across Himalayan, peninsular, and eastern Indian basins, the foundation for every domain here.',
    image: '/assets/images/research1.png',
    accent: '#0F766E',
  },
  {
    eyebrow: 'Cryosphere',
    title: 'Himalayan Cryosphere & Glacial Hazards',
    description:
      'Tracking glacial lake outburst floods and snowmelt risk across the Himalayan cryosphere. Landmark GLOF hazard research and two DST-funded snowmelt projects in Sikkim and Teesta, extended through CMIP5/CMIP6 climate-extreme trend analysis.',
    image: '/assets/images/research2.png',
    accent: '#0369A1',
  },
  {
    eyebrow: 'AI Systems',
    title: 'AI-Driven Water Systems & Decision Intelligence',
    description:
      'Translating hydro-climate research into deployable AI decision-support systems. A national flood tool, a regional water portal, and three 2024–2025 patent filings convert science into public infrastructure.',
    image: '/assets/images/research3.png',
    accent: '#4338CA',
  },
  {
    eyebrow: 'Resilience',
    title: 'Climate Extremes, Drought & Ecosystem Resilience',
    description:
      'Quantifying drought severity and ecosystem resilience to hydroclimatic extremes. Copula-based drought characterization and two Scientific Reports studies on ecosystem resilience, translating statistical extremes into agricultural consequence.',
    image: '/assets/images/research4.png',
    accent: '#B45309',
  },
  {
    eyebrow: 'Atmosphere',
    title: 'Atmospheric Rivers, Aerosols & Air Quality',
    description:
      "Characterizing atmospheric rivers and aerosol transport through AI-driven forecasting. Two Springer volumes and an operational forecasting system, backed by doctoral research on predictability and black-carbon aerosols, the lab's fastest-growing frontier.",
    image: '/assets/images/research5.png',
    accent: '#6D28D9',
  },
  {
    eyebrow: 'Wetlands',
    title: 'Wetlands & Water Quality Remote Sensing',
    description:
      "Monitoring Ramsar wetland health and water quality via satellite remote sensing. A dedicated volume on India's Ramsar wetlands, an operational analysis platform, and a granted patent for water-quality monitoring.",
    image: '/assets/images/research6.png',
    accent: '#047857',
  },
]
