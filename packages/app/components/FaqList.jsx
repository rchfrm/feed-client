import Link from 'next/link'
import React from 'react'
import PropTypes from 'prop-types'

export default function FaqList({ faqs, category }) {
  return (
    <div
      className={[
        'sm:col-span-6',
      ].join(' ')}
    >
      <h3 className="bold">{category}</h3>
      <ul>
        {faqs.map((faq) => {
          const {
            question,
            slug,
          } = faq
          return (
            <li key={slug} className="pb-4">
              <Link href={`faqs/${slug}`}>{question}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

FaqList.propTypes = {
  faqs: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
  })).isRequired,
  category: PropTypes.string.isRequired,
}
