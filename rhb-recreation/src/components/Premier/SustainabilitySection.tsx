import { greenProducts, premierImages } from '../../data/premier'
import { ActionButton } from '../common/ActionButton'

export function SustainabilitySection() {
  return (
    <section id="sustainability" className="bg-white scroll-mt-[88px]">
      <div className="relative min-h-[360px] overflow-hidden">
        <img src={premierImages.sustainabilityBanner} alt="" className="w-full min-h-[360px] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002353]/85 via-[#002353]/50 to-transparent" />
        <div className="absolute inset-0 container-tw flex items-center">
          <div className="text-white max-w-lg py-12">
            <p className="text-3xl md:text-4xl font-light leading-tight mb-2">
              Make the first
              <br />
              move towards a
            </p>
            <img src={premierImages.greenerWorld} alt="Greener World" className="max-w-[260px] mb-6" />
            <h3 className="text-2xl font-light mb-3">Sustainability</h3>
            <p>Get special green financing rates with RHB Premier.</p>
          </div>
        </div>
      </div>
      <div className="bg-primary text-white py-12">
        <div className="container-tw">
          <h2 className="premier-section-title mb-4">RHB Green Financing</h2>
          <p className="max-w-3xl text-white/90 mb-8">
            Enjoy attractive interest/profit rates for financing your next electric vehicle, solar panel systems and
            more, so that you can start building a better, greener tomorrow, today. Explore our Green Financing schemes
            designed to help support your green aspirations by simply financing with us.
          </p>
        </div>
      </div>
      <div className="bg-[#002353] text-white py-12">
        <div className="container-tw grid lg:grid-cols-2 gap-0 overflow-hidden">
          <img src={premierImages.vehicle} alt="" className="w-full min-h-[280px] object-cover" />
          <div className="bg-primary p-8">
            <h5 className="text-xl font-bold mb-3">RHB Vehicle Financing-i</h5>
            <p className="text-sm mb-6">
              Steer towards a cleaner, greener future by getting an eco-friendly car with our Green Financing Package.
            </p>
            <div className="grid gap-4">
              {greenProducts.map((item) => (
                <article key={item.title}>
                  <h5 className="font-bold mb-1">{item.title}</h5>
                  <p className="text-sm text-white/85">{item.description}</p>
                </article>
              ))}
            </div>
            <ActionButton popup="green" className="mt-6 bg-[#002353] font-bold px-6 py-2 rounded">
              Find Out More
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  )
}
