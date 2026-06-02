import Hero from '../components/sections/Hero'
import Services from '../components/sections/Services'
import BeforeAfter from '../components/sections/BeforeAfter'
import Artists from '../components/sections/Artists'
import Experience from '../components/sections/Experience'
import Testimonials from '../components/sections/Testimonials'
import BookingSection from '../components/sections/BookingSection'
import GoldDivider from '../components/ui/GoldDivider'

export default function Home() {
  return (
    <main>
      <Hero />
      <GoldDivider />
      <Services />
      <GoldDivider />
      <BeforeAfter />
      <GoldDivider />
      <Artists />
      <GoldDivider />
      <Experience />
      <GoldDivider />
      <Testimonials />
      <GoldDivider />
      <BookingSection />
    </main>
  )
}
