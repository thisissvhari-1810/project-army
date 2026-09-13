import { Link } from 'react-router-dom'
import { usePopup } from '../../context/PopupContext'
import { premierLoginNotice } from '../../data/popups'

type LoginButtonProps = {
  premier?: boolean
}

export function LoginButton({ premier = false }: LoginButtonProps) {
  const { openProduct } = usePopup()

  if (premier) {
    return (
      <Link to="/login?premier=true" className="header-login is-premier">
        Login
      </Link>
    )
  }

  return (
    <button
      type="button"
      className="header-login"
      onClick={() => openProduct(premierLoginNotice)}
    >
      Login
    </button>
  )
}
