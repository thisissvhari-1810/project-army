import { ActionButton } from '../common/ActionButton'
import { multiCurrencyPoints, premierImages } from '../../data/premier'

export function MultiCurrencyCardSection() {
  return (
    <section className="bg-[#002353] py-12">
      <div className="container-tw grid lg:grid-cols-2 gap-0 overflow-hidden">
        <img
          src={premierImages.mcvCard}
          alt="RHB Premier Multi Currency Visa Debit Card"
          className="w-full h-full min-h-[320px] object-contain bg-[#002353] p-6"
        />
        <div className="bg-primary text-white p-8 md:p-10">
          <h4 className="text-2xl font-light text-center mb-4">RHB Premier Multi Currency Visa Debit Card/-i</h4>
          <p className="text-center text-sm mb-6 leading-relaxed">
            The RHB Premier Multi Currency Visa Debit Card/-i opens a door to a wealth of travel privileges for you. On
            top of that, it also allows you to convert and store up to 33 foreign currencies, so that you can truly
            explore a world without boundaries.
          </p>
          <div className="space-y-5 border-t border-white/30 pt-5">
            {multiCurrencyPoints.map((point) => (
              <div key={point.title} className="flex gap-4">
                <img src={point.icon} alt="" className="w-10 h-10 shrink-0 object-contain" />
                <div>
                  <h5 className="font-bold mb-1">{point.title}</h5>
                  <p className="text-sm text-white/90">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs mt-5">*Only for conventional accounts</p>
          <div className="text-center mt-6">
            <ActionButton popup="mcv" className="inline-block bg-[#002353] px-6 py-2 font-bold rounded">
              Find Out More
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  )
}
