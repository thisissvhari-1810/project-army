export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#c8e8f6]">
      <div className="container-tw relative">
        <div className="grid lg:grid-cols-2 items-center min-h-[320px] md:min-h-[420px] lg:min-h-[480px]">
          <div className="py-16 lg:py-0 relative z-10">
            <h1 className="text-white text-[40px] md:text-[56px] lg:text-[64px] font-light leading-[1.05] tracking-[-0.03em]">
              Islamic
              <br />
              Banking
            </h1>
          </div>
          <div className="absolute inset-y-0 right-0 w-[62%] hidden md:block">
            <img
              src="/assets/images/islamic-hero.jpg"
              alt=""
              className="w-full h-full object-cover object-[center_20%]"
            />
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <img src="/assets/images/islamic-hero.jpg" alt="Islamic Banking" className="w-full h-56 object-cover object-right" />
      </div>
    </section>
  )
}
