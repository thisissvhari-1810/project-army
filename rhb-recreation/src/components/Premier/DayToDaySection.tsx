import { mobileBankingPoints, onlineBankingPoints, premierImages } from '../../data/premier'

export function DayToDaySection() {
  return (
    <section id="day2day" className="scroll-mt-[88px]">
      <div className="relative min-h-[360px] overflow-hidden">
        <img src={premierImages.dayBanner} alt="" className="w-full min-h-[360px] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002353]/85 via-[#002353]/50 to-transparent" />
        <div className="absolute inset-0 container-tw flex items-center">
          <div className="text-white py-12 max-w-lg">
            <p className="text-3xl md:text-4xl font-light leading-tight mb-2">
              Make your world
              <br />
              one that is always
            </p>
            <img src={premierImages.withinReach} alt="Within Reach" className="max-w-[240px] mb-6" />
            <h3 className="text-2xl font-light mb-3">Day-to-day Banking</h3>
            <p>Wherever you are, get your banking done seamlessly with RHB Premier.</p>
          </div>
        </div>
      </div>
      <div className="bg-[#002353] text-white py-12">
        <div className="container-tw grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="premier-section-title mb-6">RHB Mobile Banking</h2>
            <img src={premierImages.mobileApp} alt="" className="max-w-[220px] mb-6" />
            <p className="text-white/85 mb-6">
              The new RHB Mobile Banking App offers unparalleled convenience with simpler and seamless functions, all at
              a click of a button. It&apos;s 24/7 banking that you enjoy at your convenience - anytime, anywhere.
            </p>
            <ul className="space-y-4">
              {mobileBankingPoints.map((item) => (
                <li key={item.title}>
                  <h5 className="font-bold mb-1">{item.title}</h5>
                  <p className="text-sm text-white/85">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="premier-section-title mb-6">RHB Online Banking</h2>
            <img src={premierImages.desktopApp} alt="" className="w-full max-w-[360px] mb-6" />
            <p className="text-white/85 mb-6">
              The new and enhanced RHB Online Banking elevates the way you bank online. Explore our suite of digital
              banking solutions designed to meet your needs.
            </p>
            <ul className="space-y-4">
              {onlineBankingPoints.map((item) => (
                <li key={item.title}>
                  <h5 className="font-bold mb-1">{item.title}</h5>
                  <p className="text-sm text-white/85">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
