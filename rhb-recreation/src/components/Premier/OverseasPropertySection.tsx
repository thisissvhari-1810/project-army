import { propertyPoints, premierImages } from '../../data/premier'
import { ActionButton } from '../common/ActionButton'
import { campaignPopup } from '../../data/popups'

export function OverseasPropertySection() {
  return (
    <section className="bg-[#002353] pb-12">
      <div className="container-tw grid lg:grid-cols-2 overflow-hidden">
        <img
          src={premierImages.overseas}
          alt="RHB Overseas Property Loan"
          className="w-full h-full min-h-[300px] object-cover"
        />
        <div className="bg-primary text-white p-8 md:p-10">
          <h4 className="text-2xl font-light mb-4">RHB Overseas Property Loan</h4>
          <p className="text-sm leading-relaxed mb-6">
            Get a home in the UK or Australia with RHB Overseas Property Loan. Lock in a favourable exchange rate
            through early release — whether it&apos;s for your child&apos;s education or your overseas investment.
          </p>
          <ul className="space-y-3 text-sm">
            {propertyPoints.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
          <p className="text-xs mt-4">*Mortgage Reducing Term Assurance/Credit Level Term Assurance</p>
          <ActionButton
            popup={campaignPopup}
            className="inline-block mt-6 bg-[#002353] px-6 py-2 font-bold rounded"
          >
            Find Out More
          </ActionButton>
        </div>
      </div>
    </section>
  )
}
