import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePopup } from '../../context/PopupContext'
import { popupFromText, productPopups, type ProductPopupData } from '../../data/popups'

type ActionButtonProps = {
  children: ReactNode
  className?: string
  popup?: ProductPopupData | keyof typeof productPopups
  href?: string
  title?: string
  description?: string
  image?: string
  'aria-label'?: string
}

export function ActionButton({
  children,
  className = '',
  popup,
  href,
  title,
  description,
  image,
  'aria-label': ariaLabel,
}: ActionButtonProps) {
  const { openProduct, openExternal } = usePopup()
  const navigate = useNavigate()

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={className}
      onClick={() => {
        if (typeof popup === 'string' && productPopups[popup]) {
          openProduct(productPopups[popup])
          return
        }
        if (popup && typeof popup !== 'string') {
          openProduct(popup)
          return
        }
        if (title && description) {
          openProduct(popupFromText(title, description, image))
          return
        }
        if (href?.startsWith('http')) {
          openExternal(href)
          return
        }
        if (href) navigate(href)
      }}
    >
      {children}
    </button>
  )
}
