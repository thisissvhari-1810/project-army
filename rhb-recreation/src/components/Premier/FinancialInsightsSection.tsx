import { insights } from '../../data/premier'
import { ScrollReveal } from '../common/ScrollReveal'

export function FinancialInsightsSection() {
  return (
    <section id="insights" className="bg-[#002353] text-white">
      <div className="secondary-slider--text">
        <ScrollReveal>
          <h2 className="font-light text-white mx-auto" style={{ fontSize: 29, maxWidth: 850, margin: 'auto' }}>
            Convenient access to wealth insights on MERGE by RHB
          </h2>
        </ScrollReveal>
      </div>
      <div className="container-tw pb-5">
        <div className="flex flex-wrap -mx-[15px] mb-5">
          {insights.map((item) => (
            <div key={item.id} className="w-full lg:w-1/5 px-[15px] mb-[30px]">
              <div className="ttl-ar-1">
                {item.title}
                {item.titleLine2 ? (
                  <>
                    <br className="hidden lg:block" /> {item.titleLine2}
                  </>
                ) : null}
              </div>
              <a href={item.href} rel="noopener noreferrer">
                <img src={item.image} alt={item.title} className="block w-full h-auto" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
