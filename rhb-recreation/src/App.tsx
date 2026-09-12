import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { CookieBanner } from './components/common/CookieBanner'
import { FloatingCta } from './components/common/FloatingCta'
import { PopupHost } from './components/common/PopupHost'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { PopupProvider } from './context/PopupContext'
import { About } from './pages/About'
import { Business } from './pages/Business'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Personal } from './pages/Personal'
import { Placeholder } from './pages/Placeholder'
import { Premier } from './pages/Premier'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 80)
      return
    }
    window.scrollTo(0, 0)
  }, [hash, pathname])

  return null
}

function Shell() {
  const { pathname } = useLocation()
  const isLogin = pathname === '/login'

  return (
    <div className="min-h-screen flex flex-col">
      {isLogin ? null : <Header />}
      {isLogin ? null : <FloatingCta />}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Personal />} />
          <Route path="/index.html" element={<Personal />} />
          <Route path="/premier" element={<Premier />} />
          <Route path="/overview/premier" element={<Premier />} />
          <Route path="/overview/premier/index.html" element={<Premier />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/overview/personal" element={<Personal />} />
          <Route path="/overview/personal/index.html" element={<Personal />} />
          <Route path="/business" element={<Business />} />
          <Route path="/overview/business" element={<Business />} />
          <Route path="/overview/business/index.html" element={<Business />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about/:slug" element={<About />} />
          <Route path="/others/about-us/:slug" element={<About />} />
          <Route path="/corporate" element={<Placeholder />} />
          <Route path="/islamic" element={<Home />} />
          <Route path="/overview/islamic" element={<Home />} />
          <Route path="/overview/islamic/index.html" element={<Home />} />
          <Route path="/investor-relations" element={<Placeholder />} />
          <Route path="/contact" element={<Placeholder />} />
          <Route path="/locate" element={<Placeholder />} />
          <Route path="/faq" element={<Placeholder />} />
          <Route path="/products-services" element={<Placeholder />} />
          <Route path="/promotions" element={<Placeholder />} />
          <Route path="/learn" element={<Placeholder />} />
          <Route path="/instant-apply" element={<Placeholder />} />
          <Route path="/placeholder/:slug" element={<Placeholder />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {isLogin ? null : <Footer />}
      <PopupHost />
      {isLogin ? null : <CookieBanner />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <PopupProvider>
        <ScrollManager />
        <Shell />
      </PopupProvider>
    </BrowserRouter>
  )
}
