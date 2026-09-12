import { Link } from 'react-router-dom'
import { statistics } from '../../data/home'
import { useInView } from '../../hooks/useInView'
import { StatCard } from '../Cards/StatCard'

export function AboutSection() {
  const { ref, visible } = useInView<HTMLDivElement>(0.2)

  return (
    <section
      className="text-white bg-[#E6F6FC] lg:bg-navy-deep bg-cover bg-top lg:bg-center"
      style={{ backgroundImage: "linear-gradient(90deg, rgba(0,31,77,0.88), rgba(0,46,105,0.55)), url('/assets/images/about-bg.jpg')" }}
    >
      <div className="container-tw py-14 lg:py-20">
        <div className="max-w-[420px] mb-10">
          <h1 className="text-white font-light text-[36px] md:text-[44px] mb-5">About Us</h1>
          <p className="mb-8 text-base leading-relaxed">
            We are the fourth largest, fully-integrated financial services group in Malaysia. We are ready to partner
            with you in your quest to grow your wealth and financial independence.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/about/who-we-are" className="btn-primary font-bold px-5 py-2 rounded hover:bg-primary-hover">
              Find out more
            </Link>
            <Link
              to="/investor-relations"
              className="border border-white font-bold px-5 py-2 rounded hover:bg-white hover:text-primary transition-colors"
            >
              Investor Relations
            </Link>
          </div>
        </div>
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statistics.map((item) => (
            <StatCard key={item.id} item={item} active={visible} />
          ))}
        </div>
        <p className="mt-6 text-sm text-white/80">
          *Based on information for the Financial Year Ended 31 December 2025
        </p>
      </div>
    </section>
  )
}
