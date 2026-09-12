import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { campaignPopup, type ProductPopupData } from '../data/popups'

type PopupContextValue = {
  product: ProductPopupData | null
  openProduct: (data: ProductPopupData) => void
  closeProduct: () => void
  campaignOpen: boolean
  openCampaign: () => void
  closeCampaign: () => void
  externalUrl: string | null
  openExternal: (url: string) => void
  closeExternal: () => void
  confirmExternal: () => void
}

const PopupContext = createContext<PopupContextValue | null>(null)

export function PopupProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<ProductPopupData | null>(null)
  const [campaignOpen, setCampaignOpen] = useState(false)
  const [externalUrl, setExternalUrl] = useState<string | null>(null)

  const value = useMemo<PopupContextValue>(
    () => ({
      product,
      openProduct: (data) => {
        setCampaignOpen(false)
        setProduct(data)
      },
      closeProduct: () => setProduct(null),
      campaignOpen,
      openCampaign: () => {
        setProduct(null)
        setCampaignOpen(true)
      },
      closeCampaign: () => setCampaignOpen(false),
      externalUrl,
      openExternal: (url) => setExternalUrl(url),
      closeExternal: () => setExternalUrl(null),
      confirmExternal: () => {
        if (externalUrl) window.open(externalUrl, '_blank', 'noopener,noreferrer')
        setExternalUrl(null)
      },
    }),
    [campaignOpen, externalUrl, product],
  )

  return <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
}

export function usePopup() {
  const ctx = useContext(PopupContext)
  if (!ctx) throw new Error('usePopup must be used within PopupProvider')
  return ctx
}

export function useOptionalPopup() {
  return useContext(PopupContext)
}

export function useOpenCampaign() {
  const popup = usePopup()
  return useCallback(() => popup.openProduct(campaignPopup), [popup])
}
