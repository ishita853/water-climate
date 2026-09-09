import Hero from '../components/Hero'
import AboutSection from '../components/AboutSection'
import ResearchDomainsPreview from '../components/ResearchDomainsPreview'
import ApplicationsPreview from '../components/ApplicationsPreview'
import HighlightsStrip from '../components/HighlightsStrip'
import FeaturedProjects from '../components/FeaturedProjects'
import EventsPreview from '../components/EventsPreview'
import RecentUpdates from '../components/RecentUpdates'
import StudentsCollaborations from '../components/StudentsCollaborations'
import LeadershipRoles from '../components/LeadershipRoles'
import PublicationsPreview from '../components/PublicationsPreview'
import ContactCta from '../components/ContactCta'
import Reveal from '../components/Reveal'

function Home() {
  return (
    <div className="flex flex-col gap-16 pb-8">
      <Hero />
      <Reveal>
        <AboutSection />
      </Reveal>
      <ResearchDomainsPreview />
      <ApplicationsPreview />
      <HighlightsStrip />
      <Reveal>
        <FeaturedProjects />
      </Reveal>
      <EventsPreview />
      <RecentUpdates />
      <StudentsCollaborations />
      <LeadershipRoles />
      <Reveal>
        <PublicationsPreview />
      </Reveal>
      <ContactCta />
    </div>
  )
}

export default Home
