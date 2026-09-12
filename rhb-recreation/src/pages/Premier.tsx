import { useEffect } from 'react'
import { DayToDaySection } from '../components/Premier/DayToDaySection'
import { FamilyExtensionSection } from '../components/Premier/FamilyExtensionSection'
import { FinancialInsightsSection } from '../components/Premier/FinancialInsightsSection'
import { MultiCurrencyCardSection } from '../components/Premier/MultiCurrencyCardSection'
import { OverseasPropertySection } from '../components/Premier/OverseasPropertySection'
import { PremierCTA } from '../components/Premier/PremierCTA'
import { PremierFeatureGrid } from '../components/Premier/PremierFeatureGrid'
import { PremierFloat } from '../components/Premier/PremierFloat'
import { PremierHero } from '../components/Premier/PremierHero'
import { PrivilegeSection } from '../components/Premier/PrivilegeSection'
import { RegionalBankingSection } from '../components/Premier/RegionalBankingSection'
import { SustainabilitySection } from '../components/Premier/SustainabilitySection'
import { VisaInfiniteSection } from '../components/Premier/VisaInfiniteSection'
import { WealthManagementSection } from '../components/Premier/WealthManagementSection'

export function Premier() {
  useEffect(() => {
    document.title = 'Discover Premier Banking in Malaysia with RHB Premier Banking Services'
    const hash = window.location.hash.replace('#', '')
    if (!hash) return
    window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
  }, [])

  return (
    <main>
      <PremierFloat />
      <PremierHero />
      <PremierFeatureGrid />
      <WealthManagementSection />
      <FamilyExtensionSection />
      <FinancialInsightsSection />
      <PrivilegeSection />
      <MultiCurrencyCardSection />
      <VisaInfiniteSection />
      <OverseasPropertySection />
      <RegionalBankingSection />
      <SustainabilitySection />
      <DayToDaySection />
      <PremierCTA />
    </main>
  )
}
