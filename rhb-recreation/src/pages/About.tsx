import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ActionButton } from '../components/common/ActionButton'
import { aboutNav, milestones, pillars } from '../data/about'

export function About() {
  const { slug = 'who-we-are' } = useParams()

  useEffect(() => {
    document.title = 'Who We Are | RHB Malaysia'
  }, [])

  return (
    <main className="bg-white">
      <div className="bg-navy text-white">
        <div className="container-tw py-3 flex flex-wrap gap-x-5 gap-y-2 body-3">
          {aboutNav.map((item) => (
            <Link
              key={item.id}
              to={`/about/${item.id}`}
              className={slug === item.id ? 'font-bold text-secondary' : 'hover:text-secondary'}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <section className="relative min-h-[280px] md:min-h-[380px]">
        <img src="/assets/images/about-bg.jpg" alt="Who we are" className="w-full min-h-[280px] h-full object-cover" />
        <div className="absolute inset-0 bg-navy/40" />
      </section>
      <section className="container-tw py-12">
        <h1 className="text-navy text-3xl font-light mb-6">Who We Are</h1>
        <p className="text-muted leading-relaxed mb-4 max-w-4xl">
          RHB Banking Group is a multinational regional financial services provider that is committed to delivering
          complete solutions to customers through differentiated segment offerings and an ecosystem that supports
          simple, fast and seamless customer experiences, underpinned by a cohesive and inspired workforce, and
          relationships built with stakeholders.
        </p>
        <p className="text-muted leading-relaxed mb-4 max-w-4xl">
          Ranked among the top banks in Malaysia and with a significant presence in ASEAN, RHB has strong market
          leadership in Malaysia across targeted products and segments. With about 13,000 employees Group-wide,
          RHB&apos;s presence spans 7 countries in the ASEAN region.
        </p>
        <p className="text-muted leading-relaxed mb-10 max-w-4xl">
          The Group&apos;s core businesses are structured into six business pillars, namely Group Wholesale Banking,
          Group Community Banking, Group Shariah Business, Group Corporate and Business Banking, Group International
          Business and Group Insurance.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {pillars.map((item) => (
            <article key={item.title} className="border border-gray-4 p-6">
              <h2 className="text-primary text-xl font-bold mb-3">{item.title}</h2>
              <p className="text-sm text-muted leading-relaxed mb-4">{item.body}</p>
              <ActionButton
                className="font-bold text-primary underline"
                title={item.title}
                description={item.body}
                image="/assets/images/about-bg.jpg"
              >
                Learn more
              </ActionButton>
            </article>
          ))}
        </div>
        <h2 className="text-navy text-2xl font-light mb-6">Corporate Milestones</h2>
        <div className="space-y-4 mb-12">
          {milestones.map((item) => (
            <ActionButton
              key={item.year}
              className="w-full text-left border-l-4 border-primary bg-sky px-4 py-3"
              title={item.year}
              description={item.text}
              image="/assets/images/about-bg.jpg"
            >
              <span className="font-bold text-primary mr-3">{item.year}</span>
              <span className="text-muted">{item.text}</span>
            </ActionButton>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-8 bg-gray-6 p-6">
          <div>
            <h3 className="font-bold text-navy mb-2">Registered Office</h3>
            <p className="text-sm text-muted leading-relaxed">
              Level 10, Tower One, RHB Centre, Jalan Tun Razak, 50400 Kuala Lumpur, Malaysia
              <br />
              Tel: 603-9206 8118
            </p>
          </div>
          <div>
            <h3 className="font-bold text-navy mb-2">Stock Exchange Listing</h3>
            <p className="text-sm text-muted">
              Listed on Main Market of Bursa Malaysia Securities Berhad since 28 June 2016
            </p>
            <ActionButton className="mt-3 font-bold text-primary underline" popup="premier">
              View Corporate Structure
            </ActionButton>
          </div>
        </div>
      </section>
    </main>
  )
}
