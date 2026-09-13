import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { faqCategories } from '../data/faq'

export function FaqCategory() {
  const { category = '' } = useParams()
  const item = faqCategories.find((entry) => entry.id === category)
  const title = item?.title ?? category.replace(/-/g, ' ')

  useEffect(() => {
    document.title = `${title} | FAQ | RHB Malaysia`
  }, [title])

  return (
    <main className="bg-[#e2f5f9] min-h-[50vh]">
      <div className="container-tw py-16">
        <p className="body-3 text-muted mb-3">
          <Link to="/personal" className="text-primary">
            Home
          </Link>{' '}
          /{' '}
          <Link to="/faq" className="text-primary">
            FAQ
          </Link>{' '}
          / {title}
        </p>
        <h1 className="text-navy text-4xl font-light mb-4 capitalize">{title}</h1>
        <p className="max-w-2xl text-muted leading-relaxed">
          Browse common questions about {title.toLowerCase()}. This section mirrors the official RHB FAQ category
          layout for the frontend recreation.
        </p>
        <Link to="/faq" className="inline-block mt-8 text-primary font-bold hover:underline">
          Back to FAQ Categories
        </Link>
      </div>
    </main>
  )
}
