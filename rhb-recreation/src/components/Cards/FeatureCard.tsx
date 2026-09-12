import type { FeatureTile } from '../../data/premier'

type FeatureCardProps = {
  item: FeatureTile
}

export function FeatureCard({ item }: FeatureCardProps) {
  return (
    <article className="text-center px-4 py-6 max-w-[280px] mx-auto text-white">
      <img src={item.icon} alt="" className="w-[72px] h-[72px] mx-auto mb-4 object-contain" />
      <h3 className="text-white text-xl font-normal mb-3">{item.title}</h3>
      <p className="text-white text-[16px] leading-[1.3] mb-4">{item.description}</p>
      <a href={item.href} className="text-white underline underline-offset-4">
        Learn more
      </a>
    </article>
  )
}
