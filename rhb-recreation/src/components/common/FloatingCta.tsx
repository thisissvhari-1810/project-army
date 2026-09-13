import { useLocation } from 'react-router-dom'

export function FloatingCta() {
  const { pathname } = useLocation()
  const showJoy =
    pathname === '/' ||
    pathname === '/index.html' ||
    pathname.startsWith('/personal') ||
    pathname.startsWith('/overview/personal')

  if (!showJoy) return null

  return (
    <div className="global--floatingcta" aria-hidden="true">
      <img
        src="https://www.rhbgroup.com/-/media/Assets/Corporate-Website/Images/Overview/overview-personal-banking/floatbar-model-happy-smile.png"
        className="modelimg"
        alt=""
      />
      Enjoy exclusive benefits with
      <span>RHB Joy@Work</span>
    </div>
  )
}
