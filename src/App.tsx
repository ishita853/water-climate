import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { CONTAINER } from './lib/layout'
import Home from './pages/Home'
import Distinctions from './pages/Distinctions'
import StudentSupervision from './pages/StudentSupervision'
import Publications from './pages/Publications'
import Events from './pages/Events'
import Research from './pages/Research'
import Teaching from './pages/Teaching'
import Applications from './pages/Applications'
import ApplicationDetail from './pages/ApplicationDetail'
import OtherActivities from './pages/OtherActivities'
import PositionsAvailable from './pages/PositionsAvailable'
import Contact from './pages/Contact'

function AnimatedRoutes() {
  const location = useLocation()
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: 'easeInOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/distinctions" element={<Distinctions />} />
          <Route path="/student-supervision" element={<StudentSupervision />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/events" element={<Events />} />
          <Route path="/research" element={<Research />} />
          <Route path="/teaching" element={<Teaching />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/applications/:slug" element={<ApplicationDetail />} />
          <Route path="/other-activities" element={<OtherActivities />} />
          <Route path="/positions-available" element={<PositionsAvailable />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50 dark:bg-stone-950">
      <Navbar />
      <main className={`${CONTAINER} flex-1 py-10 md:py-14`}>
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  )
}

export default App
