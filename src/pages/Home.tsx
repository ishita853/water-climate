import Hero from '../components/Hero'
import RecentUpdates from '../components/RecentUpdates'
import HighlightsStrip from '../components/HighlightsStrip'
import LeadershipRoles from '../components/LeadershipRoles'
import StudentsCollaborations from '../components/StudentsCollaborations'

function Home() {
  return (
    <div className="flex flex-col gap-16 pb-8">
      <Hero />
      <RecentUpdates />
      <HighlightsStrip />
      <LeadershipRoles />
      <StudentsCollaborations />
    </div>
  )
}

export default Home
