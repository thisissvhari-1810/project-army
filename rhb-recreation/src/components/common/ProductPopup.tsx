import { X } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { ProductPopupData } from '../../data/popups'

type ProductPopupProps = {
  data: ProductPopupData
  onClose: () => void
}

export function ProductPopup({ data, onClose }: ProductPopupProps) {
  const navigate = useNavigate()
  const isCompact = data.compact === true

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8" role="dialog" aria-modal="true">
      <button type="button" className="absolute inset-0 bg-navy-deep/55" aria-label="Close popup" onClick={onClose} />
      <div
        className={`product-popup relative z-10 w-full bg-white shadow-2xl overflow-hidden ${isCompact ? 'product-popup--compact max-w-[820px]' : 'max-w-[1080px]'}`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 text-navy hover:text-primary"
        >
          <X size={22} />
        </button>
        <div className="product-popup__content p-8 md:p-10 flex flex-col justify-center overflow-y-auto">
          {!isCompact && data.script ? (
            <p className="font-display italic text-[42px] md:text-[56px] leading-none text-navy mb-2">{data.script}</p>
          ) : null}
          <h2
            className={
              isCompact
                ? 'text-[24px] md:text-[28px] font-light text-navy leading-tight mb-4'
                : 'text-[28px] md:text-[36px] font-light text-navy leading-tight mb-5'
            }
          >
            {data.title}
          </h2>
          <p className="text-[#4a4a4a] text-[15px] leading-relaxed mb-8">{data.description}</p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="bg-navy text-white font-bold rounded-full px-7 py-3 hover:bg-primary transition-colors"
              onClick={() => {
                onClose()
                if (data.href) navigate(data.href)
              }}
            >
              {data.ctaLabel ?? 'Find Out More'}
            </button>
            <span className="text-sm text-muted">{data.terms ?? 'Terms & Conditions apply.'}</span>
          </div>
        </div>
        <div
          className="product-popup__media hidden md:block"
          style={{ ['--popup-image-position' as string]: data.imagePosition ?? 'center' }}
        >
          <img src={data.image} alt="" className="product-popup__image" />
        </div>
      </div>
    </div>
  )
}
