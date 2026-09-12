import { X } from 'lucide-react'

type ExternalLinkModalProps = {
  onCancel: () => void
  onConfirm: () => void
}

export function ExternalLinkModal({ onCancel, onConfirm }: ExternalLinkModalProps) {
  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true">
      <div className="bg-white w-full max-w-[520px] rounded-md p-5 shadow-lg">
        <div className="flex justify-end">
          <button type="button" onClick={onCancel} aria-label="Close" className="text-primary">
            <X size={22} />
          </button>
        </div>
        <div className="px-2 pb-2">
          <p className="mb-5">
            You are about to enter a third party website and RHB Banking Group&apos;s privacy policy will cease to apply.
          </p>
          <p className="mb-5">
            This link is provided for your convenience only, and shall not be considered or construed as an endorsement
            or verification of such linked website or its contents by RHB Banking Group.
          </p>
          <p className="mb-5">
            RHB Banking Group also makes no warranties as to the status of this link or information contained in the
            website you are about to access.
          </p>
        </div>
        <div className="flex justify-end gap-3 border-t border-gray-4 pt-5">
          <button
            type="button"
            onClick={onCancel}
            className="body-1 font-bold border border-black bg-white hover:bg-gray-5 py-3 px-6 rounded"
          >
            Cancel
          </button>
          <button type="button" onClick={onConfirm} className="body-1 font-bold btn-primary text-white hover:bg-primary-hover py-3 px-6 rounded">
            Yes
          </button>
        </div>
      </div>
    </div>
  )
}
