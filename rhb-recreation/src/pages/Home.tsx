import { useEffect } from 'react'
import { AboutSection } from '../components/Sections/AboutSection'
import { IslamicServicesSection } from '../components/Sections/IslamicServicesSection'
import { MobileBankingSection } from '../components/Sections/MobileBankingSection'
import { PromotionSection } from '../components/Sections/PromotionSection'
import { HeroSection } from '../components/Hero/HeroSection'

export function Home() {
  useEffect(() => {
    document.title = 'Islamic Banking Malaysia, Islamic Banking Online | RHB Malaysia'
  }, [])

  return (
    <main>
      <HeroSection />
      <IslamicServicesSection />
      <PromotionSection />
      <MobileBankingSection />
      <AboutSection />
    </main>
  )
}
