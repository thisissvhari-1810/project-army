import { useLocation } from 'react-router-dom'
import { ActionButton } from './ActionButton'

export function FloatingCta() {
  const { pathname } = useLocation()
  const showJoy =
    pathname === '/' ||
    pathname === '/index.html' ||
    pathname.startsWith('/personal') ||
    pathname.startsWith('/overview/personal')

  if (!showJoy) return null

  return (
    <ActionButton
      popup="joy"
      className="global--floatingcta"
      aria-label="Enjoy exclusive benefits with RHB Joy@Work"
    >
      <img
        src="https://www.rhbgroup.com/-/media/Assets/Corporate-Website/Images/Overview/overview-personal-banking/floatbar-model-happy-smile.png"
        className="modelimg"
        alt="floatbar model happy smile"
      />
      Enjoy exclusive benefits with
      <span>RHB Joy@Work</span>
    </ActionButton>
  )
}
