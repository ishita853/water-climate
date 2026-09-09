# Research Domain Cards — Image-Backed Grid Specification

## Card 1

**Eyebrow:** Hydrology
**Title:** Water Resources Modeling
**Subtitle (12w):** Physically based models translating river-basin hydrology into actionable water-security intelligence for India.
**Body (24w):** Two decades of peer-reviewed research on streamflow, water balance, and machine learning across Himalayan, peninsular, and eastern Indian basins — the foundation for every domain.
**Background image prompt:** Aerial cinematic shot of a braided Himalayan river basin at golden hour, topographic flow-lines glowing faintly, shot on satellite-grade optics.
**Overlay treatment:** Black 60% base + deep-blue directional glow, bottom-left
**Accent color:** `#0F766E`
**Lucide icon:** `Waves`
**Hover interaction:** Image scales to 1.06×; overlay lightens to 45%; teal underline draws in beneath title
**CTA label:** View Research →

---

## Card 2

**Eyebrow:** Cryosphere
**Title:** Himalayan Glacial Hazards
**Subtitle (12w):** Tracking glacial lake outburst floods and snowmelt risk across the Himalayan cryosphere.
**Body (24w):** Landmark GLOF hazard research and two DST-funded projects modeling glacier-melt runoff in Sikkim and Teesta, extended through CMIP5 and CMIP6 climate-extreme trend analysis studies.
**Background image prompt:** Cinematic aerial view of a turquoise glacial lake beneath jagged Himalayan peaks, fractured ice texture in foreground, dramatic altitude haze.
**Overlay treatment:** Black 55% + icy-cyan glow, top edge (glacier-light effect)
**Accent color:** `#38BDF8`
**Lucide icon:** `MountainSnow`
**Hover interaction:** Image scales to 1.06×; cyan vignette intensifies at edges; title shifts up 4px revealing CTA
**CTA label:** See the Risk →

---

## Card 3

**Eyebrow:** Resilience
**Title:** Drought & Ecosystem Resilience
**Subtitle (12w):** Quantifying drought severity and long-term ecosystem resilience to hydroclimatic extremes across India.
**Body (24w):** Copula-based drought characterization and vegetation drought-likelihood mapping, backed by two Scientific Reports studies on ecosystem resilience, translating statistical extremes into agricultural and ecological consequence.
**Background image prompt:** Aerial cinematic shot of cracked drought-stricken farmland transitioning into resilient green cropland, harsh directional sunlight, dust haze on horizon.
**Overlay treatment:** Black 55% + amber-to-transparent gradient, bottom-up (drought-heat effect)
**Accent color:** `#C2703D`
**Lucide icon:** `Sprout`
**Hover interaction:** Image scales to 1.06×; amber glow pulses once; CTA fades in from below
**CTA label:** Explore Resilience →

---

## Card 4

**Eyebrow:** Atmosphere
**Title:** Atmospheric Rivers Watch
**Subtitle (12w):** Characterizing atmospheric rivers and aerosol transport through next-generation AI-driven air-quality forecasting systems.
**Body (24w):** Two Springer volumes on aerosol atmospheric rivers, an operational forecasting system, and doctoral research on predictability and black-carbon aerosols — the laboratory's fastest-growing research frontier.
**Background image prompt:** Satellite-style cinematic visualization of an atmospheric river plume streaming moisture across the Indian subcontinent, false-color violet-blue data overlay, deep-space vantage.
**Overlay treatment:** Black 55% + violet atmospheric haze, diagonal sweep
**Accent color:** `#7C3AED`
**Lucide icon:** `Wind`
**Hover interaction:** Image scales to 1.06×; violet particle haze drifts subtly; CTA slides in from right
**CTA label:** Track the Data →

---

## Card 5

**Eyebrow:** Wetlands
**Title:** Wetland Water Quality
**Subtitle (12w):** Monitoring Ramsar wetland health and water quality using satellite remote sensing technology.
**Body (24w):** A dedicated volume on India's Ramsar wetlands, an operational analysis platform, and a granted patent for water-quality monitoring extend field-validated research to specific sites.
**Background image prompt:** Cinematic aerial shot of a lush Ramsar wetland at dawn mist, mirrored water channels, egrets in flight, satellite-grade clarity.
**Overlay treatment:** Black 55% + emerald glow, radial center-out
**Accent color:** `#059669`
**Lucide icon:** `Leaf`
**Hover interaction:** Image scales to 1.06×; emerald glow radiates from center; CTA fades up
**CTA label:** Explore Wetlands →

