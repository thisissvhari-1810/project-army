import { useState } from 'react'
import { Link } from 'react-router-dom'

export function CookieBanner() {
  const [visible, setVisible] = useState(() => sessionStorage.getItem('rhb-cookies') !== '1')

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[70] bg-navy text-white px-4 py-4 md:px-8">
      <div className="container-tw flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <p className="text-sm leading-relaxed max-w-4xl">
          We used cookies to improve your experience on our website. By continuing to use our website and/or accepting
          this message, you agree to our use of cookies. Please refer to our{' '}
          <Link to="/placeholder/privacy" className="underline">
            Privacy Policy
          </Link>{' '}
          for more information.
        </p>
        <button
          type="button"
          className="shrink-0 bg-primary hover:bg-primary-hover font-bold px-6 py-2 rounded"
          onClick={() => {
            sessionStorage.setItem('rhb-cookies', '1')
            setVisible(false)
          }}
        >
          Accept
        </button>
      </div>
    </div>
  )
}
