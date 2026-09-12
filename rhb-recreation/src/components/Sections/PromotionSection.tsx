import { useState } from 'react'
import { Link } from 'react-router-dom'
import { promotions, promoTabs } from '../../data/home'
import { PromotionCard } from '../Cards/PromotionCard'

export function PromotionSection() {
  const [selected, setSelected] = useState('Promotions')

  return (
    <div className="homepage-promotion-listing-root bg-sky py-5">
      <section className="container-tw">
        <div className="flex flex-wrap gap-y-2 pb-7 md:pb-4">
          {promoTabs.map((tab) =>
            tab.id === 'Promotions' ? (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelected(tab.id)}
                className={`py-2 leading-6 px-5 rounded-md cursor-pointer mr-2 transition last:mr-0 ${
                  selected === tab.id
                    ? 'bg-navy text-white'
                    : 'bg-white text-gray-9 hover:text-navy hover:ring-2 ring-navy'
                }`}
              >
                <span className="body-2 font-bold">{tab.id}</span>
              </button>
            ) : (
              <Link
                key={tab.id}
                to={tab.href}
                className="py-2 leading-6 px-5 rounded-md cursor-pointer mr-2 transition last:mr-0 bg-white text-gray-9 hover:text-navy hover:ring-2 ring-navy"
              >
                <span className="body-2 font-bold">{tab.id}</span>
              </Link>
            ),
          )}
        </div>
        <div className="hidden md:grid gap-[30px] md:grid-cols-2 lg:grid-cols-3">
          {promotions.map((item) => (
            <PromotionCard key={item.id} item={item} />
          ))}
        </div>
        <div className="md:hidden flex overflow-x-auto no-scrollbar gap-5 pb-2">
          {promotions.map((item) => (
            <div key={item.id} className="min-w-[80%] max-w-[320px]">
              <PromotionCard item={item} />
            </div>
          ))}
        </div>
        <Link to="/promotions" className="block text-right font-bold underline text-primary mt-4">
          View All Promotions
        </Link>
      </section>
    </div>
  )
}
