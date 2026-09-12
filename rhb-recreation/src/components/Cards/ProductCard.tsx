import { ActionButton } from '../common/ActionButton'
import { popupFromText } from '../../data/popups'

type ProductCardProps = {
  title: string
  description: string
  href: string
  note?: string
}

export function ProductCard({ title, description, href, note }: ProductCardProps) {
  return (
    <article className="text-center px-3 py-6">
      <h4 className="text-white text-lg font-bold leading-snug mb-3 whitespace-pre-line">{title}</h4>
      <p className="text-white/90 text-sm leading-relaxed mb-3">{description}</p>
      {note ? <p className="text-white/70 text-xs mb-4">{note}</p> : null}
      <ActionButton
        href={href}
        popup={popupFromText(title, description)}
        className="inline-block font-bold text-white border border-white px-5 py-2 rounded hover:bg-white hover:text-navy transition-colors"
      >
        Find Out More
      </ActionButton>
    </article>
  )
}
