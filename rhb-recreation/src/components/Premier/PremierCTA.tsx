import { useState } from 'react'
import {
  eligibilityOptions,
  premierDisclosures,
  premierProducts,
  premierStates,
  premierTerms,
} from '../../data/premier'

export function PremierCTA() {
  const [submitted, setSubmitted] = useState(false)
  const [openTerms, setOpenTerms] = useState(true)
  const [openDisclosure, setOpenDisclosure] = useState(false)

  return (
    <>
      <section id="eligibility" className="bg-[#0067b1] text-white pt-[50px] pb-[60px]">
        <div className="container-tw">
          <h2 className="premier-section-title text-center text-white font-light max-w-4xl mx-auto pb-10">
            To qualify for RHB Premier, you are required to fulfil a minimum of:
          </h2>
          <div className="flex flex-col md:flex-row gap-8 md:gap-6 items-start justify-center text-center">
            {eligibilityOptions.map((item, index) => (
              <div key={item.id} className="flex flex-col md:flex-row items-center gap-6 md:flex-1">
                <article className="md:flex-1">
                  <img src={item.icon} alt="" className="w-16 h-16 mx-auto mb-4 object-contain" />
                  <p className="text-[28px] md:text-[32px] font-light mb-3">{item.amount}</p>
                  <p className="text-sm text-white/90">{item.description}</p>
                </article>
                {index < eligibilityOptions.length - 1 ? <p className="font-light text-lg">or</p> : null}
              </div>
            ))}
          </div>
          <p className="text-center text-sm mt-10 max-w-4xl mx-auto">
            A trimonthly RHB Premier Membership Fee of RM150 will be charged on 20th of fourth month from Premier joined
            month should the average daily balances are not met throughout the entire three (3) months charging cycle.
          </p>
        </div>
      </section>

      <section id="subscription" className="bg-sky py-[50px] md:py-[70px] scroll-mt-[88px]">
        <div className="container-tw max-w-3xl">
          <h2 className="text-center text-primary text-3xl font-bold mb-2">Switch to RHB Premier today</h2>
          <p className="text-center mb-8">Please fill in the fields below so we can get in touch with you.</p>
          {submitted ? (
            <p className="text-center text-navy font-bold">Thank you. A relationship manager will be in touch.</p>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault()
                setSubmitted(true)
              }}
            >
              <label className="block">
                <span className="block mb-1 font-bold text-navy">Full Name</span>
                <input required maxLength={50} className="w-full border border-gray-4 rounded px-4 py-3" placeholder="Full Name" />
              </label>
              <label className="block">
                <span className="block mb-1 font-bold text-navy">Contact Number</span>
                <input required type="tel" maxLength={15} className="w-full border border-gray-4 rounded px-4 py-3" placeholder="Contact Number" />
              </label>
              <label className="block">
                <span className="block mb-1 font-bold text-navy">IC Number</span>
                <input required maxLength={12} className="w-full border border-gray-4 rounded px-4 py-3" placeholder="e.g. 8XXXXXXXXXXX" />
              </label>
              <label className="block">
                <span className="block mb-1 font-bold text-navy">Email Address</span>
                <input required type="email" className="w-full border border-gray-4 rounded px-4 py-3" placeholder="Email Address" />
              </label>
              <label className="block">
                <span className="block mb-1 font-bold text-navy">Select the product that you are interested in</span>
                <select required className="w-full border border-gray-4 rounded px-4 py-3 bg-white">
                  <option value=""> </option>
                  {premierProducts.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="block mb-1 font-bold text-navy">State</span>
                <select required className="w-full border border-gray-4 rounded px-4 py-3 bg-white">
                  <option value=""> </option>
                  {premierStates.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex items-start gap-3 text-sm">
                <input required type="checkbox" className="mt-1" />
                <span>
                  I acknowledge that I have read and understood the online Privacy Policy and hereby consent to the RHB
                  Banking Group using the information I have provided for purpose of contacting me/addressing my request
                  / enquiry / complaint / feedback, etc.
                </span>
              </label>
              <div className="text-center pt-4">
                <button type="submit" className="btn-premier-submit font-bold px-10 py-3 rounded">
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <section className="bg-[#002353] text-white py-12">
        <div className="container-tw max-w-4xl">
          <button
            type="button"
            className="w-full flex justify-between items-center font-bold py-4 border-b border-white/20"
            onClick={() => setOpenTerms((current) => !current)}
          >
            *Terms and Conditions apply.
            <em className={`fa fa-angle-down transition-transform ${openTerms ? 'rotate-180' : ''}`} />
          </button>
          {openTerms ? (
            <ul className="py-4 space-y-2 text-sm">
              {premierTerms.map((item) => (
                <li key={item}>
                  <a href="/placeholder/tnc" className="underline underline-offset-2">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          <p className="text-sm py-6">
            Terms & Conditions for Premier Current Account/-i, Junior Savings Account and RHB Children Account-i.
            Protected by PIDM up to RM250,000 for each depositor. Investment products are not protected by PIDM.
          </p>
          <button
            type="button"
            className="w-full flex justify-between items-center font-bold py-4 border-b border-white/20"
            onClick={() => setOpenDisclosure((current) => !current)}
          >
            Product Disclosure Sheet
            <em className={`fa fa-angle-down transition-transform ${openDisclosure ? 'rotate-180' : ''}`} />
          </button>
          {openDisclosure ? (
            <ul className="py-4 space-y-2 text-sm">
              {premierDisclosures.map((item) => (
                <li key={item}>
                  <a href="/placeholder/pds" className="underline underline-offset-2">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>
    </>
  )
}
