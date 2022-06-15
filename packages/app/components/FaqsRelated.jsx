import Link from 'next/link'
import React from 'react'

export default function FaqsRelated({ slug, faqs }) {
  const filteredFaqs = faqs.filter(faq => faq.slug !== slug)
  if (filteredFaqs.length === 0) {
    return null
  }
  return (
    <div
      className={[
        'border-t',
        'border-grey-2',
        'border-solid',
        'pt-6',
      ].join(' ')}
    >
      <h4>People also ask...</h4>
      <ul>
        {filteredFaqs.map((faq) => {
          const {
            question,
            slug,
            id,
          } = faq
          return (
            <li key={id} className="pb-4">
              <Link href={`${slug}`}>{question}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
