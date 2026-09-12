import { ActionButton } from '../common/ActionButton'
import { premierImages, wealthProducts } from '../../data/premier'
import { popupFromText } from '../../data/popups'

export function WealthManagementSection() {
  return (
    <section id="wealthmanagement" className="bg-[#00040a] scroll-mt-[88px]">
      <div className="relative min-h-[420px] overflow-hidden">
        <img src={premierImages.wealthBanner} alt="" className="w-full min-h-[420px] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#00040a]/90 via-[#00040a]/55 to-transparent" />
        <div className="absolute inset-0 container-tw flex items-center">
          <div className="max-w-lg text-white py-16">
            <p className="text-3xl md:text-4xl font-light leading-tight mb-2">
              Make the ones who
              <br />
              matter the center of
            </p>
            <img src={premierImages.yourWorld} alt="Your World" className="max-w-[240px] mb-6" />
            <h3 className="text-2xl font-light mb-4">Wealth Management</h3>
            <p className="text-white/90 leading-relaxed">
              With RHB Premier&apos;s suite of wealth management products and tools, you can now plan ahead for
              generations to come. On top of that, all the benefits that you enjoy with us are extended to your family
              members too.
            </p>
          </div>
        </div>
      </div>
      <div className="container-tw pt-12 pb-8">
        <div className="premier-divider">
          <h2 className="premier-divider__title">Wealth Management Solutions</h2>
          <p className="premier-divider__desc">
            Explore our suite of products that are designed to make your wealth accumulation, wealth protection and
            wealth distribution journey simple and rewarding.
          </p>
        </div>
      </div>
      <div className="grid lg:grid-cols-[1.15fr_0.85fr] items-stretch">
        <div className="bg-[#002353] px-6 md:px-12 py-14">
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-14 text-center text-white">
            {wealthProducts.slice(0, 6).map((item) => (
              <article key={item.id} className="flex flex-col items-center">
                <h4 className="font-light text-[18px] md:text-[20px] leading-snug mb-3 whitespace-pre-line">
                  {item.title}
                </h4>
                <p className="text-[14px] leading-relaxed text-white/90 mb-2 max-w-[280px]">{item.description}</p>
                {item.note ? <p className="text-[13px] text-white/75 mb-4 max-w-[280px]">{item.note}</p> : null}
                <ActionButton
                  className="mt-3 bg-[#6294B5] text-white text-[13px] font-normal rounded-full px-6 py-2"
                  popup={popupFromText(item.title.replace('\n', ' '), item.description)}
                >
                  Find Out More
                </ActionButton>
              </article>
            ))}
            {wealthProducts.slice(6).map((item) => (
              <article key={item.id} className="sm:col-span-2 flex flex-col items-center">
                <h4 className="font-light text-[18px] md:text-[20px] leading-snug mb-3 whitespace-pre-line">
                  {item.title}
                </h4>
                <p className="text-[14px] leading-relaxed text-white/90 mb-4 max-w-[280px]">{item.description}</p>
                <ActionButton
                  className="bg-[#6294B5] text-white text-[13px] font-normal rounded-full px-6 py-2"
                  popup={popupFromText(item.title.replace('\n', ' '), item.description)}
                >
                  Find Out More
                </ActionButton>
              </article>
            ))}
          </div>
        </div>
        <div className="bg-[#00040a] flex items-center justify-start">
          <img
            src={premierImages.wealthRange}
            alt=""
            className="w-full max-w-[380px] h-auto"
          />
        </div>
      </div>
    </section>
  )
}
