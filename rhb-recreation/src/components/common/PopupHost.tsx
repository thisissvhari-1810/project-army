import { usePopup } from '../../context/PopupContext'
import { ExternalLinkModal } from './ExternalLinkModal'
import { ProductPopup } from './ProductPopup'

export function PopupHost() {
  const { product, closeProduct, externalUrl, closeExternal, confirmExternal } = usePopup()

  return (
    <>
      {product ? <ProductPopup data={product} onClose={closeProduct} /> : null}
      {externalUrl ? <ExternalLinkModal onCancel={closeExternal} onConfirm={confirmExternal} /> : null}
    </>
  )
}
