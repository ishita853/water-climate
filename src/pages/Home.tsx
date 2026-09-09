import Hero from '../components/Hero'
import AboutSection from '../components/AboutSection'
import ApplicationsPreview from '../components/ApplicationsPreview'
import HighlightsStrip from '../components/HighlightsStrip'
import FeaturedProjects from '../components/FeaturedProjects'
import RecentUpdates from '../components/RecentUpdates'
import StudentsCollaborations from '../components/StudentsCollaborations'
import LeadershipRoles from '../components/LeadershipRoles'
import ContactCta from '../components/ContactCta'
import Reveal from '../components/Reveal'

function Home() {
  return (
    <div className="flex flex-col gap-16 pb-8">
      <Hero />
      <Reveal>
        <AboutSection />
      </Reveal>
      <ApplicationsPreview />
      <HighlightsStrip />
      <Reveal>
        <FeaturedProjects />
      </Reveal>
      <RecentUpdates />
      <StudentsCollaborations />
      <LeadershipRoles />
      <ContactCta />
    </div>
  )
}

export default Home
