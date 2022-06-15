import Link from 'next/link'
import React from 'react'

export default function FaqList({ faqs, category }) {
  return (
    <article>
      <h3 className="bold">{category}</h3>
      <ul>
        {faqs.map((faq) => {
          const {
            question,
            slug,
            id,
          } = faq
          return (
            <li key={id}>
              <Link href={`faqs/${slug}`}>{question}</Link>
            </li>
          )
        })}
      </ul>
    </article>
  )
}
