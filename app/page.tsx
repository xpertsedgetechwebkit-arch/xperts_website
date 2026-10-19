import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import AlumniWorksAt from '@/components/AlumniWorksAt'
import ClientsTicker from '@/components/ClientsTicker'
import WhyChooseUs from '@/components/WhyChooseUs'
import Reviews from '@/components/Reviews'
import Certifications from '@/components/Certifications'
import HashScroll from '@/components/HashScroll'

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HashScroll />
      <Hero />
      <About />
      <Services />
      <AlumniWorksAt />
      {/* <ClientsTicker /> */}
      <WhyChooseUs />
      <Reviews />
      <Certifications />
    </main>
  )
}
