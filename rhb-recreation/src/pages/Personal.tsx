import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { usePopup } from '../context/PopupContext'
import { popupFromText } from '../data/popups'
import { personalHero, personalSections, personalTabs, type PersonalTabId } from '../data/personal'
import { useCarousel } from '../hooks/useCarousel'

export function Personal() {
  const [tab, setTab] = useState<PersonalTabId>('deposits')
  const [mobileOpen, setMobileOpen] = useState('')
  const { openProduct } = usePopup()
  const { index, goTo } = useCarousel(personalHero.length, 5000)
  const location = useLocation()
  const section = personalSections.find((item) => item.id === tab)

  useEffect(() => {
    document.title = 'Start Your Financial Journey with RHB Personal Banking | RHB Malaysia'
  }, [])

  useEffect(() => {
    const hash = location.hash.replace('#', '')
    const match = personalTabs.find((item) => item.id === hash && !('href' in item && item.href))
    if (!match) return
    setTab(match.id)
    setMobileOpen(match.id)
  }, [location.hash])

  return (
    <main>
      <div className="carousel-banner-root">
        <div className="relative w-full h-auto bg-red-50">
          <div className="h-full">
            {personalHero.map((item, slideIndex) => {
              const bannerStyle = {
                '--data-mobile-image': `url('${item.mobile}')`,
                '--data-desktop-image': `url('${item.desktop}')`,
              } as CSSProperties
              const bannerClass = 'w-full relative carousel-banner--bg text-white block'
              const bannerBody = (
                <div className="w-full lg:w-[970px] xl:w-[1170px] px-[15px] h-full absolute top-0 left-1/2 -translate-x-2/4 z-10">
                  <div className="flex flex-col w-full lg:w-1/2 justify-center text-left h-full" />
                </div>
              )

              return (
                <div
                  key={item.id}
                  className={`w-full h-full flex relative overflow-hidden ${slideIndex === index ? '' : 'hidden'}`}
                >
                  {item.href ? (
                    item.href.startsWith('http') ? (
                      <a href={item.href} target="_blank" rel="noreferrer" className={bannerClass} style={bannerStyle}>
                        {bannerBody}
                      </a>
                    ) : (
                      <Link to={item.href} className={bannerClass} style={bannerStyle}>
                        {bannerBody}
                      </Link>
                    )
                  ) : (
                    <div className={bannerClass} style={bannerStyle}>
                      {bannerBody}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="container-tw mx-auto relative">
            <div className="flex items-center space-x-4 absolute px-[15px] left-0 right-0 z-20 justify-start bottom-0 mb-4">
              <div className="swiper-pagination white-bullets">
                {personalHero.map((item, slideIndex) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={item.title}
                    onClick={() => goTo(slideIndex)}
                    className={`swiper-pagination-bullet ${slideIndex === index ? 'swiper-pagination-bullet-active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-root pt-6 pb-2">
        <div className="rte text-black no-line-break">
          <h1 className="h4 text-center">
            <span style={{ color: 'rgb(69, 69, 69)' }}>
              Start your financial journey to save, invest and grow. It is your
              <br />
              personal wealth and we take that very seriously.
            </span>
          </h1>
        </div>
      </div>

      <div className="product-finder-root py-8 md:py-10">
        <div className="container-tw">
          <div id="product-finder-desktop" className="hidden lg:flex pb-8">
            <div className="flex flex-col w-5/12 container-fluid-tw">
              {personalTabs.map((item) => {
                const selected = tab === item.id && !('href' in item && item.href)
                const className = `px-4 py-1.5 text-[18px] leading-snug rounded cursor-pointer !text-[#0067b1] hover:bg-primary-lightskyblue ${
                  selected ? 'bg-primary-lightskyblue' : ''
                }`

                if ('href' in item && item.href) {
                  return (
                    <Link key={item.id} to={item.href} className={className}>
                      <span className="font-bold">{item.label}</span>
                    </Link>
                  )
                }

                return (
                  <button key={item.id} type="button" onClick={() => setTab(item.id)} className={`${className} text-left`}>
                    <span className="font-bold">{item.label}</span>
                  </button>
                )
              })}
            </div>

            <div className="w-7/12 -mt-3">
              {section ? (
                <div className="grid grid-cols-2 container-fluid-tw">
                  {section.items.map((item) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => openProduct(popupFromText(item.title, item.description))}
                      className="py-3 px-3 rounded group hover:text-white hover:bg-primary text-left"
                    >
                      <div className="text-[18px] leading-snug font-bold text-primary group-hover:text-white pb-1.5">{item.title}</div>
                      <div className="text-gray-2 text-[14px] leading-snug group-hover:text-white">{item.description}</div>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div id="product-finder-mobile" className="flex flex-col lg:hidden">
            {personalTabs.map((item) => {
              const group = personalSections.find((sectionItem) => sectionItem.id === item.id)
              const open = mobileOpen === item.id

              if ('href' in item && item.href) {
                return (
                  <div key={item.id}>
                    <Link
                      id={item.id}
                      to={item.href}
                      className="py-2 flex justify-between !text-[#0067b1] cursor-pointer"
                    >
                      <span className="h4 font-bold">{item.label}</span>
                      <em className="personal-chevron" />
                    </Link>
                  </div>
                )
              }

              return (
                <div key={item.id}>
                  <button
                    id={item.id}
                    type="button"
                    onClick={() => setMobileOpen((current) => (current === item.id ? '' : item.id))}
                    className="py-2 flex justify-between !text-[#0067b1] cursor-pointer w-full text-left"
                  >
                    <span className="h4 font-bold">{item.label}</span>
                    <em className={`personal-chevron ${open ? 'is-open' : ''}`} />
                  </button>
                  <div className={`personal-accordion ${open ? 'is-open' : ''}`}>
                    {group?.items.map((product) => (
                      <div key={product.title} className="first:pt-2 last:mb-4 py-3 border-b border-[#ddd]">
                        <p className="text-[18px] text-primary pb-1">{product.title}</p>
                        <p className="text-[14px] leading-snug pb-2">{product.description}</p>
                        <button
                          type="button"
                          className="body-2 text-primary"
                          onClick={() => openProduct(popupFromText(product.title, product.description))}
                        >
                          Know More
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