---

## Card 6

**Eyebrow:** AI Systems
**Title:** AI Water Intelligence
**Subtitle (12w):** Translating decades of hydro-climate research into deployable AI decision-support and smart-city systems.
**Body (24w):** A national flood-analysis tool, a regional water portal, and three 2024–2025 patent filings convert hydro-climate science into public infrastructure and deployable smart-city decision systems.
**Background image prompt:** Futuristic cinematic visualization of a glowing AI decision-dashboard overlaying a flood-risk map of an Indian city at night, indigo data nodes, satellite-city lights.
**Overlay treatment:** Black 60% + indigo digital-grid glow, fine grid lines, bottom edge
**Accent color:** `#4F46E5`
**Lucide icon:** `BrainCircuit`
**Hover interaction:** Image scales to 1.06×; indigo grid lines animate upward; CTA reveals with a slight glow pulse
**CTA label:** Launch the Tools →

---

## Visual Hierarchy

**Emphasize:** Water Resources Modeling, AI Water Intelligence, Himalayan Glacial Hazards

- **Water Resources Modeling** — deepest publication record and methodological foundation; the credibility anchor, belongs in the first grid position.
- **AI Water Intelligence** — most visually striking (night dashboard/city), signals translational, funder-facing impact — the card most likely to convert international collaborators.
- **Himalayan Glacial Hazards** — highest global news/urgency resonance (disaster risk); strongest emotional pull for a broad international audience.

Implementation: give these three first-position priority in DOM order (ensures mobile visibility above the fold), and apply a persistent low-opacity accent-color glow ring (`box-shadow`, 8px, 15% opacity) that the other three cards only receive on hover.

## Framer Settings

- **Border radius:** 20px
- **Overlay opacity:** 55–60% black at rest; 65–70% on hover (accent-color glow blends at 20–30% opacity beneath)
- **Typography sizes:** Eyebrow 12px uppercase, 0.08em letter-spacing · Title 28–32px serif bold · Subtitle 15px regular · Body 14px regular, 1.5 line-height
- **Card shadow:** `0 20px 40px rgba(0,0,0,0.25)` rest → `0 30px 60px rgba(0,0,0,0.35)` hover
- **Hover scale:** Background image 1.05–1.06× (card frame fixed, `overflow: hidden`); card lifts `translateY(-6px)`
- **Transition duration:** 450ms, `cubic-bezier(0.22, 1, 0.36, 1)`

## Image Generation Prompts

1. Ultra-realistic scientific visualization of a braided Himalayan river basin from directly above, golden-hour lighting, faint glowing topographic flow-line overlay, satellite-grade resolution, cinematic color grading, 4:5 portrait composition, no text, no people.

2. Ultra-realistic scientific visualization of a turquoise glacial lake at the base of jagged snow-capped Himalayan peaks, fractured glacial ice in the foreground, dramatic atmospheric haze, cinematic lighting, 4:5 portrait composition, no text, no people.

3. Ultra-realistic scientific visualization of cracked drought-stricken farmland transitioning into resilient green cropland under harsh directional sunlight, dust haze on the horizon, aerial cinematic perspective, 4:5 portrait composition, no text, no people.

4. Ultra-realistic scientific visualization of an atmospheric river moisture plume streaming across a subcontinent as seen from orbit, false-color violet-and-blue data overlay on a realistic cloud system, deep-space vantage point, cinematic, 4:5 portrait composition, no text, no people.

5. Ultra-realistic scientific visualization of a lush wetland at dawn with mirrored water channels, soft mist, wading birds in flight, satellite-grade clarity, cinematic natural lighting, 4:5 portrait composition, no text, no people.

6. Ultra-realistic scientific visualization of a glowing AI decision-support dashboard overlaying a flood-risk map of an Indian city skyline at night, indigo data nodes and fine grid lines, futuristic cinematic lighting, 4:5 portrait composition, no text, no people.
