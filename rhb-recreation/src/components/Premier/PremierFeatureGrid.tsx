import { premierFeatures } from '../../data/premier'
import { FeatureCard } from '../Cards/FeatureCard'
import { ScrollReveal } from '../common/ScrollReveal'

export function PremierFeatureGrid() {
  return (
    <section id="intro" className="bg-[#002353] text-white pt-[50px] pb-[50px]">
      <div className="container-tw text-center">
        <ScrollReveal>
          <div className="max-w-[600px] mx-auto">
            <h1 className="premier-section-title text-white">Premier Banking</h1>
            <p className="premier-section-desc text-white">
              RHB Premier is exclusively designed to provide you and your family the best financial solutions, complete
              with innovative banking services and exclusive privileges.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-[50px]">
          {premierFeatures.map((item, index) => (
            <ScrollReveal key={item.id} delay={(Math.min(index + 1, 4) as 1 | 2 | 3 | 4)}>
              <FeatureCard item={item} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
