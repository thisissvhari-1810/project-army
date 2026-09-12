import { premierImages } from '../../data/premier'

export function PrivilegeSection() {
  return (
    <section id="privileges" className="bg-[#002353] scroll-mt-[88px]">
      <div className="relative min-h-[380px] overflow-hidden">
        <img src={premierImages.privilegesBanner} alt="" className="w-full min-h-[380px] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002353]/90 via-[#002353]/55 to-transparent" />
        <div className="absolute inset-0 container-tw flex items-center">
          <div className="text-white max-w-lg py-14">
            <p className="text-3xl md:text-4xl font-light leading-tight mb-2">
              Make the world
              <br />
              you explore one
            </p>
            <img src={premierImages.withoutBorders} alt="Without Borders" className="max-w-[280px] mb-6" />
            <h3 className="text-2xl font-light mb-3">Privileges</h3>
            <p>Enjoy exclusive privileges with RHB Premier</p>
          </div>
        </div>
      </div>
    </section>
  )
}
