import About from '@/components/LandingPage/About'
import Contact from '@/components/LandingPage/Contact'
import Header from '@/components/LandingPage/Header'
import OurExperts from '@/components/LandingPage/OurExperts'
import Services from '@/components/LandingPage/Services'
import Stories from '@/components/LandingPage/Stories'
import { useTranslations } from 'next-intl'

export default function Home() {
  return (
    <main className="horizontal-spacing">
      <Header />
      <About />
      <Services />
      <OurExperts />
      <Stories />
      <Contact />
    </main>
  )
}
