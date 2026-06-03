import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Cursor from './components/ui/Cursor'
import AudioPlayer from './components/ui/AudioPlayer'
import Home from './pages/Home'
import Booking from './pages/Booking'
import Services from './pages/Services'
import Artists from './pages/Artists'
import Gallery from './pages/Gallery'
import Rituals from './pages/Rituals'
import Testimonials from './pages/Testimonials'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    if ((window as any).lenis) {
      ;(window as any).lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Cursor />
      <AudioPlayer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/rituals" element={<Rituals />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
      <Footer />
    </Router>
  )
}

