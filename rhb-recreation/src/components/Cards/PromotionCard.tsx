import { ArrowRight } from 'lucide-react'
import { ActionButton } from '../common/ActionButton'
import type { PromotionItem } from '../../data/home'
import { popupFromText, productPopups } from '../../data/popups'

const popupMap: Record<string, keyof typeof productPopups> = {
  home: 'home',
  mcv: 'mcv',
  reflex: 'reflex',
  sme: 'sme',
  goal: 'goal',
}

type PromotionCardProps = {
  item: PromotionItem
}

export function PromotionCard({ item }: PromotionCardProps) {
  const mapped = popupMap[item.id]
  const popup = mapped ? productPopups[mapped] : popupFromText(item.title, item.description, item.image)

  return (
    <article className="card-root w-full h-full card-hover">
      <ActionButton
        popup={popup}
        className="bg-white w-full h-full flex flex-col rounded-lg overflow-hidden relative text-left"
      >
        <img src={item.image} alt={item.title} className="w-full h-[180px] object-cover" loading="lazy" />
        <div className="py-5 px-6 h-full flex flex-col justify-between">
          <div className="pb-5">
            <h3 className="text-2xl leading-7 pb-2 text-primary">{item.title}</h3>
            <p className="text-gray-2 body-2">{item.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-bold text-primary">Learn more</p>
            <span className="w-10 h-10 rounded-full bg-sky text-primary flex items-center justify-center">
              <ArrowRight size={18} />
            </span>
          </div>
        </div>
      </ActionButton>
    </article>
  )
}
