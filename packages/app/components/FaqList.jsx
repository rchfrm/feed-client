import Link from 'next/link'
import React from 'react'

export default function FaqList({ faqs, category }) {
  return (
    <div
      className={[
        'sm:col-span-6',
      ].join(' ')}
      key={category}
    >
      <h3 className="bold">{category}</h3>
      <ul>
        {faqs.map((faq) => {
          const {
            question,
            slug,
            id,
          } = faq
          return (
            <li key={id} className="pb-4">
              <Link href={`faqs/${slug}`}>{question}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
