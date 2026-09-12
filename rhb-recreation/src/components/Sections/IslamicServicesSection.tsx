import { ActionButton } from '../common/ActionButton'

const services = [
  { id: 'deposits', title: 'Deposits / Investment Account', text: 'Watch your money grow with Shariah-compliant savings, current and investment accounts.' },
  { id: 'cards', title: 'Cards', text: 'Enjoy everyday spending privileges with RHB Debit Card-i and instalment flexibility.' },
  { id: 'financing', title: 'Financing', text: 'Dependable Home/Property Financing-i, Auto Financing-i and education financing solutions.' },
  { id: 'takaful', title: 'Takaful', text: 'Protect your family, savings and legacy with comprehensive takaful plans.' },
]

export function IslamicServicesSection() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container-tw">
        <h2 className="text-navy text-[32px] md:text-[40px] font-light mb-4">Islamic Banking Services</h2>
        <p className="max-w-3xl text-[#5b6573] text-base md:text-lg leading-relaxed mb-10">
          Your financial well-being starts with RHB&apos;s Islamic Banking. Start your journey to financial growth with
          RHB&apos;s comprehensive Shariah-compliant solutions.
        </p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((item) => (
            <article key={item.id} className="border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
              <h3 className="text-primary font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed mb-4">{item.text}</p>
              <ActionButton popup="home" className="text-primary font-bold text-sm hover:underline">
                Find Out More
              </ActionButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
