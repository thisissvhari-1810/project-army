import { useCounter } from '../../hooks/useCounter'
import type { StatItem } from '../../data/home'

type StatCardProps = {
  item: StatItem
  active: boolean
}

export function StatCard({ item, active }: StatCardProps) {
  const value = useCounter(item.value, active)
  const display = (item.decimals ? value.toFixed(item.decimals) : Math.round(value).toString())

  return (
    <article className="stat-card bg-navy rounded-[10px] text-white relative min-h-[160px] px-4 pt-4 pb-16">
      <div className="text-[34px] md:text-[40px] leading-[1.3] font-light">
        {display}
        {item.suffix === '%' ? '%' : ''}
        {item.suffix !== '%' ? (
          <>
            <br />
            {item.suffix}
          </>
        ) : null}
      </div>
      <div className="absolute bottom-4 left-4 text-sm leading-[1.2] whitespace-pre-line">{item.label}</div>
    </article>
  )
}
