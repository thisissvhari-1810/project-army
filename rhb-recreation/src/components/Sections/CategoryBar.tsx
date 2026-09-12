import { Link } from 'react-router-dom'
import { categories } from '../../data/home'

const iconSrc: Record<string, string> = {
  wallet: 'https://www.rhbgroup.com/-/media/Project/RHB/Category/icon-mm-savings.svg',
  'credit-card': 'https://www.rhbgroup.com/-/media/Project/RHB/Category/icon-mm-rhb-card.svg',
  landmark: 'https://www.rhbgroup.com/-/media/Project/RHB/Category/icon-mm-get-a-loan.svg',
  shield: 'https://www.rhbgroup.com/-/media/Project/RHB/Category/icon-mm-insurance.svg',
  gem: 'https://www.rhbgroup.com/-/media/Project/RHB/Category/icon-mm-premier-banking.svg',
  'trending-up': 'https://www.rhbgroup.com/-/media/Project/RHB/Category/icon-mm-investing.svg',
  'clipboard-check': 'https://www.rhbgroup.com/-/media/Project/RHB/Category/icon-mm-check-application.svg',
}

export function CategoryBar() {
  return (
    <div className="category-root flex flex-row gap-5 -mx-[15px] md:mx-0 bg-white rounded justify-center items-center relative z-10">
      <div className="relative w-full px-4 md:px-0">
        <div className="flex justify-center">
          {categories.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className="md:w-1/6 text-center flex flex-col justify-center items-center"
            >
              <img
                className="w-[32px] md:w-[60px] mx-auto"
                src={iconSrc[item.icon] ?? iconSrc.wallet}
                alt={item.label}
              />
              <h3 className="text-primary text-[11px] md:text-[16px] px-2">{item.label}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
