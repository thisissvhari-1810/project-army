import { ActionButton } from '../common/ActionButton'
import { premierImages, visaInfinitePoints } from '../../data/premier'

export function VisaInfiniteSection() {
  return (
    <section className="bg-[#002353] pb-12">
      <div className="container-tw grid lg:grid-cols-2 gap-0 overflow-hidden">
        <div className="bg-primary text-white p-8 md:p-10 order-2 lg:order-1">
          <h4 className="text-2xl font-light text-center mb-4">RHB Premier Visa Infinite Credit Card/-i</h4>
          <p className="text-center text-sm mb-6 leading-relaxed">
            Experience luxury and endless travel benefits with your passport to world-class travel privileges. Enjoy
            special holidays, hotel and flight deals, plus Loyalty Points with each spend, dine and entertain overseas.
          </p>
          <div className="space-y-5 border-t border-white/30 pt-5">
            {visaInfinitePoints.map((point) => (
              <div key={point.title} className="flex gap-4">
                <img src={point.icon} alt="" className="w-10 h-10 shrink-0 object-contain" />
                <div>
                  <h5 className="font-bold mb-1">{point.title}</h5>
                  <p className="text-sm text-white/90">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <ActionButton popup="visa" className="inline-block bg-[#002353] px-6 py-2 font-bold rounded">
              Find Out More
            </ActionButton>
          </div>
        </div>
        <img
          src={premierImages.visaCard}
          alt="Premier Visa Infinite"
          className="w-full h-full min-h-[320px] object-contain bg-[#002353] p-6 order-1 lg:order-2"
        />
      </div>
    </section>
  )
}
