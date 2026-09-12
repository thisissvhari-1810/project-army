import { premierImages } from '../../data/premier'

export function RegionalBankingSection() {
  return (
    <section className="bg-[#002353] pb-16">
      <div className="container-tw bg-primary text-white grid lg:grid-cols-2 items-center overflow-hidden">
        <img src={premierImages.regional} alt="" className="w-full h-full min-h-[260px] object-cover" />
        <div className="p-8 md:p-12">
          <h4 className="text-2xl font-light mb-4">Regional Banking Services</h4>
          <p className="leading-relaxed">
            Enjoy the RHB Premier recognition in Malaysia, Singapore and Cambodia, which grants you seamless
            cross-border accessibility to priority banking services, privileges, rewards and personalised wealth
            management solutions.
          </p>
          <p className="leading-relaxed mt-4 text-white/90">
            If you are interested to know more about our Regional Banking Services in Singapore and Cambodia, kindly
            speak to your dedicated Relationship Manager today.
          </p>
        </div>
      </div>
    </section>
  )
}
