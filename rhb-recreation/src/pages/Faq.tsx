import { useEffect, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { faqBannerDesktop, faqBannerMobile, faqCategories, faqPopularSearches } from '../data/faq'

export function Faq() {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    document.title = 'Frequently Asked Questions | RHB Malaysia'
  }, [])

  const showSuggestions = focused && query.trim().length === 0
  const filteredPopular = faqPopularSearches.filter((item) =>
    query.trim() ? item.toLowerCase().includes(query.toLowerCase()) : true,
  )

  return (
    <main>
      <section
        className="faq-hero px-4 pb-10 md:pl-20 md:pb-[40px] md:pt-[50px] flex items-end md:items-start min-h-[320px] md:min-h-[420px]"
        style={
          {
            '--faq-banner-mobile': `url("${faqBannerMobile}")`,
            '--faq-banner-desktop': `url("${faqBannerDesktop}")`,
          } as CSSProperties
        }
      >
        <div className="w-full">
          <p className="text-[28px] md:text-[36px] font-light text-white leading-tight">
            Need help? Check our FAQs.
          </p>
          <div className="relative z-10 mt-7 md:w-1/2 w-full">
            <div className="border border-[#A0A0A0] bg-white py-3 px-6 rounded-lg text-base flex flex-col gap-3">
              <div className="w-full flex items-center">
                <input
                  className="faq-search-input w-full outline-none text-gray-2 bg-transparent"
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => window.setTimeout(() => setFocused(false), 150)}
                  autoComplete="off"
                  placeholder="Search FAQ"
                />
                <button type="button" className="text-primary ml-3" aria-label="Search FAQ">
                  <i className="fa fa-search" aria-hidden="true" />
                </button>
              </div>
              {showSuggestions ? (
                <div>
                  <hr className="border-[#E5E5E5] pb-3" />
                  <p className="font-bold text-primary py-1">Popular Searches</p>
                  {filteredPopular.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className="block font-bold py-1 underline text-left text-gray-2"
                      onMouseDown={() => setQuery(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e2f5f9] pb-[50px] md:pb-[70px]">
        <div className="container-tw py-[50px] md:py-[70px]">
          <h1 className="text-[24px] md:text-[36px] font-light text-primary mb-[15px] md:mb-[30px]">
            FAQ Categories
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[15px] md:gap-[30px]">
            {faqCategories.map((category) => (
              <Link
                key={category.id}
                to={`/faq/${category.id}`}
                className="bg-white w-full h-full flex flex-col rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="p-10 flex flex-col items-start text-left">
                  <img
                    className="h-[55px] mb-4 w-fit object-contain"
                    src={category.icon}
                    alt={category.title}
                  />
                  <h3 className="text-2xl pb-4 text-primary font-bold">{category.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
