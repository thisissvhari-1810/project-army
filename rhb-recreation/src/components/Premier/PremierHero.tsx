import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { premierHeroSlides } from '../../data/premier'
import { useCarousel } from '../../hooks/useCarousel'

export function PremierHero() {
  const { index, goTo } = useCarousel(premierHeroSlides.length, 5500)

  return (
    <div className="carousel-banner-root is-premier">
      <div className="relative w-full h-auto bg-[#002353]">
        <div className="h-full">
          {premierHeroSlides.map((item, slideIndex) => {
            const bannerStyle = {
              '--data-mobile-image': `url('${item.mobile}')`,
              '--data-desktop-image': `url('${item.desktop}')`,
            } as CSSProperties
            const bannerClass = 'w-full relative carousel-banner--bg text-white block'

            return (
              <div
                key={item.id}
                className={`w-full h-full flex relative overflow-hidden ${slideIndex === index ? '' : 'hidden'}`}
              >
                {item.href ? (
                  item.href.startsWith('#') ? (
                    <a href={item.href} className={bannerClass} style={bannerStyle} />
                  ) : (
                    <Link to={item.href} className={bannerClass} style={bannerStyle} />
                  )
                ) : (
                  <div className={bannerClass} style={bannerStyle} />
                )}
              </div>
            )
          })}
        </div>
        <div className="container-tw mx-auto relative">
          <div className="flex items-center space-x-4 absolute px-[15px] left-0 right-0 z-20 justify-center bottom-0 mb-4">
            <div className="swiper-pagination white-bullets">
              {premierHeroSlides.map((item, slideIndex) => (
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
  )
}
