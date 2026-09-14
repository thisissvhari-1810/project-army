import { useState } from 'react'
import { Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useBalanceVisibility } from '../../hooks/useBalanceVisibility'
import { formatCurrency } from '../../lib/format'
import type { PublicUser } from '../../types/banking'
import { BalancePinSheet } from './BalancePinSheet'

type AccountSummaryCardProps = {
  user: PublicUser
}

export function AccountSummaryCard({ user }: AccountSummaryCardProps) {
  const { visible, reveal, hide } = useBalanceVisibility()
  const [pinOpen, setPinOpen] = useState(false)

  return (
    <>
      <section className="gpay-balance-card">
        <div className="gpay-balance-card__glow" aria-hidden="true" />
        <div className="gpay-balance-card__inner">
          <div className="gpay-balance-card__top">
            <div>
              <p className="gpay-balance-card__bank">RHB Premier</p>
              <p className="gpay-balance-card__status">
                <ShieldCheck size={14} />
                Secure account
              </p>
            </div>
            <img
              src="/assets/logos/rhb-premier-logo.png"
              alt=""
              className="gpay-balance-card__logo"
            />
          </div>

          <div className="gpay-balance-card__profile">
            <div className="gpay-balance-card__avatar">{user.displayName.charAt(0)}</div>
            <div>
              <p className="gpay-balance-card__name">{user.displayName}</p>
              <p className="gpay-balance-card__account">A/c •••• {user.accountNumber.slice(-4)}</p>
            </div>
          </div>

          <div className="gpay-balance-card__amount-block">
            <div className="gpay-balance-card__amount-head">
              <p className="gpay-balance-card__label">Available balance</p>
              {visible ? (
                <button type="button" className="gpay-balance-card__eye" onClick={hide} aria-label="Hide balance">
                  <EyeOff size={18} />
                </button>
              ) : null}
            </div>

            {visible ? (
              <p className="gpay-balance-card__amount">{formatCurrency(user.balance ?? 0)}</p>
            ) : (
              <div className="gpay-balance-card__hidden">
                <p className="gpay-balance-card__masked">$ ••••••</p>
                <button
                  type="button"
                  className="gpay-balance-card__view-btn"
                  onClick={() => setPinOpen(true)}
                >
                  <Eye size={18} />
                  View balance
                </button>
              </div>
            )}
          </div>

          <div className="gpay-balance-card__actions">
            <Link to="/dashboard/transactions" className="gpay-balance-card__chip">
              Transactions
            </Link>
            <button
              type="button"
              className="gpay-balance-card__chip is-outline"
              onClick={() => (visible ? hide() : setPinOpen(true))}
            >
              {visible ? 'Hide balance' : 'Check balance'}
            </button>
          </div>
        </div>
      </section>

      <BalancePinSheet
        open={pinOpen}
        onClose={() => setPinOpen(false)}
        onSuccess={reveal}
      />
    </>
  )
}
