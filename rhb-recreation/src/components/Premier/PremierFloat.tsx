import { useState } from 'react'

export function PremierFloat() {
  const [open, setOpen] = useState(true)

  if (!open) return null

  return (
    <div className="rhb-premier-float">
      <img src="/assets/logos/logo-premier.png" alt="RHB Premier" className="w-[100px] h-auto" />
      <div className="text-white text-[13px] font-normal leading-tight">
        Join RHB
        <br />
        Premier now
      </div>
      <a href="#subscription" className="absolute inset-0" aria-label="Join RHB Premier now" />
      <button
        type="button"
        className="absolute top-1 right-1 text-white/80 text-lg leading-none"
        aria-label="Close"
        onClick={() => setOpen(false)}
      >
        ×
      </button>
    </div>
  )
}
