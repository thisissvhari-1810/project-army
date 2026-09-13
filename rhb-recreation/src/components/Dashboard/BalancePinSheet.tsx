import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { BALANCE_VIEW_PIN } from '../../lib/accessCodes'

type BalancePinSheetProps = {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

const PIN_LENGTH = 4

export function BalancePinSheet({ open, onClose, onSuccess }: BalancePinSheetProps) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)

  useEffect(() => {
    if (!open) {
      setPin('')
      setError('')
      setShake(false)
    }
  }, [open])

  useEffect(() => {
    if (pin.length !== PIN_LENGTH) return

    if (pin === BALANCE_VIEW_PIN) {
      setError('')
      onSuccess()
      onClose()
      return
    }

    setError('Incorrect PIN')
    setShake(true)
    window.setTimeout(() => {
      setPin('')
      setShake(false)
    }, 450)
  }, [pin, onClose, onSuccess])

  if (!open) return null

  const appendDigit = (digit: string) => {
    if (pin.length >= PIN_LENGTH) return
    setError('')
    setPin((value) => `${value}${digit}`)
  }

  const removeDigit = () => setPin((value) => value.slice(0, -1))

  return (
    <div className="gpay-sheet-backdrop" onClick={onClose} role="presentation">
      <div
        className={`gpay-sheet ${shake ? 'is-shake' : ''}`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-label="Enter PIN to view balance"
      >
        <div className="gpay-sheet__handle" />
        <button type="button" className="gpay-sheet__close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <p className="gpay-sheet__title">Enter UPI PIN</p>
        <p className="gpay-sheet__subtitle">Verify to view your account balance</p>

        <div className="gpay-sheet__dots" aria-hidden="true">
          {Array.from({ length: PIN_LENGTH }).map((_, index) => (
            <span key={index} className={index < pin.length ? 'is-filled' : ''} />
          ))}
        </div>

        {error ? <p className="gpay-sheet__error">{error}</p> : null}

        <div className="gpay-keypad">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'].map((key) => {
            if (key === '') {
              return <span key="spacer" className="gpay-keypad__spacer" />
            }

            if (key === 'del') {
              return (
                <button
                  key="del"
                  type="button"
                  className="gpay-keypad__key is-action"
                  onClick={removeDigit}
                >
                  ⌫
                </button>
              )
            }

            return (
              <button
                key={key}
                type="button"
                className="gpay-keypad__key"
                onClick={() => appendDigit(key)}
              >
                {key}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
