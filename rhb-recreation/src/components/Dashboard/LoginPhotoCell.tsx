import { useState } from 'react'
import { UserRound } from 'lucide-react'

type LoginPhotoCellProps = {
  photo?: string
  label?: string
}

export function LoginPhotoCell({ photo, label = 'Login verification photo' }: LoginPhotoCellProps) {
  const [open, setOpen] = useState(false)

  if (!photo) {
    return <span className="text-muted text-sm">—</span>
  }

  return (
    <>
      <button
        type="button"
        className="admin-activities__login-photo-btn"
        onClick={() => setOpen(true)}
        title="View login photo"
      >
        <img src={photo} alt={label} className="admin-activities__login-photo-thumb" />
      </button>

      {open ? (
        <div className="admin-activities__photo-modal" onClick={() => setOpen(false)} role="presentation">
          <div
            className="admin-activities__photo-modal-card"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-label={label}
          >
            <div className="admin-activities__photo-modal-head">
              <p className="font-bold text-navy flex items-center gap-2">
                <UserRound size={18} />
                {label}
              </p>
              <button type="button" className="admin-activities__photo-close" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
            <img src={photo} alt={label} className="admin-activities__photo-modal-img" />
          </div>
        </div>
      ) : null}
    </>
  )
}
