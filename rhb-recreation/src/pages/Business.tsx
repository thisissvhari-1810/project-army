import type { CSSProperties } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ActionButton } from '../components/common/ActionButton'
import { usePopup } from '../context/PopupContext'
import {
  businessHero,
  businessHighlights,
  businessPromos,
  businessStories,
  crossSellImages,
  industries,
} from '../data/business'
import { popupFromText } from '../data/popups'
import { useCarousel } from '../hooks/useCarousel'

export function Business() {
  const { openProduct } = usePopup()
  const { index, goTo } = useCarousel(businessHero.length, 5000)
  const stories = useCarousel(businessStories.length, 3500)

  useEffect(() => {
    document.title = 'Financial Products and Banking Services for Business | RHB Malaysia'
  }, [])

  return (
    <main>
      <div className="carousel-banner-root is-business">
        <div className="relative w-full h-auto bg-red-50">
          <div className="h-full">
            {businessHero.map((item, slideIndex) => {
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
                    <Link to={item.href} className={bannerClass} style={bannerStyle}>
                      {bannerBody}
                    </Link>
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
                {businessHero.map((item, slideIndex) => (
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

      <section className="section-root pt-[50px] md:pt-[70px] pb-4">
        <div className="container-tw">
          <div className="text-root pb-5">
            <h1 className="text-center font-normal leading-snug" style={{ color: 'rgb(79, 129, 189)', fontSize: 24 }}>
              Explore our versatile suite of financial products
              <br />
              and services to achieve more for your business.
            </h1>
          </div>
        </div>
      </section>

      <section className="section-root pb-[50px] md:pb-[70px]">
        <div className="container-tw">
          <div className="grid md:grid-cols-3 gap-[15px] md:gap-[30px]">
            {industries.map((item) => (
              <article key={item.title} className="card-root w-full h-full">
                <div className="bg-white w-full h-full flex flex-col rounded-lg overflow-hidden relative shadow-lg">
                  <button
                    type="button"
                    className="flex flex-col h-full text-left bg-transparent border-0 p-0 cursor-pointer"
                    onClick={() =>
                      openProduct(
                        popupFromText(
                          item.title,
                          item.description ?? 'Explore industry-specific solutions designed for your business.',
                          item.image,
                        ),
                      )
                    }
                  >
                    <img className="w-full h-[208px] object-cover" src={item.image} alt={item.title} />
                    <div className="pt-6 px-6 pb-6 bg-white text-left h-full">
                      <h3 className="text-[21px] pb-3 text-primary">{item.title}</h3>
                      {item.description ? <p className="text-gray-2 text-[14px] leading-snug">{item.description}</p> : null}
                    </div>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="business-cross-sell-root">
        <div className="container-tw">
          <div
            className="w-full h-full md:p-12 business-cross-sell-banner--bg rounded-lg"
            style={
              {
                '--data-desktop-image': `url('${crossSellImages.desktop}')`,
                '--data-bg-color': '#232C2F',
              } as CSSProperties
            }
          >
            <div className="grid grid-cols-6 md:gap-[30px]">
              <div className="col-span-6 md:col-span-3 lg:col-span-2">
                <img
                  className="md:hidden object-cover rounded-t-lg w-full"
                  src={crossSellImages.mobile}
                  alt="Woman pouring coffee from Barista in cups"
                />
              </div>
              <div className="col-span-6 md:col-span-3 lg:col-span-4 px-6 md:px-0 -mt-12 sm:-mt-28 mb-12 md:my-0">
                <div className="flex lg:flex-row flex-col gap-5 md:gap-[30px]">
                  <div className="lg:w-1/2">
                    <h3 className="text-white font-light text-[28px] lg:text-[36px] leading-tight">
                      Progress is a
                      <br />
                      journey best
                      <br />
                      made together.
                    </h3>
                    <p className="text-white text-[16px] lg:text-[18px] pt-4">
                      Progress opens up opportunities as well as possibilities and it never happens alone. With RHB as
                      your ally, you have someone whom you can bank on to help you achieve your financial goals and make
                      your dreams a reality. Here are many ways we can progress with you.
                    </p>
                    <ActionButton
                      popup="reflex"
                      className="group text-primary-light inline-flex items-center pt-6 text-[16px] bg-transparent border-0 cursor-pointer"
                    >
                      Know more
                      <span className="ml-1 group-hover:ml-[5px] transition-all">→</span>
                    </ActionButton>
                  </div>
                  <div className="flex flex-col justify-end lg:w-1/2">
                    <div className="bg-[#0B2131]/75 md:px-9 px-7 pt-7 pb-10 rounded-lg min-h-[240px]">
                      <h4 className="text-[#6FCCE2] font-bold text-[16px] lg:text-[18px]">
                        {businessStories[stories.index].title}
                      </h4>
                      <p className="text-white pt-4 text-[16px] lg:text-[18px]">{businessStories[stories.index].description}</p>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-3">
                      {businessStories.map((item, slideIndex) => (
                        <button
                          key={item.title}
                          type="button"
                          aria-label={item.title}
                          onClick={() => stories.goTo(slideIndex)}
                          className={`swiper-pagination-bullet ${slideIndex === stories.index ? 'swiper-pagination-bullet-active' : ''}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section-root pt-[50px] md:pt-[70px] pb-[50px] md:pb-[70px]">
        <div className="container-tw">
          <div className="text-root pt-5 pb-5">
            <h2 className="h1 font-light" style={{ color: 'rgb(79, 129, 189)' }}>
              Promotions
            </h2>
            <p className="body-2 text-black mt-4">
              As your ally, we stand right by you to help you elevate your passion to the best of your
              <br />
              abilities. Because when your business thrive, we all do. Find special offers, resources and
              <br />
              solutions, all right here for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-[15px] md:gap-[30px]">
            {businessPromos.map((item) => (
              <article key={item.title} className="bg-white w-full h-full flex flex-col justify-between rounded-lg overflow-hidden shadow-lg">
                <div>
                  <img className="w-full h-[208px] object-cover" src={item.image} alt={item.title} />
                  <div className="pt-6 px-6">
                    <h3 className="text-[21px] pb-3 text-primary">{item.title}</h3>
                    <p className="text-gray-2 text-[14px] leading-snug">{item.description}</p>
                  </div>
                </div>
                <div className="mt-3 px-6 pb-6">
                  <ActionButton
                    className="btn-primary text-white font-bold py-3 px-6 rounded cursor-pointer"
                    popup={item.title.includes('Reflex') ? 'reflex' : popupFromText(item.title, item.description, item.image)}
                  >
                    Find Out More
                  </ActionButton>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-root pt-[50px] md:pt-[70px] pb-[50px] md:pb-[70px]" style={{ backgroundColor: '#e2f5f9' }}>
        <div className="container-tw">
          <div className="grid sm:grid-cols-4">
            <div className="sm:col-span-1 sm:mr-4">
              <h4 className="text-black font-bold text-[16px] lg:text-[18px]">Highlights & Announcements</h4>
            </div>
            <div className="sm:col-span-3 mt-4 sm:mt-0 sm:ml-4">
              {businessHighlights.map((item) => (
                <ActionButton
                  key={item.text}
                  href={item.href}
                  title={item.text}
                  description={`Learn more about ${item.text}.`}
                  className="flex items-center last:mb-0 mb-4 bg-transparent border-0 p-0 cursor-pointer text-left"
                >
                  <span className="text-black font-bold pr-3 text-[16px] hover:text-primary">{item.text}</span>
                  <em className="fa fa-angle-right text-primary" />
                </ActionButton>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-root pt-5 pb-5">
        <div className="container-tw">
          <p className="body-3 text-black">
            Only Deposit products are protected by PIDM up to RM250,000 for each depositor. Click{' '}
            <a className="text-primary underline" href="https://www.pidm.gov.my/" target="_blank" rel="noreferrer">
              here
            </a>{' '}
            for PIDM’s DIS brochure.
          </p>
        </div>
      </section>
    </main>
  )
}
