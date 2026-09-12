import { Link } from 'react-router-dom'

export function MobileBankingSection() {
  return (
    <section className="text-white" style={{ backgroundImage: 'linear-gradient(45deg, #0067B1, #76C0E3)' }}>
      <div className="container-tw py-10 lg:py-0">
        <div className="grid lg:grid-cols-2">
          <div className="grid sm:grid-cols-5 gap-6 items-end pt-10 lg:pt-[90px] pb-8">
            <div className="sm:col-span-3">
              <p className="font-display italic text-4xl md:text-5xl leading-none mb-2">Banking</p>
              <p className="text-2xl font-light mb-6">right by you</p>
              <Link
                to="/placeholder/digital-services"
                className="inline-block border border-white px-5 py-2 font-bold rounded hover:bg-white hover:text-primary transition-colors"
              >
                Find out more
              </Link>
              <p className="mt-8 text-lg leading-snug">
                Download the new
                <br />
                RHB Mobile Banking App now.
              </p>
              <div className="flex gap-2 mt-5 max-w-[300px]">
                <a href="/placeholder/play-store" aria-label="Get it on Google Play">
                  <img src="/assets/icons/google-play.svg" alt="Google Play" className="h-11 w-auto" />
                </a>
                <a href="/placeholder/app-store" aria-label="Download on the App Store">
                  <img src="/assets/icons/app-store.svg" alt="App Store" className="h-11 w-auto" />
                </a>
              </div>
            </div>
            <div className="sm:col-span-2">
              <img
                src="/assets/images/phone-app.jpg"
                alt="RHB Mobile Banking app illustration"
                className="w-full max-w-[260px] mx-auto rounded-3xl shadow-2xl"
              />
              <p className="text-center text-[10px] mt-2">Image shown is for illustration purpose only.</p>
            </div>
          </div>
          <Link to="/learn" className="block relative min-h-[280px] lg:min-h-full overflow-hidden">
            <img
              src="/assets/images/insight-merge.jpg"
              alt="MERGE by RHB"
              className="w-full h-full object-cover min-h-[280px] lg:min-h-[520px]"
            />
            <div className="absolute inset-0 bg-navy/35 flex items-end p-8">
              <div>
                <p className="uppercase tracking-[0.2em] text-xs mb-2">Merge by RHB</p>
                <p className="text-2xl font-light">Financial insights for every life stage</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
