import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { footerColumns, footerStandalone, legalLinks, partners } from '../../data/footer'
import { CategoryBar } from '../Sections/CategoryBar'

export function Footer() {
  const [open, setOpen] = useState('')

  return (
    <footer className="footer-root">
      <div className="bg-gray-6 py-5 lg:py-10">
        <section className="container-tw">
          <div className="hidden md:grid md:grid-cols-4 gap-4">
            {footerColumns.map((column) => (
              <ul key={column.title} className="flex flex-col gap-2 body-3">
                <li>
                  <Link className="font-bold" to={column.href}>
                    {column.title}
                  </Link>
                </li>
                <li>
                  <ul className="grid gap-2 mb-4">
                    {column.links.map((link) => (
                      <li key={link.text}>
                        <Link to={link.href}>{link.text}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            ))}
            {footerStandalone.map((item) => (
              <ul key={item.text} className="flex flex-col gap-2 body-3">
                <li>
                  <Link className="font-bold" to={item.href}>
                    {item.text}
                  </Link>
                </li>
              </ul>
            ))}
          </div>

          <div className="flex flex-col md:hidden">
            {footerColumns.map((column) => (
              <ul key={column.title} className="flex flex-col gap-2 body-3">
                <li>
                  <button
                    type="button"
                    className="font-bold py-5 flex justify-between border-b border-gray-4 w-full text-left"
                    onClick={() => setOpen((value) => (value === column.title ? '' : column.title))}
                  >
                    <span>{column.title}</span>
                    <ChevronDown className={`text-gray-2 transition-transform ${open === column.title ? 'rotate-180' : ''}`} />
                  </button>
                </li>
                {open === column.title ? (
                  <li>
                    <ul className="grid gap-2 mb-5">
                      {column.links.map((link) => (
                        <li key={link.text}>
                          <Link to={link.href} className="py-3 block">
                            {link.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : null}
              </ul>
            ))}
            {footerStandalone.map((item) => (
              <Link key={item.text} className="font-bold py-5 block border-b border-gray-4" to={item.href}>
                {item.text}
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="bg-gray-6 py-5 lg:py-10 mt-1">
        <section className="container-tw">
          <div className="flex flex-col md:flex-row md:flex-row-reverse justify-between md:border-b md:border-gray-4 md:pb-5">
            <div className="flex gap-3 border-b border-gray-4 pb-5 md:border-0 md:pb-0">
              <span className="text-primary">Get Connected</span>
              <ul className="flex gap-2">
                <li>
                  <a className="text-white bg-[#3b5998] flex justify-center items-center w-5 h-5 body-3 text-center rounded-2xl" href="https://www.facebook.com/RHBGroup" aria-label="Facebook">
                    <em className="fa fa-facebook text-white" />
                  </a>
                </li>
                <li>
                  <a className="text-white bg-[#3b5998] flex justify-center items-center w-5 h-5 body-3 text-center rounded-2xl" href="https://twitter.com/RHBGroup" aria-label="Twitter">
                    <em className="fa fa-twitter text-white" />
                  </a>
                </li>
                <li>
                  <a className="text-white bg-[#ed462f] flex justify-center items-center w-5 h-5 body-3 text-center rounded-2xl" href="https://www.youtube.com/user/RHBGroup" aria-label="YouTube">
                    <em className="fa fa-youtube text-white" />
                  </a>
                </li>
                <li>
                  <a className="text-white bg-[#cc4793] flex justify-center items-center w-5 h-5 body-3 text-center rounded-2xl" href="https://www.instagram.com/RHBGroup/" aria-label="Instagram">
                    <em className="fa fa-instagram text-white" />
                  </a>
                </li>
              </ul>
            </div>
            <span className="text-[#a0a0a0] pt-10 md:pt-0 body-4">
              © 2026 RHB Bank Berhad 196501000373 (6171-M). All rights reserved.
            </span>
          </div>
        </section>
      </div>

      <div className="bg-white md:bg-gray-6 py-5 md:pt-0 md:pb-10">
        <section className="container-tw">
          <ul className="flex flex-col md:flex-row md:flex-wrap gap-8 md:gap-3 mb-10 font-bold md:font-normal md:text-xs">
            {legalLinks.map((item) => (
              <li key={item.text}>
                <Link className="py-5 md:py-0" to={item.href}>
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
          <div className="lg:flex flex-row-reverse w-full justify-end items-start">
            <div className="flex flex-row flex-wrap items-center gap-6 md:gap-8 lg:gap-12 pb-5 lg:px-8">
              {partners.map((item) => (
                <img key={item.name} src={item.src} alt={item.name} className="h-10 md:h-12 w-auto object-contain" />
              ))}
            </div>
            <div className="lg:text-center lg:px-8 pt-5 lg:pt-0 lg:w-2/12 border-t lg:border-t-0 lg:border-r border-gray-4">
              <p className="text-xs mb-3 lg:inline-block">PIDM Membership Representation</p>
              <img
                className="lg:inline-block"
                src="/assets/partners/member-pidm.png"
                alt="PIDM Membership Representation"
              />
            </div>
          </div>
        </section>
      </div>

      <div className="footer-menu hidden lg:block shadow-top py-[10px]">
        <div className="container-tw">
          <CategoryBar />
        </div>
      </div>
    </footer>
  )
}
