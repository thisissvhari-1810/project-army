import { familyBenefits, premierImages } from '../../data/premier'

export function FamilyExtensionSection() {
  return (
    <section className="bg-[#002353] pb-16">
      <div className="container-tw">
        <div className="bg-primary grid lg:grid-cols-2 items-center overflow-hidden">
          <div className="p-8 md:p-12 text-white">
            <h4 className="text-[28px] md:text-[32px] font-light mb-4">RHB Premier Family Extension</h4>
            <p className="mb-6 leading-relaxed">
              By becoming a part of RHB Premier, the privileges and wealth management benefits that you enjoy are also
              extended to your family, so that even their future will be well and truly taken care of.
            </p>
            <p className="mb-3">Here are some benefits that your loved ones can enjoy with us:</p>
            <div className="border border-white/40 p-5">
              <h5 className="font-bold mb-3 tracking-wide">FOR SPOUSE AND CHILDREN</h5>
              <ul className="space-y-2 text-sm">
                {familyBenefits.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
          <img src={premierImages.family} alt="Premier family extension" className="w-full h-full min-h-[280px] object-cover" />
        </div>
      </div>
    </section>
  )
}
